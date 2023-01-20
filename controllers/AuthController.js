const User = require("../models/User.js")
const { generateToken, validateToken } = require('../functions/token')
const crypto = require('crypto')

const salt = '43b8ecfe65840c26b844cb70b4efe8c2'

// Membuat Class AuthController
class AuthController {

	async register(req, res) {
		try {
			const { name, email, password } = req.body
            const encryptedPassword = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex')

			const user = await User.create({ name, email, password: encryptedPassword })
			const data = {
				statusCode: 201,
				message: `Success`,
				data: {
					id: user.insertId,
					name,
					email,
					password
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

	async login(req, res) {
		try {
			const { email, password } = req.body
			const users = await User.findByEmail(email)

            if (users.length == 0) {
				return res.status(404).json({
                    statusCode: 404,
                    message: 'Data not found'
                })
			}

            const encryptedPassword = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex')
            if (encryptedPassword != users[0].password) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Wrong password'
                })
            }

            const token = await generateToken(users[0])

			const data = {
                statusCode: 200,
				message: `Success`,
				token
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

// Membuat object AuthController
const object = new AuthController()

// Export object AuthController
module.exports = object
