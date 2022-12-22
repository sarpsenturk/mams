// Configure environment variables
import * as dotenv from "dotenv"

dotenv.config()

import express from 'express'
import mysql from "mysql2/promise"
import api from "./rotues/api.js";

// Configuration
const PORT = process.env.PORT | 8000
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PORT = process.env.DB_PORT | 3306
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME
if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) {
    throw Error("Database configuration is not setup. Please create a .env file containing database configuration")
}

// Create database connection
console.log(`Creating mysql connection pool ${DB_USER}@${DB_HOST}:${DB_PORT} with password...`)
const db_pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

// Create the application
const app = express()
app.use(express.json())

// Set up /api route
app.use("/api", api(db_pool))

// Listen on specified port
app.listen(PORT, () => {
    console.log(`MAMS backend listening on port ${PORT}...`)
})

// Destroy mysql connection pool on exit
process.on("exit", () => {
    mysql.end()
})
