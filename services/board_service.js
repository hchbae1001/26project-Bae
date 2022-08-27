let models = require('../models');

async function getBoards(offset,limit){
    try{
        let data = await models.board.findAndCountAll({
            //학번순으로 오름차순 정렬
            offset: offset,
            limit: limit
        });
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function getBoard(id){
    try{
        let data = await models.board.findOne({where:{id:id}});
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function insertBoard(user_id,user_name,title,text){
    try{
        await models.board.create({
            user_id:user_id,
            user_name:user_name,
            title:title,
            text:text
        });
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}
async function updateBoard(title,text,id){
    try{
        await models.board.update({
            title:title,
            text:text
        },{where:{id:id}});
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function deleteBoard(id){
    try{
        await models.board.destroy({where:{id:id}});
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