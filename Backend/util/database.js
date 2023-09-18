const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'attandance',
    password: 'Vinz@#$200120',
    timezone: 'Z'
})

module.exports = pool.promise();