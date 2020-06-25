import { IUser } from './User';
import { IProject } from './project';
import { ITaskList } from './task-list';
import { Model } from './model';
import { Comment_ } from './comment';
export interface ITask {
    authorModel: Model;
    projectModel: Model;
    name: string;
    defenition:string;
    perfomers: IUser[];
    comments: Comment_[];
    taskListName: string;
    id:number;

    createComment(authorModel: any,text:string) 
}
export class Task implements ITask {
    constructor(model?) {
        if(model) {
            this.authorModel  = model.authorModel;
            this.projectModel = model.projectModel;
            this.name         = model.name;
            this.defenition   = model.defenition?  model.defenition : 'defenition was not provided';
            this.taskListName = model.taskList;
            this.perfomers    = [];
            this.comments     = model.comments?    model.comments: [];
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
    comments: Comment_[] = [];
    invited: Model[];
    createComment(authorModel: any,text:string): Comment_ {
        
        return new Comment_(authorModel,this.id,text);
        
    }
}