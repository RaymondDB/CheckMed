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

const PatientEditModal = ({ isOpen, toggle, edit, setEdit, onUpdate }) => {
  const editableFields = Object.entries(edit || {}).filter(([key]) => key !== "active");

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Editar Paciente</ModalHeader>
      <ModalBody>
        {editableFields.map(([key, value], i) => (
          <FormGroup key={i}>
            <Label>{key}</Label>
            <Input
              type={key === "date" ? "date" : "text"}
              value={value || ""}
              onChange={(e) => setEdit({ ...edit, [key]: e.target.value })}
            />
          </FormGroup>
        ))}
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={edit.active}
              onChange={(e) => setEdit({ ...edit, active: e.target.checked })}
            />{' '}
            Activo
          </Label>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onUpdate}>Actualizar</Button>
        <Button color="danger" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default PatientEditModal;
