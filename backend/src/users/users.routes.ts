import { Router } from "express";
import { deleteUserHandler, getAllUsersHandler } from "./users.controller";
import { processRequestParams } from "zod-express-middleware";
import { userSchema } from "./users.schema";
import { isAdmin, isOwnerOrAdmin } from "../middlewares";
const router = Router();

router.get("/", isAdmin, getAllUsersHandler);

router.delete("/:email", isOwnerOrAdmin, processRequestParams(userSchema.deleteParams), deleteUserHandler);

export default router;
