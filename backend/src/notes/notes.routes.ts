import { Router } from "express";
import { processRequestBody, processRequestParams } from "zod-express-middleware";
import { notesSchema } from "./notes.schema";
import { createNoteHandler, deleteNoteHandler, getAllNotesHandler, getArchivedNotesHandler, updateNoteHandler } from "./notes.controller";
const router = Router();

router.get("/", getAllNotesHandler);

router.get("/archived", getArchivedNotesHandler);

router.post("/", processRequestBody(notesSchema.body), createNoteHandler);

router.patch("/:id", processRequestParams(notesSchema.updateParams), updateNoteHandler);

router.delete("/:id", processRequestParams(notesSchema.deleteParams), deleteNoteHandler);

export default router;
