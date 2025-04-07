// src/presentation/components/patients/PatientCreateModal.jsx

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

const PatientCreateModal = ({ isOpen, toggle, save, setSave, onSave }) => {
  const fields = [
    { label: "Fecha de Nacimiento", key: "date", type: "date" },
    { label: "Género", key: "gender" },
    { label: "Teléfono", key: "phone" },
    { label: "Dirección", key: "address" },
    { label: "Contacto Emergencia", key: "ecName" },
    { label: "Tel. Emergencia", key: "ecPhone" },
    { label: "Tipo de Sangre", key: "blood" },
    { label: "Alergias", key: "allergies" },
    { label: "Seguro Médico (ID)", key: "insurance", type: "number" },
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Agregar Paciente</ModalHeader>
      <ModalBody>
        {fields.map((field, i) => (
          <FormGroup key={i}>
            <Label>{field.label}</Label>
            <Input
              type={field.type || "text"}
              value={save[field.key] || ""}
              onChange={(e) => setSave({ ...save, [field.key]: e.target.value })}
            />
          </FormGroup>
        ))}
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={save.active}
              onChange={(e) => setSave({ ...save, active: e.target.checked })}
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

export default PatientCreateModal;
