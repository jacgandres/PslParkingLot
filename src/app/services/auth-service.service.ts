import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth"; 
import { User } from '../models/User';
import { DbFireBaseServiceService } from "../services/db-fire-base-service.service";
import { DbServiceService } from "../services/db-service.service";

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
        var user:User = new Object();
        
        user.UserId = result.user.uid;
        user.email = result.user.email;
        user.pwd = pwd;

        this.dbService.GetUser(user).then(result => { 
          this.dbLocalService.SetUser(result) ;
          resolve(result);  
        })

     }
      ).catch(error =>{ 
          console.log("Error "+error);
          reject(error);
      })
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
