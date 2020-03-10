import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';
import { NgArrayPipesModule, NgPipesModule, UniquePipe } from 'ngx-pipes';

import { ModalsamPage } from './modalsam.page';

const routes: Routes = [
  {
    path: '',
    component: ModalsamPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgArrayPipesModule,
    NgPipesModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalsamPage],
  providers: [UniquePipe]
})
export class ModalsamPageModule {}
