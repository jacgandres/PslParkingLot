import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";
import { DbServiceService } from "../../services/db-service.service";
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Email:string;
  Pwd:string;


  constructor(private router:Router, private authService:AuthServiceService, private dbLocalService:DbServiceService) { }

  ngOnInit() { 
    this.dbLocalService.GetUser().then(result=>{ 
      if(!isNullOrUndefined(result))
      {
        this.Email = result.email;
        this.Pwd = result.pwd;
      }
    })
  }

  OnSubmitLogin(){ 
    console.log("Entro al login");
    this.authService.LogIn(this.Email,this.Pwd).then(resp=>{
       this.router.navigate(['home']);
    }).catch(error =>{
      alert("Datos incorrectos o no existe el usuario");
    });

  }
}
