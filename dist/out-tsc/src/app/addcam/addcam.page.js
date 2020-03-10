import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
var AddcamPage = /** @class */ (function () {
    function AddcamPage() {
        this.cam = {
            activity: '',
            startTime: '',
            endTime: '',
            allDay: false,
            picam: null,
            partner: '',
            agency: '',
            advertiser: '',
            brand: '',
            variant: '',
            client: '',
            subject: '',
            desc: '',
            potency: ''
        };
        this.titletypereport = 'Planning';
        this.minDate = new Date().toISOString();
    }
    AddcamPage.prototype.ngOnInit = function () {
    };
    AddcamPage = __decorate([
        Component({
            selector: 'app-addcam',
            templateUrl: './addcam.page.html',
            styleUrls: ['./addcam.page.scss'],
        }),
        __metadata("design:paramtypes", [])
    ], AddcamPage);
    return AddcamPage;
}());
export { AddcamPage };
//# sourceMappingURL=addcam.page.js.map