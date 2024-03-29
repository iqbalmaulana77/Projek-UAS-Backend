// Import mysql package
const mysql = require("mysql")
const dotenv = require("dotenv")

dotenv.config()

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
})

db.connect((err) => {
    if (err) {
        console.log("Connecting Error : " + err)
    }

    return
})

module.exports = db