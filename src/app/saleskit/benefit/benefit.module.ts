import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { IonicModule } from '@ionic/angular';
import { NgArrayPipesModule, NgPipesModule, UniquePipe } from 'ngx-pipes';
import { BenefitPage } from './benefit.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const routes: Routes = [
  {
    path: '',
    component: BenefitPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgArrayPipesModule,
    NgPipesModule,
    SwiperModule,
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
    RouterModule.forChild(routes)
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    UniquePipe
  ],
  declarations: [BenefitPage]
})
export class BenefitPageModule {}
