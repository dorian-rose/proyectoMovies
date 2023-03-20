 const mongoose = require('mongoose');

 const uriDB = `mongodb+srv://admin:admin@peju.fbbyggi.mongodb.net/movies?retryWrites=true&w=majority`

 const connection = async () => {

    try {

        const response = await mongoose.connect(uriDB)
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