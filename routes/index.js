var express = require('express');
var router = express.Router();
const mailer = require('../services/mail_service');
let indexController = require('../controllers/index_controller');
let pushController = require('../controllers/push_controller');
/* GET home page. */
router.get('/',indexController.getIndex);
// router.get('/:id',pushController.getPushes);
router.get('/mail', (req,res) => {
    let emailParam = {
        subject: '새로운 사용자 가입',
        text: ''
    };
    mailer.sendGmail(emailParam);
    res.status(200).send("성공");
})
module.exports = router;
