const { getFaveMovies, addFaveMovie, removeFaveMovie} = require("../models/favouritesModel");

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

//ADD a movie TO favourites
const addFavourite = async (req, res) => {
    const user = req.params.user
    const title = req.body.title
    let data;
    try {
        await addFaveMovie(user, title)
        res.status(200).json({ ok: true })
    } catch (error) {
        res.status(500).json({ ok: false, msg: "error adding favourite" })
    }
}

//REMOVE a movie FROM favourites
const removeFavourite = async (req, res) => {
    let { title } = req.query
    try {
        const result = await removeFaveMovie(title)
        if (!result.ok) {
            res.status(404).json({ ok: false, msg: result.msg })
        } else { res.status(200).json({ ok: true }) }
    } catch (error) {
        res.status(500).json({ ok: false, msg: "error removing movie" })
    }
}

module.exports = { getFavourites, addFavourite, removeFavourite }
