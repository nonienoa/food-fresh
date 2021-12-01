import React from "react";
// import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { ActionTypes } from "../redux/constants/action-types";
import {fetchCategories} from '../redux/actions/categoryActions'

const ProductComponent = () => {
  const categories = useSelector((state) => state.allCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories()) 
  }, [])

  console.log("dcs", categories)
  
  return <>
          
        </>;
};

export default ProductComponent;
