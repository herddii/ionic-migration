import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
import { NgArrayPipesModule, NgPipesModule, UniquePipe } from 'ngx-pipes';
import { AddFilePage } from './add-file.page';

const routes: Routes = [
  {
    path: '',
    component: AddFilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgArrayPipesModule,
    NgPipesModule,
    IonicModule,
    IonicSelectableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddFilePage],
  providers: [
    UniquePipe
  ]
})
export class AddFilePageModule {}
