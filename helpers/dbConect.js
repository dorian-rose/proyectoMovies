 const mongoose = require('mongoose');

 const connection = async () => {

    try {

        const response = await mongoose.connect(process.env.URI_CONECT)
        console.log('connected to Data Base')
        console.log(response.json())
        return response
       

    } catch (error) {
       
            return {
                ok: false,
                msg: 'Fail trying to connect to Data Base',
                error
            }

    }

 }

 module.exports= {
    connection
 }