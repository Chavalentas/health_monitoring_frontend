import { NavigationProps } from "../../props/Navigation.Props";
import LogOutIcon from "../Icons/LogOutIcon/LogOutIcon";
import './Navigation.css';

const Navigation = (navigationProps: NavigationProps) => {
  return (
    <nav className="navbar bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          {navigationProps.navigationTitle}
        </a>
        <button className="btn btn-sm btn-outline-secondary ms-auto log-out" 
                type="button"
                onClick={() => navigationProps.onLogOut()}>
               <LogOutIcon width={16} height={16}/>
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              {navigationProps.sidebarTitle}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href={navigationProps.homeNavigationLink}>
                  {navigationProps.homeNavigation}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={navigationProps.profileNavigationLink}>
                  {navigationProps.profileNavigation}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={navigationProps.impressumNavigationLink}>
                  {navigationProps.impressumNavigation}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
