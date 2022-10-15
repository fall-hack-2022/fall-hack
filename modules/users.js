const express = require('express')
const router = express.Router()
const pool = require('../db');
const methodOverride = require('method-override');
router.use(methodOverride('_method'))

router.post('/createUser', (req,res)=> {
    
    
    
    res.send('users')
})



module.exports = router