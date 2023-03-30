const { initializeApp } = require('firebase/app')
const { getAuth } = require('firebase/auth');
const { firebaseConfig } = require('../config/firebaseConfig')


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)


module.exports = {
    auth
}