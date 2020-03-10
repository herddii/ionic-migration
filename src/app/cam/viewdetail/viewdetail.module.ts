import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared.module';

import { IonicModule } from '@ionic/angular';

import { ViewdetailPage } from './viewdetail.page';

const routes: Routes = [
  {
    path: '',
    component: ViewdetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewdetailPage]
})
export class ViewdetailPageModule {}
