import { Router } from "express";
import {
  handleDeleteUserr,
  handleFetchSingleUser,
  handleFetchUsers,
  handleLoginUser,
  handleRegisterUser,
  handleUpdateUser,
} from "../controllers/userController/userController";
import { houseController } from "../controllers/houseController/houseController";
const userRouter = Router();
userRouter.route("/register").post(handleRegisterUser);
userRouter.route("/login").post(handleLoginUser);
userRouter.route("/fetchAllUsers").get(handleFetchUsers);
userRouter.route("/fetchSingleUser/:id").get(handleFetchSingleUser);
userRouter.route("/updateUser/:id").put(handleUpdateUser);
userRouter.route("/deleteUser/:id").delete(handleDeleteUserr);
//* House Router
userRouter.route("/createHouse").post(houseController);
export { userRouter };
