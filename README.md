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