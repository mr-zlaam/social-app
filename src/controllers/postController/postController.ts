import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler";
import { prisma } from "../../db";
import { apiResponse } from "../../utils/ApiResponse";

export const CreatePost = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;
  if (!title || !content || !authorId)
    throw { status: 400, message: "All fields are required!!" };
  console.log(title, content, authorId);
  const post = await prisma.post.create({
    data: { title, content, authorId },
    include: { author: true, comments: true },
  });
  return res
    .status(201)
    .json(new apiResponse(201, post, "Post created successfully!!"));
});
