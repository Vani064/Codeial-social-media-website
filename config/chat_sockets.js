module.exports.chatSockets = function(socketServer){
   let io = require('socket.io')(socketServer, {
    cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST"]
      }
   });

   io.sockets.on('connection', function(socket){
    console.log('new connection recieved', socket.id);

    socket.on('disconnect', function(){
        console.log('socket disconnected!');
    });

    socket.on('join_room', function(data){
        console.log('joining request rec.', data);
        //server making the user join the room after its connection request
        socket.join(data.chatroom);
        // server telling the other users online that i have joined
        io.in(data.chatroom).emit('user_joined', data);
    });
   //server detects the message sent and make all other clients in same chatroom receive that message
    socket.on('send_message',function(data){
        io.in(data.chatroom).emit('receive_message',data);
    });
   });
}