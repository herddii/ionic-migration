import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
// import { CountToModule } from 'angular-count-to';
import { ReimbursePage } from './reimburse.page';
import { CountoModule }  from 'angular2-counto';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  autoHeight: false,
  height: 200
};
const routes: Routes = [
  {
    path: '',
    component: ReimbursePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    SwiperModule,
    FormsModule,
    CountoModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReimbursePage],
  providers: [{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }]
})
export class ReimbursePageModule {}
