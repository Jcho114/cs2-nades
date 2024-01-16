const {
  dbGetNades,
  dbAddNade
} = require("../collections/nades.collection");

const getNades = async (req, res) => {
  const query = req.query;
  nades = await dbGetNades(query);
  res.status(200).json(nades);
}

const addNade = async (req, res) => {
  await dbAddNade(req.body);
  res.status(200).json({
    "message": "nade successfully added"
  });
}

module.exports = {
  getNades,
  addNade
}