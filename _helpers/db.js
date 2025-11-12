const {MongoClient} = require('mongodb')
const { ObjectId } = require('mongodb')
require("dotenv").config();
const url = process.env.MONGODB_URI
const dbName = process.env.DBNAME

let client;
let database = null;

async function connectToDatabase() {
    if (!database) {
      try {
            client = new MongoClient(url); 
            await client.connect();
            console.log("connected to database");
            database = client.db(dbName);
        } catch (err) {
            console.log("Error in connecting to database", err);
            throw err;
        }
    }
}

function closeDatabaseConnection(){
    if(client){
        client.close();
        console.log("closed the databse connection")
    }
}

function getDatabase(){
    if(!database){
        throw new Error("Database not initialized. Call connection to database first")
    }
    return database;
}

module.exports = { connectToDatabase, closeDatabaseConnection, getDatabase, ObjectId };