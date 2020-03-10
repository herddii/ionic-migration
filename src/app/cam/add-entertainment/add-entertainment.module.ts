import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { AddEntertainmentPage } from './add-entertainment.page';
import { ImageResizer } from '@ionic-native/image-resizer/ngx';

const routes: Routes = [
  {
    path: '',
    component: AddEntertainmentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddEntertainmentPage],
  providers: [
    ImageResizer
  ]
})
export class AddEntertainmentPageModule {}
