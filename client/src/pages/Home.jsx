import { Outlet } from "react-router-dom";
import "./css/Home.css"; //home.css
import { Widget } from "../components/Widget"; //components/widget
import logo from "../assets/img/sumasy-nobg.png"; //sumasy-nobg.png
import Sidebar from "../components/Sidebar";
import Axios from "axios";
import React, { useState, useEffect } from "react";

export const Home = () => {
  const [inventarioTemp, setinventarioTemp] = useState([]);
  const [empleadoTemp, setEmpleadoTemp] = useState([]);
  const [sucursalTemp, setSucursalTemp] = useState([]);

  const mostrar = () => {
    Axios.get("http://localhost:3000/inventario/mostrarHome").then(
      (response) => {
        setinventarioTemp(response.data);
      }
    );
  };

  useEffect(() => {
    mostrar();
  }, []);

  const mostrarEmple = () => {
    Axios.get("http://localhost:3000/empleados/contarEmpleados").then(
      (response) => {
        setEmpleadoTemp(response.data);
      }
    );
  };

  useEffect(() => {
    mostrarEmple();
  }, []);

  const mostrarSucursal = () => {
    Axios.get("http://localhost:3000/sucursales/contarSucursales").then(
      (response) => {
        setSucursalTemp(response.data);
      }
    );
  };

  useEffect(() => {
    mostrarSucursal();
  }, []);


  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <div className="Home">
            <div className="Top">
              {inventarioTemp.map((val, key) => {
                return (
                  <div className="estiloWidget">
                    <div className="estiloDetalles">
                      <div className="estiloRespuesta">
                        Usuarios
                        <div className="estiloTitulo">{val.Cantidad}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {empleadoTemp.map((val, key) => {
                return (
                  <div className="estiloWidget">
                    <div className="estiloDetalles">
                      <div className="estiloRespuesta">
                        Pacientes
                        <div className="estiloTitulo">{val.Empleados}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {sucursalTemp.map((val, key) => {
                return (
                  <div className="estiloWidget">
                    <div className="estiloDetalles">
                      <div className="estiloRespuesta">
                        Doctores
                        <div className="estiloTitulo">{val.Sucursal}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>


            
          </div>
          <div className="Bottom">
            <img src={logo} className="logo"></img>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
