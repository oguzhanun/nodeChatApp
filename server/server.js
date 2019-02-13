const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {messageGenerator,locationGenerator} = require('./utils/message');
var staticFolder = path.join(__dirname,"../public");

var app = express();

app.use(express.static(staticFolder));

var port = process.env.PORT || 3000;

var server = http.createServer(app);

// server socket i elde edilmiş oluyor bu şekilde...
var io = socketIO(server);

io.on('connection',(socket)=>{
    
    console.log('client has connected...');

    socket.emit("newMessage", messageGenerator("Admin","Welcome to the chat app..."));

    socket.broadcast.emit("newMessage", messageGenerator("Admin","A new friend joined us"))

    // birinden bir mesaj gelirse diye dinliyor...
    socket.on("createMessage", function (message, callback) {
        console.log("message :", message);
        
        // bu if clause u kullanmazsan callback is not a function hatası veriyor...
        // İLGİNÇ ?_?_?_?_?_?_?_?_?_?_?_?_?_?_?_?
        if(typeof callback === 'function')
            {
                callback("that is from server");
            }
        

        // mesaj geldiğinde bunu herkese, gönderen dahil gönderiyor...
        // io.emit("newMessage", {
        //     text : message.text,
        //     from : message.from,
        //     createdAt : new Date().getTime()
        // })

        // burada ise gönderiyi yapan dışında geri kalan herkese mesaj iletiliyor...
        socket.broadcast.emit("newMessage",{
            text : message.text,
            from : message.from,
            createdAt : new Date().getTime()
        })
    });

    socket.on("createLocation", function(coords){

        // yalnızca text olarak gönderirken bunu kullanıyoruz...
        //io.emit("newMessage", messageGenerator('admin', `latitude : ${coords.latitude}, longitude : ${coords.longitude}`));
        
        io.emit("newLocation", locationGenerator('user',coords.latitude, coords.longitude));

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