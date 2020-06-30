import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RenderService } from 'src/app/services/render.service';
import { LoadService } from 'src/app/services/load.service';
import { IUser, User } from 'src/classes/User';
import { tap, catchError } from 'rxjs/operators';
import { IInvite } from 'src/classes/invite';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { InviteService } from 'src/app/services/invite.service';
import { ClickableElementsManagerService } from 'src/app/services/clickable-elements-manager.service';

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
    private router        : Router,
    private inviteService : InviteService,
    private clickService  : ClickableElementsManagerService
  ) {

   }
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

  rejectInvite(invite: IInvite){
    this.inviteService.rejectInvite(invite.inviteToModel.id).pipe(
      tap((data)=> {
        if(data){
          if((data as any).message){
            this.currentUser.invites.splice(this.currentUser.invites.findIndex(inv => inv == invite),1);
          }
        }
      }),
    ).subscribe(
      (s)=>{this.clickService.turnOn()},
      (err)=>{
        alert('что-то пошло не так');
        this.clickService.turnOn();
      }
      );
  }
  acceptInvite(invite: IInvite) {
    this.dissable = true;
    this.inviteService.acceptInvite(invite).pipe(
      tap((data)=>{
        if((data as any).message){
          this.currentUser.invites.splice(this.currentUser.invites.findIndex(invite => invite == invite),1)
        }
      })
    ).subscribe(()=>this.dissable = false);
  }
}
