import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { DbServiceService, DbFireBaseParkingUsageService, DbFireBaseParkingService } from "../services/export-services";
import { ParkingUsage, Parking } from '../models/export-models';
import { CommonMethodsModule } from '../modules/common-methods/common-methods.module';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private user: User;
  private usagesParking: ParkingUsage;
  private parkingAvailable: Array<Parking>;
  private spliceBranch: Array<Parking[]>;

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

    this.parkingAvailable = [];
    this.spliceBranch = [];
  }

  ngOnInit() {
    this.commonMethods.ConsoleLog("Entro ngOnInit:", {});
  
    this.localDb.GetUser().then(usr => {
      this.user = usr;
      this.GetParkingUsage();
    });

  }

  GetParkingUsage() {
    this.commonMethods.ConsoleLog("Entro GetParkingUsage:", {});

    this.dbFireServiceParking.GetParkings( )
    .subscribe(snapshot => { 
      
      this.commonMethods.ConsoleLog("Entro GetParkings" , snapshot);
      let list: Parking[] = this.commonMethods.ConvertObjectToArray(snapshot);

      this.parkingAvailable = list.filter(item => item.BranchId == this.user.BranchId);
        
      this.commonMethods.ConsoleLog("Entro dbFireServiceParking.GetParkings", {}); 
      this.dbFireServiceUsage.GetParkingUsage(this.user).then(result => { 
        this.commonMethods.ConsoleLog("Entro dbFireServiceUsage.GetParkingUsage:", {});
        this.usagesParking = result; 
        this.usagesParking.Free = list.length - result.Used; 
        this.parkingAvailable = list;
        this.spliceBranch = this.spliceArray();
      });
    });   

  }

  spliceArray(): Array<Parking[]> {

    var arrays: Array<Parking[]> = [], size = 5;
    var cloneParkingBranch: Array<Parking> = [];
    this.parkingAvailable.forEach(element => {
      cloneParkingBranch.push(element);
    });

    while (cloneParkingBranch.length > 0) {
      var subArray = cloneParkingBranch.splice(0, size);
      arrays.push(subArray);
    }

    return arrays;
  }

  GetParkingList() {
    console.log('Clicked')
 
    /*this.router.navigate(["parking-list"]);*/
  }

  TakeSpot() {
    this.router.navigate(["register-parking"]);
  }

  getFleets(): Observable<Array<Parking[]>> {
    return Observable.call(this.GetParkingList)
  }
}
