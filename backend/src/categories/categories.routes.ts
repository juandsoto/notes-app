import { Router } from "express";
import { createCategoryHandler, deleteCategoryHandler, getAllCategoriesHandler } from "./categories.controller";
import { processRequestBody, processRequestParams } from "zod-express-middleware";
import { categorySchema } from "./categories.schema";
const router = Router();

router.get("/", getAllCategoriesHandler);

router.post("/", processRequestBody(categorySchema.body), createCategoryHandler);

router.delete("/:id", processRequestParams(categorySchema.deleteParams), deleteCategoryHandler);

export default router;
