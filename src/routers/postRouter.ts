import { Router } from "express";
import {
  handleCreatePost,
  handleDeletePost,
  handleGetAllPosts,
  handleGetSinglePost,
  handleUpdatePost,
} from "../controllers/postController/postController";
const postRouter = Router();
postRouter.route("/createPost").post(handleCreatePost);
postRouter.route("/getAllPosts").get(handleGetAllPosts);
postRouter.route("/getSinglePost/:id").get(handleGetSinglePost);
postRouter.route("/updatePost/:id").put(handleUpdatePost);
postRouter.route("/deletePost/:id").delete(handleDeletePost);
export { postRouter };
