import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx'; 
import { User } from "../models/User";
import { Platform } from '@ionic/angular';
 

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
 
  constructor(private nativeStorage: NativeStorage, private platform: Platform ) { }

  GetUser():Promise<User>{
    let user:User;
    

    if (this.platform.is('cordova')) {
      return new Promise((resolve,reject) =>{
        this.nativeStorage.getItem('User').then(result =>{
           user = result;
           resolve(user);
        }).catch(error =>{
           reject(error);
        });
      })
    }
    else{
      return new Promise((resolve,reject) =>{
         
        try {
          user = JSON.parse( localStorage.getItem('Usuario'));
          resolve(user); 
        } catch (error) {
          reject(error);
        }
      });       
    }
  }

  SetUser(user:User){
    
    if (this.platform.is('cordova')) {
      this.nativeStorage.setItem('User', JSON.stringify(user));
    }
    else{
      localStorage.setItem('Usuario',JSON.stringify(user));
    }
  }

  CleanUser(){
    if (this.platform.is('cordova')) {
      this.nativeStorage.remove('User');
    }
    else{
      localStorage.removeItem('User');
    }
  }
}
