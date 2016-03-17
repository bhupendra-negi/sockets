var PORT = process.env.PORT || 3000; // take port from heroku or for loacalhost
var express = require("express");
var app = express(); // express app which is used boilerplate for HTTP
var http = require("http").Server(app);
var moment = require("moment");


//socket io module
var io = require("socket.io")(http);

// expose the folder via express thought
app.use(express.static(__dirname+'/public'));

// io.on listens for events
io.on("connection",function(socket){
  console.log("User is connected");

  socket.emit("message",{
    text:"Welcome to Chat Appliction !",
    timestamp : moment().valueOf()
  });

  // listen for client message
  socket.on("message",function (message) {
         message.timestamp = moment().valueOf();
     console.log("Message Received : " + message.text + 'at' + message.timestamp);
     //broadcast to all users except for sender
     //add timestamp

     socket.broadcast.emit("message",message);
  });
});
http.listen(PORT,function(){
  console.log("server started");
});
