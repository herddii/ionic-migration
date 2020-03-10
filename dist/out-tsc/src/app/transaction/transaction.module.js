import { __decorate } from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionPage } from './transaction.page';
import { CalendarModule } from "ion2-calendar";
import { SharedModule } from '../shared.module';
// import { ScrollHideDirective } from '../scroll-hide.directive';
var TransactionPageModule = /** @class */ (function () {
    function TransactionPageModule() {
    }
    TransactionPageModule = __decorate([
        NgModule({
            imports: [
                IonicModule,
                SharedModule,
                CommonModule,
                FormsModule,
                CalendarModule,
                RouterModule.forChild([{ path: '', component: TransactionPage }])
            ],
            declarations: [TransactionPage]
        })
    ], TransactionPageModule);
    return TransactionPageModule;
}());
export { TransactionPageModule };
//# sourceMappingURL=transaction.module.js.map