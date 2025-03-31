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

  /*Rellenar y Buscar Tabla*/
  const [usuarioArray, setUsuarioArray] = useState([]);
  const [usuarioTemp, setUsuarioTemp] = useState([]);
  const [Busqueda, setBusqueda] = useState("");

  const mostrar = () => {
    Axios.get("http://localhost:3000/users").then(
      (response) => {
        setUsuarioTemp(response.data.data);
        setUsuarioArray(response.data.data);
      }
    );
  };

  useEffect(() => {
    mostrar();
  }, []);

  const filtrarInfo = (busqueda) => {
    var resultadobusqueda = usuarioArray.filter((elemento) => {
      if (
        elemento.UserID.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.FirstName.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.LastName.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Email.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.Password.toString()
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        elemento.RoleID.toString()
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
    setUsuarioTemp(resultadobusqueda);
  };
  const handlechange = (e) => {
    setBusqueda(e.target.value);
    filtrarInfo(e.target.value);
  };

  /*INSERTAR USUARIO*/

  const [modalSave, setModalSave] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleSave = () => setModalSave(!modalSave);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const [save,setSave] = useState({
    first: "", last: "", email: "", pass:"", role:1
  });

  
  const saveUsuario = () => {
    Axios.post("http://localhost:3000/users", {
      FirstName: save.first,
      LastName: save.last,
      Password: save.pass,
      Email: save.email,
      RoleID: save.role,
      IsActive: true
    }).then(() => {
      toggleSave();
      console.log("Usuario agregado");
    });
  };

  /*ACTUALIZAR USUARIO*/

  const [actualizar, setactualizar] = useState({});
  const [edit,setEdit] = useState({
    first: "", last: "", email: "", pass:"", role:""
  });

  const Actualizar = (id) => {
    Axios.get(`http://localhost:3000/users/${id}`).then((response) => {
      setactualizar(response.data.data);
      toggleUpdate();
    });
  };

  const updateUsuario = (id) => {
    Axios.put(`http://localhost:3000/users/${id}`, {
      FirstName: edit.first,
      LastName: edit.last,
      Password: edit.pass,
      Email: edit.email,
      RoleID: edit.role,
    }).then(() => {
      toggleUpdate();
    });
  };

  /*DELETE*/
  const [eliminar, setEliminar] = useState([]);
  const [nombreDelete, setNombreDelete] = useState("");

  const Eliminar = (id) => {
    Axios.get(`http://localhost:3000/users/${id}`).then((response) => {
      setEliminar(response.data.data);
      toggleDelete();
    });
  };

  const deleteUsuario = (id) => {
    Axios.delete(`http://localhost:3000/users/${id}`).then(() => {
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
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Role</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">IsActive</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {usuarioTemp.map((val, key) => {
                    return (
                      <tr>
                        <td>{val.UserID}</td>
                        <td>{val.FirstName}</td>
                        <td>{val.LastName}</td>
                        <td>{val.Email}</td>
                        <td>{val.Password}</td>
                        <td>{val.RoleID}</td>
                        <td>{val.CreatedAt}</td>
                        <td>{val.UpdatedAt}</td>
                        <td>{val.IsActive ? "Yes" : "No"}</td>
                        <td>
                          <Button
                            color="primary"
                            className="space"
                            onClick={() => {
                              setEdit({first: val.FirstName, last: val.LastName, email: val.Email, pass: val.Password, role: val.RoleID})
                              Actualizar(val.UserID);
                            }}
                          >
                            Editar
                          </Button>
                          <Button
                            color="danger"
                            className="space"
                            onClick={() => {
                              setNombreDelete(val.FirstName + " " + val.LastName);
                              Eliminar(val.UserID);
                              
                            }}
                          >
                            Desactivar
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
                <Label for="FirstName">First Name</Label>
                <Input
                  id="FirstName"
                  placeholder="FirstName"
                  onChange={(event) => {
                    setSave({...save, first: event.target.value});
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="LastName">Last Name</Label>
                <Input
                  id="LastName"
                  placeholder="LastName"
                  onChange={(event) => {
                    setSave({...save, last: event.target.value});
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input
                  id="Email"
                  placeholder="Email"
                  onChange={(event) => {
                    setSave({...save, email: event.target.value});
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="Pass">Password</Label>
                <Input
                  id="pass"
                  placeholder="pass"
                  onChange={(event) => {
                    setSave({...save, pass: event.target.value});
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Role</Label>
                  <Input type="select" name="select" id="exampleSelect" onChange={(event) => {setSave({...save, role: event.target.value});}}>
                  <option>1</option>
                  <option>2</option></Input>
                
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
                <>
                  <ModalHeader toggle={toggleUpdate}>
                    ACTUALIZAR USUARIO
                  </ModalHeader>
                  <ModalBody>
                  <FormGroup>
                <Label for="FirstName">First Name</Label>
                <Input
                  id="FirstName"
                  defaultValue={actualizar.FirstName}
                  onChange={(event) => {
                    setEdit({...edit, first: event.target.value});
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="LastName">Last Name</Label>
                <Input
                  id="LastName"
                  defaultValue={actualizar.LastName}
                  onChange={(event) => {
                    setEdit({...edit, last: event.target.value});
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input
                  id="Email"
                  defaultValue={actualizar.Email}
                  onChange={(event) => {
                    setEdit({...edit, email: event.target.value});
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="Pass">Password</Label>
                <Input
                  id="pass"
                  defaultValue={actualizar.Password}
                  onChange={(event) => {
                    setEdit({...edit, pass: event.target.value});
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Role</Label>
                  <Input type="select" name="select" defaultValue={actualizar.RoleID} id="exampleSelect" onChange={(event) => {setEdit({...edit, role: event.target.value})}}>
                  <option>1</option>
                  <option>2</option>
                  </Input>
              </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() => {
                        updateUsuario(actualizar.UserID);
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
          </Modal>

          <Modal isOpen={modalDelete} toggle={toggleDelete}>
            
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
                        defaultValue={eliminar.FirstName + " " + eliminar.LastName} 
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
                        deleteUsuario(eliminar.UserID);
                        uploadpage();
                      }}
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
         
          </Modal>

          <Outlet />
        </div>
      </div>
    </>
  );
};
