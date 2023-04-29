import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { EmpNavbar } from './EmpNavbar'
import Login1 from './Login1';
import { useNavigate } from 'react-router';

const Experience = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");
  const [data, setData] = useState([]);

  const Table = (e) => {
    const data = e.d;
    
    return(
      <table className="t1">
        <thead>
          <tr>
            <th>Company</th>
            <th>Designation</th>
            <th>StartDate</th>
            <th>EndDate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.company}</td>
                <td>{a.designation}</td>
                <td>{new Date(a.joindate).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
                <td>{new Date(a.enddate).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  }


  const navigate = useNavigate();
  const refreshToHome = () =>{
    navigate("/");
  }

  const fetchworkexp = async (e)=>{
    Axios.post("http://localhost:3001/workexp", {id : e}).then((res)=>{
      setData(res.data);
    });
  } 

  const logout = () => {
    Axios.get('http://localhost:3001/logout')
    .then((response) => {
      // alert("Sure u want to log out");
      console.log(response);
      // refreshOnSpot();
      refreshToHome();
    }); 
    };

  useEffect(() => {
    Axios.get("http://localhost:3001/login-session").then((response) => {
        console.log(response);
      if(response.data.loggedIn === true) {
        console.log(response)
        setloginStatus(true);
        setRole(response.data.user.rows[0].role);
        fetchworkexp(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ?
        (<>
        <EmpNavbar logoutAction={logout}/>
        <div>
          <h2>Experience</h2>
          <Table d={data}/>
        </div>
        </>)
      :
        (<>
        <h2>Employee Management System</h2>
        <Login1/>
        </>)}
    </div>
  )
}

export default Experience