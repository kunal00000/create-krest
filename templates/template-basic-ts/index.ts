import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PORT } from "./config";
import todoRouter from "./routes/todo.routes";

const app = express();

// global middlewares
app.use(bodyParser.json());
app.use(cors({ origin: "*" })); // default: allows all origins to access the server

// * routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to Create-KREST API" });
});
app.use("/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
