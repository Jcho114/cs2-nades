const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

async function connect() {
  try {
    let conn = await client.connect();
    console.log("Connection to MongoDB database established");
    if (conn) {
      return conn.db("cs2");
    }
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  client,
  connect
}