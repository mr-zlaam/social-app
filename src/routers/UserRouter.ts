import { Router } from "express";
import {
  handleFetchUsers,
  handleLoginUser,
  handleRegisterUser,
} from "../controllers/userController/userController";
const userRouter = Router();
userRouter.route("/register").post(handleRegisterUser);
userRouter.route("/login").post(handleLoginUser);
userRouter.route("/fetchAllUsers").get(handleFetchUsers);
export { userRouter };
