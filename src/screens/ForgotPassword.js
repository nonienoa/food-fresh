import React, { useEffect, useState } from 'react'
// import {useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { baseURL, auth, clientID, clientSecret, grantType } from '../env.variables'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import CustomLoader from '../components/CustomLoader'
import useDocumentTitle from '../hooks/useDocumentTitle';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: url('https://uat.ordering-boafresh.ekbana.net/storage/uploads/banner/61937a7418988.jpg') center/cover no-repeat fixed;
`

export const Top = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--green2);
  color: var(--green1);
  padding: 2.5rem;
  border-radius: 0.5rem 0.5rem 0 0;

  i {
    font-size: 3.8rem;
    margin-right: 2rem;

    @media (max-width: 567px) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 1.4rem;
  }
`
export const Form = styled.form`
  padding: 2.5rem;
  background-color: var(--white);

  &.color {
    background-color: #f7f8fb;
  }
`

export const FormControl = styled.div`
  margin-bottom: 2rem;

  label {
    display: block;
    padding-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  input {
    border: 1px solid rgba(34, 36, 38, 0.15);
    width: 100%;
    text-indent: 1rem;
    font-size: 1.5rem;
    padding: 1.4rem 0;
    border-radius: 0.5rem;
  }
`

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 1.5rem 0;
  outline: none;
  border: none;
  background-color: var(--green1);
  color: var(--white);
  font-weight: 500;
  font-size: 1.6rem;
  border-radius: 0.5rem;
  cursor: pointer;
`

export const Bottom = styled.div`
  color: var(--brown1);
  padding: 2.5rem;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: var(--brown2);

  a {
    color: #4183c4;
  }

  i {
    padding-right: 1rem;
  }
`
const ErrorMsg = styled.div`
  color: red;
`;

const ForgotPassword = ({ history, location }) => {
  useDocumentTitle("BoaFresh | Forgot Password")
  const [cookies, setCookie] = useCookies(['access_token']);
  console.log(cookies);

  const [email, setEmail] = useState('');


  const handleInput = (e) => {
    setEmail(e.target.value);
  };



    const submitHandler = e => {
      e.preventDefault()
    //   const { email, password } = email;
      let formData = new FormData();
      const printError = (elemId, hintMsg) => {
        document.getElementById(elemId).innerHTML = hintMsg;
      };
      var emailErr = true;

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

      if (( emailErr ) == true) {
        return false;
      } else {
        fetch(`${baseURL}${auth}/forgot-password`, {
          method: 'POST',
          body: JSON.stringify({
            email: email,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.errors) {
              toast.error(data.errors[0].message)
            } else {
              toast.success("Please check your email and reset your password!")
              history.push('/login')
              setEmail('');
            }
          })
          .catch((error) => console.log(error));
      }
    }

  return (
    <>
      <Wrapper>
        <FormContainer>
          <Top>
            <i className='fas fa-key'></i>
            <div>
              <h2>Lost your password?</h2>
              <p> Please enter your email address. You will receive a link to create a new password via email.</p>
            </div>
          </Top>
          {/* {loading && loading ? (
            <CustomLoader type='Oval' width={20} height={20} />
          ) : ( */}
            <Form onSubmit={submitHandler}>
              <FormControl>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  name="email"
                  placeholder='Email'
                  value={email}
                  onChange={handleInput}
                  id='email'
                />
                <ErrorMsg id="emailErr"></ErrorMsg>
              </FormControl>


              <Button type='submit'>Reset Password</Button>
            </Form>
          {/* )} */}

          <Bottom>
            <i className='fas fa-question'></i>
            Did you reset your password?{' '}
            <Link
              to={'/login'}
            >
              Login Here
            </Link>{' '}
            instead.
          </Bottom>
        </FormContainer>
      </Wrapper>
    </>
  )
}

export default ForgotPassword
