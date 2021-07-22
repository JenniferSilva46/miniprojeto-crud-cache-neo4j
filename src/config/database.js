require('dotenv').config();

const {
    Client
} = require('pg');
const redis = require("redis");

// conectando pgAdmin
const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});

client.connect()
    .then(() => console.log('Postgres conectado!'))
    .catch(err => console.log(err.stack));

//conectando redis 
const clientRedis = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

clientRedis.on("connect", (err) => {
    console.log("Redis conectado");
})



module.exports = {
    client,
    clientRedis,
};