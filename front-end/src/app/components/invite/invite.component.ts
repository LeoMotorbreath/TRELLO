import { Component, OnInit ,EventEmitter,Output, Input, ViewChild} from '@angular/core';
import { Project } from 'src/classes/project';
import { User } from 'src/classes/User';
import { UserDataService } from 'src/app/services/user-data.service';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { LoadService } from 'src/app/services/load.service';
import { ObjectManagerService } from 'src/app/services/object-manager.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Model } from 'src/classes/model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Task } from 'src/classes/task';
import { Invite } from 'src/classes/invite';
import { TestService } from 'src/app/services/test.service';
import { ClickableElementsManagerService } from 'src/app/services/clickable-elements-manager.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  @Output() onNewProjectInvite = new EventEmitter<any>();
  onProjectInvite(invites) {
    this.onNewProjectInvite.emit(invites);
  }
  @Output() onNewTaskInvite = new EventEmitter<any>();
  onTaskInvite(invites){
    this.onNewTaskInvite.emit(invites)
  }
  @Input() creating: any;
  invalidInvite: boolean;
  proj: Project;
  user: User;
  text:string;
  task: Task;
  boolean : boolean;
  invitedId: number;
  processing: boolean;
  checkbox
  
  constructor(
    private dataService: UserDataService,
    private loadService: LoadService,
    private objectManger: ObjectManagerService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private test : TestService,
    private clickManger: ClickableElementsManagerService,
    private projectService: ProjectService
    
    ) { }

  ngOnInit(): void {
    this.user = this.auth.currentUser;
      this.loadService.checkUser(this.user).pipe(
        tap((data)=>this.user = this.objectManger.updateObjectData(data,new User())),
        switchMap(()=>this.activatedRoute.params),
        ).subscribe();
  }

 
  private validate(param: string | number, object: Project | Task){
    if(isNaN(+param)){
      return !param  || this.user.email == param || object.perfomers.some(perfomer=>perfomer.email == param) || object.invited.some(invited=>invited.email == param);
    }else{
      return !param ||  this.user.id == param || param < 1 || object.perfomers.some(perfomer=>perfomer.id == param) || object.invited.some(invited=>invited.id == param);
    }
  }
 

  private createInvite(invaitedData:number|string,inviteTo : Task | Project,inviter: User, text) : Invite{
    
    let inviterModel = new Model(inviter.id,inviter.email);
    let invitedToModel = new Model(inviteTo.id,inviteTo.name);
    return new Invite(invaitedData,invitedToModel,inviterModel,text)
    }
    
    inviteTo(invaitedData:number|string,inviteTo : Task | Project,inviter: User){
      if(this.validate(invaitedData,inviteTo)){
        this.invalidInvite = true;
        return
      }
      this.invalidInvite = false;
      this.processing = true;
      let invite = this.createInvite(invaitedData,inviteTo ,inviter,this.text)
      
      if(!isNaN(+invaitedData)){
        invite.invitedData = +invite.invitedData
      }
      this.clickManger.dissable();
      this.projectService.createInvite(invite).pipe(
        catchError(er=>{this.invalidInvite = true; return of(0)}),
        tap((data)=>console.log(data)),
        tap(data =>{
          if(data){
            (data as any).emit? this.onTaskInvite((data as any).invites): this.onProjectInvite((data as any).invites)
          }else{
            this.onTaskInvite(false)
            this.onProjectInvite((false));
          }
        })
      ).subscribe(()=>{
        this.clickManger.turnOn();
        this.processing = false;
      });
    }

  }
