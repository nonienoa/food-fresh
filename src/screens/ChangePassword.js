import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Container from "../components/FormContainer";
import { useCookies } from 'react-cookie';

import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import CustomLoader from "../components/CustomLoader";
import { Top, Form, FormControl, Button, Bottom } from "./LoginScreen";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: url("/images/signup-bg.jpg") center/cover no-repeat fixed;
`;
const ErrorMsg = styled.div`
  color: red;
`;
const ChangePassword = ({ history, location }) => {

    const [cookies, removeCookie] = useCookies();
    let accessToken = cookies.access_token;

    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

  const handleInput = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = password;

    let formData = new FormData();

    const printError = (elemId, hintMsg) => {
      document.getElementById(elemId).innerHTML = hintMsg;
    };
    // Defining error variables with a default value
    var oldPasswordErr = true;
    var newPasswordErr = true;
    var confirmPasswordErr = true;


    //Validate Password
    if (oldPassword == "") {
      printError("oldPasswordErr", "Please enter your oldPassword.");
    }
    
     else {
      printError("oldPasswordErr", "");
      oldPasswordErr = false;
    }

    //Validate Password
    if (newPassword == "") {
        printError("newPasswordErr", "Please enter your newPassword.");
      }
      
       else {
        printError("newPasswordErr", "");
        newPasswordErr = false;
      }
    
    //Validate Confirm Password
    if (confirmPassword == "") {
      printError("confirmPasswordErr", "Please confirm your password.");
    } else if ( newPassword !== confirmPassword) {
      printError("confirmPasswordErr", "Please match your password with confirm password " )
    }
    else{
      printError("confirmPasswordErr", "" );
      confirmPasswordErr = false;
    }
    

    // Prevent the form from being submitted if there are any errors
    if ((oldPasswordErr || newPasswordErr || confirmPasswordErr ) == true) {
      return false;
    } else {
      formData.append('old-password', oldPassword);
      formData.append('new-password', newPassword);
      formData.append('confirm-password', confirmPassword);
      
      fetch(`https://uat.ordering-boafresh.ekbana.net/api/v4/profile/change-password`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Api-Key': `fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545`,
          },
          body: JSON.stringify({
            'old-password': oldPassword,
            'new-password': newPassword,
            'confirm-password': confirmPassword,
          }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            
               toast.error(data.errors[0].message)
            
          } else {
            console.log('Password updates..');
            toast.success("Password has been updated. Please login again.")
            removeCookie('access_token');
            history.push('/login')
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";


  return (
    <Wrapper>
      <Container>
        <Top>
          <i className="fas fa-cogs"></i>
          <div>
            <h2>Change Password</h2>
            {/* <p>Create a new account</p> */}
          </div>
        </Top>
        <Form onSubmit={handleSubmit}>
        <FormControl>
            <label htmlFor="">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old password"
              value={password.oldPassword}
              onChange={handleInput}
            />
            <ErrorMsg id="oldPasswordErr"></ErrorMsg>
          </FormControl>
          <FormControl>
            <label htmlFor="">New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={password.newPassword}
              onChange={handleInput}
            />
            <ErrorMsg id="newPasswordErr"></ErrorMsg>
          </FormControl>
          <FormControl>
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={password.confirmPassword}
              onChange={handleInput}
            />
            <ErrorMsg id="confirmPasswordErr"></ErrorMsg>
          </FormControl>

          <Button type="submit">Change password</Button>
          <ErrorMsg id="responseErr"></ErrorMsg>
        </Form>


        <Bottom>
          <i className="fas fa-question"></i>
          Changed your mind? <Link to="/">Go back</Link> instead.
        </Bottom>
      </Container>
    </Wrapper>
  );
};

export default ChangePassword;
