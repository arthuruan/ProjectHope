const express = require('express');
const authMiddleware = require('../middlewares/auth');

const User = require('../models/User');

const router = express.Router();

router.use(authMiddleware);

//read
router.get('/', async (req, res) => {
    try {
        const user = await User.find()

        return res.send({ user });
    } catch {
        return res.status(400).send({ erro: 'Error loading user' });
    }
});
//upadte Avatar
router.put('/:userId/avatar', async (req, res) => {
    try {
        const { avatar } = req.body;

        const user = await User.findOneAndUpdate({_id: req.params.userId}, { 
            avatar
        }, { new: true });

        return res.send({ user });
    } catch {
        return res.status(400).send({ erro: 'Error Updating Avatar' });
    }
});
//update
router.put('/:userId', async (req, res) => {
    try {
        const { name } = req.body;

        const user = await User.findOneAndUpdate({_id: req.params.userId}, { 
            name
        }, { new: true });

        return res.send({ user });

    } catch {
        return res.status(400).send({ erro: 'Error Updating user' });
    }
});

module.exports = app => app.use('/user', router);
