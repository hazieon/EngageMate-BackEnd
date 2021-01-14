const { query } = require("../index.js");

const sqlStatement = `
SELECT * FROM session`;

const selectTable = async () => {
  const result = await query(sqlStatement);
  console.log(result);
};
selectTable();
