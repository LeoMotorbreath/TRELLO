import { ITask, Task } from './task';
import { IProject, Project } from './project';
import { ITaskList, TaskList } from './task-list';
import { IInvite, ProjectInvite, TaskInvite } from './invite';
import { IComment, TaskComment } from './comment';
import { Model } from './model';

export interface IUser{
    name: string;
    id: number;
    projects:  Project[];
    invites: IInvite[];
    getUserTasks();
    createTask(name:string, project: IProject, taskList:ITaskList, defenition?: string, ): ITask;
    createProject(name:string,defenition?:string):IProject;
    createProjectInvit(invitedId:number,inviteToId:number,asModerator:boolean,text?:string):ProjectInvite;
    createTaskInvite(invitedId: number, inviteToId, text?:string): TaskInvite;
    createComment(text:string,project:IProject,taskId:number);
    deleteComment(task: Task,comment: TaskComment);
    deleteProject(User:User,project: Project);
    deleteTask(taskList: TaskList,task:Task);
    transferTaskToAntoherTaskList(project:Project,task:Task,oldTaskListIndex:number,newTaskListIndex:number);
}
export class User implements IUser{
    constructor(name?,id?,taskLists?,projects?,invites?) {
            this.name        = name;
            this.id          = id;
            this.projects    = projects? projects: [];
            this.invites     = invites?  invites: [];
            this.tasks       = [];
    }
    name: string;
    id: number;
    tasks: Task[];
    projects:  Project[]   = [];
    invites: IInvite[] = [];
    getUserTasks() {
        let arr = [];
        this.projects.forEach(project=>arr = arr.concat(project.getAllProjectTasks()))
        return arr
    }
    createProjectInvit(invitedId:number,inviteToId:number,asModerator:boolean,text:string){
        return new ProjectInvite(invitedId,inviteToId,new Model(this.id,this.name),asModerator,text);
    }
    createTaskInvite(invitedId:number,inviteToId,text?:string):TaskInvite {
        return new TaskInvite(invitedId,inviteToId,new Model(this.id ,this.name),text)
    }
    createProject(name:string,defenition?:string): IProject{
        let model = {
            creator: this,
            name: name,
            defenition: defenition? defenition:'def not prov'
        }
        return (new Project(model));
    }
    createTask(name:string, project: IProject, taskList:ITaskList, defenition?: string, ) :ITask{
        let AuthorModel = {
            id:   this.id,
            name: this.name
        }
        return project.createTask(AuthorModel,name,taskList,defenition);
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
    createComment(text:string,project:IProject,taskId:number):IComment {
        let task = project.getAllProjectTasks().find(task=>task.id === taskId);
        let authorModel = {
            name: this.name,
            id:   this.id
        }
        return project.createComment(task,authorModel,text);
    }
    takeTask(task: Task): Task[] {
        this.tasks.push(task);
        return this.tasks;
    }
    deleteComment(task: Task,comment: TaskComment) {
        
        return task.comments.splice(task.comments.findIndex(com=>com.id===comment.id),1)[0];
    }
    deleteProject(user:User,project: Project){
        return user.projects.splice(user.projects.findIndex(pr=>pr===project),1)[0];
    }
    deleteTask(taskList: TaskList,task:Task){
        return taskList.tasks.splice(taskList.tasks.findIndex(tk=>tk === task),1)[0];
    }
}