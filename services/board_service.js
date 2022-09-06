const { board, comment} = require('../models/index');

async function getBoards(offset,limit){
    try{
        let data = await board.findAndCountAll({
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
        let data = await board.findOne({
            where:{id:id}
        })
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function insertBoard(user_id,user_name,title,text){
    try{
        await board.create({
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
        await board.update({
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
        await board.destroy({where:{id:id}});
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function getComments(id){
    try{
        let data = await comment.findAll({
            where:{board_id: id}
        })
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function insertComment(board_id,user_id,user_name,text){
    try{
        await comment.create({
            board_id:boardid,
            user_id:user_id,
            user_name:user_name,
            text:text
        })
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function deleteComment(id){
    try{
        await comment.destroy({
            where:{id:id}
        })
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function updateComment(text,id){
    try{
        await comment.update({
            text:text
        },{where:{id:id}})
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
    deleteBoard:deleteBoard,
    getComments:getComments,
    insertComment:insertComment,
    updateComment:updateComment,
    deleteComment:deleteComment
}