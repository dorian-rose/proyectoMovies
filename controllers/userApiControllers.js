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


// const addFavourite = async (req, res) => {
//     console.log("add favourites")
//     const { user } = req.query
//     const title = { title: "hello" };//req.params.title
//     console.log(user, title)
//     // let data;
//     try {
//         await addFaveMovie(user, title)
//         res.status(200).json({ ok: true })
//     } catch (error) {
//         res.status(500).json({ ok: false, msg: "error adding favourite" })
//     }
// }
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


//remove a movie from favourites
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
