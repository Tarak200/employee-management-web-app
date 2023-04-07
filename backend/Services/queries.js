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
          bcrypt.compare(
            password,
            results.rows[0].hashed_password,
            (err, res) => {
              if (res) {
                request.session.user = results;
                // console.log(request.session.user)
                // console.log('1',request.session);
                response.send({
                  success: true,
                  message: "Successful login",
                  data: results,
                });
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
      "INSERT INTO user_password VALUES ($1, $2)",[username, hash],
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

  module.exports = {
    getLogin,
    getLoginSession,
    getLogout,
    getRegistration,
  }