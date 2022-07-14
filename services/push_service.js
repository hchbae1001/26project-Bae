let models = require('../models');

async function getPushes(id){
    try{
        let data = await models.push.findAll(
            {where:{user_id:id}
        });
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function getPush(id){
    try{
        let data = await models.push.findAll({where:{id:id}});
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function insertPushes(user_id,subject,text){
    try{
        await models.user.create({
            user_id:user_id,
            subject:subject,
            text:text,
        });
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function deletePush(){
    try{
        let data = await models.push.destroy({where:{id:id}});
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

module.exports ={
    getPushes:getPushes,
    getPush:getPush,
    insertPushes:insertPushes,
    deletePush:deletePush
}