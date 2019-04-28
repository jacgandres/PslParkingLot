import { Component, OnInit } from '@angular/core';
import { DbFireBaseServiceService, DbServiceService } from 'src/app/services/export-services';
import { User } from 'src/app/models/export-models';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform } from '@ionic/angular';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user: User;
  public appVersionInfo: any;

  constructor(private dbFireBaseService: DbFireBaseServiceService,
    private router:Router,
    private platform: Platform,
    private localDb: DbServiceService,
    private appVersion: AppVersion) { }

  ngOnInit() {

    this.user = {};
    this.appVersionInfo = {};

    this.localDb.GetUser().then(usr => {
      this.user = usr;
    });

    this.GetAppVersion();
  }
  GetAppVersion() {

    if (this.platform.is('cordova')) {
      this.appVersion.getAppName().then((result) => {
        this.appVersionInfo.AppName =  result;
      });
      this.appVersion.getPackageName().then((result) => {
        this.appVersionInfo.PackageName =  result;
      });
      this.appVersion.getVersionCode().then((result) => {
        this.appVersionInfo.VersionCode = result;
      });
      this.appVersion.getVersionNumber().then((result) => {
        this.appVersionInfo.VersionNumber = result;
      });
    }
    else {
      this.appVersionInfo = {
        AppName: " Parking Lot",
        PackageName: " Master",
        VersionCode: " B-1001",
        VersionNumber: " 1.0.0.1",
      };
    }
  }

  ionViewDidLeave() {
  }

  Return() {
    this.router.navigate(["home"]);
  }

}
