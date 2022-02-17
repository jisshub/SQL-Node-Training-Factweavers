const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

const sqlStmt = 'SELECT * FROM todo';
connection.query(sqlStmt, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results);
});

connection.end();
