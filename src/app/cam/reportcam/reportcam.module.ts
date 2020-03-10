import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { IonicModule } from '@ionic/angular';
import { NgArrayPipesModule, NgPipesModule } from 'ngx-pipes';
import { ReportcamPage } from './reportcam.page';

const routes: Routes = [
  {
    path: '',
    component: ReportcamPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgArrayPipesModule,
    NgPipesModule,
    IonicModule,
    Ionic4DatepickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReportcamPage]
})
export class ReportcamPageModule {}
