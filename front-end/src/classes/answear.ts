import { IUser } from './User';
import { IComment } from './comment';

export interface IAnswear{
    author: IUser;
    text: string;
    date: Date;
    
}
