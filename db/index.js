// destructure pool
const { Pool } = require("pg");
// set up pool environment
const pool = new Pool({
  ssl: { rejectUnauthorized: false },
});

// export module
module.exports = {
  query: function (text, params, callback) {
    return pool.query(text, params, callback);
  },
};
