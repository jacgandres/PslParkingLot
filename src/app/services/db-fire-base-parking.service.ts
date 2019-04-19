import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { CommonMethodsModule } from '../modules/common-methods/common-methods.module';
import { Parking } from '../models/export-models';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class DbFireBaseParkingService {

  private parkingGetSubscription: Subscription;
  private parkingList: Parking[] = [];

  constructor(private afDB: AngularFireDatabase, private commonMethods: CommonMethodsModule) { }

  public GetParkings() {

    let strRef = "/Parking/";
    return this.afDB.object(strRef).valueChanges();
  }

  UpdateParking(parking: Parking) { 
    return new Promise((resolve) => {
      let strRef = "/Parking/" + parking.ParkingLotId;
      this.afDB.object(strRef)
        .update(parking)
        .then(result => {
          resolve(true);
        })
    });
  }

  GetParkingById(parkingId: string) {

    return new Promise((resolve) => {
      let strRef = "/Parking/" + parkingId;
      const ref = this.afDB.database.ref(strRef);

      ref.on("value", snapshot => {

        let value = snapshot.val();
        resolve(value);
      })

    });
  }

}
