const { query } = require("../index");
const { v4: uuidv4 } = require("uuid");
const users = require("../data");
const userData = [
  {
    uuid: uuidv4(),
    bootcamperId: "0001",
    firstName: "Chris",
    surname: "Meah",
    role: "coach",
    cohortNo: 0,
    email: "chris@chris.com",
  },
  {
    uuid: uuidv4(),
    bootcamperId: "0002",
    firstName: "Ben",
    surname: "Lee",
    role: "coach",
    cohortNo: 2,
    email: "ben@ben.com",
  },
  {
    uuid: uuidv4(),
    bootcamperId: "0003",
    firstName: "Joe",
    surname: "Trodden",
    role: "guest",
    cohortNo: 0,
    email: "joe@joe.com",
  },
  {
    uuid: uuidv4(),
    bootcamperId: "3286",
    firstName: "Carl",
    surname: "McIntosh",
    role: "coach",
    cohortNo: 4,
    email: "cod3rcarl@gmail.com",
  },
  {
    uuid: uuidv4(),
    bootcamperId: "3781",
    firstName: "Kunmi",
    surname: "Williams",
    role: "coach",
    cohortNo: 4,
    email: "kumswilliams@gmail.com",
  },
];

const text = `INSERT INTO users(uuid, bootcamperId, firstName, surname, role, cohortNo, email) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

const populateTable = async () => {
  for (let i = 0; i < users.length; i++) {
    let currentItem = users[i];
    let res = await query(text, [
      currentItem.uuid,
      currentItem.bootcamperId,
      currentItem.firstName,
      currentItem.surname,
      currentItem.role,
      currentItem.cohortNo,
      currentItem.email,
    ]);
    console.log(res.rows);
  }
};
populateTable();

module.exports = { userData };
