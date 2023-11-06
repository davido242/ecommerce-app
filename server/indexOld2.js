const express = require("express");
const router = express.Router();
require("dotenv").config();
const { dbConnection, dbConStatus } = require("./connection_db");
const bcrypt = require("bcrypt");

const bodyParser = require("body-parser");

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working Fine Bro....");
});

app.post("/signup", async (req, res) => {
  // const username = req.body.username;
  // Get and hash the user passwords and store in a MYSQL db
  try {    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.username, password: hashedPassword, address: req.body.address };
    const existingUsers = await dbConnection.query("SELECT * FROM users WHERE names = ? LIMIT 1", [user.name]);
    if(existingUsers) {
      console.log("User Already Exists");
      res.send("User exists");
    } else{
      await dbConnection.query(
        
      );
      res.send("User created");
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js:29 ~ app.post ~ error:", error);
    res.send("Something went wrong.");
  }
});

app.post("/login", async (req, res) => {
  // const user = users.find((user) => user.name == req.body.username);
  // if (user == null) {
  //   res.status(400).send("No user Found brov!");
  // }
  try {
    const username = req.body.username;
    const users = await dbConnection.query("SELECT * FROM users WHERE names = ? LIMIT 1", [username])
    console.log("Users Password Here: ", passwords);
    if (await bcrypt.compare(req.body.password, passwords)) {
      res.send("Render Dashboard if responding instead of send");
      //res.redirect("/dashbo")
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js:46 ~ app.post ~ error:", error);
    res.send("Not Allowed");
  }
});

app.listen(port, () => {
  console.log("server listening on port: ", port);
});
