const { Router } = require("express");
const express = require("express");
const router = express.Router();


const { formSignUp, signUpCreate } = require('../controllers/loginControllers')

router.post('/signup', signUpCreate);

router.get('/signup-form', formSignUp);



module.exports = Router