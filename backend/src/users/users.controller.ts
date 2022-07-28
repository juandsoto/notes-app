import { NextFunction, Request, Response } from "express";
import { getAllUsers, deleteUser } from "./users.service";
import { StatusCodes } from "http-status-codes";
import { DeleteUserParams } from "./users.schema";

export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    return next(error);
  }
};

export const deleteUserHandler = async (req: Request<DeleteUserParams, {}, {}, {}>, res: Response<{}>, next: NextFunction) => {
  try {
    await deleteUser(req.params.email);
    return res.status(StatusCodes.OK).json({ error: "User deleted" });
  } catch (error) {
    return next(error);
  }
};
