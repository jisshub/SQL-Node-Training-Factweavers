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

```bash
mysql> sudo mysql -u newuser -p
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

## Setting Configurations

**config.js**

```javascript
const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'newuser',
    password: 'Pass@#123',
    database: 'todolist',
};

module.exports = config;
```

## Inserting Rows into Table

**handlers/addRecord.js**

```javascript
const mysql = require('mysql');
const config = require('./config.js');
const connection = mysql.createConnection(config);

const sqlStmt = 'INSERT INTO todo (user, notes) VALUES (?,?)';


connection.query(sqlStmt, ['salah', 'liverpool player'], (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log('Inserted Row:', results.affectedRows);
});
```

Then Run below,

```bash
node handlers/addRecord.js
```

## Inserting Multiple Records 

**handlers/addMultipleRecs.js**

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
node handlers/addMultipleRecs.js
```


## Update a Record

**handlers/updateRecord.js**

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
node handlers/updateRecord.js
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

**handlers/selectByData.js**

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

**handlers/deletData.js**

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

## Using Stored Procedure in MYSQL NODE.

The steps for calling a stored procedure are similar to the steps for executing a query as follows:

1. Connect to the MySQL database server.

2. Call the stored procedure by executing the **CALL spName** statement. The **spName** is the name of the stored procedure.

3. Close the database connection.

### Calling a MySQL stored procedure.

We create a new stored procedure **filterTodo** to query rows from the **todo** table based on the value of the **user** field.

Note: 
1. Create this stored procedure in the **todolist** database. 
2. Use MySQL workbench to create the stored procedure.

**filterTodo.sql**

```sql
DELIMITER $$

CREATE PROCEDURE `filterTodo`(IN player VARCHAR(255))
BEGIN
    SELECT * FROM todo WHERE user = player;
END$$
```

- The stored procedure filterTodo returns the rows in the **todo** table based on the **player** argument.
- Call stored procedure in MySQL,

```bash
mysql> CALL filterTodo('salah');
```

**RESULT:**

```bash
+-------+------------------+
| user  | notes            |
+-------+------------------+
| salah | liverpool player |
+-------+------------------+
1 row in set (0.00 sec)

Query OK, 0 rows affected (0.00 sec)
```
- It returns the data with user as salah.


The following storedproc.js program calls the **filterTodo** stored procedure and returns the result set:

**storedProcedure.js**

```javascript
const mysql = require('mysql');
const config = require('./config.js');

const connection = mysql.createConnection(config);

const sqlStmt = `CALL filterTodo(?)`;

connection.query(sqlStmt, 'salah', (error, results, fields)=>{
    if (error) {
        return console.error(error.message);
    }
    console.log(results[0]);
});

connection.end();
```

- In the CALL statement, we used a placeholder (?) to pass data to the stored procedure.

- When we called the query() method on the connection object, we pass the value of the **player** argument as the second argument of the query() method.


Then run,

```bash
node handlers/storedProcedure.js

[ RowDataPacket { user: 'salah', notes: 'liverpool player' } ]
```