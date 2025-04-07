import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";

const DoctorCreateModal = ({ isOpen, toggle, save, setSave, onSave }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Agregar Doctor</ModalHeader>
      <ModalBody>
        {Object.entries(save).map(([key, value]) => (
          key !== "IsActive" ? (
            <FormGroup key={key}>
              <Label>{key}</Label>
              <Input
                type={key.includes("Date") ? "date" : key === "ConsultationFee" ? "number" : "text"}
                value={value || ""}
                onChange={(e) => setSave({ ...save, [key]: e.target.value })}
              />
            </FormGroup>
          ) : null
        ))}
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={save.IsActive}
              onChange={(e) => setSave({ ...save, IsActive: e.target.checked })}
            />{' '}
            Activo
          </Label>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onSave}>Guardar</Button>
        <Button color="danger" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DoctorCreateModal;
