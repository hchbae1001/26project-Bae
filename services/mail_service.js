const nodemailter = require('nodemailer')
const senderInfo = require('../config/senderInfo.json');
const adminEmail = require('../config/config.json');
const mailSender = {
    sendGmail : function (param){
        var transporter = nodemailter.createTransport({
            service: 'gmail',
            prot: 587,
            host: 'smtp.gmlail.com',
            secure: false,
            requireTLS: true,
            auth:{
                user: senderInfo.user,
                pass: senderInfo.pass
            }
        });
        var mailOptions = {
            from: senderInfo.user,
            to: adminEmail.admin,
            subject: param.subject,
            text: param.text
        };
        transporter.sendMail(mailOptions,function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Email sent: ' + info.response);
            }
        });
    }
}
module.exports = mailSender;