import express, { Application } from "express";

require("dotenv").config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.static("client"));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
