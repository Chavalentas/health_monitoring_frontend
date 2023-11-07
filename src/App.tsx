import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/NoPage/NoPage";
import Login from "./components/LoginPage/Login/Login";
import Register from "./components/RegisterPage/Register/Register";
import Profile from "./components/ProfilePage/Profile/Profile";
import AddEntry from "./components/AddEntryPage/AddEntry/AddEntry";
import UpdateEntry from "./components/UpdateEntryPage/UpdateEntry/UpdateEntry";
import Dashboard from "./components/Dashboard/MainDashboard/Dashboard";
import EntryViewer from "./components/EntryViewerPage/EntryViewer";
import Impressum from "./components/ImpressumPage/Impressum";

function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/dashboard/add" element={<AddEntry/>}/>
          <Route path="/dashboard/update" element={<UpdateEntry/>}/>
          <Route path="/dashboard/viewer" element={<EntryViewer/>}/>
          <Route path="/impressum" element={<Impressum/>}/>
          <Route path="*" element={<NoPage errorMessage="404 Error"/>}/>
       </Routes>
    </BrowserRouter>
  );
}

export default App;
