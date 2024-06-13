import { Router } from "express";
import {
  handleCreateComment,
  handleGetAllComment,
} from "../controllers/commentController/commentController";
import {
  handleDeletePost,
  handleGetSinglePost,
  handleSearchPost,
  handleUpdatePost,
} from "../controllers/postController/postController";
const commentRouter = Router();
commentRouter.route("/createComment").post(handleCreateComment);
commentRouter.route("/getAllComments").get(handleGetAllComment);
commentRouter.route("/getSinglePost/:id").get(handleGetSinglePost);
commentRouter.route("/updatePost/:id").put(handleUpdatePost);
commentRouter.route("/deletePost/:id").delete(handleDeletePost);
commentRouter.route("/getAllPosts/search").get(handleSearchPost);
export { commentRouter };
