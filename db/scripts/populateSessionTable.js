const { query } = require("../index");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const userData = [
  {
    uuid: uuidv4(),
    participants: 5,
    responses: 5,
    outcome: "100%",
    question: "How are you feeling?",
    coach: "Ben",
    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
];

const text = `INSERT INTO session(uuid, participants, responses, outcome, question, coach, date) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

const populateSessionTable = async () => {
  for (let i = 0; i < userData.length; i++) {
    let currentItem = userData[i];
    let res = await query(text, [
      currentItem.uuid,
      currentItem.participants,
      currentItem.responses,
      currentItem.outcome,
      currentItem.question,
      currentItem.coach,
      currentItem.date,
    ]);
    console.log(res.rows);
  }
};
populateSessionTable();
