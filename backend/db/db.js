const Pool = require("pg");

const pool = new Pool();

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })
