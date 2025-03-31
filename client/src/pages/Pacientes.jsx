// Patients.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./css/Pacientes.css";
import Sidebar from "../components/Sidebar";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

export const Patients = () => {
  const [patientArray, setPatientArray] = useState([]);
  const [patientTemp, setPatientTemp] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const mostrar = () => {
    Axios.get("http://localhost:3000/patients").then((response) => {
      setPatientArray(response.data.data);
      setPatientTemp(response.data.data);
    });
  };

  useEffect(() => {
    mostrar();
  }, []);

  const filtrarInfo = (busqueda) => {
    const resultado = patientArray.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(busqueda.toLowerCase())
      )
    );
    setPatientTemp(resultado);
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrarInfo(e.target.value);
  };

  // Estados y modales
  const [modalSave, setModalSave] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleSave = () => setModalSave(!modalSave);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const [save, setSave] = useState({
    date: "",
    gender: "",
    phone: "",
    address: "",
    ecName: "",
    ecPhone: "",
    blood: "",
    allergies: "",
    insurance: "",
    active: true,
  });

  const savePatient = () => {
    Axios.post("http://localhost:3000/patients", {
      DateOfBirth: save.date,
      Gender: save.gender,
      PhoneNumber: save.phone,
      Address: save.address,
      EmergencyContactName: save.ecName,
      EmergencyContactPhone: save.ecPhone,
      BloodType: save.blood,
      Allergies: save.allergies,
      InsuranceProviderID: save.insurance,
      IsActive: save.active,
    }).then(() => {
      toggleSave();
      mostrar();
    });
  };

  const [edit, setEdit] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const cargarEditar = (id) => {
    setSelectedId(id);
    Axios.get(`http://localhost:3000/patients/${id}`).then((res) => {
      const val = res.data;
      setEdit({
        date: val.DateOfBirth,
        gender: val.Gender,
        phone: val.PhoneNumber,
        address: val.Address,
        ecName: val.EmergencyContactName,
        ecPhone: val.EmergencyContactPhone,
        blood: val.BloodType,
        allergies: val.Allergies,
        insurance: val.InsuranceProviderID,
        active: val.IsActive,
      });
      toggleUpdate();
    });
  };

  const updatePatient = () => {
    Axios.put(`http://localhost:3000/patients/${selectedId}`, {
      DateOfBirth: edit.date,
      Gender: edit.gender,
      PhoneNumber: edit.phone,
      Address: edit.address,
      EmergencyContactName: edit.ecName,
      EmergencyContactPhone: edit.ecPhone,
      BloodType: edit.blood,
      Allergies: edit.allergies,
      InsuranceProviderID: edit.insurance,
      IsActive: edit.active,
    }).then(() => {
      toggleUpdate();
      mostrar();
    });
  };

  const [eliminar, setEliminar] = useState({});
  const cargarEliminar = (id) => {
    setSelectedId(id);
    Axios.get(`http://localhost:3000/patients/${id}`).then((res) => {
      setEliminar(res.data);
      toggleDelete();
    });
  };

  const deletePatient = () => {
    Axios.delete(`http://localhost:3000/patients/${selectedId}`).then(() => {
      toggleDelete();
      mostrar();
    });
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="contenido">
        <div className="cont-1">
          <div className="title_table">
            <i className="bx bx-group"></i>
            <h1>Pacientes</h1>
          </div>
        </div>
        <div className="cont-2">
          <div className="title_header">
            <div className="input_search">
              <input type="search" onChange={handleChange} placeholder="Buscar..." />
              <i className="bx bx-search-alt-2 search"></i>
            </div>
            <Button onClick={toggleSave}>Agregar Paciente</Button>
          </div>
        </div>
        <div className="cont-3">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha Nac.</th>
                  <th>Género</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Contacto Emergencia</th>
                  <th>Tel. Emergencia</th>
                  <th>Sangre</th>
                  <th>Alergias</th>
                  <th>Seguro</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {patientTemp.map((val) => (
                  <tr key={val.PatientID}>
                    <td>{val.PatientID}</td>
                    <td>{val.DateOfBirth}</td>
                    <td>{val.Gender}</td>
                    <td>{val.PhoneNumber}</td>
                    <td>{val.Address}</td>
                    <td>{val.EmergencyContactName}</td>
                    <td>{val.EmergencyContactPhone}</td>
                    <td>{val.BloodType}</td>
                    <td>{val.Allergies}</td>
                    <td>{val.InsuranceProviderID}</td>
                    <td>{val.IsActive ? "Sí" : "No"}</td>
                    <td>
                      <Button color="primary" onClick={() => cargarEditar(val.PatientID)}>Editar</Button>{" "}
                      <Button color="danger" onClick={() => cargarEliminar(val.PatientID)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Save */}
        <Modal isOpen={modalSave} toggle={toggleSave}>
          <ModalHeader toggle={toggleSave}>Agregar Paciente</ModalHeader>
          <ModalBody>
            {[
              { label: "Fecha de Nacimiento", key: "date", type: "date" },
              { label: "Género", key: "gender" },
              { label: "Teléfono", key: "phone" },
              { label: "Dirección", key: "address" },
              { label: "Contacto Emergencia", key: "ecName" },
              { label: "Tel. Emergencia", key: "ecPhone" },
              { label: "Tipo de Sangre", key: "blood" },
              { label: "Alergias", key: "allergies" },
              { label: "Seguro Médico (ID)", key: "insurance", type: "number" },
            ].map((field, i) => (
              <FormGroup key={i}>
                <Label>{field.label}</Label>
                <Input
                  type={field.type || "text"}
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
            <Button color="primary" onClick={savePatient}>Guardar</Button>
            <Button color="danger" onClick={toggleSave}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        {/* Modal Edit */}
        <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
          <ModalHeader toggle={toggleUpdate}>Editar Paciente</ModalHeader>
          <ModalBody>
            {Object.entries(edit).map(([key, val], i) => (
              key !== 'active' ? (
                <FormGroup key={i}>
                  <Label>{key}</Label>
                  <Input
                    type={key === 'date' ? 'date' : 'text'}
                    value={val}
                    onChange={(e) => setEdit({ ...edit, [key]: e.target.value })}
                  />
                </FormGroup>
              ) : null
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
            <Button color="primary" onClick={updatePatient}>Actualizar</Button>
            <Button color="danger" onClick={toggleUpdate}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        {/* Modal Delete */}
        <Modal isOpen={modalDelete} toggle={toggleDelete}>
          <ModalHeader toggle={toggleDelete}>Eliminar Paciente</ModalHeader>
          <ModalBody>
            <p>¿Estás seguro de eliminar al paciente <b>{eliminar?.EmergencyContactName}</b>?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={deletePatient}>Eliminar</Button>
            <Button color="secondary" onClick={toggleDelete}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Outlet />
      </div>
    </div>
  );
};
