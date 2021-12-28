import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private db: DbService,
                private router: Router){

  } 
  
  canActivate(): boolean {
    if( this.db.autenticadoLogin()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
