let userService = require('../services/user_service');
const bcrypt = require('bcrypt');

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
    let userAuth = req.session.userAuth;
    console.log(userAuth);
    try{
        let data = await userService.getUser(id);
        console.log(data.id)
        if(id == data.id || userAuth == 1){
            return res.render('user/detail',{data:data, name:req.session.userName, id:req.session.userId, auth:req.session.userAuth});
        }else{
            console.log("warning");
        }
    }catch(err){
        return res.status(500).json(err);
    }
}
// async function paginationUser(req,res){
//     let pageNum = req.query.page;
//     let limit = 10;
//     let offset = 0 + (pageNum - 1) * limit;
//     try{
//         await userService.paginationUser(offset,limit);
//         return res.render('user/list',{
//             data:data, name:req.session.userName,
//             id:req.session.userId, auth:req.session.userAuth
//         });
//     }catch(err){
//         return res.status(500).json(err);
//     }
// }


//user.auth == 1 관리자인경우만 가능
async function getUsers(req,res){
    let page = req.query.page;
    if(page == undefined){
        page = 1;
    }
    let limit = 2;
    let offset = 0 + (page - 1) * limit;
    let userAuth = req.session.userAuth;
    if(userAuth == 1){ //관리자인 경우
        try{
            let data = await userService.getUsers(offset,limit);
            return res.render('user/list',{data:data.rows, name:req.session.userName, id:req.session.userId,auth:req.session.userAuth})
        }catch(err){
            return res.status(500).json(err);
        }        
    }else{
        try{
            res.redirect('/user');
        }catch(err){
            return res.status(500).json(err);
        }
    }
}

async function insertUser(req,res){
    const {email,password,number,name,phone1,phone2,phone3} = req.body
    let phone = phone1 + phone2 + phone3;
    try{
        const encryptedPW = bcrypt.hashSync(password, 10);
        await userService.insertUser(email,encryptedPW,number,name,phone);
        return res.redirect('/user');
    }catch(err){
        return res.status(500).json(err);
    }
}

async function updateUser(req,res){
    const {id} = req.params;
    const {password,phone} = req.body;
    try{
        const encryptedPW = bcrypt.hashSync(password, 10);
        await userService.updateUser(id,encryptedPW,phone);
        return res.redirect('/user/logout');
    }catch(err){
        return res.status(500).json(err);
    }
}

async function deleteUser(req,res){
    let userAuth = req.session.userAuth;
    const {id} = req.params;
    console.log("userDelete");
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