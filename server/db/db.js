const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});

pool.on("remove", (client) => {
  console.log("Disconnect");
});

console.log("Succesfull conection with db " + pool.options.database);
module.exports = pool;