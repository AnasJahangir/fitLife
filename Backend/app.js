const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const adminService = require("./services/adminService");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(errorMiddleware);

module.exports = app;
