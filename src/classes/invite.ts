import { Model } from './model';

export interface IInvite {
    invitedId:         number;
    inviteToModel:     Model;
    inviterModel:      Model;
    text?:             string;
}
export class ProjectInvite implements IInvite {
    constructor(invitedId: number,inviteToModel: any,inviterModel: Model,asModerator: boolean, text?: string){
        this.invitedId          = invitedId;
        this.inviteToModel      = inviteToModel;
        this.inviterModel       = inviterModel;
        this.text               = text? text : 'no text';
        this.asModerator        = asModerator 
    }
    invitedId:          number;
    inviteToModel:      any;
    inviterModel:       Model;
    text?:              string;
    asModerator:        boolean;
}
export class TaskInvite implements IInvite{
    constructor(invitedId: number,inviteToModel: Model,inviterModel: Model, text?:string){
        this.invitedId = invitedId;
        this.inviteToModel = inviteToModel;
        this.inviterModel = inviterModel;
        this.text = text? text : 'no message provided';
    }
    invitedId: number;
    inviteToModel: Model;
    inviterModel: Model;
    text?: string;
    
}