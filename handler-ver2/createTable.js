// create table sales(id int not null primary key, customer_type varchar(50), unit_price decimal(10, 2), qty int not null, total decimal(1
// 0, 2));

const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

const sqlStmt = `CREATE TABLE sales (id int not null, 
                                    customer_type varchar(50),
                                    unit_price decimal(10, 2),
                                    qty int not null,
                                    total decimal(10, 2))
                                    ;`;


connection.query(sqlStmt, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log('table created');
});

// timeout just to avoid firing query before connection happens
