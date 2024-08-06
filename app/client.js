// import the client class from the pg module
const { Client } = require('pg');

// create an instance of the client class, using the URL database connexion from .env file
const client = new Client(process.env.PG_URL);

// connect to the database
client.connect();

module.exports = client;
