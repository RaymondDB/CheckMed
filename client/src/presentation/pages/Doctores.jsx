import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./css/Doctores.css";
import Sidebar from "../components/Sidebar";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { doctorService } from "../../application/services/doctorService";
import DoctorCreateModal from "../components/doctors/DoctorCreateModal";
import DoctorEditModal from "../components/doctors/DoctorEditModal";
import DoctorDeleteModal from "../components/doctors/DoctorDeleteModal";

export const Doctors = () => {
  const [doctorArray, setDoctorArray] = useState([]);
  const [doctorTemp, setDoctorTemp] = useState([]);
  const [busqueda, setBusqueda] = useState("");

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

  const [edit, setEdit] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [eliminar, setEliminar] = useState({});

  const mostrar = async () => {
    const data = await doctorService.getAll();
    setDoctorArray(data);
    setDoctorTemp(data);
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

  const saveDoctor = async () => {
    await doctorService.create(save);
    toggleSave();
    mostrar();
  };

  const cargarEditar = async (id) => {
    setSelectedId(id);
    const res = await doctorService.getById(id);
    setEdit(res);
    toggleUpdate();
  };

  const updateDoctor = async () => {
    await doctorService.update(selectedId, edit);
    toggleUpdate();
    mostrar();
  };

  const cargarEliminar = async (id) => {
    setSelectedId(id);
    const res = await doctorService.getById(id);
    setEliminar(res);
    toggleDelete();
  };

  const deleteDoctor = async () => {
    await doctorService.remove(selectedId);
    toggleDelete();
    mostrar();
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
                  <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.LicenseNumber}</td>
                    <td>{val.PhoneNumber}</td>
                    <td>{val.YearsOfExperience}</td>
                    <td>{val.ClinicAddress}</td>
                    <td>{val.SpecialtyID}</td>
                    <td>{val.IsActive ? "Sí" : "No"}</td>
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

        <DoctorCreateModal
          isOpen={modalSave}
          toggle={toggleSave}
          save={save}
          setSave={setSave}
          onSave={saveDoctor}
        />

        <DoctorEditModal
          isOpen={modalUpdate}
          toggle={toggleUpdate}
          edit={edit}
          setEdit={setEdit}
          onUpdate={updateDoctor}
        />

        <DoctorDeleteModal
          isOpen={modalDelete}
          toggle={toggleDelete}
          doctor={eliminar}
          onDelete={deleteDoctor}
        />

        <Outlet />
      </div>
    </div>
  );
};
