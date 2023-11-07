import { useState } from "react";
import { ProfileValidationFormProps } from "../../../props/ProfileValidationForm.Props";
import ModalWindow from "../../ModalWindow/ModalWindow";

const ProfileValidationForm = (props: ProfileValidationFormProps) => {
  const [updatePasswordShow, setUpdatePasswordShow] = useState(false);
  const [updateProfileShow, setUpdateProfileShow] = useState(false);
  const [deleteProfileShow, setDeleteProfileShow] = useState(false);

  const onUpdateProfile = async () => {
    setUpdateProfileShow(true);
  };

  const onConfirmProfileUpdate = async () => {
    setUpdateProfileShow(false);
    props.onUpdateProfile();
  };

  const onUpdatePassword = async () => {
    setUpdatePasswordShow(true);
  };

  const onConfirmPasswordUpdate = async () => {
    setUpdatePasswordShow(false);
    props.onUpdatePassword();
  };

  const onDeleteAccount = async () => {
    setDeleteProfileShow(true);
  };

  const onConfirmAccountDelete = async () => {
    setDeleteProfileShow(false);
    props.onDeleteProfile();
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Profile</h5>
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
            value={props.userNameInput}
          />
          {props.wrongUsername ? (
            <div className="alert alert-danger" role="alert">
              The username cannot be empty!
            </div>
          ) : null}
        </div>
        <div className="update-confirm-button-panel-container">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onUpdateProfile()}
          >
            Update
          </button>
          <ModalWindow
            onClose={() => setUpdateProfileShow(false)}
            onConfirm={() => onConfirmProfileUpdate()}
            confirmButtonText="OK"
            closeButtonText="Close"
            modalTitle="Profile update"
            show={updateProfileShow}
            modalText="Do you really want to update your profile?"
          />
        </div>
        <div className="accordion password-accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                aria-expanded="true"
                aria-controls="collapseOne"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                Change password
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="mb-3">
                  <label htmlFor="passwordInput" className="form-label">
                    New password
                  </label>
                  <input
                    type="password"
                    onChange={(event) =>
                      props.onChangedPassword(event.target.value)
                    }
                    className="form-control update-form-input"
                    id="passwordInput"
                    placeholder="Enter your password"
                  />
                  {props.wrongPassword ? (
                    <div className="alert alert-danger" role="alert">
                      The password was wrong! Has to contain at least one
                      uppercase, lowercase, digit and special character!
                    </div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label htmlFor="repasswordInput" className="form-label">
                    Repeat your password
                  </label>
                  <input
                    type="password"
                    onChange={(event) =>
                      props.onChangedRepassword(event.target.value)
                    }
                    className="form-control update-form-input"
                    id="repasswordInput"
                    placeholder="Repeat your password"
                  />
                  {props.wrongRepassword ? (
                    <div className="alert alert-danger" role="alert">
                      The passwords do not match!
                    </div>
                  ) : null}
                </div>
                <div className="update-password-confirm-button-panel-container">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onUpdatePassword()}
                  >
                    Change
                  </button>
                  <ModalWindow
                    onClose={() => setUpdatePasswordShow(false)}
                    onConfirm={() => onConfirmPasswordUpdate()}
                    confirmButtonText="OK"
                    closeButtonText="Close"
                    show={updatePasswordShow}
                    modalTitle="Password update"
                    modalText="Do you really want to change your password?"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="delete-button-panel-container">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDeleteAccount()}
          >
            Delete
          </button>
          <ModalWindow
            onClose={() => setDeleteProfileShow(false)}
            onConfirm={() => onConfirmAccountDelete()}
            confirmButtonText="OK"
            closeButtonText="Close"
            modalTitle="Profile delete"
            show={deleteProfileShow}
            modalText="Do you really want to delete your profile? Cannot be undone afterwards!"
          />
        </div>
        <p className="error-message">{props.errorMessage}</p>
        <p className="info-message">{props.infoMessage}</p>
      </div>
    </div>
  );
};

export default ProfileValidationForm;
