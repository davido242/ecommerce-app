const express = require("express");
const router = express.Router();
require("dotenv").config();
const multer = require("multer");
const { dbConnection } = require("../connection_db");
const authenticate = require("../middleware/authentication");

const upload = multer();

router.use(upload.none());
router.use(authenticate);


router.get("/user", async (req, res) => {
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

module.exports =  router;