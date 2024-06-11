import bcrypt from "bcrypt";
import { type Response } from "express";
import { apiResponse } from "./ApiResponse";

export const passwordHasher = async (password: string, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error: any) {
    console.log(error.message);
    return res
      .status(500)
      .json(
        new apiResponse(
          500,
          error.message || "internal server error while hashing the password"
        )
      );
  }
};
