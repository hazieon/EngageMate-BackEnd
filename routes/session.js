var express = require("express");
var router = express.Router();

const {
  getAllSessions,
  getSessionByCoach,
  addSession,
  updateSession,
  deleteSession,
} = require("../models/data");

/* GET users listing. */

router.get("/", async function(req, res, next) {
  try {
    const result = await getAllSessions();
    res.json({ success: true, data: result });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:coach", async function(req, res, next) {
  try {
    const coach = req.params.coach;
    const result = await getSessionByCoach(coach);
    res.json({ success: true, data: result });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async function(req, res, next) {
  try {
    console.log("post request");
    const { body } = req;
    console.log(body);
    const myNewData = await addSession(body);
    console.log(myNewData);
    res.json({ message: `You have added a new session` });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async function(req, res, next) {
  try {
    const id = req.params.id;
    const deletedSession = await deleteSession(id);
    res.json({ success: true });
    console.log("deleted user");
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:id", async function(req, res, next) {
  try {
    console.log("test");
    const { body } = req;
    console.log(body);
    const { id } = req.params;
    console.log(id);
    const result = await updateSession(id, body);
    res.json({ success: true });
    console.log("patched session");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
