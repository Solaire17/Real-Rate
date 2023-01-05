const Pool = require("pg").Pool;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD

const pool = new Pool({
    user: "postgres",
    password: "Ar8Du8DiQA0",
    host: "localhost",
    port: 5432,
    database: "realrate"
});

module.exports = pool;