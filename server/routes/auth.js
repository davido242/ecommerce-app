const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const multer = require("multer");
const { dbConnection } = require("../connection_db");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const authenticate = require("../middleware/authentication");
const upload = multer();


router.use(upload.none());

router.post("/signup", async (req, res) => {
  try {
    const { password, conPassword } = req.body;
    if (password !== conPassword) {
      console.log("password missmatch");
      res.send({ error: true, message: "Password Mismatched" });
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const user = { name: req.body.username, password: hashPassword, address: req.body.address };

      const query = "SELECT COUNT(*) AS num FROM users WHERE name = ?";
      const [dbUser] = await dbConnection.query(query, [user.name]);
      if (dbUser[0].num > 0) {
        res.send({ error: true, message: "User already exists, Please Login" });
      } else {
        const [newUser] = await dbConnection.query("INSERT INTO users (name, password, address) VALUES(?, ?, ?)", [
          user.name,
          user.password,
          user.address,
        ]);

        const id = newUser.insertId;
        const token = jwt.sign({ id }, jwtSecretKey, { expiresIn: "1h" });

        newUser.token = token;
        res.send({ error: false });
      }
    }
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error);
    res.send({ error: true, message: "Something went wrong...." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.send({ error: true, message: "Username and Password Required!!" });
    } else {
      const [users] = await dbConnection.query("SELECT * FROM users WHERE name = ?", [username]);
      if (await bcrypt.compare(password, users[0].password)) {
        const id = users[0].id;
        const token = jwt.sign({ id }, jwtSecretKey, { expiresIn: "1h" });
        console.log({ Longin: true, token });
        res.set("authorization", `Bearer ${token}`).status(201).json({ token, error: false, name: users[0].name });
      } else {
        res.send({ error: true, message: "Wrong Pword" });
      }
    }
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error);
    res.status(404).json({ error: true, message: "User does not exist" });
  }
});

module.exports =  router;