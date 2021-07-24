import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MangaListComponent } from './manga-list/manga-list.component';
import { AuthGuard } from './services/AuthGuard';
import { AuthService } from './services/AuthService';
import { NAuthGuard } from './services/NAuthGuard';
import { ProfileComponent } from './profile/profile.component';


const appRoutes: Route[] = [
  {path: '', component: LandingPageComponent, canActivate: [ NAuthGuard ]},
  {path: 'login', component: LoginComponent, canActivate: [ NAuthGuard ]},
  {path: 'signup', component: SignupComponent, canActivate: [ NAuthGuard ]},
  {path: 'dashboard/manga-list', component: MangaListComponent, canActivate: [ AuthGuard ]},
  {path: 'dashboard/profile', component: ProfileComponent, canActivate: [ AuthGuard ]}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
