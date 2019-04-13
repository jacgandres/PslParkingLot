import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { CommonMethodsModule } from '../modules/common-methods/common-methods.module';
import { Parking, User } from '../models/export-models'; 

@Injectable({
  providedIn: 'root'
})
export class DbFireBaseParkingService {

  private subscriptionUser: Subscription;

  constructor(private afDB: AngularFireDatabase, private commonMethods: CommonMethodsModule) { }

  public GetParkings(Usr:User):Promise<Parking[]>{
    
    return new Promise((assert) => {
      let strRef = "/Parking/";
      this.subscriptionUser = this.afDB.object(strRef)
        .valueChanges()
        .subscribe(snapshot => { 
            
            let list: Parking[] = this.commonMethods.ConvertObjectToArray(snapshot);

            list = list.filter(item => item.BranchId == Usr.BranchId);
            
            this.subscriptionUser.unsubscribe();
            assert(list);
        });
    })
  }
}
