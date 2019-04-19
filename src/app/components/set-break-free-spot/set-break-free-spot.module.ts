import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SetBreakFreeSpotPage } from './set-break-free-spot.page';

const routes: Routes = [
  {
    path: '',
    component: SetBreakFreeSpotPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SetBreakFreeSpotPage]
})
export class SetBreakFreeSpotPageModule {}
