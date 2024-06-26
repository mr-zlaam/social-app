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
      select: {
        username: true,
        fullName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
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

//* Handle Login function
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
    return res.status(200).json(
      new apiResponse(
        200,
        {
          id: isUserAlreadyExist?.id || "",
          username: isUserAlreadyExist?.username || "",
          fullName: isUserAlreadyExist?.fullName || "",
          email: isUserAlreadyExist?.email || "",
        },
        `${isUserAlreadyExist?.fullName || "User"} logined successfully`
      )
    );
  }

  //*end of fn
);

//* Handle Fetch All users
export const handleFetchUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res
      .status(200)
      .json(new apiResponse(200, users, "All users fetched successfully"));
  }
);
//* Handle fetch single user
export const handleFetchSingleUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          user,
          `${user?.username || "user"}'s data fetched successfully`
        )
      );
  }
);
//* Handle Update users

export const handleUpdateUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, fullName, email, password } = req.body;
    if (!username || !fullName || !email || !password)
      throw { status: 400, message: "All fields are required!!" };
    const isUserAlreadyExist = await prisma.user.findFirst({
      where: {
        AND: [
          {
            OR: [{ email: email }, { username: username }],
          },
          {
            NOT: { id: id },
          },
        ],
      },
    });
    if (isUserAlreadyExist)
      throw {
        status: 400,
        message: "username or email already exists",
      };

    const hashedUpdatePassword = await passwordHasher(password, res);

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        username,
        fullName,
        email,
        password: hashedUpdatePassword as string,
      },
    });
    return res
      .status(201)
      .json(
        new apiResponse(201, updatedUser, "Profile updated successfully!!")
      );
  }
);

//* Handle Delete User

export const handleDeleteUserr = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw { status: 400, message: "User ID is required!!" };
    const user = await prisma.user.delete({ where: { id: id } });
    return res
      .status(204)
      .json(new apiResponse(204, user, "user deleted successfully"));
  }
);
