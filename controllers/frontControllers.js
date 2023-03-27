const { consultation } = require('../helpers/fetch');
//Renderiza la vista inicial
const getIndex = (req, res) => {
    console.log(req.oidc.isAuthenticated())
    res.render("userViews/index", { isAuthenticated: req.oidc.isAuthenticated(), user: req.oidc.user, })
}

//Recoge datos de una pelicula por su titulo y pinta 
const searchTitle = async (req, res) => {
    const title = req.params.title
    try {
        const movieData = await consultation(title);
        console.log(movieData)
        res.render("userViews/detailView", {
            movieData,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving movies",
        });
    }
};

//recoge datos y pinta lista "mis peliculas" (favourites)
const getFavouriteMovies = async (req, res) => {
    const user = req.params.user
    const arrayMovies = []
    try {
        const data = await consultation(null, null, user);
        const movieList = data.data
        //movieList.forEach(movie => {
        for (let movie of movieList) {
            const movieData = await consultation(movie.title)
            arrayMovies.push(movieData)
        }
        console.log(arrayMovies)

        res.render("userViews/favouriteMovies", { arrayMovies })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving favourite movies",
        });
    }
}

//recoge datos y pinta lista "mis peliculas" (favourites)
const addFavouriteMovie = async (req, res) => {
    console.log("here in front controller add movie")
    const user = "4"
    movie = req.body.movie
    const title = JSON.stringify({ title: movie })
    try {
        await consultation(title, null, user);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error adding movies",
        });
    }
}



module.exports = { searchTitle, getIndex, getFavouriteMovies, addFavouriteMovie }