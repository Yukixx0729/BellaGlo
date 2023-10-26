import express, { Application } from "express";
import userRouter from "./controls/user";
import productRouter from "./controls/product";
import cartRouter from "./controls/cart";
require("dotenv").config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;
const cors = require("cors");
const httpLoggerMiddleware = require("./middleware/httpLogger");

app.use(express.static("client"));
app.use(express.json());
app.use(cors());

app.use(httpLoggerMiddleware);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
