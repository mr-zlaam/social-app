import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler";
import { prisma } from "../../db";
import { apiResponse } from "../../utils/ApiResponse";
// * handle create comment
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
// * handle fetched all comments

export const handleGetAllComment = asyncHandler(
  async (req: Request, res: Response) => {
    const comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            fullName: true,
            username: true,
          },
        },
        post: {
          select: {
            createdAt: true,
            updatedAt: true,
            post_id: true,
            title: true,
            author: {
              select: {
                fullName: true,
                username: true,
              },
            },
          },
        },
      },
    });
    return res
      .status(200)
      .json(
        new apiResponse(200, comments, "All comments fetched successfully!!")
      );
  }
);
// *update comment
export const handleUpdateComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { commentContent } = req.body;
    const updatedComment = await prisma.comment.update({
      where: {
        comment_id: commentId,
      },
      data: {
        commentContent,
      },
    });
    return res
      .status(200)
      .json(
        new apiResponse(200, updatedComment, "Comment updated successfully!!")
      );
  }
);

// *delete comment

export const handleDeleteComment = asyncHandler(
  async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const deletedComment = await prisma.comment.delete({
      where: {
        comment_id: commentId,
      },
    });
    return res
      .status(200)
      .json(
        new apiResponse(200, deletedComment, "Comment deleted successfully!!")
      );
  }
);
