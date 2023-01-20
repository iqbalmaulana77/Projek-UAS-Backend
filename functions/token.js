const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")

dotenv.config()

const { SECRET_KEY } = process.env

async function generateToken(data) {
    return jwt.sign(
        { data },
        SECRET_KEY,
        { expiresIn: '2h' }
    )
}

async function validateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

module.exports = { generateToken, validateToken }