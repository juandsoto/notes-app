import { object, string, boolean, TypeOf } from "zod";

export const userSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    username: string({
      required_error: "username is required",
    }).min(3, "username must be at least 3 characters"),
    password: string({
      required_error: "password is required",
    }).min(6, "password must be at least 6 characters"),
    active: boolean().nullish(),
  }),
  deleteParams: object({
    email: string({
      required_error: "email param is required",
    }).email("email param must be a valid email"),
  }),
};

export type UserBody = TypeOf<typeof userSchema.body>;
export type DeleteUserParams = TypeOf<typeof userSchema.deleteParams>;
