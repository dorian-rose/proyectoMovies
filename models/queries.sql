CREATE TABLE users (
	email varchar(100) NOT NULL UNIQUE PRIMARY KEY,
  id_users serial NOT NULL, 
 permission varchar(45) 
) 

CREATE TABLE movies (
  id_movie serial NOT NULL PRIMARY KEY, 
  title varchar(100) NOT NULL, 
  email varchar(100) NOT NULL,
  FOREIGN KEY (email) REFERENCES users(email)
)


INSERT INTO movies(id_users, title)
VALUES 
(id_users, title)

DELETE 
FROM movies 
WHERE title =title and id_users=id_users