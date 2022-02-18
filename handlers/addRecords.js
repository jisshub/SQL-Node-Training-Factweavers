const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

const sqlStmt = 'INSERT INTO todo (user, notes) VALUES (?,?)';


connection.query(sqlStmt, ['martial', 'sevilla player'], (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log('Inserted Row:', results.affectedRows);
});

// timeout just to avoid firing query before connection happens
