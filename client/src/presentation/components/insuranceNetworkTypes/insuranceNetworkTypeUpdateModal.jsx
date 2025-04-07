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

const InsuranceNetworkTypeUpdateModal = ({ isOpen, toggle, edit, setEdit, onUpdate }) => {
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Editar Tipo de Red de Seguros</ModalHeader>
        <ModalBody>
          {Object.entries(edit).map(([key, val]) => (
            key !== "NetworkTypeId" && key !== "IsActive" ? (
              <FormGroup key={key}>
                <Label>{key}</Label>
                <Input
                  type={key === "date" ? "date" : "text"}
                  value={val || ""}
                  onChange={(e) =>
                    setEdit({
                      ...edit,
                      [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
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
  
  export default InsuranceNetworkTypeUpdateModal;