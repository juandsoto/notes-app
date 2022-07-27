import { Request, Response, NextFunction } from "express";
import { CategoryBody, CategoryDeleteParams } from "./categories.schema";
import { createCategory, deleteCategory, getAllCategories } from "./categories.service";
import { StatusCodes } from "http-status-codes";
import { deleteNoteCategoryByCategoryID } from "../noteCategories/noteCategories.service";

export const getAllCategoriesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await getAllCategories(res.locals.user.email);
    return res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    return next(error);
  }
};

export const createCategoryHandler = async (req: Request<{}, {}, CategoryBody>, res: Response, next: NextFunction) => {
  try {
    const category = await createCategory({
      ...req.body,
      userEmail: res.locals.user.email,
    });
    return res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    return next(error);
  }
};

export const deleteCategoryHandler = async (req: Request<CategoryDeleteParams>, res: Response<string, { user: { email: string } }>, next: NextFunction) => {
  try {
    await deleteCategory(req.params.id, res.locals.user.email);
    await deleteNoteCategoryByCategoryID(req.params.id, res.locals.user.email);
    return res.status(StatusCodes.OK).send("Category deleted");
  } catch (error) {
    return next(error);
  }
};
