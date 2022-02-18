 const mysql = require('mysql');
 const config = require('./config');
 const connection =  mysql.createConnection(config);

 const sqlStmt = 'UPDATE sales set total = ? WHERE id = ?';
 const data = [1000.80, 2];

 connection.query(sqlStmt, data, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log('records updated', results.affectedRows);
 });