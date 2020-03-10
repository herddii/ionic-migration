import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { ImageResizer } from '@ionic-native/image-resizer/ngx';
import { IonicModule } from '@ionic/angular';
import { NgArrayPipesModule, NgPipesModule, UniquePipe } from 'ngx-pipes';

import { EditcamPage } from './editcam.page';

const routes: Routes = [
  {
    path: '',
    component: EditcamPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicSelectableModule,
    FormsModule,
    NgArrayPipesModule,
    NgPipesModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditcamPage],
  providers: [
    UniquePipe,
    ImageResizer
  ]
})
export class EditcamPageModule {}
