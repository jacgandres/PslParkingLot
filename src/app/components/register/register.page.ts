import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormGroup,  FormControl,  Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  
  public formgroup: FormGroup;

  constructor(private router: Router ) {

    this.formgroup =  new FormGroup({
      UserDetails: new FormGroup ({
        FirstName: new FormControl('', Validators.required),
        LastName: new FormControl('', Validators.required)
      }),
      ContactInfo: new FormGroup ({
        Email: new FormControl('', Validators.required),
        Password: new FormControl('', Validators.required),
        Phone: new FormControl('', Validators.required),
        Skype: new FormControl('', Validators.required)
      }), 
      CarDetails: new FormGroup ({
        Plate: new FormControl('', Validators.required),
        Color: new FormControl('', Validators.required),
        Brand: new FormControl('', Validators.required)
      }),
    });
  }

  ngOnInit() {
  }

  Return() {
    this.router.navigate(['login']);
  }

  Register() {

  }
}
