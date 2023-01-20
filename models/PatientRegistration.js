const db = require("../config/database.js")

class PatientRegistration {
    static table = 'patient_registrations'

    // Get All PatientRegistrations
    static all() {
        return new Promise((resolve, reject) => {
            const query = `SELECT pr.*, p.name, p.phone, p.address FROM ${this.table} as pr INNER JOIN patients p ON pr.patient_id = p.id`
            db.query(query, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    // Get PatientRegistration by ID
    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT pr.*, p.name, p.phone, p.address FROM ${this.table} as pr INNER JOIN patients p ON pr.patient_id = p.id WHERE pr.id = '${id}'`
            db.query(query, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    // Get PatientRegistration by Status
    static findByStatus(status) {
        return new Promise((resolve, reject) => {
            const query = `SELECT pr.*, p.name, p.phone, p.address FROM ${this.table} as pr INNER JOIN patients p ON pr.patient_id = p.id WHERE pr.status = '${status}'`
            db.query(query, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    // Create PatientRegistration
    static create(data) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${this.table} SET ?`
            db.query(query, data, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    // Update PatientRegistration
    static update(id, data) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE ${this.table} SET ? WHERE id = '${id}'`
            db.query(query, data, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }
}

module.exports = PatientRegistration
