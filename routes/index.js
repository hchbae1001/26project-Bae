var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index_controller');
let pushController = require('../controllers/push_controller');
/* GET home page. */
router.get('/',indexController.getIndex);
// router.get('/:id',pushController.getPushes);

module.exports = router;
