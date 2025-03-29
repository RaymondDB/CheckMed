import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./css/Usuario.css";
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

export const Usuarios = () => {
  /*Comboboxes Usuarios*/
  const [rolCombo, setrolCombo] = useState([]);
  const [empleadoCombo, setempleadoCombo] = useState([]);

  /*INFO COMBOBOXES*/
  Axios.get("http://localhost:3000/roles/mostrarRoles").then((response) => {
    setrolCombo(response.data);
  });

  Axios.get("http://localhost:3000/empleados/mostrarEmpleados").then(
    (response) => {
      setempleadoCombo(response.data);
    }
  );

  /*Rellenar y Buscar Tabla*/
  const [usuarioArray, setUsuarioArray] = useState([]);
  const [usuarioTemp, setUsuarioTemp] = useState([]);
  const [Busqueda, setBusqueda] = useState("");

  const mostrar = () => {
    Axios.get("http://localhost:3000/usuarios/usuarioMostrar").then(
      (response) => {
        setUsuarioTemp(response.data);
        setUsuarioArray(response.data);
      }
    );
  };

  useEffect(() => {
    mostrar();
  }, []);

  const filtrarInfo = (busqueda) => {
    var resultadobusqueda = usuarioArray.filter((elemento) => {
      if (
        elemento.ID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.Username.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Contraseña.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.C_Rol.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.C_Empleado.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Observaciones.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setUsuarioTemp(resultadobusqueda);
  };
  const handlechange = (e) => {
    setBusqueda(e.target.value);
    filtrarInfo(e.target.value);
  };

  /*INSERTAR USUARIO*/

  const [modalSave, setModalSave] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState("");
  const toggleSave = () => setModalSave(!modalSave);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const [usernameSave, setUsernameSave] = useState("");
  const [contraseñaSave, setContraseñaSave] = useState("");
  const [c_rolSave, setC_rolSave] = useState("");
  const [c_empleadoSave, setC_empleadoSave] = useState("");
  const [observacionesSave, setObservacionesSave] = useState("");

  const saveUsuario = () => {
    Axios.post("http://localhost:3000/usuarios/guardarUsuario", {
      Username: usernameSave,
      Contraseña: contraseñaSave,
      C_Rol: c_rolSave,
      C_Empleado: c_empleadoSave,
      Observaciones: observacionesSave,
    }).then(() => {
      toggleSave();
      console.log("Usuario agregado");
    });
  };

  /*ACTUALIZAR USUARIO*/

  const [actualizar, setactualizar] = useState([]);
  const [usernameUpdate, setUsernameUpdate] = useState("");
  const [ContraseñaUpdate, setContraseñaUpdate] = useState("");
  const [c_rolUpdate, setc_rolUpdate] = useState("");
  const [c_empleadoUpdate, setc_empleadoUpdate] = useState("");

  const Actualizar = (id) => {
    Axios.post("http://localhost:3000/usuarios/UsuarioAll", {
      ID: id,
    }).then((response) => {
      setactualizar(response.data);
    });
  };

  const updateUsuario = (id) => {
    Axios.post("http://localhost:3000/usuarios/Usuarioact", {
      ID: id,
      Username: usernameUpdate,
      Contraseña: ContraseñaUpdate,
      C_Rol: c_rolUpdate,
      C_Empleado: c_empleadoUpdate,
    }).then(() => {
      toggleUpdate();
    });
  };

  /*DELETE*/
  const [eliminar, setEliminar] = useState([]);
  const [nombreDelete, setNombreDelete] = useState("");

  const Eliminar = (id) => {
    Axios.post("http://localhost:3000/usuarios/UsuarioAll", {
      ID: id,
    }).then((response) => {
      setEliminar(response.data);
    });
  };

  const deleteUsuario = (id) => {
    Axios.post("http://localhost:3000/usuarios/eliminar", {
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
              <i className="bx bx-user-pin"></i>
              <h1>USUARIOS</h1>
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
              <Button onClick={toggleSave}>AGREGAR USUARIO </Button>
            </div>
          </div>
          <div className="cont-3">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Contraseña</th>
                    <th scope="col">Rol</th>
                    <th scope="col">ID Empleado</th>
                    <th scope="col">Observaciones</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {usuarioTemp.map((val, key) => {
                    return (
                      <tr>
                        <td>{val.ID}</td>
                        <td>{val.Username}</td>
                        <td>{val.Contraseña}</td>
                        <td>{val.C_Rol}</td>
                        <td>{val.C_Empleado}</td>
                        <td>{val.Observaciones}</td>
                        <td>
                          {""}
                          <Button
                            color="primary"
                            className="space"
                            onClick={() => {
                              Actualizar(val.ID);
                              setUsernameUpdate(val.Username);
                              setContraseñaUpdate(val.Contraseña);
                              setc_rolUpdate(val.C_Rol);
                              setc_empleadoUpdate(val.C_Empleado);
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
                              setNombreDelete(val.Username);
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
            <ModalHeader toggle={toggleSave}>AGREGAR USUARIO</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="Username">Username</Label>
                <Input
                  id="Username"
                  placeholder="Username"
                  onChange={(event) => {
                    setUsernameSave(event.target.value);
                  }}
                ></Input>
              </FormGroup>

              <FormGroup>
                <Label for="Contraseña">Contraseña</Label>
                <Input
                  id="Contraseña"
                  placeholder="Contraseña"
                  onChange={(event) => {
                    setContraseñaSave(event.target.value);
                  }}
                ></Input>
              </FormGroup>

              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="C_Rol">Rol</Label>
                    <Input
                      type="select"
                      id="C_Rol"
                      onChange={(event) => {
                        setC_rolSave(event.target.value);
                      }}
                    >
                      <option disabled selected>
                        Rol
                      </option>
                      {rolCombo.map((val, key) => {
                        return <option value={val.ID}>{val.Nombre}</option>;
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="C_Empleado">Empleado</Label>
                    <Input
                      type="select"
                      id="C_Empleado"
                      onChange={(event) => {
                        setC_empleadoSave(event.target.value);
                      }}
                    >
                      <option disabled selected>
                        Empleado
                      </option>
                      {empleadoCombo.map((val, key) => {
                        return <option value={val.ID}>{val.Nombre}</option>;
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <Label for="Observaciones">Observaciones</Label>
                <Input
                  id="Observaciones"
                  placeholder="Observaciones"
                  onChange={(event) => {
                    setObservacionesSave(event.target.value);
                  }}
                ></Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  saveUsuario();
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
                    ACTUALIZAR USUARIO
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="Username">Nombre</Label>
                      <Input
                        id="Username"
                        placeholder="Username"
                        defaultValue={val.Username}
                        onChange={(event) => {
                          setUsernameUpdate(event.target.value);
                        }}
                      ></Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="Contraseña">Contraseña</Label>
                      <Input
                        id="Contraseña"
                        placeholder="Contraseña"
                        defaultValue={val.Contraseña}
                        onChange={(event) => {
                          setContraseñaUpdate(event.target.value);
                        }}
                      ></Input>
                    </FormGroup>

                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="C_Rol">C_Rol</Label>
                          <Input
                            type="select"
                            id="C_Rol"
                            defaultValue={val.C_Rol}
                            onChange={(event) => {
                              setc_rolUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected>
                              C_Rol
                            </option>
                            {rolCombo.map((val, key) => {
                              return (
                                <option value={val.ID}>{val.Nombre}</option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="C_Empleado">C_Empleado</Label>
                          <Input
                            type="select"
                            id="C_Empleado"
                            defaultValue={val.C_Empleado}
                            onChange={(event) => {
                              setc_empleadoUpdate(event.target.value);
                            }}
                          >
                            <option disabled selected>
                              C_Empleado
                            </option>
                            {empleadoCombo.map((val, key) => {
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
                        updateUsuario(val.ID);
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
                    ELIMINAR USUARIO
                  </ModalHeader>
                  <ModalBody>
                    <FormGroup>
                      <Label for="Pregunta">
                        ¿Estas seguro de que quieres eliminar este USUARIO?
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        id="Username"
                        placeholder="Username"
                        defaultValue={val.Username}
                        onChange={(event) => {
                          setNombreDelete(event.target.value);
                        }}
                        disabled
                      ></Input>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      className="space"
                      onClick={() => {
                        deleteUsuario(val.ID);
                        uploadpage();
                      }}
                      disabled
                    >
                      ELIMINAR
                    </Button>
                    <Button
                      color="danger"
                      className="space"
                      onClick={toggleDelete}
                    >
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
