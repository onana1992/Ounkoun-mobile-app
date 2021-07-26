var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Renderer, ElementRef } from '@angular/core';
var AutoHideDirective = /** @class */ (function () {
    function AutoHideDirective(renderer, element) {
        this.renderer = renderer;
        this.element = element;
        this.oldScrollTop = 0;
        console.log('Hello AutoHideDirective Directive');
    }
    AutoHideDirective.prototype.ngOnInit = function () {
        this.fabToHide = this.element.nativeElement.getElementsByClassName("fab")[0];
        this.renderer.setElementStyle(this.fabToHide, "webkitTransition", "transform 500ms, opacity 500ms");
    };
    AutoHideDirective.prototype.onContentScroll = function (e) {
        console.log("DOWN");
        if (e.scrollTop - this.oldScrollTop > 10) {
            this.renderer.setElementStyle(this.fabToHide, "opacity", "0");
            this.renderer.setElementStyle(this.fabToHide, "webkitTransform", "scale3d(.1,.1,.1)");
        }
        else if (e.scrollTop - this.oldScrollTop < 0) {
            console.log("UP");
            this.renderer.setElementStyle(this.fabToHide, "opacity", "1");
            this.renderer.setElementStyle(this.fabToHide, "webkitTransform", "scale3d(1,1,1)");
        }
        this.oldScrollTop = e.scrollTop;
    };
    AutoHideDirective = __decorate([
        Directive({
            selector: '[auto-hide]',
            host: {
                '(ionScroll)': 'onContentScroll($event)'
            }
        }),
        __metadata("design:paramtypes", [Renderer, ElementRef])
    ], AutoHideDirective);
    return AutoHideDirective;
}());
export { AutoHideDirective };
//# sourceMappingURL=auto-hide.js.map