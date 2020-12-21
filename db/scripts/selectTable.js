const {query} = require('../index.js')


const sqlStatement = `
SELECT * FROM users`;

const selectTable = async () => {
    const result = await query(sqlStatement);
    console.log(result)
}
selectTable()