import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import teacherRoute from "./routes/teacherRouter.js";

dotenv.config({ path: "./.env" });

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Kết nối tới database thành công");
  })
  .catch((err) => {
    console.log("Kết nối tới database thất bại", err);
  });

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.listen(process.env.PORT || 8081, () => {
  console.log("ENV", process.env.NODE_ENV);
  console.log("Server is running!");
});

app.use("/api/v1/teachers", teacherRoute);
