const Movies = require('../models/movieModel');


const getMoviesAdmin = async (req, res) => {

    try {
        const movies = await Movies.find()
                res.render('admin/adminView', {
                movies,
            })
        

    } catch (error) {
        
        console.log(error)
    }


}

module.exports = {
  
   getMoviesAdmin

}