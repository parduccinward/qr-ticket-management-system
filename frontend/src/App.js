// import Login from './components/login/Login';
import Navbar from "./components/navbar/Navbar"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Parties from "./pages/Parties";
import Salespersons from "./pages/Salespersons";
import Clients from "./pages/Clients";

function App() {
  return (
    <main className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/parties" element={<Parties/>}/>
          <Route path="/salespersons" element={<Salespersons/>}/>
          <Route path="/clients" element={<Clients/>}/>
        </Routes>
      </Router>
    </main>
  );
}

export default App;