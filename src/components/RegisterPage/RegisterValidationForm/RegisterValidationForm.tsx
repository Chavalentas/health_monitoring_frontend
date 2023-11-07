import { Link } from "react-router-dom";
import { RegisterValidationFormProps } from "../../../props/RegisterValidationForm.Props";
import "./RegisterValidationForm.css";

const RegisterValidationForm = (props: RegisterValidationFormProps) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Register</h5>
        <div className="mb-3">
          <label htmlFor="userNameInput" className="form-label">
            Username
          </label>
          <input
            type="text"
            onChange={(event) => props.onChangedUsername(event.target.value)}
            className="form-control register-form-input"
            id="userNameInput"
            placeholder="Enter your username"
          />
          {props.wrongUsername ? (
            <div className="alert alert-danger" role="alert">
              The username cannot be empty!
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="passWordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={(event) => props.onChangedPassword(event.target.value)}
            className="form-control"
            id="passWordInput"
            placeholder="Enter your password"
          />
          {props.wrongPassword ? (
            <div className="alert alert-danger" role="alert">
              The password was wrong! Has to contain at least one uppercase,
              lowercase, digit and special character!
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="repeatPassWordInput" className="form-label">
            Repeat password
          </label>
          <input
            type="password"
            onChange={(event) => props.onChangedRepassword(event.target.value)}
            className="form-control"
            id="repeatPassWordInput"
            placeholder="Repeat your password"
          />
          {props.wrongRepassword ? (
            <div className="alert alert-danger" role="alert">
              The passwords do not match!
            </div>
          ) : null}
        </div>
        <span>{props.informationText}</span>
        <Link to={props.linkUrl}>{props.linkText}</Link>
        <span>!</span>
        <div className="button-panel-container">
          <button className="btn btn-primary" onClick={() => props.onSubmit()}>
            Submit
          </button>
        </div>
        <p className="error-message">{props.errorMessage}</p>
        <p className="info-message">{props.infoMessage}</p>
      </div>
    </div>
  );
};

export default RegisterValidationForm;
