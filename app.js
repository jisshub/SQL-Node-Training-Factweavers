const express = require('express');
const mysql = require('mysql');
const app = express();
const pool = mysql.createPool({
    host: 'localhost',
    user: 'jiss',
    password: 'Jiss@#476',
    database: 'todolist',
});

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
