const express = require("express");
const router = express.Router();
require("dotenv").config();
const { dbConnection } = require("./connection_db");
const bcrypt = require("bcrypt");
const cors  = require("cors");

const bodyParser = require("body-parser");
const multer  = require('multer')
const upload = multer()

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
// used because we are parsing complex data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.none());

app.get("/", (req, res) => {
  res.send("Working Fine Bro....");
});

app.post("/signup", async (req, res) => {
  // Get and hash the user passwords and store in a MYSQL db
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.username, password: hashedPassword, address: req.body.address };
    
    // 1. implementing query to check for existing username to avoid multiple registration, but fails; ask
    const [ userCount ] = await dbConnection.query(`SELECT COUNT(*) as num FROM users WHERE names = ?`, [user.name]);
    console.log(userCount[0].num);
    
    if(userCount[0].num > 0) {
      res.send({ error: true, msg: "User Already Exists, Please Login!" });
    } else {
      await dbConnection.query(
        "INSERT INTO users(names, password, address) VALUES(?, ?, ?)",
        [user.name, user.password, user.address]
      );
      res.send({ error: false });
    }

    // 2. ask I cant do res.send and then redirect afterwards??
    // await dbConnection.query(
    //   "INSERT INTO users(names, password, address) VALUES(?, ?, ?)",
    //   [user.name, user.password, user.address]
    // );
    // res.redirect('http://localhost:3000/login');
    // res.send("User created");
    // 3. ask I have issues redirecting to client side except with complete url instead of part parameter 
  } catch (error) {
    console.log("🚀 ~ file: index.js:29 ~ app.post ~ error:", error);
    res.send({ error: true, msg: "Something went wrong." });
  }
});

app.post("/login", async (req, res) => {
  // res.send("Login Page")
  try {
    const {username, password} = req.body;
    // const hashedPassword = 
    const [ users ] = await dbConnection.query("SELECT * FROM users WHERE names = ?", [username])
    console.log("Users Password Here: ", password, users);
    if (await bcrypt.compare(password, users[0].password)) {
       console.log("HashedPassword here:", users[0].password)
       // Render Dashboard if responding instead of send
      res.send({ error: false });
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js:46 ~ app.post ~ error:", error);
    res.send({ error: true, msg: "Invalid Login" });
  }
});

// function findUserByName(username) {
//   return new Promise((resolve, reject) => {
//     const query = 'SELECT * FROM users WHERE names = ?';
//     dbConnection.query(query, [username], (err, results) => {
//       if (err) {
//         reject(err);
//       } else if (results.length > 0) {
//         resolve(results[0]);
//       } else {
//         resolve(null);
//       }
//     });
//   });
// }

// app.post("/login", async (req, res) => {
//   const { name, password } = req.body;
//   try {
//     const user = await findUserByName(username);
//     if (user) {
//       const isPasswordMatch = await bcrypt.compare(password, user.password);

//       if (isPasswordMatch) {
//         res.status(200).json({ message: 'Login successful', user });
//       } 
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     console.log({username, password});

//     const query = 'SELECT names FROM users WHERE names = ?';
//    await  dbConnection.query(query, req.body.username, (err, result) => {
//       if(err) {
//         console.log(err);
//       }else if(result.length > 0) {
//           console.log("Query returned", result);        
//       }
//     })
//     res.send("OK");
//       // const isPasswordMatch = await bcrypt.compare(password, user.password);
//   } catch (error) {
//   console.log("🚀 ~ file: index.js:109 ~ app.post ~ error:", error);
//   }
// });

app.listen(port, () => {
  console.log("server listening on port: ", port);
});
