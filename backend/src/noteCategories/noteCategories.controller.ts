import { Request, Response, NextFunction } from "express";
import { deleteNoteCategory, getAllNoteCategories } from "./noteCategories.service";
import { StatusCodes } from "http-status-codes";
import { DeleteNoteCategoryParams } from "./noteCategories.schema";

export const getAllNotesCategoriesHandler = async (req: Request, res: Response<{}, { user: { email: string } }>, next: NextFunction) => {
  try {
    const notes = await getAllNoteCategories(res.locals.user.email);
    return res.status(StatusCodes.OK).json(notes);
  } catch (error) {
    return next(error);
  }
};

export const deleteNoteCategoryHandler = async (
  req: Request<DeleteNoteCategoryParams>,
  res: Response<string, { user: { email: string } }>,
  next: NextFunction
) => {
  try {
    await deleteNoteCategory(req.params.id, res.locals.user.email);
    return res.status(StatusCodes.OK).json("note_category deleted successfully");
  } catch (error) {
    return next(error);
  }
};
