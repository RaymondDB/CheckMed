import "./../pages/css/Sidebar.css";
import logoImg from "../../assets/img/logologo.jpg";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="logo-content">
        <div className="logo">
          <img src={logoImg} className="logo-img" />
          <div className="logo-text">CheckMed</div>
        </div>
      </div>
      <ul className="SidebarList">
        <li>
          <Link to="/Home" className="link">
            <i className="bx bx-home-alt-2"></i>
            <span className="links-name">Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/insuranceNetworkType" className="link">
            <i className="bx bx-shield-quarter"></i>
            <span className="links-name">Tipos de Red de Seg.</span>
          </Link>
        </li>
        <li>
          <Link to="/insuranceProviders" className="link">
            <i className="bx bx-shield"></i>
            <span className="links-name">Proveedores de Seg.</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;