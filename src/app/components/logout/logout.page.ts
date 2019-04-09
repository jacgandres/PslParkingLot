import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";
import { DbServiceService } from "../../services/db-service.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router:Router, private authService: AuthServiceService, private dbLocalService:DbServiceService) { }

  ngOnInit() {
  }

  LogOut()
  { 
    this.authService.LogOut().then( response =>{
      this.dbLocalService.CleanUser();
      this.router.navigate(['login']);
    });
  }
}
