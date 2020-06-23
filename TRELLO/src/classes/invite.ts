import { Model } from './model';

export interface IInvite {
    invitedData:       number|string;
    inviteToModel:     Model;
    inviterModel:      Model;
    text:             string;
}

export class Invite implements IInvite{
    invitedData: number | string;
    inviteToModel: Model;
    inviterModel: Model;
    text: string;
    constructor(invitedData:number|string,inviteToModel:Model,inviterModel:Model,text:string){
        this.invitedData   = invitedData;
        this.inviteToModel = inviteToModel;
        this.inviterModel  = inviterModel
    }
    
}