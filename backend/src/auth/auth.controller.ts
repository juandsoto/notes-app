import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserBody } from "../users/users.schema";
import { signUp, signIn } from "../users/users.service";
import { comparePassword, generateToken } from "../utils/jwt";
import { SignInBody } from "./auth.schema";
import CustomError from "../exceptions/CustomError";

export const signUpHandler = async (req: Request<{}, {}, UserBody>, res: Response<{}>, next: NextFunction) => {
  try {
    await signUp(req.body);
    return signInHandler(req, res, next);
  } catch (error: any) {
    return next(error);
  }
};

export const signInHandler = async (req: Request<{}, {}, SignInBody>, res: Response<{}>, next: NextFunction) => {
  try {
    const user: any = await signIn(req.body.email);

    if (!user) {
      throw new CustomError({
        message: "Invalid email or password",
        status: StatusCodes.UNAUTHORIZED,
      });
    }

    if (!user.active) {
      throw new CustomError({
        name: "Forbidden",
        message: "user is not active",
        status: StatusCodes.FORBIDDEN,
      });
    }

    const isPasswordCorrect = await comparePassword(user.toJSON().password, req.body.password);

    if (!isPasswordCorrect) {
      throw new CustomError({
        message: "Invalid email or password",
        status: StatusCodes.UNAUTHORIZED,
      });
    }

    const { password, ...rest } = user.dataValues;

    const token: string = generateToken(rest);

    res.cookie("accessToken", token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });
    return res.status(StatusCodes.OK).json({ ...rest, token });
  } catch (error) {
    return next(error);
  }
};
