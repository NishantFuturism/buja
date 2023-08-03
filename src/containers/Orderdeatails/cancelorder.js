/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
// import { toast, ToastContainer } from 'react-toastify';
import { ConstantsValues } from '../MainPage/api/homeServices';
import { ordercancelpopup } from './actions';
import OrderdetailAPI from '../MainPage/api/orderdetail';
export default function Cancelorder(props) {
  const dispatch = useDispatch()
  const [details, setdetails] = useState([])
  const [date, setdate] = useState('')
  const [reasonlist, setreasonlist] = useState([])
  const [payemntmethod, setpaymentmethod] = useState('')
  const [refundtext, setrefundtext] = useState('')
  const [refundmode, setrefundmode] = useState(0)
  const [error, seterror] = useState(false)
  const [error1, seterror1] = useState(false)
  const [msg, setmsg] = useState('')
  // const [statusid, setstatusid] = useState('')
  const OrderReducer = useSelector(state => state.orderdeatails)
  console.log("chkorderdetails..", OrderReducer)
  console.log("cancel orderprops..", props)
  const cancelpopup = () => {
    dispatch(ordercancelpopup(false))
  }
  useEffect(() => {
    if (localStorage.getItem('OrderItemDetails') !== undefined) {
      const data = localStorage.getItem('OrderItemDetails')
      // if (props && props.OrderItemDetails !== undefined) {
      setdetails(JSON.parse(data))
    }
    // }
  }, [localStorage.getItem('OrderItemDetails')])
  useEffect(() => {
    if (props && props.OrderItemDetails !== undefined) {
      props.OrderItemDetails.forEach(element => {
        setpaymentmethod(element.PaymentMethodName)
      })
    }
  }, [props])
  console.log("payemntmethod=", payemntmethod);
  useEffect(() => {
    if (payemntmethod === 'Wallet') {
      setrefundtext('Wallet')
      setrefundmode(2)
    } else if (payemntmethod === 'Netbanking') {
      setrefundtext('Bank')
      setrefundmode(1)
    } else {
      setrefundtext('Bank')
      setrefundmode(1)
    }
  }, [payemntmethod])
  useEffect(() => {
    getCurrentDate()
  }, [])
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
  function getCurrentDate() {
    const tempDate = new Date();
    const date = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
    const currDate = date;
    setdate(currDate)
  }
  const CancelOrder = () => {
    const comment = document.getElementById('orderCancelComment').value
    const cancalationvalue = document.getElementById('orderCancelReasonId').value
    if (document.getElementById('orderCancelComment').value === '' || cancalationvalue === '') {
      seterror(true)
      seterror1(true)
    } else {
      const formdata = {
        "OrderGuid": details[0].OrderGUID,
        "CustomerGuid": `${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`,
        "CurrencyName": ConstantsValues.currencyCode,
        "OrderStatusId": 7,
        "orderCancelReason": cancalationvalue,
        "orderCancelComment": comment,
        "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
        "IsCancelAll": true,
        "RefundMode": refundmode,
        "CurrencySymbol": '₹',
        "AdminEmail": "",
        "DateOfAction": date,
        "ModifiedBy": null,
        "EmailMessage": msg
      }
      // dispatch(confirmcanelorder(formdata))
      OrderdetailAPI.ordercanceled(formdata).then((rescancelorder) => {
        console.log("rescancelorder==", rescancelorder);
      })
      console.log("formdata..", formdata)
      dispatch(ordercancelpopup(false))
      setTimeout(() => {
        props.setIsOrderCancelled(true)
      }, 1500);
    }
  }
  const reason7 = reasonlist && reasonlist.filter(d => d.OrderStatusId === 7)
  console.log('reason7', reason7);
  useEffect(() => {
    if (OrderReducer && OrderReducer.cancel === true) {
      // toast('Order cancelled successfully')
    }
  }, [OrderReducer.cancel])
  function handlechange(EmailMessage) {
    setmsg(EmailMessage)
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
          <h2 className="modal-title-site text-center">Cancel</h2>
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={cancelpopup}> × </button>
        </div>
        <div className="modal-body">
          <h3 className="reviewtitle uppercase"></h3>
          <input id="OrderGuid_Id" type="hidden" data-val="true" data-val-required="The OrderGuidId field is required." name="OrderGuidId" value="91b63912-6a54-4e79-9a2b-2851ff63f503" />
          <input id="OrderNumberId" type="hidden" name="OrderNumber" value="OC5180" />
          <input id="IsCancelAllId" type="hidden" data-val="true" data-val-required="The IsCancelAll field is required." name="IsCancelAll" value="true" />
          <input id="qtyCancelledId" type="hidden" data-val="true" data-val-required="The qtyCancelled field is required." name="qtyCancelled" value="1" />
          <input id="RefundMode" type="hidden" data-val="true" data-val-required="The RefundMode field is required." name="RefundMode" value="2" />
          <div className="mb-10 form-group">
            <label className="requiredlbl">Reason</label><br />
            <select
              className="form-control valid" id="orderCancelReasonId" data-val="true" data-val-required="This field is required" name="orderCancelReason">
              {/* <option selected="selected" disabled="disabled"> ---Select Cancellation Reason---</option> */}
              {reason7 && reason7.map(data =>
                <option
                  onChange={() => handlechange(data.EmailMessage, data.OrderStatusId)}
                  value={data.OrderReasonId}>{data.Reasons} </option>)}
            </select>
            {error1 ?
              <span className="text text-danger field-validation-valid" data-valmsg-for="orderCancelReason" data-valmsg-replace="true"> Please enter order cancel reason</span> : null}
          </div>
          <div className="mb-10 form-group">
            <label htmlFor="orderCancelComment">Comment<span className="text-danger">*</span></label>
            <textarea type="text" rows="3" className="form-control input-validation-error" placeholder="Your comment" required="" id="orderCancelComment" name="orderCancelComment"></textarea>
            {error ?
              <span className="text text-danger field-validation-error" data-valmsg-for="orderCancelComment" data-valmsg-replace="true">Please enter comment </span> : null}
          </div>
          {payemntmethod === 'Netbanking' || payemntmethod === 'Wallet' ?
            <div className="mb-10 form-group" id="RefundModeDiv">
              <label className="">Refund Mode : <strong><span htmlFor="Bank" id="spanCancelMode"></span>
              </strong></label>
              <input type="text" id="orderCancelMode"
                value={refundtext}
                className="form-control" disabled />
            </div> : null}
          <button type="button" id=" submitCancelbtn"
            onClick={CancelOrder}
            className="btn btn-primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff', }}>Confirm</button>
          {/* </div>
      </div> */}
        </div >
      </Modal>
    </>
  )
}
