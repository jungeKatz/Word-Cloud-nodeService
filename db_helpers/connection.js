require('dotenv').config();
const mariadb = require('mariadb');
const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PORT = process.env.DB_PORT;
const DB = process.env.DB_NAME;
const PASSWORD = process.env.DB_PASS;

module.exports = createConnection;

const pool = mariadb.createPool({
  host: HOST,
  user: USER,
  port: PORT,
  database: DB,
  password: PASSWORD,
  connectionLimit: 5,
});

async function createConnection(req, res, next) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * from user');
    console.log(rows); //[ {val: 1}, meta: ... ]
    res.send(rows); 
  } catch (err) {
    next();
    throw err;
  } finally {
    if (conn) {
      conn.end();
    }
  }

  
 
}
