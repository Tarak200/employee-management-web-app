import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { AdminNavbar } from './AdminNavbar'
import Login1 from './Login1';
import { useNavigate } from 'react-router';

const ProjectBidding = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");
  const [data, setData] = useState([]);

  const Table = (e) => {
    const data = e.d;
    
    return(
      <table className="t1">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Portal</th>
            <th>Estimated Time</th>
            <th>Estimated Cost</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.projtitle}</td>
                <td>{a.portal}</td>
                <td>{a.esttime}</td>
                <td>{a.estcost}</td>
                <td>{a.remark}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  }

  const refreshOnSpot = () =>{
    window.location.reload(true);
  }

  const navigate = useNavigate();
  const refreshToHome = () =>{
    navigate("/");
  }

  const fetchprojbid = async (e)=>{
    Axios.post("http://localhost:3001/projbid", {id : e}).then((res)=>{
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
        fetchprojbid(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ?
        (<>
        <AdminNavbar logoutAction={logout}/>
        <div>
          <h2>Project Bidding</h2>
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

export default ProjectBidding