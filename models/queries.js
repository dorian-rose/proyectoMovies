const queries = {
    getFavourites: `SELECT m.title
            FROM movies AS m
            INNER JOIN users AS u
            ON m.id_users = u.id_users
			WHERE m.id_users = $1
            ORDER BY m.title`,

    addFavourite: `INSERT INTO movies(id_users, title)
VALUES 
($1, $2)`
}

module.exports = queries