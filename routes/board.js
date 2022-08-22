var express = require('express');
var router = express.Router();
let boardController = require('../controllers/board_controller');

router.get('/', boardController.getBoards);
router.get('/insert',boardController.regBoardForm);
router.post('/',boardController.insertBoard);
router.patch('/:id',boardController.updateBoard);
router.delete('/:id',boardController.deleteBoard);

router.get('/:id',boardController.getBoard);

module.exports = router;
