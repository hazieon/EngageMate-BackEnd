const { query } = require("../index.js");

const sqlStatement = `
DROP TABLE IF EXISTS session;
CREATE TABLE IF NOT EXISTS session(
    id SERIAL PRIMARY KEY,
    uuid VARCHAR,
    participants INT,
    responses INT,
    outcome VARCHAR,
    question VARCHAR,
    coach TEXT,
    date VARCHAR
    
)`;

const createSessionTable = async () => {
  const result = await query(sqlStatement);
  console.log(result);
};
createSessionTable();
