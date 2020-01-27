const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const firebase = require('./firebase/firebase');

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(multer({ dest: "imagens/"}).single('avatar'));

firebase();

require('./App/controllers/index')(app);


const server = app.listen(3000);

require('./App/io')(server);