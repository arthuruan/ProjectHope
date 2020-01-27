const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const firebase = require('firebase-admin');

router.use(authMiddleware);
//creating
router.post('/notificationAll', async (req, res) => {
    try{
        
        const { notification } = req.body;

        const message = {
            android: {
                notification: {
                    title: 'Project Hope',
                    body: '',
                    color: '#f45342',
                }
            },
            topic: 'notification',
        }

        if (notification) {
            message.android.notification.body = notification;
        }

        firebase.messaging().send(message).then((response) => {
            console.log(response);
        });

    } catch(error) {
        console.log(error)
        return res.status(400).send({ erro: 'Error creating quiz' });
    }
});

module.exports = app => app.use('/firebase', router);