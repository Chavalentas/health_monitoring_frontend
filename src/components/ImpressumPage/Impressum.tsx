import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Impressum.css";

const Impressum = () => {
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.removeItem("health_monitoring_user_token");
    navigate("/");
  };

  return (
    <div>
      <Navigation
        sidebarTitle="Dashboard"
        navigationTitle="Health monitoring"
        homeNavigation="Home"
        profileNavigation="Profile"
        impressumNavigation="Impressum"
        homeNavigationLink="/dashboard"
        profileNavigationLink="/profile"
        impressumNavigationLink="#"
        onLogOut={onLogOut}
      />
      <div className="impressum-container impressum-container-background">
        <div className="card impressum-card mb-3">
          <div className="card-body">
            <h5 className="card-title">Impressum</h5>
            <span>Made by: Stefan Chvala <br/></span>
            <span>(c) 2023</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Impressum;
