const getAllHabits = (req, res) => {
  console.log("getting Habits")
  res.send("THIS IS THE HABITS")
}

module.exports = {
  getAllHabits,
}
