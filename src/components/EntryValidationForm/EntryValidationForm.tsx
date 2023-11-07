import { EntryValidationFormProps } from "../../props/EntryValidationForm.Props";
import AddEntryButton from "../AddEntryPage/AddEntryButton/AddEntryButton";
import RemoveEntryButton from "../AddEntryPage/RemoveEntryButton/RemoveEntryButton";
import "./EntryValidationForm.css";

const EntryValidationForm = (props: EntryValidationFormProps) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{props.entryValidationTitle}</h5>
        <div className="bmi-container health-indicator-container">
          {!props.isAddBMIWish ? (
            <div className="entry-button-container">
              <AddEntryButton onClicked={() => props.onAddBMIEntryClick()} />
              <h6 className="entry-button-title">{props.addBMIEntryTitle}</h6>
            </div>
          ) : null}
          {props.isAddBMIWish ? (
            <div className="entry-button-container">
              <RemoveEntryButton
                onClicked={() => props.onRemoveBMIEntryClick()}
              />
              <h6 className="entry-button-title">
                {props.removeBMIEntryTitle}
              </h6>
            </div>
          ) : null}
          {props.isAddBMIWish ? (
            <div className="input-data-container">
              <label htmlFor="customRange3" className="form-label">
                Enter your height: {props.inputHeight} cm
              </label>
              <input
                type="range"
                className="form-range"
                min="10"
                max="300"
                step="0.1"
                value={props.inputHeight}
                onChange={(event) =>
                  props.onChangedHeight(event.currentTarget.value)
                }
                id="customRange3"
              ></input>
              <label htmlFor="customRange3" className="form-label">
                Enter your weight: {props.inputWeight} kg
              </label>
              <input
                type="range"
                className="form-range"
                min="10"
                max="500"
                step="0.1"
                value={props.inputWeight}
                onChange={(event) =>
                  props.onChangedWeight(event.currentTarget.value)
                }
                id="customRange3"
              ></input>
            </div>
          ) : null}
        </div>
        <div className="blood-pressure-container health-indicator-container">
          {!props.isAddBloodPressureWish ? (
            <div className="entry-button-container">
              <AddEntryButton
                onClicked={() => props.onAddBloodPressureEntryClick()}
              />
              <h6 className="entry-button-title">
                {props.addBloodPressureEntryTitle}
              </h6>
            </div>
          ) : null}
          {props.isAddBloodPressureWish ? (
            <div className="entry-button-container">
              <RemoveEntryButton
                onClicked={() => props.onRemoveBloodPressureEntryClick()}
              />
              <h6 className="entry-button-title">
                {props.removeBloodPressureEntryTitle}
              </h6>
            </div>
          ) : null}
          {props.isAddBloodPressureWish ? (
            <div className="input-data-container">
              <label htmlFor="customRange3" className="form-label">
                Enter your systolic pressure: {props.inputSys} mmHg
              </label>
              <input
                type="range"
                className="form-range"
                min="10"
                max="200"
                step="1"
                value={props.inputSys}
                onChange={(event) =>
                  props.onChangedSys(event.currentTarget.value)
                }
                id="customRange3"
              ></input>
              <label htmlFor="customRange3" className="form-label">
                Enter your diastolic pressure: {props.inputDia} mmHg
              </label>
              <input
                type="range"
                className="form-range"
                min="10"
                max="200"
                step="1"
                value={props.inputDia}
                onChange={(event) =>
                  props.onChangedDia(event.currentTarget.value)
                }
                id="customRange3"
              ></input>
            </div>
          ) : null}
        </div>
      </div>
      <div className="button-panel-container">
        {props.buttonEnabled ? (
          <button 
          className="btn btn-primary" 
          onClick={() => props.onSubmit()}
          data-bs-toggle="modal"
          data-bs-target={props.updateTargetId}>
            Submit
          </button>
        ) : (
          <button
            disabled
            data-bs-toggle="modal"
            data-bs-target={props.updateTargetId}
            className="btn btn-primary"
            onClick={() => props.onSubmit()}
          >
            Submit
          </button>
        )}
      </div>
      <p className="error-message">{props.errorMessage}</p>
      <p className="info-message">{props.infoMessage}</p>
    </div>
  );
};

export default EntryValidationForm;
