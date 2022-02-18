const mysql = require('mysql');
const config = require('./config');
const  connection = mysql.createConnection(config);

const sqlStmt = 'SELECT * FROM sales where total > ?';
const data = [1000];
connection.query(sqlStmt, data, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results);
});

connection.end();