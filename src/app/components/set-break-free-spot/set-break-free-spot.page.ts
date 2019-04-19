import { Component, OnInit } from '@angular/core';
import { DbServiceService, DbFireBaseParkingService, DbFireBaseParkingUsageService } from 'src/app/services/export-services';
import { CommonMethodsModule } from 'src/app/modules/common-methods/common-methods.module';
import { Router } from '@angular/router';
import { User } from 'src/app/models/export-models';

@Component({
  selector: 'app-set-break-free-spot',
  templateUrl: './set-break-free-spot.page.html',
  styleUrls: ['./set-break-free-spot.page.scss'],
})
export class SetBreakFreeSpotPage implements OnInit {

  private user: User
  
  constructor(private router: Router,
              private commonMethods: CommonMethodsModule,
              private dbFireServiceParking: DbFireBaseParkingService,
              private dbFireServiceUsedParking: DbFireBaseParkingUsageService,
              private dbLocal: DbServiceService) 
  {

  }

  ngOnInit() {
    this.dbLocal.GetUser().then(usr => { 
        this.user = usr;

        
    });
  }

  ionViewDidLeave() {
    this.commonMethods.ConsoleLog("ionViewDidLeave register break free spot ", {}); 
  }

  Return() {
    this.router.navigate(["home"]);
  }

}
