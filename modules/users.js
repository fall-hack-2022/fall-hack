const express = require('express')
const router = express.Router()
const pool = require('../db');
const methodOverride = require('method-override');
const crypto = require('crypto')
router.use(methodOverride('_method'))

router.post('/createUser', async (req,res)=> {
    try{
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const password2 = req.body.password2
        if(password == password2) {
            const client = await pool.connect();
            
            var salt = crypto.randomBytes(16).toString('hex');
            var hash = crypto.createHash('sha256').update(`${pw}${salt}`).digest('hex');
            var passwordToStore = `${salt}:${hash}`
            var userPasswordQuery = `SELECT * FROM ${process.env.PG_USER_TABLE} WHERE user_name='${username}';`;
            var insertQuery = `INSERT INTO ${process.env.PG_USER_TABLE} VALUES (${id},'${username}','${passwordToStore}','${email}', '${fname}','${lname}');`;
            const insert = await client.query(insertQuery);
            const result2 = await client.query(userPasswordQuery);
            var results2 = { 'results': (result2) ? result2.rows : null };
            req.session.user = results2.results[0];

        }
        
        res.send(req.session.user)
    } catch(err) {
        console.error(err)
    }
})



module.exports = router