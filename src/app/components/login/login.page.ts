import { Component, OnInit } from '@angular/core';
import { AuthServiceService, DbServiceService } from "../../services/export-services";
import { Router, ActivatedRoute } from "@angular/router";
import { isNullOrUndefined } from 'util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastModule } from "../../modules/toast/toast.module";
import { CommonMethodsModule } from 'src/app/modules/common-methods/common-methods.module';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formgroup: FormGroup; 

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthServiceService,
    private platform: Platform, private dbLocalService: DbServiceService, private toast: ToastModule,
    private commonMethods: CommonMethodsModule, private alertController: AlertController) {

    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.formgroup = new FormGroup({
      loginDetails: new FormGroup({
        Email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(emailRegex)])),
        Password: new FormControl('', [Validators.required, Validators.minLength(6)])
      })
    });

    this.route.queryParams.subscribe(params => {
      this.commonMethods.ConsoleLog("this.route.queryParams", params);
      if (params && params.special) {
        let parameter = JSON.parse(params.special);
        if (parameter.CleanUser == true) {
          dbLocalService.CleanUser();
          this.exitApp();
        }
      }
    });
  }

  exitApp() {
    if (this.platform.is('cordova')) {
      navigator['app'].exitApp();
    }
    else {
      this.commonMethods.ConsoleLog("ha terminado session correactamente", {})
    }
  }

  ngOnInit() {
    this.dbLocalService.GetUser().then(result => {
      this.commonMethods.ConsoleLog("ngOnInit this.dbLocalService.GetUser()", result);
      if (!isNullOrUndefined(result)) {
        this.formgroup.controls['loginDetails'].get("Email").setValue(result.Email);
        this.formgroup.controls['loginDetails'].get("Password").setValue(result.Pwd);
      }
    })
  }

  OnSubmitLogin() {

    this.commonMethods.ConsoleLog("OnSubmitLogin", {});
    this.authService.LogIn(this.formgroup.value.loginDetails.Email, this.formgroup.value.loginDetails.Password).then(resp => {

      this.toast.presentToast(resp.FirstName + " " + resp.LastName + ", has ingresado correctamente.");
      this.router.navigate(['home']);
    }).catch(err => {  });
  }

  Register() {
    this.router.navigate(['register']);
  }

  RenovatePassword() {
    this.presentAlertConfirm("Esta seguro de enviar mensaje de renovacion de contraseña");
  }

  private async presentAlertConfirm(message: string) {

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>' + message + '</strong>!!!',
      inputs: [
        {
          name: 'emailModal',
          type: 'text',
          placeholder: 'Correo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: data => { 
            console.log(JSON.stringify(data)); 
            console.log(data.emailModal)  
            console.log('Confirm Okay');
            this.authService.RenovatePassword(data.emailModal).then(result => {
              this.commonMethods.presentAlert("Correo enviado!", "Renovacion Contraseña");
            }); 
          }
        }
      ]
    });

    await alert.present();
  }

}
