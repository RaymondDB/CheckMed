// Patients.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./css/Pacientes.css";
import Sidebar from "../components/Sidebar";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import PatientCreateModal from "../components/patients/PatientCreateModal";
import PatientEditModal from "../components/patients/PatientEditModal";
import PatientDeleteModal from "../components/patients/PatientDeleteModal";
import { patientService } from "../../application/services/patientService";

export const Patients = () => {
  const [patientArray, setPatientArray] = useState([]);
  const [patientTemp, setPatientTemp] = useState([]);
  const [busqueda, setBusqueda] = useState("");

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

  const [edit, setEdit] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [eliminar, setEliminar] = useState({});

  const mostrar = async () => {
    const data = await patientService.getAll();
    setPatientArray(data);
    setPatientTemp(data);
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

  const savePatient = async () => {
    await patientService.create(save);
    toggleSave();
    mostrar();
  };

  const cargarEditar = async (id) => {
    setSelectedId(id);
    const val = await patientService.getById(id);
    setEdit({
      date: val.date,
      gender: val.gender,
      phone: val.phone,
      address: val.address,
      ecName: val.ecName,
      ecPhone: val.ecPhone,
      blood: val.blood,
      allergies: val.allergies,
      insurance: val.insurance,
      active: val.active,
    });
    toggleUpdate();
  };

  const updatePatient = async () => {
    await patientService.update(selectedId, edit);
    toggleUpdate();
    mostrar();
  };

  const cargarEliminar = async (id) => {
    setSelectedId(id);
    const val = await patientService.getById(id);
    setEliminar(val);
    toggleDelete();
  };

  const deletePatient = async () => {
    await patientService.remove(selectedId);
    toggleDelete();
    mostrar();
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
                  <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.date}</td>
                    <td>{val.gender}</td>
                    <td>{val.phone}</td>
                    <td>{val.address}</td>
                    <td>{val.ecName}</td>
                    <td>{val.ecPhone}</td>
                    <td>{val.blood}</td>
                    <td>{val.allergies}</td>
                    <td>{val.insurance}</td>
                    <td>{val.active ? "Sí" : "No"}</td>
                    <td>
                      <Button color="primary" onClick={() => cargarEditar(val.id)}>Editar</Button>{" "}
                      <Button color="danger" onClick={() => cargarEliminar(val.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <PatientCreateModal
          isOpen={modalSave}
          toggle={toggleSave}
          save={save}
          setSave={setSave}
          onSave={savePatient}
        />

        <PatientEditModal
          isOpen={modalUpdate}
          toggle={toggleUpdate}
          edit={edit}
          setEdit={setEdit}
          onUpdate={updatePatient}
        />

        <PatientDeleteModal
          isOpen={modalDelete}
          toggle={toggleDelete}
          eliminar={eliminar}
          onDelete={deletePatient}
        />

        <Outlet />
      </div>
    </div>
  );
};
