let express = require('express')
let router = express.Router()

const cors = require("cors");
router.use(cors());

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

module.exports = router;