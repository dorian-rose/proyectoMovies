 const mongoose = require('mongoose');

 const connection = async () => {

    try {

        const response = await mongoose.connect(process.env.URI_CONECT)
        console.log('connected to Database')
        return response
       

    } catch (error) {
       
            return {
                ok: false,
                msg: 'Fail trying to connect to Database',
                error
            }

    }

 }

 module.exports= {
    connection
 }