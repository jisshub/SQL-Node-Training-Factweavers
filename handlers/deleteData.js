const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

// delete record
const sqlStmt = 'DELETE FROM todo WHERE user= ?';

connection.query(sqlStmt, null, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log('Deleted Row:', results.affectedRows);
});

connection.end();
