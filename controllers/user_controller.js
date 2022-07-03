let userService = require('../services/user_service');
const bcrypt = require('bcrypt');
async function loginUser(req,res){
    const {email,password} = req.body
    try{
        let row = await userService.logInUser(email);
        const compare = bcrypt.compareSync(password,row.password);
        if(compare){
            sess = req.session;
            sess.userName = row.name;
            sess.userId = row.id;
            sess.userAuth = row.auth;
            return res.redirect('/');
        }else{
            return res.redirect('/user');
        }
    }catch(err){
        console.log(err);
        return res.redirect('/user');
    }
}

async function getUser(req,res){
    const {id} = req.params;
    try{
        let data = await userService.getUser(id);
        return res.render('user/detail',{data:data, name:req.session.userName, id:req.session.userId, auth:req.session.userAuth});
    }catch(err){
        return res.status(500).json(err);
    }
}

//user.auth == 1 관리자인경우만 가능
async function getUsers(req,res){
    let userAuth = req.session.userAuth;
    console.log(userAuth);
    if(userAuth == 1){ //관리자인 경우
        try{
            let data = await userService.getUsers();
            return res.render('user/list',{data:data, name:req.session.userName, id:req.session.userId,auth:req.session.userAuth})
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
    const {email,password,phone} = req.body;
    try{
        const encryptedPW = bcrypt.hashSync(password, 10);
        await userService.updateUser(id,email,encryptedPW,phone);
        return res.redirect('/user/logout');
    }catch(err){
        return res.status(500).json(err);
    }
}

async function deleteUser(req,res){  
    const {id} = req.params;
    console.log("userDelete");
    try{
        await userService.deleteUser(id);
        return res.redirect('/user/list');
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