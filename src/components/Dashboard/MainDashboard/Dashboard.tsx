import { useRef, useState } from "react";
import "./Dasboard.css";
import { useNavigate } from "react-router-dom";
import { UsersService } from "../../../services/users.service";
import { UserId } from "../../../models/user-id.model";
import { EntriesService } from "../../../services/entries.service";
import { Entry } from "../../../models/entry.model";
import { LoggingService } from "../../../services/logging.service";
import { ErrorMessage } from "../../../models/error-message.model";
import Navigation from "../../Navigation/Navigation";
import EntriesTable from "../EntriesTable/MainTable/EntriesTable";
import { SuccessMessage } from "../../../models/success-message.model";
import ModalWindow from "../../ModalWindow/ModalWindow";
import { EntryViewerRouteData } from "../../../props/EntryViewerRouteData.Props";

const Dashboard = () => {
  const navigate = useNavigate();
  const [infoMessage, setInfoMessage] = useState("");
  const [showDeleteAllEntries, setShowDeleteAllEntries] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDeleteEntry, setShowDeleteEntry] = useState(false);
  const [loading, setLoading] = useState(false);
  const usersService: UsersService = new UsersService();
  const entriesService: EntriesService = new EntriesService();
  const loggingService: LoggingService = new LoggingService();
  const userId = useRef("");
  const defaultEntryToDelete: Entry = {} as Entry;
  const entryToDelete = useRef(defaultEntryToDelete);

  const initialize = (): Promise<Entry[]> => {
    return new Promise<Entry[]>((resolve) => {
      var tokenValue = localStorage.getItem("health_monitoring_user_token");
      usersService
        .verifyToken(tokenValue)
        .then((userid: UserId) => {
          userId.current = userid.id;
          entriesService.getEntries(userId.current).then((entries) => {
            resolve(entries);
          });
        })
        .catch((error: ErrorMessage) => {
          setLoading(false);
          loggingService.logError(error.message);
          navigate("/");
        });
    });
  };

  const [] = useState(() => {
    setLoading(true);
    initialize().then((entries) => {
      setTableData(entries);
      setLoading(false);
    });
  });

  const defaultEntries: Entry[] = [];
  const [entryTableData, setTableData] = useState(defaultEntries);

  const onLogOut = () => {
    localStorage.removeItem("health_monitoring_user_token");
    navigate("/");
  };

  const onDeleteEntry = async (entry: Entry) => {
    entryToDelete.current = entry;
    setShowDeleteEntry(true);
  };

  const onDeleteAllEntriesConfirmation = () => {
    setShowDeleteAllEntries(false);
    entriesService
      .deleteEntries(userId.current)
      .then((successMessage) => {
        setTableData([]);
        loggingService.logInfo(successMessage.message);
      })
      .catch((error: ErrorMessage) => {
        loggingService.logError(error.message);
      });
  };

  const onUpdateEntry = async (entry: Entry) => {
    navigate("/dashboard/update", {
      state: entry
    });
  };

  const onDeleteEntryConfirmation = async () => {
    setShowDeleteEntry(false);
    entriesService
      .deleteEntry(entryToDelete.current.id)
      .then((successMessage: SuccessMessage) => {
        let newData = entryTableData.filter(
          (entry) => entry.id != entryToDelete.current.id
        );
        setTableData(newData);
        loggingService.logInfo(successMessage.message);
      })
      .catch((error: ErrorMessage) => {
        loggingService.logError(error.message);
      });
  };

  const onAddEntry = async () => {
    navigate("/dashboard/add");
  };

  const onDeleteAllEntries = async () => {
    if (entryTableData.length === 0) {
      setInfoMessage("There are no entries to delete!");
      setShowInfo(true);
      return;
    }

    setShowDeleteAllEntries(true);
  };

  const getViewerRouteData = (entry: Entry) => {
    let sys: number = entry.sys === null ? 0 : entry.sys;
    let dia: number = entry.dia === null ? 0 : entry.dia;
    let height: number = entry.height === null ? 0 : entry.height / 100;
    let weight: number = entry.weight === null ? 0 : entry.weight;
    let date = new Date(Date.parse(entry.dateTime as string));
    let dateString = date.toLocaleString();
    let bmiTitle = "BMI (" + dateString + ")";
    let bloodPressureTitle = "Blood pressure (" + dateString + ")";
    let isViewBMIWish = !(entry.height === null && entry.weight === null);
    let isViewBloodPressureWish = !(entry.sys === null && entry.dia === null);
    let entryViewerData = {
      heightInM: height,
      weightInKg: weight,
      sys: sys,
      dia: dia,
      bmiIndicatorTitle: bmiTitle,
      bloodPressureIndicatorTitle: bloodPressureTitle,
      isViewBloodPressureWish: isViewBloodPressureWish,
      isViewBMIWish: isViewBMIWish
    } as EntryViewerRouteData;
    return entryViewerData;
  };

  const onViewEntry = async (entry: Entry) => {
    let entryViewerData = getViewerRouteData(entry);
    navigate("/dashboard/viewer", {
      state: entryViewerData
    });
  };

  const onViewLatestEntry = async () => {
    if (entryTableData.length === 0) {
      setInfoMessage("No entries are available!");
      setShowInfo(true);
      return;
    }

    let entriesSorted = entryTableData.sort((a: Entry, b: Entry) => {
      let aDate = new Date(a.dateTime).getTime();
      let bDate = new Date(b.dateTime).getTime();
      return bDate - aDate;
    });

    let entryViewerData = getViewerRouteData(entriesSorted[0]);
    navigate("/dashboard/viewer", {
      state: entryViewerData
    });
  };

  const onViewLatestBMIEntry = async () => {
    if (entryTableData.length === 0) {
      setInfoMessage("No entries are available!");
      setShowInfo(true);
      return;
    }

    let entriesSorted = entryTableData.sort((a: Entry, b: Entry) => {
      let aDate = new Date(a.dateTime).getTime();
      let bDate = new Date(b.dateTime).getTime();
      return bDate - aDate;
    });

    let entriesFiltered = entriesSorted.filter(
      (entry) => entry.height !== null && entry.weight !== null
    );

    if (entriesFiltered.length === 0) {
      setInfoMessage("No entries with BMI data are available!");
      setShowInfo(true);
      return;
    }

    let entryViewerData = getViewerRouteData(entriesFiltered[0]);
    entryViewerData.isViewBMIWish = true;
    entryViewerData.isViewBloodPressureWish = false;
    navigate("/dashboard/viewer", {
      state: entryViewerData
    });
  };

  const onViewLatestBloodPressureEntry = async () => {
    if (entryTableData.length === 0) {
      setInfoMessage("No entries are available!");
      setShowInfo(true);
      return;
    }

    let entriesSorted = entryTableData.sort((a: Entry, b: Entry) => {
      let aDate = new Date(a.dateTime).getTime();
      let bDate = new Date(b.dateTime).getTime();
      return bDate - aDate;
    });

    let entriesFiltered = entriesSorted.filter(
      (entry) => entry.sys !== null && entry.dia !== null
    );

    if (entriesFiltered.length === 0) {
      setInfoMessage("No entries with blood pressure data are available!");
      setShowInfo(true);
      return;
    }

    let entryViewerData = getViewerRouteData(entriesFiltered[0]);
    entryViewerData.isViewBMIWish = false;
    entryViewerData.isViewBloodPressureWish = true;
    navigate("/dashboard/viewer", {
      state: entryViewerData
    });
  };

  const handleSorting = (sortField: string, sortOrder: "asc" | "desc") => {
    if (sortField) {
      const sorted = [...entryTableData].sort((a, b) => {
        let a1 = JSON.parse(JSON.stringify(a));
        let b1 = JSON.parse(JSON.stringify(b));
        if (a1[sortField] === null) return 1;
        if (b1[sortField] === null) return -1;
        if (a1[sortField] === null && b1[sortField] === null) return 0;
        return (
          a1[sortField]
            .toString()
            .localeCompare(b1[sortField].toString(), "en", {
              numeric: true
            }) * (sortOrder === "asc" ? 1 : -1)
        );
      });

      setTableData(sorted);
    }
  };

  return (
    <div>
      <Navigation
        sidebarTitle="Dashboard"
        navigationTitle="Health monitoring"
        homeNavigation="Home"
        profileNavigation="Profile"
        impressumNavigation="Impressum"
        homeNavigationLink="#"
        profileNavigationLink="/profile"
        impressumNavigationLink="/impressum"
        onLogOut={onLogOut}
      />
      <div className="dashboard-container dashboard-background">
        <div className="horizontal-widgets-panel">
          <div className="entries-and-button-panel-container">
            <EntriesTable
              handleSorting={handleSorting}
              tableData={entryTableData}
              deleteTargetId="#deleteEntryModal"
              onUpdateEntry={(entry: Entry) => onUpdateEntry(entry)}
              onDeleteEntry={(entry: Entry) => onDeleteEntry(entry)}
              onViewEntry={(entry: Entry) => onViewEntry(entry)}
            ></EntriesTable>
            <ModalWindow
              onClose={() => setShowDeleteEntry(false)}
              onConfirm={() => onDeleteEntryConfirmation()}
              confirmButtonText="OK"
              closeButtonText="Close"
              modalTitle="Entry delete"
              show={showDeleteEntry}
              modalText="Do you really want to delete the entry?"
            />
            <ModalWindow
              onClose={() => setShowDeleteAllEntries(false)}
              onConfirm={() => onDeleteAllEntriesConfirmation()}
              confirmButtonText="OK"
              closeButtonText="Close"
              modalTitle="Delete all entries"
              show={showDeleteAllEntries}
              modalText="Do you really want to delete all entries?"
            />
            <ModalWindow
              onClose={() => setShowInfo(false)}
              onConfirm={() => setShowInfo(false)}
              confirmButtonText="OK"
              closeButtonText="Close"
              modalTitle="Info"
              show={showInfo}
              modalText={infoMessage}
            />
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : null}
            <div className="entry-button-panel-container">
              <button
                className="btn btn-primary entry-panel-button"
                onClick={() => onAddEntry()}
              >
                Add entry
              </button>
              <button
                className="btn btn-primary entry-panel-button"
                onClick={() => onViewLatestBMIEntry()}
              >
                View latest BMI
              </button>
              <button
                className="btn btn-primary entry-panel-button"
                onClick={() => onViewLatestBloodPressureEntry()}
              >
                View latest blood pressure
              </button>
              <button
                className="btn btn-primary entry-panel-button"
                onClick={() => onViewLatestEntry()}
              >
                View latest entry
              </button>
              <button
                onClick={() => onDeleteAllEntries()}
                className="btn btn-danger entry-panel-button"
              >
                Delete all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
