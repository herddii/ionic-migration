import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AwalanPage } from './awalan.page';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
};
const routes: Routes = [
  {
    path: '',
    component: AwalanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AwalanPage],
  providers: [{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }]
})
export class AwalanPageModule {}
