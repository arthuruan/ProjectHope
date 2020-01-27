const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Quiz = require('../models/quiz');

const router = express.Router();

router.use(authMiddleware);
//creating
router.post('/create_quiz', async (req, res) => {
    try{
        Object.keys(req.body.questions).forEach(async (key) => {

            const quiz = {
                user: req.body.userId,
                ...req.body.questions[key]
            }

            await Quiz.create(quiz);
        });

        // const quiz = await Quiz.create(req.body);

        return res.send({ test: 1 });

    } catch {
        return res.status(400).send({ erro: 'Error creating quiz' });
    }
});

//read
router.get('/', async (req, res) => {
    try {
        
        let quiz = null;

        if(req.userId){
            quiz = await Quiz.find({user: req.userId});
        }else{
            quiz = await Quiz.find();
        }

        return res.send({ quiz });
    } catch(erro) {
        return res.status(400).send({ erro: 'Error loading quiz' });
    }
});


module.exports = app => app.use('/quiz', router);