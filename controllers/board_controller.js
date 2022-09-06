let boardService = require('../services/board_service');
//boardList
async function getBoards(req,res){
    let page = req.query.page;
    if(page == undefined){page = 1;}
    let limit = 10;
    let offset = 0 + (page - 1) * limit;
    try{
        let data = await boardService.getBoards(offset,limit);
        return res.render('board/board_list',{pageNum:page,limit:limit,count:data.count,data:data.rows, name:req.session.userName, id:req.session.userId,auth:req.session.userAuth})
    }catch(err){
        return res.status(500).json(err);
    }
}

async function regBoardForm(req,res){
    let userId = req.session.userId;
    try{
        if(userId){
            return res.render('board/board_insert', {name:req.session.userName, id:req.session.userId, auth:req.session.userAuth});
        }else{
            return res.redirect('/');
        }
    }catch(err){
        return res.status(500).json(err);
    }
}

async function getBoard(req,res){
    const {id} = req.params;
    try{ 
        let data = await boardService.getBoard(id);
        let comment = await boardService.getComments(id);
        return res.render('board/board_detail',{data:data,comment:comment,name:req.session.userName, id:req.session.userId, auth:req.session.userAuth})
    }catch(err){
        return res.status(500).json(err);
    }
}
async function insertBoard(req,res){
    const {title,text} = req.body;
    const userId = req.session.userId;
    const userName = req.session.userName;
    console.log(title,text,userId);
    try{
        if(userId){
            await boardService.insertBoard(userId, userName, title, text);
        }else{
            console.log("warning");
        }
        return res.redirect('/');
    }catch(err){
        return res.status(500).json(err);
    }
}
async function updateBoard(req,res){
    const {id} = req.params;
    const {title,text} = req.body
    try{
        await boardService.updateBoard(title, text, id);
        return res.redirect('/');
    }catch(err){
        return res.status(500).json(err);
    }
}
async function deleteBoard(req,res){
    const {id} = req.params;
    const {userId,userAuth} = req.session;
    const {user_id} = req.body;
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
async function insertComment(req,res){
    const {id} = req.params;
    const {userId,userAuth,userName} = req.session;
    const {text} = req.body;
    try{
        if(userId){
            await boardService.insertComment(id,userId,userName,text);
        }else{
            console.log('warning');
        }
        return res.redirect('/board/'+id);
    }catch(err){
        return res.status(500).json(err);
    }
}
async function deleteComment(req,res){
    const {id} = req.params;
    try{
        await boardService.deleteComment(id);
    }catch(err){
        return res.status(500).json(err);
    }
}
async function updateComment(req,res){
    const {id} = req.params;
    const {text} = req.body;
    try{
        await boardService.updateBoard(text,id);
    }catch(err){
        return res.status(500).json(err);
    }
}


module.exports={
    getBoard:getBoard,
    getBoards:getBoards,
    insertBoard:insertBoard,
    updateBoard:updateBoard,
    deleteBoard:deleteBoard,
    regBoardForm:regBoardForm,
    insertComment:insertComment,
    deleteComment:deleteComment,
    updateComment:updateComment
}