const queries = {
    getFavourites: `SELECT m.title
            FROM movies AS m
            INNER JOIN users AS u
            ON m.email = u.email
			WHERE m.email = $1
            ORDER BY m.title`,
    getFavourite: `SELECT m.title
            FROM movies AS m
            INNER JOIN users AS u
            ON m.email = u.email
			WHERE m.email = $1 and title = $2`,

    addFavourite: `INSERT INTO movies(email, title)
VALUES 
($1, $2)`,

    deleteFavourite: `DELETE 
FROM movies 
WHERE title =$1 and email=$2`,

    createUser: `INSERT INTO users(email, permission)
VALUES 
($1, 'user')`
}


module.exports = queries