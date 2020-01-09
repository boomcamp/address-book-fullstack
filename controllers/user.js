const argon2 = require("argon2");
const secret = require("../secret")

module.exports = {
  signup: (req, res) => {
    const db = req.app.get("db");

    // const { password } = req.body;

    console.log(req.body)

    // argon2
    // .hash(password)
    // .then(hash => {
    //   return db.users.insert(
    //     {
    //       username,
    //       password: hash
    //     },
    //     {
    //       fields: ["id", "username"]
    //     }
    //   );
    // })
    // .then(user=>{
    //     const token = jwt.sign({username: user.id}, secret);
    //     res.status(201).json({...user, token})
    // })
    // .catch(err => {
    //     console.error(err);
    //     res.status(500).end();
    // })
  }
};
