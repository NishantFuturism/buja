/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
// import { toast, ToastContainer } from 'react-toastify';
import { ConstantsValues } from '../MainPage/api/homeServices';
import { orderreturnpopup, } from './actions';
import OrderdetailAPI from '../MainPage/api/orderdetail';
export default function Returnorder(props) {
  console.log("return props===", props);
  const dispatch = useDispatch()
  const [details, setdetails] = useState([])
  // const [date, setdate] = useState('')
  const [reasonlist, setreasonlist] = useState([])
  const [payemntmethod, setpaymentmethod] = useState('')
  const [refundtext, setrefundtext] = useState('')
  const [refundmode, setrefundmode] = useState(0)
  const [error, seterror] = useState(false)
  const [error1, seterror1] = useState(false)
  // const [msg, setmsg] = useState('')
  // const [statusid, setstatusid] = useState('')
  const OrderReducer = useSelector(state => state.orderdeatails)
  console.log("chkorderdetails..", OrderReducer);
  const closeReturnpopup = () => {
    dispatch(orderreturnpopup(false))
  }
  useEffect(() => {
    const data = localStorage.getItem('OrderItemDetails')
    // if (props && props.OrderItemDetails !== undefined) {
    setdetails(JSON.parse(data))
    // }
  }, [])
  useEffect(() => {
    // if (props && props.OrderItemDetails !== undefined) {
    setpaymentmethod(details.PaymentMethodName)
    // }
  }, [])
  useEffect(() => {
    if (payemntmethod === 'COD' || payemntmethod === 'cod') {
      setrefundtext('Wallet')
      setrefundmode(2)
    } else if (payemntmethod === 'Card' || payemntmethod === 'card') {
      setrefundtext('Bank')
      setrefundmode(1)
    } else {
      setrefundtext('Bank')
      setrefundmode(1)
    }
  }, [])
  // useEffect(() => {
  //   getCurrentDate()
  // }, [])
  useEffect(() => {
    // dispatch(getordercancelreasonlist())
    OrderdetailAPI.cancelreasonlist({})
      .then(response => {
        console.log('gha', response);
        setreasonlist(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [OrderReducer])
  // function getCurrentDate() {
  //   const tempDate = new Date();
  //   const date = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
  //   const currDate = date;
  //   // setdate(currDate)
  // }
  const ReturnOrder = () => {
    if (props && props.RefundAll === true && props.refundone === false) {
      const comment = document.getElementById('orderReturnComment').value
      const orderReturnvalue = document.getElementById('orderReturnReasonId').value
      const orderItemValue = document.getElementById('orderItemCondition').value
      if (document.getElementById('orderReturnComment').value === '' || orderReturnvalue === '') {
        seterror(true)
        seterror1(true)
      } else {
        const formdata = {
          "OrderGuid": details && details[0].OrderGUID,
          "CustomerGuid": `${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`,
          "CurrencyName": ConstantsValues.currencyCode,
          "OrderStatusId": 11,
          "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
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
      }
    } else {
      const comment = document.getElementById('orderReturnComment').value
      const qtyvalue = document.getElementById('Qty_Id').value
      const orderReturnvalue = document.getElementById('orderReturnReasonId').value
      const orderItemValue = document.getElementById('orderItemCondition').value
      if (document.getElementById('orderReturnComment').value === '' || orderReturnvalue === '') {
        seterror(true)
        seterror1(true)
      } else {
        const formdata = {
          "OrderGuid": details && details[0].OrderGUID,
          "CustomerGuid": `${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`,
          "CurrencyName": ConstantsValues.currencyCode,
          "OrderStatusId": 11,
          "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
          "CurrencySymbol": '₹',
          "AdminEmail": "",
          "OrderItemId": OrderReducer && OrderReducer.returnOrderDetails.OrderItemId,
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
      }
      dispatch(orderreturnpopup(false))
    }
  }
  const reason11 = reasonlist && reasonlist.filter(d => d.OrderStatusId === 11)
  console.log('reason11', reason11);
  useEffect(() => {
    if (OrderReducer && OrderReducer.cancel === true) {
      // toast('Order cancelled successfully')
    }
  }, [OrderReducer.cancel])
  function handlechange() {
    // setmsg(EmailMessage)
    // setstatusid(id)
  }
  console.log('orderreducser', OrderReducer);
  return (
    <>
      {/* <div className="modal-dialog"> */}
      {/* <div className="modal-content"> */}
      {/* <ToastContainer /> */}
      <Modal show animation style={{ transition: 'all 0.55s ease-in -out' }}>
        <div className="modal-header">
          <h3 className="modal-title-site text-center">Retrun Order</h3>
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={closeReturnpopup}> × </button>
        </div>
        <div className="modal-body">
          <h3 className="reviewtitle uppercase"></h3>
          {
            props && props.RefundAll && props.refundone === false ? null : <label className="requiredlbl">Qty</label>
          }
          {
            props && props.RefundAll && props.refundone === false ?
              null :
              <input id="Qty_Id" type="number" className='form-control' data-val="true" data-val-required="The Qty field is required." name="Qty_Name" value={OrderReducer.returnOrderDetails.Quantity} />
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
                  onChange={() => handlechange(data.EmailMessage, data.OrderStatusId)}
                  value={data.OrderReasonId}>{data.Reasons} </option>)}
            </select>
            {error1 ?
              <span className="text text-danger field-validation-valid" data-valmsg-for="orderCancelReason" data-valmsg-replace="true"> Please enter order return reason</span> : null}
          </div>
          <div className="mb-10 form-group">
            <label className="requiredlbl">Item Condition</label><br />
            <select
              className="form-control valid" id="orderItemCondition" data-val="true" data-val-required="This field is required" name="orderCancelReason">
              <option value={1}>Open</option>
              <option value={2}>Closed</option>
              <option value={2}>Damaged</option>
            </select>
            {error1 ?
              <span className="text text-danger field-validation-valid" data-valmsg-for="orderCancelReason" data-valmsg-replace="true"> Please enter item condition</span> : null}
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
            onClick={ReturnOrder}
            className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff', }}>Confirm</button>
          {/* </div>
      </div> */}
        </div >
      </Modal>
    </>
  )
}
