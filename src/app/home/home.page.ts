import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { DbServiceService, DbFireBaseParkingUsageService, DbFireBaseParkingService } from "../services/export-services";
import { ParkingUsage, Parking } from '../models/export-models';  

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
              private localDb: DbServiceService) {

    this.usagesParking =
      {
        Free: 0,
        Used: 0
      }
     
  }

  ngOnInit() {
    console.log("ngOnInit");

      this.localDb.GetUser().then(usr => {
        this.user = usr;
        this.GetParkingUsage();
      });
  }

  GetParkingUsage() {

    this.dbFireServiceParking.GetParkings(this.user).then(parkings  =>{
        this.dbFireServiceUsage.GetParkingUsage(this.user).then(result => {
             
            this.usagesParking = result; 

            this.usagesParking.Free = parkings.length - result.Used;
        });
    });

  }

  GetParkingList() {
    this.router.navigate(["parking-list"]);
  }
}
