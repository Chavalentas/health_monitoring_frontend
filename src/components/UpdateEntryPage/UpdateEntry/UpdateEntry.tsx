import { useRef, useState } from "react";
import { EntriesService } from "../../../services/entries.service";
import { UsersService } from "../../../services/users.service";
import "./UpdateEntry.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UserId } from "../../../models/user-id.model";
import { ErrorMessage } from "../../../models/error-message.model";
import { Entry } from "../../../models/entry.model";
import EntryValidationForm from "../../EntryValidationForm/EntryValidationForm";
import Navigation from "../../Navigation/Navigation";
import { SuccessMessage } from "../../../models/success-message.model";
import { LoggingService } from "../../../services/logging.service";
import ModalWindow from "../../ModalWindow/ModalWindow";
import { BMIService } from "../../../services/bmi.service";
import { BloodPressureService } from "../../../services/blood-pressure.service";

const UpdateEntry = () => {
  const usersService: UsersService = new UsersService();
  const entriesService: EntriesService = new EntriesService();
  const loggingService: LoggingService = new LoggingService();
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const bmiService: BMIService = new BMIService();
  const bloodPressureService: BloodPressureService = new BloodPressureService();
  const userId = useRef("");
  const canUpdate = useRef(true);
  const [isAddBMIWish, setAddBMIWish] = useState(false);
  const [isAddBloodPressureWish, setAddBloodPressureWish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const [inputWeight, setInputWeight] = useState(0);
  const [inputSys, setInputSys] = useState(0);
  const [inputDia, setInputDia] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const location = useLocation();
  const defaultEntry = {} as Entry;
  const [entryToChange, setEntryToChange] = useState<Entry>(defaultEntry);
  const navigate = useNavigate();
  const [] = useState(() => {
    var tokenValue = localStorage.getItem("health_monitoring_user_token");
    setLoading(true);
    usersService
      .verifyToken(tokenValue)
      .then((userid: UserId) => {
        userId.current = userid.id;
        setUpdateData();
        setLoading(false);
      })
      .catch(() => {
        navigate("/");
        setLoading(false);
      });
  });

  const setUpdateData = () => {
    let entry: Entry = JSON.parse(JSON.stringify(location.state)) as Entry;
    setEntryToChange(entry);
    setInputSys(Number(entry.sys));
    setInputDia(Number(entry.dia));
    setInputHeight(Number(entry.height));
    setInputWeight(Number(entry.weight));
    setAddBloodPressureWish(entry.sys !== null && entry.dia !== null);
    setAddBMIWish(entry.height !== null && entry.weight !== null);
  };

  const onLogOut = () => {
    localStorage.removeItem("health_monitoring_user_token");
    navigate("/");
  };

  const resetMessages = () => {
    setErrorMessage("");
    setInfoMessage("");
  };

  const onAddBMIEntryClick = () => {
    resetMessages();
    setAddBMIWish(true);
  };

  const onRemoveBMIEntryClick = () => {
    resetMessages();
    setAddBMIWish(false);
  };

  const onAddBloodPressureEntryClick = () => {
    resetMessages();
    setAddBloodPressureWish(true);
  };

  const onRemoveBloodPressureEntryClick = () => {
    resetMessages();
    setAddBloodPressureWish(false);
  };

  const onChangedHeight = (height: string) => {
    resetMessages();
    setInputHeight(parseFloat(height));
  };

  const onChangedWeight = (height: string) => {
    resetMessages();
    setInputWeight(parseFloat(height));
  };

  const onChangedSys = (height: string) => {
    resetMessages();
    setInputSys(parseFloat(height));
  };

  const onChangedDia = (height: string) => {
    resetMessages();
    setInputDia(parseFloat(height));
  };

  const onUpdate = async () => {
    setUpdateModalShow(false);
    canUpdate.current = false;
    if (!isAddBMIWish && !isAddBloodPressureWish) {
      canUpdate.current = true;
      setErrorMessage("You have to specify add least one health indicator!");
      return;
    }

    resetMessages();
    let height = isAddBMIWish ? inputHeight : null;
    let weight = isAddBMIWish ? inputWeight : null;
    let sys = isAddBloodPressureWish ? inputSys : null;
    let dia = isAddBloodPressureWish ? inputDia : null;

    if (height !== null && weight !== null) {
      let isBMIValid = bmiService.isValidBMI(height / 100, weight);

      if (!isBMIValid) {
        canUpdate.current = true;
        setErrorMessage(
          "The BMI parameters have unusual values that cannot be categorized! Please modify the data!"
        );
        return;
      }
    }

    if (sys !== null && dia !== null) {
      let isValidSys = bloodPressureService.isValidSysBloodPressure(sys);
      let isValidDia = bloodPressureService.isValidDiaBloodPressure(dia);

      if (!isValidSys) {
        canUpdate.current = true;
        setErrorMessage(
          "The systolic blood pressure parameters have unusual values that cannot be categorized! Please modify the data!"
        );
        return;
      }

      if (!isValidDia) {
        canUpdate.current = true;
        setErrorMessage(
          "The diastolic blood pressure parameters have unusual values that cannot be categorized! Please modify the data!"
        );
        return;
      }
    }

    let entry: Entry = {
      id: entryToChange.id,
      userId: userId.current,
      dateTime: entryToChange.dateTime,
      sys: sys,
      dia: dia,
      weight: weight,
      height: height
    } as Entry;

    setLoading(true);
    entriesService
      .putEntry(entry)
      .then((successMessage: SuccessMessage) => {
        setLoading(false);
        loggingService.logInfo(successMessage.message);
        setInfoMessage(
          "The entry was successfully updated! You are being redirected..."
        );
        setTimeout(() => {
          canUpdate.current = true;
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error: ErrorMessage) => {
        setLoading(false);
        loggingService.logError(error.message);
        setErrorMessage(
          "Some error occurred during the operation! Try again later!"
        );
      });
  };

  return (
    <div>
      <Navigation
        sidebarTitle="Profile"
        navigationTitle="Health monitoring"
        homeNavigation="Home"
        profileNavigation="Profile"
        impressumNavigation="Impressum"
        homeNavigationLink="/dashboard"
        impressumNavigationLink="/impressum"
        profileNavigationLink="/profile"
        onLogOut={() => onLogOut()}
      />
      <div className="update-entry-container update-entry-background">
        <EntryValidationForm
          entryValidationTitle="Update entry"
          addBMIEntryTitle="Update BMI entry"
          updateTargetId="#updateEntryModal"
          buttonEnabled={canUpdate.current}
          onAddBMIEntryClick={() => onAddBMIEntryClick()}
          onAddBloodPressureEntryClick={() => onAddBloodPressureEntryClick()}
          addBloodPressureEntryTitle="Update blood pressure entry"
          onChangedDia={(value) => onChangedDia(value)}
          onChangedSys={(value) => onChangedSys(value)}
          onChangedHeight={(value) => onChangedHeight(value)}
          onChangedWeight={(value) => onChangedWeight(value)}
          onRemoveBMIEntryClick={() => onRemoveBMIEntryClick()}
          removeBMIEntryTitle="Remove BMI entry"
          onRemoveBloodPressureEntryClick={() =>
            onRemoveBloodPressureEntryClick()
          }
          removeBloodPressureEntryTitle="Remove blood pressure entry"
          onSubmit={() => setUpdateModalShow(true)}
          infoMessage={infoMessage}
          errorMessage={errorMessage}
          inputHeight={inputHeight}
          inputWeight={inputWeight}
          inputDia={inputDia}
          inputSys={inputSys}
          isAddBMIWish={isAddBMIWish}
          isAddBloodPressureWish={isAddBloodPressureWish}
        />
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : null}
        <ModalWindow
          onClose={() => setUpdateModalShow(false)}
          onConfirm={() => onUpdate()}
          confirmButtonText="OK"
          closeButtonText="Close"
          modalTitle="Entry delete"
          modalText="Do you really want to update the entry?"
          show={updateModalShow}
        />
      </div>
    </div>
  );
};

export default UpdateEntry;
