const express = require("express")

const router = express.Router()

const { getFavourites, addFavourite, removeFavourite } = require("../controllers/userApiControllers")

router.get("/movie/:user", getFavourites)
router.post("/movie/:user", addFavourite)
router.delete("/movie/:title", removeFavourite)

module.exports = router