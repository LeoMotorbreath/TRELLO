import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RenderService } from 'src/app/services/render.service';
import { LoadService } from 'src/app/services/load.service';
import { IUser } from 'src/classes/User';
import { tap } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';
import { IInvite } from 'src/classes/invite';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.css']
})
export class InvitesComponent implements OnInit {
  currentUser: IUser;
  constructor(
    private auth: AuthService,
    private render: RenderService,
    private load: LoadService,
    private data: UserDataService,
    private zone:NgZone, 
    private navbar: NavbarService

  ) {

   }

  ngOnInit(): void {
  this.currentUser = this.auth.currentUser;
  if(!this.currentUser){
    this.load.check(this.currentUser).pipe(
      tap((data)=>this.currentUser = data),
      tap(()=>console.log(this.currentUser.invites)),
      tap(()=>this.render.renderNavBar = true),
      tap(()=>this.navbar.toggleActive('invites'))
    ).subscribe()
    }
  }
  

  acceptInvite(invite: IInvite) {
    
    this.data.acceptPorjectInvaite(invite).pipe(
      tap((data)=>console.log(data)),
      tap((data)=>{
        this.currentUser.invites = (data as IUser).invites;
        this.currentUser.projects = (data as IUser).projects;
        
        console.log(this.currentUser.invites)
      })
    ).subscribe(()=>console.log);
  }
}
