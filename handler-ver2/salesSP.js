const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection(config);

const sqlStmt = `CALL getSales(?)`;
connection.query(sqlStmt, 'Member', (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results[0]);
});


connection.end();

