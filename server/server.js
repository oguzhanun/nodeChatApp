const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var staticFolder = path.join(__dirname,"../public");

var app = express();

app.use(express.static(staticFolder));

var port = process.env.PORT || 3000;

var server = http.createServer(app);

// server socket i elde edilmiş oluyor bu şekilde...
var io = socketIO(server);

io.on('connection',(socket)=>{
    
    console.log('client has connected...');
    
    // disconnect işlemi io.on içinde aranıyor...
    socket.on("disconnect",()=>{
        console.log("client disconnected...")
    })

})

// app.get('/',(req,res)=>{
//     res.render("index.html")
// })

server.listen(port, ()=>{
    console.log("server is up and running on port " + port);
})

module.exports= {app};