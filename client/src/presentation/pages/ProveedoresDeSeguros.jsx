import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./css/ProveedoresDeSeguros.css";
import Sidebar from "../components/Sidebar";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import InsuranceProvidersCreateModal from "../components/insuranceProviders/insuranceProvidersCreateModal";
import InsuranceProvidersUpdateModal from "../components/insuranceProviders/insuranceProvidersUpdateModal";
import InsuranceProvidersDeleteModal from "../components/insuranceProviders/insuranceProvidersDeleteModal";
import { insuranceProvidersService } from "../../application/services/insuranceProvidersService";

export const InsuranceProviders = () => {
  const [insuranceProviderArray, setInsuranceProviderArray] = useState([]);
  const [insuranceProviderTemp, setInsuranceProviderTemp] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [modalSave, setModalSave] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleSave = () => setModalSave(!modalSave);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const [save, setSave] = useState({
    InsuranceProviderID: "",
    Name: "",
    ContactNumber: "",
    Email: "",
    Website: "",
    Address: "",
    City: "",
    State: "",
    Country:  "",
    ZipCode: "",
    CoverageDetails: "",
    LogoUrl: "",
    IsPreferred: false,
    NetworkTypeId: "",
    CustomerSupportContact: "",
    AcceptedRegions: "",
    MaxCoverageAmount: "",
    IsActive: true,
  });

  const [edit, setEdit] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [eliminar, setEliminar] = useState({});

  const mostrar = async () => {
    const data = await insuranceProvidersService.getAll();
    setInsuranceProviderArray(data);
    setInsuranceProviderTemp(data);
  };


  useEffect(() => {
    mostrar();
  }, []);

  const filtrarInfo = (busqueda) => {
    const resultado = insuranceProviderArray.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(busqueda.toLowerCase())
      )
    );
    setInsuranceProviderTemp(resultado);
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrarInfo(e.target.value);
  };

  const saveInsuranceProvider = async () => {
    await insuranceProvidersService.create(save);
    toggleSave();
    mostrar();
  };

  const cargarEditar = async (id) => {
    setSelectedId(id);
      const val = await insuranceProvidersService.getById(id)
      setEdit({
        Name: val.Name,
        ContactNumber: val.ContactNumber,
        Email: val.Email,
        Website: val.Website,
        Address: val.Address,
        City: val.City,
        State: val.State,
        Country:  val.Country,
        ZipCode: val.ZipCode,
        CoverageDetails: val.CoverageDetails,
        LogoUrl: val.LogoUrl,
        IsPreferred: val.IsPreferred,
        NetworkTypeId: val.NetworkTypeId,
        CustomerSupportContact: val.CustomerSupportContact,
        AcceptedRegions: val.AcceptedRegions,
        MaxCoverageAmount: val.MaxCoverageAmount,
        IsActive: val.IsActive,
      });
      toggleUpdate();
  };

  const updateInsuranceProvider = async () => {
    await insuranceProvidersService.update(selectedId, edit);
    toggleUpdate();
    mostrar();
  };

  const cargarEliminar = async (id) => {
    setSelectedId(id);
    const val = await insuranceProvidersService.getById(id);
    setEliminar(val);
    toggleDelete();
  };

  const deleteInsuranceProvider = async () => {
    await insuranceProvidersService.remove(selectedId);
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
            <h1>Proveedores de seguros</h1>
          </div>
        </div>

        <div className="cont-2">
          <div className="title_header">
            <div className="input_search">
              <input type="search" onChange={handleChange} placeholder="Buscar..." />
              <i className="bx bx-search-alt-2 search"></i>
            </div>
            <Button onClick={toggleSave}>Agregar Proveedor de Seguros</Button>
          </div>
        </div>

        <div className="cont-3">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Número de contacto</th>
                  <th>Email</th>
                  <th>Sitio web</th>
                  <th>Dirección</th>
                  <th>Ciudad</th>
                  <th>Estado</th>
                  <th>País</th>
                  <th>Código postal</th>
                  <th>Detalles de cobertura</th>
                  <th>Enlace URL del logo</th>
                  <th>Es preferido</th>
                  <th>ID de la red de seguros</th>
                  <th>Numero de contacto de la atención al cliente</th>
                  <th>Regiones aceptadas</th>
                  <th>Cantidad máxima de cobertura</th>
                  <th>Está activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {insuranceProviderTemp.map((val) => (
                  <tr key={val.InsuranceProviderID}>
                    <td>{val.InsuranceProviderID}</td>
                    <td>{val.Name}</td>
                    <td>{val.ContactNumber}</td>
                    <td>{val.Email}</td>
                    <td>{val.Website}</td>
                    <td>{val.Address}</td>
                    <td>{val.City}</td>
                    <td>{val.State}</td>
                    <td>{val.Country}</td>
                    <td>{val.ZipCode}</td>
                    <td>{val.CoverageDetails}</td>
                    <td>{val.LogoUrl}</td>
                    <td>{val.IsPreferred ? "Sí" : "No"}</td>
                    <td>{val.NetworkTypeId}</td>
                    <td>{val.CustomerSupportContact}</td>
                    <td>{val.AcceptedRegions}</td>
                    <td>{val.MaxCoverageAmount}</td>
                    <td>{val.IsActive ? "Sí" : "No"}</td>
                    <td>
                      <Button color="primary" onClick={() => cargarEditar(val.InsuranceProviderID)}>Editar</Button>{" "}
                      <Button color="danger" onClick={() => cargarEliminar(val.InsuranceProviderID)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <InsuranceProvidersCreateModal
          isOpen={modalSave}
          toggle={toggleSave}
          save={save}
          setSave={setSave}
          onSave={saveInsuranceProvider}
        />

        <InsuranceProvidersUpdateModal
          isOpen={modalUpdate}
          toggle={toggleUpdate}
          edit={edit}
          setEdit={setEdit}
          onUpdate={updateInsuranceProvider}
        />

        <InsuranceProvidersDeleteModal
          isOpen={modalDelete}
          toggle={toggleDelete}
          eliminar={eliminar}
          onDelete={deleteInsuranceProvider}
        />

        <Outlet />
      </div>
    </div>
  );
};