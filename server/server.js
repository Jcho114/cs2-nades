require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 4000;

const express = require('express');
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require("./src/routes/nades.route.js"));

app.use((error, res, req, next) => {
  console.error(error.message);
  res.status(500).json({
    "message": "error",
  });
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;