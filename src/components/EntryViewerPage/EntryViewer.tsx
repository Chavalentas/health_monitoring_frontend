import { useRef, useState } from "react";
import "./EntryViewer.css";
import { UsersService } from "../../services/users.service";
import { useLocation, useNavigate } from "react-router-dom";
import { UserId } from "../../models/user-id.model";
import { EntryViewerRouteData } from "../../props/EntryViewerRouteData.Props";
import BMIIndicator from "../BMIIndicator/BMIIndicator";
import BloodPressureIndicator from "../BloodPressureIndicator/BloodPressureIndicator";
import Navigation from "../Navigation/Navigation";

const EntryViewer = () => {
  const usersService: UsersService = new UsersService();
  const [isViewBloodPressureWish, setViewBloodPressureWish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isViewBMIWish, setViewBMIWish] = useState(false);
  const [heightInM, setHeightInM] = useState(0);
  const [weightInKg, setWeightInKg] = useState(0);
  const [sys, setSys] = useState(0);
  const [dia, setDia] = useState(0);
  const [bmiTitle, setBMITitle] = useState("");
  const [bloodPressureTitle, setBloodPressureTitle] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useRef("");
  const [] = useState(() => {
    var tokenValue = localStorage.getItem("health_monitoring_user_token");
    setLoading(true);
    usersService
      .verifyToken(tokenValue)
      .then((userid: UserId) => {
        userId.current = userid.id;
        setViewData();
        setLoading(false);
      })
      .catch(() => {
        navigate("/");
        setLoading(false);
      });
  });

  const onLogOut = () => {
    localStorage.removeItem("health_monitoring_user_token");
    navigate("/");
  };

  const setViewData = () => {
    let viewerData: EntryViewerRouteData = JSON.parse(
      JSON.stringify(location.state)
    ) as EntryViewerRouteData;
    setViewBMIWish(viewerData.isViewBMIWish);
    setViewBloodPressureWish(viewerData.isViewBloodPressureWish);
    setHeightInM(viewerData.heightInM);
    setWeightInKg(viewerData.weightInKg);
    setSys(viewerData.sys);
    setDia(viewerData.dia);
    setBloodPressureTitle(viewerData.bloodPressureIndicatorTitle);
    setBMITitle(viewerData.bmiIndicatorTitle);
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
        impressumNavigationLink="/impressum"
        onLogOut={onLogOut}
      />
      <div className="viewer-container viewer-container-background">
      {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : null}
        <div className="indicators-container">
          {isViewBMIWish ? (
            <div className="bmi-indicator-container">
              <BMIIndicator
                title={bmiTitle}
                heightInM={heightInM}
                weightInKg={weightInKg}
              />
            </div>
          ) : null}
          {isViewBloodPressureWish ? (
            <div className="blood-pressure-indicator-container">
              <BloodPressureIndicator
                title={bloodPressureTitle}
                sys={sys}
                dia={dia}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EntryViewer;
