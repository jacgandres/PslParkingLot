import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";
import { DbServiceService } from "../../services/db-service.service";
import { isNullOrUndefined } from 'util';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formgroup: FormGroup;


  constructor(private router: Router, private authService: AuthServiceService, private dbLocalService: DbServiceService) {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.formgroup = new FormGroup({
      loginDetails: new FormGroup({
        Email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(emailRegex)])),
        Password: new FormControl('', [Validators.required, Validators.minLength(6)])
      })
    });
  }

  ngOnInit() {
    this.dbLocalService.GetUser().then(result => {
      if (!isNullOrUndefined(result)) {
        this.formgroup.controls['loginDetails'].get("Email").setValue(result.Email);
        this.formgroup.controls['loginDetails'].get("Password").setValue(result.Pwd);
      }
    })
  }

  OnSubmitLogin() {

    console.log("Entro al login");
    this.authService.LogIn(this.formgroup.value.loginDetails.Email, this.formgroup.value.loginDetails.Password).then(resp => {
      this.router.navigate(['home']);
    }).catch(err => { alert("Datos incorrectos o no existe el usuario") });
  }

  Register() {
    this.router.navigate(['register']);
  }
 
}
