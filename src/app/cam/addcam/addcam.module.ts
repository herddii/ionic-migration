import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// import {image} from 'image-to-base64';
import { IonicModule } from '@ionic/angular';
// import { IonicSelectableModule } from 'ionic-selectable';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { NgArrayPipesModule, NgPipesModule, UniquePipe } from 'ngx-pipes';
import { AddcamPage } from './addcam.page';
import { ImageResizer } from '@ionic-native/image-resizer/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
// import { FiletaskmodalPage } from '../filetaskmodal/filetaskmodal.page';
// import { GrouppipePipe } from '../../pipes/group/GrouppipePipe';

const routes: Routes = [
  {
    path: '',
    component: AddcamPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgArrayPipesModule,
    NgPipesModule,
    Ionic4DatepickerModule,
    IonicSelectableModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddcamPage],
  providers: [
    UniquePipe,
    ImageResizer,
    ImagePicker
  ]
})
export class AddcamPageModule {}
