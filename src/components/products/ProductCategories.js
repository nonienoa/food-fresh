import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../redux/actions/categoryActions";
import styled from "styled-components";
import CustomLoader from "../../components/CustomLoader";
import "./productCategories.css";

const CategoryLink = styled(Link)`
  :hover {
    color: var(--primary);
  }
`;

const ProductCategories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const categoriesData = useSelector((state) => state.allCategories);
  const { categories, isLoaded } = categoriesData;

  return (
    <div className="col-1-of-4">
      <div>
        <div className="block-title">
          <h3>Category</h3>
        </div>

        <ul className="block-content">
          {isLoaded ? (
            <>
              {categories.map((category) => {
                return (
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label for="">
                      <CategoryLink to={`/products/category/${category.slug}`}>
                        <span>{category.title}</span>
                        <small>({category.productCount})</small>
                      </CategoryLink>
                    </label>
                    {category.subcategories.length > 0 &&
                      category.subcategories.map((subcategory) => {
                        return (
                          <ul className="sub-content">
                            <li>
                              <input type="checkbox" name="" id="" />
                              <label for="">
                                <CategoryLink
                                  to={`/products/category/${subcategory.slug}`}
                                >
                                  <span>{subcategory.title}</span>
                                  <small>({subcategory.productCount})</small>
                                </CategoryLink>
                              </label>
                            </li>
                          </ul>
                        );
                      })}
                  </li>
                );
              })}
            </>
          ) : (
            <CustomLoader type="Oval" width={40} height={40} />
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductCategories;
