import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ConfirmationDialogDto } from '@shared/models/directives/ConfirmationDialogDto';

@Component({
    selector:'confirmation-dialog',
    templateUrl: '/src/shared/directives/confirmationDialog.component.html'
})
export class ConfirmationDialog {
    confirmationDialog: ConfirmationDialogDto = new ConfirmationDialogDto("","");
    carryData:any;

    @ViewChild('confirmationDialogModal') modalComponent: ModalComponent
    @Output() okEvent: EventEmitter<any> = new EventEmitter();
    @Output() cancelEvent: EventEmitter<any> = new EventEmitter();
    open(cfd: ConfirmationDialogDto,data:any):void
    {
        this.carryData = data;
        this.confirmationDialog = cfd;
        this.modalComponent.open();
    }
    ok(): void {
        this.okEvent.emit(this.carryData);
        this.modalComponent.close();
    }
    cancel(): void {
        this.cancelEvent.emit(this.carryData);
        this.modalComponent.close();
    }
}