import { IAnswear } from './answear';
import { Model } from './model';


export interface IComment {
    authorModel: Model;
    text: string;
    answers: IAnswear[];
    id: number;
    commentedId: number
}
export class Comment_ implements IComment {
    
    constructor(authorModel:Model,commentedId: number,text:string){
        this.authorModel = authorModel;
        this.commentedId = commentedId;
        this.text        = text;
        this.answers     = [];
    }
    authorModel: Model;
    commentedId: number;
    answers: IAnswear[];
    text:string;
    id: number;

}