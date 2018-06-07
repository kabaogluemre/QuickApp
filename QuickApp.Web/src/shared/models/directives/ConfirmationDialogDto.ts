export class ConfirmationDialogDto {
    ModalTitle: string;
    ModalContent: string;

    constructor(modalTitle:string,modalContent:string) {
        this.ModalTitle = modalTitle;
        this.ModalContent = modalContent;
    }
}