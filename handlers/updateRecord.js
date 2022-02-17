const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

const sqlStmt = 'UPDATE todo set notes= ? WHERE user= ?';
const data = ['psg player', 'Mbappe'];

connection.query(sqlStmt, data, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log('Rows Affected', results.affectedRows);
});

connection.end();
