import app from "./src/app";
import { PORT } from "./src/config";
import connectDB from "./src/db";
connectDB()
  .then(() => console.log("database connected successfully"))
  .catch((err) => {
    console.log("database connection failed", err.message);
  });
