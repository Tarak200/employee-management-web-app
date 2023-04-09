import './App.css';
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Registration } from "./components/Registration";
import { Home } from './pages/Home';
import PortalMaster from './pages/PortalMaster';
import Role from './pages/Role';
import Position from './pages/Position';
import Department from './pages/Department';
import ProjectBidding from './pages/ProjectBidding';

function App() {
  axios.defaults.withCredentials = true;
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/registration" element={<Registration />}></Route>

        <Route exact path="/role" element={<Role/>}></Route>
        <Route exact path="/position" element={<Position/>}></Route>
        <Route exact path="/department" element={<Department/>}></Route>
        <Route exact path="/project-bid" element={<ProjectBidding/>}></Route>
        <Route exact path="/portal-master" element={<PortalMaster/>}></Route>

        
      </Routes>
    </>
  );
}

export default App;
