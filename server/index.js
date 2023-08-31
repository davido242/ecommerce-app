const express = require('express');
const router = express.Router()
require("dotenv").config()

// const dotenv = require("dotenv")
// dotenv.config()
// var upload = multer();
const bodyParser = require('body-parser');

const app = express();
const port = process.env.SERVER_PORT;


app.use(express.json());
// app.use(upload.array());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Server is running perfectly")
    console.log("Server is running perfectly")
})

app.get('/signup', (req,res) => {
    // res.render("signup")
    console.log("Initiating A registration...");
    res.send("Signup is running perfectly")
})

app.post('/signup', (req,res) => {
    // Loging the user details
        
    const { username, password, conPassword, address } = req.body;
    console.log(req.body);
    res.send("Sent Successfully Dave");
    // res.send({username, password, conPassword, address}) 
})

router.use((req, res, next) => {
    if (!req.headers['x-auth']) return next('router')
    next()
  })
  
  app.get('/user/:id', (req, res) => {
    res.send(`'hello, user!', ${req.params.id}`)
  })
  
  app.listen(port, () => {
    console.log('server listening on port: ', port)
    })