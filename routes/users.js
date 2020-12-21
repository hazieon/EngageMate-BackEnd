var express = require('express');
var router = express.Router();

const {getAllUsers} = require("../models/data");

/* GET users listing. */
// router.get('/', async function(req, res, next) {
//   const data = await getAllUsers();
//   console.log(data)
//   res.json({data});
// });

router.get("/", async function (req, res, next) {
  try {
    const result = await getAllUsers();
    res.json({ success: true, data: result });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
