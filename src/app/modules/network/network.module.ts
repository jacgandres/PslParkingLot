import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Network } from '@ionic-native/network/ngx'; 
import { Subscription } from 'rxjs/internal/Subscription';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class NetworkModule {

  public conectSubscription:Subscription;
  public disconectSubscription:Subscription;

  constructor(private network: Network) {

  }
 
  public GetNetworkConectState(){
    this.conectSubscription = this.network.onConnect()
                                    .subscribe(()=>{
                                      console.log("Se conecto NetworkModule")
                                    })
  }

  public GetNetworkDisConectState(){
    this.conectSubscription = this.network.onDisconnect()
                                    .subscribe(()=>{ 
                                      console.log("Se desconecto NetworkModule");
                                    })
  }
}
