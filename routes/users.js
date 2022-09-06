var express = require('express');
var router = express.Router();
let userController = require('../controllers/user_controller');

router.post('/', userController.loginUser);
// 로그아웃
router.get('/logout', userController.logOutUser);
//회원가입 폼 페이지 + 가입
router.post('/insert',userController.insertUser);
// 관리자용 회원 리스트 확인
router.get('/list', userController.getUsers);
// 정보, 업데이트, 삭제
// router.get('/status/:id',userController.userStatus);
// router.get('/status',userController.userStatus);
router.get('/:id',userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);



module.exports = router;