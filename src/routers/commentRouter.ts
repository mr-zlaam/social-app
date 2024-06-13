import { Router } from "express";
import {
  handleCreateComment,
  handleDeleteComment,
  handleGetAllComment,
  handleUpdateComment,
} from "../controllers/commentController/commentController";
const commentRouter = Router();
commentRouter.route("/createComment").post(handleCreateComment);
commentRouter.route("/getAllComments").get(handleGetAllComment);
commentRouter.route("/updateComment/:commentId").put(handleUpdateComment);
commentRouter.route("/deleteComment/:commentId").delete(handleDeleteComment);
export { commentRouter };
