import { ITask, Task } from './task';
import { IProject, Project } from './project';
import { ITaskList, TaskList } from './task-list';
import { Model } from './model';
import { Comment_ } from './comment';
import { Invite } from './invite';

export interface IUser{
    email : string;
    _id: number;
    id:number;
    projects:  Project[];
    invites: Invite[];
    getUserTasks();
    createTask(name:string, project: IProject,  defenition?: string, ): ITask;
    createProject(name:string,defenition?:string):IProject;
    createInvite(invitedData:number|string, invitedTo: Project|Task,text?:string): Invite
    createTaskComment(text:string,project:IProject,taskId:number);
    deleteComment(task: Task,comment: Comment_);
    deleteProject(User:User,project: Project);
    deleteTask(taskList: TaskList,task:Task);
    transferTaskToAntoherTaskList(project:Project,task:Task,oldTaskListIndex:number,newTaskListIndex:number);
}
export class User implements IUser{
    constructor(email?,id?,taskLists?,projects?,invites?) {
            this.email       = email;
            
            this.projects    = projects? projects: [];
            this.invites     = invites?  invites: [];
            this.tasks       = [];
    }
    email : string;
    _id: number;
    id:number;
    tasks: Task[] ;
    projects:  Project[]   = [];
    invites: Invite[] = [];
    getUserTasks() {
        let arr = [];
        this.projects.forEach(project=>arr = arr.concat(project.getAllProjectTasks()))
        return arr
    }
   
    createInvite(invitedData:number|string, invitedTo: Project|Task,text?:string): Invite{
        let inviterModel = new Model(this.id,this.email);
        let inviteToModel = new Model(invitedTo.id,invitedTo.name);
        return new Invite(invitedData,inviteToModel,inviterModel,text);
    }
    createProject(name:string,defenition?:string): Project{
        let model = {
            creator: this,
            name: name,
            defenition: defenition? defenition:'def not prov'
        }
        return (new Project(model));
    }
    createTask(name:string, project: IProject,  defenition?: string, ) :ITask{
        let AuthorModel = {
            id:   this.id,
            name: this.email 
        }
        return project.createTask(AuthorModel,name,defenition);
    }
    private removeTaskFromTaskList(taskList:TaskList,taskId:number){
        taskList.tasks.splice(taskList.tasks.findIndex(task=>task.id === taskId),1);
        return taskList;
    }
    private pushTaskToTaskList(taskList:TaskList,task){
        taskList.tasks.push(task);
        return taskList;
    }
    transferTaskToAntoherTaskList(project:Project,task:Task,oldTaskListIndex:number,newTaskListIndex:number) {
        return {
            oldTaskList: {
                taskList: this.removeTaskFromTaskList(project.taskLists[oldTaskListIndex],task.id),
                index:oldTaskListIndex
            },
            newTaskList: {
                taskList:  this.pushTaskToTaskList(project.taskLists[newTaskListIndex], task),
                index:newTaskListIndex
            }
        }
    }
    createTaskComment(text:string,project:IProject,taskId:number):Comment_ {
        let task = project.getAllProjectTasks().find(task=>task.id === taskId);
        let authorModel = {
            email: this.email ,
            id:   this.id
        }
        return project.createComment(task,authorModel,text);
    }
    takeTask(task: Task): Task[] {
        this.tasks.push(task);
        return this.tasks;
    }
    deleteComment(task: Task,comment:Comment_) {
        
        return task.comments.splice(task.comments.findIndex(com=>com.id===comment.id),1)[0];
    }
    deleteProject(user:User,project: Project){
        return user.projects.splice(user.projects.findIndex(pr=>pr===project),1)[0];
    }
    deleteTask(taskList: TaskList,task:Task){
        return taskList.tasks.splice(taskList.tasks.findIndex(tk=>tk === task),1)[0];
    }
    findUserTaskById(){
        if(typeof this.tasks[0] !=='number'){return}
        let allTasks = this.getUserTasks();
        
        this.tasks = this.tasks.map(id=> id = allTasks.find(task=>task.id == id))        
        

      }
}