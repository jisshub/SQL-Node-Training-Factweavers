## Step 1: Install mysql node module

```bash
npm i mysql 
```

## Step 2: Connect to mysql


```bash
mysql> sudo mysql -u root -p
```

#### create a new user in your MySQL server with ‘mysql_native_password’ authentication mechanisum.

```bash
mysql> CREATE USER 'username'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'username'@'localhost';
FLUSH PRIVILEGES;
```


## Initial Connection Set Up

**app.js**

```javascript   
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'Pass@#123',
    database: 'testdb' 
});

connection.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});
```

**Run below command in terminal**

```bash
node app.js
```

## Inserting Rows into Table

```javascript
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

exports.CallThisFunc = (addRow) => {
    setTimeout(() => {
        // call the function
        addRow({
            "user": "Saviour",
            "value": "Just adding a note"
        });
    },5000);
}
```

## Inserting Multiple Records 


**addMultipleRecs.js**

```javascript
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

```

Then Run,

```bash
node addMultipleRecs.js
```


## Update a Record

```javascript
const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

const sqlStmt = 'UPDATE todo set notes= ? WHERE user= ?';
const data = ['football player', 'Benzema'];

connection.query(sqlStmt, data, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log('Rows Affected', results.affectedRows);
});
```

Then Run,

```bash
node addMultipleRecs.js
```


## Querying / Selecting Data in MYSQL


**handlers/selectData.js**

```javascript
const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

const sqlStmt = 'SELECT * FROM todo';
connection.query(sqlStmt, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results);
});

connection.end();

```

Then run,
```bash
node handlers/selectData.js
```


## Passing data to the query

```javascript
const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

const sqlStmt = 'SELECT * FROM todo WHERE user= ?';

connection.query(sqlStmt, ['Enrique'], (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results);
});

connection.end();

```

Then run,

```bash
node handlers/selectByData.js
```


## Delete Data

```javascript
const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

// delete record
const sqlStmt = 'DELETE FROM todo WHERE user= ?';

// pass sql statement and user.
connection.query(sqlStmt, ['Enrique'], (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log('Deleted Row:', results.affectedRows);
});

connection.end();

```

Then run,

```bash
node handlers/deleteData.js
```