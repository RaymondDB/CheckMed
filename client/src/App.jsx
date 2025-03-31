import "./pages/css/App.css"; //App.css
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { InsuranceNetworkType } from "./pages/TiposDeRedesDeSeguros";
import { InsuranceProvider } from "./pages/ProveedoresDeSeguros";
import { Page404 } from "./pages/404";

function App() {
  return (
    <>
      <Provider>
        <Routes>
          <Route path="/" element={<Home/ >} />
          <Route path="/Home" element={<Home />} />
          <Route path="/InsuranceNetworkType" element={<InsuranceNetworkType />} />
          <Route path="/InsuranceProviders" element={<InsuranceProvider />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;