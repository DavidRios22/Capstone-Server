const express = require("express")
const router = express.Router()
const weightController = require("../controllers/weightController")
const auths = require("../middleware/auths")

router.get("/weights", auths.checkJWT, weightController.getAllWeights)
router.get("/weights/:weighIn", auths.checkJWT, weightController.getWeightByDate)
router.post("/weights", auths.checkJWT, weightController.logWeighIn)
router.delete("/weights/:weighIn", auths.checkJWT, weightController.deleteWeighIn)

module.exports = router
