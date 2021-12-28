import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from "./components/login/login.component";
import { BackupsComponent } from "./components/backups/backups.component";
import { GoogledriveComponent } from "./components/googledrive/googledrive.component";
import { ConfigComponent } from "./components/config/config.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'users', component: UsersComponent, canActivate: [ AuthGuard ] },
    { path: 'backups', component: BackupsComponent, canActivate: [ AuthGuard ] },
    { path: 'googledrive', component: GoogledriveComponent, canActivate: [ AuthGuard ] },
    { path: 'config', component: ConfigComponent, canActivate: [ AuthGuard ] },
    { path: 'registro', component: RegistroComponent, canActivate: [ AuthGuard ] },
    { path: '**', pathMatch: 'full', redirectTo: 'login'}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }