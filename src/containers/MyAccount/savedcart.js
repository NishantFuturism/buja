/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
// import SubNavigation from '../../components/SubNavigation';
//import history from '../../utils/history';
// import { msgshow } from '../HomeScreen/actions';
import SaveCartAPI from '../MainPage/api/savecart';
import { loadsavecheckoutpopup } from './actions';
import MyAccountSideNav from './MyAccountSideNav';
import reducer from './reducer';
import saga from './saga';
import Savecartcheckoutmodel from './savecartcheckoutmodel';
import BreadCrumb from './myAccountBreadcrumb';
import logoanimation from '../../images/adibuja-logo-animation.gif'
export function SavedCart() {
  useInjectReducer({ key: 'myAccount', reducer });
  useInjectSaga({ key: 'myAccount', saga });
  const [savecartlist, setsavecartlist] = useState([])
  const [loading, setloading] = useState(false)
  const [sortname, setsortName] = useState(false)
  const [Sortdata, setSortdata] = useState([])
  const myaccountReducer = useSelector(state => state.myAccount)
  const cartReducer = useSelector(state => state.cart)
  console.log('cartReducer--', cartReducer)
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
  // when the cart pop is close then fetchlist is call for showing updated list 
  useEffect(() => {
    fetchlist()
  }, [cartReducer])
  useEffect(() => {
    fetchlist()
  }, [])
  const dispatch = useDispatch()
  function fetchlist() {
    setloading(true)
    SaveCartAPI.savecartlisting({})
      .then(response => {
        setloading(false)
        setsavecartlist(response)
        setSortdata(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }
  const viewlistItem = (listname, Total) => {
    localStorage.setItem('listname', window.btoa(listname))
    localStorage.setItem('savecarttotal', window.btoa(Total))
    history.push('/account/savedcartlist/savedcartlistitem', { listname })
  }
  const deletlistItem = (listname) => {
    SaveCartAPI.removesavecartlist(listname)
      .then(response => {
        toast("Removed  item successfully")
        // alert('deleted')
        fetchlist()
        // dispatch(msgshow(response))
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }
  const checkout = (cartname) => {
    // dispatch(savecartcheckout(cartname))
    dispatch(loadsavecheckoutpopup(true, cartname))
  }
  function dateConverter(createdon) {
    const date = new Date(createdon);
    const formattedDate = date.toLocaleDateString('en-us', {
      month: 'long', day: 'numeric', year: 'numeric'
    }).replace(/ /g, '  ');
    return formattedDate
  }
  const sortproductname = () => {
    setsortName(!sortname)
    console.log("name..", savecartlist)
    if (sortname === true) {
      const data1 = savecartlist.filter(a => a.SavedListName)
      data1.sort(function (a, b) {
        if (a.SavedListName < b.SavedListName) {
          return -1;
        }
        if (a.SavedListName > b.SavedListName) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    } else {
      // if(cartdata && cartdata.length > 0){
      //   setSortdata(savecartlist)
      // }
      const data1 = savecartlist.filter(a => a.SavedListName)
      data1.sort(function (a, b) {
        if (a.SavedListName > b.SavedListName) {
          return -1;
        }
        if (a.SavedListName < b.SavedListName) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    }
  }
  const sortSubTotal = () => {
    setsortName(!sortname)
    console.log("name..", savecartlist)
    if (sortname === true) {
      const data1 = savecartlist.filter(a => a.Total)
      data1.sort(function (a, b) {
        if (a.Total < b.Total) {
          return -1;
        }
        if (a.Total > b.Total) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    } else {
      // if(cartdata && cartdata.length > 0){
      //   setSortdata(savecartlist)
      // }
      const data1 = savecartlist.filter(a => a.Total)
      data1.sort(function (a, b) {
        if (a.Total > b.Total) {
          return -1;
        }
        if (a.Total < b.Total) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    }
  }
  const sortSavedate = () => {
    setsortName(!sortname)
    console.log("name..", savecartlist)
    if (sortname === true) {
      const data1 = savecartlist.filter(a => a.CreatedON)
      data1.sort(function (a, b) {
        if (a.CreatedON < b.CreatedON) {
          return -1;
        }
        if (a.CreatedON > b.CreatedON) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    } else {
      const data1 = savecartlist.filter(a => a.CreatedON)
      data1.sort(function (a, b) {
        if (a.CreatedON > b.CreatedON) {
          return -1;
        }
        if (a.CreatedON < b.CreatedON) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    }
  }
  return (
    <>
      {
        // (isUserLogin === true || isUserLogin !== null || isUserLogin !== undefined)
        (isUserLogin === false)
          ?
          history.push({ pathname: '/login', })
          :
          <div>
            <ToastContainer
              position="top-right"
            // draggable={true}
            // autoClose={50000}
            />
            <Header />
            <BreadCrumb myAccount="My Account" activepage="Saved Cart List" />
            {myaccountReducer && myaccountReducer.checkoutpopup && <Savecartcheckoutmodel />}
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
                              <div className="tab-content dashboard-content savecartProfile" id="profile">
                                <h3>Saved Cart</h3>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-0">
                                  <div className="table-responsive">
                                    <table className="table" id="savedcartIndex">
                                      <thead>
                                        <tr>
                                          <th id="savedcartIndex_Name" width="250">Cart Name   <button type='button' onClick={sortproductname} className="fa fa-sort"></button></th>
                                          <th id="savedcartIndex_Date" width="200">Date   <button type='button' onClick={sortSavedate} className="fa fa-sort"></button></th>
                                          <th id="savedcartIndex_Total" style={{ whiteSpace: 'nowrap' }}>Total (₹)   <button type='button' onClick={sortSubTotal} className="fa fa-sort"></button></th>
                                          <th id="savedcartIndex_Action">Actions</th>
                                        </tr>
                                      </thead>
                                      {loading === true ?
                                        <tbody>
                                          <tr>
                                            <td colSpan={4}>
                                              <div className='row'>
                                                <div className='col-lg-12 text-center mt-25 mb-25' >
                                                  <img src={logoanimation} alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
                                                  {/* <i
                                              style={{ justifySelf: 'center' }}
                                              className="fa fa-spin fa-spinner fa-4x"></i> */}
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                        :
                                        <tbody>
                                          {(Sortdata || []).map(data =>
                                            <tr>
                                              <td id="savedcartIndex_Name">{data.SavedListName}</td>
                                              <td id="savedcartIndex_Date">
                                                {dateConverter(data.CreatedON)}                                                                        </td>
                                              <td className="white-space:nowrap;" id="savedcartIndex_Total">₹{data.Total.toFixed(2)}</td>
                                              <td id="savedcartIndex_Action">
                                                <button type='button' className="btn btn-secondary btn-sm view"
                                                  onClick={() => viewlistItem(data.SavedListName, data.Total)}
                                                >View</button>
                                                <button type='button' className="btn btn-secondary btn-sm delete" style={{ marginLeft: 5 }} id="savedcartdelete" onClick={() => deletlistItem(data.SavedListName)}>delete</button>
                                                <button
                                                  style={{ marginLeft: 5 }}
                                                  type='button' className="btn btn-secondary btn-sm cntchkout"
                                                  onClick={() => checkout(data.SavedListName)}
                                                  id="logout">
                                                  Checkout
                                                </button>
                                                <input type="hidden" name="savedcartname" id="savedcartname" value="cart" />
                                              </td>
                                            </tr>
                                          )}
                                        </tbody>}
                                    </table>
                                  </div>
                                </div>
                                {savecartlist.length === 0 ?
                                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="table-responsive">
                                      <div>
                                        No Records Found
                                      </div>
                                      {/* <div className="cart-button-wrapper d-flex justify-content-between mt-4">
                                  <Link to="/" className="btn btn-secondary">Continue Shopping</Link>
                                </div> */}
                                    </div>
                                  </div> : null}
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
export default SavedCart
