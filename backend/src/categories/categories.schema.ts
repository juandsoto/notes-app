import { object, string, TypeOf } from "zod";

export const categorySchema = {
  body: object({
    name: string({
      required_error: "name is required",
    }).min(3, "name must be at least 3 characters"),
  }),
  deleteParams: object({
    id: string({
      required_error: "_id param is required",
    }),
  }),
};

export type CategoryBody = TypeOf<typeof categorySchema.body>;
export type CategoryDeleteParams = TypeOf<typeof categorySchema.deleteParams>;
