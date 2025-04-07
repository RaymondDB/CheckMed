//import "/presentation/pages/css/App.css";
import "./presentation/pages/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./presentation/pages/Home";
import { Patients } from "./presentation/pages/Pacientes";
import { Usuarios } from "./presentation/pages/Usuarios";
import { Doctors } from "./presentation/pages/Doctores";
import { Provider } from "./auth/userContext";
import { Page404 } from "./presentation/pages/404";

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
