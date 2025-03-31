import "./pages/css/App.css"; //App.css
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Patients } from "./pages/Pacientes";
import { Usuarios } from "./pages/Usuarios";
import { Doctors } from "./pages/Doctores";
import { Provider } from "./auth/userContext";
import { Page404 } from "./pages/404";

function App() {
  return (
    <>
      <Provider>
        <Routes>
          <Route path="/" element={<Home/ >} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/Patients" element={<Patients />} />
          <Route path="/Usuarios" element={<Usuarios />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
