const {Router} = require("express");
const Project =  require('../../models/project');
const User = require('../../models/User');
const router = Router()
const TaskList = require('../../models/taskList');
const generateDefaultTaskLists = () =>{
    return saveTaskLists( [
        new TaskList({name: 'new'}),
        new TaskList({name: 'active'}),
        new TaskList({name: 'done'})
    ])
}
const saveTaskLists = (taskLists) =>{
    taskLists.forEach( async (taskList) => await taskList.save())
    return taskLists
}
router.post('/project', async (req,res)=>{
    const {name,defenition,creator} = req.body.project;
    const user = await User.findOne({_id: req.headers.personId})
    if(!user){
        return res.status(400).json({message:'no auth'})
    }
    let proj = new Project({name,id:req.headers.id,taskLists: generateDefaultTaskLists() ,defenition,creator})
    prjs = user.projects
    prjs.push(proj.id);
    await proj.save();
    await user.save();
    let projects = []
    for(let i = 0; i<prjs.length;i++){
        projects.push(await Project.findOne({id: prjs[i]}))
    }
    
    res.json({projects : projects});

}) 
module.exports = router;