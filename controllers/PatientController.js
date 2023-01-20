const Patient = require("../models/Patient.js")

// Membuat Class PatientController
class PatientController {

	async index(req, res) {
		try {
			const patients = await Patient.all()
			const data = {
                statusCode: 200,
				message: "Get All Resource",
				data: patients
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

    async searchByName(req, res) {
		try {
			const { name } = req.params
            if (!name) {
				return res.status(400).json({
					statusCode: 400,
					message: 'name is required',
				})
			}

			const patients = await Patient.findByName(name)
			if (patients.length == 0) {
				return res.status(404).json({
                    statusCode: 404,
                    message: 'Resource not found'
                })
			}

			const data = {
                statusCode: 200,
				message: `Get searched resource`,
				data: patients
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

			const patients = await Patient.findById(id)
			if (patients.length == 0) {
				return res.status(404).json({
                    statusCode: 404,
                    message: 'Resource not found'
                })
			}

			const data = {
                statusCode: 200,
				message: `Get Detail Resource`,
				data: patients[0]
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

	async store(req, res) {
		try {
			const { name, phone, address } = req.body

			const patients = await Patient.create({ name, phone, address, created_at: new Date() })

			const data = {
                statusCode: 201,
				message: `Resource is added successfully`,
				data: {
					id: patients.insertId,
					name,
					phone,
					address
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

	async update(req, res) {
		try {
			const { id } = req.params
			const { name, phone, address } = req.body

			const patients = await Patient.findById(id)
			if (patients.length == 0) {
				return res.status(404).json({
                    statusCode: 404,
                    message: 'Resource not found'
                })
			}

			await Patient.update(id, { name, phone, address, updated_at: new Date() })

			const data = {
                statusCode: 200,
				message: `Resource is update successfully`,
				data: { id, name, phone, address }
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

	async destroy(req, res) {
		try {
			const { id } = req.params

			const patients = await Patient.findById(id)
			if (patients.length == 0) {
				return res.status(404).json({
                    statusCode: 400,
                    message: 'Resource not found'
                })
			}

			await Patient.destroy(id)

			const data = {
                statusCode: 200,
				message: `Resource is delete successfully`
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

// Membuat object PatientController
const object = new PatientController()

// Export object PatientController
module.exports = object
