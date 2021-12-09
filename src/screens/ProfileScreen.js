import React, { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie';
import CustomLoader from '../components/CustomLoader'
import LittleMessage from '../components/LittleMessage'
import { Top, Form, FormControl, Button } from './LoginScreen'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { Link } from 'react-router-dom'
import { fetchUserDetails } from '../redux/actions/userActions'
import useDocumentTitle from '../hooks/useDocumentTitle';

const Section = styled.section`
  padding: 15rem 0;
  width: 100%;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`

const Th = styled.th`
  text-align: left;
  padding: 1rem 0.5rem;
  color: var(--black);
  font-weight: normal;
  border: 1px solid rgba(34, 36, 38, 0.15);

  @media (max-width: 567px) {
    padding: 0.5rem;
  }
`

const Td = styled.td`
  padding: 1.7rem 0.5rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  background-color: #ddd;
  font-size: 1.5rem;

  @media (max-width: 567px) {
    font-size: 1.4rem;
    padding: 1.5rem 0.5rem;
  }
`

const Col = styled.div`
  overflow-x: auto;
`

const LinkWrapper = styled(Link)`
  background-color: var(--green1);
  padding: 0.5rem 1rem;
  color: var(--white);
  border-radius: 0.5rem;
`
const ErrorMsg = styled.div`
  color: red;
`;

const ProfileScreen = ({ history, location }) => {

  useDocumentTitle("BoaFresh | Profile Page")
  
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
  });

  const [cookies, removeCookie] = useCookies();
  let accessToken = cookies.access_token;
  const [loaded, setLoaded] = useState(false);
  const [orderLoaded, setOrderLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(true);
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await axios.get(`https://uat.ordering-boafresh.ekbana.net/api/v4/profile/show`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Api-Key': 'fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545',
          },
        });
        if (response.status === 200 ) {
          setLoaded(true);
          setProfile(response.data.data);
        } else {
          toast.error("Sorry. Cannot update your profile.")
        }
      } catch (err) {
        toast.error(err)
      }
    };
    loadUser();
    
  }, [accessToken]);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const response = await axios.get(`https://uat.ordering-boafresh.ekbana.net/api/v4/order`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Api-Key': 'fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545',
          },
        });
        if (response.status === 200 ) {
          setOrders(response.data.data);
          setOrderLoaded(true);

          console.log(orders, "show orders")
        } else {
          console.log("Cannot load orders")
        }
      } catch (err) {
        toast.error(err)
      }
    };
    loadOrder();
    
  }, [accessToken]);
  
  const handleInput = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };


  const updateProfile = async (e) => {
    e.preventDefault();
    const { firstName, lastName, mobileNumber } = profile;
    const printError = (elemId, hintMsg) => {
      document.getElementById(elemId).innerHTML = hintMsg;
    };
    var firstNameErr = true;
    var lastNameErr = true;
    var phoneErr = true;

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
    

    // Validate phone number
    if (mobileNumber == "") {
      printError("phoneErr", "Please enter your phone number.");
    } else {
      var regex = /^[1-9]\d{9}$/;
      if (regex.test(mobileNumber) === false) {
        printError("phoneErr", "Please enter a valid 10 digit phone number.");
      } else {
        printError("phoneErr", "");
        phoneErr = false;
      }
    }


    if ((firstNameErr || lastNameErr || phoneErr) == true) {
      return false;
    } else {
      setSubmitted(false);
      await fetch(`https://uat.ordering-boafresh.ekbana.net/api/v4/profile`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Api-Key': 'fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545',
        },
        body: JSON.stringify({
          'first-name': firstName,
          'last-name': lastName,
          'mobile-number': mobileNumber,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            
            toast.error(data.errors[0].message)
         
       } else {
         console.log('Updated..');
         toast.success("Profile was successfully updated.")
       }
        })
        .catch((error) => console.log(error));
    }
  };


  return (
   
    <Section>
      <Row className='container'>
        <Col>
          <Top>
            <i className='fas fa-cogs'></i>
            <div>
              <h2>Update Profile</h2>
            </div>
          </Top>
          {!loaded ? (
            <CustomLoader type='Oval' width={20} height={20} />
          ) : (
            <Form onSubmit={updateProfile}>
              <FormControl>
                <label htmlFor=''>First Name</label>
                <input
                  type='text'
                  name="firstName"
                  placeholder='First Name'
                  value={profile.firstName}
                  onChange={handleInput}
                />
                <ErrorMsg id="firstNameErr"></ErrorMsg>
              </FormControl>
              <FormControl>
                <label htmlFor=''>Last Name</label>
                <input
                  type='text'
                  name="lastName"
                  placeholder='Last Name'
                  value={profile.lastName}
                  onChange={handleInput}
                />
                <ErrorMsg id="lastNameErr"></ErrorMsg>
              </FormControl>
              <FormControl>
                <label htmlFor=''>Email</label>
                <input
                  type='email'
                  name="email"
                  placeholder='Enter Email'
                  value={profile.email}
                  onChange={handleInput}
                  disabled
                />
                <ErrorMsg id="emailErr"></ErrorMsg>
              </FormControl>
              <FormControl>
                <label htmlFor=''>Mobile Number</label>
                <input
                  type='text'
                  name="mobileNumber"
                  placeholder='Mobile Number'
                  value={profile.mobileNumber}
                  onChange={handleInput}
                />
                <ErrorMsg id="phoneErr"></ErrorMsg>
              </FormControl>

              <Button>Update Profile</Button>
            </Form>
          )}
        </Col>
        <Col>
          <h1>My Orders</h1>
          <>
          <Table>
                    <thead>
                      <tr>
                        <Th>ID</Th>
                        <Th>Date</Th>
                        <Th>Total</Th>
                        <Th>Paid</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                      </tr>
                    </thead>
                    <tbody>

                    {
                      !orderLoaded ? (
                        <>
                          <CustomLoader type='Oval' width={20} height={20} />
                          
                        </>
                      ): (
                        <>
                        {
                          orders.map((order) => (
                            <tr key={order.id}>
                                  <Td>{order.id}</Td>
                                  <Td>{order.orderDate}</Td>
                                  <Td>Rs. {order.total}</Td>
                                  <Td>
                                    Not Paid
                                  </Td>
                                  <Td>
                                    {order.status}
                                  </Td>
                                  <Td>
                                    <LinkWrapper to={`/`}>
                                      Details
                                    </LinkWrapper>
                                  </Td>
                        </tr>
                          ))
                        }
                        </>
                      )
                    }
                        
                      
                    </tbody>
            </Table>
          
          </>
          
            
          
        </Col>
      </Row>
    </Section>
  )
}

export default ProfileScreen
