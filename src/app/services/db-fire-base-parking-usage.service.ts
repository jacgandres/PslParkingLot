import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CommonMethodsModule } from '../modules/common-methods/common-methods.module';
import { Subscription } from 'rxjs';
import { ParkingUsage, User, UsedParkingLot } from '../models/export-models';
import { DatePipe } from '@angular/common';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DbFireBaseParkingUsageService {

  private dateTime: string;
  private subscriptionDate: Subscription;

  constructor(private afDB: AngularFireDatabase, private datepipe: DatePipe, private commonMethods: CommonMethodsModule) {
    this.FormatStandarDate();
  }

  private FormatStandarDate() {
    this.dateTime = this.datepipe.transform(new Date(), 'MM-dd-yyyy');
  }

  public GetParkingUsage(Usr: User): Promise<ParkingUsage> {
    let parkingUsage: ParkingUsage = {
      Free: 0,
      Used: 0
    }
    
    return new Promise((assert) => {
      let strRef = "/Dates/" + this.dateTime;
      this.subscriptionDate = this.afDB.object(strRef)
        .valueChanges()
        .subscribe(snapshot => {
           
          if (!isNullOrUndefined(snapshot)) {
            this.commonMethods.ConsoleLog("Entro GetParkingUsage:", snapshot);

            let list: any[] = this.commonMethods.ConvertObjectToArray(snapshot);

            list = list.filter(item => item.BranchId == Usr.BranchId);

            list.forEach(function (value) {
              if (value.IsParked) {
                parkingUsage.Used++;
              }
              else {
                parkingUsage.Free++;
              }
            });

            this.subscriptionDate.unsubscribe();
            assert(parkingUsage);
          }
          else{
            let usage:UsedParkingLot = { 
            }
            this.SetDate(usage).then(()=>{
              assert(parkingUsage)
            });
          }
        });
    });
  }

  SetDate(parking:UsedParkingLot) {
    return new Promise((assert, reject) => {
      let strRef = "/Dates/" + this.dateTime;
      this.afDB.object(strRef).set(parking).then(() => {
        this.commonMethods.ConsoleLog("SetDate afDB.object" , parking);
        assert({});
      }).catch(error => {

        this.commonMethods.ConsoleLog("SetDate afDB.object error" , error);
        reject(error);
      });
    });
  }
}
