import React from 'react'
import useDocumentTitle from "../hooks/useDocumentTitle";

import Hero from '../components/Hero'
import Collection from '../components/collections/Collection'
import Products from '../components/products/Products'
import NewDishes from '../components/products/NewDishes'
import PopUp from '../popup'
import FreeDelivery from '../components/FreeDelivery/FreeDelivery';
import Deals from '../components/Deals/Deals';

const HomeScreen = () => {
  useDocumentTitle("BoaFresh | Home")
  return (
    <>
      <Hero />
      <Collection />
      
      <Products />
      {/* <NewDishes/> */}
      <FreeDelivery/>
      <Deals/>
    </>
  )
}

export default HomeScreen
