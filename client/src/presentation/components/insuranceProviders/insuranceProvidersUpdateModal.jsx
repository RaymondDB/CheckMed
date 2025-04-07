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

const InsuranceProvidersUpdateModal = ({ isOpen, toggle, edit, setEdit, onUpdate }) => {
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Editar Proveedores de Seguros</ModalHeader>
        <ModalBody>
          {Object.entries(edit).map(([key, val]) => (
            key !== "InsuranceProviderID" && key !== "IsActive" && key !=="IsPreferred" ? (
              <FormGroup key={key}>
                <Label>{key}</Label>
                <Input
                  type={key === "date" ? "date" : "text"}
                  value={val}
                  onChange={(e) =>
                    setEdit({
                      ...edit,
                      [key]: key === 'NetworkTypeId' || key === 'MaxCoverageAmount' ? parseFloat(e.target.value) 
                      : e.target.type === 'checkbox' ? e.target.checked  : e.target.value,
                    })
                  }
                />
              </FormGroup>
            ) : null
          ))}
         <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={edit.IsPreferred || false}
                onChange={(e) => setEdit({ ...edit, IsPreferred: e.target.checked })}
              />{' '}
              Es Preferido
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={edit.IsActive || false}
                onChange={(e) => setEdit({ ...edit, IsActive: e.target.checked })}
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
  
  export default InsuranceProvidersUpdateModal;