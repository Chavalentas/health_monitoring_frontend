export interface ModalWindowProps{
    modalText: string;
    modalTitle: string;
    closeButtonText: string;
    confirmButtonText: string;
    onClose: () => void;
    onConfirm: () => void;
    show: boolean;
}