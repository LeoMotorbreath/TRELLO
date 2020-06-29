const User = require('../models/User');
const Project = require('../models/project')
const {Router} = require("express");
const Task = require("./../models/task") 
const router = Router();

router.get("/user",async (req,res)=>{
    try{
        let user = await  User.findOne({_id: req.headers.personId})
        let projects = [];
        for(let i = 0 ; i< user.projects.length;i++){
            let pr = await Project.findOne({id:user.projects[i]});
            if(pr.deleted){
                pr.name = pr.name+'(deleted)';
            }
            projects.push(pr)
            }
            
            for(let i = 0; i<projects.length ;i++){
                for(let j = 0; j<  projects[i].taskLists.length;j++){
                    for(let q = 0; q<projects[i].taskLists[j].tasks.length; q++) {
                        let task = await Task.findOne({id: projects[i].taskLists[j].tasks[q]});
                        
                        if(task && task.deleted){
                            task = {id:task.id,name:task.name,deleted:true};
                        }
                        projects[i].taskLists[j].tasks[q] = task;
                    }
                }
            }
            let userToSend = Object.assign({},user)._doc;
            userToSend.projects = projects;
        return res.json(userToSend)
    }catch(e){
        console.log(e)
        return res.status(400).json({message: 'some mistake'})
    }
    
}) 

module.exports = router;