import { Modal } from "react-bootstrap";
import { ModalWindowProps } from "../../props/ModalWindow.Props";
import "./ModalWindow.css";

const ModalWindow = (props: ModalWindowProps) => {
  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.modalText}</Modal.Body>
      <Modal.Footer>
        <button
          data-bs-dismiss="modal"
          type="button"
          onClick={() => props.onConfirm()}
          className="btn btn-primary"
        >
          {props.confirmButtonText}
        </button>
        <button
          data-bs-dismiss="modal"
          type="button"
          onClick={() => props.onClose()}
          className="btn btn-light"
        >
          {props.closeButtonText}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWindow;
