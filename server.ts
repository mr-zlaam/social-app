import connectDB from "./src/db";
connectDB()
  .then(() => console.log("success:true"))
  .catch((err) => {
    console.log("success:false");
  });
