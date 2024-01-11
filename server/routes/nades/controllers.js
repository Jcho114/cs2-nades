const connect = require("../../db/conn.js");

const getNades = async (req, res) => {
  let db = await connect();
  let collection = db.collection("nades");
  const query = req.query;
  console.log(query);
  const nades = await collection.find(query)
    .limit(50)
    .toArray();
  res.status(200).json(nades);
}

const addNade = async (req, res) => {
  let db = await connect();
  let collection = db.collection("nades");
  console.log(req.body);
  collection.insertOne(req.body);
  res.status(200).json(req.body);
}

module.exports = {
  getNades,
  addNade
}