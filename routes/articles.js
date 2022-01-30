const express = require('express');
const router = express.Router()

router.get('/add', (req, res) =>{

    res.render("articles/add", {})
})

router.post('/', (req, res) =>{
    
})

module.exports = router