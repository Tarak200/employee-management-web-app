import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { AdminNavbar } from './AdminNavbar'
import Login1 from './Login1';

const ProjectBidding = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");

  const refreshOnSpot = () =>{
    window.location.reload(true);
  }

  const logout = () => {
    Axios.get('http://localhost:3001/logout')
    .then((response) => {
      // alert("Sure u want to log out");
      console.log(response);
      refreshOnSpot();
    }); 
    };

  useEffect(() => {
    Axios.get("http://localhost:3001/login-session").then((response) => {
        console.log(response);
      if(response.data.loggedIn === true) {
        console.log(response)
        setloginStatus(true);
        setRole(response.data.user.rows[0].role);
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ?
        (<>
        <AdminNavbar logoutAction={logout}/>
        <div><h2>ProjectBidding</h2></div>
        </>)
      :
        (<>
        <h2>Employee Management System</h2>
        <Login1/>
        </>)}
    </div>
  )
}

export default ProjectBidding