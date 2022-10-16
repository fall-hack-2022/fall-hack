const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const session = require('express-session');
const pool = require('./db');
const cors = require('cors');
const app = express();
const userRouter = require('./modules/users')
const lotRouter = require('./modules/lot')

app.use(session({

    name: "session",
    secret: 'muffin',
    resave: false,
    cookie: { maxAge: 30 * 60 * 1000 }, //60000= 1 min
    saveUninitialized: false //false prevent new cookie every http requesr

}));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))
app.use('/users', userRouter)
app.use('/lots', lotRouter)


app.get('/csss', (req, res) => {
    res.send("Hello SFU CSSS");
})


app.get('/listOfTeam', (req, res) => {
    res.json({teamMembers: ["Shabbir", "Anis", "Jasper", "Aki", "Theo"]});
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.listen(PORT, () => {
    const createQuery1 = `CREATE TABLE IF NOT EXISTS ${process.env.PG_USER_TABLE} (
        id SERIAL,
        user_name TEXT NOT NULL, 
        pass TEXT NOT NULL, 
        email TEXT NOT NULL, 
        fname TEXT NOT NULL, 
        lname TEXT NOT NULL);`

    const createQuery2 = `CREATE TABLE IF NOT EXISTS ${process.env.PG_LOT_TABLE} (
        id SERIAL,
        owner BIGINT NOT NULL,
        lot_name TEXT NOT NULL, 
        price INT NOT NULL, 
        address TEXT NOT NULL, 
        spots_total INT NOT NULL,
        spots_filled INT NOT NULL DEFAULT 0,
        maintenance BOOLEAN NOT NULL DEFAULT false,
        closed BOOLEAN NOT NULL DEFAULT false);`

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