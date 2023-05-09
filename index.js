const express = require("express")
const app = express()
const port = process.env.port || 4001

const authRoutes = require("./routes/authRoutes")
const weightRoutes = require("./routes/weightRoutes")
const habitRoutes = require("./routes/habitRoutes")

app.use(express.static("public"))
app.use(express.json())

app.use("/", authRoutes)
app.use("/", habitRoutes)
app.use("/", weightRoutes)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`)
})
