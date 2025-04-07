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

const InsuranceNetworkTypeCreateModal = ({ isOpen, toggle, save, setSave, onSave }) => {
        const fields = [
            { label: "ID", key: "NetworkTypeId" },
            { label: "Nombre", key: "Name" },
            { label: "Descripcion", key: "Description" },
        ];
      
        return (
          <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Agregar Tipo de Red de Seguros</ModalHeader>
            <ModalBody>
              {fields.map((field, i) => (
                <FormGroup key={i}>
                  <Label>{field.label}</Label>
                  <Input
                    type={field.type || "text"}
                    value={field.type === "checkbox" ? undefined : save[field.key] || (field.type === "number" ? "" : "")}
                    onChange={(e) => setSave({ ...save, [field.key]: e.target.value })}
                  />
                </FormGroup>
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
      

  export default InsuranceNetworkTypeCreateModal;