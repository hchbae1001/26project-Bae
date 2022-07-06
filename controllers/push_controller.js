let pushService = require('../services/push_service');

async function getPushes(req,res){
    let id = req.session.userId;
    try{
        let data = await pushService.getPushes(id);
        console.log(data);
        // return res.render('/push/list',{data:data, name:req.session.userName, id:req.session.userId,auth:req.session.userAuth});
    }catch(err){
        return res.status(500).json(err);
    }
}

async function getPush(req,res){
    let id = req.params;
    try{
        let data = await pushService.getPush(id);
        console.log(data);
        // return res.render('/push/detail',{data:data, name:req.session.userName, id:req.session.userId,auth:req.session.userAuth});
    }catch(err){
        return res.status(500).json(err);
    }
}

async function insertPush(req,res){
    const {text,subject,user_id} = req.body;
    try{
        await pushService.insertPushes(user_id,subject,text);
        return res.redirect('/user');
    }catch(err){
        return res.status(500).json(err);
    }
}

async function deletePush(req,res){
    let id = req.params;
    try{
        await pushService.deletePush(id);
        return res.redirect('/');
    }catch(err){
        return res.status(500).json(err);
    }
}

async function checkPush(req,res){
    try{

    }catch(err){
        return res.status(500).json(err);
    }
}

module.exports = {
    getPushes:getPushes,
    getPush:getPush,
    insertPush:insertPush,
    deletePush:deletePush,
    checkPush:checkPush
}