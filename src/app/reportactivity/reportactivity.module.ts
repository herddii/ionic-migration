import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgArrayPipesModule, NgPipesModule, UniquePipe } from 'ngx-pipes';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ReportactivityPage } from './reportactivity.page';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  autoHeight: false,
  height: 200
};
const routes: Routes = [
  {
    path: '',
    component: ReportactivityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    NgArrayPipesModule,
    NgPipesModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReportactivityPage],
  providers: [
    UniquePipe,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class ReportactivityPageModule {}
