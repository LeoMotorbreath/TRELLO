import { IUser } from './User';

export class BDUser{
    constructor(login: string ,password: string,user: IUser){
        this.login = login;
        this.password = password;
        this.user = user;
    }
    login: string;
    password: string;
    user: IUser;
    jwt: string
}
