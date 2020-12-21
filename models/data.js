const { query } = require("../db/index");

async function getAllUsers() {
  const result = await query(`SELECT * FROM users`);
  //console.log (result.rows)
  return result.rows;
}

async function getUserById(id) {
  const result = await query(`SELECT * FROM users WHERE bootcamperId = $1`, [
    id,
  ]);

  //console.log(result.rows);
  return result.rows;
}

async function addUser(user) {
  const {
    uuid,
    bootcamperId,
    firstName,
    surname,
    role,
    cohortNo,
    email,
  } = user;
  console.log("testing");
  //   const user = (uuid, bootcamperId, firstName, surname, role, cohortNo, email);
  //   console.log(user);
  const result = await query(
    `INSERT INTO users(uuid, bootcamperId, firstName, surname, role, cohortNo, email) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [uuid, bootcamperId, firstName, surname, role, cohortNo, email]
  );
  console.log("testing again");
  //console.log (result.rows[0])
  return result.rows[0];
}

async function deleteUser(id) {
  const result = await query(
    `DELETE FROM users WHERE bootcamperId = $1 RETURNING id`,
    [id]
  );
  //console.log (result.rows[0])
  return result.rows[0];
}

async function updateUser(id) {
  const result = await query(``);
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  //updateUser
};
