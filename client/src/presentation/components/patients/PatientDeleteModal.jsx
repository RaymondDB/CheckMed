import React from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "reactstrap";

const PatientDeleteModal = ({ isOpen, toggle, eliminar, onDelete }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Eliminar Paciente</ModalHeader>
      <ModalBody>
        <p>
          ¿Estás seguro de eliminar al paciente{" "}
          <strong>{eliminar?.EmergencyContactName || eliminar?.FullName || "este paciente"}</strong>?
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onDelete}>Eliminar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default PatientDeleteModal;

