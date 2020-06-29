const {Router} = require("express");
const Project =  require('../../models/project');
const User = require('../../models/User');
const router = Router()
const Task = require('../../models/task');
const TaskList = require('../../models/taskList');
let findTaskListByObjectId = (project, id) =>{
   return  project.taskLists.find(taskList => taskList._id == id)
}
router.patch('/task' , async (req,res)=> {
    // let data = req.body
    // let user = await User.findOne({_id: req.headers.personId});
    // if(!user){
    //     return res.status(410).json({message: 'no auth'});
    // }
    // let project = await Project.findOne({id: data.projectId});
    // if(!project){
    //     return res.status(404).json({message:'not found'})
    // }
    // let prevTaskList = findTaskListByObjectId (project,data.prevContainer);
    // let currentTaskList = findTaskListByObjectId(project,data.container);
    // let deleted = prevTaskList.tasks.splice(data.previousIndex,1);
    // currentTaskList.tasks.splice(data.currentIndex,0,deleted[0]);
    // await TaskList.updateOne({_id: prevTaskList._id },prevTaskList)
    // await TaskList.updateOne({_id: currentTaskList._id},currentTaskList)
    // await Project.updateOne({id: data.projectId}, project);
    let data = req.body
    console.log(data,'data');
    let user = await User.findOne({_id: req.headers.personId});
    if(!user){
        return res.status(410)
    }
    let project = await Project.findOne({id: data.projectId});
    let prevContainer = findTaskListByObjectId(project,data.prevContainer);
    let container = findTaskListByObjectId(project,data.container);
    let deleted = prevContainer.tasks.splice(data.prevIndex,1)[0];
    container.tasks.splice(data.currentIndex,0,deleted);
    await Project.updateOne({_id: project._id},project)
    res.status(201).json({message:1});
})

module.exports = router