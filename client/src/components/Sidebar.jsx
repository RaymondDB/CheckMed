import "./../pages/css/Sidebar.css";
import logoImg from "../assets/img/logologo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../auth/userContext";
const Sidebar = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };
  const [user] = useUserContext();
  const handleLogout = () => {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    routeChange();
  };

  return (
    <div className="sidebar">
      <div className="logo-content">
        <div className="logo">
          <img src={logoImg} className="logo-img" />
          <div className="logo-text">SUMASY</div>
        </div>
      </div>
      <ul className="SidebarList">
        <li>
          <Link to="/Home" className="link">
            <i className="bx bx-home-alt-2"></i>
            <span className="links-name">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/Doctors" className="link">
            <i className="bx bx-store-alt"></i>
            <span className="links-name">Doctores</span>
          </Link>
        </li>
        <li>
          <Link to="/Patients" className="link">
            <i className="bx bx-group"></i>
            <span className="links-name">Pacientes</span>
          </Link>
        </li>
        <li>
          <Link to="/Usuarios" className="link">
            <i className="bx bx-user-pin"></i>
            <span className="links-name">Usuarios</span>
          </Link>
        </li>
      </ul>
      <div className="profile_content">
        <div className="profile">
          <button className="logout-button" onClick={handleLogout}>
            <i className="bx bx-log-out" id="logout"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
