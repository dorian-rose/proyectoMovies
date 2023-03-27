const { validationResult } = require('express-validator');

const validateInputs = (req,res,next) => {
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors, 'estamos en validateInputs')
        return res.render('admin/adminCreate', errors)
        // status(400).json ({
        //     ok:false,
        //     erores:errors.mapped()
        // })
    }
    next()
}


const validateInputsEdit = (req,res,next) => {
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors, 'estamos en validateInputs')
        return res.status(400).json({
            ok:false,
            erores:errors.mapped()
        })
    }
    next()
}
module.exports = {
    validateInputs
}