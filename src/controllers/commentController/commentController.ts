import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler";
import { prisma } from "../../db";
import { apiResponse } from "../../utils/ApiResponse";

export const handleCreateComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { authorId, post_id, commentContent } = req.body;
    if (!authorId || !post_id || !commentContent)
      throw { status: 400, message: "All fields are required!!" };
    const createdComment = await prisma.comment.create({
      data: {
        authorId,
        post_id,
        commentContent,
      },
      include: {
        author: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });
    return res
      .status(201)
      .json(new apiResponse(201, createdComment, "commented successfully!!"));
  }
);
