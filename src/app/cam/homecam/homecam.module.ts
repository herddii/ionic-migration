import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomecamPage } from './homecam.page';

const routes: Routes = [
  {
    path: '',
    component: HomecamPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: HomecamPage }])
  ],
  declarations: [HomecamPage]
})
export class HomecamPageModule {}
