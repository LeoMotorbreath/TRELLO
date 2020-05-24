export class Path{
    constructor(name:string,active?: boolean){
        this.name = name
        this.active = active? active: false
    }
    name: string;
    active: boolean = false;
}