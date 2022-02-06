const express = require('express');
const Article = require('../models/article');
const router = express.Router()

router.get('/add', (req, res) =>{

    res.render("articles/add", {article : new Article()})
})

router.get('/:id', async (req, res)=>{
    const article = await Article.findById(req.params.id);
    if(article == null) res.render('shared/notfound');

    res.render("articles/show", {article: article});
})

router.post('/', async (req, res) =>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    try {
        article = await article.save();
        res.send({success : true, message : 'Success'})
        console.log(article);
    } catch (error) {
        return res.status(500).json({success: false, message: "Failed"})
    }
})

module.exports = router