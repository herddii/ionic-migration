import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CalendarModule } from "ion2-calendar";
import { MonthlyPage } from './monthly.page';
var routes = [
    {
        path: '',
        component: MonthlyPage
    }
];
var MonthlyPageModule = /** @class */ (function () {
    function MonthlyPageModule() {
    }
    MonthlyPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                CalendarModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MonthlyPage]
        })
    ], MonthlyPageModule);
    return MonthlyPageModule;
}());
export { MonthlyPageModule };
//# sourceMappingURL=monthly.module.js.map