const mysql = require("mysql")
const pool = require("../sql/connection")
const jwt = require("jsonwebtoken")

function logQuery(sql, values) {
  console.log("Executing query:", sql)
  console.log("Query values:", values)
}


const getAllWeights = (req, res) => {
  let sql = "select * from weight where user_id = ?"
  let user_id = req.params.user_id

  params = [user_id]
  pool.query(sql, params, (err, results) => {
    logQuery(sql, params)
    if (err) {
      console.log("getAllWeights query failed ", err)
      res.send(400)
    } else {
      if (results.length == 0) {
        console.log("getallweights failed");
        res.json("no weights at specified userid")
      } else {
        res.json(results)
      }
    }
  })
}

const getWeightByDate = (req, res) => {
  let headerValue = req.get("Authorization")
  let parts = headerValue.split(" ")
  let signedToken = parts[1]
  let unsigned = jwt.verify(signedToken, process.env.JWT_SECRET)
  let userId = unsigned.userId

  let sql = "select * from weight where user_id = ? and weigh_in = ?"

  let weigh_in = req.params.weighIn

  params = [userId, weigh_in]

  pool.query(sql, params, (err, results) => {
    if (err) {
      console.log("getWeightByDate query failed ", err)
      res.send(400)
    } else {
      if (results.length == 0) {
        console.log("getWeightByDate query failed ", err)
        res.send("No weigh ins to select at specified date")
      } else {
        res.json(results)
      }
    }
  })
}

// const logWeighIn = (req, res) => {
//   let headerValue = req.get("Authorization")
//   let parts = headerValue.split(" ")
//   let signedToken = parts[1]
//   let unsigned = jwt.verify(signedToken, process.env.JWT_SECRET)
//   let userId = unsigned.userId

//   let sql = "insert into weight(user_id, weigh_in, weight_lbs) values (?, ?, ?)"

//   let date = req.body.date
//   let weight = req.body.weight

//   params = [userId, date, weight]

//   pool.query(sql, params, (err, results) => {
//     if (err) {
//       console.log("logWeighIn query failed ", err)
//       res.sendStatus(500)
//     } else {
//       res.sendStatus(200)
//     }
//   })
// }

const logWeighIn = (req, res) => {
  let sql = "insert into weight(user_id, weigh_in, weight_lbs) values (?, ?, ?)"

  let userId = req.body.userId
  let date = req.body.date
  let weight = req.body.weight

  params = [userId, date, weight]

  pool.query(sql, params, (err, results) => {
    if (err) {
      console.log("logWeighIn query failed ", err)
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
}

const deleteWeighIn = (req, res) => {
  // let headerValue = req.get("Authorization")
  // let parts = headerValue.split(" ")
  // let signedToken = parts[1]
  // let unsigned = jwt.verify(signedToken, process.env.JWT_SECRET)
  // let userId = unsigned.userId
  
  let sql = "delete from weight where user_id = ? and weigh_in = ? and weight_lbs = ?;"
  
  let userId = req.params.user_id
  let date = req.params.weigh_in
  let weight = req.params.weight_lbs
  
  params = [userId, date, weight]
  
  logQuery(sql, params)
  pool.query(sql, params, (err, results) => {
    console.log(results);
    if (err) {
      console.log("deleteWeighIn query failed ", err)
      res.sendStatus(400)
    } else {
      if (results.affectedResults != 0) {
        res.json({ message: `Deleted ${results.affectedResults} user(s)` })
      } else {
        console.log("deleteWeighIn query failed ", err)
        res.send("No weigh ins to delete at specified date")
      }
    }
  })
}

module.exports = {
  getAllWeights,
  logWeighIn,
  getWeightByDate,
  deleteWeighIn,
}
