const {Router} = require("express");
const Project =  require('../../models/project');
const User = require('../../models/User');
const router = Router()
const Task = require('../../models/task');

router.delete('/invite/:toId',async (req,res)=>{
    let user = await User.findOne({_id:req.headers.personId})
    if(!user){
        return res.status(400).json({message:'no auth'})
    }
    user.invites.splice(user.invites.findIndex(inv=>inv.id == req.params.toId))
    await User.updateOne({_id: req.headers.personId},user);
    let enity = await Project.findOne({id: req.params.toId});
    let bool = false;
    if(!enity){
        enity = await Task.findOne({id:req.params.toId});
        if(!enity){
            return res.status(404).json({message: 'not found '})
        }
        bool = true
    }
    
    enity.invited.splice(enity.invited.findIndex(inv=>inv.id == user.id));
    bool? await Task.updateOne({id: req.params.toId} , enity): await Project.updateOne({id:req.params.toId}, enity)
    return res.status(201).json({invites:user.invites});
})

module.exports = router;  