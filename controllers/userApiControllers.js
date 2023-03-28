const { getFaveMovies, addFaveMovie, removeFaveMovie, getOneFave } = require("../models/favouritesModel");


//URL for this function: /api/movie/:user 
const getFavourites = async (req, res) => {
    const user = req.params.user
    let data;
    try {
        data = await getFaveMovies(user)
        console.log(data)
        res.status(200).json({ ok: true, data })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "error getting favourites" })
    }
}

const getFavouriteOne = async (req, res) => {
    const { user, title } = req.params
    let data;
    try {
        data = await getOneFave(user, title)
        res.status(200).json({ ok: true, data })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "error getting movie" })
    }

}

const addFavourite = async (req, res) => {
    //aqui una validacion que esta peli no esta ya añadido a este usuario
    const user = req.params.user
    const title = req.body.title
    //let data;
    try {
        await addFaveMovie(user, title)
        res.status(200).json({ ok: true })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "error adding favourite" })
    }
}


//remove a movie from favourites
const removeFavourite = async (req, res) => {
    const user = req.params.user
    const title = req.body.title
    try {
        const result = await removeFaveMovie(title, user)
        if (!result.ok) {
            res.status(404).json({ ok: false, msg: result.msg })
        } else { res.status(200).json({ ok: true }) }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "error removing movie" })
    }
}

module.exports = { getFavourites, addFavourite, removeFavourite, getFavouriteOne }
