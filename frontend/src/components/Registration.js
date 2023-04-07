import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const Registration = () => {

  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

  const navigate = useNavigate();
  const refreshToHome = () => {
    navigate("/");
  }

   const register = () => {
    Axios.post("http://localhost:3001/registration", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
        console.log(response)
        if(response.data){
          refreshToHome();
        }
    });
  };


  return(

    <div className="registration">
        <h1>Registration</h1>
        <label>Employee ID</label>
        <input
          type="text"
          placeholder='Enter your Employee ID'
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder='Enter Password to be set'
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}> Register </button>
      </div>
  );
}