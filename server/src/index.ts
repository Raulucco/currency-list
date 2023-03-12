import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import data from "./data.json";

const app = express();
app.use(cors());
const { PORT = 3000 } = process.env;

app.get("/api/data.json", (_: Request, res: Response) => {
  res.json(data);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://localhost:${PORT}`);
});
