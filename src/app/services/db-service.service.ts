import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx'; 
import { User } from "../models/User";
import { Platform } from '@ionic/angular';
import { CommonMethodsModule } from '../modules/common-methods/common-methods.module';
 

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
 
  constructor(private nativeStorage: NativeStorage, private platform: Platform, private commonMethods:CommonMethodsModule ) { }

  GetUser():Promise<User>{
    let user:User;
    this.commonMethods.ConsoleLog("Entro GetUser:" , {});

    if (this.platform.is('cordova')) {
      return new Promise((resolve,reject) =>{
        this.nativeStorage.getItem('User').then(result =>{
           this.commonMethods.ConsoleLog("Entro getItem:" , result);
           user = JSON.parse(result);
           resolve(user);
        }).catch(error =>{
           this.commonMethods.ConsoleLog("Error GetUser" , error);
           resolve(null);
        });
      })
    }
    else{
      return new Promise((resolve,reject) =>{ 
        try {
          user = JSON.parse( localStorage.getItem('User'));
          resolve(user); 
        } catch (error) {
          reject(error);
        }
      });       
    }
  }

  SetUser(user:User){
    this.commonMethods.ConsoleLog("Entro SetUser:" , {});
    if (this.platform.is('cordova')) {
      this.nativeStorage.setItem('User', JSON.stringify(user));
    }
    else{
      localStorage.setItem('User',JSON.stringify(user));
    }
  }

  CleanUser(){
    this.commonMethods.ConsoleLog("Entro CleanUser:" , {});
    if (this.platform.is('cordova')) {
      this.nativeStorage.remove('User');
    }
    else{
      localStorage.removeItem('User');
    }
  }
}
