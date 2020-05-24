import { IUser } from './User';
import { IProject } from './project';
import { ITaskList } from './task-list';
import { IComment, TaskComment } from './comment';
import { Model } from './model';
export interface ITask {
    authorModel: Model;
    name: string;
    defenition:string;
    perfomers: IUser[];
    comments: TaskComment[];
    taskListName: string;
    id:number;

    projectModel:any;
    createComment(authorModel: any,text:string) 
}
export class Task implements ITask {
    constructor(model?) {
        if(model) {
            this.authorModel  = model.authorModel;
            this.name         = model.name;
            this.taskListName = model.taskList;
            this.defenition   = model.defenition?  model.defenition : 'defenition was not provided';
            this.perfomers    = [];
            this.comments     = model.comments?    model.comments: [];
            this.projectModel = model.projectModel;
            this.invited      = [];
        }
    }
    authorModel: Model;
    projectModel: any;
    id: number;   
    name: string;
    defenition: string;
    taskListName: string;
    perfomers: IUser[] = [];
    comments: TaskComment[] = [];
    invited: Model[];
    createComment(authorModel: any,text:string): TaskComment {
        let taskModel = {
            name:this.name,
            id:this.id
        }
        return new TaskComment(authorModel,taskModel,text);
        
    }
}