const {Router} = require("express");
const Project =  require('../../models/project');
const User = require('../../models/User');
const router = Router()
const Task = require('../../models/task');

router.delete('/project/:projectId/task/:taskId', async (req,res) => {
    let user = await User.findOne({_id: req.headers.personId});
    if(!user){
        return res.status(400).json({message:'no auth'});
    }
    let proj = await Project.findOne({id: req.params.projectId})
    if(!proj){
        return res.status(404).json({message:'not found'})
    }
    
        for(let i = 0; i< proj.taskLists.length; i++) {
            for(let j = 0; j< proj.taskLists[i].tasks.length; j++) {
                if(proj.taskLists[i].tasks[j] == req.params.taskId) {
                    proj.taskLists[i].tasks.splice( j,1)[0];
                    break;
                }
            }
        }
    user.tasks = user.tasks.filter(task=>task.id != req.params.taskId);
    user.invites = user.invites.filter(inv =>inv.inviteToModel.id == req.params.taskId)
    console.log(user.invites,'!0!');
 
    let task = await Task.findOne({id: req.params.taskId})
    if(!task){
        return res.status(404).json({message:'not found'})
    }
    task = { id:task.id, name: task.name+'(deleted)',deleted: true}
    await Project.findOneAndUpdate({id:req.params.projectId},proj);
    await Task.findOneAndUpdate({id:req.params.taskId},task);
    res.status(200).json({message:1})
})

module.exports = router;