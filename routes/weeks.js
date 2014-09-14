var express = require('express');
var router = express.Router();

/* Responds with json */
router.get('/', function(req, res) {
  res.json(200, { message: "My first route"});
})

module.exports = router;
