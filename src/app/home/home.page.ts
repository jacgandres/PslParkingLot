import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { DbServiceService, DbFireBaseParkingUsageService, DbFireBaseParkingService } from "../services/export-services";
import { ParkingUsage } from '../models/export-models';  
import { CommonMethodsModule } from '../modules/common-methods/common-methods.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private user: User;
  private usagesParking: ParkingUsage;

  constructor(private router: Router, 
              private dbFireServiceUsage: DbFireBaseParkingUsageService,
              private dbFireServiceParking: DbFireBaseParkingService, 
              private commonMethods: CommonMethodsModule,
              private localDb: DbServiceService) {

    this.usagesParking =
      {
        Free: 0,
        Used: 0
      }
     
  }

  ngOnInit() {
      this.commonMethods.ConsoleLog("Entro ngOnInit:" , {});

      this.localDb.GetUser().then(usr => {
        this.user = usr;
        this.GetParkingUsage();
      });
  }

  GetParkingUsage() {
    this.commonMethods.ConsoleLog("Entro GetParkingUsage:" , {});
     
    this.dbFireServiceParking.GetParkings(this.user).then(parkings  =>{
        this.commonMethods.ConsoleLog("Entro dbFireServiceParking.GetParkings:" , {});
        this.dbFireServiceUsage.GetParkingUsage(this.user).then(result => {

            this.commonMethods.ConsoleLog("Entro dbFireServiceUsage.GetParkingUsage:" , {});
            this.usagesParking = result; 

            this.usagesParking.Free = parkings.length - result.Used;
        });
    });

  }

  GetParkingList() {
    console.log('Clicked')
    /*this.router.navigate(["parking-list"]);*/
  }

  TakeSpot(){
    this.router.navigate(["register-parking"]);
  }
}
