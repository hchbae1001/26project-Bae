let models = require('../models');

async function getBoards(){
    try{
        let data = await models.board.findAll();
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function logInBoard(email){
    try{
        let data = await models.user.findOne({where:{email:email}});
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function getBoard(id){
    try{
        let data = await models.user.findOne({where:{id:id}});
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function insertBoard(email,password,number,name,phone){
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
async function updateBoard(id,email,password,phone){
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

async function deleteBoard(id){
    try{
        await models.user.destroy({where:{id:id}});
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}



module.exports ={
    logInBoard:logInBoard,
    getBoard:getBoard,
    getBoards:getBoards,
    insertBoard:insertBoard,
    updateBoard:updateBoard,
    deleteBoard:deleteBoard
}