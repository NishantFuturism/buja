/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 *
 * ViewCart
 *
 */
import { sortBy } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import { useInjectReducer } from '@/utils/injectReducer';
import Stepper from 'react-stepper-horizontal/lib/Stepper';
import { useInjectSaga } from '@/utils/injectSaga';
import '../../public/assets1/css/default.min.css';
// import '../../../assets1/css/bundle.css';
import '../../public/assets1/css/responsive.min.css';
import '../../public/assets1/css/style.min.css';
// import brandlogo from '../../../../assets1/img/icon/adibuja-logo.svg';
import brandlogo from '../../public/assets1/img/icon/adibuja-logo.svg'; 
import Success from '../components/ShowAlert/success';
//import history from '../../utils/history';
import { useRouter } from 'next/router';
import DealdayProductOriginal from '../containers/DealdayProductOriginal';
// import RelatedProduct from '../RelatedProduct';
//import { ConstantsValues } from "../MainPage/api/homeServices";
import mycartAPI from '../containers/MainPage/api/mycartAPI';
import { ReorderProduct } from '../containers/ReorderProduct';
import { SaveCartList } from '../containers/saveCartListing';
//import ToppSellingOriginal from '../ToppSellingOriginal';
//import ToppSelling from '../ToppSellingOriginal/saga';
import { WishlistPaged } from '../containers/WishlistPaged';
import { applyCoupon, closeMsgBar, getCartData, getCouponList, removeCoupon, removeFromCart } from '../containers/ViewCart/actions';
import Item from '../containers/ViewCart/Item';
import reducer from '../containers/ViewCart/reducer';
import saga from '../containers/ViewCart/saga';
import '../containers/ViewCart/viewcartStyle.css';
import 'react-toastify/dist/ReactToastify.css';
import logoanimation from '../../public/images/adibuja-logo-animation.gif'
export function ViewCart() {
  useInjectReducer({ key: 'viewCart', reducer });
  useInjectSaga({ key: 'viewCart', saga });
  const allData = {};
  // const [skuId, setskuId] = useState(0);
  const router = useRouter();
  const [Total, setTotal] = useState(0);
  const [Deliverycharge, setDeliverycharge] = useState(0);
  const [Subtotal, setSubtotal] = useState(0);
  const [Btncoupan, setBtncoupan] = useState("Apply");
  const [couponList, setcouponList] = useState([]);
  const [appliedCoupons, setAppledCoupon] = useState([]);
  const [csuccess, setcouponSuccess] = useState([]);
  const [cartAllData, setcartAllData] = useState([]);
  const [activestep, setactivestep] = useState(0)
  const [firstLoadCheck, setFirstLoadCheck] = useState(0);
  const [isError, setisError] = useState(false);
  const [sort, setsort] = useState(false);
  const [sortname, setsortName] = useState(false)
  // const [SkuFilterPriceId, setSkuFilterPriceId] = useState(0);
  const [cartdata, setcartdata] = useState([]);
  const [apply, setappy] = useState(false);
  const [isCouponApplied, setCouponApplied] = useState(false);
  const [isCoupon, setIscoupon] = useState(false);
  const [directCoupan, setdirectCoupan] = useState("");
  const [directCoupanbtn, setdirectCoupanbtn] = useState(false);
  const [resetbtn, setResetbtn] = useState(false);
  const [applycoupon, setApplyCoupon] = useState(false);
  const [couponmsg, setCouponmsg] = useState('')
  const [viewCartdetails, setViewCartdetails] = useState([])
  const [resetClicked, setResetClicked] = useState(false)
  const [Sortdata, setSortdata] = useState([])
  const [cartsetData, setCartsetData] = useState([]);
  const nextData = useSelector(state => state.wishlistPaged)
  const nextDatareorder = useSelector(state => state.reorderProduct)
  const coupondata = useSelector(state => state.viewCart)
  const cartReducer = useSelector(state => state.cart);
  const selector = useSelector(state => state.home);
  const msg = useSelector(state => state.viewCart)
  const [custGuidL,setCustGuidL] = useState('');
  
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setCustGuidL(localStorage.getItem('CustGUID'));
    }
  }, []);

  
  const viewCartState = useSelector(state => state.viewCart);
  
  /*useEffect(() => {
    if (!custGuidL === null || custGuidL === undefined) {
      console.log('login');
    } else {
      setactivestep(1)
    }
  })*/
  const CancelCouponCode = (couponcode) => {
    // setShowResetBtn(false)
    setResetClicked(true)
    dispatch(removeCoupon(couponcode))
    setBtncoupan("Apply")
    // setdirectCoupan("")
    // return (
    // document.getElementById('txtHiddenCouponCode').value === ""
    // )
  }
  function fetchorder() {
    mycartAPI.getCartCommon(window.atob(localStorage.getItem('CartGUID')))
      .then(response => {
        setViewCartdetails(response)
        setcartAllData(response)
        
      })
      .catch(error => {
        console.log('error:::', error);
      });
    // mycartAPI.getCartCommon().then(res => {
    //   if (localStorage.getItem('CartGUID') !== null || localStorage.getItem('CartGUID') !== undefined && window.atob(localStorage.getItem('CartGUID')) !== res.CartGuid) {
    //     if (res.CartGuid !== undefined && res.CartGuid !== null) {
    //       localStorage.setItem('CartGUID', window.btoa(res.CartGuid))
    //     } else {
    //       localStorage.setItem('CartGUID', window.btoa(ConstantsValues.defaultCartGUID))
    //     }
    //     console.log("getcartcommon=", res);
    //     setViewCartdetails(res)
    //     setcartAllData(res)
    //   }
    // })
  }
  useEffect(() => {
    
    mycartAPI.getCartCommon().then(res => {
      if (res.CartGuid !== undefined && res.CartGuid !== null) {
        localStorage.setItem('CartGUID', window.btoa(res.CartGuid))
      }
    });
    fetchorder();
  }, [viewCartState])
  useEffect(() => {
    
    mycartAPI.getCartCommon().then(res => {
      if (res.CartGuid !== undefined && res.CartGuid !== null) {
        // localStorage.setItem('CartGUID', window.btoa(res.CartGuid))
      }
    });
    fetchorder();
  }, [selector])
  const dispatch = useDispatch()
  const [count, setcount] = useState(0)
  useEffect(() => {
    setcount(count + 1)
  }, [])
  useEffect(() => {
    
    if (cartAllData !== undefined && cartAllData.cart !== undefined) {
      setcartdata(cartAllData.cart)
    }
  }, [cartAllData])
  useEffect(() => {
    
    if (cartdata !== undefined) {
      
      let cartCustomArray = [];
      cartdata.forEach((element) => {
        
        element.cart.forEach((eleData) => {
          
          cartCustomArray = [...cartCustomArray, eleData];
          // setCartsetData(element.cart)
        })
      })
      
      setCartsetData(cartCustomArray)
    }
  }, [cartdata])
  const useFetching = (paramFunc) => {
    useEffect(() => {
      dispatch(paramFunc());
      dispatch(getCouponList())
    }, [count])
  }
  useFetching(getCartData);
  useEffect(() => {
    
    if (viewCartState !== undefined) {
      
      setcartAllData(viewCartState.cartAllData)
    }
  }, [viewCartState])
  useEffect(() => {
    if (viewCartState !== undefined) {
      
      setcouponList(viewCartState.couponList)
    }
  }, [viewCartState])
  useEffect(() => {
    if (viewCartState !== undefined) {
      setcouponSuccess(viewCartState.couponsuccess)
      // setcouponSuccess(false)
    }
  }, [viewCartState])
  // useEffect(() => {
  //   if (viewCartState !== undefined) {
  //     setcouponList(viewCartState.couponList)
  //   }
  // }, [viewCartState])
  const checkCouponStatus = (code) => appliedCoupons.some(coupons => coupons === code)
  const setCouponCode = (code) => {
    const coupons = [...appliedCoupons, code];
    setAppledCoupon(coupons);
  }
  function ApplyDirectCouponCode() {
    if (document.getElementById('txtHiddenCouponCode').value === '') {
      toast('Please enter coupon')
      return false
    }
    dispatch(applyCoupon(document.getElementById('txtHiddenCouponCode').value))
    setResetbtn(true)
    setCouponCode(document.getElementById('txtHiddenCouponCode').value);
    setCouponApplied(true)
    // setApplyCoupon(true)
    setappy(true)
    setTimeout(() => {
      mycartAPI.getCartCommon()
        .then((getcommonres) => {
       
          if (getcommonres.couponvalue > 0) {
            setBtncoupan("Applied")
          }
        })
    }, 3000);
    // if (viewCartState !== undefined) {
    //   // setBtncoupan("Applied")
    //   if (viewCartState.couponList !== undefined && viewCartState.couponList.length !== 0) {
    //     viewCartState.couponList.map((coupanData) => CheckCouponCode(coupanData.CouponCode, coupanData.OrderAmount))
    //   } else {
    //     document.getElementById('txtHiddenCouponCode').value = ""
    //     toast('Please enter valid coupon code')
    //   }
    // }
    
    // if (viewCartState !== undefined && apply === true) {
    //   console.log('couponsuccess', viewCartState.couponsuccess.ValidationMessage);
    //   setCouponmsg(viewCartState.couponsuccess.ValidationMessage)
    // }
    // const directCouponCode=document.getElementById('txtHiddenCouponCode').value
  }
  // const CheckCouponCode = (CouponCode) => {
  //   console.log("directcoupn", CouponCode, document.getElementById('txtHiddenCouponCode').value, viewCartState.couponsuccess.couponvalue)
  //   if (CouponCode === document.getElementById('txtHiddenCouponCode').value || viewCartState.couponsuccess.couponvalue > 0) {
  //     setBtncoupan("Applied")
  //   }
  // }
  function applyCouponFunc(CouponCode) {
    //console.log("viewCartState==", viewCartState);
    //console.log("chkcoupon..", CouponCode)
    dispatch(applyCoupon(CouponCode))
    setResetbtn(true)
    setCouponCode(CouponCode);
    
    // if (viewCartState !== undefined && apply === true) {
    //   console.log('couponsuccess', viewCartState.couponsuccess.ValidationMessage);
    //   if (viewCartState.couponsuccess.couponvalue > 0) {
    //     setCouponApplied(true)
    //     setCouponmsg(viewCartState.couponsuccess.ValidationMessage)
    //   }
    //   if (viewCartState.couponsuccess.couponvalue === 0) {
    //     setCouponApplied(false)
    //     setCouponmsg(viewCartState.couponsuccess.ValidationMessage)
    //   }
    // }
    setappy(true)
    // if (CouponCode !== cartAllData.couponcode) {
    //   alert('not valid ')
    // } else {
    //console.log("chkCouponCode..", CouponCode)
    // }
  }
  useEffect(() => {
  
    if (viewCartState !== undefined && apply === true && !resetClicked) {
      setApplyCoupon(true)
      if (viewCartState.couponsuccess.couponvalue > 0) {
        setCouponApplied(true)
        setCouponmsg(viewCartState.couponsuccess.ValidationMessage)
      }
      if (viewCartState.couponsuccess.couponvalue === 0) {
        setCouponApplied(false)
        setCouponmsg(viewCartState.couponsuccess.ValidationMessage)
      }
    }
  }, [viewCartState && viewCartState.couponsuccess])
  function closeMsgBarFunc() {
    setTimeout(() => {
      dispatch(closeMsgBar())
      setisError(false)
    }, 2000);
  }
  useEffect(() => {
   
    setisError(false)
    if (msg && msg.addToCartMsg.includes('limit')) {
      setisError(true)
      closeMsgBarFunc()
    } else {
      closeMsgBarFunc()
    }
  }, [msg])
  const loadcheckout = () => {
    if ((custGuidL === null || custGuidL === undefined)) {
      localStorage.setItem('lastVisitedUrl', '/cart');
      router.push('/login')
    } else {
      router.push('/productprocced/checkout', { total: cartAllData !== undefined && (cartAllData.total) }, {shallow: true})
    }
  }
  const handleempty = (data) => {
    // console.log("custGUID..", `${data.skuId}`)
    
    const skuid = 0
    const custguid = window.btoa(localStorage.getItem("custGUID"))
    dispatch(removeFromCart(skuid, custguid));
  }
  // const handlechange = () => {
  //   if (document.getElementById('txtHiddenCouponCode').value === '') {
  //     alert('please enter coupon')
  //   }
  // }
  // console.log('cartdata', viewCartState);
  const sortdata = () => {
    setsort(true)
    
    if (cartdata === undefined && cartsetData === undefined) {
      const data = cartsetData.sort((a, b) => (a.SPPrice - b.SPPrice))
    }
    else {
      const datareverse = cartsetData.sort((a, b) => (b.SPPrice - a.SPPrice));
    }
    
  }
  useEffect(() => {
    if (sort === true) {
      sortdata()
    }
  }, [sort])
  const sortproductname = () => {
    setsortName(!sortname)
    
    if (sortname === true) {
      const data1 = cartsetData.filter(a => a.DisplayName)
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
      //   setSortdata(cartsetData)
      // }
      const data1 = cartsetData.filter(a => a.DisplayName)
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
    // if (cartdata !== undefined && cartsetData !== undefined) {
    //   const data = cartsetData.sort((a, b) => (a.DisplayName - b.DisplayName))
    // }
    // else {
    //   const datareverse = cartsetData.sort((a, b) => (b.DisplayName - a.DisplayName));
    // }
    // console.log('mbmnbmnb', cartsetData.sort((a, b) => (a.SPPrice - b.SPPrice).reverse));
  }
  // useEffect(() => {
  //   if (sortname === true) {
  //     sortproductname()
  //   }
  // }, [sortname])
  /*useEffect(() => {
    setInterval(() => {
      setApplyCoupon(false)
    }, 5000);
  }, [closemsg,])
  useEffect(() => {
    setInterval(() => {
      setResetClicked(false)
    }, 5000);
  }, [closemsgcancelcoupon])*/
  /*const closemsg = () => {
  }
  const closemsgcancelcoupon = () => {
  }*/
  const deliverypolicy = () => {
    localStorage.setItem('pagefootert', "delivery-policy-react")
    router.push('/subfooter')
  }
  const handleCoupon = (e) => {
  
    setdirectCoupan(e.target.value)
  }
  const handleproductname = () => {
   
    const vv = cartsetData.map(itm => itm.DisplayName.sort())
  
  }
  useEffect(() => {
 
    // setsortName(false)
    mycartAPI.getCartCommon(window.atob(localStorage.getItem('CartGUID')))
      .then(response => {
        if (response && response.cart) {
          
          let cartCustomArray = [];
          response.cart.forEach((element) => {
            
            element.cart.forEach((eleData) => {
             
              cartCustomArray = [...cartCustomArray, eleData];
              // setCartsetData(element.cart)
            })
          })
          setSortdata(cartCustomArray)
        }
      })
      .catch(error => {
        console.log('error:::', error);
      });
    /* if (cartdata && cartdata.length > 0) {
      setSortdata(cartsetData)
    } */
    // {cartdata && cartdata.length > 0 &&
    //   <>
    //     {cartdata && cartsetData && cartsetData.map(itm =>
    //       <Item data={itm}></Item>
    //     )}
    //   </>
    // }
  }, [cartdata])
  const sortUnitPrice = () => {
    setsortName(!sortname)
    
    if (sortname === true) {
      const data1 = cartsetData.filter(a => a.DisplayName)
      data1.sort(function (a, b) {
        if (a.UnitPrice < b.UnitPrice) {
          return -1;
        }
        if (a.UnitPrice > b.UnitPrice) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    } else {
      const data1 = cartsetData.filter(a => a.SubTotal)
      data1.sort(function (a, b) {
        if (a.UnitPrice > b.UnitPrice) {
          return -1;
        }
        if (a.UnitPrice < b.UnitPrice) {
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
      const data1 = cartsetData.filter(a => a.SubTotal)
      data1.sort(function (a, b) {
        if (a.SubTotal < b.SubTotal) {
          return -1;
        }
        if (a.SubTotal > b.SubTotal) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    } else {
      // if(cartdata && cartdata.length > 0){
      //   setSortdata(cartsetData)
      // }
      const data1 = cartsetData.filter(a => a.SubTotal)
      data1.sort(function (a, b) {
        if (a.SubTotal > b.SubTotal) {
          return -1;
        }
        if (a.SubTotal < b.SubTotal) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    }
  }
  return (
    <>
      <ToastContainer />
      {applycoupon && <Success isError={!isCouponApplied} msg={couponmsg} /*close={closemsg}*/ />}
      {resetClicked && <Success isError msg="Coupon code removed" /*close={closemsgcancelcoupon}*/ />}
      {msg !== undefined && msg.IsMsgBar && < Success isError={isError} msg={msg.addToCartMsg.includes('|') ? msg.addToCartMsg.split('|')[1] : msg.addToCartMsg} />}
      <div className="login-wrapper pb-35">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <main className="site-main" id="primary">
                <div className="user-login viewcartStatusbar">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                      <div className="section-title text-center">
                        <p align="center" style={{ padding: '10px 0px' }}>
                          <Link href="/">
                            <img referrerPolicy='no-referrer' alt="brand-logo" src='/assets1/img/icon/adibuja-logo.svg' width="198px" height="45px" style={{ paddingLeft: "23px" }} />
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  {
                    (custGuidL === null || custGuidL === undefined)
                      ?
                      null
                      :
                      <Stepper
                        barStyle="solid"
                        steps={[{
                          title: 'Sign in',
                          href: '/login/',
                          // onClick() {
                          //   alert("sfsdjkfhksfdhhksdf");
                          // }
                        }, {
                          title: 'Shopping Cart',
                          href: '/cart/',
                          // onClick() {
                          //   alert("sfsdjkfhksfdhhksdf");
                          // }
                        }, {
                          title: 'Address Delivery Slot',
                          // href: '/productprocced/checkout',
                          // onClick() {
                          //   alert("sfsdjkfhksfdhhksdf");
                          // }
                        }, {
                          title: 'Payment & Order Placed',
                          // onClick() {
                          //   alert("sfsdjkfhksfdhhksdf");
                          // }
                        }]} activeStep={activestep} activeColor="#f07100" completeColor="#f07100"
                        defaultBorderWidth={3} />
                  }
                </div>
                <div className="mainbodycontent">
                  <div className="shopping-cart-wrapper card-details pb-70 shopping-cart-wrapper-container">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          <main id="primary" className="site-main">
                            <div className="shopping-cart">
                              {viewCartState && viewCartState.loading === true ?
                                // <i
                                //   style={{ alignSelf: 'center' }}
                                //   className="fa fa-spin fa-spinner fa-2x"></i>
                                // change css
                                <div className='row'>
                                  <div className='col-lg-12 text-center mt-25 mb-25' >
                                    <img src='/images/adibuja-logo-animation.gif' alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
                                    {/* <i
                                      style={{ justifySelf: 'center' }}
                                      className="fa fa-spin fa-spinner fa-4x"></i> */}
                                  </div>
                                </div>
                                :
                                <div className="row">
                                  {cartAllData !== undefined && cartAllData.cart !== undefined &&
                                    cartAllData.count !== 0 ?
                                    (<div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                      <div className="section-title" id="shoppicartheading">
                                        <h3>
                                          Shopping Cart
                                          {cartAllData !== undefined && (<>&nbsp;<span id="spanCartItemCount" style={{ fontWeight: 500 }}>({cartAllData.count} {cartAllData.count > 1 ? 'Items' : 'Item'})</span></>)}
                                        </h3>
                                      </div>
                                      <div className="cart-button-wrapper" id='viewcarttextright1'>
                                        <button className="btn btn-secondary empty-cart" id="emptycart" type='button' onClick={handleempty} >Empty Cart</button>
                                        <Link id="continueshoppingbtn" href="/" className="btn btn-secondary empty-cart">Continue Shopping</Link>
                                        {
                                          cartAllData && cartAllData.subtotal > 0 &&
                                          <button id="checkouthide" type='button' onClick={loadcheckout} className="btn btn-secondary empty-cart dark align-self-end">Proceed To Buy</button>
                                        }
                                      </div>
                                      <br />
                                      <div className="table-responsive" id="cart_list">
                                        <div className="row">
                                          <div className="col-12 col-sm-12 col-md-12 col-lg-8 cartlisttab">
                                            <table className="table table-bordered cartPrductList" id="tblProducts">
                                              <thead>
                                                <tr>
                                                  <th style={{ whiteSpace: 'nowrap' }}>Product Image</th>
                                                  <th id="amountcolumn2" style={{ textAlign: 'left', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                                                    Product Name &ensp;
                                                    <i className="fa fa-sort" onClick={sortproductname}></i>
                                                  </th>
                                                  <th style={{ whiteSpace: 'nowrap' }}>Quantity</th>
                                                  <th id="amountcolumn"
                                                    style={{ textAlign: 'right', whiteSpace: 'nowrap', cursor: 'pointer' }}>Unit Price (₹)&ensp;
                                                    <i className="fa fa-sort" onClick={sortUnitPrice}></i>
                                                  </th>
                                                  <th id="amountcolumn1"
                                                    // onClick={(e) => sortdata(e)}
                                                    style={{ textAlign: 'right', whiteSpace: 'nowrap', cursor: 'pointer' }}>Total (₹)&ensp; <i onClick={sortSubTotal} className="fa fa-sort"></i>
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {/* {cartAllData !== undefined && cartAllData.cart !== undefined && (
                                                   cartAllData.cart[0].cart.map(itm => */}
                                                <>{Sortdata && Sortdata.map(item => (<Item data={item}></Item>))}</>
                                              </tbody>
                                            </table>
                                          </div>
                                          <div className="col-12 col-sm-12 col-md-12 col-lg-4 cartlisttab">
                                            <div className="order-summary">
                                              <div className="checkout-payment">
                                                <div className="form-row" style={{ display: 'block', margin: '0px' }}>
                                                  {/* <span className="checkmark"></span> */}
                                                  <label className="form-check-label" htmlFor="check_payment" style={{ fontWeight: 'bold' }}>Select coupon code.</label>
                                                  <br /><br />
                                                  <div className="payment-info newPaymentinfoBox">
                                                    <div className="row coupon mrgn" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                                      <div className="col-sm-6 left_app_div spcs">
                                                        <input type="text" id="txtHiddenCouponCode" name="directCoupan" value={directCoupan} onChange={(e) => handleCoupon(e)} placeholder="Enter Coupon Code" title="Type in Coupon Code"
                                                          disabled={!!(Btncoupan === "Applied")}
                                                        />
                                                      </div>
                                                      <div className="col-sm-6 right_app_div" >
                                                        <button className="btn btn-secondary chkout-btn btn-apply-coupon pull-right" id="btnHiddenCouponcode" onClick={ApplyDirectCouponCode} style={{ textTransform: "none" }}>
                                                          {
                                                            Btncoupan === "Applied" && cartAllData.couponvalue > 0 ? "Applied" : 'Apply'
                                                          }
                                                        </button>
                                                      </div>
                                                    </div>
                                                    <div>
                                                      <label id="CouponCodeMsg1" className="danger" style={{ color: "red" }}></label>
                                                    </div>
                                                    <div className="row">
                                                      <div className="col-sm-12 apply_sec" style={{ overflowY: 'auto', maxHeight: '300px' }}>
                                                        {cartAllData !== undefined && couponList !== undefined && (couponList.map(coupon => (<div className={coupon.CouponCode !== cartAllData.couponcode ? "row coupon" : "row coupon not-allowed"} style={{ marginLeft: '0px', marginRight: '0px' }}>
                                                          <div className="col-sm-6 left_app_div">
                                                            <b>{coupon.CouponCode}</b>
                                                            <div className="col-sm-12 p-0">
                                                              {coupon.DiscountMessage}
                                                            </div>
                                                          </div>
                                                          <div className="col-sm-6 right_app_div" style={{ width: '50%' }}>
                                                            <button data-coupon="NEWP10" id="btnHiddenApplyCouponcode" type='button'
                                                              className={
                                                                coupon.CouponCode !== cartAllData.couponcode || Btncoupan === "Applied" || cartAllData.couponvalue === 0 ? "btn btn-secondary chkout-btn btn-apply-coupon pull-right" :
                                                                  "btn btn-secondary chkout-btn btn-apply-coupon pull-right disabled"}
                                                              onClick={() => applyCouponFunc(coupon.CouponCode)} style={{ textTransform: 'none' }}>
                                                              {
                                                                coupon.CouponCode !== cartAllData.couponcode || Btncoupan === "Applied" || cartAllData.couponvalue === 0 ? 'Apply' : "Applied"
                                                              }
                                                            </button>
                                                          </div>
                                                        </div>)
                                                        ))}
                                                      </div>
                                                      {(
                                                        <div className='col-lg-12 col-sm-12 pt-3 cartresetBtn' style={{ textAlign: 'right' }}>
                                                          {resetbtn ? <input type="button" style={{ marginTop: '5px', marginRight: "6%" }} className="btn btn-secondary chkout-btn" defaultValue="Reset" id="btnCancelCoupon" onClick={() => CancelCouponCode(cartAllData.couponcode)} /> : null}
                                                        </div>
                                                      )}
                                                    </div>
                                                    <div>
                                                      <label id="CouponCodeMsg" className="danger" style={{ color: 'red' }}>
                                                      </label>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="table-responsive order_sum_box">
                                              <table cellPadding="5" style={{ width: '100%' }}>
                                                <tbody>
                                                  <tr>
                                                    <td colSpan="2"><label className="form-check-label" style={{ fontWeight: 'bold' }}>Payment Details</label></td>
                                                  </tr>
                                                  <tr>
                                                    <td className="colwid200">Sub Total</td>
                                                    {cartAllData !== undefined && (<td className="mycart_7 colwid150"> ₹{parseFloat(cartAllData.subtotal).toFixed(2)}</td>)}
                                                  </tr>
                                            
                                                  <tr>
                                                    <td className="colwid200">Coupon Amount</td>
                                                    {cartAllData !== undefined && (<td className="mycart_7 colwid150" id="CouponDiscount">- ₹{parseFloat(cartAllData.couponvalue).toFixed(2)}</td>)}
                                                  </tr>
                                                  <tr>
                                                    <td className="colwid200">Delivery Charges</td>
                                                    {cartAllData !== undefined && (<td className="mycart_7 colwid150"> ₹{parseFloat(cartAllData.deliverycharge).toFixed(2)}</td>)}
                                                  </tr>
                                                  <tr>
                                                    <td className="colwid200"><b>Total</b> </td>
                                                    {cartAllData !== undefined && (<td className="mycart_7 colwid150" id="AmountToPay" style={{ fontWeight: 600 }}> ₹{parseFloat(cartAllData.total).toFixed(2)}</td>)}
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                            {/* <br /> */}
                                            <div className='mt-4 mb-4' >
                                              {/* <div className="col-md-6 col-lg-8 cartlisttab"></div> */}
                                              {cartAllData.freetotalamount > 0 && (
                                                <div className="col-sm-4 col-md-6 col-lg-12 cartlisttab">
                                                  <span>
                                                    <i className="fa fa-info-circle"></i>
                                                    Add <strong>₹{cartAllData.freetotalamount}</strong> of eligible items to your order to qualify for free delivery.
                                                    <Link href="/delivery-policy"> Our delivery charge details page matrix</Link>
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        {/* <div className="text-right" style={{ clear: 'both', display: 'none' }}>
                                         <table align="right" id="couponadd" style={{ display: 'block' }}>
                                           <tbody>
                                             <tr>
                                               <td>
                                                 <div className="checkout-payment">
                                                   <div className="form-row" style={{ display: 'block' }}>
                                                     <div className="mb-10 form-group text-left">
                                                       <p>
                                                         <b>Above Rs500/- Free! Delivery </b>, <br />To check our Delivery charges details page matrix
                                                         <Link hrefstyle={{ color: 'dodgerblue' }}>Click here</Link>
                                                       </p>
                                                       <br />
                                                       <label className="requiredlbl text-left"
                                                         style={{ paddingBottom: '8px' }}><b>Apply Coupon code.</b>
                                                       </label><br />
                                                       <input type="text" placeholder="******" className="form-control" />
                                                     </div>
                                                   </div>
                                                 </div>
                                               </td>
                                             </tr>
                                           </tbody></table>
                                         <div className="clearfix"></div>
                                         <br />
                                       </div> */}
                                      </div>
                                      <div className="cart-button-wrapper" id='viewcarttextright'>
                                        <button className="btn btn-secondary empty-cart" id="emptycart" type='button' onClick={handleempty} >Empty Cart</button>
                                        <Link id="continueshoppingbtn" href="/" className="btn btn-secondary empty-cart">Continue Shopping</Link>
                                        {
                                          cartAllData && cartAllData.subtotal > 0 &&
                                          <button id="checkouthide" type='button' onClick={loadcheckout} className="btn btn-secondary empty-cart dark align-self-end">Proceed To Buy</button>
                                        }
                                      </div>
                                    </div>
                                    ) :
                                    (
                                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="section-title" id="shoppicartheading">
                                          <h3>Shopping Cart <span id="spanCartItemCount">(0)</span></h3>
                                        </div>
                                        <div className="table-responsive" id="cart_list">
                                          <table className="table table-bordered">
                                            <tbody>
                                              <tr>
                                                <td colSpan="12" className="mycart_17">
                                                  <div className="col-md-12" style={{ padding: '5%' }}>
                                                    <div className="alert alert-warning"><strong>Empty Cart </strong> <br />Your cart is empty. Start adding!</div>
                                                    <Link href="/" className="btn btn-secondary" >Continue Shopping</Link>
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    )
                                  }
                                </div>}
                            </div>
                            {(custGuidL === null || custGuidL === undefined) ? null : <ReorderProduct />}
                            {(custGuidL === null || custGuidL === undefined) ? null : <SaveCartList />}
                            {/* (custGuidL === null || custGuidL === undefined) ? null : <ReorderProduct /> */}
                            {(custGuidL === null || custGuidL === undefined) ? null : <WishlistPaged />}
                            {<DealdayProductOriginal />}
                            <div className="check_foot">
                              <form id="mc-form" >
                              </form>
                              <p align="center" style={{ paddingTop: '10px' }}>
                                <small>
                                  {/* <Link to="/delivery-policy" target="_blank" style={{ color: 'dodgerblue' }}>Delivery Policy</Link>&nbsp; &nbsp; */}
                                  <a href onClick={deliverypolicy} to="/subfooter" style={{ color: 'dodgerblue', cursor: 'pointer' }}>Delivery Policy</a>&nbsp;&nbsp;
                                  <Link href="/faq" target="_blank" style={{ color: 'dodgerblue' }}>Help</Link>
                                </small>
                              </p>
                              <div>
                                <p align="center" style={{ paddingTop: '0px' }}>
                                  <small>2023 © Adibuja Private Limited, All Rights Reserved</small>
                                </p>
                              </div>
                            </div >
                          </main>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              {/* {custGuidL === null ? null :
                 <ReorderProduct deal={nextDatareorder && nextDatareorder.dealData} />} */}
              {/* {custGuidL === null ? null :
                 <WishlistPaged />} */}
              {/* {custGuidL === null ? null :
                 <ReorderProduct />} */}
              {/* <DealdayProductOriginal /> */}
              {/* <RelatedProduct /> */}
              {/* <ReorderProduct /> */}
            </div>
          </div>
        </div>
      </div>
      {/* {custGuidL === null && nextData && nextData.dealData && nextData.dealData.Data === null ? null :
         <WishlistPaged deal={nextData && nextData.dealData} />} */}
    </>
  )
}
// const mapStateToProps = createStructuredSelector({
//   viewCart: makeSelectViewCart(),
// });
// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }
// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );
// export default compose(
// withConnect,
//   memo,
// )(ViewCart);
export default ViewCart