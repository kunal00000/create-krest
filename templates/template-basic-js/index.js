const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./config");
const todoRouter = require("./routes/todo.routes");

const app = express();

// global middlewares
app.use(bodyParser.json());
app.use(cors({ origin: "*" })); // default: allows all origins to access the server

// * routes
app.use("/todos", todoRouter);

app.use(express.static("public"));
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
