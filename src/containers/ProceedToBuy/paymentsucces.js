/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
// import { Stepper } from 'react-stepper-horizontal';
import brandlogo from '../../../assets1/img/icon/adibuja-logo.svg';
import history from '../../utils/history';
import PaymentAPI from '../MainPage/api/payment';
import 'react-toastify/dist/ReactToastify.css';
export function Paymentsucces(props) {
  console.log({ props });
  const [successdata, setsuccessdata] = useState([]);
  // const [amount, setamount] = useState([]);
  const [paymentdata, setpaymentdata] = useState([]);
  // const [fromtime, setfromtime] = useState('');
  // const [totime, settotime] = useState('');
  // const [day, setDay] = useState('')
  // const [currentdate, setCurrentdate] = useState('')
  const dataReducer = useSelector(state => state.proceedToBuy)
  useEffect(() => {
    // const slot = {
    //   "OrderNumber": credit.OrderId,
    //   "DeliverySlotDate": action.DeliverySlotDate,
    //   "DeliverySlotTimeId": action.DeliverySlotID,
    //   "InstructionForDeliverySlot": action.InstructionForDeliverySlot
    // }
    // const updateslot = yield call(PaymentAPI.updateDeliveryslotTime, slot)
    // console.log({ updateslot });
    // history.push('/product/checkout/order/paymentsuccess', { pamentsuccess: credit, totalamount: action.amount })
  }, [])
  // useEffect(() => {
  //   if (data.fromtime !== undefined) {
  //     setfromtime(data.fromtime)
  //     settotime(data.totime)
  //   }
  // }, [data])
  // useEffect(() => {
  //   getCurrentDate();
  // }, [])
  // function getCurrentDate() {
  //   const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //   const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //   const today = new Date();
  //   const Day = Days[today.getDay()]
  //   const date = `${today.getDate()} ${Months[today.getMonth()]} ${today.getFullYear()}`;
  //   const cDate = date;
  //   setCurrentdate(cDate)
  //   setDay(Day)
  // }
  useEffect(() => {
    if (dataReducer !== undefined) {
      setpaymentdata(dataReducer)
    }
  })
  // useEffect(() => {
  //   console.log({ dataReducer });
  //   const paymentdataf = localStorage.getItem('timeslotupdated')
  //   setsuccessdata(JSON.parse(paymentdataf))
  // }, [props])
  const vieworder = () => {
    history.push(`/account/myorders/myorder-detail/${window.atob(localStorage.getItem('OrderNumber'))}`)
  }
  // useEffect(() => {
  //   setamount(window.atob(localStorage.getItem('totalamount')));
  // })
  useEffect(() => {
    PaymentAPI.paymentdetailsbyorder(window.atob(localStorage.getItem('OrderNumber')))
      .then(response => {
        console.log('uuuuudetails', response)
        setsuccessdata(response)
      })
      .catch(error => {
        toast(error)
        console.log('error:::', error);
      });
  }, [])
  const loadorderdeatl = (OrderNumber) => {
    history.push(`/account/myorders/myorder-detail/${OrderNumber}`, { OrderNumber })
    localStorage.setItem('OrderNumber', window.btoa(OrderNumber))
    // localStorage.setItem('OrderStatus', window.btoa(OrderStatus))
  }
  const deliverypolicy = () => {
    localStorage.setItem('pagefootert', "delivery-policy-react")
    history.push('/subfooter')
  }
  console.log({ successdata, paymentdata });
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <div className="login-wrapper pb-35">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <main className="site-main" id="primary">
                <div className="user-login">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                      <div className="section-title text-center">
                        <p align="center" style={{ padding: '10px 0px' }}>
                          <Link to="/">
                            <img referrerPolicy='no-referrer' alt="brand-logo" src={brandlogo} style={{ paddingLeft: '23px' }} width="198px"
                              height="42px" />
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mainbodycontent thankyouContent">
                  <div className="login-wrapper pb-35">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-30">
                          <main id="primary" className="site-main">
                            <div className="user-login">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="login-form error-page text-center">
                                    <h2 className="thank-you-title pb-0"><i className="fa fa-check-circle fa-2x"
                                      style={{ color: 'green', marginBottom: '10px' }}></i> <br /> Your order has been placed successfully!</h2>
                                    <p style={{ paddingTop: '10px' }}> Save the details for future reference </p>
                                    <p className="bigfont" > Order Number: <a href onClick={() => loadorderdeatl(window.atob(localStorage.getItem('OrderNumber')))} ><span
                                      className="thank-you-title pb-20" style={{ color: 'Green', cursor: 'pointer' }}><span
                                      ></span>{window.atob(localStorage.getItem('OrderNumber'))} </span></a> <br /></p>
                                    <p className="bigfont">Delivery Date and Slot: <span className="thank-you-title pb-20">
                                      <span
                                        style={{ color: 'green' }}>
                                        {localStorage.getItem('deliverydate')} (Between {localStorage.getItem('delveryfrom')} - {localStorage.getItem('delveryrto')})</span>
                                    </span> </p>
                                    <p className="bigfont">Total Amount: <span className="thank-you-title pb-20"><span
                                      style={{ color: 'green' }}>₹{successdata && successdata.TotalOrderAmount}</span> </span></p>
                                    <p className="bigfont"> Payment Method: <span className="thank-you-title pb-20" style={{ color: 'green' }}> <span
                                    ></span>{successdata && successdata.PaymentMethod} </span></p>
                                    <hr />
                                    <p></p>
                                    <p className="text-center orderstatusButton">
                                      <Link to={`/account/myorders/myorder-detail/${window.atob(localStorage.getItem('OrderNumber'))}`}>
                                        <button type='button' className="btn-cart lg-btn btn-secondary ml-1" >
                                          <i className="fa fa-file-text-o" onClick={vieworder}>
                                          </i>&nbsp; View Order</button>
                                      </Link>
                                      <span className="spanthankyouspace"></span><Link to="/account/dashboard"><button
                                        className="btn-cart lg-btn btn-secondary ml-1"><i className="fa fa-user"> </i>&nbsp; Go to My
                                        Account</button></Link>
                                      <Link to="/"><button className="btn-cart lg-btn btn-secondary ml-1" ><i
                                        className="fa fa-shopping-cart"> </i>&nbsp; Continue Shopping</button></Link>
                                      <a href='tel:+91-7058702045'> <button className="btn-cart lg-btn btn-secondary ml-1"><i
                                        className="fa fa-phone"> </i>&nbsp; +91-7058702045</button></a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </main>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="checkout-steps checkout-steps container chkout_stps">
                  </div>
                </div>
                <div className="scroll-top not-visible"> <i className="fa fa-angle-up"></i> </div>
                <div style={{ textAlign: 'center' }} className="check_foot">
                  <form id="mc-form" noValidate="true">
                  </form>
                  <p align="center" style={{ paddingTop: '10px' }}>
                    <small>
                      {/* <Link to="/delivery-policy" target="_blank" style={{ color: 'dodgerblue' }}>Delivery Policy</Link>&nbsp; &nbsp; */}
                      <a href onClick={deliverypolicy} to="/subfooter" style={{ color: 'dodgerblue', cursor: 'pointer' }}>Delivery Policy</a>&nbsp;&nbsp;
                      <Link to="/faq" target="_blank" style={{ color: 'dodgerblue' }}>Help</Link>
                    </small>
                  </p>
                  <div>
                    <p align="center" style={{ paddingTop: '0px' }}><small>2023 © Adibuja Private Limited, All Rights
                      Reserved</small></p>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
export default Paymentsucces
