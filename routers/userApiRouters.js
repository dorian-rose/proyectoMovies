const express = require("express")

const router = express.Router()

const { getFavourites, addFavourite, removeFavourite, getFavouriteOne } = require("../controllers/userApiControllers")

router.get("/movies/:user", getFavourites)
router.get("/movie/:user/:title", getFavouriteOne)
router.post("/movie/add/:user", addFavourite)
router.delete("/movie/delete/:user", removeFavourite)

module.exports = router