const {Router} = require("express");
const Project =  require('../../models/project');
const User = require('../../models/User');
const router = Router()
const Task = require('../../models/task');


router.delete("/project/:projectId" ,async (req,res)=>{
    let user = await User.findOne({_id: req.headers.personId});
    if(!user){
        return res.status(401).json({message:'no aut'})
    }
    let project = await Project.findOne({id:req.params.projectId});
    if(!project){
        console.log(req.params.projectId)
        return res.status(404).json({message:'not found'})
    }
    let x = user.projects.splice(user.projects.findIndex(proj=>proj.id == req.params.projectId),1);
    if(!project.deleted){
        
        project.deleted  = true;
        await Project.updateOne({id:req.params.id},project)
    }
    await User.updateOne({_id:req.headers.personId},user);
    await Project.updateOne({id:req.params.projectId}, project)
    res.status(202).json({message:1});
})
module.exports = router;