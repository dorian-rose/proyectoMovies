CREATE TABLE users (
  id_users serial NOT NULL PRIMARY KEY, 
  full_name varchar(45) NOT NULL, 
  email varchar(100) NOT NULL UNIQUE,
  password varchar(100) NOT NULL
);

CREATE TABLE movies (
  id_movie serial NOT NULL PRIMARY KEY, 
  title varchar(100) NOT NULL, 
  id_users int,
  database varchar(15),
  FOREIGN KEY (id_users) REFERENCES users(id_users)
)