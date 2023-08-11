/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import Footer from '../../../components/Footer';
import Success from '../../../components/ShowAlert/success';
import Header from '../../../components/Header';
import SubNavigation from '../../../components/SubNavigation';
import SaveCartAPI from '../../../containers/MainPage/api/savecart';
import { loadsavecheckoutpopup, getDeleteSkuid, DeleteSkuidflag } from '../../../containers/MyAccount/actions';
import MyAccountSideNav from '../../../containers/MyAccount/MyAccountSideNav';
//import history from '../../utils/history';
import { useRouter } from 'next/router';

import reducer from '../../../containers/MyAccount/reducer';
import saga from '../../../containers/MyAccount/saga';
import Savecartcheckoutmodel from '../../../containers/MyAccount/savecartcheckoutmodel';
import DeletePopUp from '../../../components/ShowAlert/deletepopup';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
// import logoanimation from '../../images/adibuja-logo-animation.gif'
export function SavedCartListitem(props) {
  useInjectReducer({ key: 'myAccount', reducer });
  useInjectSaga({ key: 'myAccount', saga });
  const [savecartlistitem, setsavecartlistitem] = useState([])
  const locationPopupState = useSelector(state => state.locationPopup)
  const [loading, setloadoing] = useState(false);
  const [isdeletepop, setIsDeletepop] = useState(false)
  const [sortname, setsortName] = useState(false)
  const [Sortdata, setSortdata] = useState([])
  const myaccountReducer = useSelector(state => state.myAccount);
  // const [showmsg] = useState([])
  // const [listname, setlistname] = useState('')
  // useEffect(() => {
  //   if (props !== undefined) {
  //     setlistname(props.location.state.listname)
  //   }
  // })
  const router = useRouter();

  const dispatch = useDispatch()
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
    fetchlist()
    }
  }, [])
  function fetchlist() {
    if (props !== undefined) {
      // setlistname(props.location.state.listname)
      setloadoing(true)
      SaveCartAPI.savecartItemlisting(window.atob(localStorage.getItem('listname')))
        .then(response => {
          console.log("response", response);
          setsavecartlistitem(response)
          setSortdata(response)
          setloadoing(false)
        })
        .catch(error => {
          console.log('error:::', error);
        });
    }
  }
  useEffect(() => {
  }, [savecartlistitem])
  const popUpvisible = (SkuId) => {
    console.log("SkuId", SkuId);
    // dispatch(DeleteSkuidflag(true))
    // setIsDeletepop(true)
    dispatch(DeleteSkuidflag(true))
    dispatch(getDeleteSkuid(SkuId))
  }
  const deleteItem = (SkuId) => {
    console.log("Skuid", SkuId);
    if (props !== undefined) {
      SaveCartAPI.removesavecartlistitem(window.atob(localStorage.getItem('listname')), SkuId)
        .then(response => {
          toast("Item deleted successfully")
          // alert('deleted')
          fetchlist()
          // setsavecartlistitem(response)
        })
        .catch(error => {
          console.log('error:::', error);
        });
    }
  }
  const checkoutsavelist = () => {
    dispatch(loadsavecheckoutpopup(true, window.atob(localStorage.getItem('listname'))))
  }
  const productdetail = (PageUrl) => {
    // router.push(`/product/${PageUrl}`, { skuUrl: PageUrl })
    localStorage.setItem('PageUrl', window.btoa(PageUrl))
    router.push(
      {
        pathname: `/product/${PageUrl}`, // not router.asPath
        skuUrl: PageUrl,
      })
  }
  const numbers = savecartlistitem.map((data) =>
    data.IsDeliveryAvailableToPinCode === true && data.SPPrice !== 0 ? data.Total : null
  )
  const savecarttotal = numbers.reduce(getSum, 0);
  function getSum(subtotal, num) {
    return subtotal + Math.round(num);
  }
  const sortproductname = () => {
    setsortName(!sortname)
    if (sortname === true) {
      const data1 = savecartlistitem.filter(a => a.SavedListName)
      data1.sort(function (a, b) {
        if (a.DisplayName < b.DisplayName) {
          return -1;
        }
        if (a.DisplayName > b.DisplayName) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    } else {
      // if(cartdata && cartdata.length > 0){
      //   setSortdata(savecartlistitem)
      // }
      const data1 = savecartlistitem.filter(a => a.DisplayName)
      data1.sort(function (a, b) {
        if (a.DisplayName > b.DisplayName) {
          return -1;
        }
        if (a.DisplayName < b.DisplayName) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    }
  }
  const sortSubTotal = () => {
    setsortName(!sortname)
    if (sortname === true) {
      const data1 = savecartlistitem.filter(a => a.Total)
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
      //   setSortdata(savecartlistitem)
      // }
      const data1 = savecartlistitem.filter(a => a.Total)
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
  const sortPrice = () => {
    setsortName(!sortname)
    if (sortname === true) {
      const data1 = savecartlistitem.filter(a => a.SPPrice)
      data1.sort(function (a, b) {
        if (a.SPPrice < b.SPPrice) {
          return -1;
        }
        if (a.SPPrice > b.SPPrice) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    } else {
      const data1 = savecartlistitem.filter(a => a.SPPrice)
      data1.sort(function (a, b) {
        if (a.SPPrice > b.SPPrice) {
          return -1;
        }
        if (a.SPPrice < b.SPPrice) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    }
  }
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <Header />
      <SubNavigation />
      {/* {getDeleteSkuid && <Success myaccountReducer={savecartlistitem} />} */}
      {myaccountReducer && myaccountReducer.checkoutpopup && <Savecartcheckoutmodel />}
      {myaccountReducer && myaccountReducer.flag && <DeletePopUp delete={deleteItem} viewCart={false} Fetchlist={fetchlist} />}
      <div className="my-account-wrapper pb-20">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <main id="primary" className="site-main">
                <div className="user-dashboard">
                  <div className="main-dashboard">
                    <div className="row">
                      <MyAccountSideNav />
                      <div className="col-12 col-sm-12 col-md-12 col-lg-10 saveListItem">
                        <div className="tab-content dashboard-content savecartListdetails" id="profile">
                          <h3>Saved Cart</h3>
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-0">
                            <div className="table-responsive">
                              <table id="tblSavedCart" className="table">
                                <thead>
                                  <tr style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                    <th width="150">Image</th>
                                    <th id="NameColumn" width="300">Product Name
                                      <button type='button' onClick={sortproductname} className="fa fa-sort"></button>
                                    </th>
                                    <th width="100">Pack Size</th>
                                    <th id="UnitPrice" width="100" style={{ textAlign: 'right' }}>Price (₹)
                                      <button type='button' onClick={sortPrice} className="fa fa-sort"></button>
                                    </th>
                                    <th style={{ textAlign: 'center' }}>Quantity</th>
                                    <th id="TotalColumn" style={{ textAlign: 'right' }}>Total (₹)
                                      <button type='button' onClick={sortSubTotal} className="fa fa-sort"></button>
                                    </th>
                                    <th style={{ textAlign: 'center' }}>Action</th>
                                  </tr>
                                </thead>
                                {loading === true ?
                                  <tbody>
                                    <tr>
                                      <td colSpan={7}>
                                        <div className='row'>
                                          <div className='col-lg-12 text-center mt-25 mb-25' >
                                            {/* <img src={logoanimation} alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} /> */}
                                            <Image src={"/images/adibuja-logo-animation.gif"} width="80" height="80" alt='' objectPosition={'center'} />
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
                                      <tr style={{ whiteSpace: 'nowrap', overflow: 'hidden' }} className={data.IsDeliveryAvailableToPinCode ? "pr-block item " : "pr-block item  delivery-not-available "}>
                                        {data.IsDeliveryAvailableToPinCode ?
                                          <td>
                                            <Link href={"#"} onClick={() => productdetail(data.PageUrl)}>
                                              <img referrerPolicy='no-referrer' src={data.ListingImage} className="js-lazy-img" height="150" width="150" alt={data.DisplayName} />
                                            </Link>
                                          </td>
                                          :
                                          <td>
                                            <img referrerPolicy='no-referrer' src={data.ListingImage} className="js-lazy-img" height="150" width="150" alt={data.DisplayName} />
                                          </td>}
                                        {data.IsDeliveryAvailableToPinCode ?
                                          <td style={{ whiteSpace: 'normal' }}><Link href={"#"} onClick={() => productdetail(data.PageUrl)} >{data.DisplayName} </Link></td> :
                                          <td style={{ color: '#007bff' }}>
                                            {data.DisplayName}
                                          </td>}
                                        <td>{data.ListItem}</td>
                                        <td style={{ textAlign: 'right' }}>
                                          ₹{data.SPPrice}
                                        </td>
                                        {data.IsDeliveryAvailableToPinCode ?
                                          <td style={{ textAlign: 'center' }}>{data.Quantity}</td> :
                                          <td style={{ textAlign: 'center' }} colSpan="1">
                                            Can't deliver to pin code <b> {locationPopupState && locationPopupState.pincode}</b>
                                          </td>}
                                        {data.SPPrice !== 0 ? <td style={{ textAlign: 'right' }}>₹{data.Total}</td> : <td style={{ textAlign: 'right' }}></td>}
                                        <input type="hidden" name="savedcartname" id="savedcartname" value="cart" />
                                        <input type="hidden" name="savedcartitemid" id="savedcartitemid" value="83762" />
                                        <input type="hidden" className="PriceId" name="savedcartfilterpriceid" id="savedcartfilterpriceid" value="823" />
                                        <td style={{ textAlign: 'center' }}>
                                          <Link href="#"
                                            onClick={() => popUpvisible(data.SkuId)}
                                            // onClick={() => deleteItem(data.SkuId)}
                                            className="lnr lnr-trash btn-remove text-danger" style={{ cursor: 'pointer' }} id="savedcartdeleteitem" ></Link>
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>}
                                {savecartlistitem.length === 0 ?
                                  <div className='row'>
                                    <div className='col-lg-12 text-center'>
                                      <b>no records</b></div></div> :
                                  <tbody>
                                    <tr className="total-tr" >
                                      {/* <td colSpan="5" style={{ borderBottom: 'unset !important' }}></td> */}
                                      <td className='saveListtotal' colSpan="6" style={{ whitespace: 'nowrap', borderBottom: 'unset !important', right: "50px" }}>
                                        <b style={{ float: 'right', marginLeft: '-45px' }}>Total &nbsp;&nbsp;
                                          ₹{savecarttotal}</b>
                                        {/* <b style={{ float: 'left' }}> Cart Total</b><b style={{ float: 'right' }}>₹ {window.atob(localStorage.getItem('savecarttotal'))}</b> */}
                                      </td>
                                      <td></td>
                                    </tr>
                                  </tbody>}
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="cart-button-wrapper d-flex justify-content-between mt-4">
                          <Link href="/" className="btn btn-secondary dark align-self-end cntechkt">Continue Shopping</Link>
                          {console.log('313--', savecartlistitem.length)}
                          {
                            savecartlistitem.length > 0
                              ?
                              <Link className="btn btn-secondary dark align-self-end cntechkt" id="logout" onClick={checkoutsavelist} href="#" >Continue Checkout</Link>
                              :
                              null
                          }
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
    </>
  )
}
export default SavedCartListitem