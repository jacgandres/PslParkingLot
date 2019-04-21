import { Component } from '@angular/core';
import { IonItemSliding  } from "@ionic/angular";
import { Router } from '@angular/router';
import { User } from '../models/User';
import { DbServiceService, DbFireBaseParkingUsageService, DbFireBaseParkingService } from "../services/export-services";
import { ParkingUsage, Parking } from '../models/export-models';
import { CommonMethodsModule } from '../modules/common-methods/common-methods.module';
import { NewDayModule } from '../modules/new-day/new-day.module';   
import { Subscription } from 'rxjs/internal/Subscription';
//import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  private subscriptioParking:Subscription;
  private user: User;
  private usagesParking: ParkingUsage;
  private parkingAvailable: Array<Parking>;
  private spliceBranch: Array<Parking[]>;

  constructor(private router: Router,
    private dbFireServiceUsage: DbFireBaseParkingUsageService,
    private dbFireServiceParking: DbFireBaseParkingService,
    private commonMethods: CommonMethodsModule,
    private newDay:NewDayModule,
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
    this.newDay.SetDay().then((result) =>{ if(result){window.location.reload();} });
  }

  GetParkingUsage() {
    this.commonMethods.ConsoleLog("Entro GetParkingUsage:", {});

    this.subscriptioParking =  this.dbFireServiceParking.GetParkings(this.user.BranchId)
                                                  .subscribe(snapshot => { 
                                                    
                                                    this.commonMethods.ConsoleLog("Entro GetParkings" , snapshot);
                                                    this.parkingAvailable = this.commonMethods.ConvertObjectToArray(snapshot);
                    
                                                    this.commonMethods.ConsoleLog("Entro dbFireServiceParking.GetParkings", {}); 
                                                    this.dbFireServiceUsage.GetParkingUsage(this.user).then(result => { 
                                                      this.commonMethods.ConsoleLog("Entro dbFireServiceUsage.GetParkingUsage:", {});
                                                      this.usagesParking = result; 
                                                      this.usagesParking.Free = this.parkingAvailable.length - result.Used; 
                                                      
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

  TakeSpot(slidingItem: IonItemSliding){
    slidingItem.close();
    this.router.navigate(["register-parking" ]);
  } 
  
  BreakFreeSpot(slidingItem: IonItemSliding){
    slidingItem.close();
    this.router.navigate(["set-break-free-spot" ]);
  }
 
  ionViewDidLeave(){
    this.commonMethods.ConsoleLog("ionViewDidLeave home ",{});  
    this.subscriptioParking.unsubscribe();
  }

  ionViewWillEnter (){
    this.commonMethods.ConsoleLog("ionViewWillEnter  home ",{}); 

    this.localDb.GetUser().then(usr => {
      this.user = usr;
      this.GetParkingUsage();
    });
  }
  ngOnDestroy(){
    this.commonMethods.ConsoleLog("ngOnDestroy home ",{});  
  }
}
