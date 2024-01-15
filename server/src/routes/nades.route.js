const express = require('express');
const router = express.Router();

const {
  getNades,
  addNade
} = require("../controllers/nades.controller");

router.get('/nades', getNades);

router.post('/add', addNade);

module.exports = router;