const mysql = require('mysql');

var connection = mysql.createConnection({
    user: process.env.DB_USER, 
    password: process.env.DB_PASS, 
    database: process.env.DB_NAME, 
    socketPath: process.env.INST_UNIT_SOCK,


    connectionLimit: 5,

    connectTimeout: 10000, // 10 seconds

    // 'acquireTimeout' is the maximum number of milliseconds to wait when
    // checking out a connection from the pool before a timeout error occurs.
    acquireTimeout: 10000, // 10 seconds

    waitForConnections: true, // Default: true

    queueLimit: 0, // Default: 0
});

const query = (q, on_complete) => {
    connection.query(q, (err, res, fields) => {
        if (err) {
            console.log('Failed to connect to db');
            console.log(err.stack);
        }
        on_complete(err, res, fields);
    });

    connection.end();
};

const ensureSchema = () => {
    query(`CREATE TABLE IF NOT EXISTS posts(
        post_id int NOT NULL,
        post_time timestamp DEFAULT CURRENT_TIMESTAMP,
        post_title tinytext NOT NULL,
        post_desc tinytext NOT NULL,
        post_text text NOT NULL,
        PRIMARY KEY (post_id));`,
        (err, res, fields) => {
            if (err) {
                console.log('Failed to complete request');
                console.log(err.stack);
            }
        }
    );
};

ensureSchema();

module.exports.connection = connection;
module.exports.query = query;
