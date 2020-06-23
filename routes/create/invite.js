const {Router} = require("express");
const Project =  require('../../models/project');
const User = require('../../models/User');
const router = Router()

const Task = require('../../models/task');
router.post('/invite', async (req,res)=>{
    
    let invite = req.body.invite;
    let inviter = await User.findOne({_id:req.headers.personId});
    if(!inviter){
        return res.status(400).json({message: 'no auth'})
    }
    let invited = typeof invite.invitedData === 'string'? await User.findOne({email:invite.invitedData}) : await User.findOne({id: +invite.invitedData})  ;
    if(!invited){
        return res.status(404).json({message: 'user not found'})
    }  
    invited.invites.push(invite)
    let pr = await Project.findOne({id:invite.inviteToModel.id});
    if(pr){
        pr.invited.push({id: invited.id, email: invited.email});
        await Project.updateOne({id:invite.inviteToModel.id},pr,{upsert:true});
        res.json({invites: pr.invited, emit: 0})
    }else{
        let task = await Task.findOne({id: invite.inviteToModel.id})
        if(!task){
            return res.status(404).json({message: 'not found'})
        }
        task.invited.push({id: invited.id, email: invited.email})
        await Task.updateOne({id:invite.inviteToModel.id},task);
        res.json({invites: task.invited, emit:1});
    }
                
        await User.updateOne({id:invited.id}, invited)
                
}) 
module.exports = router; 