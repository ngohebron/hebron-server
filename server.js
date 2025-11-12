const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middlewares/error-handler');
const path = require('path');
const { connectToDatabase } = require('./_helpers/db');

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: (origin, callback) => callback(null, true),
        credentials: true,
    })
)

app.use("/v1", routes)


app.use("/test", (req, res) => {
    try {
        res.send("👋Hello Book Shelf Server!");
    } catch (error) {
        console.log(error);
    }
});


async function startApp() {
    try {
        await connectToDatabase();
    } catch (error) {
        console.error("Error starting the application:", error);
        process.exit(1);
    }
}

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server listening on port " + port)
    startApp();
});