require("dotenv").config();
const express = require('express');
const app = express();
const dbConnect = require("./models/dbConnect");
const articleRouter = require('./routes/articles');
const adminRouter = require('./routes/admin');
const Article = require("./models/article");


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json())

app.use('/yonetim', adminRouter)
app.use('/', articleRouter)


dbConnect();
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log("Listening on: "+PORT);
});