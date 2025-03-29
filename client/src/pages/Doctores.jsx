import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./css/Doctores.css";
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
import Sidebar from "../components/Sidebar";

export const Sucursales = () => {
  /* SEARCH */
  const [sucursalArray, setsucursalArray] = useState([]);
  const [sucursalTemp, setsucursalTemp] = useState([]);
  const [Busqueda, setBusqueda] = useState("");

  /*Rellenar y BUscar*/
  const mostrar = () => {
    Axios.get("http://localhost:3000/sucursales/mostrarSucursal").then(
      (response) => {
        setsucursalTemp(response.data);
        setsucursalArray(response.data);
      }
    );
  };

  useEffect(() => {
    mostrar();
  }, []);

  const filtrarInfo = (busqueda) => {
    var resultadobusqueda = sucursalArray.filter((elemento) => {
      if (
        elemento.ID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.Nombre.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Direccion.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setsucursalTemp(resultadobusqueda);
  };
  const handlechange = (e) => {
    setBusqueda(e.target.value);
    filtrarInfo(e.target.value);
  };

  function uploadpage() {
    window.location.reload(false);
  }
  /*GUARDAR SUCURSALES*/
  const [modalSave, setModalSave] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleSave = () => setModalSave(!modalSave);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const toggleDelete = () => setModalDelete(!modalDelete);

  /* Saves */
  const [nombreSave, setNombreSave] = useState("");
  const [direccionSave, setDireccionSave] = useState("");

  const saveSucursal = () => {
    Axios.post("http://localhost:3000/sucursales/guardarSucursal", {
      Nombre: nombreSave,
      Direccion: direccionSave,
    }).then(() => {
      toggleSave();
      console.log("Sucursal agregada");
    });
  };

  /*EDIT*/
  const [actualizar, setactualizar] = useState([]);
  const [nombreUpdate, setNombreUpdate] = useState("");
  const [direccionUpdate, setDireccionUpdate] = useState("");

  const Actualizar = (id) => {
    Axios.post("http://localhost:3000/sucursales/All", {
      ID: id,
    }).then((response) => {
      setactualizar(response.data);
    });
  };

  const updateSucursal = (id) => {
    Axios.post("http://localhost:3000/sucursales/sucAct", {
      ID: id,
      Nombre: nombreUpdate,
      Direccion: direccionUpdate,
    }).then(() => {
      toggleUpdate();
    });
  };

  /*DELETE*/
  const [eliminar, setEliminar] = useState([]);
  const [nombreDelete, setNombreDelete] = useState("");

  const Eliminar = (id) => {
    Axios.post("http://localhost:3000/sucursales/All", {
      ID: id,
    }).then((response) => {
      setEliminar(response.data);
    });
  };

  const deleteSucursal = (id) => {
    Axios.post("http://localhost:3000/sucursales/eliminar", {
      ID: id,
    }).then(() => {
      toggleDelete();
    });
  };

  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="contenido">
          <div className="cont-1">
            <div className="title_table">
              <i className="bx bx-store-alt"></i>
              <h1>SUCURSALES</h1>
            </div>
          </div>
          <div className="cont-2">
            <div className="title_header">
              <div className="input_search">
                <input
                  type="search"
                  onChange={handlechange}
                  placeholder="Buscar..."
                />
                <i className="bx bx-search-alt-2 search"></i>
              </div>
              <Button onClick={toggleSave}>AGREGAR SUCURSAL </Button>
            </div>
          </div>
          <div className="cont-3">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {sucursalTemp.map((val, key) => {
                    return (
                      <tr>
                        <td>{val.ID}</td>
                        <td>{val.Nombre}</td>
                        <td>{val.Direccion}</td>
                        <td>
                          {""}
                          <Button
                            color="primary"
                            className="space"
                            onClick={() => {
                              Actualizar(val.ID);
                              setNombreUpdate(val.Nombre);
                              setDireccionUpdate(val.Direccion);
                              toggleUpdate();
                            }}
                          >
                            Editar
                          </Button>
                          <Button
                            color="danger"
                            className="space"
                            onClick={() => {
                              Eliminar(val.ID);
                              setNombreDelete(val.Nombre);
                              toggleDelete();
                            }}
                          >
                            ELIMINAR
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <Modal isOpen={modalSave} toggle={toggleSave}>
            <ModalHeader toggle={toggleSave}>AGREGAR SUCURSAL</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="Nombre">Nombre</Label>
                <Input
                  id="Nombre"
                  placeholder="Nombre"
                  onChange={(event) => {
                    setNombreSave(event.target.value);
                  }}
                ></Input>
              </FormGroup>

              <FormGroup>
                <Label for="Direccion">Direccion</Label>
                <Input
                  id="Direccion"
                  placeholder="Direccion"
                  onChange={(event) => {
                    setDireccionSave(event.target.value);
                  }}
                ></Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  saveSucursal();
                  uploadpage();
                }}
              >
                GUARDAR
              </Button>{" "}
              <Button color="danger" onClick={toggleSave}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
            {actualizar.map((val, key) => {
              return (
                <>
                  <ModalHeader toggle={toggleUpdate}>
                    ACTUALIZAR SUCURSAL
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="Nombre">Nombre</Label>
                      <Input
                        id="Nombre"
                        placeholder="Nombre"
                        defaultValue={val.Nombre}
                        onChange={(event) => {
                          setNombreUpdate(event.target.value);
                        }}
                      ></Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="Direccion">Direccion</Label>
                      <Input
                        id="Direccion"
                        placeholder="Direccion"
                        defaultValue={val.Direccion}
                        onChange={(event) => {
                          setDireccionUpdate(event.target.value);
                        }}
                      ></Input>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() => {
                        updateSucursal(val.ID);
                        uploadpage();
                      }}
                    >
                      ACTUALIZAR
                    </Button>
                    <Button color="danger" onClick={toggleUpdate}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </>
              );
            })}
          </Modal>
          <Modal isOpen={modalDelete} toggle={toggleDelete}>
            {eliminar.map((val, key) => {
              return (
                <>
                  <ModalHeader toggle={toggleDelete}>
                    ELIMINAR SUCURSAL
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="Pregunta">¿Estas seguro de que quieres eliminar esta Sucursal?</Label>
                    </FormGroup>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Input
                            id="Nombre"
                            placeholder="Nombre"
                            defaultValue={val.Nombre}
                            onChange={(event) => {
                              setNombreDelete(event.target.value);
                            }}
                          disabled></Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() => {
                        deleteSucursal(val.ID);
                        uploadpage();
                      }}
                    >
                      ELIMINAR
                    </Button>
                    <Button color="danger" onClick={toggleDelete}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </>
              );
            })}
          </Modal>
          <Outlet />
        </div>
      </div>
    </>
  );
};
