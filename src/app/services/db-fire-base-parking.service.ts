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

  public GetParkings(BranchId: number) {
    let strRef = "/Parking/";

    let query = this.afDB.database.ref(strRef)
      .orderByChild('BranchId')
      .equalTo(+BranchId);

    this.afDB.object(strRef).query = query;

    return this.afDB.object(strRef).valueChanges();
  }

  GetParkingByFilters(BranchId: number) {
    return new Promise((resolve) => {

      let strRef = "/Parking/";

      let ref = this.afDB.database.ref(strRef)
        .orderByChild('BranchId')
        .equalTo(+BranchId);


      ref.on('value', snapshot => {
        let value = snapshot.val();
        resolve(value);
      })
    });

  }

  GetParkingById(parkingId: string) {
    return new Promise<Parking>((resolve) => {
      let strRef = "/Parking/" + parkingId;
      const ref = this.afDB.database.ref(strRef);

      ref.on("value", snapshot => {
        let value = snapshot.val();
        resolve(value);
      })

    });
  }


  UpdateParkingsNewDay(BranchId: number) {
    return new Promise((resolve) => {
      let strRef = "/Parking/";

      let ref = this.afDB.database.ref(strRef)
        .orderByChild('BranchId')
        .equalTo(+BranchId);

      ref.on('value', snapshot => {

        let parkings: Parking[] = this.commonMethods.ConvertObjectToArray(snapshot.val());

        resolve(parkings);
      });
    })
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
