import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
var TransactionPage = /** @class */ (function () {
    function TransactionPage(actionSC) {
        this.actionSC = actionSC;
        this.footerScrollConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
        this.headerScrollConfig = { cssProperty: 'margin-top', maxValue: 60 };
        this.number = 0;
        this.myn = new Date();
    }
    TransactionPage.prototype.ngOnInit = function () {
        var month = '' + (this.myn.getMonthName() + 1);
        var day = '' + this.myn.getDate();
        var year = this.myn.getFullYear();
        var xc = this.myn.toLocaleString('default', { month: 'long' });
        console.log(xc);
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        this.showdate = [year, month, day].join('-');
    };
    TransactionPage.prototype.segmentChanged = function (ev) {
        this.segment = ev.detail.value;
    };
    TransactionPage.prototype.ActiveClick = function (event) {
        var g = event + 1;
        this.number = g;
        if (g % 2 == 0) {
            this.clickActive = 1;
            document.getElementById('gantiback').style.backgroundColor = 'gray';
        }
        else {
            document.getElementById('gantiback').style.background = 'white';
            this.clickActive = 0;
        }
    };
    TransactionPage.prototype.presentView = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSC.create({
                            buttons: [{
                                    text: 'Year',
                                    // role: 'destructive',
                                    // icon: 'trash',
                                    handler: function () {
                                        console.log('Delete clicked');
                                    }
                                }, {
                                    text: 'Day',
                                    // icon: 'today',
                                    handler: function () {
                                        console.log('Share clicked');
                                    }
                                }, {
                                    text: 'Week',
                                    // icon: 'calendar',
                                    handler: function () {
                                        console.log('Play clicked');
                                    }
                                }, {
                                    text: 'Month',
                                    // icon: 'calendar',
                                    handler: function () {
                                        console.log('Favorite clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TransactionPage = __decorate([
        Component({
            selector: 'app-transaction',
            templateUrl: './transaction.page.html',
            styleUrls: ['./transaction.page.scss'],
        }),
        __metadata("design:paramtypes", [ActionSheetController])
    ], TransactionPage);
    return TransactionPage;
}());
export { TransactionPage };
//# sourceMappingURL=transaction.page.js.map