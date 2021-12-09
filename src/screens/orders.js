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
  const [order, setOrder] = useState([])

 

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
          // setOrder(response.data.data);
          setOrderLoaded(true);

          console.log(response.data.data)
        } else {
          console.log("Cannot load orders")
        }
      } catch (err) {
        toast.error(err)
      }
    };
    loadOrder();
    
  }, [accessToken]);

  


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
                        <Th>Delivered</Th>
                        <Th></Th>
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
                        <tr>
                                  <Td>{order.id}</Td>
                                  <Td>{order.orderDate}</Td>
                                  <Td>{order.Total}</Td>
                                  <Td>
                                    Not Paid
                                  </Td>
                                  <Td>
                                    Not Delivered
                                  </Td>
                                  <Td>
                                    <LinkWrapper to={`/`}>
                                      Details
                                    </LinkWrapper>
                                  </Td>
                                </tr>
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
