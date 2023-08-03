/* eslint-disable no-return-assign */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-lonely-if */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { 
  faCheckSquare, faEnvelope, faMapMarkerAlt, faPhoneAlt, faSignInAlt, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import React, { useEffect, useState } from 'react';

  import { NavDropdown, Row } from 'react-bootstrap';
  import { useDispatch, useSelector } from 'react-redux';
  import { Link } from 'next/link';
  
  import '../../../public/assets1/css/bundle.css'
  
  import '../../../public/assets1/css/font-awesome.min.css';
  import '../../../public/assets1/css/responsive.min.css';
  import '../../../public/assets1/css/style.min.css';
  import AddToCart from '../../containers/AddToCart';
  
  //import { router.push } from '../../containers/HomePage/historyPush';
  import { closeMsgBar, enablequickreviw } from '../../containers/LoadProducts/actions';
  import { LocationPopup } from '../../containers/LocationPopup';
  
  import CustomsAPI, { ConstantsValues } from '../../containers/MainPage/api/homeServices';
  import LocationApi from '../../containers/MainPage/api/Locationapi';
  import mycartAPI from "../../containers/MainPage/api/mycartAPI";
  
  import { MavigationBar } from '../../containers/MavigationBar/index';
  import { useRouter } from 'next/router';
  ////import history from '../../utils/history';
  import Success from '../ShowAlert/success';
  import './Header.css';
  import Registerpopup from './registerpopup';

export default function Header() {
    const router = useRouter();
    const [PhoneNumber, setPhoneNumber] = useState('')
  const [Email, setEmail] = useState('')
  const [AccountName, setAccountName] = useState('')
  const [defaultlocdata, setdefaultlocdata] = useState([])
  const [wishlistdata, setwishlistdata] = useState()
  const [popup, setpopup] = useState(false)
  const [isError, setisError] = useState(false);
  const [IsMsgBarMyAcc, setIsMsgBarMyAcc] = useState(false);
  const [myAccErrorMsg, setMyAccErrorMsg] = useState('');
  const [IsMsgBarCart, setIsMsgBarCart] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [CartErrorMsg, setCartErrorMsg] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [menu, setMenu] = useState([]);
  const [CartData, setCartData] = useState([]);
  const [quiickviewdata, setsetquiickviewdata] = useState([]);
  const loadProducts = useSelector(state => state.loadProducts)
  const addToCartRdcr = useSelector(state => state.addToCart)
  const myAcc = useSelector(state => state.myAccount)
  const sendOtpApiResponse = useSelector(state => state.login)
  const homeReducerData = useSelector(state => state.home)
  const wishlistReducer = useSelector(state => state.wishlist)
  const CartReducer = useSelector(state => state.cart)
  const homeScreenstate = useSelector(state => state.homeScreen)
  const locationPopupState = useSelector(state => state.locationPopup)
  const addToCart = useSelector(state => state.addToCart)
  const dispatch = useDispatch()
  useEffect(() => {
    if (homeScreenstate !== undefined) {
      setShoppingCart(homeScreenstate.shoppingCartDetails)
    }
  }, [homeScreenstate])
  useEffect(() => {
    if (addToCart !== undefined) {
      setShoppingCart(addToCart.shoppingCartDetails)
    }
  }, [addToCart])
  useEffect(() => {
    if (IsMsgBarCart) {
      setTimeout(() => {
        setCartErrorMsg('')
      }, 3000);
    }
  }, [IsMsgBarCart])

  useEffect(() => {
  }, [CartReducer])
  
  useEffect(() => {
    if (CartErrorMsg) {
      addToCartRdcr && setIsMsgBarCart(addToCartRdcr.IsMsgBar)
      wishlistReducer && setIsMsgBarCart(wishlistReducer.IsMsgBar)
    } else {
      setIsMsgBarCart(false)
    }
  }, [CartErrorMsg, wishlistReducer,])
  useEffect(() => {
    // console.log('addToCartRdcr', addToCartRdcr);
    addToCartRdcr && setCartErrorMsg(addToCartRdcr.addToCartMsg)
    wishlistReducer && setCartErrorMsg(wishlistReducer.addToCartMsg)
  }, [addToCartRdcr, wishlistReducer])
  useEffect(() => {
    loadProducts && setCartErrorMsg(loadProducts.addToCartMsg)
    // console.log('loadProducts', loadProducts);
  }, [loadProducts])
  useEffect(() => {
    if (IsMsgBarMyAcc) {
      setTimeout(() => {
        setIsMsgBarMyAcc(false)
      }, 3000);
    }
  }, [IsMsgBarMyAcc])
  useEffect(() => {
    // localStorage.setItem('pincodevalue', '411045')
    mycartAPI.getCartCommon().then(res => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('CartGUID') !== null || localStorage.getItem('CartGUID') !== undefined && window.atob(localStorage.getItem('CartGUID')) !== res.CartGuid) {
                res.CartGuid !== undefined && res.CartGuid !== null ? localStorage.setItem('CartGUID', window.btoa(res.CartGuid)) : localStorage.setItem('CartGUID', window.btoa(ConstantsValues.defaultCartGUID))
                setCartData(res)
                //   // localStorage.setItem('CartGUID', window.btoa(res.CartGuid)) :
                //   
              }
        }
    
    })
    CustomsAPI.getMegamainmenu().then(response => {
      // console.log("menu response", response);
      setMenu(response)
    })
    CustomsAPI.getClientid({})
      .then(response => {
        setEmail(response.Email)
        setPhoneNumber(response.PhoneNumber)
      })
    LocationApi.GoogleApi({})
      .then(response => {
        const data = response
        setdefaultlocdata(data)
      })
    CustomsAPI.getwishlist({})
      .then(response => {
        // console.log("header wish count=", response)
        setwishlistdata(response.length);
        if (typeof window !== 'undefined') {
            localStorage.setItem('length', response.length)    
        }
        
        // toast(response)
      })
    
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('CustGUID') !== null) {
            setIsLogin(true)
            setAccountName(`Hi ${(localStorage.getItem('UserFirstName'))}`)
          }
          else {
            setAccountName('My Account')
          }
    }
      
  }, [wishlistReducer, loadProducts, addToCart])
  
  useEffect(() => {

    if (myAcc) {
      // console.log('myAcc', myAcc)
      switch (myAcc.updateStatus) {
        case 1:
          setMyAccErrorMsg('Password has been changed successfully!')
          setIsMsgBarMyAcc(true)
          setisError(false)
          typeof window !== 'undefined' ? localStorage.clear() : ""
          router.push('/')
          break;
        case 3:
          setIsMsgBarMyAcc(true)
          setisError(true)
          // setMyAccErrorMsg('Incorrect current password')
          break
        case 4:
          setisError(true)
          setIsMsgBarMyAcc(true)
          setMyAccErrorMsg('Current password and new password should not be same')
          break
        default:
          break;
      }
    }
  }, [myAcc])
  useEffect(() => {
    sendOtpApiResponse && sendOtpApiResponse.customerlogindata && setAccountName(`Hi ${sendOtpApiResponse.customerlogindata.FirstName}`)
  }, [sendOtpApiResponse])
  // const wishlist=useSelector(state => state)
  useEffect(() => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('CustGUID') !== null) {
            setIsLogin(true)
            setAccountName(`Hi ${(localStorage.getItem('UserFirstName'))}`)
          } else {
            setAccountName('My Account')
          }
    }
    
  }, [])
  useEffect(() => {
    if (homeReducerData) {
      // console.log('homeReducerData', homeReducerData.allCartData);
      setCartData(homeReducerData.allCartData)
    }
  }, [homeReducerData])
  useEffect(() => {
    if (loadProducts && loadProducts.addToCartMsg.includes('limit')) {
      setisError(true)
    }
    if (loadProducts) {
      // setCartData(loadProducts.allCartData)
      // setwishlistdata(loadProducts.updateWishlistData)
    }
    closeMsgBarFunc()
  }, [loadProducts])
  /*useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);*/
  function renderlocation() {
    setpopup(true)
    
  }

  function closeMsgBarFunc() {
    setTimeout(() => {
      //dispatch(closeMsgBar())
      setisError(false)
    }, 3000);
  }
  function renderLogout() {
if (typeof window !== 'undefined') {
    localStorage.clear()
}
    
    router.push('/')
    //history.go(0)
  }
  function fetchToggle() {
    setpopup(false)

  }
  useEffect(() => {
    // dispatch(getlocationtitle('','',undefined))
  })
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true)
    }
    if (window.scrollY < 1) {
      setIsSticky(false)
    }
  }
  function trackorder() {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('CustGUID') === null) {
            router.push('/login')
          } else {
            router.push("/account/myorders")
          } 
    }
  }
  // const Logoutmodal=() =>
  useEffect(() => {
    if (quiickviewdata.FilterList !== undefined) {
      setFiltered(quiickviewdata.FilterList[0])
    }
  }, [quiickviewdata])
  const cancelpopup = () => {
    dispatch(enablequickreviw(false))
  }
  useEffect(() => {
    if (loadProducts !== undefined && loadProducts.Quickviewdata) {
      setsetquiickviewdata(loadProducts.Quickviewdata)
    }
  }, [loadProducts])

  const Quickviewcontainer = () =>
    // < Modal show>
    // quiickviewdata !== undefined &&
    <div className="modal fade show" id="QuickView" style={{ display: 'block', paddingLeft: '0px' }}>
      <div className="container">
        <div className="modal-dialog modal-lg modal-dialog-centered" id="modell" >
          <div className="modal-content" >
            <div className="modal-header">
              <button type="button" id="btnClosePopup"
                onClick={cancelpopup}
                className="close" data-dismiss="modal">×</button>
            </div>
            <div className="modal-body pr-block">
              <div className="row">
                <div className="col-lg-5">
                  <div className="product-large-slider mb-20">
                    <div className="pro-large-img">
                      <img className="js-lazy-img"
                        referrerPolicy='no-referrer'
     
                        src={quiickviewdata.ListingImage} height="250" width="250" alt={quiickviewdata.SkuCode} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="product-details-inner">
                    <div className="product-details-contentt">
                      <div className="pro-details-name mb-10">
                        <h3>{quiickviewdata.SkuCode} </h3>
                      </div>
                      <div className="price-box mb-0">
                        <div className="price-box" >
                          <span className="regular-price"><span className="special-price" id="spprice83938">₹{filtered.FilterSPPrice}</span></span>
                          <span className="old-price" id="oldprice83938"
                            style={{ display: filtered.IsDiscountedSFP ? 'inline-block' : 'none' }}
                          ><del>₹{filtered.FilterMRPPrice}</del></span>
                          {filtered && <span className="label_sale label-modalproduct"
                            style={{ display: filtered.IsDiscountedSFP ? 'inline-block' : 'none', width: 'max-content', color: '#ffffff' }}
                            id="discountpercent83938">{filtered.FilterDiscount}% off</span>}
                        </div>
                      </div>
                      <div className="ratings">
                        <span id="savedrstextid83938" className="saved-rs-text"
                          style={{ visibility: filtered.IsDiscountedSFP ? 'visible' : 'hidden' }}>You Save:</span> <span className="saved-rs-text" id="savedrsid83938" style={{ visibility: filtered.IsDiscountedSFP ? 'visible' : 'hidden' }}> ₹{filtered.FilterSavedRs}</span>
                      </div>
                      {quiickviewdata && quiickviewdata.ShortDescription !== null ? <div className="product-detail-sort-des pb-0 pt-2 product-quickView-desc">
                        <span style={{ fontSize: '14pt' }}><b>Overview</b></span>
                        <span>
                          <div dangerouslySetInnerHTML={{ __html: `${quiickviewdata.ShortDescription}` }} />
                        </span>
                        {/* <p dangerouslySetInnerHTML={{ __html: quiickviewdata.ShortDescription }}></p> */}
                        {/* <div id="tab_description" style={{ marginLeft: 30 }} className='mb-40 container-fluid'  /> */}
                      </div> : null}
                      <div className="pro-details-list pt-20">
                        <ul>
                          <li>
                            <span>Availability :</span>
                            {quiickviewdata.InStock ? 'In Stock' : null}
                          </li>
                        </ul>
                      </div>
                      <div style={{ overflow: 'hidden', marginBottom: '5px' }}>
                        <input type="hidden" className="PriceId" value="2471" />
                        <label style={{ textAlign: 'right', clear: 'both', float: 'left', marginRight: '15px', Color: '#111', fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>Pack Size</label>
                        <span >
                          :&nbsp;{filtered.ListItem}
                        </span>
                      </div>
                      <div className="product-availabily-option mt-15 mb-15">
                        <div className="color-optionn">
                          <h4><sup>*</sup>food preference</h4>
                          <ul>
                            <li>
                              <a style={{ backgroundColor: '#029135' }} href="#." title="Vegetarian"></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                     
                      <AddToCart data={quiickviewdata} shoppingCart={shoppingCart} filtered={filtered} PDPpage style={{ marginRight: '-5px' }} />
                      <div className="clearfix">
                        <br />
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
    return (
        <>
      {loadProducts && loadProducts.popup === true ? <Quickviewcontainer /> : null}
      {homeScreenstate && homeScreenstate.regesterflag && <Registerpopup />}
      <header className={`header-pos adibuja-header ${isSticky ? 'stykeyheader' : ''}`} key='header' >
        {/* <div className="header-pos" > */}
        {/* {logoutpopup ?
          <LogoutPopup fetchToggle={fetchToggle} /> : null} */}
        <div className="header-top black-bg" style={{ display: 'none' }}>
          <div
            className="container-fluid" >
            <Row>
              <div className="col-lg-6 col-12">
                <div className="header-top-left" id="txtcentr">
                  <ul>
                    <li>
                      <a
                        onClick={() => window.location = 'mailto:contactus@adibuja.com'}
                        // onClick={() => router.push("tel:+91-7058702045")}
                        style={{ cursor: 'pointer' }}>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span> Email: {Email} </span>
                      </a>
                    </li>
                    <li>
                      <a href='tel:+91-7058702045' style={{ cursor: 'pointer' }}
                      // onClick={() => router.push("mailto:contactus@adibuja.com")}
                      >
                        <FontAwesomeIcon icon={faPhoneAlt} />
                        <span>{PhoneNumber}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="header-top-right d-flex align-items-center">
                  <FontAwesomeIcon icon={faUser} />
                  <NavDropdown title={AccountName} id="header-nav-dropdown" >
                    {/* <NavDropdown title={props.userdata.googlesignindata ? `Hi ${props.userdata.googlesignindata.givenName}` : "My Account"} id="header-nav-dropdown"> */}
                    {!isLogin && (<>
                      <div>
                        <NavDropdown.Item onClick={() => router.push('/login')}>
                          {' '}
                          <FontAwesomeIcon icon={faSignInAlt} />
                          Login
                        </NavDropdown.Item>
                      </div>
                      <div>
                        <NavDropdown.Item onClick={() => router.push('/register')}>
                          {' '}
                          <FontAwesomeIcon icon={faCheckSquare} />
                          Register
                        </NavDropdown.Item>
                      </div>
                    </>)}
                    {isLogin && (
                      <div>
                        <div>
                          <NavDropdown.Item onClick={() => router.push("/account/dashboard")}>
                            {' '}
                            {/* <FontAwesomeIcon icon={'fa fa-tachometer '} /> */}
                            <i className="fa fa-tachometer mr-3" > </i>
                            Dashboard
                          </NavDropdown.Item>
                        </div>
                        <div>
                          <NavDropdown.Item onClick={() => router.push("/account/myorders")}>
                            {' '}
                            {/* <FontAwesomeIcon icon={faCheckSquare} /> */}
                            <i className="fa fa-shopping-basket  mr-3" aria-hidden="true"></i>
                            My Order
                          </NavDropdown.Item>
                        </div>
                        <div>
                          <NavDropdown.Item onClick={() => router.push("/Wishlist")}>
                            {' '}
                            {/* <FontAwesomeIcon icon={faCheckSquare} /> */}
                            <i className="fa fa-heart mr-3" > </i>
                            My Wishlist
                          </NavDropdown.Item>
                        </div>
                        <div>
                          <NavDropdown.Item onClick={() => router.push("/account/profile")}>
                            {' '}
                            {/* <FontAwesomeIcon icon={faCheckSquare} /> */}
                            <i className="fa fa-user-circle-o mr-3" > </i>
                            Profile
                          </NavDropdown.Item>
                        </div>
                        <div>
                          <NavDropdown.Item onClick={() => router.push("/account/changepassword")}>
                            {' '}
                            {/* <FontAwesomeIcon icon={faCheckSquare} /> */}
                            <i className="fa fa-key mr-3" > </i>
                            Manage Password
                          </NavDropdown.Item>
                        </div>
                        <div>
                          <NavDropdown.Item onClick={renderLogout}>
                            {' '}
                            {/* <FontAwesomeIcon icon={faCheckSquare} /> */}
                            <i className="fa fa-power-off mr-3" > </i>
                            Logout
                          </NavDropdown.Item>
                        </div>
                      </div>
                    )}
                  </NavDropdown>
                  {/*<Link className="ha-toggle" onClick={trackorder}>
                    <FontAwesomeIcon icon={faTruck} />
                    <span> Track Order</span>{' '}
                    </Link>*/}
                  {/* change css */}
                  <div className="togglecity align-items-center d-flex" >
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    {locationPopupState === undefined ?
                      defaultlocdata && <span id="cityName" style={{ cursor: 'pointer' }} onClick={renderlocation}>
                        {defaultlocdata.DefaultDeliveryLocality_Area} {defaultlocdata.DefaultDeliveryLocality_Pincode}
                        {/* {localStorage.setItem('pincodevalue',defaultlocdata.DefaultDeliveryLocality_Pincode)} */}
                      </span> :
                      locationPopupState && <span id="cityName" style={{ cursor: 'pointer' }} onClick={renderlocation}>
                        {locationPopupState.locationname} {locationPopupState.pincode}
                        {/* {localStorage.setItem('pincodevalue',locationPopupState.pincode)} */}
                      </span>}
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </div>
        <MavigationBar CartData={CartData} wishlistdata={wishlistdata} menu={menu} />
        {/* <MavigationBar wishlistdata={wishlistdata} menu={menu} /> */}
        {popup === true ?
          <LocationPopup data={defaultlocdata} popup={popup} fetchToggle={fetchToggle} />
        : null}
        <div className="col-12 d-block d-lg-none">
          <div className="mobile-menu mean-container">
            <MavigationBar CartData={CartData} wishlistdata={wishlistdata} menu={menu} />
          </div>
        </div>
      </header >
      {IsMsgBarCart && < Success isError={isError} msg={CartErrorMsg} />}
      {IsMsgBarMyAcc && < Success isError={isError} msg={myAccErrorMsg} />}
    </>
    )
}
  