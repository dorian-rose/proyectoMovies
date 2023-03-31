
const express = require("express");
const router = express.Router();

const { formSignUp, signUpCreate, signInCreate, formSignIn, logOut } = require('../controllers/loginControllers')
router.post('/signup', signUpCreate);

router.get('/signup-form', formSignUp);
router.post('/signup', signUpCreate)
router.get('/signin-form', formSignIn);
router.post('/signin', signInCreate);
router.get('/logut', logOut);


module.exports = router

