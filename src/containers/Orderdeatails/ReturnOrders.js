/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ConstantsValues } from '../MainPage/api/homeServices';
// import { orderreturnpopup, } from './actions';
// import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import history from '../../utils/history';
import SubNavigation from '../../components/SubNavigation';
import Footer from '../../components/Footer';
import OrderdetailAPI from '../MainPage/api/orderdetail';
export default function ReturnOrders() {
  const [orderItemDetails, setOrderItemDetails] = useState();
  const [orderStatus, setOrderstatus] = useState();
  const [refundmode, setrefundmode] = useState(0)
  const [refundAll, setRefundAll] = useState(false)
  // const [payemntmethod, setpaymentmethod] = useState('')
  const [reasonlist, setreasonlist] = useState([])
  const [error, seterror] = useState(false)
  const [singleItemReturnId, setSingleItemReturnId] = useState();
  const [error1, seterror1] = useState(false)
  const [refundtext, setrefundtext] = useState('')
  const reason11 = reasonlist && reasonlist.filter(d => d.OrderStatusId === 11)
  useEffect(() => {
    console.log(`hey${error1}${orderStatus}`)
    console.log("calledorderdetails")
    if (localStorage.getItem('returnAll') && localStorage.getItem('returnAll') === "yes") {
      setRefundAll(true);
    }
    OrderdetailAPI.getmyorder(window.atob(localStorage.getItem('OrderNumber')))
      .then(response => {
        setOrderItemDetails(response[0])
        // console.log("chkres..", response)
        // console.log("chkstatus..", response[0].Status)
        localStorage.setItem('OrderStatus', window.btoa(response[0].Status))
        setOrderstatus(response[0].Status)
        // setpaymentmethod(response[0].PaymentMethodName)
        localStorage.setItem('OrderItemDetails', JSON.stringify(response[0]))
        if (response[0].PaymentMethodName === 'COD' || response[0].PaymentMethodName === 'cod') {
          setrefundtext('Wallet')
          setrefundmode(2)
        } else if (response[0].PaymentMethodName === 'Card' || response[0].PaymentMethodName === 'card') {
          setrefundtext('Bank')
          setrefundmode(1)
        } else {
          setrefundtext('Bank')
          setrefundmode(1)
        }
        /* response[0].OrderItemDetails.forEach(dataitem => {
          if ((response[0].OrderStatusId === 6 || response[0].OrderStatusId === 11) && dataitem.ValidityInMins > 0 && dataitem.qtyReturned === 0) {
            setRefundAll(true)
          } else {
            setRefundAll(false)
            return
          }
        }) */
        response[0].OrderItemDetails.forEach(dataitem => {
          // console.log('intheorderitemdetails' + dataitem.OrderItemId)
          if (dataitem.OrderItemId === localStorage.getItem('orderItemDetId')) {
            console.log(`orderitemdi${dataitem.OrderItemId}`)
            setSingleItemReturnId(dataitem.Quantity)
            // setRefundAll(true)
          }
        })
      })
      .catch(error => {
        console.log('error:::', error);
      });
    OrderdetailAPI.cancelreasonlist({})
      .then(response => {
        console.log('gha', response);
        setreasonlist(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [])
  const ReturnOrderHandler = () => {
    if (localStorage.getItem('returnAll') && localStorage.getItem('returnAll') === "yes") {
      const comment = document.getElementById('orderReturnComment').value
      const orderReturnvalue = document.getElementById('orderReturnReasonId').value
      const orderItemValue = document.getElementById('orderItemCondition').value
      if (comment === '') {
        seterror(true)
        seterror1(true)
      } else {
        seterror(false)
        seterror1(false)
        const formdata = {
          "OrderGuid": orderItemDetails && orderItemDetails.OrderGUID,
          "CustomerGuid": `${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`,
          "CurrencyName": ConstantsValues.currencyCode,
          "OrderStatusId": 11,
          "OrderNumber": orderItemDetails && orderItemDetails.OrderNumber,
          "CurrencySymbol": '₹',
          "AdminEmail": "",
          "OrderItemId": 0,
          "ItemCondition": orderItemValue,
          "refundExchange": 0,
          "RefundMode": refundmode,
          "IsRefundAll": true,
          "qtyReturned": 1,
          "orderReturnReason": orderReturnvalue,
          "orderReturnComment": comment
        }
        console.log("formdata..", formdata)
        OrderdetailAPI.orderReturn(formdata).then((resreturnorder) => {
          console.log("resreturnorder==", resreturnorder);
        })
        localStorage.removeItem("returnAll");
        toast('Request for Order Return has been successfully submitted')
        setTimeout(() => {
          history.push(`/account/myorders/myorder-detail/${orderItemDetails.OrderNumber}`)
        }, 4000)
      }
    } else {
      const comment = document.getElementById('orderReturnComment').value;
      const qtyvalue = document.getElementById('Qty_Id').value;
      const orderReturnvalue = document.getElementById('orderReturnReasonId').value;
      const orderItemValue = document.getElementById('orderItemCondition').value;
      console.log(`commentlog${comment}`);
      if (comment === '') {
        seterror(true)
        seterror1(true)
      } else {
        seterror(false)
        seterror1(false)
        const formdata = {
          "OrderGuid": orderItemDetails && orderItemDetails.OrderGUID,
          "CustomerGuid": `${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`,
          "CurrencyName": ConstantsValues.currencyCode,
          "OrderStatusId": 11,
          "OrderNumber": orderItemDetails && orderItemDetails.OrderNumber,
          "CurrencySymbol": '₹',
          "AdminEmail": "",
          "OrderItemId": localStorage.getItem('orderItemDetId'),
          "ItemCondition": orderItemValue,
          "refundExchange": 0,
          "RefundMode": refundmode,
          "IsRefundAll": false,
          "qtyReturned": qtyvalue,
          "orderReturnReason": orderReturnvalue,
          "orderReturnComment": comment
        }
        console.log("formdata..", formdata)
        OrderdetailAPI.orderReturn(formdata).then((resreturnorder) => {
          console.log("resreturnorder==", resreturnorder);
        })
        toast('Request for Return has been successfully submitted')
        setTimeout(() => {
          history.push(`/account/myorders/myorder-detail/${orderItemDetails.OrderNumber}`)
        }, 4000)
      }
    }
    // dispatch(orderreturnpopup(false))
  }
  return (
    <>
      <ToastContainer
        position="top-right"
      />
      <Header />
      <div className="shopping-cart-wrapper order-details pb-70">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <main id="primary" className="site-main">
                <div className="shopping-cart">
                  <div className="modal-body">
                    <h3 className="reviewtitle uppercase"></h3>
                    {
                      refundAll === true ? null : <label className="requiredlbl">Qty</label>
                    }
                    {
                      refundAll === true ?
                        null :
                        <input id="Qty_Id" type="number" className='form-control' data-val="true" data-val-required="The Qty field is required." name="Qty_Name" value={singleItemReturnId} />
                    }
                    {/* <label className="requiredlbl">Qty</label>
          <input id="Qty_Id" type="text" className='form-control' data-val="true" data-val-required="The Qty field is required." name="Qty_Name" value={OrderReducer.returnOrderDetails.Quantity} /> */}
                    <div className="mb-10 form-group">
                      <label className="requiredlbl">Reason</label><br />
                      <select
                        className="form-control valid" id="orderReturnReasonId" data-val="true" data-val-required="This field is required" name="orderReturnReason">
                        {/* <option selected="selected" disabled="disabled"> ---Select Cancellation Reason---</option> */}
                        {reason11 && reason11.map(data =>
                          <option
                            // onChange={() => handlechange(data.EmailMessage, data.OrderStatusId)}
                            value={data.OrderReasonId}>{data.Reasons} </option>)}
                      </select>
                      {/* error1 ?
                        <span className="text text-danger field-validation-valid" data-valmsg-for="orderCancelReason" data-valmsg-replace="true"> Please enter order return reason</span> : null */}
                    </div>
                    <div className="mb-10 form-group">
                      <label className="requiredlbl">Item Condition</label><br />
                      <select
                        className="form-control valid" id="orderItemCondition" data-val="true" data-val-required="This field is required" name="orderCancelReason">
                        <option value={1}>Open</option>
                        <option value={2}>Closed</option>
                        <option value={2}>Damaged</option>
                      </select>
                      {/* error1 ?
                        <span className="text text-danger field-validation-valid" data-valmsg-for="orderCancelReason" data-valmsg-replace="true"> Please enter item condition</span> : null */}
                    </div>
                    <div className="mb-10 form-group">
                      <label htmlFor="orderReturnComment">Comment<span className="text-danger">*</span></label>
                      <textarea type="text" rows="3" className="form-control input-validation-error" placeholder="Your comment" required="" id="orderReturnComment" name="orderReturnComment"></textarea>
                      {error ?
                        <span className="text text-danger field-validation-error" data-valmsg-for="orderReturnComment" data-valmsg-replace="true">Please enter comment </span> : null}
                    </div>
                    {
                      <div className="mb-10 form-group" id="RefundModeDiv">
                        <label className="">Refund Mode : <strong><span htmlFor="Bank" id="spanCancelMode"></span>
                        </strong></label>
                        <input type="text" id="orderCancelMode"
                          value={refundtext}
                          className="form-control" disabled />
                      </div>}
                    <button type="button" id=" submitCancelbtn"
                      onClick={ReturnOrderHandler}
                      className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff', }}>Confirm</button>
                    <div className="cart-button-wrapper d-flex justify-content-between mt-4"> <Link to={`/account/myorders/myorder-detail/${window.atob(localStorage.getItem('OrderNumber'))}`} className="btn btn-secondary order-btn">← Back to My Order </Link> </div>
                    {/* </div>
      </div> */}
                  </div >
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <SubNavigation />
      <Footer />
    </>
  )
}
