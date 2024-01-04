const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require('path');

const bodyParser = require("body-parser");
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (_req, res) => {
  res.send({ error: false, msg: "Server is Working Fine...." });
});

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const productRouter = require("./routes/products");
app.use("/product", productRouter);

const apiRoute = require("./routes/api");
app.use("/api", apiRoute);



app.listen(port, () => {
  console.log("server listening on port: ", port);
});