const firebase = require('firebase-admin');
const firebaseConfigs = require('./newapp-a4b1f-firebase-adminsdk-u3ybm-12f59c90a5.json')

module.exports = () => {
    firebase.initializeApp({
        credential: firebase.credential.cert(firebaseConfigs),
        databaseURL: 'https://projecthope1-43eb2.firebaseio.com'
    })
};