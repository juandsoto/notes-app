import User from "./users.model";
import { UserBody } from "./users.schema";

export const signUp = async (user: UserBody) => {
  return await User.create(user);
};

export const signIn = async (email: string) => {
  return await User.findByPk(email);
};

export const getAllUsers = async () => {
  return await User.findAll();
};

export const deleteUser = async (email: string) => {
  await User.update(
    {
      active: false,
    },
    {
      where: {
        email,
      },
      returning: true,
    }
  );
};
