let boardService = require('../services/board_service');
//boardList
async function getBoards(req,res){
    try{
        let data = await boardService.getBoards()
        return res.render('/board/list',{data:data, name:req.session.userName, id:req.session.userId, auth:req.session.userAuth})
    }catch(err){
        return res.status(500).json(err);
    }
}

async function getBoard(req,res){
    const id = req.params
    try{
        let data = await boardService.getBoard(id)
        return res.render('/board/detail',{data:data, name:req.session.userName, id:req.session.userId, auth:req.session.userAuth})
    }catch(err){
        return res.status(500).json(err);
    }
}
async function insertBoard(req,res){
    const {name,text} = req.body
    const userId = req.session.userId
    try{
        if(userId){
            await boardService.insertBoard(userId, name, text);
        }else{
            console.log("warning");
        }
        return res.redirect('/board');
    }catch(err){
        return res.status(500).json(err);
    }
}
async function updateBoard(req,res){
    const {name,text} = req.body
    try{
        await boardService.updateBoard(name, text)
        return res.redirect('/board')
    }catch(err){
        return res.status(500).json(err);
    }
}
async function deleteBoard(req,res){
    const id = req.params;
    const {userId,userAuth} = req.session ;
    const user_id = req.body;
    try{
        if(userAuth == 1 || user_id == userId){
            await boardService.deleteBoard(id);
        }else{
            console.log('warning');
        }
        return res.redirect('/board');
    }catch(err){
        return res.status(500).json(err);
    }
}

module.exports={
    getBoard:getBoard,
    getBoards:getBoards,
    insertBoard:insertBoard,
    updateBoard:updateBoard,
    deleteBoard:deleteBoard
}