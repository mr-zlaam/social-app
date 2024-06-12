import { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler";
import { prisma } from "../../db";
import { apiResponse } from "../../utils/ApiResponse";
import { passwordHasher, verifyPassword } from "../../utils/PasswordHasher";

//* Handle Register function
export const handleRegisterUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, fullName, email, password } = req.body;
    if (!username || !fullName || !email || !password)
      throw { status: 400, message: "All fields are required!!" };
    const isUserAlreadyExist = await prisma.user.findFirst({
      where: {
        email: email,
        username: username,
      },
    });

    if (isUserAlreadyExist)
      throw { status: 400, message: "User already exist with same details!!" };
    const hashedPassword = await passwordHasher(password, res);
    const createdUser = await prisma.user.create({
      data: {
        username,
        fullName,
        email,
        password: hashedPassword as string,
      },
      select: { username: true, fullName: true, email: true },
    });
    return res
      .status(201)
      .json(
        new apiResponse(
          201,
          createdUser,
          `${createdUser.fullName || "user"} registered successfully!!`
        )
      );
  }
);

//* Handle Register function
export const handleLoginUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password)
      throw { status: 400, message: "Please Provide all fields!!" };
    const isUserAlreadyExist = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!isUserAlreadyExist)
      throw { status: 400, message: "Please register yourself first!!" };
    // checking credentials
    await verifyPassword(password, isUserAlreadyExist?.password as string, res);
    res.send("helloworld");
  }

  //*end of fn
);

//* Handle Register function
export const handleFetchUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, fullName: true, email: true },
    });
    return res
      .status(200)
      .json(new apiResponse(200, users, "All users fetched successfully"));
  }
);
