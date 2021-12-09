import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Container from "../components/FormContainer";
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
const RegisterScreen = ({ history, location }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      last_name: "",
      email: "",
      password: "",
      mobile_number: "",
      first_name: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, phone, email, password, confirmPassword } =
      user;

    let formData = new FormData();

    const printError = (elemId, hintMsg) => {
      document.getElementById(elemId).innerHTML = hintMsg;
    };
    // Defining error variables with a default value
    var firstNameErr = true;
    var lastNameErr = true;
    var phoneErr = true;
    var emailErr = true;
    var passwordErr = true;
    var confirmPasswordErr = true;

    // Validate first name
    if (firstName == "") {
      printError("firstNameErr", "Please enter your first name.");
    } else {
      var regex = /^[a-zA-Z\s]+$/;
      if (regex.test(firstName) === false) {
        printError("firstNameErr", "Please enter a valid first name.");
      } else {
        printError("firstNameErr", "");
        firstNameErr = false;
      }
    }
    // Validate last name
    if (lastName == "") {
      printError("lastNameErr", "Please enter your last name.");
    } else {
      var regex = /^[a-zA-Z\s]+$/;
      if (regex.test(lastName) === false) {
        printError("lastNameErr", "Please enter a valid last name.");
      } else {
        printError("lastNameErr", "");
        lastNameErr = false;
      }
    }
    // Validate email address
    if (email == "") {
      printError("emailErr", "Please enter your email address.");
    } else {
      // Regular expression for basic email validation
      var regex = /^\S+@\S+\.\S+$/;
      if (regex.test(email) === false) {
        printError("emailErr", "Please enter a valid email address.");
      } else {
        printError("emailErr", "");
        emailErr = false;
      }
    }

    // Validate phone number
    if (phone == "") {
      printError("phoneErr", "Please enter your phone number.");
    } else {
      var regex = /^[1-9]\d{9}$/;
      if (regex.test(phone) === false) {
        printError("phoneErr", "Please enter a valid 10 digit phone number.");
      } else {
        printError("phoneErr", "");
        phoneErr = false;
      }
    }

    //Validate Password
    if (password == "") {
      printError("passwordErr", "Please enter your password.");
    }
    
     else {
      printError("passwordErr", "");
      passwordErr = false;
    }

    //Validate Confirm Password
    if (confirmPassword == "") {
      printError("confirmPasswordErr", "Please confirm your password.");
    } else if ( password !== confirmPassword) {
      printError("confirmPasswordErr", "Please match your password with confirm password " )
    }
    else{
      printError("confirmPasswordErr", "" );
      confirmPasswordErr = false;
    }
    

    // Prevent the form from being submitted if there are any errors
    if ((firstNameErr || lastNameErr || emailErr || phoneErr || passwordErr || confirmPasswordErr) == true) {
      return false;
    } else {
      // Creating a string from input data for preview
      // var dataPreview = "You've entered the following details: \n" +
      //                   "First Name: " + firstName + "\n" +
      //                   "Last Name: " + lastName + "\n" +
      //                   "Email Address: " + email + "\n" +
      //                   "Phone Number: " + phone + "\n" ;
      // // Display input data in a dialog box before submitting the form
      // alert(dataPreview);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('mobile_number', phone);
      formData.append('email', email);
      formData.append('password', password);
      
      fetch(`https://uat.ordering-boafresh.ekbana.net/api/v4/auth/signup`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            
               toast.error(data.errors[0].message)
            
          } else {
            console.log('Registered..');
            toast.success("Sign Up successful.")
            setTimeout(() => {
              resetForm();
              
            }, 1200);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  // const dispatch = useDispatch()
  // const userLogin = useSelector(state => state.userLogin)

  // const { loading, userInfo } = userLogin

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  //   if (userInfo) {
  //     history.push(redirect)
  //   }
  // }, [userInfo, history, redirect])

  const submitHandler = (e) => {
    // e.preventDefault()
    // if (password !== passwordConfirm) {
    //   toast.error('Passwords do not match')
    // } else if (name && email && password) {
    //   dispatch(register(name, email, password))
    // } else {
    //   toast.error('Please fill all fields!')
    // }
  };

  return (
    <Wrapper>
      <Container>
        <Top>
          <i className="fas fa-cogs"></i>
          <div>
            <h2>Get Started</h2>
            <p>Create a new account</p>
          </div>
        </Top>
        {/* {loading && loading ? (
          <CustomLoader type='Oval' width={20} height={20} />
        ) : ( */}
        <Form onSubmit={handleSubmit}>
          <FormControl>
            <label htmlFor="">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={user.firstName}
              onChange={handleInput}
            />
            <ErrorMsg id="firstNameErr"></ErrorMsg>
          </FormControl>
          <FormControl>
            <label htmlFor="">Last Name </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={user.lastName}
              onChange={handleInput}
            />
            <ErrorMsg id="lastNameErr"></ErrorMsg>
          </FormControl>
          <FormControl>
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={user.phone}
              onChange={handleInput}
            />
            <ErrorMsg id="phoneErr"></ErrorMsg>
          </FormControl>
          <FormControl>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={user.email}
              onChange={handleInput}
            />
            <ErrorMsg id="emailErr"></ErrorMsg>
          </FormControl>

          <FormControl>
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInput}
            />
            <ErrorMsg id="passwordErr"></ErrorMsg>
          </FormControl>
          <FormControl>
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={handleInput}
            />
            <ErrorMsg id="confirmPasswordErr"></ErrorMsg>
          </FormControl>

          <Button type="submit">Signup Now</Button>
          <ErrorMsg id="responseErr"></ErrorMsg>
        </Form>
        {/* )} */}

        <Bottom>
          <i className="fas fa-question"></i>
          Existing user? <Link to="/login">Login here</Link> instead.
        </Bottom>
      </Container>
    </Wrapper>
  );
};

export default RegisterScreen;
