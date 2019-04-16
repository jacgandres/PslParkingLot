import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription, Observable } from 'rxjs';
import { CommonMethodsModule } from '../modules/common-methods/common-methods.module';
import {  User, Parking } from '../models/export-models'; 

@Injectable({
  providedIn: 'root'
})
export class DbFireBaseParkingService {
 
  private parkingList : Parking[] = []; 

  constructor(private afDB: AngularFireDatabase, private commonMethods: CommonMethodsModule) { }

  public GetParkings( ){
      let strRef = "/Parking/";
      return this.afDB.object(strRef).valueChanges();
  }
 
}
