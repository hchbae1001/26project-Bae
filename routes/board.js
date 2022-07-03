var express = require('express');
var router = express.Router();
let boardController = require('../controllers/board_controller');

/* GET home page. */
router.get('/',boardController);

module.exports = router;
