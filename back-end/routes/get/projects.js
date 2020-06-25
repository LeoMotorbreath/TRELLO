const User = require('../../models/User');
const Project = require('../../models/project')
const {Router} = require("express");

const router = Router();

router.get('/projects', async (req,res)=>{
    let user = await User.findOne({_id: req.headers.personId})
    if(!user){
        return res.status(400).json({message:'no auth'})

    }
    let pr = [];
    for(let i = 0; i < user.projects.length; i++ ){
        let projToPush = await Project.findOne({_id: user.projects[i]})
        if(projToPush.deleted){
            projToPush = {id: projToPush.id, name: projToPush.name +'(deleted)',deleted: true};
        }

        pr.push(projTpPush);
    }
    res.status(200).json(pr)
}) 
module.exports = router