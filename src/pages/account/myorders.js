import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
// import SubNavigation from '../../components/SubNavigation';
// import history from '../../utils/history';
import { useRouter } from 'next/router';

import OrderdetailAPI from '../../containers/MainPage/api/orderdetail';
// import { ordercancelpopup } from '../Orderdeatails/actions';
import BreadCrumb from '../../containers/MyAccount/myAccountBreadcrumb';
// import Cancelorder from '../Orderdeatails/cancelorder';
import MyAccountSideNav from '../../containers/MyAccount/MyAccountSideNav';
import 'react-toastify/dist/ReactToastify.css';
// import logoanimation from '/images/adibuja-logo-animation.gif';
import Image from 'next/image'

// import Success from '../../components/ShowAlert/success';
export function MyOrders() {
  // const dispatch = useDispatch()
  const [loading, setloading] = useState(false);
  const [orderlist, setorderlist] = useState([]);
  const [isUserLogin, setIsUserLogin] = useState();
  const [CustGUID,setCustGUID] = useState('');
  
  const router = useRouter();

  console.log('isUserLogin--', isUserLogin)
  // const [clickcancelorder, setClickcancelorder] = useState(false)
  // const [orderstatus, setOrderstatus] = useState(false)
  // const [ordercancelmsg, setordercancelmsg] = useState('')
  // const OrderReducer = useSelector(state => state.orderdeatails)
  // const [OrderItemDetails, setOrderItemDetails] = useState([])
  // function fetchorder() {
  //   OrderdetailAPI.getmyorder(window.atob(localStorage.getItem('OrderNumber')))
  //     .then(response => {
  //       setOrderItemDetails(response)
  //       console.log("chkres..", response)
  //     })
  //     .catch(error => {
  //       console.log('error:::', error);
  //     });
  // }
  // const [list,setList]=useState([])
  // const [searchvalue, setsearchvalue] = useState('');
  // const [cancelpopup, setcancelpopupop] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
    // setufirstname(window.atob(localStorage.getItem('UserFirstName')))
    // setlastnamw(window.atob(localStorage.getItem('UserLastName')))
    // setphone(localStorage.getItem('UserLastPhone'))
    console.log(`47--${window.atob(localStorage.getItem('CustGUID'))}`)
    // console.log(`48--${ localStorage.hasOwnProperty('CustGUID')}`)
    if (Object.prototype.hasOwnProperty.call(localStorage, 'CustGUID')) {
      if (window.atob(localStorage.getItem('CustGUID')) !== null || window.atob(localStorage.getItem('CustGUID')) !== undefined || window.atob(localStorage.getItem('CustGUID')) !== '00000000-0000-0000-0000-000000000000') {
        console.log('51')
        setIsUserLogin(true)
      } else {
        console.log('54')
        setIsUserLogin(false)
      }
    }
    else {
      setIsUserLogin(false)
    }
}
  }, [isUserLogin])
  useEffect(() => {
    fetchorder()
  }, [])
  function dateConverter(createdon) {
    const date = new Date(createdon);
    const formattedDate = date.toLocaleDateString('en-us', {
      month: 'long', day: 'numeric', year: 'numeric'
    }).replace(/ /g, '  ');
    return formattedDate
  }
  function fetchorder() {
    setloading(true)
    OrderdetailAPI.getorderlisting({})
      .then(response => {
        setloading(false)
        setorderlist(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }
  useEffect(() => {
    dateConverter()
  })
  // useEffect(() => {
  //   handlechange()
  // }, [orderlist])
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
  // const ordercancel = () => {
  //   setClickcancelorder(true)
  //   dispatch(ordercancelpopup(true))
  // }
  const loadorderdeatl = (OrderNumber, OrderStatus) => {
    console.log("OrderStatus", OrderStatus);
    // router.push(`/account/myorders/myorder-detail/${OrderNumber}`, { OrderNumber })
    router.push(
      {
        pathname: `/account/myorders/myorder-detail/${OrderNumber}`, // not router.asPath
        OrderNumber: OrderNumber,
      })
    localStorage.setItem('OrderNumber', window.btoa(OrderNumber))
    localStorage.setItem('OrderStatus', window.btoa(OrderStatus))
  }
  // const makepayment = (OrderNumber) => {
  //   history.push('/account/myorders/orderpayment', { OrderNumber })
  // }
  const handlechange = (e) => {
    // setsearchvalue(e.target.value)
    const { value } = e.target
    if (value.length === 0) {
      OrderdetailAPI.getorderlisting({})
        .then(response => {
          setloading(false)
          setorderlist(response)
        })
        .catch(error => {
          console.log('error:::', error);
        });
    }
    // setorderlist(e.target.value)
    const filtered = orderlist.filter(orderid => orderid.OrderNumber.toLowerCase().includes(value.toLowerCase()))
    // const filtered = orderlist.filter(orderid => orderid.OrderNumber === `${e.target.value}`);
    setorderlist(filtered)
    // fetchorder()
  }
  useEffect(() => {
  }, [])
  // const trackpackage = (Status, OrderNumber) => {
  //   localStorage.setItem('OrderStatus', window.btoa(Status))
  //   history.push(`/account/myorders/myorder-detail/${OrderNumber}/trackorder`)
  // }
  // const ordercancel = () => {
  //   setcancelpopupop(true)
  // }
  // const closemsg = () => {
  //   setOrderstatus(false)
  // }
  return (
    <>
      {
        (isUserLogin === false)
          ?
          router.push({ pathname: '/login', })
          :
          <div>
            {/* {orderstatus && <Success msg={ordercancelmsg} close={closemsg} />} */}
            <ToastContainer
              position="top-right"
            // draggable={true}
            // autoClose={50000}
            />
            <Header />
            <BreadCrumb myAccount="My Account" activepage="My Order" />
            {/* <SubNavigation /> */}
            {/* {cancelpopup === true ? <Cancelorder /> : null} */}
            <div className="my-account-wrapper pb-20" >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <main id="primary" className="site-main">
                      <div className="user-dashboard">
                        <div className="main-dashboard">
                          <div className="row">
                            <MyAccountSideNav />
                            <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                              <div className="tab-content dashboard-content" id="profile">
                                <div className="row" style={{ borderBottom: '1px solid #ebebeb', lineHeight: '24px', marginBottom: '20px', paddingBottom: '15px' }}>
                                  <div className="col-6 col-sm-6 col-md-6 col-lg-6 myorderdiv" style={{ fontSize: '24px', color: 'black' }} >My Order</div>
                                  <div className="col-6 col-sm-6 col-md-6 col-lg-6" style={{ textAlign: 'right' }}>
                                    <input type="text"
                                      onChange={(e) => handlechange(e)}
                                      id="searchOrder" placeholder="Search Order ID.." title="Type in Order ID" /><span className="lnr lnr-magnifier" style={{ fontSize: '18px', color: 'black', marginLeft: '-22px' }}></span></div>
                                </div>
                                {/* <i
                            style={{ alignSelf: 'center' }}
                            className="fa fa-spin fa-spinner fa-2x"></i> */}
                                <div className="row">
                                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="table-responsive">
                                      {loading === true ?
                                        // change css
                                        <div className='row'>
                                          <div className='col-lg-12 text-center mt-25 mb-25' >
                                            <Image src={"/images/adibuja-logo-animation.gif"} width="80" height="80" alt='' objectPosition={'center'} />
                                            {/* <Image src="/me.png" alt="me" width="64" height="64" /> */}
                                            {/* <i
                                        style={{ justifySelf: 'center' }}
                                        className="fa fa-spin fa-spinner fa-4x"></i> */}
                                          </div>
                                        </div>
                                        :
                                        <table className="table" id="order-list">
                                          <thead>
                                            <tr>
                                              <th>Order ID</th>
                                              <th id="orderamt">Order Placed</th>
                                              <th id="orderamt">Status</th>
                                              <th id="orderamt">Total</th>
                                              <th>Actions</th>
                                            </tr>
                                          </thead>
                                          {orderlist.length ?
                                            <tbody>
                                              {(orderlist || []).map(data =>
                                                <tr>
                                                  <td>{data.OrderNumber}</td>
                                                  <td id="orderamt">{dateConverter(data.CreatedOn)}</td>
                                                  <td id="orderamt">{data.Status}</td>
                                                  <td id="orderamt">₹{data.TotalOrderAmount.toFixed(2)}</td>
                                                  <td >
                                                    {/* {(window.atob(localStorage.getItem('OrderStatus')) === 'Awaiting Fullfillment') ?
                                                <button type="button" id='submitCancelbtn'
                                                  // disabled={(window.atob(localStorage.getItem('OrderStatus')) === 'Cancelled')}
                                                  onClick={ordercancel}
                                                  className="btn btn-danger submitCancelAll mb-10">Cancel Order</button> : */}
                                                    <button type='button' id="orderviewbutton"
                                                      className="btn btn-success submitCancelAll"
                                                      style={{ background: '#28a745 !important' }}
                                                      onClick={() => loadorderdeatl(data.OrderNumber, data.Status)}
                                                    >View</button>
                                                    {/* } */}
                                                    {/* <button
                                                  onClick={() => trackpackage(data.Status, data.OrderNumber)}
                                                  style={{ marginLeft: 10 }}
                                                  type="button" id="trackerorder" className="btn 
                                                  btn-secondary widthbutton">Track</button> */}
                                                    {/* <button type="button"
                                                  onClick={ordercancel}
                                                  style={{ marginLeft: 10 }}
                                                  className="btn btn-success submitCancelAll">Cancel</button> */}
                                                    {/* {(data.PaymentTypes === 'COD' && data.Status !== 'Cancelled' && data.Status !== 'Completed') ?
                                                <button type='button' className="btn btn-secondary btn-sm ohbtn"
                                                  onClick={() => makepayment(data.OrderNumber)}
                                                  style={{ marginLeft: 5 }}>Make Payment </button> : null} */}
                                                  </td>
                                                </tr>
                                              )}
                                            </tbody>
                                            : <tbody>
                                              <tr>
                                                <td colSpan="5">
                                                  <center>No Current Orders</center>
                                                </td>
                                              </tr>
                                              <tr className="noorders" style={{ display: 'none' }}>
                                                <td>
                                                  <center>Sorry, no result found</center>
                                                </td>
                                              </tr>
                                            </tbody>
                                          }
                                        </table>}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            </div >
            <Footer />
          </div>
      }
    </>
  )
}
export default MyOrders
