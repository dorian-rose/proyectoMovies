const { initializeApp } = require('firebase/app')
const { getAuth } = require('firebase/auth');
const { firebaseConfig } = require('../config/firebaseConfig')


const firebaseApp = initializeApp(firebaseConfig);
const authFb = getAuth(firebaseApp)



module.exports= {
    authFb
}

