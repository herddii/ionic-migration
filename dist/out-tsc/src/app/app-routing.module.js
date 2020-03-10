import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'awalan', loadChildren: './awalan/awalan.module#AwalanPageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'addcam', loadChildren: './addcam/addcam.module#AddcamPageModule' },
    { path: 'monthly', loadChildren: './monthly/monthly.module#MonthlyPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map