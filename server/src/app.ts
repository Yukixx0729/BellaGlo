import express, { Application } from "express";
import userRouter from "./controls/user";
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
