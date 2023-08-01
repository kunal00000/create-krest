import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { PORT } from "./config";
import userRouter from "./routes/auth.routes";
import todoRouter from "./routes/todo.routes";

const app = express();

// global middlewares
app.use(bodyParser.json());
app.use(cors({ origin: "*" })); // default: allows all origins to access the server

// * routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});
app.use("/todos", todoRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
