const express = require('express');
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles');
const app = express();


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/articles', articleRouter)

app.get('/', (req, res) =>{
    const articles = [{
        title:"Articel Title",
        createdAt: new Date(),
        description: "This is the description"
    },
    {
        title:"Articel Title 2",
        createdAt: new Date(),
        description: "This is the description 2"
    }];
    res.render('articles/index', {articles:articles})
})

app.listen(5000)