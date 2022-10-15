const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const session = require('express-session');
const pool = require('./db');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))


app.get('/hello', (req, res) => {
    res.send("HELLO!");
})


app.get('/listOfTeam', (req, res) => {
    res.json({teamMembers: ["Shabbir", "Anis", "Jasper", "Aki", "Theo"]});
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`)
})