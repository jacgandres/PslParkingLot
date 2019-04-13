import { Component, OnInit } from '@angular/core';
import { AuthServiceService, DbServiceService } from "../../services/export-services";
import { Router } from "@angular/router"; 
import { isNullOrUndefined } from 'util';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { ToastModule } from "../../modules/toast/toast.module";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formgroup: FormGroup;


  constructor(private router: Router, private authService: AuthServiceService, 
              private dbLocalService: DbServiceService, private toast:ToastModule) {

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
       
      this.toast.presentToast(resp.FirstName + " " + resp.LastName + ", has ingresado correctamente.");
      this.router.navigate(['home'],{queryParams: resp});
    }).catch(err => { alert("Datos incorrectos o no existe el usuario") });
  }

  Register() {
    this.router.navigate(['register']);
  }
 
}
