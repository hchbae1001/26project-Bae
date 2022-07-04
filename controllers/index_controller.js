async function getIndex(req,res){
    try{
        return res.render('index',{title:'express',name:req.session.userName, id:req.session.userId, auth:req.session.userAuth});
    }catch(err){
        return res.status(500).json(err);
    }
}

module.exports ={
    getIndex:getIndex
}