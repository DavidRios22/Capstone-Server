const db = require("../sql/connection")
let argon2 = require("argon2")
let jwt = require("jsonwebtoken")

let register = async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let firstName = req.body.firstName

  let passwordHash

  try {
    passwordHash = await argon2.hash(password)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
    return
  }

  let params = [username, passwordHash, firstName]

  let sql =
    "insert into users (username, password_hash, first_name) values (?, ?, ?)"

  try {
    let results = await db.queryPromise(sql, params)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
    return
  }
}

let login = (req, res) => {
  let username = req.body.username
  let password = req.body.password

  let sql =
    "select id, first_name, password_hash from users where username = ?"
    
  let params = [username]

  db.query(sql, params, async (err, results) => {
    if (err) {
      console.log("Could not get user", err)
      res.sendStatus(500)
    } else {
      if (results.length > 1) {
        console.log("Returned too many results for username")
        res.sendStatus(500)
      } else if (results.length == 0) {
        console.log("Username does not exist")
        res.status(400).send("Username does not exist")
      } else {
        let pwHash = results[0].password_hash
        let fName = results[0].first_name
        let userId = results[0].id

        let goodPass = false
        try {
          goodPass = await argon2.verify(pwHash, password)
        } catch (err) {
          console.log("Falied to verify password ", err)
          res.status(400).send("Invalid password")
        }
        if (goodPass) {
          let token = {
            firstName: fName,
            userId: userId,
          }
          let signedToken = jwt.sign(token, process.env.JWT_SECRET)
          console.log(signedToken);

          // res.setHeader("Authorization", "Bearer", signedToken)

          res.sendStatus(200)
        } else {
          res.sendStatus(400)
        }
      }
    }
  })
}

module.exports = { register, login }
