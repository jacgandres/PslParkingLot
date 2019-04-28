import { Component, OnInit } from '@angular/core';
import { DbServiceService, DbFireBaseParkingService, DbFireBaseParkingUsageService } from 'src/app/services/export-services';
import { CommonMethodsModule } from 'src/app/modules/common-methods/common-methods.module';
import { Router } from '@angular/router';
import { User, UsedParkingLot, Parking } from 'src/app/models/export-models';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-set-break-free-spot',
  templateUrl: './set-break-free-spot.page.html',
  styleUrls: ['./set-break-free-spot.page.scss'],
})
export class SetBreakFreeSpotPage implements OnInit {

  public user: User;
  public usedParkingLot: UsedParkingLot;
  public parking: Parking;
  public isValid = false;

  constructor(private router: Router,
    private commonMethods: CommonMethodsModule,
    private dbFireServiceParking: DbFireBaseParkingService,
    private dbFireServiceUsedParking: DbFireBaseParkingUsageService,
    private dbLocal: DbServiceService) {

    this.parking =
      {
        BranchId: 0,
        IsUsed: false,
        ParkingLotId: 0,
        ParkingNumber: 0,
        IsChild: false
      }
  }

  ngOnInit() {
    this.dbLocal.GetUser().then(usr => {
      this.user = usr;
      this.dbFireServiceUsedParking.GetParkingUsageByUserId(usr.UserId).then(result => {
        this.usedParkingLot = result;
         
        if (!isNullOrUndefined(result)) {

          this.dbFireServiceParking.GetParkingById(result.ParkingLotId.toString()).then(response => {
            this.parking = response
            this.isValid = true;
          })
        }
        else {
          this.commonMethods.presentAlert("No tiene ningun parqueadero reservado!", "");
          this.isValid = false;
        }
      })
    });
  }

  ionViewDidLeave() {
    this.commonMethods.ConsoleLog("ionViewDidLeave register break free spot ", {});
  }

  Return() {
    this.router.navigate(["home"]);
  }

  setBreakFreeSpot() {
    this.UpdateParking().then(()=>{ 
      this.dbFireServiceUsedParking.RemoveDateUsedParking(this.usedParkingLot).then(()=>{
        this.Return();
      })
    });  
  }
  UpdateParking() {
    this.parking.IsUsed = false;
    return this.dbFireServiceParking.UpdateParking(this.parking);
  }
}
