import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import { DbFireBaseServiceService } from "../services/export-services";
import { ParkingUsage } from '../models/ParkingUsage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private user:User;
  private usagesParking: ParkingUsage;

  constructor(private router:Router, private activateRoute:ActivatedRoute, private dbFireService:DbFireBaseServiceService){
      
      this.usagesParking =
      {
        Free : 0,
        Used : 0
      }

      this.activateRoute.queryParams.subscribe((data)=>{           
          console.log("QueryParams " + JSON.stringify(data));
          this.user = data;
      });

      //this.GetParkingList();
  }

  ngOnInit(){
    console.log("ngOnInit");
    this.GetParkingUsage();
  }

  GetParkingUsage(){ 
      this.dbFireService.GetParkingUsage().then(result =>{
          this.usagesParking = result;
      });
  }

  GetParkingList(){
      this.router.navigate(["parking-list"]);
  }
}
