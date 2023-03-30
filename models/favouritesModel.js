const { Pool } = require('pg')
const queries = require("./queries")

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'movie-users',
    password: "admin"
})


//access to all entries 
const getFaveMovies = async (user) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getFavourites, [user])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}

const getOneFave = async (user, title) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getFavourite, [user, title])
        result = data.rows
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}

//add assocoation for a favourite movie to user
const addFaveMovie = async (user, title) => {
    let client, result;
    try {
        client = await pool.connect();
        await client.query(queries.addFavourite, [user, title]);

    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}

//delete an entry 
const removeFaveMovie = async (title, user) => {
    let client, result;
    try {
        client = await pool.connect();
        await client.query(queries.deleteFavourite, [title, user]);
        result = { ok: true, msg: "movie removed" }
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}

const createNewUser = async (user) => {
    let client, result;
    try {
        client = await pool.connect();
        await client.query(queries.createUser, [user]);
        result = { ok: true, msg: "user added" }
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}

module.exports = { getFaveMovies, addFaveMovie, removeFaveMovie, getOneFave, createNewUser }