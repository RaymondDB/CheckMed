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

const InsuranceProvidersCreateModal = ({ isOpen, toggle, save, setSave, onSave }) => {
    const fields = [
        { label: "ID", key: "InsuranceProviderID" },
        { label: "Nombre", key: "Name" },
        { label: "Numero de contacto", key: "ContactNumber" },
        { label: "Email", key: "Email" },
        { label: "Sitio web", key: "Website" },
        { label: "Direccion", key: "Address" },
        { label: "Ciudad", key: "City" },
        { label: "Estado", key: "State" },
        { label: "Pais", key: "Country" },
        { label: "Codigo postal", key: "ZipCode" },
        { label: "Detalles de cobertura", key: "CoverageDetails" },
        { label: "Enlace URL del logo", key: "LogoUrl" },
        { label: "ID de la red de seguros", key: "NetworkTypeId", type: "number"},
        { label: "Numero de contacto de la atencion al cliente", key: "CustomerSupportContact" },
        { label: "Regiones aceptadas", key: "AcceptedRegions" },
        { label: "Cantidad maxima de cobertura", key: "MaxCoverageAmount", type: "number"},
    ];

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Agregar Proveedor de Seguros</ModalHeader>
          <ModalBody>
            {fields.map((field, i) => (
              <FormGroup key={i}>
                <Label>{field.label}</Label>
                <Input
                type={field.type || "text"}
                value={field.type === "checkbox" ? undefined : save[field.key] || (field.type === "number" ? "" : "")}
                checked={field.type === "checkbox" ? save[field.key] : undefined}
                onChange={(e) =>
                    setSave({
                    ...save,
                    [field.key]: field.type === "checkbox" ? e.target.checked : field.type === "number" ? parseFloat(e.target.value) : e.target.value,
                    })
                }
                />
              </FormGroup>
            ))}
            <FormGroup check>
              <Label check>
                <Input
                    type="checkbox"
                    checked={save.IsPreferred || false}
                    onChange={(e) => setSave({ ...save, IsPreferred: e.target.checked })}
                />{' '}
                Es Preferido
              </Label>
            </FormGroup>
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

export default InsuranceProvidersCreateModal;