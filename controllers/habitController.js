const mysql = require("mysql")
const pool = require("../sql/connection")

function logQuery(sql, values) {
  console.log("Executing query:", sql)
  console.log("Query values:", values)
}

const getAllHabits = (req, res) => {
  let sql = "select * from habits where user_id = ?"

  let userId = req.params.user_id
  params = [userId]
  logQuery(sql, params)

  pool.query(sql, params, (err, results) => {
    if (err) {
      console.log("error");
    } else {
      res.json(results)
    }
  })
}

const createHabit = (req, res) => {
  let sql = "insert into habits(user_id, habit_name, last_logged, streak) values (?, ?, ?, 1)"

  let userId = req.body.userId
  let habit_name = req.body.habit_name
  let last_logged = req.body.last_logged

  params = [userId, habit_name, last_logged]

  logQuery(sql, params)
  pool.query(sql, params, (err, results) => {
    if (err) {
      console.log("error");
    } else {
      res.sendStatus(200)
    }
  })
}

const deleteHabit = (req, res) => {
  let sql = "delete from habits where user_id = ? and id = ?"

  let userId = req.params.user_id
  let id = req.params.id
  params = [userId, id]

  logQuery(sql, params)

  pool.query(sql, params, (err, results) => {
    if (err) {
      console.log("error");
    } else {
      res.sendStatus(200)
    }
  })
}

const updateStreak = (req, res) => {
  let sql = "update habits set streak = streak + ?, last_logged = ? where id = ?"

  let streak = req.params.streak
  let last_logged = req.params.last_logged
  let id = req.params.id
  
  params = [streak, last_logged, id]
  logQuery(sql, params)

  pool.query(sql, params, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200)
    }
  })
}

module.exports = {
  getAllHabits, createHabit, deleteHabit, updateStreak
}
