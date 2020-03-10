import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { IonContent, DomController } from '@ionic/angular';
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
var ScrollHideDirective = /** @class */ (function () {
    function ScrollHideDirective(element, renderer, domCtrl) {
        this.element = element;
        this.renderer = renderer;
        this.domCtrl = domCtrl;
        this.lastValue = 0;
    }
    ScrollHideDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.scrollContent && this.config) {
            this.scrollContent.scrollEvents = true;
            var scrollStartFunc = function (ev) { return __awaiter(_this, void 0, void 0, function () {
                var el;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.scrollContent.getScrollElement()];
                        case 1:
                            el = _a.sent();
                            this.contentHeight = el.offsetHeight;
                            this.scrollHeight = el.scrollHeight;
                            if (this.config.maxValue === undefined) {
                                this.config.maxValue = this.element.nativeElement.offsetHeight;
                            }
                            this.lastScrollPosition = el.scrollTop;
                            return [2 /*return*/];
                    }
                });
            }); };
            if (this.scrollContent && this.scrollContent instanceof IonContent) {
                this.scrollContent.ionScrollStart.subscribe(scrollStartFunc);
                this.scrollContent.ionScroll.subscribe(function (ev) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, this.adjustElementOnScroll(ev)];
                }); }); });
                this.scrollContent.ionScrollEnd.subscribe(function (ev) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, this.adjustElementOnScroll(ev)];
                }); }); });
            }
            else if (this.scrollContent instanceof HTMLElement) {
                this.scrollContent.addEventListener('ionScrollStart', scrollStartFunc);
                this.scrollContent.addEventListener('ionScroll', function (ev) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, this.adjustElementOnScroll(ev)];
                }); }); });
                this.scrollContent.addEventListener('ionScrollEnd', function (ev) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, this.adjustElementOnScroll(ev)];
                }); }); });
            }
        }
    };
    ScrollHideDirective.prototype.adjustElementOnScroll = function (ev) {
        var _this = this;
        if (ev) {
            this.domCtrl.write(function () { return __awaiter(_this, void 0, void 0, function () {
                var el, scrollTop, scrolldiff, newValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.scrollContent.getScrollElement()];
                        case 1:
                            el = _a.sent();
                            scrollTop = el.scrollTop > 0 ? el.scrollTop : 0;
                            scrolldiff = scrollTop - this.lastScrollPosition;
                            this.lastScrollPosition = scrollTop;
                            newValue = this.lastValue + scrolldiff;
                            newValue = Math.max(0, Math.min(newValue, this.config.maxValue));
                            this.renderer.setStyle(this.element.nativeElement, this.config.cssProperty, "-" + newValue + "px");
                            this.lastValue = newValue;
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    __decorate([
        Input('scrollHide'),
        __metadata("design:type", Object)
    ], ScrollHideDirective.prototype, "config", void 0);
    __decorate([
        Input('scrollContent'),
        __metadata("design:type", IonContent)
    ], ScrollHideDirective.prototype, "scrollContent", void 0);
    ScrollHideDirective = __decorate([
        Directive({
            selector: '[scrollHide]'
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2, DomController])
    ], ScrollHideDirective);
    return ScrollHideDirective;
}());
export { ScrollHideDirective };
//# sourceMappingURL=scroll-hide.directive.js.map