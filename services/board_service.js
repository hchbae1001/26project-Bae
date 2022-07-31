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

async function getBoard(id){
    try{
        let data = await models.user.findOne({where:{id:id}});
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function insertBoard(user_id,name,text){
    try{
        await models.user.create({
            user_id:user_id,
            name:name,
            text:text
        });
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}
async function updateBoard(name,text){
    try{
        await models.user.update({
            name:name,
            text:text
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
    getBoard:getBoard,
    getBoards:getBoards,
    insertBoard:insertBoard,
    updateBoard:updateBoard,
    deleteBoard:deleteBoard
}