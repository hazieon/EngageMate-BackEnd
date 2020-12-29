const { query } = require("../db/index");

async function getAllUsers() {
  const result = await query(`SELECT * FROM users`);
  return result.rows;
}

async function getAllSessions() {
  const result = await query(`SELECT * FROM session`);
  return result.rows;
}

async function getUserById(id) {
  const result = await query(
    `SELECT bootcamperId FROM users WHERE bootcamperId = $1`,
    [id]
  );

  return result.rows[0];
}

async function getSessionByCoach(name) {
  const result = await query(`SELECT * FROM session WHERE coach = $1`, [name]);
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

async function addSession(session) {
  const {
    uuid,
    participants,
    responses,
    outcome,
    question,
    coach,
    date,
  } = session;
  console.log("testing");
  const result = await query(
    `INSERT INTO session(uuid, participants, responses, outcome, question, coach, date) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [uuid, participants, responses, outcome, question, coach, date]
  );
  console.log("testing again");
  return result.rows[0];
}

async function deleteUser(id) {
  const result = await query(
    `DELETE FROM users WHERE bootcamperId = $1 RETURNING bootcamperId`,
    [id]
  );
  //console.log (result.rows[0])
  return result.rows[0];
}
async function deleteSession(id) {
  const result = await query(
    `DELETE FROM session WHERE uuid = $1 RETURNING id`,
    [id]
  );
  return result.rows[0];
}

async function updateUser(id, user) {
  const {
    uuid,
    bootcamperId,
    firstName,
    surname,
    role,
    cohortNo,
    email,
  } = user;
  const result = await query(
    `UPDATE users SET uuid = COALESCE($2, uuid), bootcamperId = COALESCE($3, bootcamperId), firstName = COALESCE($4, firstName), surname = COALESCE($5, surname), role = COALESCE($6, role), cohortNo = COALESCE($7, cohortNo), email = COALESCE($8, email)WHERE id = $1 RETURNING *`,
    [id, uuid, bootcamperId, firstName, surname, role, cohortNo, email]
  );
  return result.rows[[0]];
}

async function updateSession(id, session) {
  const {
    uuid,
    participants,
    responses,
    outcome,
    question,
    coach,
    date,
  } = session;
  const result = await query(
    `UPDATE session SET uuid = COALESCE($2, uuid), participants = COALESCE($3, participants), response = COALESCE($4, response), outcome = COALESCE($5, outcome), question = COALESCE($6, question), coach = COALESCE($7, coach), date = COALESCE($8, date)WHERE id = $1 RETURNING *`,
    [uuid, participants, responses, outcome, question, coach, date]
  );
  return result.rows[[0]];
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  getAllSessions,
  getSessionByCoach,
  addSession,
  deleteSession,
  updateSession,
};
