import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Email:string;
  Pwd:string;


  constructor(private router:Router, private authService:AuthServiceService) { }

  ngOnInit() {
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
