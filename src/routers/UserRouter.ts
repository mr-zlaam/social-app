import { Router } from "express";
import {
  handleFetchUser,
  handleLoginUser,
  handleRegisterUser,
} from "../controllers/userController/userController";
const userRouter = Router();
userRouter.route("/register").post(handleRegisterUser);
userRouter.route("/login").post(handleLoginUser);
userRouter.route("/fetchUsers").get(handleFetchUser);
export { userRouter };
