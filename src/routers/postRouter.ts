import { Router } from "express";
import {
  handleCreatePost,
  handleGetAllPosts,
  handleGetSinglePost,
} from "../controllers/postController/postController";
const postRouter = Router();
postRouter.route("/createPost").post(handleCreatePost);
postRouter.route("/getAllPosts").get(handleGetAllPosts);
postRouter.route("/getSinglePost/:id").get(handleGetSinglePost);
export { postRouter };
