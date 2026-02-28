import app from "./src/app.js";
import connectDB from "./src/config/connectDB.js";
import dotenv from "dotenv";
dotenv.config();

connectDB().then(() =>
  app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on port ${process.env.PORT} 🚀`);
  }),
);
