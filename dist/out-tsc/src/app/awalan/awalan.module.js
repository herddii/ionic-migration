import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AwalanPage } from './awalan.page';
var routes = [
    {
        path: '',
        component: AwalanPage
    }
];
var AwalanPageModule = /** @class */ (function () {
    function AwalanPageModule() {
    }
    AwalanPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AwalanPage]
        })
    ], AwalanPageModule);
    return AwalanPageModule;
}());
export { AwalanPageModule };
//# sourceMappingURL=awalan.module.js.map