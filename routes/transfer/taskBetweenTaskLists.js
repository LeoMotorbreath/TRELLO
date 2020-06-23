const {Router} = require("express");
const Project =  require('../../models/project');
const User = require('../../models/User');
const router = Router()
const Task = require('../../models/task');

let deleteWithInsert = (array,index,data) =>{
    array.splice(index,1,data);
}
let findTaskListByObjectId = (project, _id) =>{
    return project.taskLists.find(taskList=>taskList._id = _id)
}
router.post('/task' , async (req,res)=>{
    let data = req.body
    let user = await User.findOne({_id: req.headers.personId});
    if(!user){
        return res.status(410).json({message: 'no auth'});
    }
    let project = await Project.findOne({id: data.projectId});
    if(!project){
        return res.status(404).json({message:'not found'})
    }
    let prevTaskList = findTaskListByObjectId (project,data.previousContainer);
    let currentTaskList = findTaskListByObjectId(project,data.currentContainer);
    let deleted = prevTaskList.tasks.splice(data.previousIndex,1);
    currentTaskList.tasks.splice(data.currentIndex,0,deleted[0])
    await Project.updateOne({id: data.projectId}, project)
    res.status(201).json({message:1});
})

module.exports = router