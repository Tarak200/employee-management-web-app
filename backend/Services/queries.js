const bcrypt = require("bcrypt");

const Pool = require("pg").Pool;
const p = require("../config");
const { request, response } = require("express");
const saltRounds = 10;

const pool = new Pool(p.pool);


const getLogin = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
  
    pool.query(
      "SELECT * FROM user_password WHERE id = $1",
      [username],
      (error, results) => {
        if (error) {
          response.send({ error: error });
        }
  
        if (results.rows.length > 0) {
          var roles = results.rows[0].value;
          var verified1 = results.rows[0].verified;
          bcrypt.compare(
            password,
            results.rows[0].hashed_password,
            (err, res) => {
              if (res) {
                // console.log(request.session.user.rows[0].verified)
                // console.log('1',request.session);
                if(verified1 == "1"){
                  request.session.user = results;
                  response.send({
                    success: true,
                    message: "Successful login",
                    data: results,
                    role: roles,
                  });
                }
                else{
                  response.send({
                  success: false,
                  message: "Role Unassigned",
                  });
                }
              } else {
                response.send({
                  success: false,
                  message: "Wrong Username/Password Combo!!",
                });
              }
            }
          );
        } else {
          response.send({ success: false, message: "User Does Not Exist!" });
        }
      }
    );
  };
  
  const getLoginSession = (request, response) => {
    if (request.session.user) {
      // console.log('3', request.session.user);
      response.send({ loggedIn: true, user: request.session.user });
    } else {
      response.send({ loggedIn: false });
    }
  };
  
  const getLogout = (request, response) => {
    if (request.session.user) {
      response.clearCookie("iitbuser");
      response.send({ loggedIn: false });
    } else {
      response.send({ message: "No Cookie to Clear!" });
    }
  };

  const getRegistration = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    
    bcrypt.hash(password, saltRounds, (error, hash) => {
      if (error) {
        console.log(error);
      }

    pool.query(
      "INSERT INTO user_password VALUES ($1, $2, NULL, '0')",[username, hash],
      (error, results) => {
        if (error) {
          response.send({ error: error })
          }
        else{
          response.send({
            data: true,
          })
        }
        }
      );
    });      
  };

  const getPortalMaster = (request, response) => {
    pool.query(
      "SELECT * FROM user_password where verified = '0'",
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };

  const getAssign = (request, response) => {

    // console.log(request.body)
    const id = request.body.id;
    const role = request.body.role;

    pool.query("UPDATE user_password SET role = $2, verified = '1' WHERE id = $1", [id, role], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
  };

  const getApprove = (request, response) => {

    
    const id = request.body.id;
    const fromdate = new Date(request.body.fromdate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    const todate = new Date(request.body.todate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const status = request.body.status;

    pool.query("UPDATE leaveapplication SET status = $4 WHERE id = $1 AND fromdate = $2 AND todate = $3", [id, fromdate, todate, status], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
  };

  const getDrop = (request, response) => {

    // console.log(request.body)
    const id = request.body.id;
    // const role = request.body.role;

    pool.query("DELETE FROM user_password WHERE id = $1", [id], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
  };

  const getDeleteleave = (request, response) => {

    // console.log(request.body)
    const id = request.body.id;
    const fromdate = new Date(request.body.fromdate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    const todate = new Date(request.body.todate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    // const role = request.body.role;

    pool.query("DELETE FROM leaveapplication WHERE id = $1 AND fromdate = $2 AND todate = $3", [id, fromdate, todate], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
  };

  const getempdetail = (request, response) => {

    // console.log(request.body)
    const id = request.body.id;

    pool.query(
      "SELECT * FROM employeedetail WHERE id = $1",[id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };

  const getedu = (request, response) => {

    // console.log(request.body)
    const id = request.body.id;

    pool.query(
      "SELECT * FROM education WHERE id = $1",[id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };

  const getDependent = (request, response) => {

    // console.log(request.body)
    const id = request.body.id;

    pool.query(
      "SELECT * FROM dependents WHERE id = $1",[id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };

  const getworkexp = (request, response) => {

    // console.log(request.body)
    const id = request.body.id;

    pool.query(
      "SELECT * FROM workexp WHERE id = $1",[id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };

  const getleaveapp = (request, response) => {

    // console.log(request.body)
    const id = request.body.id;

    pool.query(
      "SELECT * FROM leaveapplication WHERE id = $1",[id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };

  const getleaveapphr = (request, response) => {

    // console.log(request.body)
    // const id = request.body.id;

    pool.query(
      "SELECT * FROM leaveapplication",
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };

  const getleaveappsubmit = (request, response) => {

    // console.log(request.body)
    const id = request.body.id;
    const leavetype = request.body.leavetype;
    const fromdate = request.body.fromdate;
    const todate = request.body.todate;
    const reason = request.body.reason;

    pool.query(
      "INSERT INTO leaveapplication VALUES ($1, $2, $3, $4, $5, 'Pending')",[id, leavetype, fromdate, todate, reason],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };

  const gethruser = (request, response) => {

    // console.log(request.body)
    // const id = request.body.id;
  
    pool.query(
      "SELECT * from currwork JOIN employeedetail ON currwork.id = employeedetail.id",
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };

  const getsal = (request, response) => {

    // console.log(request.body)
    pool.query(
      "SELECT * from salary JOIN employeedetail ON salary.id = employeedetail.id",
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  };

  module.exports = {
    getLogin,
    getLoginSession,
    getLogout,
    getRegistration,
    getPortalMaster,
    getAssign,
    getApprove,
    getDrop,
    getDeleteleave,
    getempdetail,
    getedu,
    getDependent,
    getworkexp,
    getleaveapp,
    getleaveapphr,
    getleaveappsubmit,
    gethruser,
    getsal,
  }