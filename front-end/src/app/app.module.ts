import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app/app.component';
import { AuthComponent } from './components/auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { UserComponent } from './components/user/user.component';

import { ProjectFormComponent } from './components/project-form/project-form.component';
import { PorjectComponent } from './components/porject/porject.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TaskComponent } from './components/task/task.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ProjectTaskListsComponent } from './components/project-tasks/project-tasks.component';
import { AuthService } from './services/auth/auth.service';

import { RegistrationService } from './services/registration.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UserDataService } from './services/user-data.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ObjectManagerService } from './services/object-manager.service';
import { LoadService } from './services/load.service';
import { Route } from '@angular/compiler/src/core';
import { CommonModule } from '@angular/common';
import { RenderService } from './services/render.service';
import { InvitesComponent } from './components/invites/invites.component';
import { CommentComponent } from './components/comment/comment.component';
import { InviteComponent } from './components/invite/invite.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { LoadingComponent } from './components/loading/loading.component';
import { DeletedWindowComponent } from './components/deleted-window/deleted-window.component';
import { MyDissabledDirective } from './directives/my-dissabled.directive'


const appRoutes: Routes = [
  
  {
    path:'registration',component: RegistrationComponent,
  },
  {
    path: '', redirectTo: '/auth',pathMatch: 'full',
  },
  {
    path:'auth', component:AuthComponent, 
  },
  {
    path: 'navigation', component: NavigationComponent, canActivate:[AuthGuard]
  },
  {
    path: 'user', component: UserComponent, canActivate:[AuthGuard] 
  },
  {
    path:'projectForm', component: ProjectFormComponent , canActivate:[AuthGuard] 
  }, 
  {
    path:'project/:id', component :PorjectComponent, canActivate:[AuthGuard],children:
    [
      { path:'taskForm', component: TaskFormComponent, pathMatch:'full'},
      { path: 'task/:id', component: TaskComponent, pathMatch:'full'}
    ],
  },
  {
    path:'projects', component: ProjectsComponent, canActivate:[AuthGuard], 
  },
  { 
    path:'task/:id',component:  TaskComponent, canActivate:[AuthGuard]
  },
  {
    path:'tasks', component: TasksComponent, canActivate:[AuthGuard]
  },
  {
    path:'invites', component: InvitesComponent,canActivate:[AuthGuard]
  }

]
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserComponent,
    ProjectFormComponent,
    PorjectComponent,
    ProjectsComponent,
    NavigationComponent,
    TaskFormComponent,
    TasksComponent,
    ProjectTaskListsComponent,
    RegistrationComponent ,
    TaskComponent,
    InvitesComponent,
    CommentComponent,
    InviteComponent,
    LoadingComponent,
    DeletedWindowComponent,
    MyDissabledDirective
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    HttpClientModule,
    CommonModule,
    NoopAnimationsModule,
    DragDropModule
    
  ],
  providers: [
    AuthGuard,
    AuthService,
    RegistrationService,
    UserDataService,
    ObjectManagerService,
    LoadService,
    RenderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
