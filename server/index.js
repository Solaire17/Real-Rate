const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//create a house

app.post("/houses", async (req, res) => {
    try {
        const { house, picture, price, elo, percent } = req.body;
        const newHouse = await pool.query(
            `INSERT INTO house
        (house, picture, price, elo, percent) 
        VALUES($1, $2, $3, $4, $5) 
        RETURNING * `,
            [house, picture, price, elo, percent]);
        res.json(newHouse.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

//get all houses

app.get("/houses", async (req, res) => {
    try {
        const allHouses = await pool.query("SELECT * FROM house");
        res.json(allHouses.rows)
    }
    catch (err) {
        console.error(err.message);
    }
})

//get a house

app.get("/houses/:id", async (req, res) => {
    try {
        const { id } = req.params
        const house = await pool.query("SELECT * FROM house WHERE house_id = $1",
            [id]);
        res.json(house.rows[0])
    }
    catch (err) {
        console.error(err.message);
    }
})

//update a house

app.put("/houses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { elo } = req.body;

        const percent = ((elo / 1600) / 20) + 1
        const updateHouse = await pool.query("UPDATE house SET elo = $1, percent = $2 WHERE house_id = $3",
            [elo, percent, id]);
        res.json("HOUSE UPDATED");
    }
    catch (err) {
        console.error(err.message);
    }

})



//create a match

app.post("/matches", async (req, res) => {
    try {
        const { first_house_id,
            second_house_id,
            first_old_elo,
            second_old_elo,
            first_new_elo,
            second_new_elo,
            status } = req.body;
        const newHouse = await pool.query(
            `INSERT INTO match 
            (first_house_id, second_house_id, first_old_elo, second_old_elo, first_new_elo, second_new_elo, status ) 
            VALUES($1, $2, $3, $4, $5, $6, $7) 
            RETURNING * `,
            [first_house_id, second_house_id, first_old_elo, second_old_elo, first_new_elo, second_new_elo, status]);
        res.json(newHouse.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

//get all matches

app.get("/matches", async (req, res) => {
    try {
        const allMatches = await pool.query("SELECT * FROM match");
        res.json(allMatches.rows)
    }
    catch (err) {
        console.error(err.message);
    }
})

//get all matches matching an id

app.get("/matches/:houseId", async (req, res) => {
    try {
        const { houseId } = req.params
        const match = await pool.query("SELECT * FROM match WHERE $1 IN(first_house_id, second_house_id)",
            [houseId]);
        res.json(match.rows)
    }
    catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("SERVER IS RUNNING on 5000");
})