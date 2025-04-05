import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./css/TipoDeRedesDeSeguros.css";
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

export const InsuranceNetworkType = () => {
  const [insuranceNetworkTypeArray, setInsuranceNetworkTypeArray] = useState([]);
  const [insuranceNetworkTypeTemp, setInsuranceNetworkTypeTemp] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const mostrar = () => {
    Axios.get("http://localhost:3000/insuranceNetworkType/").then((response) => {
        setInsuranceNetworkTypeArray(response.data.data);
        setInsuranceNetworkTypeTemp(response.data.data);
    });
  };

  useEffect(() => {
    mostrar();
  }, []);

  const filtrarInfo = (busqueda) => {
    var resultadobusqueda = insuranceNetworkTypeArray.filter((elemento) => {
      if (
        elemento.NetworkTypeId.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
          elemento.Name.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
          elemento.Description.toString()
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
    setInsuranceNetworkTypeTemp(resultadobusqueda);
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
    NetworkTypeID: "",
    Name: "",
    Description: "",
    IsActive: true,
  });

  const saveInsuranceNetworkType = () => {
    Axios.post("http://localhost:3000/insuranceNetworkType", save).then(() => {
      toggleSave();
      mostrar();
    });
    console.log("Datos a enviar:", save);
  };

 const [edit, setEdit] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const cargarEditar = (id) => {
    setSelectedId(id);
    Axios.get(`http://localhost:3000/insuranceNetworkType/${id}`).then((res) => {
      const val = res.data.data
      setEdit({
        Name: val.Name,
        Description: val.Description,
        IsActive: val.IsActive
      });
      toggleUpdate();
    });
  };

  const updateInsuranceNetworkType = () => {
    Axios.put(`http://localhost:3000/insuranceNetworkType/${selectedId}`, edit).then(() => {
      toggleUpdate();
      mostrar();
    });
  };

  const [eliminar, setEliminar] = useState({});
  const cargarEliminar = (id) => {
    setSelectedId(id);
    Axios.get(`http://localhost:3000/insuranceNetworkType/${id}`).then((res) => {
      setEliminar(res.data.data);
      toggleDelete();
    });
  };

  const deleteInsuranceNetworkType = () => {
    Axios.delete(`http://localhost:3000/insuranceNetworkType/${selectedId}`).then(() => {
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
            <i className="bx bx-shield-quarter"></i>
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
                      <Button color="primary" className= "space" onClick={() => cargarEditar(val.NetworkTypeId)}>Editar</Button>{" "}
                      <Button color="danger"  className= "space" onClick={() => cargarEliminar(val.NetworkTypeId)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Modal Save */}
        <Modal isOpen={modalSave} toggle={toggleSave}>
        <ModalHeader toggle={toggleSave}>Agregar Tipo de Red de Seguros</ModalHeader>
        <ModalBody>
        {[
            { label: "ID", key: "NetworkTypeID" },
            { label: "Nombre", key: "Name" },
            { label: "Descripcion", key: "Description" },
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
                    checked={save.IsActive}
                    onChange={(e) => setSave({ ...save, IsActive: e.target.checked })}
                  />{' '}
                  Activo
                </Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={saveInsuranceNetworkType}>Guardar</Button>
              <Button color="danger" onClick={toggleSave}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        
        {/* Modal Edit */}
        <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
          <ModalHeader toggle={toggleUpdate}>Editar Tipo de Red de Seguros</ModalHeader>
          <ModalBody>
            {Object.entries(edit).map(([key, val], i) => (
              key !== 'IsActive' ? (
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
                  checked={edit.IsActive}
                  onChange={(e) => setEdit({ ...edit, IsActive: e.target.checked })}
                />{' '}
                Activo
              </Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={updateInsuranceNetworkType}>Actualizar</Button>
            <Button color="danger" onClick={toggleUpdate}>Cancelar</Button>
          </ModalFooter>
        </Modal>


        {/* Modal Delete */}
        <Modal isOpen={modalDelete} toggle={toggleDelete}>
          <ModalHeader toggle={toggleDelete}>Eliminar Tipo de Red de Seguros</ModalHeader>
          <ModalBody>
            <p>¿Estás seguro de eliminar al tipo de red de seguros <b>{eliminar?.Name}</b>?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={deleteInsuranceNetworkType}>Eliminar</Button>
            <Button color="secondary" onClick={toggleDelete}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Outlet />
      </div>
    </div>
  );
};