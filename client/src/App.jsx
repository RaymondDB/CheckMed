import "./presentation/pages/css/App.css"; //App.css
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./presentation/pages/Home";
import { InsuranceNetworkType } from "./presentation/pages/TiposDeRedesDeSeguros";
import { InsuranceProviders } from "./presentation/pages/ProveedoresDeSeguros";
import { Page404 } from "./presentation/pages/404";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home/ >} />
          <Route path="/Home" element={<Home />} />
          <Route path="/InsuranceNetworkType" element={<InsuranceNetworkType />} />
          <Route path="/InsuranceProviders" element={<InsuranceProviders />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
    </>
  );
}

export default App;