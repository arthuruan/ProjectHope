const io = require('socket.io');
const Chat = require('../App/models/Chat');

module.exports = (server) => {

    const websocket = io(server);

    websocket.on('connection', function(socket){

        socket.on('createRoom', async (room) => {
            const { origin, destiny } = room;
            const roomId = destiny + origin;

            let chat = await Chat.findOne({users: {"$all": [origin, destiny]}});
            
            if (!chat) {
                chat = await Chat.create({users: [origin, destiny]});
            }

            socket.broadcast.emit(origin, true);

            socket.on('disconnect', () => {
                socket.broadcast.emit(origin, false);
            });
        
            socket.emit('createRoom', chat._id);

            socket.on(chat._id, (msg) => {
                const message = {
                    originId: origin,
                    message: msg
                }

                socket.broadcast.emit(chat._id, message);
                chat.messages.push(message);
                chat.save();
                
                socket.emit(chat._id, message);

            });
        });

    });
}