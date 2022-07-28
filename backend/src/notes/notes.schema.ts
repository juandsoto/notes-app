import { object, string, array, TypeOf, boolean } from "zod";

export const notesSchema = {
  body: object({
    title: string({
      required_error: "title is required",
    }).min(3, "title must be at least 3 characters"),
    content: string().nullish(),
    archived: boolean().nullish(),
    categories: array(string()).nullish(),
  }),
  getOneParams: object({
    id: string({
      required_error: "_id param is required",
    }),
  }),
  updateParams: object({
    id: string({
      required_error: "_id param is required",
    }),
  }),
  deleteParams: object({
    id: string({
      required_error: "_id param is required",
    }),
  }),
  findAllQuery: object({
    category: string(),
  }),
};

export type NotesBody = TypeOf<typeof notesSchema.body>;
export type DeleteNoteParams = TypeOf<typeof notesSchema.deleteParams>;
export type UpdateNoteParams = TypeOf<typeof notesSchema.updateParams>;
export type GetOneParams = TypeOf<typeof notesSchema.getOneParams>;
export type FindAllNotesQuery = TypeOf<typeof notesSchema.findAllQuery>;
