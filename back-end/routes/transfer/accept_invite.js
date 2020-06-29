const {Router} = require("express");
const Project =  require('../../models/project');
const User = require('../../models/User');
const router = Router()
const Task = require('../../models/task');

router.post('/acceptInvite', async (req,res)=>{
    let invite = req.body.invite;

    let user = await User.findOne({_id:req.headers.personId});
    if(!user){
        return res.status(400).json({message:'no auth'})
    }
    let invitedTo = await Task.findOne({id:invite.inviteToModel.id});
    let pr ; 
    if(!invitedTo){
        invitedTo = await Project.findOne({id:invite.inviteToModel.id});
        if(!invitedTo){
            return res.status(404).json({message:'not found'});
        }
        user.projects.push(invitedTo.id);
        invitedTo.perfomers.push({id:user.id,email:user.email});
        user.invites.splice(user.invites.findIndex(inv=>inv.inviteToModel.id == invite.inviteToModel.id),1)
        await Project.updateOne({id :invite.inviteToModel.id},invitedTo);
        await User.updateOne({_id: req.headers.personId}, user );
        return res.json({message:1})
    }else{
        pr = await Project.findOne({id: invitedTo.projectModel.id});
            pr.perfomers.push({id:user.id,email:user.email});
            pr.invited.splice(pr.invited.findIndex(inv=>inv.inviteToMdodel.id == invite.inviteToModel.id),1)
            await Project.updateOne({id:invitedTo.projectModel.id},pr)
            await User.updateOne({_id:req.headers.personId}, user);
            user.tasks.push(invitedTo.id);
            user.invites.splice(user.invites.findIndex(inv=>inv.inviteToModel.id == invite.inviteToModel.id),1)
            invitedTo.perfomers.push({id:user.id,email:user.email});
            await Task.updateOne({id:invite.inviteToModel.id},invitedTo);
            await User.updateOne({_id:req.headers.personId}, user);
            return res.json({message:1});
    }
})


module.exports = router;  