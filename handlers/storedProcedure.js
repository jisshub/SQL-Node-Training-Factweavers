const mysql = require('mysql');
const config = require('./config.js');

const connection = mysql.createConnection(config);

const sqlStmt = `CALL filterTodo(?)`;

connection.query(sqlStmt, 'salah', (error, results, fields)=>{
    if (error) {
        return console.error(error.message);
    }
    console.log(results[0]);
});

connection.end();
