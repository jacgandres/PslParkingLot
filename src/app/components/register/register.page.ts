import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/User';

import { DbServiceService, AuthServiceService, DbFireBaseServiceService } from "../../services/export-services";
import { ToastModule } from "../../modules/toast/toast.module";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  public formgroup: FormGroup;

  constructor(private router: Router,
    private dbLocal: DbServiceService,
    private authService: AuthServiceService,
    private toast:ToastModule,
    private dbFire: DbFireBaseServiceService) {

    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.formgroup = new FormGroup({
      UserDetails: new FormGroup({
        FirstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        LastName: new FormControl('', [Validators.required, Validators.minLength(4)])
      }),
      ContactInfo: new FormGroup({
        Email: new FormControl('', Validators.compose([
          Validators.minLength(10),
          Validators.pattern(emailRegex)])),
        Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        Skype: new FormControl('', [Validators.required, Validators.minLength(8)]),
        Phone: new FormControl()
      }),
      CarDetails: new FormGroup({
        Plate: new FormControl('', [Validators.required, Validators.minLength(6)]),
        Color: new FormControl(),
        Brand: new FormControl()
      }),
    });

    this.cleanForm();
  }

  ngOnInit() {
  }

  Return() {
    this.cleanForm();
    this.router.navigate(['login']);
  }

  cleanForm(){ 
    this.formgroup.controls['UserDetails'].get("FirstName").setValue("");
    this.formgroup.controls['UserDetails'].get("LastName").setValue("");
    this.formgroup.controls['ContactInfo'].get("Email").setValue("");
    this.formgroup.controls['ContactInfo'].get("Password").setValue("");
    this.formgroup.controls['ContactInfo'].get("Skype").setValue("");
    this.formgroup.controls['ContactInfo'].get("Phone").setValue("");
    this.formgroup.controls['CarDetails'].get("Plate").setValue("");
    this.formgroup.controls['CarDetails'].get("Color").setValue("");
    this.formgroup.controls['CarDetails'].get("Brand").setValue("");


    this.formgroup.controls['UserDetails'].get("FirstName").markAsUntouched();
    this.formgroup.controls['UserDetails'].get("LastName").markAsUntouched();
    this.formgroup.controls['ContactInfo'].get("Email").markAsUntouched();
    this.formgroup.controls['ContactInfo'].get("Password").markAsUntouched();
    this.formgroup.controls['ContactInfo'].get("Skype").markAsUntouched();
    this.formgroup.controls['ContactInfo'].get("Phone").markAsUntouched();
    this.formgroup.controls['CarDetails'].get("Plate").markAsUntouched();
    this.formgroup.controls['CarDetails'].get("Color").markAsUntouched();
    this.formgroup.controls['CarDetails'].get("Brand").markAsUntouched();
  }

  Register() {
    
    var registerUser: User;

    registerUser = { 
      FirstName : this.formgroup.value.UserDetails.FirstName,
      LastName : this.formgroup.value.UserDetails.LastName, 
      Email : this.formgroup.value.ContactInfo.Email,
      Pwd : this.formgroup.value.ContactInfo.Password,
      Phone : this.formgroup.value.ContactInfo.Phone,
      Skype : this.formgroup.value.ContactInfo.Skype, 
      Plate : this.formgroup.value.CarDetails.Plate,
      Color : this.formgroup.value.CarDetails.Color,
      Brand : this.formgroup.value.CarDetails.Brand
    } 

    this.authService.SignUp(registerUser).then(usr  => { 
      this.dbFire.SetUser(usr).then(result =>{ 
          this.dbLocal.SetUser(result); 
          this.cleanForm();
          this.toast.presentToast(registerUser.FirstName + " " + registerUser.LastName + " has ingresado correctamente.");
          this.router.navigate(['home']);
      }).catch(exc =>{

      });
    }).catch(error =>{
        
    });
  }
}
