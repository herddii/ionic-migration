import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { DownloadPage } from './download.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCircleProgressModule.forRoot({
      "backgroundColor": "#ee3542",
      "radius": 30,
      "maxPercent": 100,
      "unitsColor": "#ffffff",
      "outerStrokeWidth": 1,
      "outerStrokeColor": "#FFFFFF",
      "innerStrokeColor": "#FFFFFF",
      "titleColor": "#ffffff",
      "subtitleColor": "#ffffff",
      "showSubtitle": false,
      "showInnerStroke": false,
      "startFromZero": false
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [DownloadPage]
})
export class DownloadPageModule {}
