var express = require('express');
var router = express.Router();
let boardController = require('../controllers/board_controller');
var fs = require('fs');
var multer = require('multer')
var upload = multer({ dest:'uploadedFiles/'});
// var uploadWithOriginalFilename = multer({ storage: storage });
var storage = multer.diskStorage({
  destination(req,file,cb){
    cb(null, 'uploadedFiles/');
  },
  filename(req,file,cb){
    cb(null, '${Date.now()}__${file.originalname}');
  }
});


router.get('/', boardController.getBoards);
router.get('/insert',boardController.regBoardForm);
router.post('/',upload.single('attachment'),boardController.insertBoard);
router.get('/:id',boardController.getBoard);
router.patch('/:id',boardController.updateBoard);
router.delete('/:id',boardController.deleteBoard);

module.exports = router;