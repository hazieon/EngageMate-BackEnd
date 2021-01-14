// destructure pool
const { Pool } = require("pg");
// set up pool environment
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// export module
module.exports = {
  query: function (text, params, callback) {
    return pool.query(text, params, callback);
  },
  close: function () {
    return pool.end();
  },
};
