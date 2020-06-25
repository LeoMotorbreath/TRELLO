const {Router} = require("express");
const Project =  require('../../models/project');
const User = require('../../models/User');
const router = Router()
const TaskList = require('../../models/taskList');
const Comment = require('../../models/comment')
const Task = require('../../models/task');
router.post('/comment', async (req,res)=>{
    
    let id = req.headers.id;

    let comment = req.body.comment;
    let user = await User.findOne({_id: req.headers.personId});
    if(!user){
        return res.status(400).json({message:'no auth'})
    }
    comment.id = id;
    comment = new Comment(comment);
    let commented = await Task.findOne({id: comment.commentedId})
    if(!commented){
        return res.status(404).json({message:'task not found'})
    }
    commented.comments.push(comment)
    await Task.updateOne({id:comment.commentedId}, commented,{upsert: true});
    
    res.status(201).json(commented.comments)
}) 
module.exports = router; 