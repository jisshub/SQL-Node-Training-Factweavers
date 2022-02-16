const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'newuser',
    password: 'Pass@#123',
    database: 'todolist',
});

exports.addRow = (data) => {
    let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
    let query = mysql.format(insertQuery,["todo","user","notes",data.user,data.value]);
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows added
        console.log(response.insertId);
    });
}

// timeout just to avoid firing query before connection happens

setTimeout(() => {
    // call the function
    addRow({
        "user": "Ajith",
        "value": "Just adding a note"
    });
},5000);

exports.finalData = (data) => {
    console.log(data);
}