import Login from './components/Login';
import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Parties from "./components/Parties";
import AddParty from "./components/AddParty";
import AddSalesperson from "./components/AddSalesperson";
import AddClient from "./components/AddClient";
import EditParty from "./components/EditParty";
import EditSalesperson from "./components/EditSalesperson";
import Salespersons from "./components/Salespersons";
import Clients from "./components/Clients";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Login/>} />
        <Route path="/logout" element={<Login/>} />
        <Route element={<RequireAuth/>}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="parties" element={<Parties/>} />
          <Route path="parties/add" element={<AddParty/>} />
          <Route path="parties/edit/:id" element={<EditParty/>} />
          <Route path="salespersons" element={<Salespersons/>} />
          <Route path="salespersons/add" element={<AddSalesperson/>} />
          <Route path="salespersons/edit/:id" element={<EditSalesperson/>} />
          <Route path="clients" element={<Clients/>} />
          <Route path="clients/add" element={<AddClient/>} />
        </Route>
        <Route path="*" element={<Missing/>} />
      </Route>
    </Routes>
  );
}

export default App;