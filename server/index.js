const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./connection_db");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

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
        await dbConnection.query("INSERT INTO users (names, password, address) VALUES(?, ?, ?)", [
          user.name,
          user.password,
          user.address,
        ]);
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
        const token = jwt.sign({ id }, "jwtSecretKey", { expiresIn: 300 });
        console.log({ Longin: true, token, users });
        res.send({ error: false })
      } else {
        res.send({ error: true, message: "Wrong Pword"});
      }
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js:59 ~ app.post ~ error:", error);
    res.send({ error: true, message: "User does not exist"});
  }
});

const verifyJwt = function (req, res, next) {
  const token = req.headers["access-token"];
  if (!token) {
    res.json("We need token");
  } else {
    jwt.verify(token, "jwtSecretKey", (err, decoded) => {
      if (err) {
        res.json("Not Authenticated");
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
  res.json("Authenticated");
};

app.get("/dashboard", verifyJwt, (req, res) => {
  console.log("My dashboard");
  res.send("Dashboard")
});

app.listen(port, () => {
  console.log("server listening on port: ", port);
});