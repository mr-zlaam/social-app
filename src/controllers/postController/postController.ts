import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler";
import { prisma } from "../../db";
import { apiResponse } from "../../utils/ApiResponse";
// * Create Post Method
export const handleCreatePost = asyncHandler(
  async (req: Request, res: Response) => {
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
  }
);
// * Fetch All Posts Method
export const handleGetAllPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            fullName: true,
            email: true,
            posts: {
              select: {
                title: true,
              },
            },
            comments: true,
          },
        },
        comments: true,
      },
    });
    return res
      .status(200)
      .json(
        new apiResponse(200, posts, "All Post data fetched successfully!!")
      );
  }
);
