import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonMethodsModule } from 'src/app/modules/common-methods/common-methods.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, Parking, UsedParkingLot } from 'src/app/models/export-models';
import { DbServiceService, DbFireBaseParkingService, DbFireBaseParkingUsageService } from 'src/app/services/export-services';
import { isNullOrUndefined } from 'util';
import { Subscription } from 'rxjs/internal/Subscription';
 

@Component({
  selector: 'app-register-parking',
  templateUrl: './register-parking.page.html',
  styleUrls: ['./register-parking.page.scss'],
})
export class RegisterParkingPage implements OnInit {
  
  public paramShowFields = true;
  public paramParkingLotId:string= null;
  public parkinForm: FormGroup;
  public user: User
  public parkingLot: Parking[];

  constructor(private router: Router, private route: ActivatedRoute,
    private commonMethods: CommonMethodsModule,
    private dbFireServiceParking: DbFireBaseParkingService,
    private dbFireServiceUsedParking: DbFireBaseParkingUsageService,
    private dbLocal: DbServiceService) {

    this.parkinForm = new FormGroup({
      parkinGroup: new FormGroup({
        plate: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
        parkingId: new FormControl('', Validators.required ),
        paramOption: new FormControl('' ),
      })
    });

    this.parkingLot = [];
  }

  ngOnInit() {
  }

  ionViewWillEnter (){
    this.route.queryParams.subscribe(params => { 
      this.commonMethods.ConsoleLog("this.route.queryParams", params);
      if (params && params.special) {
        let parameter = JSON.parse(params.special); 
        this.paramParkingLotId = parameter.ParkingLotId; 
        this.paramShowFields = false;
      }
    }); 
  }

  ionViewDidLeave() {
    this.commonMethods.ConsoleLog("ionViewDidLeave register parking ", {}); 
    this.cleanForm();
  }

  ionViewDidEnter (){ 
    this.dbLocal.GetUser().then(usr => {   
      this.user = usr;
      this.dbFireServiceParking.GetParkingByFilters(usr.BranchId)
        .then(snapshot => {  
          let list: Parking[] = this.commonMethods.ConvertObjectToArray(snapshot); 
          this.ValidateIfUserAlreadyHaveUsedParkingLot().then(result =>{  
            if(result)
            {
              this.commonMethods.ConsoleLog("ValidateIfUserAlreadyHaveUsedParkingLot ", result);
              this.parkingLot = list.filter(item =>  item.IsUsed == false ); 
              this.parkinForm.controls['parkinGroup'].get("plate").setValue(this.user.Plate.toUpperCase());
              if(!isNullOrUndefined(this.paramParkingLotId))
              {
                this.parkinForm.controls['parkinGroup'].get('parkingId').setValue(this.paramParkingLotId);
                this.parkinForm.controls['parkinGroup'].get('paramOption').setValue(this.paramParkingLotId);
              }
            }
            else
            {
              this.commonMethods.presentAlert("Ya tiene asignado un parqueadero","");
              this.Return();
            }
          })
        });
    });
  }

  ValidateIfUserAlreadyHaveUsedParkingLot():Promise<boolean> {
    return new Promise<boolean>((resolve) =>{
      this.dbFireServiceUsedParking.GetParkingUsageByUserId(this.user.UserId).then(result =>{
          resolve(isNullOrUndefined(result));    
      })
    })
  }

  Return() {
    this.router.navigate(["home"]);
  }


  cleanForm() {
    this.parkinForm.controls['parkinGroup'].get("plate").setValue("");
  }

  onSubmit(){
 
    this.getParking(this.parkinForm.controls['parkinGroup'].get("parkingId").value).then( (result:Parking )=>{ 
        let parking = result;
        parking.IsUsed = true;
        this.UpdateParking(parking).then(()=>{
          let usedParkingLotModel = this.getModelFromForm(); 
          this.dbFireServiceUsedParking.SetDateUsedParking(usedParkingLotModel).then(()=>{
            this.Return();
          })
        });  
    });

  }

  UpdateParking(parking: Parking) {
    return this.dbFireServiceParking.UpdateParking(parking);
  }

  getParking(parkingId:string) {
    return new Promise((resolve) => { 
      this.dbFireServiceParking.GetParkingById(parkingId).then( (parking:Parking) =>{
          resolve(parking)
      })
    })
  }

  getModelFromForm(){  
    let model:UsedParkingLot = 
    {
      BranchId: this.user.BranchId,
      IsParked : true,
      Plate : this.parkinForm.controls['parkinGroup'].get("plate").value,
      ParkingLotId : parseInt(this.parkinForm.controls['parkinGroup'].get("parkingId").value),
      UserId : this.user.UserId
    } 

    return model;
  }
  
  ngOnDestroy(){
    this.commonMethods.ConsoleLog("ngOnDestroy register parking ", {}); 
  }
}
