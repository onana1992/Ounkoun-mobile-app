var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Renderer } from '@angular/core';
var HideFabDirective = /** @class */ (function () {
    function HideFabDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.storedScroll = 0;
        this.threshold = 10;
        console.log('Hello HideFabDirective Directive');
    }
    HideFabDirective.prototype.ngAfterViewInit = function () {
        console.log("All Transtition set");
        this.fabRef = this.element.nativeElement.getElementsByClassName("fab")[0];
        this.renderer.setElementStyle(this.fabRef, 'top', '100px');
        this.renderer.setElementStyle(this.fabRef, 'webkitTransition', 'transform 500ms,top 500ms');
    };
    HideFabDirective.prototype.handleScroll = function (event) {
        if (event.scrollTop - this.storedScroll > this.threshold) {
            console.log("Scrolling down");
            this.renderer.setElementStyle(this.fabRef, 'top', '60px');
            this.renderer.setElementStyle(this.fabRef, 'webkitTransform', 'scale3d(.1,.1,.1)');
        }
        else if (event.scrollTop - this.storedScroll < 0) {
            console.log("Scrolling up");
            this.renderer.setElementStyle(this.fabRef, 'top', '0');
            this.renderer.setElementStyle(this.fabRef, 'webkitTransform', 'scale3d(1,1,1)');
        }
        // console.log(event.scrollTop - this.storedScroll);
        this.storedScroll = event.scrollTop;
    };
    HideFabDirective = __decorate([
        Directive({
            selector: '[hide-fab]',
            host: {
                '(ionScroll)': 'handleScroll($event)'
            }
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer])
    ], HideFabDirective);
    return HideFabDirective;
}());
export { HideFabDirective };
//# sourceMappingURL=hide-fab.js.map