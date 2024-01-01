const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const bodyParser = require("body-parser");
// const multer = require("multer");
const port = process.env.SERVER_PORT;

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './images',
//     filename: (_req, file, callBack) => {
//       return callBack(null, `${Date.now()}_${file.originalname}`)
//     }
//   }),
// });

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// apply multer to be used globally
// app.use(upload.none());

app.get("/", (_req, res) => {
  res.send({ error: false, msg: "Server is Working Fine...." });
});

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const productRouter = require("./routes/products");
app.use("/product", productRouter);




app.listen(port, () => {
  console.log("server listening on port: ", port);
});