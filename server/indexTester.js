const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./connection_db");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authenticate = require("./middleware/authentication");

const bodyParser = require("body-parser");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: './images',
    filename: (_req, file, callBack) => {
      return callBack(null, `${Date.now()}_${file.originalname}`)
    }
  }),
});

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api", authenticate);

// apply multer to be used globally
app.use(upload.any());

const jwtSecretKey = process.env.JWT_SECRET_KEY;

app.get("/", (_req, res) => {
  res.send({ error: false, msg: "Server is Working Fine...." });
});

app.post("/api/signup", async (req, res) => {
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
    console.log("🚀 ~ file: index.js:30 ~ app.post ~ error:", error);
    res.send({ error: true, message: "Something went wrong...." });
  }
});

app.post("/api/login", async (req, res) => {
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
    console.log("🚀 ~ file: index.js:59 ~ app.post ~ error:", error);
    res.status(404).json({ error: true, message: "User does not exist" });
  }
});

app.get("/api/dashboard", async (req, res) => {
  try {
    const query = "SELECT * FROM users WHERE id = ?";

    const [rows] = await dbConnection.query(query, [req.userId]);
    if (rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      const user = rows[0];
      res.status(200).json({ name: user.name, address: user.address });
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js:113 ~ app.post ~ error:", error);
  }
});

app.get("/api/products", async (_req, res) => {
  try {
    const query = "SELECT * FROM products";

    const [rows] = await dbConnection.query(query);
    if (rows.length === 0) {
      res.status(404).json({ error: "No products found" });
    } else {
      res.status(200).json(rows);
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js:113 ~ app.post ~ error:", error);
  }
});

// app.use("/api", authenticate);

app.post("/api/add-products", async (req, res) => {
  try {
    const { name, size, price } = req.body;
    const image = req.files[0];
    if (!(name, size, price)) {
      res.send({ error: true, message: "Please input all fields." });
    } else {
      const query = "INSERT INTO products (name, size, price) VALUES (?, ?, ?);";

      const [newProduct] = await dbConnection.query(query, [name, size, price]);
      res.status(201).json({ error: false, message: "Products Created", Products_name: newProduct.name });
      console.log('filename:', image.filename);
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js:143 ~ app.post ~ error:", error);
    res.status(404).json({ error: true, message: "Failed to add products" });
  }
});

app.listen(port, () => {
  console.log("server listening on port: ", port);
});