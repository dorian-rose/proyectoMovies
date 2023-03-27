const { validationResult } = require('express-validator');

const validateInputs = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

    console.log('estamos en errores validator')
    res.locals.errors = errors.array();

    }
    console.log('estamos en next validator')
    next();
  };

module.exports = {
    validateInputs
}