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
    var resultadobusqueda = insuranceProviderArray.filter((elemento) => {
      if (
        elemento.InsuranceProviderID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.Name.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.ContactNumber.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Email.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Address.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.City.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.State.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Country.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.ZipCode.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.CoverageDetails.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.CreatedAt.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.UpdatedAt.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.IsActive.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setInsuranceProviderTemp(resultadobusqueda);
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

  const saveInsuranceProvider = () => {
    Axios.post("http://localhost:3000/insuranceProviders", {
    InsuranceProviderID: save.InsuranceProviderID,
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
      const val = res.data.data
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
    });
  };

  const updateInsuranceProvider = () => {
    Axios.put(`http://localhost:3000/insuranceProviders/${selectedId}`, edit).then(() => {
      toggleUpdate();
      mostrar();
    });
  };

  const [eliminar, setEliminar] = useState({});
  const cargarEliminar = (id) => {
    setSelectedId(id);
    Axios.get(`http://localhost:3000/insuranceProviders/${id}`).then((res) => {
      setEliminar(res.data.data);
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
        {/* Modal Save */}
        <Modal isOpen={modalSave} toggle={toggleSave}>
        <ModalHeader toggle={toggleSave}>Agregar Proveedor de Seguros</ModalHeader>
        <ModalBody>
            {[
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
            key !== 'IsActive' && key !== 'IsPreferred'  ? (
                <FormGroup key={i}>
                <Label>{key}</Label>
                <Input
                    type={key === 'date' ? 'date' : 'text'}
                    value={val}
                    onChange={(e) =>
                    setEdit({
                        ...edit,
                        [key]: key === 'NetworkTypeId' || key === 'MaxCoverageAmount' ? parseFloat(e.target.value) : e.target.value,
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
                checked={edit.IsPreferred}
                onChange={(e) => setEdit({ ...edit, IsPreferred: e.target.checked })}
                />{' '}
                Es Preferido
            </Label>
            </FormGroup>
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
            <Button color="primary" onClick={updateInsuranceProvider}> Actualizar</Button>
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