"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var ConfirmationDialogDto_1 = require("../models/shared/ConfirmationDialogDto");
var ConfirmationDialog = (function () {
    function ConfirmationDialog() {
        this.confirmationDialog = new ConfirmationDialogDto_1.ConfirmationDialogDto("", "");
        this.okEvent = new core_1.EventEmitter();
        this.cancelEvent = new core_1.EventEmitter();
    }
    ConfirmationDialog.prototype.open = function (cfd, data) {
        this.carryData = data;
        this.confirmationDialog = cfd;
        this.modalComponent.open();
    };
    ConfirmationDialog.prototype.ok = function () {
        this.okEvent.emit(this.carryData);
        this.modalComponent.close();
    };
    ConfirmationDialog.prototype.cancel = function () {
        this.cancelEvent.emit(this.carryData);
        this.modalComponent.close();
    };
    return ConfirmationDialog;
}());
__decorate([
    core_1.ViewChild('confirmationDialogModal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], ConfirmationDialog.prototype, "modalComponent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ConfirmationDialog.prototype, "okEvent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ConfirmationDialog.prototype, "cancelEvent", void 0);
ConfirmationDialog = __decorate([
    core_1.Component({
        selector: 'confirmation-dialog',
        templateUrl: '/src/app/shared/confirmationDialog.component.html'
    })
], ConfirmationDialog);
exports.ConfirmationDialog = ConfirmationDialog;
//# sourceMappingURL=confirmationDialog.component.js.map