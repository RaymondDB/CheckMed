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

const UserEditModal = ({ isOpen, toggle, edit, setEdit, actualizar, onUpdate }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>ACTUALIZAR USUARIO</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="FirstName">First Name</Label>
          <Input
            id="FirstName"
            defaultValue={actualizar.firstName}
            onChange={(e) => setEdit({ ...edit, firstName: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="LastName">Last Name</Label>
          <Input
            id="LastName"
            defaultValue={actualizar.lastName}
            onChange={(e) => setEdit({ ...edit, lastName: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Email">Email</Label>
          <Input
            id="Email"
            defaultValue={actualizar.email}
            onChange={(e) => setEdit({ ...edit, email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Password">Password</Label>
          <Input
            id="Password"
            defaultValue={actualizar.password}
            onChange={(e) => setEdit({ ...edit, password: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Role">Role</Label>
          <Input
            type="select"
            id="Role"
            defaultValue={actualizar.roleId}
            onChange={(e) => setEdit({ ...edit, roleId: e.target.value })}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onUpdate}>ACTUALIZAR</Button>
        <Button color="danger" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserEditModal;
