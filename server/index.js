const express = require('express')

const app = express();
const Port = 5000

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Testing Server")
    console.log("Server is ok")
})

app.listen(Port, () => console.log(`App is Running on ${Port}`))