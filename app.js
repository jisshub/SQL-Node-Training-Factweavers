const express = require('express');
const mysql = require('mysql');
const app = express();
const pool = mysql.createPool({
    host: 'localhost',
    user: 'newuser',
    password: 'Pass@#123',
    database: 'testdb',
});

// connection.connect(function (err) {
//     if (err) {
//         throw err;
//     }
//     console.log('Connected to MySQL');
// });

// app.get("/", (req, res) => {
//     connection.query('SELECT * FROM users', (err, rows, fields) => {
//         if (err) throw err;
//         console.log('Data received from Database:', rows);
//         connection.end();
//     });
// })
app.get("/",(req,res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        connection.query('SELECT * from users LIMIT 1', (err, rows) => {
            connection.release(); // return the connection to pool
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
        });
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
