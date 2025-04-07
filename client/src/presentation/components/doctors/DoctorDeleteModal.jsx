import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

const DoctorDeleteModal = ({ isOpen, toggle, doctor, onDelete }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Eliminar Doctor</ModalHeader>
      <ModalBody>
        <p>
          ¿Estás seguro de eliminar al doctor <b>{doctor?.LicenseNumber}</b>?
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onDelete}>Eliminar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DoctorDeleteModal;
