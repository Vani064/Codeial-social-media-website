class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail= userEmail;

        this.socket = io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');
           //client requesting the server to join the room 
            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatroom: 'codeial'
            });
//after receiving response from server that a user has joined this will show the notification at client side
            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            });


        });

        //send message button to emit and send message to server
   $('#send-message').click(function(){
    let msg = $('#chat-message-input').val();
    console.log(msg);
    if(msg != ''){
        self.socket.emit('send_message',{
            message: msg,
            user_email: self.userEmail,
            chatroom: 'codeial'
        });
    }
   });

   //detect the message which server wants the client to receive from other client
   self.socket.on('receive_message', function(data){
    console.log('message received', data.message);

    let newMessage = $('<li>'); 

    let messageType = 'other-message';
    
    if(data.user_email == self.userEmail){
        messageType = 'self-message';
    }

    newMessage.append($('<span>', {
       'html': data.message
    }));

    newMessage.append($('<sub>',{
        'html': data.user_email
    }));

    newMessage.addClass(messageType);

    $('#chat-messages-list').append(newMessage);
   });
    }
}