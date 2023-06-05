const express = require("express")
const router = express.Router()
const weightController = require("../controllers/weightController")
const auths = require("../middleware/auths")

router.get("/weights/:user_id", weightController.getAllWeights)
router.get("/weights/:weighIn", auths.checkJWT, weightController.getWeightByDate)
router.post("/weights", weightController.logWeighIn)
router.delete("/weights/:user_id/:weigh_in/:weight_lbs", weightController.deleteWeighIn)

module.exports = router
