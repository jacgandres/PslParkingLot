import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbFireBaseParkingService, DbFireBaseParkingUsageService, DbServiceService } from 'src/app/services/export-services';
import { Parking } from 'src/app/models/Parking';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class NewDayModule {

  constructor(private dbFireServiceParking: DbFireBaseParkingService,
    private dbFireServiceUsedParking: DbFireBaseParkingUsageService,
    private dbLocal: DbServiceService) {

  }


  SetDay() {
    return new Promise((resolve) => {
      this.dbFireServiceUsedParking.ValidateIfDayHasRegisters().then(result => {
        if (result) {
          this.dbLocal.GetUser().then(usr => {
            this.dbFireServiceParking.UpdateParkingsNewDay(usr.BranchId).then((result: Parking[]) => {

              result.forEach(item => {
                let tmp = Object.assign({}, item);
                this.UpdateParkingInfo(tmp);
              });

              this.dbFireServiceUsedParking.SaveTemplateDay().then(() => {
                console.log("Guard Usuario Logueado 1");
                resolve(true);
              })
            });
          })
        }
        else {
          console.log("Flujo normal")
          resolve(false);
        }
      });
    });
  }

  private UpdateParkingInfo(item: Parking) {
    let newResult = { ...item };
    newResult.IsUsed = false;
    console.log("Updating set new day : " + newResult.ParkingLotId);
    this.dbFireServiceParking.UpdateParking(newResult);

  }

  /*
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
*/
}
