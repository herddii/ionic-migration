import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ImageResizer } from '@ionic-native/image-resizer/ngx';
import { InputclientPage } from './inputclient.page';

const routes: Routes = [
  {
    path: '',
    component: InputclientPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    RouterModule.forChild(routes)
  ],
  declarations: [InputclientPage],
  providers: [
    ImageResizer
  ]
})
export class InputclientPageModule {}
