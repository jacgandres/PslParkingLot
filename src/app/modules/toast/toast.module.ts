import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ToastModule 
{
  constructor(public toastController: ToastController) {}

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
