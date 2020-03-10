import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { IonicModule } from '@ionic/angular';
import { SaleskitPage } from './saleskit.page';
import { ModalbuPage } from '../modalbu/modalbu.page';
import { NgArrayPipesModule, NgPipesModule, UniquePipe } from 'ngx-pipes';

import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';
import { NgCircleProgressModule } from 'ng-circle-progress';


const routes: Routes = [
  {
    path: '',
    component: SaleskitPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgArrayPipesModule,
    NgPipesModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
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
    IonicModule,
    SwiperModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SaleskitPage ],
  providers: [
    UniquePipe
  ],
})
export class SaleskitPageModule {}
