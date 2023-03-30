const express = require("express")

const router = express.Router()

const { getFavourites, addFavourite, removeFavourite, getFavouriteOne, addUser } = require("../controllers/userApiControllers")

router.get("/movie/get/:user", getFavourites)
router.get("/movie/:user/:title", getFavouriteOne)
router.post("/movie/add/:user", addFavourite)
router.delete("/movie/delete/:user", removeFavourite)
router.post("/user/add", addUser)

module.exports = router