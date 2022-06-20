let models = require('../models');

async function getUsers(){
    try{
        let data = await models.user.findAll();
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function logInUser(email){
    try{
        let data = await models.user.findOne({where:{email:email}});
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function getUser(id){
    try{
        let data = await models.user.findOne({where:{id:id}});
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function insertUser(email,password,number,name,phone){
    try{
        await models.user.create({
            email:email,
            password:password,
            number:number,
            name:name,
            phone:phone,
        });
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}
async function updateUser(id,email,password,phone){
    try{
        await models.user.update({
            email:email,
            password:password,
            phone:phone,
        },{where:{id:id}});
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function deleteUser(id){
    try{
        await models.user.destroy({where:{id:id}});
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

module.exports ={
    logInUser:logInUser,
    getUser:getUser,
    getUsers:getUsers,
    insertUser:insertUser,
    updateUser:updateUser,
    deleteUser:deleteUser
}