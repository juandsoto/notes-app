import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { UserBody } from "../users/users.schema";
import { StatusCodes } from "http-status-codes";
import { ADMIN_EMAIL } from "../constants";
import CustomError from "../exceptions/CustomError";

export const deserializeUser = (req: Request, res: Response<{}, { user: Omit<UserBody, "password">; isAdmin: boolean }>, next: NextFunction) => {
  try {
    const accessToken = (req.headers.authorization || req.cookies.accessToken || "").replace(/^Bearer\s/, "");

    if (!accessToken) return next();

    const decoded = verifyJwt(accessToken);

    if (decoded) {
      res.locals.user = decoded as typeof res.locals.user;
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export const requireUser = (req: Request, res: Response<{}, { user: Omit<UserBody, "password">; isAdmin: boolean }>, next: NextFunction) => {
  if (!res.locals.user) {
    throw new CustomError({
      message: "accesstoken required, signin first",
      status: StatusCodes.BAD_REQUEST,
    });
  }
  return next();
};

export const isAdmin = (req: Request, res: Response<{}>, next: NextFunction) => {
  if (res.locals.user.email === ADMIN_EMAIL) {
    res.locals.isAdmin = true;
  }
  if (!res.locals.isAdmin) return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Not authorized" });
  return next();
};

export const isOwnerOrAdmin = (
  req: Request<{ email: string }>,
  res: Response<{}, { user: { email: string }; isAdmin: boolean; isOwner: boolean }>,
  next: NextFunction
) => {
  if (res.locals.user.email === ADMIN_EMAIL) {
    res.locals.isAdmin = true;
  }

  if (res.locals.user.email === req.params.email) {
    res.locals.isOwner = true;
  }

  console.log("admin", res.locals.isAdmin, "owner", res.locals.isOwner);
  if (res.locals.isAdmin) return next();
  if (res.locals.isOwner) return next();
  return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Not authorized" });
};

export const errorHandler = (error: any, req: Request, res: Response<{}>, next: NextFunction) => {
  if (!error) return next();

  if (error instanceof CustomError) {
    return res.status(error.status).json({
      error: error.message,
    });
  }

  switch (error.name) {
    case "user is not active": {
      return res.status(StatusCodes.FORBIDDEN).json({
        error: error.message,
      });
    }
    case "SequelizeUniqueConstraintError": {
      return res.status(StatusCodes.CONFLICT).json({
        error: "user with username/email already exists",
      });
    }
    default: {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
};
