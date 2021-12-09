import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { getAllProducts } from "../../redux/actions/productActions";
import ShowCategories from "./ShowCategories";
// import { ProductItem, ImgContainer, Bottom, ProductLink,Price,  PriceLabel} from './Products'
import { addToCart } from "../Functions/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./showProducts.css";
import CustomLoader from "../CustomLoader";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import ProductCategories from "./ProductCategories";
import './productCategories.css'

const ProductsShowcase = () => {
  const [cookies, removeCookie] = useCookies();
  let accessToken = cookies.access_token;
  let { categorySlug } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch,categorySlug]);

  useDocumentTitle(`BoaFresh | Products`);
  const [sort, setSort] = useState('default')

  const productsData = useSelector((state) => state.allProducts);
  const { isLoaded, products } = productsData;



  const filterProducts = (sort, products, categorySlug) => {
   if(sort === 'default'){
    return(
      products.filter((prod) => prod.categorySlug === categorySlug)
    )
   }
   if(sort === 'ascAlphabet'){
    return(
      (products.filter((prod) => prod.categorySlug === categorySlug)).sort((a, b) => (a.title > b.title ? 1 : -1))
    )
   }
   if(sort === 'descAlphabet'){
    return(
      (products.filter((prod) => prod.categorySlug === categorySlug)).sort((a, b) => (a.title < b.title ? 1 : -1))
    )
   }
   if(sort === 'ascPrice'){
    return(
      (products.filter((prod) => prod.categorySlug === categorySlug)).sort((a, b) => a.unitPrice[0].sellingPrice - b.unitPrice[0].sellingPrice)
    )
   }
   if(sort === 'descPrice'){
    return(
      (products.filter((prod) => prod.categorySlug === categorySlug)).sort((a, b) => b.unitPrice[0].sellingPrice - a.unitPrice[0].sellingPrice)
    )
   }
  }

  const handleFilterChange = (e) => {
    if (e.target.value === 'default') {
      setSort('default')
    }
    if (e.target.value === 'A-to-Z') {
      setSort('ascAlphabet')
    }
    if (e.target.value === 'Z-to-A') {
      setSort('descAlphabet')
    }
    if (e.target.value === 'Low-to-High') {
      setSort('ascPrice')
    }
    if (e.target.value === 'High-to-Low') {
      setSort('descPrice')
    }
  }
  return (
    <>
    <section className="section products">
      <div className="products-layout container">
        <ProductCategories />
        <div className="col-3-of-4">
          {/* Sorting */}
          <form action="">
            <div className="item">
              <label for="sort-by">Sort By</label>
              <select name="sort-by" id="sort-by" onChange={handleFilterChange}>
              <option selected="selected" value="default">Default Sort</option>
                <option value="A-to-Z">
                  A to Z
                </option>
                <option value="Z-to-A">Z to A</option>
                <option value="Low-to-High">Price(Low{">"}High)</option>
                <option value="High-to-Low">Price(High{">"}Low)</option>
              </select>
            </div>
          </form>
          {
            isLoaded ? (
              <>
                {
                  products.length > 0 ? (
                    <>
                      {
                        filterProducts(products,categorySlug) === [] ? (
                          <p>Sorry, no available products.</p>
                        ) : (
                          <div className="product-layout">
                            {
                              filterProducts(sort, products,categorySlug).map((item) => {
                              return(
                                <>
                                  <div className="product">
                                        <div className="img-container">
                                        <Link to={`/product-details/${item.slug}`}>
                                            <img src={item.images[0].imageName} alt={item.title} />
                                        </Link>
                                          <div className="addCart"  onClick={(e) => {addToCart(e, item.id, accessToken)}}>
                                            <FontAwesomeIcon icon={faShoppingCart} />
                                          </div>
                                        </div>
                                        <div className="bottom">
                                          <Link to={`/product-details/${item.slug}`}>{item.title}</Link>
                                          <div className="price">
                                            <span>Rs. {item.unitPrice[0].sellingPrice}</span>
                                          </div>
                                        </div>
                                      </div>
                                </>
                              )
                            })
                          }
                          </div>
                        )
                      }
                    </>
                  ) : (
                    <p>No products</p>
                  )
                }
              </>
            ) : (
              <CustomLoader type='Oval' width={40} height={40} />
            )
          }
        </div>
      </div>
    </section>
    </>
  );
};

export default ProductsShowcase;
