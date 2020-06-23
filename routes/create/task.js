const {Router} = require("express");
const Project =  require('../../models/project');
const User = require('../../models/User');
const Task = require('../../models/task')
const router = Router()
let assign = (object) =>{
    let result = {};
    for(let key in object){
        result[key] = object[key]
    }
    return result 
}
router.post("/task", async (req,res)=>{
   
    let user = User.findOne({_id: req.headers.personId})
    if(!user){
        return res.status(400).json({message:'no auth'})
    }
    let task = new Task(assign(req.body.task))
    task.id = req.headers.id;
    await task.save();
    let project = await Project.findOne({id:task.projectModel.id})
    project.taskLists[0].tasks.push(task.id);
    await Project.updateOne({id:task.projectModel.id},project,{upsert: true});
    console.log(project.taskLists[0]);
    
    return res.json(task);
   
    
})
module.exports = router; 