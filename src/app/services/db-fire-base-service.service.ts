import {AngularFireDatabase  } from '@angular/fire/database'; 
import { DatePipe } from '@angular/common'

import {Injectable }from '@angular/core'; 
import { isNullOrUndefined } from 'util';
import { User, Branch, ParkingUsage } from '../models/export-models';
import { Subscription } from 'rxjs/internal/Subscription'; 

@Injectable({
  providedIn: 'root'
})
export class DbFireBaseServiceService {
  

  private dateTime:string;
  private subscriptionUser:Subscription;
  private subscriptionDate:Subscription;
  private subscriptionBranch:Subscription;

  constructor(private afDB:AngularFireDatabase,public datepipe: DatePipe) 
  {  
    this.FormatStandarDate();
  }

  FormatStandarDate(){ 
    this.dateTime =this.datepipe.transform(new Date(), 'MM-dd-yyyy');
   }

  GetUser(user:User):Promise<User>
  { 
    return new Promise((assert)=>{ 
         let strRef ="/Users/"+user.UserId;
         this.subscriptionUser =  this.afDB.object(strRef)
                                .valueChanges()
                                .subscribe(snapshot =>{ 
                                    
                                    if(isNullOrUndefined(snapshot))
                                    {
                                      this.SetUser(user).then(result =>{
                                        this.subscriptionUser.unsubscribe();
                                        assert(result);
                                      })
                                    }
                                    else
                                    {
                                      let value = snapshot;
                                      this.subscriptionUser.unsubscribe();
                                      assert(value);
                                    }
                                }); 
    })
  }

  SetUser(user:User)
  {
    return new Promise((assert,reject)=>{  
        let strRef ="/Users/"+user.UserId;
        this.afDB.object(strRef).set(user).then(() =>{  
            console.log("Se adiciono correctamente");
            assert(user);
        }).catch(error =>{
            
            console.log("No se adiciono correctamente");
            reject(error);
        });
    });
  }

  GetParkingUsage():Promise<ParkingUsage> {
      return new Promise((assert)=>{
          let strRef ="/Dates/"+ this.dateTime;
          this.subscriptionDate =  this.afDB.object(strRef)
                                .valueChanges()
                                .subscribe(snapshot =>{  
                                  debugger;
                                  /*
                                    snapshot.forEach(function (value) {
                                        console.log(value);
                                    });
                                  */
                                }); 
      });
  }
  
  GetBranches():Promise<Branch[]> {
      return new Promise((resolve) =>{
      
          let strRef ="/Branches"
          this.subscriptionBranch =  this.afDB.object(strRef)
                                  .valueChanges()
                                  .subscribe(snapshot =>{ 
                                       
                                      let list:Branch[] = this.ConvertObjectBranchToArray(snapshot);
                                      this.subscriptionBranch.unsubscribe();
                                      resolve(list);
                                  });
      });
  }

  ConvertObjectBranchToArray(snapshot:any){ 
    var resultArray = Object.keys(snapshot).map(function(branchIndex){ 
            let branches = snapshot[branchIndex]; 
            return branches;
      });
 
    return resultArray;
  }
}
