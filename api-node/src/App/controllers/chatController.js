const express = require('express');
const authMiddleware = require('../middlewares/auth');

const User = require('../models/User');
const Chat = require('../models/Chat');

const router = express.Router();

router.use(authMiddleware);

//read
router.get('/', async (req, res) => {
    try {

        const { origin, destiny } = req.query;
        
        let chat = await Chat.findOne({ users: {"$all": [origin, destiny]}}, 'messages');


        return res.send({ chat });
    } catch(erro) {
        // console.log(erro);
        return res.status(400).send({ erro: 'Error loading chat' });
    }
});

router.get('/rooms', async (req, res) => {
    try {

        let room = await Chat.find({ users: req.userId });

        const users = {};

        room.forEach((element) => {
            const index = element.users.indexOf(req.userId);
            if(index >= 0){
                element.users.splice(index, 1);
                
                const user = element.users[0];

                if(element.messages.length){
                    
                    const lastMessage = element.messages[element.messages.length - 1];
                    
                    users[user] = { lastMessage, id: element._id };
                }
            }
        });

        const userIds = Object.keys(users);


        const usersObj = await User.find({ _id: userIds });
        
        usersObj.forEach((user) => {
            users[user._id] = { 
                ...users[user._id],
                name: user.name,
                id: user._id,
                avatar: user.avatar,
            };
        });

        const usersRoom = Object.keys(users).map((userId) => {
            return users[userId];
        });


        return res.send( usersRoom );
    } catch(erro) {
        // console.log(erro);
        return res.status(400).send({ erro: 'Error loading room' });
    }
});

module.exports = app => app.use('/chat', router);