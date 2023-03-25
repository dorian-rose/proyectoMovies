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
module.exports = { searchTitle, getIndex }