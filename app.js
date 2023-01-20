/**
 * TODO 1: SETUP SERVER USING EXPRESS.JS.
 * UBAH SERVER DI BAWAH MENGGUNAKAN EXPRESS.JS.
 * SERVER INI DIBUAT MENGGUNAKAN NODE.JS NATIVE.
 */

const express = require("express")
const router = require("./routes/api.js")
const dotenv = require("dotenv")

dotenv.config()

const { APP_PORT } = process.env

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded())

app.use("/api", router)

app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`)
})
