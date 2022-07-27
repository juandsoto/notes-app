import jwt, { JsonWebTokenError } from "jsonwebtoken";
import argon2 from "argon2";
import { JWT_SECRET_KEY } from "../constants";
import { UserBody } from "../users/users.schema";

export const generateToken = (payload: Omit<UserBody, "password">) => {
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "7d" });
  return token;
};

export const comparePassword = async (original: string, password: string): Promise<boolean> => {
  return await argon2.verify(original, password);
};

export const hashPassword = async (password: string) => {
  return argon2.hash(password);
};

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return decoded;
  } catch (error: any) {
    throw new JsonWebTokenError(error.message);
  }
}
