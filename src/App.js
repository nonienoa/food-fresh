import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'
import styled from 'styled-components'
import 'react-notifications-component/dist/theme.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import 'react-toastify/dist/ReactToastify.css'

import HomeScreen from './screens/HomeScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'
import Cart from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import { ToastContainer } from 'react-toastify'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import ProductComponent from './components/try'
import Searchbar from './components/Navigation/Searchbar'
import ShowProducts from './components/products/ShowProducts'
import tryl from './components/Navigation/tryl'
import ProductCategories from './components/products/ProductCategories'
import ProductsShowcase from './components/products/ProductsShowcase'
import ShippingLocations from './screens/ShippingLocations'
import ForgotPassword from './screens/ForgotPassword'
import ChangePassword from './screens/ChangePassword'
// import InfoTabs from './screens/InfoTabs'

const Grid = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-areas: 'header' 'main' 'footer';
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
`

const Main = styled.main`
  grid-area: main;
`

function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
    {/* <ProductComponent /> */}
      {/* <ReactNotification /> */}
      <Grid>
        <Navigation />
        <Main>
          <Route path='/product-details/:productSlug' component={ProductDetailsScreen} />
          {/* <Route path='/products/category/:categorySlug' component={ShowProducts} /> */}
          <Route path='/products/category/:categorySlug' component={ProductsShowcase} />

          <Route path='/cart/:id?' component={Cart} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/orders/:id' component={OrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} /> 
          <Route path='/forgot-password' component={ForgotPassword} /> 

          <Route path='/profile/address' component={ShippingLocations} /> 
          <Route path='/change-password' component={ChangePassword} /> 


          {/* <Route path='/profile' component={InfoTabs} />  */}

          <Route exact path='/' component={HomeScreen} />
        </Main>
        <Footer />
      </Grid>
      <ToastContainer autoClose={2500} />
    </>
  )
}

export default App
