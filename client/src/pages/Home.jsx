import { Outlet } from "react-router-dom";
import "./css/Home.css"; //home.css
import { Widget } from "../components/Widget"; //components/widget
import logo from "../assets/img/sumasy-nobg.png"; //sumasy-nobg.png
import Sidebar from "../components/Sidebar";
import Axios from "axios";
import React, { useState, useEffect } from "react";

export const Home = () => {
  const [inventarioTemp, setinventarioTemp] = useState([]);
  const [PatientTemp, setPatientTemp] = useState([]);
  const [DoctorTemp, setDoctorTemp] = useState([]);

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
    Axios.get("http://localhost:3000/Patients/contarPatients").then(
      (response) => {
        setPatientTemp(response.data);
      }
    );
  };

  useEffect(() => {
    mostrarEmple();
  }, []);

  const mostrarDoctor = () => {
    Axios.get("http://localhost:3000/Doctores/contarDoctors").then(
      (response) => {
        setDoctorTemp(response.data);
      }
    );
  };

  useEffect(() => {
    mostrarDoctor();
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
              {PatientTemp.map((val, key) => {
                return (
                  <div className="estiloWidget">
                    <div className="estiloDetalles">
                      <div className="estiloRespuesta">
                        Pacientes
                        <div className="estiloTitulo">{val.Patients}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {DoctorTemp.map((val, key) => {
                return (
                  <div className="estiloWidget">
                    <div className="estiloDetalles">
                      <div className="estiloRespuesta">
                        Doctores
                        <div className="estiloTitulo">{val.Doctor}</div>
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
