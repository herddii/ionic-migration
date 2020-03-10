import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { IonicModule } from '@ionic/angular';

import { PhotoviewerPage } from './photoviewer.page';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  autoHeight: false,
  height: 200
};
const routes: Routes = [
  {
    path: '',
    component: PhotoviewerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhotoviewerPage]
})
export class PhotoviewerPageModule {}
