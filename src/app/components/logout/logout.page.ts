import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";
import { DbServiceService } from "../../services/db-service.service";
import { ToastModule } from "../../modules/toast/toast.module";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router:Router, private authService: AuthServiceService, 
              private dbLocalService:DbServiceService, private toast:ToastModule) { }

  ngOnInit() {
  }

  LogOut()
  { 
    this.authService.LogOut().then( response =>{
      this.dbLocalService.GetUser().then(usr =>{
          this.toast.presentToast(usr.FirstName + " " + usr.LastName + " has salido correctamente.");
          this.dbLocalService.CleanUser();
          this.router.navigate(['login']);
      });
    });
  }
}
