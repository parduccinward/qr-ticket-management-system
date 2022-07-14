// import Login from './components/login/Login';
import Navbar from "./components/navbar/Navbar"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <main className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/"/>
        </Routes>
      </Router>
    </main>
  );
}

export default App;