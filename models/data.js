const {query} = require("../db/index");

async function getAllUsers(){
    const result = await query(`SELECT * FROM users`)
    //console.log (result.rows)
    return result.rows;
}

async function getUserById(user){
    const result = await query(`SELECT * FROM users WHERE bootcamperId = $1`, [user])
    //console.log (result.rows)
    return result.rows;
}

async function addUser(user){
    const {uuid, bootcamperId, firstName, surname, role, cohortNo, email} = user 
    const result = await query(`INSERT INTO users(uuid, bootcamperId, firstName, surname, role, cohortNo, email) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [user])
    //console.log (result.rows[0])
   return result.rows[0];
}

async function deleteUser(uuid){
    const result = await query(`DELETE FROM users WHERE uuid = $1 RETURNING uuid`, [uuid]);
    //console.log (result.rows[0])
    return result.rows[0];
}

// async function updateUser(uuid){
//     const result = 
// }

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    //updateUser
}