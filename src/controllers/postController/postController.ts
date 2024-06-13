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
    // *TODO:Add pagination here
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
export const handleGetSinglePost = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw { status: 400, message: "Post id is required!!" };
    const singlePost = await prisma.post.findUnique({
      where: { post_id: id },
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
      .json(new apiResponse(200, singlePost, "Post fetched successfully!!"));
  }
);

export const handleUpdatePost = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw { status: 400, message: "Post id is required!!" };
    const { title, content } = req.body;
    if (!title || !content)
      throw {
        status: 400,
        message: "Title and content are required!!",
      };
    const updatePost = await prisma.post.update({
      where: { post_id: id },
      data: {
        title,
        content,
      },
      include: {
        author: {
          select: {
            username: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
    return res
      .status(201)
      .json(
        new apiResponse(
          201,
          updatePost,
          `Post updated successfully by ${updatePost.author.fullName || "unknown user"} `
        )
      );
  }
);
