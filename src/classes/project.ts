import { IUser } from './User';
import { ITaskList, TaskList } from './task-list';
import { ITask, Task } from './task';
import { IInvite } from './invite';
import { IComment } from './comment';
import { Model } from './model';


export interface IProject {
    // creatorModel: Model;
    // name: string;
    // defenition: string;
    // perfomers: IUser[];
    // taskLists: ITaskList[];
    // id:number;
    // invited: any[];
    getAllProjectTasks(): ITask[];
    createTaskList(name:string):void
    createDefaultTaskLists():void;
    createTask(authorModel:Model,name:string,taskList:ITaskList,defenition:string):ITask;
    createComment(task:ITask,authorModel:any,text:string);
    getTaskLists():TaskList[];
}
export class Project implements IProject{
    creatorModel: Model;
    name: string;
    defenition: string;
    perfomers: IUser[];
    moderators: IUser[];
    taskLists: ITaskList[] = [];
    id:number;
    invited:  any[] = [];

    constructor(model?) {
        if(model) {
            this.creatorModel    = model.creatorModel; 
            this.name       = model.name;
            this.id         = model.id
            this.defenition = model.defenition? model.defenition: 'defenition was not provided';
            this.taskLists  = model.taskLists? model.taskLists: this.createDefaultTaskLists();
            this.perfomers  = model.perfomers? model.perfomers: [];
            this.invited    = model.invited? model.invited: [];
             
        }else{
           
        }
    }
    getAllProjectTasks() {
        let arr = [];
        this.taskLists.forEach((taskList)=>taskList.tasks.forEach((task)=>arr.push(task)))
        return arr;
    }
    createTaskList(name:string){
       
        return new TaskList(
            {
                name: name,
            });
    }
    createTask(authorModel:Model,name:string,taskList:ITaskList,defenition:string): ITask {
        let projectModel = new Model(this.id, this.name);
        return taskList.createTask(authorModel,projectModel,name,defenition);
    }
    createDefaultTaskLists(): ITaskList[] {
        return [ this.createTaskList('new'),this.createTaskList('active'), this.createTaskList('done')]
    }
    createComment(task:ITask,authorModel:any,text:string): IComment{
        return task.createComment(authorModel,text)
    }
    getTaskLists(){
        return this.taskLists.length? this.taskLists : this.createDefaultTaskLists();
    }
    setTaskLists(taskLists:TaskList[]) {
        this.taskLists = taskLists;
    }
    setTaskList(index:number, name:string,tasks:Task[]){
        this.taskLists[index] = new TaskList({name,tasks});
    }
    getTaskList(index){
        return this.taskLists[index]
    }
}