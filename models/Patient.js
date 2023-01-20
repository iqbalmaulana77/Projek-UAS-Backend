const db = require("../config/database.js")

class Patient {
    static table = 'patients';

    // Get All Patients
    static all() {
        return new Promise((resolve, reject) => {
            const query = `SELECT p.*, count(pr.id) AS patient_registrations_count FROM ${this.table} AS p LEFT JOIN patient_registrations AS pr ON p.id = pr.patient_id GROUP BY p.id`
            db.query(query, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    // Get Patient by ID
    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.table} WHERE id = ${id}`
            db.query(query, (err, result) => {
                if (err) reject(err)

                const query = `SELECT count(id) as total FROM patient_registrations WHERE patient_id = ${id}`
                db.query(query, (err, result2) => {
                    if (err) reject(err)

                    result[0].patient_registrations_count = result2[0].total
                    resolve(result)
                })
            })
        })
    }

    // Get Patient by Name
    static findByName(name) {
        return new Promise((resolve, reject) => {
            const query = `SELECT p.*, count(pr.id) AS patient_registrations_count FROM ${this.table} AS p LEFT JOIN patient_registrations AS pr ON p.id = pr.patient_id WHERE p.name LIKE "%${name}%" GROUP BY p.id`
            db.query(query, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    // Create Patient
    static create(data) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${this.table} SET ?`
            db.query(query, data, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    // Update Patient
    static update(id, data) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE ${this.table} SET ? WHERE id = '${id}'`
            db.query(query, data, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    // Delete Patient
    static destroy(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${this.table} WHERE id = '${id}'`
            db.query(query, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }
}

module.exports = Patient
