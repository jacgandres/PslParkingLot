import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from '../models/User';
import { DbFireBaseServiceService } from "../services/db-fire-base-service.service";
import { DbServiceService } from "../services/db-service.service";
import { isNullOrUndefined } from 'util';
import { CommonMethodsModule } from '../modules/common-methods/common-methods.module'; 
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private AFAuth: AngularFireAuth, private dbService: DbFireBaseServiceService, 
              private commonMethods: CommonMethodsModule, private dbLocalService: DbServiceService) { }


  SignUp(registerUser: User) {
    return new Promise((resolve, reject) => {

      this.AFAuth.auth.createUserWithEmailAndPassword(registerUser.Email, registerUser.Pwd).then(usr => {
 
        this.commonMethods.ConsoleLog("Se registro correctamente" , usr);
        registerUser.UserId = usr.user.uid;

        resolve(registerUser);
      }).catch(error => {
        this.commonMethods.ConsoleLog("Se NO registro correctamente" , error);

        reject(error);
      });
    });
  }


  LogIn(email: string, pwd: string): Promise<User> {
    return new Promise((resolve, reject) => {
      this.AFAuth.auth.signInWithEmailAndPassword(email, pwd).then(result => { 
        
        this.commonMethods.ConsoleLog("Se logueo perfectamente" , result);

        let user: User = new Object();
        user.UserId = result.user.uid;

        this.dbService.GetUser(user).then(usr => {
          
          this.commonMethods.ConsoleLog("dbService.GetUser" , usr);
          if (!isNullOrUndefined(usr)) {
            user = usr;
            user.UserId = result.user.uid;
            user.Pwd = pwd;

            this.dbLocalService.SetUser(user); 
            resolve(user);
          }
        }).catch(exc => {
          this.commonMethods.ConsoleLog("dbService.GetUser error" , exc);
          reject(exc);
        });
      }).catch(error => {
        this.commonMethods.ConsoleLog("signInWithEmailAndPassword error" , error);
        reject(error);
      });
    });
  }

  LogOut() {

    return new Promise((resolve, reject) => {
      this.AFAuth.auth.signOut().then(result => {
        this.commonMethods.ConsoleLog("Se deslogueo perfectamente ",{});
        resolve();
      }).catch(error => {
        this.commonMethods.ConsoleLog("Error: " , error);
        reject(error);
      })
    }); 
  }
  
  RenovatePassword(email:string): any {
    this.commonMethods.ConsoleLog("Funciono alert....",{});

     return new Promise((resolve) =>{
        this.AFAuth.auth.sendPasswordResetEmail(email).then(() => {
            this.commonMethods.ConsoleLog("sendPasswordResetEmail ",{});
            resolve(true);
        })
     })

  }
}
