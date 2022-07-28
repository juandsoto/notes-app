import { Op } from "sequelize";
import Category from "../categories/categories.model";
import Note from "./notes.model";
import { NotesBody } from "./notes.schema";

export const getAllNotes = async (userEmail: string, category: string) => {
  const options: Record<string, any> = {};
  const query = category ? { [Op.eq]: category } : { [Op.not]: null };

  if (!category) {
    options.required = false;
  }

  const notes = await Note.findAll({
    where: { userEmail, archived: false },
    attributes: ["_id"],
    order: [["updatedAt", "DESC"]],
    include: {
      model: Category,
      as: "categories",
      where: {
        name: query,
      },
      ...options,
    },
  });

  //@ts-ignore
  //This was the way I solved sequelize struggling with returning notes by category filtering
  //because sequelize would just return the searching category but if the note had more than one category
  //it would not be included in the response
  const response = await Promise.all(notes.map(note => getNoteById(note.dataValues._id)));

  return response;
};

export const getNoteById = async (_id: string) => {
  return await Note.findByPk(_id, { include: { model: Category, as: "categories" } });
};

export const getArchivedNotes = async (userEmail: string, category: string) => {
  const query = category ? { [Op.eq]: category } : { [Op.not]: null };

  const notes = await Note.findAll({
    where: { userEmail, archived: true },
    attributes: ["_id"],
    order: [["updatedAt", "DESC"]],
    include: {
      model: Category,
      as: "categories",
      where: {
        name: query,
      },
    },
  });

  //@ts-ignore
  //This was the way I solved sequelize struggling with returning notes by category filtering
  //because sequelize would just return the searching category but if the note had more than one category
  //it would not be included in the response
  const response = await Promise.all(notes.map(note => getNoteById(note.dataValues._id)));

  return response;
};

export const createNote = async (note: NotesBody & { userEmail: string }): Promise<any> => {
  return await Note.create(note);
};

export const updateNote = async (_id: string, note: Omit<NotesBody, "categories">, userEmail: string) => {
  return await Note.update(note, { where: { _id, userEmail }, returning: true });
};

export const deleteNote = async (_id: string, userEmail: string) => {
  await Note.destroy({ where: { _id, userEmail } });
};
