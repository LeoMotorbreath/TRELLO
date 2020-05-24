import { ITask, Task } from './task';
import { IUser } from './User';
import { IProject } from './project';
import { Model } from './model';

export interface ITaskList{
    name: string;
    tasks: ITask[];
    
    
    createTask(authorModel: Model,projModel:Model,name: string,defenition: string):ITask;

}
export class TaskList implements ITaskList {
    constructor(model?) {
        if(model) {
            this.name         = model.name? model.name:   '';
            this.tasks        = model.tasks? model.tasks: [];
        }else {
            this.tasks = [];
        }
        
    }
    name: string;
    tasks: ITask[] = [];
    
    createTask(authorModel:Model,projectModel:Model,name: string,defenition?: string): ITask {
        let model = { 
            authorModel,
            name,
            taskListName:this.name,
            projectModel,
            defenition,
            
        }
        return new Task(model);
    }
}