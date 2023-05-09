const express = require("express")
const router = express.Router()
const habitController = require("../controllers/habitController")
const auths = require("../middleware/auths")

router.get("/habits", auths.checkJWT, habitController.getAllHabits)

module.exports = router