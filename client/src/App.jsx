import "./pages/css/App.css"; //App.css
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Empleados } from "./pages/Pacientes";
import { Usuarios } from "./pages/Usuarios";
import { Sucursales } from "./pages/Doctores";
import Login from "./pages/Login";
import { Provider } from "./auth/userContext";
import { Page404 } from "./pages/404";

function App() {
  return (
    <>
      <Provider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Sucursales" element={<Sucursales />} />
          <Route path="/Empleados" element={<Empleados />} />
          <Route path="/Usuarios" element={<Usuarios />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
