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
  res.send("Server is working Fine...");
});

app.post("/signup", async (req, res) => {
    const { name } = req.body;
    // dbConnection.query("SELECT names FROM users WHERE names = ?", [name]);
    await dbConnection.query('SELECT names FROM users WHERE names = ?', [name], async (error, result) => {
      if(error){
        console.log(error)
    }
    if(result.length > 0) {
      return res.send('User already exists')
  } else {
    return res.send('Write queries for inserting new user');
  }
   })
    //       dbConnection.query(
    //         "INSERT INTO users(names, password, address) VALUES(?, ?, ?)",
    //         [user.name, user.password, user.address]
    //       );
    //       res.redirect('http://localhost:3000/login');
    //     } else {
    //       console.log("User already exists", name);
    //     }
    // });
    // res.send("Worked");
})





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
