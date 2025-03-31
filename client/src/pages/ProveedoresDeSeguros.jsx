import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./css/ProveedoresDeSeguros.css";
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

export const InsuranceProviders = () => {
  const [insuranceProviderArray, setInsuranceProviderArray] = useState([]);
  const [insuranceProviderTemp, setInsuranceProviderTemp] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const mostrar = () => {
    Axios.get("http://localhost:3000/insuranceProviders/").then((response) => {
        setInsuranceProviderArray(response.data.data);
        setInsuranceProviderTemp(response.data.data);
    });
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

  const [modalSave, setModalSave] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleSave = () => setModalSave(!modalSave);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const [save, setSave] = useState({
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

  const saveInsuranceProvider = () => {
    Axios.post("hhttp://localhost:3000/insuranceProviders", {
    Name: save.Name,
    ContactNumber: save.ContactNumber,
    Email: save.Email,
    Website: save.Website,
    Address: save.Address,
    City: save.City,
    State: save.State,
    Country:  save.Country,
    ZipCode: save.ZipCode,
    CoverageDetails: save.CoverageDetails,
    LogoUrl: save.LogoUrl,
    IsPreferred: save.IsPreferred,
    NetworkTypeId: save.NetworkTypeId,
    CustomerSupportContact: save.CustomerSupportContact,
    AcceptedRegions: save.AcceptedRegions,
    MaxCoverageAmount: save.MaxCoverageAmount,
    IsActive: true,
    }).then(() => {
      toggleSave();
      mostrar();
    });
  };

  const [edit, setEdit] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const cargarEditar = (id) => {
    setSelectedId(id);
    Axios.get(`http://localhost:3000/insuranceProviders/${id}`).then((res) => {
        const val = res.data;
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
        IsActive: true,
      });
      toggleUpdate();
    });
  };

  const updateInsuranceProvider = () => {
    Axios.put(`http://localhost:3000/insuranceProviders/${selectedId}`, {
        Name: edit.Name,
        ContactNumber: edit.ContactNumber,
        Email: edit.Email,
        Website: edit.Website,
        Address: edit.Address,
        City: edit.City,
        State: edit.State,
        Country:  edit.Country,
        ZipCode: edit.ZipCode,
        CoverageDetails: edit.CoverageDetails,
        LogoUrl: edit.LogoUrl,
        IsPreferred: edit.IsPreferred,
        NetworkTypeId: edit.NetworkTypeId,
        CustomerSupportContact: edit.CustomerSupportContact,
        AcceptedRegions: edit.AcceptedRegions,
        MaxCoverageAmount: edit.MaxCoverageAmount,
        IsActive: true,
    }).then(() => {
      toggleUpdate();
      mostrar();
    });
  };

  const [eliminar, setEliminar] = useState({});
  const cargarEliminar = (id) => {
    setSelectedId(id);
    Axios.get(`http://localhost:3000/insuranceProviders/${id}`).then((res) => {
      setEliminar(res.data);
      toggleDelete();
    });
  };

  const deleteInsuranceProvider = () => {
    Axios.delete(`http://localhost:3000/insuranceProviders/${selectedId}`).then(() => {
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
                  <th>Numero de contacto</th>
                  <th>Email</th>
                  <th>Sitio web</th>
                  <th>Direccion</th>
                  <th>Ciudad</th>
                  <th>Estado</th>
                  <th>Pais</th>
                  <th>Codigo postal</th>
                  <th>Detalles de cobertura</th>
                  <th>Enlace URL del logo</th>
                  <th>Es preferido</th>
                  <th>ID de la red de seguros</th>
                  <th>Numero de contacto de la atencion al cliente</th>
                  <th>Regiones aceptadas</th>
                  <th>Cantidad maxima de cobertura</th>
                  <th>Esta activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {insuranceProviderTemp.map((val) => (
                  <tr key={val.InsurnaceProviderID}>
                    <td>{val.InsurnaceProviderID}</td>
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
                      <Button color="primary" onClick={() => cargarEditar(val.InsurnaceProviderID)}>Editar</Button>{" "}
                      <Button color="danger" onClick={() => cargarEliminar(val.InsurnaceProviderID)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal Save */}
        <Modal isOpen={modalSave} toggle={toggleSave}>
        <ModalHeader toggle={toggleSave}>Agregar Proveedor de Seguros</ModalHeader>
        <ModalBody>
            {[
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
            { label: "Es preferido", key: "IsPreferred", type: "checkbox" },
            { label: "ID de la red de seguros", key: "NetworkTypeId", type: "number" },
            { label: "Numero de contacto de la atencion al cliente", key: "CustomerSupportContact" },
            { label: "Regiones aceptadas", key: "AcceptedRegions" },
            { label: "Cantidad maxima de cobertura", key: "MaxCoverageAmount", type: "number" },
            ].map((field, i) => (
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
                checked={save.IsActive || false}
                onChange={(e) => setSave({ ...save, IsActive: e.target.checked })}
                />{' '}
                Activo
            </Label>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={saveInsuranceProvider}>Guardar</Button>
            <Button color="danger" onClick={toggleSave}>Cancelar</Button>
        </ModalFooter>
        </Modal>
        
        {/* Modal Edit */}
        <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
        <ModalHeader toggle={toggleUpdate}>Editar Proveedores de Seguros</ModalHeader>
        <ModalBody>
            {Object.entries(edit).map(([key, val], i) => (
            key !== 'IsActive' ? (
                <FormGroup key={i}>
                <Label>{key}</Label>
                <Input
                    type={key === 'date' ? 'date' : key === 'IsPreferred' ? 'checkbox' : 'text'}
                    value={key === 'IsPreferred' ? undefined : val}
                    checked={key === 'IsPreferred' ? edit[key] : undefined}
                    onChange={(e) =>
                    setEdit({
                        ...edit,
                        [key]: key === 'IsPreferred' ? e.target.checked :
                        key === 'NetworkTypeId' || key === 'MaxCoverageAmount' ? parseFloat(e.target.value) : e.target.value,
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
                checked={edit.IsActive}
                onChange={(e) => setEdit({ ...edit, IsActive: e.target.checked })}
                />{' '}
                Activo
            </Label>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={updateInsuranceProvider}>Actualizar</Button>
            <Button color="danger" onClick={toggleUpdate}>Cancelar</Button>
        </ModalFooter>
        </Modal>

        {/* Modal Delete */}
        <Modal isOpen={modalDelete} toggle={toggleDelete}>
          <ModalHeader toggle={toggleDelete}>Eliminar Proveedor de Seguros</ModalHeader>
          <ModalBody>
            <p>¿Estás seguro de eliminar al proveedor de seguros <b>{eliminar?.Name}</b>?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={deleteInsuranceProvider}>Eliminar</Button>
            <Button color="secondary" onClick={toggleDelete}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Outlet />
      </div>
    </div>
  );
};