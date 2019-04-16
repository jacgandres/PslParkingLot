import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AlertController } from '@ionic/angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CommonMethodsModule {
   
  constructor(private alertController: AlertController ) { }


  public ConvertObjectToArray(snapshot: any) {
     
    var mapSnapshot = Object.keys(snapshot).map(function (arrayIndex) {
      let itemArray = snapshot[arrayIndex];
      return itemArray;
    });
    
    var resultArray:Array<any>=[];

    mapSnapshot.forEach(element => {
      resultArray.push(element);
    });

    return resultArray;
  }

  public ConsoleLog(message:string, value:any)
  {
    //debugger;
    console.log(message +": "+ JSON.stringify(value));
  }

 
  public  async presentAlert(message:string, title:string) {
    const alert = await this.alertController.create({
      header: 'Aviso!',
      subHeader: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
