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

  const [modalSave, setModalSave] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleSave = () => setModalSave(!modalSave);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const [save, setSave] = useState({
    Name: "",
    Description: "",
    IsActive: true,
  });

  const saveInsuranceNetworkType = () => {
    Axios.post("hhttp://localhost:3000/insuranceNetworkType", {
    Name: save.Name,
    Description: save.Description,
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
    Axios.get(`http://localhost:3000/insuranceNetworkType/${id}`).then((res) => {
        const val = res.data;
      setEdit({
        Name: val.Name,
        Description: val.Description,
        IsActive: true,
      });
      toggleUpdate();
    });
  };

  const updateInsuranceNetworkType = () => {
    Axios.put(`http://localhost:3000/insuranceNetworkType/${selectedId}`, {
        Name: edit.Name,
        Description: edit.Description,
        IsActive: true,
    }).then(() => {
      toggleUpdate();
      mostrar();
    });
  };

  const [eliminar, setEliminar] = useState({});
  const cargarEliminar = (id) => {
    setSelectedId(id);
    Axios.get(`http://localhost:3000/insuranceNetworkType/${id}`).then((res) => {
      setEliminar(res.data);
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
            <i className="bx bx-store-alt"></i>
            <h1>Tipo de Red de Seguros</h1>
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
                  <th>Esta activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {insuranceNetworkTypeTemp.map((val) => (
                  <tr key={val.InsuranceNetworkTypeID}>
                    <td>{val.InsuranceNetworkTypeID}</td>
                    <td>{val.Name}</td>
                    <td>{val.Descripcion}</td>
                    <td>{val.IsActive ? "Sí" : "No"}</td>
                    <td>
                      <Button color="primary" onClick={() => cargarEditar(val.InsuranceNetworkTypeID)}>Editar</Button>{" "}
                      <Button color="danger" onClick={() => cargarEliminar(val.InsuranceNetworkTypeID)}>Eliminar</Button>
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
            { label: "Nombre", key: "Name" },
            { label: "Descripcion", key: "Description" },
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