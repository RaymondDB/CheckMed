// src/presentation/components/users/UserDeleteModal.jsx

import React from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";

const UserDeleteModal = ({ isOpen, toggle, eliminar, onDelete }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>ELIMINAR USUARIO</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>¿Estás seguro de que quieres eliminar este USUARIO?</Label>
        </FormGroup>
        <FormGroup>
          <Input
            id="Username"
            value={`${eliminar.firstName || ""} ${eliminar.lastName || ""}`}
            disabled
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onDelete}>ELIMINAR</Button>
        <Button color="danger" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserDeleteModal;