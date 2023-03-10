const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const Redis = require("redis");
const { json } = require("express");

//Redis functions and cache expiration
const redisClient = Redis.createClient()
const EXPIRATION = 3600

app.use(cors());
app.use(express.json());


//Create a house
app.post("/houses", async (req, res) => {
    const { house, picture, price } = req.body;
    try {
        if (price != 0){
        
        const newHouse = await pool.query(
            `INSERT INTO house
        (house, picture, price, elo, percent) 
        VALUES($1, $2, $3, $4, $5) 
        RETURNING * `,
            [house, picture, price, 1600, 1]);
        res.json(newHouse.rows[0])
    }
    } catch (err) {
        console.error(err.message);
    }
})

//Get all houses
app.get("/houses", async (req, res) => {
    try {
    const houses = await getOrSetCache("houses", async () => {
        const allHouses  = await pool.query("SELECT * FROM house");
        return allHouses
    })
    res.json(houses.rows)
    }
    catch (err) {
        console.error(err.message);
    }
})

//Get all houses sorted by highest to lowest elo
app.get("/houses/sorted", async (req, res) => {
    try {
    const houses = await getOrSetCache("houses/sorted", async () => {
        const allHouses  = await pool.query("SELECT * FROM house ORDER BY elo DESC");
        return allHouses
    })
    res.json(houses.rows)
    }
    catch (err) {
        console.error(err.message);
    }
})

//Get a house using given id
app.get("/houses/:id", async (req, res) => {
    try {
        const { id } = req.params
        const houses = await getOrSetCache(`houses:${id}`, async () => {
            const house = await pool.query("SELECT * FROM house WHERE house_id = $1",
            [id]);
            return house
        })
        res.json(houses.rows[0])
    }
    catch (err) {
        console.error(err.message);
    }
})

//Get a house but not including the given id
app.get("/houses/random/:id", async (req, res) => {
    try {
        const { id } = req.params
        const house = await pool.query("SELECT * FROM house WHERE house_id != $1 ORDER BY RANDOM() LIMIT 1",
            [id]);
        res.json(house.rows[0])
    }
    catch (err) {
        console.error(err.message);
    }
})

//Update a house's properties (Elo and Percent)
app.put("/matchResult", async (req, res) => {
    try {
        const { firstHouseId, secondHouseId, firstNewElo, secondNewElo, status } = req.body;
        const firstHousePercent = (firstNewElo / 1600)
        const secondHousePercent = (secondNewElo / 1600)

        const updateFirstHouse = await pool.query("UPDATE house SET elo = $1, percent = $2 WHERE house_id = $3",
            [firstNewElo, firstHousePercent, firstHouseId]);
        const updateSecondHouse = await pool.query("UPDATE house SET elo = $1, percent = $2 WHERE house_id = $3",
            [secondNewElo, secondHousePercent, secondHouseId]);
    }
    catch (err) {
        console.error(err.message);
    }

})



//Create a match
app.post("/matches", async (req, res) => {
    try {
        const { firstHouseId,
            secondHouseId,
            firstOldElo,
            secondOldElo,
            firstNewElo,
            secondNewElo,
            status } = req.body.match;
        const newHouse = await pool.query(
            `INSERT INTO match 
            (first_house_id, second_house_id, first_old_elo, second_old_elo, first_new_elo, second_new_elo, status) 
            VALUES($1, $2, $3, $4, $5, $6, $7) 
            RETURNING * `,
            [firstHouseId, secondHouseId, firstOldElo, secondOldElo, firstNewElo, secondNewElo, status]);
        res.json(newHouse.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

//Get all matches
app.get("/matches", async (req, res) => {
    try {
        const matches = await getOrSetCache("matches", async () => {
            const allMatches = await pool.query("SELECT * FROM match");
            return allMatches
        })
        res.json(matches.rows)
        }
        catch (err) {
            console.error(err.message);
        }
})

//Get all matches using given house id
app.get("/matches/:houseId", async (req, res) => {
    try {
        const { houseId } = req.params
        const matches = await getOrSetCache(`matches:${houseId}`, async () => {
            const match = await pool.query("SELECT * FROM match WHERE $1 IN(first_house_id, second_house_id) ORDER BY match_id DESC",
            [houseId]);
            return match
        })
        res.json(matches.rows)
    }
    catch (err) {
        console.error(err.message);
    }
})

//Redis Function for caching new data/ retrieving data
function getOrSetCache(key, callback) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if (error) return reject(error)
            if (data !=null) return resolve(JSON.parse(data))
            const newData = await callback()
            redisClient.setex(key, EXPIRATION, JSON.stringify(newData))
            resolve(newData)
        })
    })
}

app.listen(5000, () => {
    console.log("SERVER IS RUNNING on 5000");
})