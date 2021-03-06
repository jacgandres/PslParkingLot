import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
 

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonMethodsModule, NewDayModule } from "../app/modules/export-modules"; 
import { FireBaseConfig } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { DatePipe } from '@angular/common'

import { NativeStorage } from '@ionic-native/native-storage/ngx';  
import { AppVersion } from "@ionic-native/app-version/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  
    AppRoutingModule,
    CommonModule,  NewDayModule,  
    AngularFireModule.initializeApp(FireBaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CommonMethodsModule 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    NativeStorage,AppVersion,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor( ){ 
  }

}
