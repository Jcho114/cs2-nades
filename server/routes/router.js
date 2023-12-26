let express = require('express');
let router = express.Router();

let connect = require("../db/conn");

router.get('/nades', async (req, res) => {
  let db = await connect();
  let collection = db.collection("nades");
  const query = req.query;
  console.log(query);
  const nades = await collection.find(query)
    .limit(50)
    .toArray();
  res.json(nades).status(200);
})

router.post('/add', async (req, res) => {
  let db = await connect();
  let collection = db.collection("nades");
  console.log(req.body);
  collection.insertOne(req.body);
  res.status(200).json(req.body);
})

module.exports = router;