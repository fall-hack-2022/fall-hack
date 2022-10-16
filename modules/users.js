require('dotenv').config()
const express = require('express')
const router = express.Router()
const pool = require('../db');
const methodOverride = require('method-override');
const crypto = require('crypto')
const session = require('express-session');
const cors = require('cors');
router.use(express.json(), cors())
router.use(express.urlencoded())
router.use(methodOverride('_method'))
router.options('*', cors())
router.use((req, res, next) => {
    next()
})

router.post('/createUser', (req,res)=> {
    try{
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const password2 = req.body.password2
        const fname = req.body.fname
        const lname = req.body.lname
        if(password == password2) {
            
            var salt = crypto.randomBytes(16).toString('hex');
            var hash = crypto.createHash('sha256').update(`${password}${salt}`).digest('hex');
            var passwordToStore = `${salt}:${hash}`
            var userPasswordQuery = `SELECT * FROM ${process.env.PG_USER_TABLE} WHERE user_name='${username}';`;
            var insertQuery = `INSERT INTO ${process.env.PG_USER_TABLE} (user_name, pass, email, fname, lname) VALUES ('${username}','${passwordToStore}','${email}', '${fname}','${lname}');`;
            pool.query(insertQuery);
            pool.query(userPasswordQuery, (error, result) => {
                if(error)
                    console.error(error)
                else{
                    req.session.user = result.rows[0]
                }
                res.redirect('/newlot')
            })
        } else {
        res.json({message: "Passwords do not match. Live in fear"})
        }
    } catch(err) {
        console.error(err)
        res.json({message: "An Unknown Error has occured. Live in fear"})
    }
})

router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const userPasswordQuery = `SELECT * FROM ${process.env.PG_USER_TABLE} WHERE LOWER(user_name)=LOWER('${username}')`;
    

    try {
        pool.query(userPasswordQuery, (error, result) => {
            if(error){console.error(error)}
            else{
            var passwordSplit = result.rows[0].pass.split(':')
            var salt = passwordSplit[0]
            var passwordToCheck = crypto.createHash('sha256').update(`${password}${salt}`).digest('hex')
            if (passwordToCheck == passwordSplit[1]) {
                console.log(`${result.rows[0].fname} ${result.rows[0].lname} has signed in`)
            }
            if (passwordToCheck == passwordSplit[1]) {
                req.session.user = result.rows[0];
                res.redirect('/newlot')
            } else {
                res.redirect('/login/incorrect')
            }
        }
        })
    } catch(err) {
        console.error(err)
        res.redirect('/login/randomError')
        res.json({message: "An Unknown Error has occured. Live in fear"})
    }

})

router.get('/getUser', (req,res) => {
    var getUser = req.session.user || null
    if( req.session.user)
        delete(getUser.pass)
    res.json(getUser)
})

router.post('/logout', (req,res) => {
    req.session.user = null
    res.redirect('/')
})

// router.get('/viewUsers', (req,res) => {
//     pool.query('SELECT * FROM lot_users', (error, result) => {
//         if (error) {console.error(error);res.json({message:"die."})}
//         else{
//             res.json({listOfUsers: result.rows})
//         }
//     })
// })

// router.delete('/dropUserTableConfirmMakeSure', async (req,res) => {
//     var client = await pool.connect()
//     var droptable = await client.query("DROP TABLE " + process.env.PG_USER_TABLE)
//     res.send(droptable)
// })


module.exports = router