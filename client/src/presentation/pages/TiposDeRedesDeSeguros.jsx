import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./css/TipoDeRedesDeSeguros.css";
import Sidebar from "../components/Sidebar";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import InsuranceNetworkTypeCreateModal from "../components/insuranceNetworkTypes/insuranceNetworkTypeCreateModal";
import InsuranceNetworkTypeUpdateModal from "../components/insuranceNetworkTypes/insuranceNetworkTypeUpdateModal";
import InsuranceNetworkTypeDeleteModal from "../components/insuranceNetworkTypes/insuranceNetworkTypeDeleteModal";
import { insuranceNetworkTypeService } from "../../application/services/insuranceNetworkTypeService";

export const InsuranceNetworkType = () => {
  const [insuranceNetworkTypeArray, setInsuranceNetworkTypeArray] = useState([]);
  const [insuranceNetworkTypeTemp, setInsuranceNetworkTypeTemp] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [modalSave, setModalSave] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleSave = () => setModalSave(!modalSave);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const [save, setSave] = useState({
    NetworkTypeId: "",
    Name: "",
    Description: "",
    IsActive: true,
  });

  const [edit, setEdit] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [eliminar, setEliminar] = useState({});

  const mostrar = async () => {
    const data = await insuranceNetworkTypeService.getAll();
    setInsuranceNetworkTypeArray(data);
    setInsuranceNetworkTypeTemp(data);
  };

  useEffect(() => {
    mostrar();
  }, []);

  const filtrarInfo = (busqueda) => {
    const resultado = insuranceNetworkTypeArray.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(busqueda.toLowerCase())
      )
    );
    setInsuranceNetworkTypeTemp(resultado);
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrarInfo(e.target.value);
  };

  const saveInsuranceNetworkType = async () => {
    console.log('datos recibidosaaaaaaaaaaaaaa: ', save)
    await insuranceNetworkTypeService.create(save);
    toggleSave();
    mostrar();
  };

  const cargarEditar = async (id) => {
    setSelectedId(id);
      const val = await insuranceNetworkTypeService.getById(id)
      setEdit({
        Name: val.Name,
        Description: val.Description,
        IsActive: val.IsActive,
      });
      toggleUpdate();
  };

  const updateInsuranceNetworkType = async () => {
    await insuranceNetworkTypeService.update(selectedId, edit);
    toggleUpdate();
    mostrar();
  };

  const cargarEliminar = async (id) => {
    setSelectedId(id);
    const val = await insuranceNetworkTypeService.getById(id);
    setEliminar(val);
    toggleDelete();
  };

  const deleteInsuranceNetworkType = async () => {
    await insuranceNetworkTypeService.remove(selectedId);
    toggleDelete();
    mostrar();
  };



  return (
    <div className="app">
      <Sidebar />
      <div className="contenido">
        <div className="cont-1">
          <div className="title_table">
            <i className="bx bx-shield"></i>
            <h1>Tipos de Red de Seguros</h1>
          </div>
        </div>

        <div className="cont-2">
          <div className="title_header">
            <div className="input_search">
              <input type="search" onChange={handleChange} placeholder="Buscar..." />
              <i className="bx bx-search-alt-2 search"></i>
            </div>
            <Button onClick={toggleSave}>Agregar Tipo de Red de Seguros</Button>
          </div>
        </div>

        <div className="cont-3">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Está activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {insuranceNetworkTypeTemp.map((val) => (
                  <tr key={val.NetworkTypeId}>
                  <td>{val.NetworkTypeId}</td>
                  <td>{val.Name}</td>
                  <td>{val.Description}</td>
                  <td>{val.IsActive ? "Sí" : "No"}</td>
                    <td>
                      <Button color="primary" onClick={() => cargarEditar(val.NetworkTypeId)}>Editar</Button>{" "}
                      <Button color="danger" onClick={() => cargarEliminar(val.NetworkTypeId)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <InsuranceNetworkTypeCreateModal
          isOpen={modalSave}
          toggle={toggleSave}
          save={save}
          setSave={setSave}
          onSave={saveInsuranceNetworkType}
        />

        <InsuranceNetworkTypeUpdateModal
          isOpen={modalUpdate}
          toggle={toggleUpdate}
          edit={edit}
          setEdit={setEdit}
          onUpdate={updateInsuranceNetworkType}
        />

        <InsuranceNetworkTypeDeleteModal
          isOpen={modalDelete}
          toggle={toggleDelete}
          eliminar={eliminar}
          onDelete={deleteInsuranceNetworkType}
        />

        <Outlet />
      </div>
    </div>
  );
};