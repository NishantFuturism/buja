/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/**
 *
 * Orderdeatails
 *
 */
// import { Footer } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import SubNavigation from '../../components/SubNavigation';
// import history from '../../utils/history';
import CheckoutAPI from '../MainPage/api/checkout';
import OrderdetailAPI from '../MainPage/api/orderdetail';
import { ordercancelpopup, deliverypopup, orderpopup } from './actions';
import Cancelorder from './cancelorder';
// import Returnorder from './Returnorder'
import FeedbackDelivery from './feedbackdelivery';
import DetailDelivery from './detailorder';
import reducer from './reducer';
// import saga from './saga';
import Footer from '../../components/Footer';
import makeSelectOrderdeatails from './selectors';
import history from '../../utils/history';
// import Success from '../../components/ShowAlert/success';
// import { Modal } from 'react-bootstrap'
import Image from 'next/image';

export function Orderdeatails() {
  console.log('i called here')
  useInjectReducer({ key: 'orderdeatails', reducer });
  // useInjectSaga({ key: 'orderdeatails', saga });
  const [addressdata, setaddressdata] = useState('')
  // const [statuscancel, setstatuscancel] = useState(false)
  const [OrderItemDetails, setOrderItemDetails] = useState([])
  // const [orderstatus, setOrderstatus] = useState(false)
  // const [ordercancelmsg, setordercancelmsg] = useState('')
  // const [clickcancelorder, setClickcancelorder] = useState(false)
  // const [refundone, setrefundone] = useState(false)
  const [closebar, setClosebar] = useState(false)
  const [closeorder, setCloseorder] = useState(false)
  const [refundAll, setRefundAll] = useState(false)
  const [isOrderCancelled, setIsOrderCancelled] = useState(false)
  // const [paymentmethod, setpaymentmethod] = useState('')
  // const [cancelbutton, setcancelbutton] = useState(true)
  const OrderReducer = useSelector(state => state.orderdeatails)
  // const trackordeReducer = useSelector(state => state.trackorder)
  // const [activesteps, setactivestep] = useState(0)
  console.log("orderreducer..", OrderReducer)
  const dispatch = useDispatch()
  // const fetchorder = () => {
  //   console.log("window.atob(localStorage.getItem('OrderNumber')==", window.atob(localStorage.getItem('OrderNumber')));
  //   OrderdetailAPI.getmyorder(window.atob(localStorage.getItem('OrderNumber')))
  //     .then(response => {
  //       setOrderItemDetails(response)
  //       console.log("chkres..", response)
  //       console.log("chkstatus..", response[0].Status)
  //       localStorage.setItem('OrderStatus', window.btoa(response[0].Status))
  //       // setOrderstatus(response)
  //       // setpaymentmethod(response[0].PaymentMethodName)
  //       localStorage.setItem('OrderItemDetails', JSON.stringify(response))
  //       // if (response[0].Status === 'Completed') {
  //       //   // setenablebutton(true)
  //       // }
  //       CheckoutAPI.getcustomeraddress({})
  //         .then(res => {
  //           const data = res.filter(id => id.CustomerAddressId === response[0].BillingAddressId)
  //           setaddressdata(data)
  //         })
  //       // OrderdetailAPI.getmyorder(window.atob(localStorage.getItem('OrderStatus')))
  //       // .then(resp => {
  //       // })
  //     })
  //     .catch(error => {
  //       console.log('error:::', error);
  //     });
  // }
  useEffect(() => {
    OrderdetailAPI.getmyorder(window.atob(localStorage.getItem('OrderNumber')))
      .then(response => {
        setOrderItemDetails(response)
        let iteCheck = false;
        response[0].OrderItemDetails.forEach(dataitem => {
          // console.log("loggingqtyreturned" + iteCheck)
          if ((response[0].OrderStatusId === 6 || response[0].OrderStatusId === 11) && dataitem.ValidityInMins > 0 && dataitem.qtyReturned === 0 && iteCheck === false) {
            setRefundAll(true)
          } else {
            iteCheck = true;
            setRefundAll(false)
          }
        })
        console.log("chkres..", response)
        console.log("chkstatus..", response[0].Status)
        localStorage.setItem('OrderStatus', window.btoa(response[0].Status))
        // setOrderstatus(response)
        // setpaymentmethod(response[0].PaymentMethodName)
        localStorage.setItem('OrderItemDetails', JSON.stringify(response))
        // if (response[0].Status === 'Completed') {
        //   // setenablebutton(true)
        // }
        CheckoutAPI.getcustomeraddress({})
          .then(res => {
            const data = res.filter(id => id.CustomerAddressId === response[0].BillingAddressId)
            setaddressdata(data)
          })
        // OrderdetailAPI.getmyorder(window.atob(localStorage.getItem('OrderStatus')))
        // .then(resp => {
        // })
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [])
  useEffect(() => {
    console.log('calledincancelorder')
    // setIsOrderCancelled(false)
    OrderdetailAPI.getmyorder(window.atob(localStorage.getItem('OrderNumber')))
      .then(response => {
        setOrderItemDetails(response)
        let iteCheck = false;
        response[0].OrderItemDetails.forEach(dataitem => {
          // console.log("loggingqtyreturned" + iteCheck)
          if ((response[0].OrderStatusId === 6 || response[0].OrderStatusId === 11) && dataitem.ValidityInMins > 0 && dataitem.qtyReturned === 0 && iteCheck === false) {
            setRefundAll(true)
          } else {
            iteCheck = true;
            setRefundAll(false)
          }
        })
        console.log("chkres..", response)
        console.log("chkstatus..", response[0].Status)
        localStorage.setItem('OrderStatus', window.btoa(response[0].Status))
        // setOrderstatus(response)
        // setpaymentmethod(response[0].PaymentMethodName)
        localStorage.setItem('OrderItemDetails', JSON.stringify(response))
        // if (response[0].Status === 'Completed') {
        //   // setenablebutton(true)
        // }
        CheckoutAPI.getcustomeraddress({})
          .then(res => {
            const data = res.filter(id => id.CustomerAddressId === response[0].BillingAddressId)
            setaddressdata(data)
          })
        // OrderdetailAPI.getmyorder(window.atob(localStorage.getItem('OrderStatus')))
        // .then(resp => {
        // })
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [isOrderCancelled])
  // useEffect(() => {
  //   (OrderItemDetails || []).forEach(data =>
  //     data.OrderItemDetails.forEach(dataitem => {
  //       if (data.OrderStatusId === 6 && dataitem.ValidityInMins > 0 && dataitem.qtyReturned === 0) {
  //         setRefundAll(true)
  //       } else {
  //         setRefundAll(false)
  //       }
  //     }
  //     ))
  // }, [OrderItemDetails])
  // console.log("refundAllcheck==", refundAll)
  // useEffect(() => {
  //   fetchorder()
  // }, [OrderReducer, clickcancelorder])
  // useEffect(() => {
  //   if (OrderReducer && OrderReducer.ordercancel === true && clickcancelorder === true) {
  //     // setstatuscancel(true)
  //     setOrderstatus(true)
  //     setordercancelmsg('Order cancelled successfully')
  //     setTimeout(() => {
  //       setOrderstatus(false)
  //     }, 3000);
  //     // toast('Order cancelled successfully')
  //     // window.atob(localStorage.setItem('OrderStatus', 'Cancelled'))
  //     localStorage.setItem('OrderStatus', window.btoa('Cancelled'))
  //     // if (window.btoa(localStorage.getItem('OrderStatus')) === 'Cancelled') {
  //     //   setcancelbutton(false)
  //     // }
  //     // window.btoa(localStorage.setItem('OrderStatus', 'Cancelled'))
  //     fetchorder()
  //   }
  // }, [OrderReducer && OrderReducer.ordercancel, clickcancelorder])
  // useEffect(() => {
  //   if (OrderReducer && OrderReducer.ordercancel === true && clickcancelorder === true) {
  //     setOrderstatus(true)
  //     setordercancelmsg('Order cancelled successfully')
  //   }
  // }, [OrderReducer && OrderReducer.ordercancel, clickcancelorder])
  // useEffect(() => {
  //   if (OrderReducer && OrderReducer.orderreview === true) {
  //     toast('Review submitted successfully')
  //     // setcancelbutton(false)
  //     fetchorder()
  //   }
  // }, [OrderReducer])
  // useEffect(() => {
  //   if ()
  // }, [])
  function formatDate(d) {
    const myDate = new Date(d);
    // let hrs = ((myDate.getHours() > 12) ? myDate.getHours() - 12 : myDate.getHours());
    // const amPM = ((myDate.getHours() >= 12) ? "PM" : "AM");
    // // setampm(amPM)
    // if (hrs === 0) hrs = 12;
    const twoDigitMinutes = myDate.toLocaleString("en-us", { hour: '2-digit', minute: '2-digit', });
    // const formattedDate = `${hrs}:${myDate.getMinutes('mm')} ${amPM}`;
    return twoDigitMinutes;
  }
  function dateConverter(createdon) {
    const date = new Date(createdon);
    const formattedDate = date.toLocaleDateString('en-us', {
      month: 'long', day: 'numeric', year: 'numeric'
    }).replace(/ /g, '  ');
    return formattedDate
  }
  // useEffect(() => {
  //  
  // }, [])
  // const loaddeliverfeedbackpopup = () => {
  //   dispatch(deliveryfeedbackpopup(true))
  // }
  // const orderreviewfeedbackpopup = () => {
  //   dispatch(feedbackpopups(true))
  //   // dispatch(getitems(itemobject))
  // }
  const productdetail = (PageUrl) => {
    history.push(`/product/${PageUrl}`, { skuUrl: PageUrl })
    localStorage.setItem('PageUrl', window.btoa(PageUrl))
  }
  const trackpackage = () => {
    const ordernumber = window.atob(localStorage.getItem('OrderNumber'))
    history.push(`/account/myorders/myorder-detail/${ordernumber}/trackorder`)
  }
  const ordercancel = () => {
    // setClickcancelorder(true)
    dispatch(ordercancelpopup(true))
    // setIsOrderCancelled(true)
  }
  // const returnOrder = (itemdetails) => {
  //   console.log("itemdetails==", itemdetails)
  //   setrefundone(true)
  //   dispatch(orderreturnpopup(true, itemdetails))
  // }
  // const returnOrderAll = () => {
  //   console.log("enter all refund All==")
  //   dispatch(orderreturnpopup(true))
  //   setrefundone(false)
  // }
  // // console.log(paymentmethod, OrderItemDetails.map(d => d.OrderItemDetails));
  // useEffect(() => {
  //   // const status = OrderItemDetails.map(d => d.OrderItemDetails)
  //   // console.log('status', status.map(f => f.map(g => g.OrderItemStatus)));
  //   setStatus(trackordeReducer && trackordeReducer.orderstatus[0].OrderStatus)
  // }, [trackordeReducer])
  // console.log('s', Status);
  // useEffect(() => {
  //   const formbody =
  //   {
  //     "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
  //     "ClientID": ConstantsValues.ClientId
  //   }
  //   dispatch(trackorder(formbody))
  // }, [])
  const deliveryfeedbackcall = () => {
    dispatch(deliverypopup(true))
    setClosebar(true)
  }
  const orderreviewcall = () => {
    dispatch(orderpopup(true))
    setCloseorder(true)
  }
  const orders = window.atob(localStorage.getItem('Status'))
  console.log("orderstatus..", orders)
  // const closemsg = () => {
  //   setOrderstatus(false)
  // }
  function returnOrderHandler(orderNum) {
    console.log(`heycalledhere${orderNum}`)
    localStorage.setItem('returnAll', "yes")
    // localStorage.setItem('orderNum', orderNum)
    history.push(`/account/myorders/return-order/${window.atob(localStorage.getItem('OrderNumber'))}`)
  }
  function returnOrderItemHandler(orderItemDet) {// console.log('getting called')
    if (localStorage.getItem('returnAll') && localStorage.getItem('returnAll') !== "") {
      localStorage.removeItem("returnAll");
    }
    localStorage.setItem('orderItemDetId', orderItemDet)
    history.push(`/account/myorders/return-order/${window.atob(localStorage.getItem('OrderNumber'))}`)
  }
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <Header />
      {/* {orderstatus && <Success msg={ordercancelmsg} close={closemsg} />} */}
      {/* {OrderReducer && OrderReducer.feedbackpopup && <DeliveryFeedback />} */}
      {/* {OrderReducer && OrderReducer.reviewpopup && <OrderReview />} */}
      {OrderReducer && OrderReducer.popupfeedback && <FeedbackDelivery closebar={closebar} setClosebar={setClosebar}
      />}
      {OrderReducer && OrderReducer.productorderpop && <DetailDelivery closeorder={closeorder} setCloseorder={setCloseorder} />}
      {OrderReducer && OrderReducer.popupcancel && <Cancelorder OrderItemDetails={OrderItemDetails} setIsOrderCancelled={setIsOrderCancelled} />}
      {/* {OrderReducer && OrderReducer.returnorderpopup && <Returnorder OrderItemDetails={OrderItemDetails} fetchorder={fetchorder} RefundAll={refundAll} refundone={refundone} />} */}
      <SubNavigation />
      <div className="shopping-cart-wrapper order-details pb-70">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <main id="primary" className="site-main newOrderbox">
                <div className="shopping-cart">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="cart-accordion-wrapper mt-full mt-40">
                        <div id="cart_accordion" className="mt-4" role="tablist">
                          <div className="card" style={{ marginBottom: '0px', borderBottom: '0px' }}>
                            <div className="card-header" role="tab" id="headingTax">
                              <h4 className="mb-0">
                                <span className="OrderDetails active">Order Details</span>
                              </h4>
                            </div>
                            <div className="card-header" role="tab" id="headingTax">
                              <h4 className="mb-0 orderbutton">
                                <span data-toggle="collapse" aria-expanded="true" aria-controls="OrderDetails" className="OrderDetails active">Order Details<i className="ion ion-ios-arrow-down"></i></span>
                              </h4>
                            </div>
                            <div id="OrderDetails" className="collapse show" role="tabpanel" aria-labelledby="headingTax" data-parent="#cart_accordion">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-lg-3 mb-2">
                                    <div className="product-item">
                                      {(OrderItemDetails || []).map(data =>
                                        <div className="product-caption">
                                          <ul>
                                            <li><strong>Order Number:&nbsp;</strong>{data.OrderNumber}</li>
                                            <li>
                                              <strong>Order Status:&nbsp;</strong>
                                              <span>{data.Status} </span>                                                                        </li>
                                            <li><strong>Order Date:  </strong> {dateConverter(data.CreatedOn)}</li>
                                            <li><strong>Sub Total:</strong>  ₹{data.PaymentAmount.toFixed(2)}     </li>
                                            <li>
                                              <strong>Delivery Charge:</strong> ₹{data.DeliveryChargeAmount.toFixed(2)}
                                            </li>
                                            <li>
                                              <strong>Delivery Date and Slot:</strong>
                                            </li>
                                            <li>
                                              <span className="thank-you-title pb-20"><span>
                                                {/* {dateConverter(data.DeliveryDate)} */}
                                                {localStorage.getItem('deliverydate')}
                                              </span> </span>
                                            </li>
                                            <li>
                                              <span className="thank-you-title pb-20"><span>(Between {formatDate(data.FromTime)}-{formatDate(data.ToTime)})</span> </span>
                                            </li>
                                            <li><strong>Total:</strong>  ₹{data.TotalOrderAmount.toFixed(2)}(Inc. of all taxes)</li>
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {(addressdata || []).map(data =>
                                    <div className="col-lg-3 mb-2">
                                      <div className="product-item">
                                        <div className="product-caption">
                                          <div className="product-name customer_address" data-id="32830" data-type="Shipping">
                                            <h3> Billing &amp; Delivery Address</h3>
                                            <div>{data.FirstName} {data.LastName}</div>
                                            <div>
                                              <span>{data.Address1}, {data.Address2}, </span>
                                              <span>{data.City}, {data.State}, {data.Country}, </span>
                                              <span>{data.ZipCode}</span>
                                            </div>
                                            <br />
                                            <span> Mobile: {data.Mobile}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {(OrderItemDetails || []).map(data =>
                                    <div className="col-lg-3 mb-2">
                                      <div className="product-item">
                                        <div className="product-caption">
                                          <div className="product-name">
                                            <input type="hidden" id="hdnPaymentMethodName" value="COD" />
                                            <input type="hidden" id="hdnWalletAmtUsed" value="0.00" />
                                            <input type="hidden" id="hdnPaymentTypes" value="COD" />
                                            <input type="hidden" id="hdnPaymentAmount" value="52.50" />
                                            <ul>
                                              <li>
                                                <h3>Payment Information</h3>
                                              </li>
                                              <li> <strong>Payment Method:&nbsp;</strong>{data.PaymentMethodName}</li>
                                              <li>
                                                <strong>Payment Amount: </strong>₹{data.TotalOrderAmount.toFixed(2)}
                                                <div className="d-lg-none"></div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {/* <div className="col-lg-3">
                                    <ul>
                                      <li> <button
                                        onClick={trackpackage}
                                        type="button" id="trackerorder" data-target="#Mymodal" data-toggle="modal" className="btn btn-info widthbutton">Track Package</button></li>&nbsp;
                                    </ul>
                                    {OrderItemDetails[0].Status === 'Completed'
                                      <button button type="button" id="deliveryreview" data-toggle="modal" data-backdrop="static" data-keyboard="false" className="btn btn-info widthbutton"
                                    onClick={loaddeliverfeedbackpopup}>Leave delivery feedback</button>
                                  <button
                                    // disabled={paymentmethod === 'COD'}
                                    id="orderreview" type="button" className="btn btn-info widthbutton"
                                    onClick={orderreviewfeedbackpopup}
                                  >Write an order review</button>
                                : null}
                                </div> */}
                                  <div className="col-lg-3 mb-2">
                                    {/* <ul>
                                      <li> 
                                        <button
                                        onClick={trackpackage}
                                        type="button" id="trackerorder" data-target="#Mymodal" data-toggle="modal" className="btn btn-secondary widthbutton">Track Package</button></li>&nbsp;
                                      {/* <li> <button
                                        type="button" id="deliveryreview" data-toggle="modal" data-backdrop="static" data-keyboard="false" className="btn btn-info widthbutton"
                                        onClick={loaddeliverfeedbackpopup}
                                      >Leave delivery feedback</button></li>&nbsp;
                                      <li> <button
                                        id="orderreview" type="button" className="btn btn-info widthbutton"
                                        onClick={orderreviewfeedbackpopup}
                                      >Write an order review</button></li> */}
                                    {/* </ul>  */}
                                    {/* {Status === 'Completed' ? */}
                                    {/* <ul> */}
                                    {/* <li> */}
                                    <button
                                      onClick={trackpackage}
                                      type="button" id="trackerorder" data-target="#Mymodal" data-toggle="modal" className="btn btn-info widthbutton" style={{ background: '#000000', width: 250 }}>Track Package</button>
                                    {/* </li>&nbsp; */}
                                    {/* </ul> */}
                                    {/* {window.atob(localStorage.getItem('OrderStatus')) === 'Completed ' ?
                                      <button
                                        // disabled={OrderItemDetails[0] && OrderItemDetails.OrderItemDetails[0].OrderItemStatus. === 'Completed'}
                                        type="button" id="deliveryreview" data-toggle="modal" data-backdrop="static" data-keyboard="false" className="btn btn-secondary widthbutton"
                                        onClick={loaddeliverfeedbackpopup}
                                      >Leave delivery feedback</button>
                                      : null}
                                    {window.atob(localStorage.getItem('OrderStatus')) === 'Completed ' ?
                                      <button
                                        // disabled={OrderItemDetails.Status !== 'Completed '}
                                        data-toggle="modal" data-backdrop="static" data-keyboard="false"
                                        id="orderreview" type="button" className="btn btn-secondary widthbutton"
                                        style={{ marginTop: 20 }}
                                        onClick={orderreviewfeedbackpopup}
                                      >Write an order review</button>
                                      : null} */}
                                    {/* {window.atob(localStorage.getItem('OrderStatus')) === 'Completed' ? */}
                                    {/* {response[0].Status === 'Completed' ? */}
                                    {/* {StatusValue === "Completed" ? */}
                                    <div>
                                      {/* {OrderItemDetails.map((item)=>{
                                        item.Status === "Completed " */}
                                      {console.log("valu..", OrderItemDetails)}
                                      {OrderItemDetails.length > 0 && (OrderItemDetails[0].Status.trim() === "Completed" || OrderItemDetails[0].Status.trim() === "Request for Refund" || OrderItemDetails[0].Status.trim() === "Partially Refunded" || OrderItemDetails[0].Status.trim() === "Refund In Process" || OrderItemDetails[0].Status.trim() === "Refunded") ?
                                        < div >
                                          <button
                                            onClick={deliveryfeedbackcall}
                                            type="button" id="deliverfeedback" data-target="#Mymodal" data-toggle="modal" className="btn btn-info widthbutton" style={{ marginTop: '10px', width: 250, background: '#ff7060' }}>Leave Delivered Feedback
                                          </button>
                                          <button
                                            onClick={orderreviewcall}
                                            type="button" id="orderreview" data-target="#Mymodal" data-toggle="modal" className="btn btn-info widthbutton" style={{ marginTop: '10px', width: 250, background: '#ff7060' }}>Write an Order Review
                                          </button>
                                        </div>
                                        : null
                                      }
                                      {/* <Modal isOpen={modalIsOpen}>
                                          <button onClick={setModalIsOpenToFalse}>x</button> */}
                                      {/* </Popup> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <Trackorder /> */}
                          <div className="OrderItemListHeader d-flex align-items-center justify-content-end my-2" style={{ marginLeft: '0px' }}>
                            {(window.atob(localStorage.getItem('OrderStatus')) === 'Awaiting Fullfillment') || (window.atob(localStorage.getItem('OrderStatus')) === 'Awaiting Shipment') || (window.atob(localStorage.getItem('OrderStatus')) === "Awaiting Payment") ?
                              <button type="button" id='submitCancelbtn'
                                // disabled={(window.atob(localStorage.getItem('OrderStatus')) === 'Cancelled')}
                                onClick={ordercancel}
                                className="btn btn-danger submitCancelAll mb-10">Cancel Order</button> :
                              null}
                            {/* {(window.atob(localStorage.getItem('OrderStatus')) === 'Completed') ?
                              <button type="button" data-reford-orderguid="25eee908-5a38-4a83-b3b1-3c7369fb4430" data-reford-ordernumber="OC8909" className="btn btn-success submitReturnAll">Return Order</button> : null} */}
                            {
                              refundAll ?
                                <div className='' style={{ marginRight: "15px" }}>
                                  <button id='returnOrderAll' type="button" className="btn btn-secondary" onClick={() => returnOrderHandler(OrderItemDetails.OrderNumber)}>Return Order</button></div> : null
                            }
                          </div>
                          <div className="card" style={{ marginBottom: '0px', borderTop: '0px' }}>
                            <div id="collapseProduct" role="tabpanel" aria-labelledby="headingTax" data-parent="#cart_accordion">
                              <div className="table-responsive newOrderinfo">
                                <table id="tblOrderDetail" className="table ">
                                  <thead>
                                    <tr style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                      <td>Product Image</td>
                                      <td className="textalignleft orderProductname">Product Name</td>
                                      <td>Pack Size</td>
                                      <td>Status</td>
                                      <td className="textalignright">Unit Price (₹)</td>
                                      <td>Quantity</td>
                                      <td>Qty Cancelled</td>
                                      <td>Qty Returned</td>
                                      <td className="textalignright">Total (₹)</td>
                                      <td className="textalignright">Action</td>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(OrderItemDetails || []).map(data =>
                                      data.OrderItemDetails && data.OrderItemDetails.map(dataitem =>
                                        <tr>
                                          <td>
                                            <input type="hidden" id="PaymentReferenceNumber" />
                                            <a href onClick={() => productdetail(dataitem.SkuLink)} style={{ cursor: 'pointer' }}>
                                              {/* <img src={dataitem.ListingImage} data-width="150" data-height="150" width="150" height="150" className="img-responsive js-lazy-img" alt="Cucumber Green/Kheera Hara/Kakdi Hari" title="" /> */}
                                              <Image src={dataitem.ListingImage} width="150" height="150" alt="Cucumber Green/Kheera Hara/Kakdi Hari" />

                                            </a>
                                          </td>
                                          <td className="textalignleft orderProductname" onClick={() => productdetail(dataitem.SkuLink)}>
                                            {dataitem.DisplayName}
                                          </td>
                                          <td><span style={{ display: 'none' }} className="moblbldsp">Pack Size : </span>{dataitem.ListItem}</td>
                                          <td>
                                            <span style={{ display: 'none' }} className="moblbldsp">Order Status : </span>{dataitem.OrderItemStatus}
                                          </td>
                                          <td className=' newOrderiteminfo'>
                                            <span style={{ display: 'none' }} className="moblbldsp">Unit Price : </span>₹{dataitem.UnitPrice.toFixed(2)}
                                          </td>
                                          <td>
                                            <span style={{ display: 'none' }} className="moblbldsp">Qty : </span>{dataitem.Quantity}
                                          </td>
                                          <td>
                                            <span style={{ display: 'none' }} className="moblbldsp">Qty Cancelled : </span>{dataitem.qtyCancelled}
                                          </td>
                                          <td>
                                            <span style={{ display: 'none' }} className="moblbldsp">Qty Returned : </span>{dataitem.qtyReturned}
                                          </td>
                                          <td className=' newOrderiteminfo'>
                                            <span style={{ display: 'none' }} className="moblbldsp ">Total Price : </span>₹{dataitem.Total.toFixed(2)}
                                          </td>
                                          <td>
                                            <span style={{ display: 'none' }} className="moblbldsp ">Action : </span>
                                            {
                                              ((data.OrderStatusId === 6 || data.OrderStatusId === 11) && dataitem.ValidityInMins > 0 && dataitem.qtyReturned === 0) ?
                                                <button onClick={() => returnOrderItemHandler(dataitem.OrderItemId)} id='returnOrder' type="button" className="btn btn-secondary" >Return</button>
                                                :
                                                null
                                            }
                                          </td>
                                        </tr>
                                      )
                                    )}
                                    <tr className='newOrderiteminfo' style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                      <td className="tdhide" colSpan="7"></td>
                                      <td colSpan="1" style={{ fontWeight: '600', color: '#111', }} className="textalignleft">
                                        Sub Total
                                      </td>
                                      <td colSpan="1" className="textalignright">
                                        ₹{OrderItemDetails.map(data => data.PaymentAmount.toFixed(2))}
                                      </td>
                                    </tr>
                                    <tr className='newOrderiteminfo' style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                      <td className="tdhide" colSpan="7"></td>
                                      <td colSpan="1" style={{ fontWeight: '600', color: '#111', }} className="textalignleft">
                                        Delivery Charge
                                      </td>
                                      <td colSpan="1" className="textalignright">
                                        ₹{OrderItemDetails.map(data => data.DeliveryChargeAmount.toFixed(2))}
                                      </td>
                                    </tr>
                                    <tr className='newOrderiteminfo' style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                      <td className="tdhide" colSpan="7"></td>
                                      <td colSpan="1" style={{ fontWeight: '600', color: '#111', }} className="textalignleft">
                                        Coupon Amount
                                      </td>
                                      <td colSpan="1" className="textalignright">
                                        (-) ₹{OrderItemDetails.map(data => data.CouponValue.toFixed(2))}
                                      </td>
                                    </tr>
                                    <tr className='newOrderiteminfo' style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                      <td className="tdhide" colSpan="7"></td>
                                      <td colSpan="1" style={{ fontWeight: '600', color: '#111', }} className="textalignleft">
                                        Total
                                      </td>
                                      <td colSpan="1" className="textalignright">
                                        ₹{OrderItemDetails.map(data => data.TotalOrderAmount.toFixed(2))}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="cart-button-wrapper d-flex justify-content-between mt-4" style={{ paddingBottom: '20px' }}> <Link to="/account/myorders" className="btn btn-secondary order-btn">← Back to My Order </Link> <Link to="/" className="btn btn-secondary order-btn"> Go to Shop </Link> </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div >
      </div >
      <Footer />
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  orderdeatails: makeSelectOrderdeatails(),
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(Orderdeatails);