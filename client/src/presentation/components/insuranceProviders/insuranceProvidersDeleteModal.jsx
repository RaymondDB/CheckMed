import React from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "reactstrap";

const InsuranceProvidersDeleteModal = ({ isOpen, toggle, eliminar, onDelete }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Eliminar Proveedor de Seguros</ModalHeader>
      <ModalBody>
        <p>
        ¿Estás seguro de eliminar al proveedor de seguros{" "}
          <strong>{eliminar?.Name || ""}</strong>?
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onDelete}>Eliminar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default InsuranceProvidersDeleteModal;