var express = require('express');
var router = express.Router();
let pushController = require('../controllers/push_controller');
/* GET home page. */
router.get('/:id',pushController.getPushes);

module.exports = router;
