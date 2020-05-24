import { Component, OnInit ,EventEmitter,Output, Input} from '@angular/core';
import { Project } from 'src/classes/project';
import { User } from 'src/classes/User';
import { ProjectInvite, IInvite, TaskInvite } from 'src/classes/invite';
import { UserDataService } from 'src/app/services/user-data.service';
import { tap, switchMap } from 'rxjs/operators';
import { LoadService } from 'src/app/services/load.service';
import { ObjectManagerService } from 'src/app/services/object-manager.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Model } from 'src/classes/model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Task } from 'src/classes/task';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  @Output() onNewProjectInvite = new EventEmitter<any>();
  onProjectInvite(stream) {

    this.onNewProjectInvite.emit(stream);
  }
  @Output() onNewTaskInvite = new EventEmitter<any>()
  onTaskInvite(stream){
    this.onNewTaskInvite.emit(stream)
  }
  @Input() creating: boolean;
  invalidInvite: boolean;
  proj: Project;
  user: User;
  text:string;
  task: Task;
  boolean : boolean;
  invitedId: number;
  checkbox
  constructor(
    private dataService: UserDataService,
    private loadService: LoadService,
    private objectManger: ObjectManagerService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService

    ) { }

  ngOnInit(): void {
    this.user = this.auth.currentUser;
      this.loadService.check(this.user).pipe(
        tap((data)=>this.user = this.objectManger.updateObjectData(data,new User())),
        switchMap(()=>this.activatedRoute.params),
        
        ).subscribe();
  }

  log(arg){
    console.log(arg)
  }
  private isIdPerofomerOrInvited(id:number,object: Project | Task){
    return object.invited.some((inv)=>inv.id == id) || object.perfomers.some((perf)=>perf.id == id)
  }
  private validateInvaitedId(invitedId:number,object: Project | Task) {
    return isNaN(invitedId)||typeof invitedId !=='number'||invitedId<1|| this.isIdPerofomerOrInvited(invitedId,object)|| invitedId === this.user.id 
  }
  private projInvite(invaitedId: number , text?:string ,asModerator?:boolean,) {
    let inviteToModel = new Model(this.proj.id,this.proj.name);
    let inviterModel = new Model(this.user.id,this.user.name);
    let invite = new ProjectInvite(invaitedId,inviteToModel,inviterModel,false,text);
    return this.dataService.postInvaiteToProject(invite)
    }
  private taskInvite(invaitedId:number,text?:string){
    let inviteToModel = new Model(this.task.id,this.task.name);
    let inviterModel = new Model(this.user.id,this.user.name);
    let invite = new TaskInvite(invaitedId,inviteToModel,inviterModel,text)
    return this.dataService.postInvaiteToTask(invite)
  }
  inviteToProject(invitedId:number,text?:string,asModerator?:boolean,) {
    invitedId = +invitedId;
    
    if(!this.proj) {
      this.activatedRoute.params.pipe(
        tap((data)=>this.proj = this.user.projects.find(proj=>proj.id === +(data as Model).id)),
        tap(()=>{
          if(this.validateInvaitedId(invitedId,this.proj)){
            this.onProjectInvite(of(new Error()))
            
          }else{
            this.onProjectInvite(this.projInvite(invitedId,text));
          }
        })
    
      ).subscribe()
  }else{
    if(this.validateInvaitedId(invitedId,this.proj)){
      this.onProjectInvite(of(new Error))
    }else{
      
      this.onProjectInvite(this.projInvite(invitedId,text))
    }
  }
}
  inviteToTask(invitedId: number,text?:string) {
    invitedId = +invitedId;
    if(!this.task){
      this.activatedRoute.params.pipe(
        tap((data)=>this.task = this.user.getUserTasks().find(tsk=>tsk.id === +(data as Model).id)),
        tap(()=>{
          if(this.validateInvaitedId(invitedId,this.task)) {
            console.log( isNaN(invitedId)|| typeof invitedId !=='number'|| invitedId<1 || this.isIdPerofomerOrInvited(invitedId,this.task)|| invitedId === this.user.id )
            this.onTaskInvite(of(new Error()))
          }else{
            console.log(this.taskInvite(invitedId,text))
            this.onTaskInvite(this.taskInvite(invitedId,text));
          }
        })
      ).subscribe();
    }else{
      if(this.validateInvaitedId(invitedId, this.task)){
        console.log( isNaN(invitedId)||typeof invitedId !=='number'||invitedId<1|| this.isIdPerofomerOrInvited(invitedId,this.task)|| invitedId === this.user.id )
        this.onTaskInvite(of(new Error()))
      }else{
        console.log(this.taskInvite(invitedId,text))
        this.onTaskInvite(this.taskInvite(invitedId,text))
      }
    }
  }
}
