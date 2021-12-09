import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../../redux/actions/categoryActions'
import CustomLoader from '../../components/CustomLoader'
import './showCategories.css'
const ShowCategories = () => {
    const dispatch = useDispatch()

  useEffect(() => {
    
    dispatch(fetchCategories())
  }, [])

  const categoriesData = useSelector(state => state.allCategories)
  const { categories , isLoaded } = categoriesData

    return (
        <div className="categories-container">
        <h2>Categories</h2>
            <div className='main-categories'>
            {isLoaded ? (
                <ul>
                {categories.map((category) => {
                    return (
                    <div key={category.id}>
                        <Link
                        to={`/products/category/${category.slug}`}
                        className='text-decor'>
                        <li>
                            
                            {category.title}
                        </li>
                        </Link>
                        <div className='subCategories'>
                        {category.subcategories.length > 0 && category.subcategories.map((subcategory) => {
                            return (
                            
                            <>
                                
                                <Link to={`/products/category/${subcategory.slug}`} key={subcategory.id} className='text-decor'>
                                <li><span>---</span>{subcategory.title}</li>
                                </Link>
                            </>

                            );
                        })}
                        </div>
                    </div>
                    );
                })}
                </ul>
            ) : (
                <CustomLoader type='Oval' width={40} height={40} />
            )}
            </div>
            </div>
    )
}

export default ShowCategories
