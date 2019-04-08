import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router:Router, private authService: AuthServiceService) { }

  ngOnInit() {
  }

  LogOut()
  { 
    this.authService.LogOut().then( response =>{
      this.router.navigate(['login']);
    });
  }
}
