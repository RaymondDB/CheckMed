import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./css/Pacientes.css";
import Sidebar from "../components/Sidebar";
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

export const Empleados = () => {
  /*COMBOBOXES*/

  const [sucursalcombo, setSucursalCombo] = useState([]);

  /*INFO COMBOBOXES*/
  Axios.get("http://localhost:3000/sucursales/mostrarSucursal").then(
    (response) => {
      setSucursalCombo(response.data);
    }
  );

  /* Rellenar y buscar */
  const [empleadoArray, setEmpleadoArray] = useState([]);
  const [empleadoTemp, setEmpleadoTemp] = useState([]);
  const [Busqueda, setBusqueda] = useState("");

  const mostrar = () => {
    Axios.get("http://localhost:3000/empleados/mostrarEmpleados").then(
      (response) => {
        setEmpleadoTemp(response.data);
        setEmpleadoArray(response.data);
      }
    );
  };

  useEffect(() => {
    mostrar();
  }, []);

  const filtrarInfo = (busqueda) => {
    var resultadobusqueda = empleadoArray.filter((elemento) => {
      if (
        elemento.ID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.Cedula.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Nombre.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Sexo.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Direccion.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Telefono.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.F_Nacimiento.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.C_Sucursal.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setEmpleadoTemp(resultadobusqueda);
  };
  const handlechange = (e) => {
    setBusqueda(e.target.value);
    filtrarInfo(e.target.value);
  };

  /*INSERTAR EMPLEADO*/

  const [modalSave, setModalSave] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleSave = () => setModalSave(!modalSave);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const [cedulaSave, setCedulaSave] = useState("");
  const [nombreSave, setNombreSave] = useState("");
  const [sexoSave, setSexoSave] = useState("");
  const [direccionSave, setDireccionSave] = useState("");
  const [telefonoSave, setTelefonoSave] = useState("");
  const [c_sucursalSave, setC_sucursalSave] = useState("");
  const [f_nacimientoSave, setF_naciminetoSave] = useState("");

  const saveEmpleado = () => {
    Axios.post("http://localhost:3000/empleados/guardarEmpleados", {
      Cedula: cedulaSave,
      Nombre: nombreSave,
      Sexo: sexoSave,
      Direccion: direccionSave,
      Telefono: telefonoSave,
      F_Nacimiento: f_nacimientoSave,
      C_Sucursal: c_sucursalSave,
    }).then(() => {
      toggleSave();
      console.log("Empleado agregado");
    });
  };

  /*ACTUALIZAR EMPLEADO*/

  const [actualizar, setactualizar] = useState([]);
  const [cedulaUpdate, setCedulaUpdate] = useState("");
  const [nombreUpdate, setNombreUpdate] = useState("");
  const [sexoUpdate, setSexoUpdate] = useState("");
  const [direccionUpdate, setDireccionUpdate] = useState("");
  const [telefonoUpdate, setTelefonoUpdate] = useState("");
  const [c_sucursalUpdate, setC_sucursalUpdate] = useState("");

  const Actualizar = (id) => {
    Axios.post("http://localhost:3000/empleados/EmpleadosAll", {
      ID: id,
    }).then((response) => {
      setactualizar(response.data);
    });
  };

  const updateEmpleado = (id) => {
    Axios.post("http://localhost:3000/empleados/empleadoAct", {
      ID: id,
      Cedula: cedulaUpdate,
      Nombre: nombreUpdate,
      Sexo: sexoUpdate,
      Direccion: direccionUpdate,
      Telefono: telefonoUpdate,
      C_Sucursal: c_sucursalUpdate,
    }).then(() => {
      toggleUpdate();
    });
  };

  /*DELETE*/
  const [eliminar, setEliminar] = useState([]);
  const [nombreDelete, setNombreDelete] = useState("");

  const Eliminar = (id) => {
    Axios.post("http://localhost:3000/empleados/EmpleadosAll", {
      ID: id,
    }).then((response) => {
      setEliminar(response.data);
    });
  };

  const deleteEmpleado = (id) => {
    Axios.post("http://localhost:3000/empleados/eliminar", {
      ID: id,
    }).then(() => {
      toggleDelete();
    });
  };

  function uploadpage() {
    window.location.reload(false);
  }

  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="contenido">
          <div className="cont-1">
            <div className="title_table">
              <i className="bx bx-group"></i>
              <h1>EMPLEADOS</h1>
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
              <Button onClick={toggleSave}>AGREGAR EMPLEADO </Button>
            </div>
          </div>
          <div className="cont-3">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Cedula</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">F. Nacimiento</th>
                    <th scope="col">C. Sucursal</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {empleadoTemp.map((val, key) => {
                    return (
                      <tr>
                        <td>{val.ID}</td>
                        <td>{val.Cedula}</td>
                        <td>{val.Nombre}</td>
                        <td>{val.Sexo}</td>
                        <td>{val.Direccion}</td>
                        <td>{val.Telefono}</td>
                        <td>{val.F_Nacimiento.substring(0, 10)}</td>
                        <td>{val.C_Sucursal}</td>
                        <td>
                          {""}
                          <Button
                            color="primary"
                            className="space"
                            onClick={() => {
                              Actualizar(val.ID);
                              setCedulaUpdate(val.Cedula);
                              setNombreUpdate(val.Nombre);
                              setSexoUpdate(val.Sexo);
                              setDireccionUpdate(val.Direccion);
                              setTelefonoUpdate(val.Telefono);
                              setC_sucursalUpdate(val.C_Sucursal);
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

          <Modal isOpen={modalSave} toggle={modalSave}>
            <ModalHeader toggle={toggleSave}>AGREGAR EMPLEADO</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="Cedula">Cedula</Label>
                <Input
                  id="Cedula"
                  placeholder="Cedula"
                  onChange={(event) => {
                    setCedulaSave(event.target.value);
                  }}
                ></Input>
              </FormGroup>

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
                <Label for="Sexo">Sexo</Label>
                <Input
                  id="Sexo"
                  placeholder="Sexo"
                  onChange={(event) => {
                    setSexoSave(event.target.value);
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

              <FormGroup>
                <Label for="Telefono">Telefono</Label>
                <Input
                  id="Telefono"
                  placeholder="Telefono"
                  onChange={(event) => {
                    setTelefonoSave(event.target.value);
                  }}
                ></Input>
              </FormGroup>

              <FormGroup>
                <Label for="F_Nacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="F_Nacimiento"
                  type="date"
                  placeholder="F_Nacimiento"
                  onChange={(event) => {
                    setF_naciminetoSave(event.target.value);
                  }}
                ></Input>
              </FormGroup>

              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="C_Sucursal">Codigo Sucursal</Label>
                    <Input
                      type="select"
                      id="C_Sucursal"
                      onChange={(event) => {
                        setC_sucursalSave(event.target.value);
                      }}
                    >
                      <option disabled selected>
                        C_Sucursal
                      </option>
                      {sucursalcombo.map((val, key) => {
                        return (
                          <option value={val.ID}>{val.Nombre}</option>
                        )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  saveEmpleado();
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

          <Modal isOpen={modalUpdate} toggle={modalUpdate}>
            {actualizar.map((val, key) => {
              return (
                <>
                  <ModalHeader toggle={toggleUpdate}>
                    ACTUALIZAR EMPLEADO
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="Cedula">Cedula</Label>
                      <Input
                        id="Cedula"
                        placeholder="Cedula"
                        defaultValue={val.Cedula}
                        onChange={(event) => {
                          setCedulaUpdate(event.target.value);
                        }}
                      ></Input>
                    </FormGroup>

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
                      <Label for="Sexo">Sexo</Label>
                      <Input
                        id="Sexo"
                        placeholder="Sexo"
                        defaultValue={val.Sexo}
                        onChange={(event) => {
                          setSexoUpdate(event.target.value);
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

                    <FormGroup>
                      <Label for="Telefono">Telefono</Label>
                      <Input
                        id="Telefono"
                        placeholder="Telefono"
                        defaultValue={val.Telefono}
                        onChange={(event) => {
                          setTelefonoUpdate(event.target.value);
                        }}
                      ></Input>
                    </FormGroup>

                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="C_Sucursal">Codigo Sucursal</Label>
                          <Input
                            type="select"
                            id="C_Sucursal"
                            defaultValue={val.C_Sucursal}
                            onChange={(event) => {
                              setC_sucursalUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected>
                              C_Sucursal
                            </option>
                            {sucursalcombo.map((val, key) => {
                              return (
                                <option value={val.ID}>{val.Nombre}</option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() => {
                        updateEmpleado(val.ID);
                        uploadpage();
                      }}
                    >
                      ACTUALIZAR
                    </Button>{" "}
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
                    ELIMINAR EMPLEADO
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="Pregunta">
                        ¿Estas seguro de que quieres eliminar este EMPLEADO?
                      </Label>
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
                            disabled
                          ></Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() => {
                        deleteEmpleado(val.ID);
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
