// src/presentation/pages/Usuarios.jsx

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./css/Usuario.css";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import UserCreateModal from "../components/users/UserCreateModal";
import UserEditModal from "../components/users/UserEditModal";
import UserDeleteModal from "../components/users/UserDeleteModal";
import { userService } from "../../application/services/userService";

export const Usuarios = () => {
  const [usuarioArray, setUsuarioArray] = useState([]);
  const [usuarioTemp, setUsuarioTemp] = useState([]);
  const [Busqueda, setBusqueda] = useState("");

  const [modalSave, setModalSave] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [save, setSave] = useState({ firstName: "", lastName: "", email: "", password: "", roleId: 1 });
  const [edit, setEdit] = useState({ firstName: "", lastName: "", email: "", password: "", roleId: "" });
  const [actualizar, setActualizar] = useState({});
  const [eliminar, setEliminar] = useState({});

  const toggleSave = () => setModalSave(!modalSave);
  const toggleUpdate = () => setModalUpdate(!modalUpdate);
  const toggleDelete = () => setModalDelete(!modalDelete);

  const mostrarUsuarios = async () => {
    const usuarios = await userService.getAll();
    setUsuarioArray(usuarios);
    setUsuarioTemp(usuarios);
  };

  useEffect(() => {
    mostrarUsuarios();
  }, []);

  const handleSearch = (e) => {
    const busqueda = e.target.value;
    setBusqueda(busqueda);
    const resultado = usuarioArray.filter((u) =>
      Object.values(u).some((val) => val?.toString().toLowerCase().includes(busqueda.toLowerCase()))
    );
    setUsuarioTemp(resultado);
  };

  const handleCreate = async () => {
    await userService.create(save);
    toggleSave();
    mostrarUsuarios();
  };

  const handleEditInit = async (id) => {
    const user = await userService.getById(id);
    setActualizar(user);
    setEdit({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      roleId: user.roleId,
    });
    toggleUpdate();
  };

  const handleUpdate = async () => {
    await userService.update(actualizar.id, edit);
    toggleUpdate();
    mostrarUsuarios();
  };

  const handleDeleteInit = async (id) => {
    const user = await userService.getById(id);
    setEliminar(user);
    toggleDelete();
  };

  const handleDelete = async () => {
    await userService.remove(eliminar.id);
    toggleDelete();
    mostrarUsuarios();
  };

  return (
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
              <input type="search" onChange={handleSearch} placeholder="Buscar..." />
              <i className="bx bx-search-alt-2 search"></i>
            </div>
            <Button onClick={toggleSave}>AGREGAR USUARIO</Button>
          </div>
        </div>

        <div className="cont-3">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th><th>FirstName</th><th>LastName</th><th>Email</th><th>Password</th><th>Role</th><th>Created At</th><th>Updated At</th><th>IsActive</th><th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {usuarioTemp.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td><td>{u.firstName}</td><td>{u.lastName}</td><td>{u.email}</td><td>{u.password}</td><td>{u.roleId}</td><td>{u.createdAt}</td><td>{u.updatedAt}</td><td>{u.isActive ? "Yes" : "No"}</td>
                    <td>
                      <Button color="primary" className="space" onClick={() => handleEditInit(u.id)}>Editar</Button>
                      <Button color="danger" className="space" onClick={() => handleDeleteInit(u.id)}>Desactivar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <UserCreateModal
          isOpen={modalSave}
          toggle={toggleSave}
          save={save}
          setSave={setSave}
          onSave={handleCreate}
        />

        <UserEditModal
          isOpen={modalUpdate}
          toggle={toggleUpdate}
          edit={edit}
          setEdit={setEdit}
          actualizar={actualizar}
          onUpdate={handleUpdate}
        />

        <UserDeleteModal
          isOpen={modalDelete}
          toggle={toggleDelete}
          eliminar={eliminar}
          onDelete={handleDelete}
        />

        <Outlet />
      </div>
    </div>
  );
};