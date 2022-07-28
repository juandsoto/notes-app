import NoteCategories from "../noteCategories/noteCategories.model";
import { NoteCategoriesBody } from "./noteCategories.schema";

export const getAllNoteCategories = async (userEmail: string) => {
  return await NoteCategories.findAll({ where: { userEmail } });
};

export const createNoteCategory = async (noteCategory: NoteCategoriesBody & { userEmail: string }) => {
  return await NoteCategories.findOrCreate({
    where: { noteId: noteCategory.noteId, categoryId: noteCategory.categoryId, userEmail: noteCategory.userEmail },
    defaults: {
      noteId: noteCategory.noteId,
      categoryId: noteCategory.categoryId,
      userEmail: noteCategory.userEmail,
    },
  });
};

export const deleteNoteCategory = async (_id: string, userEmail: string) => {
  await NoteCategories.destroy({ where: { _id, userEmail } });
};

export const deleteNoteCategoryByNoteID = async (noteId: string, userEmail: string) => {
  await NoteCategories.destroy({ where: { noteId, userEmail } });
};

export const deleteNoteCategoryByCategoryID = async (categoryId: string, userEmail: string) => {
  await NoteCategories.destroy({ where: { categoryId, userEmail } });
};
