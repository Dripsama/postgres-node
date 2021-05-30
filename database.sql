create database test;

-- \c test [enter thedatabase on cmd]

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    decription VARCHAR()
)

INSERT INTO todo("description")
VALUES ('This is the first todo')
