const mysql = require('mysql');
const config = require('./config');
const connection = mysql.createConnection(config);

const sqlStmt = `INSERT INTO sales(id, customer_type, unit_price, qty, total) VALUES ?`;
// const values = [
//     [
//         1,
//         'Member',
//         400.50,
//         3,
//         1400.50
//     ], [
//         2,
//         'Normal',
//         300.50,
//         2,
//         600.50
//     ], [
//         3,
//         'Member',
//         200.50,
//         4,
//         800.50
//     ]
//     ]
const values = [
    [
        4,
        'Member',
        0,
        4,
        1400.50
    ], [
        5,
        'Normal',
        300.50,
        2,
        600.50
    ], [
        7,
        'Member',
        200.50,
        4,
        0
    ]
    ]

connection.query(sqlStmt, [values], (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log('records inserted', results.affectedRows);
})