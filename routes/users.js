var express = require("express");
var router = express.Router();

const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require("../models/data");

/* GET users listing. */

router.get("/", async function (req, res, next) {
  try {
    const result = await getAllUsers();
    res.json({ success: true, data: result });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const result = await getUserById(id);
    res.json({ success: true, data: result });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    console.log("post request");
    const { body } = req;
    console.log(body);
    const myNewData = await addUser(body);
    console.log(myNewData);
    res.json({ message: `You have added a new user` });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const deletedUser = await deleteUser(id);
    res.json({ success: true });
    console.log("deleted user");
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:id", async function (req, res, next) {
  try {
    console.log("test");
    const { body } = req;
    console.log(body);
    const { id } = req.params;
    console.log(id);
    const result = await updateUser(id, body);
    res.json({ success: true });
    console.log("patched user with email: " + result.email);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
