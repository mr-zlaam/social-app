import express from "express";
import bodyParser from "body-parser";
import { userRouter } from "../routers/userRouter";
import { DATA_LIMIT } from "../CONSTANTS";
import { errorHandler, notFoundHandler } from "../middleware/errorMiddleware";
import { postRouter } from "../routers/postRouter";
import { commentRouter } from "../routers/commentRouter";
const app = express();
app.use(bodyParser.json({ limit: DATA_LIMIT }));
app.use(
  bodyParser.urlencoded({
    limit: DATA_LIMIT,
    extended: true,
    parameterLimit: 50000,
  })
);

//* Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
//* Error middlware
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
