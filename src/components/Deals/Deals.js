import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { listProducts } from "../../redux/actions/productActions";
import Alert from "../Alert";
import CustomLoader from "../CustomLoader";
import Message from "../Message";
import "./deals.css";
const Deals = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mainData = useSelector((state) => state.allHome);
  const { loading, error, homeData } = mainData;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <section class="section advert">
      <div class="advert-layout container">
        {loading ? (
          <CustomLoader type="Oval" width={40} height={40} />
        ) : error ? (
          <>
            {" "}
            <Alert type="danger" message={error} title="" />{" "}
            <Message type="warning" message={error} />{" "}
          </>
        ) : (
            <>
                {
                !loading &&
                homeData &&
                homeData[5] &&
                (homeData[5].details.slice(0, 2)).map((item) => (
                    <div class="item " key={item.id}>
                        <img src={item.images} alt=""/>
                    </div>
                ))
            }
            </>
                    
                
        )}
      </div>
    </section>
  );
};

export default Deals;
