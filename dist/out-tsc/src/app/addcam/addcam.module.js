import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// import { IonicSelectableModule } from 'ionic-selectable';
import { IonicSelectableModule } from 'ionic-selectable';
import { AddcamPage } from './addcam.page';
var routes = [
    {
        path: '',
        component: AddcamPage
    }
];
var AddcamPageModule = /** @class */ (function () {
    function AddcamPageModule() {
    }
    AddcamPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicSelectableModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddcamPage]
        })
    ], AddcamPageModule);
    return AddcamPageModule;
}());
export { AddcamPageModule };
//# sourceMappingURL=addcam.module.js.map