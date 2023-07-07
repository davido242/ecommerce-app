const express = require('express');
const path = require("path");

const app = express();
const Port = 5000;


app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/app')));

app.get('/', (req, res) => {
    res.send("Testing Server")
    console.log("Server is ok")
})

app.get('/login', (req,res) => {
    res.render("dashboard");
})
  
app.listen(Port, () => console.log(`App is Running on ${Port}`))