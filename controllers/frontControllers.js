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
    const user = 1
    try {
        const data = await consultation(null, null, user);
        const movieList = data.data
        console.log(movieList[0])

        movieList.forEach(movie => {
            //     const movieData = await consultation(movie.title)
        });
        // res.render("userViews/detailView", {
        //     movieData,
        // });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving movies",
        });
    }
}

module.exports = { searchTitle, getIndex, getFavouriteMovies }