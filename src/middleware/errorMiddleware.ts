import { Request, Response, NextFunction } from "express";
import { ISDEVELOPMENT_ENVIRONMENT } from "../config";
import { Prisma } from "@prisma/client";

interface CustomError extends Error {
  status?: number;
  success?: boolean;
}

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: CustomError = new Error("Api Not Found");
  error.status = 404;
  next(error);
};

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status || 500);
  res.json({
    error: {
      success: false,
      statusCode: error.status || 500,
      // message: error.message || "some thing went wrong!!",
      message:
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
          ? "something went wrong!!"
          : error.message + "!!" || "internal server error!!",
      data: null,
      stack: ISDEVELOPMENT_ENVIRONMENT && error.stack ? error.stack : null,
      stacks: ISDEVELOPMENT_ENVIRONMENT
        ? error.stack
          ? error.stack
          : "No stack has been sent"
        : "", // for debugging
    },
  });
};
