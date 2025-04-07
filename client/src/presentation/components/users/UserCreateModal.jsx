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

const UserCreateModal = ({ isOpen, toggle, save, setSave, onSave }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>AGREGAR USUARIO</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="FirstName">First Name</Label>
          <Input
            id="FirstName"
            placeholder="FirstName"
            value={save.firstName}
            onChange={(e) => setSave({ ...save, firstName: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="LastName">Last Name</Label>
          <Input
            id="LastName"
            placeholder="LastName"
            value={save.lastName}
            onChange={(e) => setSave({ ...save, lastName: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Email">Email</Label>
          <Input
            id="Email"
            placeholder="Email"
            value={save.email}
            onChange={(e) => setSave({ ...save, email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input
            id="Password"
            placeholder="Password"
            value={save.password}
            onChange={(e) => setSave({ ...save, password: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Role">Role</Label>
          <Input
            type="select"
            id="Role"
            value={save.roleId}
            onChange={(e) => setSave({ ...save, roleId: e.target.value })}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onSave}>GUARDAR</Button>
        <Button color="danger" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserCreateModal;