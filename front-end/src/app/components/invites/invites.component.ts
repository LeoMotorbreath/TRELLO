import { Component, OnInit, NgZone, ChangeDetectorRef, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RenderService } from 'src/app/services/render.service';
import { LoadService } from 'src/app/services/load.service';
import { IUser, User } from 'src/classes/User';
import { tap, catchError } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';
import { IInvite } from 'src/classes/invite';
import { NavbarService } from 'src/app/services/navbar.service';
import { of } from 'rxjs';
import { TestService } from 'src/app/services/test.service';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { InviteService } from 'src/app/services/invite.service';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {
  currentUser: IUser;
  dissable : boolean = false;
  constructor(
    private auth          : AuthService,
    private render        : RenderService,
    private load          : LoadService,
    private data          : UserDataService,
    private zone          : NgZone, 
    private navbar        : NavbarService,
    private test          : TestService,
    private router        : Router,
    private inviteService : InviteService
  ) {

   }
   @ViewChild('button') buttons
  ngOnInit(): void {
  this.currentUser = this.auth.currentUser;
  this.load.checkUser(this.currentUser).pipe(
    catchError(err=>of(false)),
    tap((data)=>{
      if(!data){
        alert("что то пошло не так");
        this.router.navigate(['auth'])
      }else{
        this.currentUser = (data as User);
      }
    }),
   
  ).subscribe(()=>{
    this.render.renderNavBar = true;
  });
 

  

  }
  ngAfterViewInit(){
    console.log(this.buttons)
  }
  rejectInvite(invite: IInvite){
    this.dissable = true;
    this.inviteService.rejectInvite(invite.inviteToModel.id).pipe(
      tap((data)=> console.log(data))
    ).subscribe(()=>this.dissable = false);
  }
  acceptInvite(invite: IInvite) {
    this.dissable = true;
    this.inviteService.acceptInvite(invite).pipe(
      tap((data)=>console.log(data))
    ).subscribe(()=>this.dissable = false);
  }
}
