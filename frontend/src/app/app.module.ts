import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { BackupsComponent } from './components/backups/backups.component';
import { ConfigComponent } from './components/config/config.component';
import { GoogledriveComponent } from './components/googledrive/googledrive.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    LoginComponent,
    BackupsComponent,
    ConfigComponent,
    GoogledriveComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
