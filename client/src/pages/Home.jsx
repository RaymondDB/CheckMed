import { Outlet } from "react-router-dom";
import "./css/Home.css"; //home.css
import { Widget } from "../components/Widget"; //components/widget
import logo from "../assets/img/sumasy-nobg.png"; //sumasy-nobg.png
import Sidebar from "../components/Sidebar";
import Axios from "axios";
import React, { useState, useEffect } from "react";

export const Home = () => {
  const [NetworkTypeTemp, setNetworkTypeTemp] = useState([]);
  const [InsuranceProvidersTemp, setInsuranceProvidersTemp] = useState([]);

  const mostrarNetworkType = () => {
    Axios.get("http://localhost:3000/insuranceNetworkType/").then(
      (response) => {
        setNetworkTypeTemp(response.data);
      }
    );
  };

  useEffect(() => {
    mostrarNetworkType();
  }, []);

  const mostrarInsuranceProvider = () => {
    Axios.get("http://localhost:3000/insuranceProviders/").then(
      (response) => {
        setInsuranceProvidersTemp(response.data);
      }
    );
  };

  useEffect(() => {
    mostrarInsuranceProvider();
  }, []);


  return (
    <>
      <div className="app">
        <Sidebar />
        <div className="content">
          <div className="Home">
            <div className="Top">
              {NetworkTypeTemp.map((val, key) => {
                return (
                  <div className="estiloWidget">
                    <div className="estiloDetalles">
                      <div className="estiloRespuesta">
                        Proveedores de seguros
                        <div className="estiloTitulo">{val.InsuranceProviders}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {InsuranceProvidersTemp.map((val, key) => {
                return (
                  <div className="estiloWidget">
                    <div className="estiloDetalles">
                      <div className="estiloRespuesta">
                        Tipos de redes de seguros
                        <div className="estiloTitulo">{val.NetworkTypes}</div>
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