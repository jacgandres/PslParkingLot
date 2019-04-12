import { Injectable } from '@angular/core';
import { RouterStateSnapshot, CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from "rxjs";
import {AngularFireAuth  } from "@angular/fire/auth";
import { map } from "rxjs/operators"; 
import { isNullOrUndefined } from 'util';

@Injectable({
    providedIn: 'root'
} )
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private AFAuth:AngularFireAuth) {

  }
  
  canActivate( next:ActivatedRouteSnapshot,  state:RouterStateSnapshot ):Observable<boolean>|Promise<boolean>|boolean
  { 
    return this.AFAuth.authState.pipe(map(auth=>{ 
          if(isNullOrUndefined(auth))
          {
             this.router.navigate(['login']);
             return false;  
          }

          return true;  
      }))
  }

}
