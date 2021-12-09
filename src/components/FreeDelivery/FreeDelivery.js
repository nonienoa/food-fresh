import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShippingFast, faLock, faRedoAlt, faHeadset } from '@fortawesome/free-solid-svg-icons';
import './freeDelivery.css'
// import { FaShippingFast } from 'react-icons/fa';
function FreeDelivery() {
    return (
        <section class="icons-container">

        <div class="icons">
            <i><FontAwesomeIcon icon = {faShippingFast} /></i>
            <div class="content">
                <h3>free shipping</h3>
                <p>order over $100</p>
            </div>
        </div>

        <div class="icons">
            <i><FontAwesomeIcon icon={faLock}/></i>
            <div class="content">
                <h3>secure payment</h3>
                <p>100 secure payment</p>
            </div>
        </div>

        <div class="icons">
        <i><FontAwesomeIcon icon={faRedoAlt}/></i>
            <div class="content">
                <h3>easy returns</h3>
                <p>10 days returns</p>
            </div>
        </div>

        <div class="icons">
        <i><FontAwesomeIcon icon={faHeadset}/></i>
            <div class="content">
                <h3>24/7 support</h3>
                <p>call us anytime</p>
            </div>
        </div>

</section>
    )
}

export default FreeDelivery
