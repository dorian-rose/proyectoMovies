//const Movies = require('../models/movieModel');


const getMovies = async (req, res) => {

    try {
        const movies = await Movies.find()
                res.render('movies', {
                movies,
            })
        

    } catch (error) {
        console.log(error)
    }


}

module.exports = {
  
   // getMovies

}