import { Component, OnInit } from '@angular/core';
import { AuthServiceService, DbServiceService } from "../../services/export-services";
import { Router, NavigationExtras } from "@angular/router"; 
import { ToastModule } from "../../modules/toast/toast.module";
import { CommonMethodsModule } from 'src/app/modules/common-methods/common-methods.module';
  

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router:Router, private authService: AuthServiceService,
              private dbLocalService:DbServiceService, private toast:ToastModule, private commonMethods: CommonMethodsModule) { }

  ngOnInit() {
  }

  LogOut()
  {  
    this.commonMethods.ConsoleLog("LogOut" , {});
    this.authService.LogOut().then( response =>{
      this.dbLocalService.GetUser().then(usr =>{
          
          this.toast.presentToast(usr.FirstName + " " + usr.LastName + ", has salido correctamente.");
          let navigationExtras: NavigationExtras = {
            queryParams: {
              special: JSON.stringify({CleanUser:true})
            }
          };
          this.router.navigate(['login'], navigationExtras);
      });
    });
  }
}
