const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

const sqlStmt = 'INSERT INTO todo(user,notes) VALUES ?';
const values = [['Enrique', 'sample notes 1'], ['Mbappe', 'sample notes 2'],
    ['Benzema', 'sample notes 3']];


connection.query(sqlStmt, [values], (err, results, fields) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Row Inserted', results.affectedRows);
});

// exports.addMultipleRows = (data) => {
//     let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
//     let values = [['Enrique', 'sample notes 1'], ['Mbappe', 'sample notes 2'],
//     ['Benzema', 'sample notes 3']];
//     let query = mysql.format(insertQuery,["todo","user","notes", values]);
//     pool.query(query,(err, response) => {
//         if(err) {
//             console.error(err);
//             return;
//         }
//         // rows added
//         console.log(response.insertId);
//     });
// }

// exports.CallThisFunc_1 = (addMultipleRows) => {
//     setTimeout(() => {
//         // call the function
//         addMultipleRows();
//     },5000);
// }