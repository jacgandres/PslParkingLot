import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { DbServiceService } from "../services/db-service.service";
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private AFAuth:AngularFireAuth, private dbService:DbServiceService) { }

  LogIn(email:string, pwd:string)
  { 
    return new Promise((resolve,reject)=>{
      this.AFAuth.auth.signInWithEmailAndPassword(email,pwd).then(result=>{ 
        console.log("Se logueo perfectamente " + result);
        let user:User;

        

        this.dbService.SetUser();
        resolve(result);
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
        console.log("Se deslogueo perfectamente " + result);
        resolve();
      }).catch(error =>{
        console.log("Error: "+ error);
        reject(error);
      })
    });

  }
}
