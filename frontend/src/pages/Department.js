import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { AdminNavbar } from './AdminNavbar';
import { HrNavbar } from './HrNavbar';
import Login1 from './Login1';

const Department = () => {

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
      Role === "admin" ?
        (<>
          <AdminNavbar logoutAction={logout}/>
          <div><h2>Department-Admin</h2></div>
        </>)
        :
      Role === "hr" ?
        (<>
          <HrNavbar logoutAction={logout} />
          <div><h2>Department-Hr</h2></div>
        </>)
        :
        (<></>)  
      :
          (<>
          <h2>Employee Management System</h2>
          <Login1/>
          </>)}
  </div>
  )
}

export default Department