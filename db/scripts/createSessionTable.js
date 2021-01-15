const { query } = require("../index.js");

const sqlStatement = `
DROP TABLE IF EXISTS session;
CREATE TABLE IF NOT EXISTS session(
    id SERIAL PRIMARY KEY,
    uuid VARCHAR,
    participants INT DEFAULT 1,
    responses INT DEFAULT 0,
    outcome INT DEFAULT 50,
    question VARCHAR DEFAULT '',
    coach TEXT DEFAULT '',
    date VARCHAR,
    throwaway BOOL DEFAULT false
)`;

const createSessionTable = async () => {
  const result = await query(sqlStatement);
  console.log(result);
};
createSessionTable();
