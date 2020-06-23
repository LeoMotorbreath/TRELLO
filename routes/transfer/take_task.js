const {Router} = require("express");
const Project =  require('../../models/project');
const User = require('../../models/User');
const router = Router()
const Task = require('../../models/task');

router.patch( '/takeTask/:taskId',async (req,res)=>{
    console.log(req.params.taskId);
    console.log(req.headers.personId);
    let user = await User.findOne({_id: req.headers.personId});
    if(!user){
        return res.status(400).json({message:'no auth'})
    }
    let task = await Task.findOne({id: req.params.taskId});
    if(!task){
        return res.status(404).json({message:"not found"});
    }
    user.tasks.push(req.params.taskId)
    task.perfomers.push({email:user.email,id:user.id});
    await User.updateOne({_id: req.headers.personId}, user);
    await Task.updateOne({id: req.params.taskId},task);
    return res.status(200).json({message:true})
})

module.exports = router;