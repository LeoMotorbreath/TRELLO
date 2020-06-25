const {Router} = require("express");
const Project =  require('../../models/project');
const User = require('../../models/User');
const router = Router()
const Task = require('../../models/task');

router.delete('/task/:taskId/comment/:commentId',async (req,res)=>{
    let user = await User.findOne({_id:req.headers.personId});
    if(!user){
        res.status(400).json({message:"no auth"})
    }
    let task = await Task.findOne({id: req.params.taskId});
    if(!task){
        res.status(404).json({message: 'no task'})
    }
    console.log(task.comments.splice(task.comments.findIndex(comment=> comment.id == req.params.commentId),1))
    await Task.updateOne({id: task.id}, task);
    res.status(200).json({message:true})
})
module.exports = router