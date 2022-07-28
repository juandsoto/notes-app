import { NextFunction, Request, Response } from "express";
import { createNote, deleteNote, getAllNotes, getArchivedNotes, getNoteById, updateNote } from "./notes.service";
import { findOrCreateCategory } from "../categories/categories.service";
import { DeleteNoteParams, FindAllNotesQuery, GetOneParams, NotesBody, UpdateNoteParams } from "./notes.schema";
import { StatusCodes } from "http-status-codes";
import { createNoteCategory, deleteNoteCategory, deleteNoteCategoryByNoteID } from "../noteCategories/noteCategories.service";

export const getAllNotesHandler = async (req: Request<{}, {}, {}, FindAllNotesQuery>, res: Response<{}, { user: { email: string } }>, next: NextFunction) => {
  try {
    const notes = await getAllNotes(res.locals.user.email, req.query.category);
    return res.status(StatusCodes.OK).json(notes);
  } catch (error) {
    return next(error);
  }
};

export const getNoteByIdHandler = async (
  req: Request<GetOneParams, {}, {}, FindAllNotesQuery>,
  res: Response<any, { user: { email: string } }>,
  next: NextFunction
) => {
  try {
    const note = await getNoteById(req.params.id);
    return res.status(StatusCodes.OK).json(note);
  } catch (error) {
    return next(error);
  }
};

export const getArchivedNotesHandler = async (
  req: Request<{}, {}, {}, FindAllNotesQuery>,
  res: Response<{}, { user: { email: string } }>,
  next: NextFunction
) => {
  try {
    const notes = await getArchivedNotes(res.locals.user.email, req.query.category);
    return res.status(StatusCodes.OK).json(notes);
  } catch (error) {
    return next(error);
  }
};

export const createNoteHandler = async (req: Request<{}, {}, NotesBody, {}>, res: Response, next: NextFunction) => {
  const { categories, ...body } = req.body;

  try {
    const note = await createNote({
      ...body,
      userEmail: res.locals.user.email,
    });
    if (categories) {
      const data = await Promise.all(categories.map((category: string) => findOrCreateCategory(category, res.locals.user.email)));
      await data.forEach(
        async arr =>
          await createNoteCategory({
            noteId: note._id,
            categoryId: arr[0].toJSON()._id,
            userEmail: res.locals.user.email,
          })
      );
    }
    return res.status(StatusCodes.CREATED).json(note);
  } catch (error) {
    return next(error);
  }
};

export const updateNoteHandler = async (
  req: Request<UpdateNoteParams, {}, NotesBody, {}>,
  res: Response<{}, { user: { email: string } }>,
  next: NextFunction
) => {
  const { categories, ...body } = req.body;

  try {
    const [affectedRows, [note]] = await updateNote(req.params.id, body, res.locals.user.email);
    if (categories) {
      const data = await Promise.all(categories.map((category: string) => findOrCreateCategory(category, res.locals.user.email)));
      await data.forEach(
        async arr =>
          await createNoteCategory({
            noteId: note.getDataValue("_id"),
            categoryId: arr[0].toJSON()._id,
            userEmail: res.locals.user.email,
          })
      );
    }
    return res.status(StatusCodes.OK).json(note);
  } catch (error) {
    return next(error);
  }
};

export const deleteNoteHandler = async (req: Request<DeleteNoteParams, {}, {}, {}>, res: Response<{}, { user: { email: string } }>, next: NextFunction) => {
  try {
    await deleteNote(req.params.id, res.locals.user.email);
    await deleteNoteCategoryByNoteID(req.params.id, res.locals.user.email);
    return res.status(StatusCodes.OK).json({
      message: "Note deleted",
    });
  } catch (error) {
    return next(error);
  }
};
