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

const ForgotLink = styled(Link)`
  cursor: pointer;
  float: right;
  color: red;
  :hover{
    color: green;
  }
`

const LoginScreen = ({ history, location }) => {
  useDocumentTitle("BoaFresh | Login")
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  const [cookies, setCookie] = useCookies(['access_token']);
  // const navigate = useNavigate();

  console.log(cookies);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState({ type: null, msg: null });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      email: '',
      password: '',
    });
  };

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()
  // const userLogin = useSelector(state => state.userLogin)
  // const { loading, userInfo } = userLogin

  // const submitHandler = e => {
  //   e.preventDefault()
  //   if (email && password) {
  //     dispatch(login(email, password))
  //   } else {
  //     toast.error('Please fill all fields!')
  //   }
  // }

    const submitHandler = e => {
      e.preventDefault()
      const { email, password } = user;
      let formData = new FormData();
      const printError = (elemId, hintMsg) => {
        document.getElementById(elemId).innerHTML = hintMsg;
      };
      var emailErr = true;
      var passwordErr = true;

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

       //Validate Password
      if (password == "") {
        printError("passwordErr", "Please enter your password.");
      }
      
      else {
        printError("passwordErr", "");
        passwordErr = false;
      }


      if (( emailErr || passwordErr ) == true) {
        return false;
      } else {
        formData.append('username', email);
        formData.append('password', password);
        formData.append('client_id', clientID);
        formData.append('client_secret', clientSecret);
        formData.append('grant_type', grantType);
        fetch(`${baseURL}${auth}/login`, {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.errors) {
              toast.error(data.errors[0].message)
            } else {
              // navigate('/');
              console.log(data);
              setCookie('access_token', data.access_token, {
                path: '/',
              });
              toast.success("Login Successful!")
              history.push(redirect)
              resetForm();
            }
          })
          .catch((error) => console.log(error));
      }
    }

  // useEffect(() => {
  //   window.scrollTo(0, 0)
  //   if (userInfo) {
  //     history.push(redirect)
  //   }
  // }, [userInfo, history, redirect])

  return (
    <>
      <Wrapper>
        <FormContainer>
          <Top>
            <i className='fas fa-key'></i>
            <div>
              <h2>Welcome Back!</h2>
              <p>Login with email and password</p>
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
                  value={user.email}
                  onChange={handleInput}
                  id='email'
                />
                <ErrorMsg id="emailErr"></ErrorMsg>
              </FormControl>

              <FormControl>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  name="password"
                  placeholder='Password'
                  value={user.password}
                  onChange={handleInput}
                  id='password'
                />
                <ErrorMsg id="passwordErr"></ErrorMsg>
              </FormControl>
              <ForgotLink to="/forgot-password">Forgot Password?</ForgotLink>

              <Button type='submit'>Login Now</Button>
            </Form>
          {/* )} */}

          <Bottom>
            <i className='fas fa-question'></i>
            Not an account?{' '}
            <Link
              to={redirect ? `/register/redirect=${redirect}` : '/register'}
            >
              Signup here
            </Link>{' '}
            instead.
          </Bottom>
        </FormContainer>
      </Wrapper>
    </>
  )
}

export default LoginScreen
