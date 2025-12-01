const mysql = require("mysql2/promise");
require("dotenv").config();

let connection = null;

async function connectToDatabase() {
    if (!connection) {
        try {
            connection = await mysql.createConnection({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DB,
                port: process.env.MYSQL_PORT
            });

            console.log("Connected to MySQL database");
        } catch (err) {
            console.log("Error connecting to MySQL database", err);
            throw err;
        }
    }
}

function getDatabase() {
    if (!connection) {
        throw new Error("MySQL not initialized. Call connectToDatabase first.");
    }
    return connection;
}

async function closeDatabaseConnection() {
    if (connection) {
        await connection.end();
        console.log("Closed MySQL connection");
        connection = null;
    }
}

module.exports = { connectToDatabase, getDatabase, closeDatabaseConnection };
