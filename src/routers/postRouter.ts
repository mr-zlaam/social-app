import { Router } from "express";
import { CreatePost } from "../controllers/postController/postController";
const postRouter = Router();
postRouter.route("/createPost").post(CreatePost);
export { postRouter };
