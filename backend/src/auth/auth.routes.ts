import { Router } from "express";
import { processRequestBody } from "zod-express-middleware";
import { userSchema } from "../users/users.schema";
import { signUpHandler, signInHandler } from "./auth.controller";
import { signInSchema } from "./auth.schema";
const router = Router();

router.post("/signup", processRequestBody(userSchema.body), signUpHandler);

router.post("/signin", processRequestBody(signInSchema.body), signInHandler);

export default router;
