import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { HrNavbar } from './HrNavbar'
import Login1 from './Login1';
import { useNavigate } from 'react-router';

const Salary = () => {

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
            <th>Bank Name</th>
            <th>Account No</th>
            <th>IFSC Code</th>
            <th>Tax Deduction</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.id}</td>
                <td>{a.FirstName}</td>
                <td>{a.LastName}</td>
                <td>{a.bankname}</td>
                <td>{a.accno}</td>
                <td>{a.ifsc}</td>
                <td>{a.tax}</td>
                <td>{a.salary}</td>
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

  const fetchsal = async (e)=>{
    Axios.post("http://localhost:3001/salary", {id : e}).then((res)=>{
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
        fetchsal(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ?
        (<>
        <HrNavbar logoutAction={logout}/>
        <div>
          <h2>Salary</h2>
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

export default Salary