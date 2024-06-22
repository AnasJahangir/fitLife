const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", userRoutes);
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(errorMiddleware);

module.exports = app;
