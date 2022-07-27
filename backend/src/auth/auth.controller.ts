import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UserBody } from "../users/users.schema";
import { signUp, signIn } from "../users/users.service";
import { comparePassword, generateToken } from "../utils/jwt";
import { SignInBody } from "./auth.schema";
import CustomError from "../exceptions/CustomError";

export const signUpHandler = async (req: Request<{}, {}, UserBody>, res: Response<string>, next: NextFunction) => {
  try {
    await signUp(req.body);
    return signInHandler(req, res, next);
  } catch (error: any) {
    return next(error);
  }
};

export const signInHandler = async (req: Request<{}, {}, SignInBody>, res: Response<string>, next: NextFunction) => {
  try {
    const user: any = await signIn(req.body.email);

    if (!user.active) {
      throw new CustomError({
        name: "Forbidden",
        message: "user is not active",
        status: StatusCodes.FORBIDDEN,
      });
    }

    const isPasswordCorrect = await comparePassword(user.toJSON().password, req.body.password);

    if (!user || !isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Invalid email or password");
    }

    const { password, ...rest } = user;

    const token: string = generateToken(rest);

    res.cookie("accessToken", token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });
    return res.status(StatusCodes.OK).send(token);
  } catch (error) {
    return next(error);
  }
};
