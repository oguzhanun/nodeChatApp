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

    socket.emit("newMessage",{
        text : "Welcome to the chat app...",
        createdAt : new Date().getTime(),
        from : "Admin"
    });

    socket.broadcast.emit("newMessage", {
        from : "Admin",
        text : "A new friend joined us"
    })

    // birinden bir mesaj gelirse diye dinliyor...
    socket.on("createMessage", (message)=>{
        console.log("message :", message);

        // mesaj geldiğinde bunu herkese, gönderen dahil gönderiyor...
        // io.emit("newMessage", {
        //     text : message.text,
        //     from : message.from,
        //     createdAt : new Date().getTime()
        // })

        // burada ise gönderiyi yapan dışında geri kalan herkese mesaj iletiliyor...
        // socket.broadcast.emit("newMessage",{
        //     text : message.text,
        //     from : message.from,
        //     createdAt : new Date().getTime()
        // })
    })

    // socket.on("createEmail", (email)=>{
    //     console.log("new email:", email);
    // })

    //yalnız bir adrese göndermek için kullanılıyor...
    // socket.emit("newEmail",{ from:"jessica@simpson.com",text:"hey there i am using whatsapp",createdAt:123 } );

    // yalnız bir adrese gönderi yapıyor...
    // socket.emit("newMessage", {from:"mr.bean",text:"hello",createdAt:123});
    
    // disconnect işlemi io.on içinde aranıyor...
    socket.on("disconnect",()=>{
        console.log("client disconnected...")
    })

})

server.listen(port, ()=>{
    console.log("server is up and running on port " + port);
})