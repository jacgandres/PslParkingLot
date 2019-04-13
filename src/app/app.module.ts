import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonMethodsModule } from "../app/modules/common-methods/common-methods.module";
import { FireBaseConfig } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { DatePipe } from '@angular/common'

import { NativeStorage } from '@ionic-native/native-storage/ngx'; 
  

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  
    AppRoutingModule,
    AngularFireModule.initializeApp(FireBaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CommonMethodsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
