import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { BrandService } from '../brand.service';
import { DomSanitizer } from '@angular/platform-browser';
var AwalanPage = /** @class */ (function () {
    function AwalanPage(brand, dom) {
        this.brand = brand;
        this.dom = dom;
        this.slideOpt = {
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            loop: true,
            flipEffect: {
                rotate: 30,
                slideShadows: false
            }
        };
        this.slideOpt_prgm = {
            slidesPerView: 2,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        };
        this.slideOpt_brand = {
            slidesPerView: 1.2,
            spaceBetween: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        };
        this.clickable = 0;
        this.a = 0;
        this.b = [];
        this.c = 0;
        this.d = [];
        this.e = 0;
        this.f = [];
        this.g = [];
        this.h = [];
        this.i = 0;
        this.j = [];
        this.jk = [];
        this.jl = 0;
        this.k = [];
        this.kk = [];
        this.kl = 0;
        this.getbrand();
    }
    AwalanPage.prototype.ngOnInit = function () {
    };
    AwalanPage.prototype.searchbegin = function () {
        this.clickable++;
        if (this.clickable % 2 == 0) {
            this.a = 0;
        }
        else {
            this.a = 1;
        }
    };
    AwalanPage.prototype.test = function () {
        this.a = 0;
    };
    AwalanPage.prototype.getbrand = function () {
        var _this = this;
        this.brand.get_brand().then(function (data) {
            _this.b = data;
            _this.c = 1;
        });
        setTimeout(function () {
            _this.get_program();
        }, 1000);
    };
    AwalanPage.prototype.get_program = function () {
        var _this = this;
        this.brand.get_program().then(function (data) {
            _this.d = data;
            var de = _this.d.filter(function (x) {
                return x.program;
            });
            _this.f = de;
            _this.e = 1;
            console.log(_this.f);
            setTimeout(function () {
                _this.get_brand_campaign();
            }, 1000);
        });
    };
    AwalanPage.prototype.get_image = function (value) {
        return 'http://mncmediakit.com/datafile/thumbnail/' + value.hotspot[0].id_filetype + '/' + value.hotspot[0].content_file_download;
    };
    AwalanPage.prototype.get_brand_campaign = function () {
        var _this = this;
        this.brand.get_brand_campaign().then(function (data) {
            _this.g = data;
            var ef = _this.g.filter(function (x) {
                return x;
            });
            _this.h = ef;
            _this.i = 1;
            setTimeout(function () {
                _this.get_comsumer_insight();
            }, 1000);
        });
    };
    AwalanPage.prototype.get_comsumer_insight = function () {
        var _this = this;
        this.brand.get_consumer_insight().then(function (data) {
            _this.j = data;
            var je = _this.j.filter(function (x) {
                return x;
            });
            _this.jk = je;
            _this.jl = 1;
            setTimeout(function () {
                _this.get_social_media();
            }, 1000);
        });
    };
    AwalanPage.prototype.get_social_media = function () {
        var _this = this;
        this.brand.get_social_media().then(function (data) {
            console.log(data);
            _this.k = data;
            var ke = _this.k.filter(function (x) {
                return x;
            });
            _this.kk = ke;
            _this.kl = 1;
        });
    };
    AwalanPage.prototype.transform = function (value) {
        // let y = value;
        var z = value.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
        return this.dom.bypassSecurityTrustResourceUrl(z);
    };
    AwalanPage = __decorate([
        Component({
            selector: 'app-awalan',
            templateUrl: './awalan.page.html',
            styleUrls: ['./awalan.page.scss'],
        }),
        __metadata("design:paramtypes", [BrandService,
            DomSanitizer])
    ], AwalanPage);
    return AwalanPage;
}());
export { AwalanPage };
//# sourceMappingURL=awalan.page.js.map