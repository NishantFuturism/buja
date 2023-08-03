/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import '../../../public/assets1/css/default.min.css';
// import '../../../assets1/css/bundle.css';
import '../../../public/assets1/css/responsive.min.css';
import '../../../public/assets1/css/style.min.css';
import { addToCart, removeFromCart } from './actions';
// import mycartAPI from '../MainPage/api/mycartAPI';
//import history from '../../utils/history';
import { useRouter } from 'next/router';
import Warn from '../../components/ShowAlert/warn';
export default function Item(param) {
  const router = useRouter();
  console.log('param', param);
  const { data } = param
  const [qty, setQty] = useState(1);
  // function NotifyMeForReOrder() { }
  const dispatch = useDispatch()
  useEffect(() => { setQty(data.Quantity) }, [data])
  const locationPopupState = useSelector(state => state.locationPopup)
  function IncrementDecrementQuantityCart(action) {
    if (action === 'Inc') {
      setQty(qty + 1)
      dispatch(addToCart(qty + 1, data.SkuId, data.SKUFilterPriceId))
    }
    if (action === 'Dec') {
      if (qty > 0) {
        setQty(qty - 1)
        // dispatch(addToCart(qty - 1, data.SkuId, data.SKUFilterPriceId))
        if (qty === 1) {
          // console.log("removeitemdec=", SkuId, SKUFilterPriceId)
          dispatch(removeFromCart(data.SkuId, data.SKUFilterPriceId))
        } else {
          dispatch(addToCart(qty - 1, data.SkuId, data.SKUFilterPriceId))
        }
      }
    }
  }
  const productdetail = (PageUrl) => {
    router.push(`/product/${PageUrl}`, { skuUrl: PageUrl })
    localStorage.setItem('PageUrl', window.btoa(PageUrl))
  }
  return (
    <>
      {qty > data.CappingLimit ? <Warn msg={`Order quantity limit for this product is ${data.CappingLimit}`}></Warn> : null}
      <tr className={data.IsDeliveryAvailableToPinCode ? "pr-block item " : " pr-block item delivery-not-available"}>
        {data.IsDeliveryAvailableToPinCode ?
          <td className="mycart_1" width="100">
            <input type="hidden" className="PriceId" value="2720" />
            {/* <Link to className="ajaxload" > */}
            <img referrerPolicy='no-referrer'
              onClick={() => productdetail(data.SkuLink)}
              className="img-responsive" alt="Duplicate Grapes Black" src={data.ListingImage} height="150" width="150" />
            {/* </Link> */}
          </td> :
          <td className="mycart_1" width="100">
            <a className="ajaxload">
              <img className="img-responsive" alt="FreshOrange" src={data.ListingImage} height="150" width="150" />
            </a></td>}
        <td className="mycart_2" id='viewcartproductname'>
          <p><strong
            onClick={() => productdetail(data.SkuLink)}>
            {/* <Link to> */}
            {data.DisplayName}
            {/* </Link>  */}
          </strong></p>
          <span className="cart_pck_nm"><strong>Pack Size : </strong>
            {data.ListItem}
          </span>
          <div className="cart_del_nm" onClick={() => dispatch(removeFromCart(data.SkuId, data.SKUFilterPriceId))}>
            <span style={{ cursor: 'pointer' }}>
              <i className="lnr lnr-trash btn-remove" title="Delete" style={{ marginRight: '4px' }}></i>
              Delete
            </span>
          </div>
          <span className="Qtyx" style={{ fontSize: '14px !important' }}>
            {(!data.InStock || !data.IsActive) && (<span style={{ color: "#ff0000" }}>Unavailable</span>)}
          </span>
        </td>
        {
          data.IsDeliveryAvailableToPinCode ?
            <td className="mycart_3" width="150">
              {/* <button className="btn btn-notifyme-for-reorder btn-notifyme-for-reorder-84576" style={{ borderRadius: '25px', cursor: 'pointer', fontSize: '14px', height: '30px', textTransform: 'capitalize', right: '10px', color: '#fff', backgroundColor: '#FF7060', padding: '0 16px' }} data-productid="84576" type="button" onClick={NotifyMeForReOrder} href >Notify Me</button> */}
              {data.InStock && data.IsActive &&
                <div className="product-qty-info " style={{ textAlign: 'center' }}>
                  <div className="product-qty mr-3" >
                    <input type="button" className="IncDecQty AddUpdateqty2342  IncDecQtyforFloatingCart AddUpdateqtyfloatingcart2342" value={`${qty}`} />
                    <span id="btnUpdate@cart.SkuId" className={`dec qtybtn btn  ${qty <= 0 ? "btnDisable" : "btn-primary"}`} data-productid="83769" onClick={() => IncrementDecrementQuantityCart('Dec')}>
                      {qty !== 0 ? <i className="fa fa-minus"></i> : <i className="fa fa-close" ></i>}
                    </span>
                    <span id="btnUpdate@cart.SkuId" className="inc qtybtn btn btn-primary" data-productid="83769" onClick={() => IncrementDecrementQuantityCart('Inc')}>
                      <i className="fa fa-plus"></i>
                    </span>
                  </div>
                </div>
                // :
                // <div className="cart-info">
                //   <button className="btn btn-notifyme-for-reorder btn-notifyme-for-reorder-84576" style={{ borderRadius: '25px', cursor: 'pointer', fontSize: '14px', height: '30px', textTransform: 'capitalize', right: '10px', color: '#fff', backgroundColor: '#FF7060', marginTop: '4px' }} data-productid="84576" type="button" onClick={NotifyMeForReOrder} href >{data.IsNotified ? 'Notified' : 'Notify me'}</button>
                // </div>
              }
            </td> : <td className="mycart_3" width="150">
              <span className="lbl-cant-deliver"> Can't deliver to pin code <b> {locationPopupState && locationPopupState.pincode}</b></span>
            </td>
        }
        <td style={{ textAlign: 'right' }} className="mycart_4"><span className="span_unit_price_nm" id='viewunitprice'>Unit Price : </span> ₹{parseFloat(data.UnitPrice).toFixed(2)}</td>
        <td style={{ textAlign: 'right' }} className="mycart_7"><span className="span_total_price_nm">Total Price : </span> ₹{parseFloat(data.SubTotal).toFixed(2)}</td>
      </tr >
    </>
  );
}