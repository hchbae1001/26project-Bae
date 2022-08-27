let userService = require('../services/user_service');
const bcrypt = require('bcrypt');
const mailer = require('../services/mail_service');

async function loginUser(req,res){
    const {email,password} = req.body
    try{
        let user = await userService.logInUser(email);
        const compare = bcrypt.compareSync(password,user.password);
        //비밀번호가 같고, user_status가 0 (활성화) 상태인 경우에만 session 활성
        if(compare && user.user_status == 0){
            //로그인에 성공 시, failStack 0으로 초기화
            await userService.loginSuccess(email);
            console.log('access');
            sess = req.session;
            sess.userName = user.name;
            sess.userId = user.id;
            sess.userAuth = user.auth;
            return res.redirect('/');
        }else{
            //로그인 실패 시 || user_status != 0 (활성화가 아닐 시), stack 1증가.
            console.log('access denied');
            if(user.user_status == 1){
                console.log(email+": 계정 이용 제한");
                //계정 잠금시, admin 에게 email 발송
                let msgInfo = {
                    subject:email + ": 계정 이용 제한",
                    text: email+ "유저가 로그인을 수회 실피하여 계정 잠금"
                }
                mailer.sendGmail(msgInfo);
            }else{
                await userService.loginFail(email);
            }
            return res.redirect('/user');
        }
    }catch(err){
        console.log(err);
        return res.redirect('/user');
    }
}

async function getUser(req,res){
    const {id} = req.params;
    let userId = req.session.userId;
    let userAuth = req.session.userAuth;
    console.log(userAuth, userId, id);
    if(userId == id || userAuth == 1){
        try{
            let data = await userService.getUser(id);
            return res.render('user/user_detail',{data:data, name:req.session.userName, id:req.session.userId, auth:req.session.userAuth});
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        console.log("warning");
        return res.redirect('/')
    }

}

//user.auth == 1 관리자인경우만 가능
async function getUsers(req,res){
    let page = req.query.page;
    if(page == undefined){page = 1;}
    let limit = 10;
    let offset = 0 + (page - 1) * limit;
    let userAuth = req.session.userAuth;
    try{
        if(userAuth == 1){
            let data = await userService.getUsers(offset,limit);
            return res.render('user/user_list',{pageNum:page,limit:limit,count:data.count,data:data.rows, name:req.session.userName, id:req.session.userId,auth:req.session.userAuth})
        }else{
            res.redirect('/user');
        }
    }catch(err){
        return res.status(500).json(err);
    }
}

async function insertUser(req,res){
    //신규 사용자 가입 시, 관리자에 메일 보냄
    const {email,password,number,name,phone} = req.body;
    let msgInfo = {
        subject: "새로운 사용자" + name + "가입 신청",
        text: "이름 : " + name + ", 학번 :" + number
    };
    try{
        const encryptedPW = bcrypt.hashSync(password, 10);
        await userService.insertUser(email,encryptedPW,number,name,phone);
        //계정 생성시, admin에게 email 발송
        mailer.sendGmail(msgInfo);
        return res.redirect('/user');
    }catch(err){
        console.log(err)
        return res.status(500).json(err);
    }
}

async function updateUser(req,res){
    const {id} = req.params;
    const {email,password,phone} = req.body;
    let userAuth = req.session.userAuth;
    let userId = req.session.userId;
    console.log(password);
    try{
        if(!password){
            await userService.updateUserExceptPwd(id,email,phone);
        }else{
            const encryptedPW = bcrypt.hashSync(password, 10);
            await userService.updateUser(id,email,encryptedPW,phone);
        }
        if(userAuth == 1){
            return res.redirect('/user/list');
        }else if(userId == id){
            return res.redirect('/user/logout');
        }
    }catch(err){
        return res.status(500).json(err);
    }
}

async function deleteUser(req,res){
    let userAuth = req.session.userAuth;
    let userId = req.session.userId;
    const {id} = req.params;
    console.log("userDelete");
    if(userId == id || userAuth == 1){
        try{
            await userService.deleteUser(id);
            if(userAuth == 1){
                return res.redirect('/user/list');
            }else{
                return res.redirect('/user/logout');
            }
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        console.log("warning");
        res.redirect('/');
    }
}

async function logOutUser(req,res){
    req.session.destroy();
    return res.redirect('/');
}

module.exports ={
    loginUser:loginUser,
    getUser:getUser,
    getUsers:getUsers,
    insertUser:insertUser,
    updateUser:updateUser,
    deleteUser:deleteUser,
    logOutUser:logOutUser
}