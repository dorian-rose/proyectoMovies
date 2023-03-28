const express = require("express")

const router = express.Router()

const { getFavourites, addFavourite, removeFavourite } = require("../controllers/userApiControllers")

router.get("/movies/:user", getFavourites)
router.post("/movie/add/:user", addFavourite)
router.delete("/movie/delete/:title/:user", removeFavourite)

module.exports = router