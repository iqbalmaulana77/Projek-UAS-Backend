const AuthController = require("../controllers/AuthController.js")
const PatientRegistrationController = require("../controllers/PatientRegistrationController.js")
const PatientController = require("../controllers/PatientController.js")

const { validateToken } = require("../functions/token.js")

const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    res.send("API is on fire")
})

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)


router.get("/patients/history", validateToken, PatientRegistrationController.index)
router.get("/patients/history/:id", validateToken, PatientRegistrationController.show)
router.post("/patients/checkin", validateToken, PatientRegistrationController.checkin)
router.put("/patients/checkout/:id", validateToken, PatientRegistrationController.checkout)
router.get("/patients/status/:status", validateToken, PatientRegistrationController.searchByStatus)

router.get("/patients", validateToken, PatientController.index)
router.get("/patients/:id", validateToken, PatientController.show)
router.get("/patients/search/:name", validateToken, PatientController.searchByName)
router.post("/patients", validateToken, PatientController.store)
router.put("/patients/:id", validateToken, PatientController.update)
router.delete("/patients/:id", validateToken, PatientController.destroy)

module.exports = router
