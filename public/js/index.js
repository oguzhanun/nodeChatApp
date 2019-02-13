var socket = io();
            
socket.on("connect", function(){
    
    console.log("connection to server is established...");
    
    // bağlantı kurulur kurulmaz server a email gönderiyor...
    // socket.emit( "createEmail",{to:"jessica@simpson.com",text:"ok buddy" } );
    
    // bağlantı kurulur kurulmaz server a message gönderiyor...
    // chrome console üzerinden aynı komut ile de gönderi yapılabilir...
    //socket.emit( "createMessage", { from:"mr.bean", text:"hello" } );
})

// bu kısım message acknowledgement için...
// socket.emit("createMessage", {text:"hi there", from : "ogu"}, function (data){
//         console.log("thats it. the data sent back :", data);
//     }
// );

// jQuery veya $ işareti ikisi de aynı işi görüyor...
jQuery('#message-form').on('submit', function(e){
    
    e.preventDefault();
    
    var message = jQuery('[name=message-input]').val();
    
    socket.emit('createMessage', {from : 'User', text : message}, function(){
        
        console.log("message sent");

        // acknowledgement sonrasında text input girdisini sıfırlıyoruz...
        $('[name=message-input]').val("");
    
    })

})

// server dan message gelirse diye dinleme yapıyor...
socket.on("newMessage", function(message){
    
    console.log("message :", message);

    var li = $('<li></li>');
    
    li.text(message.from + ": " + message.text);

    $('#message-list').append(li);

})

var sendLocationButton = $('#send-location');

sendLocationButton.on('click', function(){
    
    if(!navigator.geolocation){
        return alert("Your browser does not support geolocation api!");
    }

    sendLocationButton.attr('disabled','disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function(position){
        //console.log(position);
        socket.emit("createLocation", { latitude : position.coords.latitude, longitude : position.coords.longitude } )
        sendLocationButton.removeAttr('disabled').text('Send Location');
    }, function(error){
        sendLocationButton.removeAttr('disabled').text('Send Location');
        return alert(error);
    })

})

socket.on("newLocation", function(data){
    var li = $(`<li></li>`);
    var a = $('<a target="_blank">New Location</a>');
    a.attr('href',data.url);
    li.text(data.from + ":");
    li.append(a);
    $('#message-list').append(li);
    
})

socket.on("disconnect", function(){
    console.log("disconnected...")
})



// server dan email gelirse diye dinleme yapıyor...
// socket.on("newEmail", function(email){
//     console.log("new email", email );
// })



