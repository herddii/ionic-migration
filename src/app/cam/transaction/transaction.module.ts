import { IonicModule } from '@ionic/angular';
import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionPage } from './transaction.page';
import { CalendarModule } from "ion2-calendar";
import { NgArrayPipesModule, NgPipesModule } from 'ngx-pipes';
import { NgCalendarModule  } from 'ionic2-calendar';
import { PopoverComponent } from '../../popover/popover.component';
import { popoverController } from '@ionic/core';

// import { NgPipesModule } from 'ngx-pipes';
// import { ScrollHideDirective } from '../scroll-hide.directive';
const routes: Routes = [
  {
    path: '',
    component: TransactionPage
  }
];
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CalendarModule,
    NgPipesModule,
    NgCalendarModule,
    NgArrayPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransactionPage],
})
export class TransactionPageModule {}
