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
            auth:0,
            user_status:0,
            failStack:0
        });
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}
//정보 수정은 개명, 학번이 바뀔일이 거의 없다는 가정 하에 password, phone 으로 제한한다.
async function updateUser(id,password,phone){
    try{
        await models.user.update({
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

async function loginFail(email){
    try{
        let data = await models.user.findOne({where:{email:email}});
        //email이 일치하는 label을 찾아 failstack 1 증가.
        console.log(data.user_status + "<- status ,stack ->"+ data.failStack)
        if(data.failStack < 5 && data.failStack >= 0){
            await models.user.increment({failStack:1}, {where:{email:email}});
        }else if(data.failStack >= 5){
            await models.user.update({user_status:1},{where:{email:email}});
        }
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function loginSuccess(email){
    try{
        await models.user.update({failStack:0},{where:{email:email}});
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

module.exports ={
    loginSuccess:loginSuccess,
    loginFail:loginFail,
    logInUser:logInUser,
    getUser:getUser,
    getUsers:getUsers,
    insertUser:insertUser,
    updateUser:updateUser,
    deleteUser:deleteUser
}