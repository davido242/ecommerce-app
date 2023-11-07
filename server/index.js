const express = require("express");
const router = express.Router();
require("dotenv").config();
const { dbConnection } = require("./connection_db");
const bcrypt = require("bcrypt");
const cors  = require("cors");

const bodyParser = require("body-parser");

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
// used because we are parsing complex data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working Fine Bro....");
});

app.post("/signup", async (req, res) => {
  // Get and hash the user passwords and store in a MYSQL db
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.username, password: hashedPassword, address: req.body.address };
    // 1. implementing query to check for existing username to avoid multiple registration, but fails; ask
    // const userCount = await dbConnection.query(`SELECT COUNT(*) FROM users WHERE names = ?`, [user.name]);
    // console.log(userCount.length);
    // if(userCount.length > 0) {
    //   res.send("User Already Exists!, Choose another username Please!!");
    // } else {
    //   await dbConnection.query(
    //     "INSERT INTO users(names, password, address) VALUES(?, ?, ?)",
    //     [user.name, user.password, user.address]
    //   );
    //   res.redirect('http://localhost:3000/login');
    // }

    // 2. ask I cant do res.send and then redirect afterwards??
    await dbConnection.query(
      "INSERT INTO users(names, password, address) VALUES(?, ?, ?)",
      [user.name, user.password, user.address]
    );
    res.redirect('http://localhost:3000/login');
    // res.send("User created");
    // 3. ask I have issues redirecting to client side except with complete url instead of part parameter 
  } catch (error) {
    console.log("🚀 ~ file: index.js:29 ~ app.post ~ error:", error);
    res.send("Something went wrong.");
  }
});

// app.post("/login", async (req, res) => {
//   // res.send("Login Page")
//   try {
//     const {username, password} = req.body;
//     // const hashedPassword = 
//     const users = await dbConnection.query("SELECT * FROM users WHERE names = ? AND password = ?", [username, password])
//     console.log("Users Password Here: ", password);
//     if (await bcrypt.compare(req.body.password, password)) {
//       res.send("Render Dashboard if responding instead of send");
//     }
//   } catch (error) {
//     console.log("🚀 ~ file: index.js:46 ~ app.post ~ error:", error);
//     res.send("Not Allowed");
//   }
// });

function findUserByName(username) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE names = ?';
    dbConnection.query(query, [username], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
}

app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await findUserByName(username);

    if (user) {
      // User with the provided username exists
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        // Passwords match, login successful
        res.status(200).json({ message: 'Login successful', user });
      } 
    } else {
      // No user found with the provided username
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log("server listening on port: ", port);
});
