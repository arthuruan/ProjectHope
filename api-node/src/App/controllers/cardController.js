const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Card = require('../models/Cards');

const router = express.Router();

router.use(authMiddleware);

//create
router.post('/create_card', async (req, res) => {
    try {
        const { title, type, description, link, image } = req.body;

        const card = await Card.create({ title, type, description, link, image });

        return res.send({ card });
    } catch {
        return res.status(400).send({ erro: 'Error creating new card' });
    }
});

//read
router.get('/', async (req, res) => {
    try {
        const cards = await Card.find()

        return res.send({ cards });
    } catch {
        return res.status(400).send({ erro: 'Error loading cards' });
    }
});
//update
router.put('/:cardId', async (req, res) => {
    try {
        const { title, type, description, link, image } = req.body;

        const card = await Card.findByIdAndUpdate(req.params.cardId, { 
            title, 
            type, 
            description, 
            link, 
            image
         }, { new: true });

        return res.send({ card });
    } catch {
        return res.status(400).send({ erro: 'Error Updating card' });
    }
});

//delete
router.delete('/:cardId', async (req, res) => {
    try {
        await Card.findByIdAndRemove(req.params.cardId);

        return res.send();
    } catch {
        return res.status(400).send({ erro: 'Error removing card' });
    }
});

module.exports = app => app.use('/cards', router);