const express = require('express');
const Article = require('../models/article');
const router = express.Router()


router.get('/', async (req, res) =>{
    const articles = await Article.find().sort({createdAt:'desc'});
    res.render('admin/index', {articles:articles})
})

router.get('/add', (req, res) =>{

    res.render("admin/add", {article : new Article()})
})

router.get('/edit/:id', async (req, res) =>{
    const article = await Article.findById(req.params.id)
    res.render("admin/edit", {article : article})
})

router.get('/:slug', async (req, res)=>{
    const article = await Article.findOne({slug: req.params.slug});
    if(article == null) res.render('shared/notfound');

    res.render("admin/show", {article: article});
})

router.post('/', async (req, res, next) =>{
    req.article = new Article()
    next()
}, saveArticle())

router.put('/:id', async (req, res, next) =>{
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticle())

router.delete('/:id', async (req, res)=>{
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.send({success : true, message : 'Success'})
    } catch (error) {
        return res.status(500).json({success: false, message: error.toString()})
    }
    
})

function saveArticle(){
    return async(req, res) =>{
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save();
            res.send({success : true, message : 'Success'})
        } catch (error) {
            return res.status(500).json({success: false, message: error.toString()})
        }
    }
}

module.exports = router