import { Router } from "express";
import {
  handleFetchSingleUser,
  handleFetchUsers,
  handleLoginUser,
  handleRegisterUser,
} from "../controllers/userController/userController";
const userRouter = Router();
userRouter.route("/register").post(handleRegisterUser);
userRouter.route("/login").post(handleLoginUser);
userRouter.route("/fetchAllUsers").get(handleFetchUsers);
userRouter.route("/fetchSingleUser/:id").get(handleFetchSingleUser);
export { userRouter };
