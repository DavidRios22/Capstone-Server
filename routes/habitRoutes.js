const express = require("express")
const router = express.Router()
const habitController = require("../controllers/habitController")
// const auths = require("../middleware/auths")

router.get("/habits/:user_id", habitController.getAllHabits)
router.post("/habits", habitController.createHabit)
router.delete("/habits/:user_id/:id", habitController.deleteHabit)
router.put("/habits/:streak/:last_logged/:id", habitController.updateStreak)



module.exports = router