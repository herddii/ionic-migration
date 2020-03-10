import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { IonicModule } from '@ionic/angular';
import { NgArrayPipesModule, NgPipesModule, UniquePipe } from 'ngx-pipes';
import { SharedModule } from '../../shared.module';
import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
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
  declarations: [HomePage],
  providers: [
    UniquePipe
  ]
})
export class HomePageModule {}
