const PatientRegistration = require("../models/PatientRegistration.js")
const Patient = require("../models/Patient.js")

// Membuat Class PasienRegistrasiController
class PatientRegistrationController {

	async index(req, res) {
		try {
			const historyPatients = await PatientRegistration.all()
			const data = {
				statusCode: 200,
				message: "Get All Resource",
				data: historyPatients
			}

			res.status(200).json(data)
		} catch (error) {
			res.status(400).json({
				statusCode: 400,
				message: 'Bad Request',
				response: 'Something went wrong'
			})
		}
	}

	async show(req, res) {
		try {
			const { id } = req.params
			if (!id) {
				return res.status(400).json({
					statusCode: 400,
					message: 'id is required',
				})
			}

			const patientRegistration = await PatientRegistration.findById(id)
			if (patientRegistration.length == 0) {
				return res.status(404).json({
					statusCode: 404,
					message: 'Resource not found',
				})
			}

			const data = {
				statusCode: 200,
				message: `Get Detail resource`,
				data: patientRegistration[0]
			}

			res.status(200).json(data)
		} catch (error) {
			res.status(400).json({
				statusCode: 400,
				message: 'Bad Request',
				response: 'Something went wrong'
			})
		}
	}

	async searchByStatus(req, res) {
		try {
			const { status } = req.params
			if (!status) {
				res.status(400).json({
					statusCode: 400,
					message: 'status is required',
				})
			}

			const historyPatients = await PatientRegistration.findByStatus(status)
			const data = {
				statusCode: 200,
				message: `Get ${status} resource`,
				total: historyPatients.length,
				data: historyPatients
			}

			res.status(200).json(data)
		} catch (error) {
			res.status(400).json({
				statusCode: 400,
				message: 'Bad Request',
				response: 'Something went wrong'
			})
		}
	}

	async checkin(req, res) {
		try {
			const { patient_id, create_by } = req.body

			const patient = await Patient.findById(patient_id)
			if (patient.length == 0) {
				res.status(404).json({
					statusCode: 404,
					message: 'Data not found',
				})
			}

			const patientRegistration = await PatientRegistration.create({
				patient_id, status: 'positive', in_date_at: new Date(), create_by, created_at: new Date()
			})

			const data = {
				statusCode: 201,
				message: `Success`,
				data: {
					id: patientRegistration.insertId,
					patient_id,
					create_by
				}
			}

			res.status(201).json(data)
		} catch (error) {
			res.status(400).json({
				statusCode: 400,
				message: 'Bad Request',
				response: 'Something went wrong'
			})
		}
	}

	async checkout(req, res) {
		try {
			const { id } = req.params
			const { status, update_by } = req.body

			const patientRegistration = await PatientRegistration.findById(id)
			if (patientRegistration.length == 0) {
				res.status(404).json({
					statusCode: 404,
					message: 'Data not found',
				})
			}

			await PatientRegistration.update(id, {
				status, out_date_at: new Date(), update_by, updated_at: new Date()
			})

			const data = {
				statusCode: 200,
				message: `Success`,
				data: {
					id,
					status,
					update_by
				}
			}

			res.status(200).json(data)
		} catch (error) {
			res.status(400).json({
				statusCode: 400,
				message: 'Bad Request',
				response: 'Something went wrong'
			})
		}
	}
}

// Membuat object PasienRegistrasiController
const object = new PatientRegistrationController()

// Export object PasienRegistrasiController
module.exports = object
