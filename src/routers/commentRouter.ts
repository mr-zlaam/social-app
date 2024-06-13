import { Router } from "express";
import {
  handleDeletePost,
  handleGetAllPosts,
  handleGetSinglePost,
  handleSearchPost,
  handleUpdatePost,
} from "../controllers/postController/postController";
import { handleCreateComment } from "../controllers/commentController/commentController";
const commentRouter = Router();
commentRouter.route("/createComment").post(handleCreateComment);
commentRouter.route("/getAllPosts").get(handleGetAllPosts);
commentRouter.route("/getSinglePost/:id").get(handleGetSinglePost);
commentRouter.route("/updatePost/:id").put(handleUpdatePost);
commentRouter.route("/deletePost/:id").delete(handleDeletePost);
commentRouter.route("/getAllPosts/search").get(handleSearchPost);
export { commentRouter };
