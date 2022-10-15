const express = require('express')
const router = express.Router()
const pool = require('../db');
const methodOverride = require('method-override');
router.use(methodOverride('_method'))

router.get('/', (req,res)=> {
    res.send('lots')
})

module.exports = router