import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgArrayPipesModule, NgPipesModule, UniquePipe } from 'ngx-pipes';

import { IonicModule } from '@ionic/angular';

import { SamconceptPage } from './samconcept.page';

const routes: Routes = [
  {
    path: '',
    component: SamconceptPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgArrayPipesModule,
    NgPipesModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SamconceptPage],
  providers: [UniquePipe]
})
export class SamconceptPageModule {}
