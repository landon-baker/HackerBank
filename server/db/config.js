const { Client } = require("pg");

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

client.connect(err => {
  if (err) {
    console.error(err);
  } else {
    console.log("connected to DB");
  }
});
module.exports = client;
