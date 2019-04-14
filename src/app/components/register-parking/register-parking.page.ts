import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethodsModule } from 'src/app/modules/common-methods/common-methods.module';

@Component({
  selector: 'app-register-parking',
  templateUrl: './register-parking.page.html',
  styleUrls: ['./register-parking.page.scss'],
})
export class RegisterParkingPage implements OnInit {

  constructor(private router: Router, private commonMethods: CommonMethodsModule) { }

  ngOnInit() {
  }

  Return(){
    this.router.navigate(["home"]);
  }
}
