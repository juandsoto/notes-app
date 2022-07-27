import { object, string, TypeOf } from "zod";

export const noteCategoriesSchema = {
  body: object({
    noteId: string({
      required_error: "noteId is required",
    }),
    categoryId: string({
      required_error: "categoryId is required",
    }),
  }),
  deleteParams: object({
    id: string({
      required_error: "_id param is required",
    }),
  }),
};

export type NoteCategoriesBody = TypeOf<typeof noteCategoriesSchema.body>;
export type DeleteNoteCategoryParams = TypeOf<typeof noteCategoriesSchema.deleteParams>;
