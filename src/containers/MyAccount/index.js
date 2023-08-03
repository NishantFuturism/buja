/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/**
 *
 * MyAccount
 *
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header';
// import SubNavigation from '../../components/SubNavigation';
import OrderdetailAPI from '../MainPage/api/orderdetail';
import MyAccountSideNav from './MyAccountSideNav';
import reducer from './reducer';
import saga from './saga';
////import history from '../../utils/history';
import PaymentAPI from '../MainPage/api/payment';
import BreadCrumb from './myAccountBreadcrumb';
import 'react-toastify/dist/ReactToastify.css';
export function MyAccount() {
  useInjectReducer({ key: 'myAccount', reducer });
  useInjectSaga({ key: 'myAccount', saga });
  // const [firstname, setufirstname] = useState('');
  const [username, setusername] = useState('');
  // const [lastnamw, setlastnamw] = useState('');
  const [userdetail, setuserdetail] = useState([]);
  // const [phone, setphone] = useState('');
  const [orderlist, setorderlist] = useState(false)
  // const userdata = JSON.parse(data)
  // const user = localStorage.getItem('User')
  // const userdetail = JSON.parse(user)
  const [isUserLogin, setIsUserLogin] = useState()
  console.log('isUserLogin--', isUserLogin)
  useEffect(() => {
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
  }, [isUserLogin])
  useEffect(() => {
    // setufirstname(window.atob(localStorage.getItem('UserFirstName')))
    // setlastnamw(window.atob(localStorage.getItem('UserLastName')))
    // setphone(localStorage.getItem('UserLastPhone'))
  }, [])
  useEffect(() => {
    if (userdetail && userdetail.Mobile === null) {
      setusername(userdetail.Email)
    } else {
      setusername(userdetail && userdetail.Mobile)
    }
  }, [userdetail])
  useEffect(() => {
    // alert('61' + isUserLogin)
    console.log(`63--${isUserLogin}`)
    if (isUserLogin === true) {
      console.log(`71--${isUserLogin}`)
      fetchcustomerdata()
      OrderdetailAPI.recentorders({})
        .then(response => {
          setorderlist(response)
        })
        .catch(error => {
          console.log('error:::', error);
        });
    }
  }, [isUserLogin])
  function fetchcustomerdata() {
    PaymentAPI.getcustomerwalletbalance({})
      .then(response => {
        console.log('uuuuu', response)
        setuserdetail(response)
      })
      .catch(rror => {
        console.log('error:::', rror);
      });
  }
  function dateConverter(createdon) {
    const date = new Date(createdon);
    const formattedDate = date.toLocaleDateString('en-us', {
      month: 'long', day: 'numeric', year: 'numeric'
    }).replace(/ /g, '  ');
    return formattedDate
  }
  const loadorderdeatl = (OrderNumber) => {
    history.push(`/account/myorders/myorder-detail/${OrderNumber}`, { OrderNumber })
    localStorage.setItem('OrderNumber', window.btoa(OrderNumber))
    // localStorage.setItem('OrderStatus', window.btoa(OrderStatus))
  }
  return (
    <>
      {
        // (isUserLogin === true || isUserLogin !== null || isUserLogin !== undefined)
        (isUserLogin === false)
          ?
          history.push({ pathname: '/login', })
          :
          <div className='myAccountdashboard'>
            <ToastContainer
              position="top-right"
            // draggable={true}
            // autoClose={50000}
            />
            <Header />
            <BreadCrumb myAccount="My Account" activepage="Dashboard" />
            {/* <SubNavigation /> */}
            <div className="my-account-wrapper pb-20">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <main id="primary" className="site-main">
                      <div className="user-dashboard">
                        <div className="main-dashboard">
                          <div className="row">
                            <MyAccountSideNav />
                            <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                              <div className="tab-content dashboard-content">
                                <div id="dashboard" className="tab-pane fade show active">
                                  <h3>Dashboard </h3>
                                  <div className="row">
                                    <div className="col-sm-12 col-md-6 col-lg-6 profile" id="profilesummary">    <div className="card border-primry mb-3">
                                      <div className="card-body text-primary dash-height" style={{ height: '323px' }}>
                                        <h5 className="card-title"> Welcome {userdetail.FirstName} </h5>
                                        <p className="card-text"><span className="lnr lnr-user" aria-hidden="true"></span>&nbsp;&nbsp;
                                          {userdetail.FirstName}  {userdetail.LastName}</p>
                                        <p className="card-text "><i className="fa fa-phone"></i>&nbsp; {username}</p>       <p className="card-text">
                                          Receive Offers :&nbsp;
                                          {userdetail.ReceiveOffers ? 'on' : 'off'}
                                        </p>
                                      </div>
                                      <Link to="/account/profile" className="btn btn-secondary"><i className="fa fa-pencil"></i> Edit</Link>
                                    </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6">
                                      <div className="card border-primry mb-3">
                                        <div className="card-body text-primary dash-height" id="dashboard-recent-list" style={{ height: '323px' }}>
                                          <h5 className="card-title">Recent Orders</h5>
                                          <table className="table table-striped">
                                            {orderlist.length ?
                                              <tbody>
                                                {(orderlist || []).map(data =>
                                                  <tr>
                                                    <td style={{ cursor: 'pointer' }}><a href onClick={() => loadorderdeatl(data.OrderNumber)}>{data.OrderNumber}</a></td>
                                                    <td>{dateConverter(data.CreatedOn)}</td>
                                                    <td id='dashboardorderamt'>₹{data.OrderAmount && data.OrderAmount !== "" ? data.OrderAmount.toFixed(2) : "0.00"}</td>
                                                  </tr>
                                                )}
                                              </tbody> :
                                              <p>No record found</p>}
                                          </table>
                                        </div>
                                        <Link className="btn btn-secondary" href to="/account/myorders"
                                          onClick={() => history.push("/account/myorders")}
                                        ><i className="fa fa-eye" aria-hidden="true"></i> View</Link>
                                      </div>
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
            </div>
            <Footer />
          </div>
      }
    </>
  );
}
export default compose(
)(MyAccount);
