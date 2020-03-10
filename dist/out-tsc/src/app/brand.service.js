import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
var BrandService = /** @class */ (function () {
    function BrandService(http, storage) {
        this.http = http;
        this.storage = storage;
        this.url = 'http://10.22.253.64:8010/api/';
    }
    BrandService.prototype.get_brand = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('token').then(function (value) {
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'Bearer ' + value);
                _this.http.get(_this.url + 'get_brand_portal', { headers: headers }).pipe(map(function (res) { return res.json(); }))
                    .subscribe(function (data) {
                    resolve(data);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    BrandService.prototype.get_program = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('token').then(function (value) {
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'Bearer ' + value);
                _this.http.get(_this.url + 'get_program_portal', { headers: headers }).pipe(map(function (res) { return res.json(); }))
                    .subscribe(function (data) {
                    resolve(data);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    BrandService.prototype.get_brand_campaign = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('token').then(function (value) {
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'Bearer ' + value);
                _this.http.get(_this.url + 'get_brand_campaign', { headers: headers }).pipe(map(function (res) { return res.json(); }))
                    .subscribe(function (data) {
                    resolve(data);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    BrandService.prototype.get_consumer_insight = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('token').then(function (value) {
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'Bearer ' + value);
                _this.http.get(_this.url + 'get_consumer_insight', { headers: headers }).pipe(map(function (res) { return res.json(); }))
                    .subscribe(function (data) {
                    resolve(data);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    BrandService.prototype.get_social_media = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('token').then(function (value) {
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', 'Bearer ' + value);
                _this.http.get(_this.url + 'get_social_media', { headers: headers }).pipe(map(function (res) { return res.json(); }))
                    .subscribe(function (data) {
                    resolve(data);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    BrandService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Http,
            Storage])
    ], BrandService);
    return BrandService;
}());
export { BrandService };
//# sourceMappingURL=brand.service.js.map