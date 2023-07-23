const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./config");
const todoRouter = require("./routes/todo.routes");
const userRouter = require("./routes/auth.routes");

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
