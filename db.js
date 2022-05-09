const mysql = require('promise-mysql')

const createGooglePool = (config) => {
    const conf = {
        user: process.env.DB_USER, 
        password: process.env.DB_PASS, 
        database: process.env.DB_NAME, 
        socketPath: process.env.INST_UNIT_SOCK,
        ...config
        };

    console.log(conf);

    let p = mysql.createPool(conf);
    return p;
};

const createPool = async () => {
    let config = {
        connectionLimit: 5,

        connectTimeout: 10000, // 10 seconds

        // 'acquireTimeout' is the maximum number of milliseconds to wait when
        // checking out a connection from the pool before a timeout error occurs.
        acquireTimeout: 10000, // 10 seconds

        waitForConnections: true, // Default: true

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

let pool = createPoolAndEnsureSchema();

module.exports.getPool = async () => {
    pool = pool || (await createPoolAndEnsureSchema());
    return pool;
}
