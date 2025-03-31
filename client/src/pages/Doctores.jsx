// Doctors.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./css/Doctores.css";
import Sidebar from "../components/Sidebar";
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
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

export const Doctors = () => {
  const [doctorArray, setDoctorArray] = useState([]);
  const [doctorTemp, setDoctorTemp] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const mostrar = () => {
    Axios.get("http://localhost:3000/doctors").then((response) => {
      setDoctorArray(response.data.data);
      setDoctorTemp(response.data.data);
    });
  };

  useEffect(() => {
    mostrar();
  }, []);

  const filtrarInfo = (busqueda) => {
    const resultado = doctorArray.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(busqueda.toLowerCase())
      )
    );
    setDoctorTemp(resultado);
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrarInfo(e.target.value);
  };

  const [modalSave, setModalSave] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleSave = () => setModalSave(!modalSave);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const [save, setSave] = useState({
    SpecialtyID: "",
    LicenseNumber: "",
    PhoneNumber: "",
    YearsOfExperience: "",
    Education: "",
    Bio: "",
    ConsultationFee: "",
    ClinicAddress: "",
    AvailabilityModeId: "",
    LicenseExpirationDate: "",
    IsActive: true,
  });

  const saveDoctor = () => {
    Axios.post("http://localhost:3000/doctors", save).then(() => {
      toggleSave();
      mostrar();
    });
  };

  const [edit, setEdit] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const cargarEditar = (id) => {
    setSelectedId(id);
    Axios.get(`http://localhost:3000/doctors/${id}`).then((res) => {
      setEdit(res.data);
      toggleUpdate();
    });
  };

  const updateDoctor = () => {
    Axios.put(`http://localhost:3000/doctors/${selectedId}`, edit).then(() => {
      toggleUpdate();
      mostrar();
    });
  };

  const [eliminar, setEliminar] = useState({});
  const cargarEliminar = (id) => {
    setSelectedId(id);
    Axios.get(`http://localhost:3000/doctors/${id}`).then((res) => {
      setEliminar(res.data);
      toggleDelete();
    });
  };

  const deleteDoctor = () => {
    Axios.delete(`http://localhost:3000/doctors/${selectedId}`).then(() => {
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
            <i className="bx bx-store-alt"></i>
            <h1>Doctores</h1>
          </div>
        </div>

        <div className="cont-2">
          <div className="title_header">
            <div className="input_search">
              <input type="search" onChange={handleChange} placeholder="Buscar..." />
              <i className="bx bx-search-alt-2 search"></i>
            </div>
            <Button onClick={toggleSave}>Agregar Doctor</Button>
          </div>
        </div>

        <div className="cont-3">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Licencia</th>
                  <th>Teléfono</th>
                  <th>Experiencia</th>
                  <th>Dirección</th>
                  <th>Especialidad</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {doctorTemp.map((val) => (
                  <tr key={val.DoctorID}>
                    <td>{val.DoctorID}</td>
                    <td>{val.LicenseNumber}</td>
                    <td>{val.PhoneNumber}</td>
                    <td>{val.YearsOfExperience}</td>
                    <td>{val.ClinicAddress}</td>
                    <td>{val.SpecialtyID}</td>
                    <td>{val.IsActive ? "Sí" : "No"}</td>
                    <td>
                      <Button color="primary" onClick={() => cargarEditar(val.DoctorID)}>Editar</Button>{" "}
                      <Button color="danger" onClick={() => cargarEliminar(val.DoctorID)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Save */}
        <Modal isOpen={modalSave} toggle={toggleSave}>
          <ModalHeader toggle={toggleSave}>Agregar Doctor</ModalHeader>
          <ModalBody>
            {Object.entries(save).map(([key, value]) => (
              key !== "IsActive" ? (
                <FormGroup key={key}>
                  <Label>{key}</Label>
                  <Input
                    type={key.includes("Date") ? "date" : key === "ConsultationFee" ? "number" : "text"}
                    onChange={(e) => setSave({ ...save, [key]: e.target.value })}
                  />
                </FormGroup>
              ) : null
            ))}
            <FormGroup check>
              <Label check>
                <Input type="checkbox" checked={save.IsActive} onChange={(e) => setSave({ ...save, IsActive: e.target.checked })} /> Activo
              </Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={saveDoctor}>Guardar</Button>
            <Button color="danger" onClick={toggleSave}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        {/* Modal Edit */}
        <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
          <ModalHeader toggle={toggleUpdate}>Editar Doctor</ModalHeader>
          <ModalBody>
            {Object.entries(edit).map(([key, val]) => (
              key !== "DoctorID" ? (
                <FormGroup key={key}>
                  <Label>{key}</Label>
                  <Input
                    type={key.includes("Date") ? "date" : key === "ConsultationFee" ? "number" : "text"}
                    value={val || ""}
                    onChange={(e) => setEdit({ ...edit, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })}
                  />
                </FormGroup>
              ) : null
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={updateDoctor}>Actualizar</Button>
            <Button color="danger" onClick={toggleUpdate}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        {/* Modal Delete */}
        <Modal isOpen={modalDelete} toggle={toggleDelete}>
          <ModalHeader toggle={toggleDelete}>Eliminar Doctor</ModalHeader>
          <ModalBody>
            <p>¿Estás seguro de eliminar al doctor <b>{eliminar?.LicenseNumber}</b>?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={deleteDoctor}>Eliminar</Button>
            <Button color="secondary" onClick={toggleDelete}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Outlet />
      </div>
    </div>
  );
};
