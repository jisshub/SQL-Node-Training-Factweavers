const mysql = require('mysql');
const config = require('./config');
const connection = mysql.createConnection(config);

const sqlStmt = `DELETE from sales WHERE unit_price = ?`;
const data = [0.00];

const query = connection.query(sqlStmt, data, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log('records deleted', results.affectedRows);
});
