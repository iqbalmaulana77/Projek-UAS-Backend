const db = require("../config/database.js")

class User {
    static table = 'users'

    // Get User by ID
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.table} WHERE email = '${email}'`
            db.query(query, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    // Create User
    static create(data) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${this.table} SET ?`
            db.query(query, data, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }
}

module.exports = User
