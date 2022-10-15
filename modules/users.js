require('dotenv').config()
const express = require('express')
const router = express.Router()
const pool = require('../db');
const methodOverride = require('method-override');
const crypto = require('crypto')
const session = require('express-session');
const cors = require('cors');
router.use(express.json(), cors())
router.use(methodOverride('_method'))
router.options('*', cors())
router.use((req, res, next) => {
    next()
})

router.post('/createUser', async (req,res)=> {
    try{
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const password2 = req.body.password2
        const fname = req.body.fname
        const lname = req.body.lname
        if(password == password2) {
            const client = await pool.connect();
            
            var salt = crypto.randomBytes(16).toString('hex');
            var hash = crypto.createHash('sha256').update(`${password}${salt}`).digest('hex');
            var passwordToStore = `${salt}:${hash}`
            var userPasswordQuery = `SELECT * FROM ${process.env.PG_USER_TABLE} WHERE user_name='${username}';`;
            var insertQuery = `INSERT INTO ${process.env.PG_USER_TABLE} (user_name, pass, email, fname, lname) VALUES ('${username}','${passwordToStore}','${email}', '${fname}','${lname}');`;
            const insert = await client.query(insertQuery);
            const result2 = await client.query(userPasswordQuery);
            var results2 = { 'results': (result2) ? result2.rows : null };
            console.log(req.session)
            console.log(results2)
            req.session.user = results2.results[0];
            client.release()
        }
        
        res.json({message:"YOU HAVE SUCCEFULLY REGISTERED. YOUR LIFE IS NOW IN MY HANDS"})
    } catch(err) {
        console.error(err)
        res.json({message: "An Unknown Error has occured. Live in fear"})
    }
})

router.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const userPasswordQuery = `SELECT * FROM ${process.env.PG_USER_TABLE} WHERE LOWER(user_name)=LOWER('${username}')`;
    

    try {
        const client = await pool.connect();
        const result = await client.query(userPasswordQuery);
        const results = { 'row': (result) ? result.rows : null };
        var passwordSplit = results.row[0].pass.split(':')
        var salt = passwordSplit[0]
        var passwordToCheck = crypto.createHash('sha256').update(`${password}${salt}`).digest('hex')
        client.release();
        if (passwordToCheck == passwordSplit[1]) {
            console.log(`${results.row[0].fname} ${results.row[0].lname} has signed in`)
        }
        if (passwordToCheck == passwordSplit[1]) {
            req.session.user = results.row[0];
            res.json({message:"YOU HAVE SUCCEFULLY SIGNED IN. YOU LIFE WILL BE SPARED THIS TIME"})
        } else {
            res.json({message: "YOU HAVE FAILED LOGIN. YOU WILL NOW BE EXECUTED"})
        }
    } catch(err) {
        console.error(err)
        res.json({message: "An Unknown Error has occured. Live in fear"})
    }

})

router.get('/viewUsers', (req,res) => {
    pool.query('SELECT * FROM lot_users', (error, result) => {
        if (error) {console.error(error);res.json({message:"die."})}
        else{
            res.json({listOfUsers: result.rows})
        }
    })
})

router.delete('/dropUserTableConfirmMakeSure', async (req,res) => {
    var client = await pool.connect()
    var droptable = await client.query("DROP TABLE " + process.env.PG_USER_TABLE)
    res.send(droptable)
})


module.exports = router