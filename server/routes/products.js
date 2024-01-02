const express = require("express");
const router = express.Router();
const multer = require("multer");
const { dbConnection } = require("../connection_db");
const authenticate = require("../middleware/authentication");

const upload = multer({
  storage: multer.diskStorage({
    destination: './images',
    filename: (_req, file, callBack) => {
      return callBack(null, `${Date.now()}_${file.originalname}`)
    }
  }),
});

// router.use(authenticate);
router.use(upload.any());

router.get("/", async (_req, res) => {
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


router.post("/add-products", async (req, res) => {
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

module.exports = router;