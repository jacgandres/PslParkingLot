import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth"; 
import { User } from '../models/User';
import { DbFireBaseServiceService } from "../services/db-fire-base-service.service";
import { DbServiceService } from "../services/db-service.service";
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private AFAuth:AngularFireAuth, private dbService:DbFireBaseServiceService, private dbLocalService:DbServiceService ) { }

  LogIn(email:string, pwd:string)
  { 
    return new Promise((resolve,reject)=>{
      this.AFAuth.auth.signInWithEmailAndPassword(email,pwd).then(result=>{ 
        console.log("Se logueo perfectamente " ); 
         
        this.dbLocalService.GetUser().then(usr =>{
            var user:User = new Object();
             
            if(!isNullOrUndefined(usr))
            {
                user = usr;
            }

            user.UserId = result.user.uid;
            user.Email = result.user.email;
            user.Pwd = pwd;
    
            this.dbLocalService.SetUser(user) ;
            resolve(user);  
        }).catch(exc =>{
          console.log("Error "+exc);
          reject(exc);
        });
     }
      ).catch(error =>{ 
          console.log("Error "+error);
          reject(error);
      });
    }); 
  }

  LogOut(){

    return new Promise((resolve,reject) =>{ 
      this.AFAuth.auth.signOut().then(result =>{
        console.log("Se deslogueo perfectamente " );
        resolve();
      }).catch(error =>{
        console.log("Error: "+ error);
        reject(error);
      })
    });

  }
}
