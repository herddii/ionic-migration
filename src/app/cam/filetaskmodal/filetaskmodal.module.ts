import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FiletaskmodalPage } from './filetaskmodal.page';

const routes: Routes = [
  {
    path: '',
    component: FiletaskmodalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FiletaskmodalPage]
})
export class FiletaskmodalPageModule {}
