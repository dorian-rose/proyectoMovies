
const express = require("express");
const router = express.Router();

const {formSignUp, signUpCreate, signInCreate, formSignIn, logOut} =require('../controllers/loginControllers')
router.post('/signup', signUpCreate);

router.get('/signup-form', formSignUp);
router.post('/signin', signInCreate);
router.get('/signin-form', formSignIn);
router.get('/logut', logOut);


module.exports=router

