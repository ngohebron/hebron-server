const express = require("express");
require("dotenv").config();
const { connectToDatabase } = require("./_helpers/sqldb");
const index = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");

const app = express();

app.use(express.json());
app.use("/api", index);
app.use(errorHandler);

connectToDatabase();

app.listen(3000, () => console.log("Server running on port 3000"));
