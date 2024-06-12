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
          null,
          error.message || "internal server error while hashing the password"
        )
      );
  }
};
export const verifyPassword = async (
  password: string,
  existingPassword: string,
  res: Response
) => {
  try {
    const isPasswordValid = await bcrypt.compare(password, existingPassword);
    if (!isPasswordValid) throw { status: 403, message: "Invalid Credentials" };
    return isPasswordValid;
  } catch (error: any) {
    return res
      .status(500)
      .json(
        new apiResponse(
          500,
          null,
          error.message || "Internal server Error while checking credentials"
        )
      );
  }
};
