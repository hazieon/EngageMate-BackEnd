const { query } = require("../index");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const userData = [
  {
    uuid: uuidv4(),
    participants: 5,
    responses: 5,
    outcome: "100",
    question: "How are you feeling?",
    coach: "Ben",
    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    throwaway: false,
  },
  {
    uuid: uuidv4(),
    participants: 2,
    responses: 1,
    outcome: "75",
    question: "Can I get a meaty thumbometer?",
    coach: "Tao",
    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    throwaway: true,
  },
  {
    uuid: uuidv4(),
    participants: 48,
    responses: 48,
    outcome: "100",
    question: "Are you engaged mate?",
    coach: "Chris",
    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    throwaway: true,
  },
  {
    uuid: uuidv4(),
    participants: 20,
    responses: 17,
    outcome: "80",
    question: "How's it going?'",
    coach: "Liz K",
    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    throwaway: true,
  },
  {
    uuid: uuidv4(),
    participants: 5,
    responses: 5,
    outcome: "80",
    question: "Have you finished the task?'",
    coach: "James",
    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    throwaway: true,
  },
];

const text = `INSERT INTO session(uuid, participants, responses, outcome, question, coach, date, throwaway) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

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
      currentItem.throwaway,
    ]);
    console.log(res.rows);
  }
};
populateSessionTable();
