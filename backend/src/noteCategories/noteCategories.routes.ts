import { Router } from "express";
import { deleteNoteCategoryHandler, getAllNotesCategoriesHandler } from "./noteCategories.controller";
import { processRequestParams } from "zod-express-middleware";
import { noteCategoriesSchema } from "./noteCategories.schema";
const router = Router();

router.get("/", getAllNotesCategoriesHandler);

router.delete("/:id", processRequestParams(noteCategoriesSchema.deleteParams), deleteNoteCategoryHandler);

export default router;
