import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

import "./utils/db";
import { CORS_ORIGIN, PORT } from "./constants";
import authRoutes from "./auth/auth.routes";
import usersRoutes from "./users/users.routes";
import notesRoutes from "./notes/notes.routes";
import categoriesRoutes from "./categories/categories.routes";
import noteCategoriesRoutes from "./noteCategories/noteCategories.routes";
import { DBConnect } from "./utils/db";
import { deserializeUser, errorHandler, requireUser } from "./middlewares";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(deserializeUser);

app.use("/api/auth", authRoutes);
app.use("/api/users", requireUser, usersRoutes);
app.use("/api/notes", requireUser, notesRoutes);
app.use("/api/categories", requireUser, categoriesRoutes);
app.use("/api/noteCategories", requireUser, noteCategoriesRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  await DBConnect();
  console.log(`listening on http://localhost:${PORT}`);
});
