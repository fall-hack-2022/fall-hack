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
    const createQuery1 = `CREATE TABLE IF NOT EXISTS ${process.env.PG_DB_TABLE} (
        id SERIAL,
        user_name TEXT NOT NULL, 
        pass TEXT NOT NULL, 
        email TEXT NOT NULL, 
        fname TEXT NOT NULL, 
        lname TEXT NOT NULL,
        admin BOOLEAN NOT NULL DEFAULT false, 
        verified BOOLEAN NOT NULL DEFAULT false);`

    const createQuery2 = `CREATE TABLE IF NOT EXISTS ${process.env.PG_DB_TABLE} (
        id SERIAL,
        lot_name TEXT NOT NULL, 
        price INT NOT NULL, 
        address TEXT NOT NULL, 
        spots_total INT NOT NULL,
        spots_filled INT NOT NULL DEFAULT 0,
        maintenance BOOLEAN NOT FULL DEFAULT false,
        closed BOOLEAN NOT FULL DEFAULT false);`

    pool.query(createQuery1, (err, result) => {
        if(err){
            console.log(err)
        }
    })
    pool.query(createQuery2, (err, result) => {
        if(err){            
            console.log(err)
        }
    })

    console.log(`App is listening on port: ${PORT}`)
})