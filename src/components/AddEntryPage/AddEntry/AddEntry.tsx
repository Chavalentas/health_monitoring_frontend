import { useNavigate } from "react-router-dom";
import Navigation from "../../Navigation/Navigation";
import "./AddEntry.css";
import { useRef, useState } from "react";
import { UsersService } from "../../../services/users.service";
import { UserId } from "../../../models/user-id.model";
import { EntriesService } from "../../../services/entries.service";
import { Entry } from "../../../models/entry.model";
import { EntryId } from "../../../models/entry-id.model";
import { ErrorMessage } from "../../../models/error-message.model";
import EntryValidationForm from "../../EntryValidationForm/EntryValidationForm";
import { LoggingService } from "../../../services/logging.service";
import { BMIService } from "../../../services/bmi.service";
import { BloodPressureService } from "../../../services/blood-pressure.service";

const AddEntry = () => {
  const usersService: UsersService = new UsersService();
  const entriesService: EntriesService = new EntriesService();
  const loggingService: LoggingService = new LoggingService();
  const bmiService: BMIService = new BMIService();
  const bloodPressureService: BloodPressureService = new BloodPressureService();
  const userId = useRef("");
  const [isAddBMIWish, setAddBMIWish] = useState(false);
  const [isAddBloodPressureWish, setAddBloodPressureWish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const [inputWeight, setInputWeight] = useState(0);
  const [inputSys, setInputSys] = useState(0);
  const [inputDia, setInputDia] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const canAdd = useRef(true);
  const navigate = useNavigate();
  const [] = useState(() => {
    setLoading(true);
    var tokenValue = localStorage.getItem("health_monitoring_user_token");
    usersService
      .verifyToken(tokenValue)
      .then((userid: UserId) => {
        userId.current = userid.id;
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate("/");
      });
  });

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

  const onSubmit = async () => {
    canAdd.current = false;
    if (!isAddBMIWish && !isAddBloodPressureWish) {
      canAdd.current = true;
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
        canAdd.current = true;
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
        canAdd.current = true;
        setErrorMessage(
          "The systolic blood pressure parameters have unusual values that cannot be categorized! Please modify the data!"
        );
        return;
      }

      if (!isValidDia) {
        canAdd.current = true;
        setErrorMessage(
          "The diastolic blood pressure parameters have unusual values that cannot be categorized! Please modify the data!"
        );
        return;
      }
    }

    let entry: Entry = {
      id: "",
      userId: userId.current,
      dateTime: Date.now(),
      sys: sys,
      dia: dia,
      weight: weight,
      height: height
    } as Entry;

    setLoading(true);
    entriesService
      .postEntry(entry)
      .then((entryId: EntryId) => {
        setLoading(false);
        loggingService.logInfo(
          `Entry with the ID ${entryId.id} was successfully added!`
        );
        setInfoMessage(
          "The entry was successfully added! You are being redirected..."
        );
        setTimeout(() => {
          canAdd.current = true;
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
      <div className="add-entry-container add-entry-background">
        <EntryValidationForm
          entryValidationTitle="Add entry"
          addBMIEntryTitle="Add BMI entry"
          updateTargetId=""
          buttonEnabled={canAdd.current}
          onAddBMIEntryClick={() => onAddBMIEntryClick()}
          onAddBloodPressureEntryClick={() => onAddBloodPressureEntryClick()}
          addBloodPressureEntryTitle="Add blood pressure entry"
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
          onSubmit={() => onSubmit()}
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
      </div>
    </div>
  );
};

export default AddEntry;
