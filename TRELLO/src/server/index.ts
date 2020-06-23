





// const express = require("express");

// const app = express();

// const router = express.Router();

// const bodyParser = require('body-parser');

// const jwt = require('jsonwebtoken');




// let verifyToken  = (req,res,next) => {
//     console.log(req.headers)
//     const bearerHeader = req.headers.token;
//     if(typeof bearerHeader !==  'undefined') {
//         const bearer = bearerHeader.split(" ");
//         const bearerToken = bearer[0];
//         req.token = bearerToken;
//         next();
//     }else{
//         res.sendStatus(403)
//         console.log('token not verifaied');
//     }
// }
// let setUserJWT = (bdUser,jwt) =>{
//     bdUser.jwt = jwt
// }
// let currentId = 0;

// const users = [];
// const projects = [];
// const tasks = [];
// let isUserNameUnique = (userName) =>{
    
//     return !users.some(bdUser=>bdUser.user.name === userName)
// }
// let findBdUserByLogin = (login) =>{
//     return users.find(bdUser=>bdUser.login === login)
// }
// let findBdUserByToken = (token) => {
//     return users.find(bdUser => bdUser.jwt === token)
// }
// let findUserById = (id) => {
//      return users.find((user)=>user.user.id == id)
// }
// let checkPassword = (bdUser,password) => {
//     return bdUser.password === password
// }
// app.use((req, res, next)=> {
//     res.header('Access-Control-Allow-Origin',  "*");
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Access-Control-Allow-Headers', 'content-type, JWT');
//     req.header('Access-Control-Allow-Origin',  "*");
//     req.header('Access-Control-Allow-Methods', '*');
//     req.header('Access-Control-Allow-Headers', 'content-type, JWT');
//     next();
// })

// app.use(
//     bodyParser.json()
//     )
    
//     app.use(
//         bodyParser.urlencoded({extended:true})
//         )
        
//         app.get("/user", (req, res) => {
//     if(req.headers.jwt){
//         let bdUser = findBdUserByToken(req.headers.jwt)
//         if(bdUser){
//             res.json(bdUser.user)
//         }else{
//             res.status(403)
//         }
//     }else{
//         res.status(403)
//     }
// }); 
// app.post("/user",(req,res) => {
//     if(req.headers.jwt){
//         let bdUser = findBdUserByToken(req.headers.jwt)
//         if(bdUser){
//             bdUser.user = req.body.user;
//             res.status(200)
//         }
//     }else{
//         res.status(403)
//     }
// })

// app.post("/login",(req,res) => {
//     const user =  findBdUserByLogin(req.body.login)
//     if(user && checkPassword(user,req.body.password)){
//         res.json(user.jwt)
//     }else{
//         res.sendStatus(400)
//     }
// });

// app.post("/registrate", (req,res) => {
//     let bdUser = JSON.parse(req.body.bdUser)
//     let user = bdUser.user
//     if(isUserNameUnique(user.name)) {
//         user.id = ++currentId;
//         jwt.sign({user},'mustaine',(err,token)=>{
//             bdUser.jwt = token;
//             users.push(bdUser)
//             res.json(token)
//         })
//     }else{
//         res.send('UserName is already in use!')
//     }
// });

// app.post("/project", (req,res)=>{
//     if(req.headers.jwt){
//         let user = findBdUserByToken(req.headers.jwt).user
//         if(user){
//             let proj = JSON.parse(req.body.project);
//             proj.id = ++currentId;
//             user.projects.push(proj);
//             projects.push(proj)
//             res.json(user.projects)
//         }else{
//             res.status(404)
//         }
//         res.status(401)
//     }
// })
// app.delete("/project/:id", (req,res)=> {
//     if(req.headers.jwt){
//         let user = findBdUserByToken(req.headers.jwt);
//         if(user){
//             projects.splice(projects.findIndex(pr=>pr.id === + req.params.id),1);
//             res.status(200)
//         }else{
//             res.status(403)
//         }
//     }else{
//         res.status(403)
//     }
// })
// app.post("/taskList", (req,res)=>{
//     if(req.headers.jwt){
//         let user = findBdUserByToken(req.headers.jwt).user
//         if(user){
//             let taskList = req.body.taskList;
//             taskList.tasks[taskList.tasks.length - 1].id = ++currentId
//             let project = user.projects.find((proj)=>proj.id == req.body.projectId);
//             let taskListToReplace = project.taskLists.findIndex((taskL)=>taskL.id == taskList.id);
//             project.taskLists[taskListToReplace] = taskList;
//             res.json(project.taskLists[taskListToReplace])
//         }else{
//             res.status(404)
//         }
//     }else{
//         res.status(401)
//     }
// });
// app.post("/task",  (req,res) =>{
//     if(req.headers.jwt){
//         let user = findBdUserByToken(req.headers.jwt).user;
//         if(user){
//             let task = req.body.task;
//             task.id = ++currentId;
//             let project = projects.find((proj)=>proj.id == task.projectModel.id);
//             project.taskLists[0].tasks.push(task);
//             tasks.push(task);
//             res.json(project.taskLists[0].tasks);
//         }else{
//             res.status(401)
//         }
//     }else{
//         res.status(401);
//     }
// });
// app.post("/inviteToProject",(req,res)=> {
//     if(req.headers.jwt) {
//         let user = findBdUserByToken(req.headers.jwt);
//         if(user) {
//             let invite = req.body.invite;
//             let userToInvite = findUserById(invite.invitedId);
//             if(userToInvite) {
//                 let user = userToInvite.user
//                 let project = projects.find((project)=>project.id == invite.inviteToModel.id);
//                 project.invited.push({
//                     id: invite.invitedId,
//                 });
            
//                 user.invites.push(invite);
//                 res.json(project.invited);
//             }else{
//                 res.status(400).json(new Error())
//             }
//         } else {
//             res.status(400)
//         }
//     }else{
//         res.status(400)
//     }
// });
// app.post("/inviteToTask",(req,res)=>{
    
//     if(req.headers.jwt){
//         let user = findBdUserByToken(req.headers.jwt);
//         if(user){
//             let invite = req.body.invite;
//             let userToInvite = findUserById(invite.invitedId) 
//             console.log('UTI',userToInvite,)
//             console.log('invite:',invite)
//             if(userToInvite){
//                 console.log('invteTo',invite.invited)
//                 let task  = tasks.find(tsk =>tsk.id == invite.inviteToModel.id);
//                 console.log('task',task)
//                 if(task){
//                     userToInvite = userToInvite.user;
//                     console.log(task.invited)
//                     task.invited.push({id:userToInvite.id , name: userToInvite.name})
//                     userToInvite.invites.push(invite);
//                     console.log('task.invited:',task.invited)
//                     res.json(task.invited)
//                 }else{
//                     res.status(404)
//                 }
//             }else{
//                 res.status(404)
//             }
            
//         }else{
//             res.status(403)
//         }
//     }else{
//         res.status(403)
//     }
// })
// app.post('/acceptProjectInvite' ,(req,res) =>{
//     if(req.headers.jwt) {
        
//         let user = findBdUserByToken(req.headers.jwt).user;
        
//         if(user) {
//             let inviteModel = req.body;
//             let acceptedProjectIndex = projects.findIndex(proj=>proj.id == inviteModel.inviteToModel.id);
//             projects[acceptedProjectIndex].perfomers.push({
//                 name: user.name,
//                 id:   user.id
//             });
//             projects[acceptedProjectIndex].invited  = projects[acceptedProjectIndex].invited.filter((inv)=>inv.invitedId == inviteModel.invitedId)
            
//             user.invites = user.invites.filter((inv)=>inv.inviteToId == inviteModel.inviteToModel.id)
//             user.projects.push(projects[acceptedProjectIndex]);
//             res.json({
//                 projects: user.projects,
//                 invites: user.invites
//             })
//         }else{
//             res.status(401);
//         }
//     }else{
//         res.status(401);
//     }
    
// });
// app.post("/takeTask",(req,res) =>{
//     if(req.headers.jwt){
//         let user = findBdUserByToken(req.headers.jwt).user;
//         if(user){
//             let updatedTask = req.body.task;
//             let oldTaskIndex = tasks.findIndex((task)=>task.id === updatedTask.id);
//             let userModel = {
//                 id: user.id,
//                 name:user.name,
//             };
//             updatedTask.perfomers.push(userModel);
//             user.tasks.push(updatedTask);
//             tasks[oldTaskIndex] = updatedTask;
//             res.json({tasks:user.tasks});
            
//         }
//     }
// });
// app.delete("/task/:id", (req,res)=> {
//       if(req.headers.jwt){
//         let user = findBdUserByToken(req.headers.jwt)
        
       
//         if(user){
//             let task =   tasks.find(tsk =>tsk.id == req.params.id)
//             console.log(task)
//             if(task){
//                 let proj = user.user.projects.find(proj=>proj.id === task.projectModel.id);
                
//                 let stat;
//                 for(let i = 0; i< proj.taskLists.length; i++) {
//                     for(let j = 0; j< proj.taskLists[i].tasks.length; j++){
//                         if(proj.taskLists[i].tasks[j].id === task.id){
//                             console.log(proj.taskLists[i].tasks[j]);
//                             proj.taskLists[i].tasks.splice(j,1);
//                             stat = true;
//                             res.status(200)
//                             break                    
//                         }
                        
//                     }
//                 }
//                 if(!stat){
//                     res.status(404)
//                 }
                
//             }else{
//                 res.status(404)
//             }
//         }else{
//             res.status(403)
//         }
//      }else{
//          res.status(403)
//      }
//     res.send();
// })
// app.post('/commentTask', (req,res) =>{
//     if(req.headers.jwt){
//         let user = findBdUserByToken(req.headers.jwt).user;
//         if(user) {
//             let comment = req.body;
//             comment.id = ++currentId;
//             let task = tasks.find(task=>task.id == comment.taskComented.id);
//             task.comments.push(comment);
//             res.status(200);
//             res.json(task.comments);
//         }else{
//             res.status(401)
//         }
//     }else{
//         res.status(401)
//     }
// });
// app.delete('/tsk/:taskId/comment/:commentId', (req,res)=>{
//      if(req.headers.jwt){
//         let user = findBdUserByToken(req.headers.jwt)
//         if(user) {
//         let task = tasks.find(tk=>tk.id === +req.params.taskId);
//         if(task){
//             task.comments.splice(task.comments.findIndex(com=>com.id === +req.params.commentId),1);
//             res.status(200)
//         }else{
//             res.status(404)
//         } 
//         }else{
//             res.status(403)
//         }
//     }else{
//         res.status(403)
//     }
//     console.log(req.params)
//    console.log(req.params)
   
// })
// app.post("/transferTask",(req,res)=>{
//     if(req.headers.jwt){
//         let user = findBdUserByToken(req.headers.jwt).user;
//         if(user) {
//             let project = projects.find(proj=>proj.id === req.body.projectId);
            
//             project.taskLists[req.body.firstTaskListObject.index]   = req.body.firstTaskListObject.taskList ;
//             project.taskLists[req.body.secondTaskListObject.index]  = req.body.secondTaskListObject.taskList; 
//             res.json(project.taskLists);
//         }else{
//             res.status(401)
//         }
//     }else{
//         res.status(401)
//     }
// })
// app.listen(3000);