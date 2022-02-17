const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

const sqlStmt = 'INSERT INTO todo(user,notes) VALUES ?';
const values = [['Kroos', 'real madrid player'], ['lewa', 'bayern player'],
    ['martinez', 'inter milan player'], ['pique', 'barcelona player'], ['puyol', 'spain player'],
    ['kaka', 'brazil player'], ['messi', 'argentina player'], ['insigne', 'italy player']]


connection.query(sqlStmt, [values], (err, results, fields) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Row Inserted', results.affectedRows);
});
