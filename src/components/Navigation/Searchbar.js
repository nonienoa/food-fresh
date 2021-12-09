import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker, faSearch } from '@fortawesome/free-solid-svg-icons';
import './searchbar.css'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
const Searchbar = () => {

    const history = useHistory()
  const [allProducts, setAllProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');


    const fetchAllProducts = async () => {
        try {
          const response = await axios.get(`https://uat.ordering-boafresh.ekbana.net/api/v4/product`, {
            headers: {
              'Api-Key': 'fa63647e6ac4500d4ffdd413c77487dbc8acf22dc062bb76e8566deb01107545',
              'Warehouse-id': '1',
            },
          });
          if (response.status === 200) {
            setAllProducts(response.data.data);
          } else {
            toast.error(`Could'nt load data.`);
          }
        } catch (err) {
          toast.error(err);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, [])

    console.log(allProducts)

    return (
        <div id='search-bar'>
            <span>Welcome you to BoaFresh!  </span>
            <span><FontAwesomeIcon icon={faMapMarker}/> &nbsp; Itahari</span>
            <div class="search-box">
                <input type="text" class="search-input" placeholder="Search..." onChange={(e) => setSearchValue(e.target.value)}/>
                <button class="search-button">
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </button>
                <div className={searchValue === '' ? null : 'suggestions'}>
                    {allProducts.filter((searchedProducts) => {
                        if (searchValue === '') {
                        return null;
                        }
                        else if (searchedProducts.title.toLowerCase().includes(searchValue.toLowerCase())) {
                        return searchedProducts;
                        }
                    })
                    .map((product) => {
                        return (
                        <div key={product.id}>
                            <Link to={`/product-details/${product.slug}`} onClick={() => setSearchValue('')} className='searched-word-link '>
                            <img src={product.images[0].imageName} alt='product' className='result-img' />
                            {product.title}
                            </Link>
                        </div>
                        );
              })}
          </div>
            </div>
        
        </div>
    )
}

export default Searchbar
