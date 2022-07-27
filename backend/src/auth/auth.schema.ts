import { object, string, TypeOf } from "zod";

export const signInSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "password is required",
    }).min(6, "password must be at least 6 characters"),
  }),
};

export type SignInBody = TypeOf<typeof signInSchema.body>;
