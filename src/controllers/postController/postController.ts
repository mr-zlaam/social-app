import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler";

export const CreatePost = asyncHandler(
  async (req: Request, res: Response) => {}
);
