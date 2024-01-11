let express = require('express');
let router = express.Router();

const {
  getNades,
  addNade
} = require("./controllers.js");

router.get('/nades', getNades);

router.post('/add', addNade);

module.exports = router;