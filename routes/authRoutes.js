const express = require("express")
const authContoller = require("../controllers/authController")
const router = express.Router()

router.post("/register", authContoller.register)
router.post("/login", authContoller.login)
router.post("/userid", authContoller.userid)

module.exports = router
