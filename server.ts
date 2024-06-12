import connectDB from "./src/db";
connectDB()
  .then(() => console.log("SUCCESS"))
  .catch((err) => {
    console.log("FAILURE!!!");
  });
