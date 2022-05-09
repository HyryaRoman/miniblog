const mysql = require('promise-mysql')

const createGooglePool = async (config) => {
    // Establish a connection to the database
    return mysql.createPool({
        user: process.env.DB_USER, // e.g. 'my-db-user'
        password: process.env.DB_PASS, // e.g. 'my-db-password'
        database: process.env.DB_NAME, // e.g. 'my-database'
        // If connecting via unix domain socket, specify the path
        socketPath: process.env.INST_UNIT_SOCK,
        // Specify additional properties here.
        ...config
        });
};

const createPool = async () => {
    let config = {
        // 'connectionLimit' is the maximum number of connections the pool is allowed
        // to keep at once.
        connectionLimit: 5,

        // 'connectTimeout' is the maximum number of milliseconds before a timeout
        // occurs during the initial connection to the database.
        connectTimeout: 10000, // 10 seconds

        // 'acquireTimeout' is the maximum number of milliseconds to wait when
        // checking out a connection from the pool before a timeout error occurs.
        acquireTimeout: 10000, // 10 seconds

        // 'waitForConnections' determines the pool's action when no connections are
        // free. If true, the request will queued and a connection will be presented
        // when ready. If false, the pool will call back with an error.
        waitForConnections: true, // Default: true

        // 'queueLimit' is the maximum number of requests for connections the pool
        // will queue at once before returning an error. If 0, there is no limit.
        queueLimit: 0, // Default: 0
    };

    return createGooglePool(config);
}


const ensureSchema = async pool => {
    await pool.query(
        `CREATE TABLE IF NOT EXISTS posts(
        post_id int NOT NULL,
        post_time timestamp DEFAULT CURRENT_TIMESTAMP,
        post_title tinytext NOT NULL,
        post_desc tinytext NOT NULL,
        post_text text NOT NULL,
        PRIMARY KEY (post_id));`).catch((err) => {
            console.log(err);
        });
};

const createPoolAndEnsureSchema = async () => {
    await createPool().then(
        async pool => {
            await ensureSchema(pool);
            return pool;
        }
    ).catch(err => {
        console.log(err);
        throw err;
    });
};

let pool;

module.exports.getPool = async () => {
    return pool || (await createPoolAndEnsureSchema());
}
