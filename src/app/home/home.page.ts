import { Component } from '@angular/core';
import { IonItemSliding, AlertController } from "@ionic/angular";
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../models/User';
import { DbServiceService, DbFireBaseParkingUsageService, DbFireBaseParkingService, DbFireBaseServiceService } from "../services/export-services";
import { ParkingUsage, Parking } from '../models/export-models';
import { CommonMethodsModule, NewDayModule } from '../modules/export-modules';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  private subscriptioParking: Subscription;
  public user: User;
  public usagesParking: ParkingUsage;
  public parkingAvailable: Array<Parking>;
  public spliceBranch: Array<Parking[]>;

  constructor(private router: Router,
    private dbFireServiceUsage: DbFireBaseParkingUsageService,
    private dbFireServiceParking: DbFireBaseParkingService,
    private dbFireBaseService: DbFireBaseServiceService,
    private alertController: AlertController,
    private commonMethods: CommonMethodsModule, private newDay: NewDayModule,
    private localDb: DbServiceService) {

    this.usagesParking =
      {
        Free: 0,
        Used: 0
      }

    this.parkingAvailable = [];
    this.spliceBranch = [];
  }

  ngOnInit() {

    this.commonMethods.ConsoleLog("Entro ngOnInit:", {});
    this.newDay.SetDay().then((result) => { if (result) { window.location.reload(); } });
  }

  GetParkingUsage() {
    this.commonMethods.ConsoleLog("Entro GetParkingUsage:", {});

    this.subscriptioParking = this.dbFireServiceParking.GetParkings(this.user.BranchId)
      .subscribe(snapshot => {
        
        this.parkingAvailable = this.commonMethods.ConvertObjectToArray(snapshot);

        var list:Parking[] = this.commonMethods.ConvertObjectToArray(this.parkingAvailable)

        list = list.filter(x =>{
          return x.BranchId == this.user.BranchId;
        })
        
        this.parkingAvailable = list;
        this.commonMethods.ConsoleLog("Entro GetParkings",  this.parkingAvailable);

        this.commonMethods.ConsoleLog("Entro dbFireServiceParking.GetParkings", {});
        this.dbFireServiceUsage.GetParkingUsage(this.user).then(result => {
          this.commonMethods.ConsoleLog("Entro dbFireServiceUsage.GetParkingUsage:", {});
          this.usagesParking = result;
          this.usagesParking.Free = this.parkingAvailable.length - result.Used;

          this.spliceBranch = this.spliceArray();
        });
      });

  }

  spliceArray(): Array<Parking[]> {

    var arrays: Array<Parking[]> = [], size = 5;
    var cloneParkingBranch: Array<Parking> = [];
    this.parkingAvailable.forEach(element => {
      cloneParkingBranch.push(element);
    });

    while (cloneParkingBranch.length > 0) {
      var subArray = cloneParkingBranch.splice(0, size);
      arrays.push(subArray);
    }

    return arrays;
  }

  GetParkingList() {
    console.log('Clicked')

    /*this.router.navigate(["parking-list"]);*/
  }

  TakeSpot(slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(["register-parking"]);
  }

  BreakFreeSpot(slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(["set-break-free-spot"]);
  }

  ionViewDidLeave() {
    this.commonMethods.ConsoleLog("ionViewDidLeave home ", {});
    this.subscriptioParking.unsubscribe();
  }

  ionViewWillEnter() {
    this.commonMethods.ConsoleLog("ionViewWillEnter  home ", {});

    this.localDb.GetUser().then(usr => {
      this.user = usr;
      this.GetParkingUsage();
    });
  }
  ngOnDestroy() {
    this.commonMethods.ConsoleLog("ngOnDestroy home ", {});
  }

  GetUsedBy(parkingLot: Parking) {
    
    if (parkingLot.IsUsed) {
      this.commonMethods.ConsoleLog("Used By", parkingLot.ParkingLotId);

      this.dbFireServiceUsage.GetParkinglotById(parkingLot.ParkingLotId).then((result: any) => {
        this.commonMethods.ConsoleLog("Parking used by: ", result);
        
        let unknowResult = this.commonMethods.ConvertObjectToArray(result);

        let user: User = {
          UserId: unknowResult[0].UserId
        };

        this.dbFireBaseService.GetUser(user).then((usr) => {

          this.commonMethods.presentAlert("Espacio usado por: " + usr.FirstName + " " + usr.LastName + " con skype: " + usr.Skype
            + " y placa: " + unknowResult[0].Plate.toUpperCase(),
            " Parqueadero: " + parkingLot.ParkingNumber);
        });
      })
    }
    else {
      this.ShowModalToRegisterParking(parkingLot.ParkingLotId, parkingLot.ParkingNumber.toString());
    }
  }

  async ShowModalToRegisterParking(parkingLotId: number, parkingNumber: string) {

    const alert = await this.alertController.create({
      header: 'Aviso!',
      subHeader: 'Registrar parqueader',
      message: 'Esta Seguro que desea registrar el parqueadero: <strong>' + parkingNumber +'</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Registrar',
          handler: () => {
            console.log('Confirm Okay');
            
            let navigationExtras: NavigationExtras = {
              queryParams: {
                special: JSON.stringify({ParkingLotId: parkingLotId})
              }
            };
            this.router.navigate(["register-parking"], navigationExtras);
          }
        }
      ]
    });

    await alert.present();
  }

}
