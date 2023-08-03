/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
import { compose } from 'redux';
import AddToCart from '../AddToCart';
////import history from '../../utils/history';
import { useRouter } from 'next/router';
// import {  } from "../DealdayProductOriginal/actions";
import { addToCart, removeFromCart } from './actions';
import LocationApi from '../MainPage/api/Locationapi';
export function Item(props) {
  console.log('ndn', props);
  const { data, shoppingCart, i } = props
  const [qty, setQty] = useState(1);
  const [defaultlocdata, setdefaultlocdata] = useState([])
  const locationPopupState = useSelector(state => state.locationPopup)
  console.log("locationPopupState", locationPopupState);
  // const [QtyCout, setQtyCout] = useState(1);
  // function IncrementDecrementQuantityCartFloatingCart(action) {
  //   if (action === 'Add' || action === 'Inc') {
  //     setQty(qty + 1)
  //     addToCartFunc(qty + 1, data.SkuId, data.SKUFilterPriceId)
  //   };
  //   if (action === 'Dec' && qty > 0) {
  //     setQty(qty - 1)
  //     if (qty <= 1) {
  //       removeFromCartFunc(data.SkuId, data.SKUFilterPriceId)
  //       // if (qty > 0) {
  //       // }
  //     } else {
  //       addToCartFunc(qty - 1, data.SkuId, data.SKUFilterPriceId)
  //     }
  //   }
  // }
  // const productdetail = (PageUrl) => {
  //   router.push('/product/', { skuUrl: PageUrl })
  //   localStorage.setItem('PageUrl', window.btoa(PageUrl))
  // }
  useEffect(() => { setQty(data.Quantity) }, [data]);
  const dispatch = useDispatch()
  // function NotifyMeForReOrder() { }
  function remove() {
    dispatch(removeFromCart(data.SkuId, data.SKUFilterPriceId))
  }
  useEffect(() => {
    LocationApi.GoogleApi({})
      .then(response => {
        const data1 = response
        setdefaultlocdata(data1)
        console.log("data1", data1);
      })
  }, [props])
  function LoadProductPDP(PageUrl) {
    // router.push(`/product/${PageUrl}`, { state: { PageUrl } })
    console.log("PageUrl", PageUrl);
    localStorage.setItem('PageUrl', window.btoa(PageUrl))
    // dispatch(getskuProductdetail(window.atob(localStorage.getItem('PageUrl'))))
  }
  console.log("data.SkuLink", data.SkuLink);
  return (
    (
      <>
        {
          data.IsDeliveryAvailableToPinCode === false &&
          <li className="cart-prod pr-block delivery-not-available">
            <input type="hidden" className="PriceId" value="2967" />
            <div className="cart-img">
              {/* <a className="ajaxload"> */}
              <Link href={`/product/${data.SkuLink}`} onClick={() => LoadProductPDP(data.SkuLink)} >
                <img className="img-responsive" referrerPolicy='no-referrer' alt={data.DisplayName}
                  src={data.ListingImage} height="150" width="150" />
              </Link>
              {/* </a> */}
            </div>
            <div className="cart-info">
              <h4><Link href={`/product/${data.SkuLink}`} onClick={() => LoadProductPDP(data.SkuLink)} > {data.DisplayName} ({data.ListItem}) </Link> </h4>
              {data.InStock && <span className="Qtyx" style={{ fontSize: '14px !important' }}>{`${qty} x ₹${parseFloat(data.UnitPrice).toFixed(2)}`}</span>}
              <span className="Qtyx" style={{ fontSize: '14px !important' }}>
                {!data.InStock && (<span>Unavailable</span>)}
              </span>
            </div>
            <span className="lbl-cant-deliver"> Can't deliver to pin code <b>
              {localStorage.getItem('pincodevalue') && localStorage.getItem('pincodevalue') !== "" ? localStorage.getItem('pincodevalue') : defaultlocdata.DefaultDeliveryLocality_Pincode}
              {/* locationPopupState === undefined ? defaultlocdata.DefaultDeliveryLocality_Pincode : locationPopupState && locationPopupState.pincode */}
            </b></span>
            <div className="del-icon">
              <i className="fa fa-trash" title="Remove"
                onClick={remove}
                data-cartid="124693ff-ec1e-4e5b-9616-e408fd847f71" data-isrfq="False"></i>
            </div>
          </li>
        }
        {
          data.IsDeliveryAvailableToPinCode === true && data.Quantity > 0 &&
          <li key={i} className="cart-prod pr-block ">
            <input type="hidden" className="PriceId" value="2720" />
            <div className="cart-img">
              <Link href={`/product/${data.SkuLink}`} onClick={() => LoadProductPDP(data.SkuLink)} >
                <img className="img-responsive" referrerPolicy='no-referrer' alt={data.DisplayName}
                  src={data.ListingImage} height="150" width="150" />
              </Link>
            </div>
            <div className="cart-info">
              <h4> <Link href={`/product/${data.SkuLink}`} onClick={() => LoadProductPDP(data.SkuLink)} >{data.DisplayName} ({data.ListItem}) </Link> </h4>
              {data.InStock && <span className="Qtyx" style={{ fontSize: '14px !important' }}>{`${qty} x ₹${parseFloat(data.UnitPrice).toFixed(2)}`}</span>}
              <span className="Qtyx" style={{ fontSize: '14px !important' }}>
                {!data.InStock && (<span>Unavailable</span>)}
              </span>
            </div>
            <div className="product-qty-info" style={{ textAlign: 'center' }}>
              <AddToCart filtered={data} shoppingCart={shoppingCart} cart />
            </div>
            {/* <AddToCart data={data} shoppingCart={shoppingCart} filtered={data}
        wishlist={false}
      /> */}
            {/* {!data.IsNotified ? (<div className="product-qty-info" style={{ textAlign: 'center' }}>
        <div className="product-qty mr-3">
          <input type="button" className="IncDecQty AddUpdateqty2342  IncDecQtyforFloatingCart AddUpdateqtyfloatingcart2342" value={`${qty}`} />
          <span id="btnUpdate@cart.SkuId" className={`dec qtybtn btn  ${qty <= 0 ? "btnDisable" : "btn-primary"}`} data-productid="83769" onClick={(e) => IncrementDecrementQuantityCartFloatingCart('Dec')}> */}
            {/* <i className="fa fa-minus"></i> */}
            {/* <FontAwesomeIcon icon={faMinus} ></FontAwesomeIcon> */}
            {/* </span>
          <span id="btnUpdate@cart.SkuId" className="inc qtybtn btn btn-primary " data-productid="83769" onClick={() => IncrementDecrementQuantityCartFloatingCart('Inc')}> */}
            {/* <i className="fa fa-plus"></i> */}
            {/* <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> */}
            {/* </span>
        </div>
      </div>) :
        (<div className="cart-info">
          <button className="btn btn-notifyme-for-reorder btn-notifyme-for-reorder-84576" style={{ borderRadius: '25px', cursor: 'pointer', fontSize: '14px', height: '30px', textTransform: 'capitalize', right: '10px', color: '#fff', backgroundColor: '#FF7060', marginTop: '4px' }} data-productid="84576" type="button" onClick={NotifyMeForReOrder} href >Notify Me</button>
        </div>)} */}
            <span className="price-x" style={{ width: '20%', textAlign: 'right', marginTop: '2px' }}>
              ₹{parseFloat(data.SubTotal).toFixed(2)}
              <br />
              {
                data.savedprice !== 0 ?
                  <span style={{ fontSize: '13px', color: '#6DD139', fontWeight: 'bold', lineHeight: '13px' }}>
                    Saved ₹{parseFloat(data.savedprice).toFixed(2)}
                  </span> : null
              }
            </span>
            {/* <div className="del-icon"> */}
            {/* <i className="fa fa-times-circle" onClick={RemoveFromCartForFloatingCart} data-productid="84576" data-sfpid="2720" data-cartid="c4aa0b79-8adb-4c72-aaf8-79e3c0117fe3" data-isrfq="False">
        </i> */}
            {/* <FontAwesomeIcon icon={faTimesCircle} onClick={() => removeFromCartFunc(data.SkuId, data.SKUFilterPriceId)}></FontAwesomeIcon> */}
            {/* </div> */}
          </li>
        }
      </>
    )
  );
}
Item.propTypes = {
  shoppingCart: PropTypes.array,
  data: PropTypes.array,
  i: PropTypes.number
};
const mapStateToProps = state => { }
//   ({ qty: state.dealdayProduct.qty })
//   ;
function mapDispatchToProps(dispatch) {
  return {
    addToCartFunc: (qty, SkuId, SKUFilterPriceId) => dispatch(addToCart(qty, SkuId, SKUFilterPriceId)),
    removeFromCartFunc: (SkuId, SKUFilterPriceId) => dispatch(removeFromCart(SkuId, SKUFilterPriceId))
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(Item);