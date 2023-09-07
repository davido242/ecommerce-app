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
  // Get and hash the user passwords and store in a MYSQL db
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.username, password: hashedPassword, address: req.body.address };
    await dbConnection.query(
      "INSERT INTO users(names, passwords, address) VALUES(?, ?, ?)",
      [user.name, user.password, user.address]
    );
    res.send("User created");
  } catch (error) {
    console.log("🚀 ~ file: index.js:29 ~ app.post ~ error:", error);
    res.send("Something went wrong.");
  }
});

app.post("/login", async (req, res) => {
  const user = dbConnection.find((user) => user.name == req.body.username);
  if (user == null) {
    res.status(400).send("No user Found brov!");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      // res.send("/dashboard");
      res.send("Render Dashboard if responding instead of send");
      //res.redirect("/dashbo")
    } else {
      res.send("Not Allowed Oga");
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js:46 ~ app.post ~ error:", error);
    // res.status(500).send("Dashboard not found oga!");
  }
});

app.listen(port, () => {
  console.log("server listening on port: ", port);
});
