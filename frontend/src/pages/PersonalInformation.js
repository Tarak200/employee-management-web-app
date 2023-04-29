import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { EmpNavbar } from './EmpNavbar'
import Login1 from './Login1';
import { useNavigate } from 'react-router';

const PersonalInformation = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");
  const [data, setData] = useState([]);

  const Table = (e) => {
    const data = e.d;
    
    return(
      <table className="t1">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Hometown</th>
            <th>Pancard</th>
            <th>PhoneNumber</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.id}</td>
                <td>{a.FirstName}</td>
                <td>{a.LastName}</td>
                <td>{a.Gender}</td>
                <td>{new Date(a.DOB).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
                <td>{a.Hometown}</td>
                <td>{a.PanCard}</td>
                <td>{a.PhoneNumber}</td>
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

  const fetchempdetail = async (e)=>{
      Axios.post("http://localhost:3001/empdetail", {id : e}).then((res)=>{
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
        fetchempdetail(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ?
        (<>
        <EmpNavbar logoutAction={logout}/>
        <div>
          <h2>Personal Information</h2>
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

export default PersonalInformation