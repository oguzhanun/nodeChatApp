const path = require('path');
const express = require('express');

var staticFolder = path.join(__dirname,"../public");

var app = express();

app.use(express.static(staticFolder));

var port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.render("index.html")
})

app.listen(port, ()=>{
    console.log("server is up and running on port " + port);
})

module.exports= {app};