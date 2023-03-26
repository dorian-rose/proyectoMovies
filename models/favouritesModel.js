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

//add assocoation for a favourite movie to user
const addFaveMovie = async (user, title) => {
    console.log("addmovie", user, title)
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
const removeFaveMovie = async (title) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getEntriesByTitle, [title])
        const entry = data.rows
        if (entry.length > 0) {
            await client.query(queries.deleteEntries, [title]);
            result = { ok: true, msg: "entry deleted" }
        } else { result = { ok: false, msg: "Title doesn't exist" } }
    } catch (error) {
        console.log(error)
        throw error
    } finally { client.release() }
    return result
}


module.exports = { getFaveMovies, addFaveMovie, removeFaveMovie }