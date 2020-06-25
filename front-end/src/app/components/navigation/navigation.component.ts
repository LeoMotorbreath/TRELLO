import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUser } from 'src/classes/User';
import { Path } from 'src/classes/path';
import { NavbarService } from 'src/app/services/navbar.service';
import { RenderService } from 'src/app/services/render.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  
  constructor(
    private router: Router,
    private dataService : UserDataService,
    public auth: AuthService,
    private navbarService: NavbarService,
    private render: RenderService,
    
    
    ) { }
  
  navigateToProjects(){
    this.router.navigate(['projects'])
  }
  navigateToTasks(){
    this.router.navigate(['tasks'])
  }
  navigateToUser(){
    this.router.navigate(['user'])
  }
  
  navigate(name:string){
    this.router.navigate([name])
  }
  navigateToAuth(){
    this.auth.logOut();
    this.render.renderNavBar = false;
    this.router.navigate(['auth']);
  }
  
  paths = this.navbarService.paths;
  
  toggleActive(pathName) {
    this.navbarService.toggleActive(pathName)
  }
  navigateToInvites(){
    this.router.navigate(['invites'])
  }

  ngOnInit(): void {
    
  }

}
