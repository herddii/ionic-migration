import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CalendarModule } from "ion2-calendar";
import { MonthlyPage } from './monthly.page';
import { SharedModule } from '../../shared.module';
import { NgCalendarModule  } from 'ionic2-calendar';

const routes: Routes = [
  {
    path: '',
    component: MonthlyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CalendarModule,
    IonicModule,
    NgCalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonthlyPage]
})
export class MonthlyPageModule {}
