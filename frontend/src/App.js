import './App.css';
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";


function App() {
  axios.defaults.withCredentials = true;
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/registration" element={<Registration />}></Route>
      </Routes>
    </>
  );
}

export default App;
