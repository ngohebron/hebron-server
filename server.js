
const express = require("express");
require("dotenv").config();
const { connectToDatabase } = require("./_helpers/sqldb");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

connectToDatabase();

app.listen(3000, () => console.log("Server running on port 3000"));
