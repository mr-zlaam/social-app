import { Router } from "express";
import {
  handleCreatePost,
  handleGetAllPosts,
} from "../controllers/postController/postController";
const postRouter = Router();
postRouter.route("/createPost").post(handleCreatePost);
postRouter.route("/getAllPosts").get(handleGetAllPosts);
export { postRouter };
