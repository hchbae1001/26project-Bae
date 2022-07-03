let boardService = require('../services/board_service');

async function getBoards(req,res){
    try{
        
    }catch(err){
        return res.status(500).json(err);
    }
}

async function getBoard(req,res){

}
async function insertBoard(req,res){

}
async function updateBoard(req,res){

}
async function deleteBoard(req,res){

}

module.exports={
    getBoard:getBoard,
    getBoards:getBoards,
    insertBoard:insertBoard,
    updateBoard:updateBoard,
    deleteBoard:deleteBoard
}