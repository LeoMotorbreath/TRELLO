import { IAnswear } from './answear';
import { Model } from './model';


export interface IComment {
    authorModel: Model;
    text: string;
    answers: IAnswear[];
    id: number
}
export class TaskComment implements IComment {
    constructor(authorModel:any,commentedTaskModel:any,text:string){
        this.authorModel = authorModel;
        this.text = text;
        this.taskComented = commentedTaskModel;
    
    }
    answers: IAnswear[] = [];
    taskComented: Model;
    authorModel: Model;
    text: string;
    id: number
}