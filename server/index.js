const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./connection_db");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authenticate = require("./middleware/authentication");

const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
// used because we are parsing complex data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.none());

const jwtSecretKey = process.env.JWT_SECRET_KEY;

app.get("/", (req, res) => {
  res.send({ error: false, msg: "Server is Working Fine...."});
});

app.post("/signup", async (req, res) => {
  try {
    const { password, conPassword } = req.body;
    if (password !== conPassword) {
      console.log("password missmatch");
      res.send({ error: true, message: "Password Mismatched"});
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const user = { name: req.body.username, password: hashPassword, address: req.body.address };

      const query = "SELECT COUNT(*) AS num FROM users WHERE names = ?";
      const [dbUser] = await dbConnection.query(query, [user.name]);
      if (dbUser[0].num > 0) {
        res.send({ error: true, message: "User already exists, Please Login" });
      } else {
        const [newUser] = await dbConnection.query("INSERT INTO users (names, password, address) VALUES(?, ?, ?)", [
          user.name,
          user.password,
          user.address,
        ]);
        
        const id = newUser.insertId;
        const token = jwt.sign({ id }, jwtSecretKey, { expiresIn: "1h" })
        
        newUser.token = token;               
        res.send({ error: false });
      }
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js:30 ~ app.post ~ error:", error);
    res.send({ error: true, message: "Something went wrong...." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.send({ error: true, message: "Username and Password Required!!"});
    } else {
      const [users] = await dbConnection.query("SELECT * FROM users WHERE names = ?", [username]);
      if (await bcrypt.compare(password, users[0].password)) {
        const id = users[0].id;
        const token = jwt.sign({ id }, jwtSecretKey, { expiresIn: "1h" });
        console.log({ Longin: true, token });
        res.set('authorization', `Bearer ${token}`).status(201).json({ token, error: false });        
      } else {
        res.send({ error: true, message: "Wrong Pword"});
      }
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js:59 ~ app.post ~ error:", error);
    res.status(404).json({ error: true, message: "User does not exist"});
  }
});

app.get("/dashboard", authenticate, async (req, res) => {
  try {
    const query = "SELECT * FROM users WHERE id = ?";

    const [rows] = await dbConnection.query(query, [req.userId]);
    if(rows.length === 0) {
      res.status(404).json(({error: "User not found"}));
    }else{
      const user = rows[0];
      res.status(200).json({ name: user.names, address: user.address});
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js:113 ~ app.post ~ error:", error)    
  }
});

app.listen(port, () => {
  console.log("server listening on port: ", port);
});