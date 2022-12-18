CREATE DATABASE realrate;

CREATE TABLE house(
    house_id SERIAL PRIMARY KEY,
    house varchar(255) NOT NULL UNIQUE,
    picture VARCHAR(255),
    price int,
    elo int,
    percent float
);

CREATE TABLE match(
    match_id SERIAL PRIMARY KEY,
    first_house_id int,
    second_house_id int,
    first_old_elo int,
    second_old_elo int,
    first_new_elo int,
    second_new_elo int,
    status boolean
);