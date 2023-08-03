/* eslint-disable react/button-has-type */
/* eslint-disable no-return-assign */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable-line */
/* eslint-disable no-useless-escape */
/**
 *
 * MavigationBar
 *
 */
import Link from 'next/link';
import Image from 'next/image';
import '@icon/linearicons/linearicons.css';
// import { faSignInAlt, faCheckSquare, faUser } from '@fortawesome/free-solid-svg-icons';
// import { routeToHistory } from '../../containers/HomePage/historyPush';
import React, { useEffect, useRef, useState } from 'react';
// import '../../../public/assets1/css/bundle.css';
// import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import '../../../public/assets1/css/default.min.css';
// import '../../../assets1/css/font-awesome.min.css';
// import '../../../assets1/css/chat/font-awesome.min.css';
import '../../../public/assets1/css/responsive.min.css';
import '../../../public/assets1/css/style.min.css';
import adibujalogo from '../../../public/assets1/img/icon/adibuja-logo.svg';
////import history from '../../utils/history';
import { useRouter } from 'next/router';
import { Cart } from "../Cart/index";
import { dbAutosuggestionlist, isOpenMyCartAction, mobilefilterIcon } from './actions';
import './MavigationBar.css';
import reducer from './reducer';
import saga from './saga';
// import SearchAPI from '../MainPage/api/search';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { LocationPopup } from "../LocationPopup";
import { useLocalStorage } from '../../useLocalStorage';
// import { getlocationtitle } from "../LocationPopup/actions";
import LocationApi from "../MainPage/api/Locationapi";
import CustomsAPI from "../MainPage/api/homeServices";
import Success from '../../components/ShowAlert/success';
import Menudropdown from "./Menudropdown"
import cycling from '../../../public/images/cycling.gif'
// import Header from '../../components/Header';
export function MavigationBar(props) {
  const router = useRouter();
  useInjectReducer({ key: 'mavigationBar', reducer });
  useInjectSaga({ key: 'mavigationBar', saga });

  const [PLPCat, setPLPCat] = useState('');
  const [PLPparenturl, setPLPparenturl] = useState('');
  const [lastVisitedUrl, setlastVisitedUrl] = useState('');
  const [search, setsearch] = useState('');
  const [searchmob, setsearchmob] = useState('');
  const [length, setlength] = useState('');
  const [CustGUID, setCustGUID] = useState('');
  const [UserFirstName, setUserFirstName] = useState('');
  const [sublocalityvalue, setsublocalityvalue] = useState('');
  const [pincodevalue, setpincodevalue] = useState('');

  const selector = useSelector(state => state.home)
  const loadProducts = useSelector(state => state.loadProducts)
  const mavigationBarReducer = useSelector(state => state.mavigationBar)
  const locationPopupState = useSelector(state => state.locationPopup)
  const sendOtpApiResponse = useSelector(state => state.login)
  const [Megamainmenu, setMegamainmenu] = useState([]);
  const [sub, setSub] = useState([]);
  const [hideMenu, setHideMenu] = useState(false);
  const [CartData, setCart] = useState({})
  // const [text, settext] = useState('')
  const [wishlistdata, setwishlistdata] = useState(0)
  const [enblesuggestion, setenblesuggestion] = useState(false)
  // const [closebar, setClosebar] = useState(false)
  const [serchlist, setserchlist] = useState(false)
  const [divenable, setdivenable] = useState(false)
  const [searchenable, setSearchenable] = useState(false)
  // const [enablecollapse, setenablecollapse] = useState(false)
  // const [wishcount, setwishcount] = useState(0)
  const [isActive, setisActive] = useState(false)
  const [defaultlocdata, setdefaultlocdata] = useState([])
  const [popup, setpopup] = useState(false)
  const [AccountName, setAccountName] = useState('')
  const [isLogin, setIsLogin] = useState(false);
  const [anchorshow, setAnchorshow] = useState(false);
  const [warnmsg, setWarnmsg] = useState('')
  const [successStatus, setSuccessStatus] = useState(false)
  const [showLogOutPopUP, setShowLogOutPopUP] = useState(false);
  //const prevlocation = useLocation();
  // const checkValues = ["/"];
  // const [productdata, setproductdata] = useState(countdata);
  // const [showSideDrawer, setshowSideDrawer] = useState(false);
  const ref = useRef()
  // const dataReducer = useSelector(state => state)
  console.log("CartData", CartData);
  // console.log("mavigationloadProducts", loadProducts);
  const dispatch = useDispatch()
  // console.log("props.menu", props);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setPLPCat(localStorage.getItem('PLPCat'));
      setPLPparenturl(localStorage.getItem('PLPparenturl'));
      setlastVisitedUrl(localStorage.getItem('lastVisitedUrl'));
      setsearch(localStorage.getItem('search'));
      setsearchmob(localStorage.getItem('searchmob'));
      setlength(localStorage.getItem('length'));
      setCustGUID(localStorage.getItem('CustGUID'));
      setUserFirstName(localStorage.getItem('UserFirstName'));
      setsublocalityvalue(sublocalityvalue);
      setpincodevalue(pincodevalue);
    }
  },[])

  useEffect(() => {
    if (props !== undefined) {
      setMegamainmenu(props.menu);
      setCart(props.CartData)
      setwishlistdata(props.wishlistdata)
    }
  }, [props]);
  useEffect(() => {
    // setenblesuggestion(false)
    if (mavigationBarReducer !== undefined) {
      console.log(`rohit search--${JSON.stringify(mavigationBarReducer.dblist.length)}`);
      setserchlist(mavigationBarReducer.dblist)
      if (mavigationBarReducer.dblist && mavigationBarReducer.dblist.length > 0) {
        // setenblesuggestion(true)
      }
    }
  }, [mavigationBarReducer])
  useEffect(() => {
    if (selector !== undefined) {
      setCart(selector.allCartData)
    }
  }, [selector]);
  // useEffect(() => {
  //   if (loadProducts !== undefined) {
  //     const wishListCount = loadProducts.updateWishlistData
  //     setwishlistdata(wishListCount.length)
  //   }
  // }, [loadProducts]);
  useEffect(() => {
    if (Megamainmenu && Megamainmenu !== undefined) {
      const menu = Megamainmenu.find(res => res.WebPageId === 99);
      if (menu) {
        // console.log("menu", menu);
        setSub(menu.SubMenus.filter((month, idx) => idx < 8));
      }
    }
  }, [Megamainmenu])
  useEffect(() => {
    if (sub !== undefined) {
      if (sub.length > 7) {
        setHideMenu(true)
      }
    }
  }, [sub])
  useEffect(() => {
    if (hideMenu !== undefined) {
      setSub(sub.slice(0, 8))
    }
  }, [hideMenu])
  // console.log("productdata..", productdata)
  function productlistpage(pageurl, patrentcaturl) {
    setdivenable(true)
    // console.log('pmyy', 'pageurl', pageurl, 'patrentcaturl', patrentcaturl);
    localStorage.setItem('PLPCat', pageurl)
    localStorage.setItem('PLPparenturl', patrentcaturl)
    //return router.push(`/${pageurl}`, { isURLChange: pageurl })
  }
  function productlistpage1(pageurl, patrentcaturl) {
    setdivenable(true)
    // console.log('pmyy', pageurl[0], patrentcaturl);
    localStorage.setItem('PLPCat', pageurl)
    localStorage.setItem('PLPparenturl', patrentcaturl)
    //return router.push(`/${pageurl}`, { isURLChange: pageurl })
  }
  // function productlistpagemain(patrentcaturl) {
  //   // localStorage.setItem('PLPCat', pageurl)
  //   // localStorage.setItem('PLPparenturl', patrentcaturl)
  //   // return router.push(`/Subcategory/${patrentcaturl}`, { isURLChange: patrentcaturl })
  // }
  /* const getsuggestedlist = () => {
    const searchText = document.getElementById('search').value
    // console.log('test', /[^a-zA-Z0-9\-\/]/.test(searchText))
    if (/[^a-zA-Z0-9\-\/ ]/.test(searchText) === true) {
      toast('Please enter valid search text');
      document.getElementById("search").value = "";
    }
    if (/[^a-zA-Z0-9\-\/ ]/.test(searchText) === false) {
      // alert('152')
      dispatch(dbAutosuggestionlist(searchText))
      //SearchAPI.getDBautosuggestlist(searchText).then(res => {
      //  setserchlist(res)
        //return searchResultData;
      //});
      setenblesuggestion(true)
    }
  } */
  const handleSearchKeyUp = () => {
    console.log(`search keyword${document.getElementById('search').value}`);
    // const strRegex = new RegExp(/^[a-z0-9]+$/i);
    // let result = strRegex.test(document.getElementById('search').value); 
    if (document.getElementById('search').value && document.getElementById('search').value !== "") {
      // setenblesuggestion(true)
    } else {
      // setenblesuggestion(false)
    }
  }
  const getsuggestedlist = () => {
    if (document.getElementById('search').value) {
      // const searchText = document.getElementById('search').value
      //clearTimeout(timeout);
    let timeout = setTimeout(function () {
      const searchText = document.getElementById('search').value
      // console.log('test', /[^a-zA-Z0-9\-\/]/.test(searchText))
      if (/[^a-zA-Z0-9\-\/ ]/.test(searchText) === true) {
        toast('Please enter valid search text');
        document.getElementById("search").value = "";
      }
      if (/[^a-zA-Z0-9\-\/ ]/.test(searchText) === false) {
        // alert('152')
        dispatch(dbAutosuggestionlist(searchText))
        setenblesuggestion(true)
        /* SearchAPI.getDBautosuggestlist(searchText).then(res => {
          setserchlist(res)
          //return searchResultData;
        }); */
        // setenblesuggestion(true)
      }
    }, 2000); }
  }
  /* useEffect(() => {
    if (text !== '') {
      //   localStorage.setItem('search', document.getElementById('search').value)
      // router.push('/product/')
    }
  }, [text]) */
  function redirectToLogin() {
    
    localStorage.setItem('lastVisitedUrl', router.asPath);
    router.push('/login')
  }
  function redirectToRegister() {
    router.push('/register')
  }
  const serchproduct = (e) => {
    e.preventDefault();
    console.log("chktext", document.getElementById('search').value)
    console.log("search function called");
    if (document.getElementById('search').value === '') {
      // toast('Please enter search text')
      setSuccessStatus(true)
      setWarnmsg("Please provide input for search")
      // alert('Please enter search text')
    } else {
      // console.log("search function called with value");
      localStorage.setItem('search', document.getElementById('search').value)
      document.getElementById('frmSearch').submit();
      // router.push('/Search')
    }
  }
  /** **** mobile search **** */
  const serchproductmobile = (e) => {
    e.preventDefault();
    console.log("chktextmob", document.getElementById('searchmob').value)
    console.log("search function called");
    if (document.getElementById('searchmob').value === '') {
      // toast('Please enter search text')
      setSuccessStatus(true)
      setWarnmsg("Please provide input for search")
      // alert('Please enter search text')
    } else {
      // console.log("search function called with value");
      localStorage.setItem('searchmob', document.getElementById('searchmob').value)
      document.getElementById('frmSearchmobile').submit();
      // router.push('/Search')
    }
  }
  const handleSearchKeyUpmob = () => {
    console.log(`search keyword${document.getElementById('searchmob').value}`);
    // const strRegex = new RegExp(/^[a-z0-9]+$/i);
    // let result = strRegex.test(document.getElementById('search').value); 
    if (document.getElementById('searchmob').value && document.getElementById('searchmob').value !== "") {
      // setenblesuggestion(true)
    } else {
      // setenblesuggestion(false)
    }
  }
  const getsuggestedlistmob = () => {
    if (document.getElementById('searchmob').value)
      // const searchText = document.getElementById('search').value
      clearTimeout(timeout);
    let timeout = setTimeout(function () {
      const searchText = document.getElementById('searchmob').value
      // console.log('test', /[^a-zA-Z0-9\-\/]/.test(searchText))
      if (/[^a-zA-Z0-9\-\/ ]/.test(searchText) === true) {
        toast('Please enter valid search text');
        document.getElementById("searchmob").value = "";
      }
      if (/[^a-zA-Z0-9\-\/ ]/.test(searchText) === false) {
        // alert('152')
        dispatch(dbAutosuggestionlist(searchText))
        setenblesuggestion(true)
        /* SearchAPI.getDBautosuggestlist(searchText).then(res => {
          setserchlist(res)
          //return searchResultData;
        }); */
        // setenblesuggestion(true)
      }
    }, 2000);
  }
  /* const products = (skuname) => {
     // router.push(`/product/${skuname}`, { state: { skuname } })
     // console.log("skuname==============", skuname);
     // router.push(`/product/${skuname}`, { state: { skuname } })
     // dispatch(getproducts(skuname))
     // setenblesuggestion(false)
     // localStorage.setItem('PageUrl', window.btoa(skuname))
     // router.push('/product')
     // if (mavigationBarReducer && mavigationBarReducer.searchsku && mavigationBarReducer.searchsku.skuListingModels) {
     //   localStorage.setItem('PageUrl', window.btoa(mavigationBarReducer.searchsku.skuListingModels[0].PageUrl))
     //   router.push('/product')
     // }
     // router.push('/product')
     // setenblesuggestion(false)x
   } */
  // useEffect(() => {
  //   if (mavigationBarReducer && mavigationBarReducer.searchsku && mavigationBarReducer.searchsku.skuListingModels) {
  //     localStorage.setItem('PageUrl', window.btoa(mavigationBarReducer.searchsku.skuListingModels[0].PageUrl))
  //     // router.push('/product')
  //   }
  // }, [mavigationBarReducer])
  const handleclass = () => {
    setisActive(true)
    dispatch(mobilefilterIcon(true))
    // console.log("chkvalue...", isActive)
  }
  const enablesearchbar = () => {
    setSearchenable(true)
  }
  const disablesearchbar = () => {
    setSearchenable(false)
  }
  const enablediv = () => {
    setdivenable(true)
  }
  const disablediv = () => {
    setdivenable(false)
  }
  const disablehandleclass = () => {
    setisActive(false)
    dispatch(mobilefilterIcon(false))
  }
  // const collapse = () => {
  //   setenablecollapse(true)
  // }
  function loadwishlist() {
    if (localStorage.getItem('CustGUID') === null) {
      router.push('/login')
    } else {
      router.push('/wishlist')
    }
  }
  // useEffect(()=>{
  //   console.log("skuname==============",pageUrlsave);
  //   localStorage.setItem('PageUrl', window.btoa(pageUrlsave))
  //   // router.push('/product')
  // },[pageUrlsave])
  // console.log('comlength', localStorage.getItem('Comapredatalength'));
  //  const [countafterdelete]=localStorage.getItem('countafterdelete')&& localStorage.getItem('countafterdelete')
  //  console.log("countafterdelete",countafterdelete);
  // console.log("props.wishlistdata", props.wishlistdata);
  // console.log("sub menus", sub);
  // {sub.map(itm => (
  //   <li className="mega-parent">
  //     {/* <button type='button' onClick={() => productlistpage(itm.PageUrl)}> */}
  //     <Link onClick={() => productlistpage1(itm.SubSubMenus.map(subItm => subItm.PageUrl), itm.PageUrl,)} >
  //       {itm.DisplayName}
  //     </Link>
  //     {/* </button> */}
  //     <span className="lnr lnr-chevron-down"></span>
  //     <ul className="dropdown">
  //       {itm.SubSubMenus.map(subItm => (
  //         <li>
  //           <Link onClick={() => productlistpage(subItm.PageUrl, itm.PageUrl)}>
  //             {subItm.DisplayName}
  //           </Link>
  //         </li>
  //       ))}
  //     </ul>
  //   </li>
  // ))}
  /* useEffect(() => {
    if (localStorage.getItem('length') === undefined) {
      setwishcount(0 + 0)
    }
  }, [localStorage.getItem('length') === undefined]) */
  /* const submenuedit = sub.map(data => (
    data
  )) */
  /* const subsubmenuedit = submenuedit.map(item => (
    item.SubSubMenus
  )) */
  // console.log("savecarttotal", submenuedit, subsubmenuedit, wishcount);
  function renderlocation() {
    setpopup(true)
    // console.log("locationPopupState.flag==========", locationPopupState.flag);
    // if (locationPopupState && locationPopupState.flag === true) {
    //   dispatch(getlocationtitle(locationPopupState.locationname, locationPopupState.pincode, false))
    // }
    // else if (locationPopupState && locationPopupState.flag === false) {
    //   dispatch(getlocationtitle(locationPopupState.locationname, locationPopupState.pincode, false))
    // }
    // else {
    //   dispatch(getlocationtitle(defaultlocdata.DefaultDeliveryLocality_Area, defaultlocdata.DefaultDeliveryLocality_Pincode, false))
    // }
  }
  function fetchToggle() {
    setpopup(false)
    // dispatch(getlocationtitle('','',true))
    if (locationPopupState && locationPopupState.flag === true) {
      // dispatch(getlocationtitle(locationPopupState.locationname, locationPopupState.pincode, true))
    }
    // setlogoutpopup(false)
  }
  
  useEffect(() => {
    LocationApi.GoogleApi({})
      .then(response => {
        const data = response
        setdefaultlocdata(data)
      })
    CustomsAPI.getwishlist({})
      .then(response => {
        // console.log("header wish count=", response)
        setwishlistdata(response.length);
        localStorage.setItem('length', response.length)
        // toast(response)
      })
    // alert('sendOtpApiResponse ---' + sendOtpApiResponse)
    if (localStorage.getItem('CustGUID') !== null) {
      setIsLogin(true)
      // alert('gretings' + greetings())
      // setAccountName(`Hi ${(localStorage.getItem('UserFirstName'))}`)
      if (localStorage.getItem('UserFirstName') === null || localStorage.getItem('UserFirstName') === 'null') {
        setAccountName(`Hi ${(greetings())}`)
      } else {
        setAccountName(`Hi ${localStorage.getItem('UserFirstName')}`)
      }
      // alert(`User First Name${ typeof localStorage.getItem('UserFirstName') }${localStorage.getItem('UserFirstName')}`)
    }
    else {
      setAccountName('My Account')
    }
  }, [])
  const greetings = () => {
    const myDate = new Date();
    const hrs = myDate.getHours();
    let greet;
    if (hrs < 12) {
      greet = 'Good Morning';
    } else if (hrs >= 12 && hrs <= 17) {
      greet = 'Good Afternoon';
    } else if (hrs >= 17 && hrs <= 24) {
      greet = 'Good Evening';
    }
    return greet;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  useEffect(() => {
    // sendOtpApiResponse && sendOtpApiResponse.customerlogindata && setAccountName(`Hi ${sendOtpApiResponse.customerlogindata.FirstName}`)
    // if (sendOtpApiResponse && sendOtpApiResponse.customerlogindata) {
    //   setAccountName(`Hi ${(greetings())}`)
    // }
    if (localStorage.getItem('CustGUID') !== null) {
      setIsLogin(true)
      if (localStorage.getItem('UserFirstName') === null || localStorage.getItem('UserFirstName') === 'null') {
        // alert('360')
        setAccountName(`Hi ${(greetings())}`)
      } else {
        setAccountName(`Hi ${localStorage.getItem('UserFirstName')}`)
      }
    }
  }, [sendOtpApiResponse])
  // const wishlist=useSelector(state => state)
  function logoutPopUp() {
    setShowLogOutPopUP(!showLogOutPopUP)
    // setIsLogin(false)
    setAnchorshow(false)
  }
  function renderLogout() {
    // localStorage.removeItem('CustGUID')
    // localStorage.removeItem('UserFirstName')
    // localStorage.removeItem('CartGUID')
    // localStorage.removeItem('CartGUID')
    localStorage.clear()
    router.push('/')
    history.go(0)
  }
  const handledropdownclass = () => {
    setAnchorshow(!anchorshow)
  }
  // function closePopup() {
  //   setShow(true)
  // }
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (enblesuggestion && ref.current && !ref.current.contains(e.target)) {
        setenblesuggestion(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [enblesuggestion])
  const handlepopupflow = () => {
    // setshowSideDrawer(true);
    // dispatch(homepagecartIcon(true))
    // console.log("chkcartvalue...", carticon)
    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    // if (typeof window != 'undefined' && window.document) {
    // document.body.style.overflow = 'hidden';
    document.body.classList.add('scroll-only-cart');
    // }
  }
  /*useEffect(() => {
    setInterval(() => {
      setSuccessStatus(false)
    }, 5000);
  }, [closemsg])
  const closemsg = () => {
  }*/
  // console.log("locationPopupState.flag", locationPopupState);
  return (
    <>
      {/* {
        checkValues.some(el => location.pathname.includes(el)) ? "" : ""
      } */}
      <ToastContainer />
      {successStatus && <Success msg={warnmsg} isError close={closemsg} />}
      <div className="header-middle " key='nav'>
        <Link href="#nav"
          onClick={handleclass}
          className={isActive ? 'active mobilefilter' : 'mobilefilter'}
          style={{ left: 'auto', cursor: 'pointer' }}>
          <i className={isActive ? '' : 'fa fa-filter'}></i>
        </Link>
        <Link href="#nav"
          onClick={enablesearchbar}
          className={searchenable ? 'meanmenu-search  mobile-nav-menu-search' : 'mobile-nav-menu-search'} style={{ Right: '0px', Left: 'auto', textAlign: 'center', textIndent: '0px', fontSize: '18px' }}>
          <i className={searchenable ? '' : "fa fa-search"}></i>
        </Link>
        {/* <Link href className="searchx">
          <i className="fa fa-search" />
        </Link> */}
        <Link href="#nav"
          onClick={enablediv}
          className={divenable ? 'meanmenu-reveal  mobile-nav-menu' : ' mobile-nav-menu'} style={{ Right: '0px', Left: 'auto', textAlign: 'center', textIndent: '0px', fontSize: '18px' }}>
          <i className={divenable ? '' : "fa fa-bars"}></i>
        </Link>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="logo-block">
              <div className="logo">
                <Link href="/">
                  <img referrerPolicy='no-referrer' src="/assets1/img/icon/adibuja-logo.svg" alt="brand-logo" width="200" height="60" />
                </Link>
              </div>
            </div>
            {/* <Header /> */}
            {popup === true ?
              <LocationPopup data={defaultlocdata} popup={popup} fetchToggle={fetchToggle} />
              : null}
            <div className='deliver-to-block'>
              <div className="togglecity" >
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {locationPopupState === undefined || locationPopupState && locationPopupState.flag === false ?
                  defaultlocdata && <span data-me='first' id="cityName" style={{ cursor: 'pointer' }} onClick={renderlocation}>
                    {sublocalityvalue && sublocalityvalue.trim() !== "" ? sublocalityvalue : defaultlocdata.DefaultDeliveryLocality_Area} {pincodevalue && pincodevalue !== "" ? pincodevalue : defaultlocdata.DefaultDeliveryLocality_Pincode}
                  </span> :
                  <>{locationPopupState && locationPopupState.flag === true ? <span data-me='second' id="cityName" style={{ cursor: 'pointer' }} onClick={renderlocation}>
                    {sublocalityvalue && sublocalityvalue.trim() !== "" ? sublocalityvalue : locationPopupState.locationname}  {pincodevalue && pincodevalue !== "" ? pincodevalue : locationPopupState.pincode}
                  </span> : null}</>
                }
              </div>
            </div>
            <div className="search-block order-sm-last searchboxlayout websearch">
              <div className="header-middle-inner showform" id="searchDiv">
                <form action="/Search" id="frmSearch" style={{ position: 'relative' }} onSubmit={serchproduct}>
                  <input
                    type="text"
                    className="top-cat-field txt-global-product-search ui-autocomplete-input"
                    placeholder="Search entire store here"
                    id="search"
                    // enterKeyPressed={serchproduct}
                    // enterKeyPressed={(e) => serchproduct(e)
                    // }
                    onKeyUp={() => handleSearchKeyUp()}
                    onChange={getsuggestedlist}
                  />
                  <span>
                    <button
                      type="submit"
                      className="lnr lnr-magnifier"
                      id="searchbutton"
                      // onKeyUp={serchproduct}
                      // onClick={serchproduct}
                      style={{ cursor: 'pointer' }}>
                    </button>
                  </span>
                  {/* <button className="top-search-btn" id="searchbutton"
                    onKeyUp={serchproduct}
                    onClick={serchproduct} >Search</button> */}
                </form>
                {enblesuggestion && serchlist && serchlist.length > 0 ?
                  <ul id="ui-id-1" className="ui-menu ui-widget ui-widget-content ui-autocomplete ui-front" ref={ref}
                    style={{ display: 'block', top: '42px', left: '15px', height: '400px', overflow: 'hidden auto', zindex: '99999', width: '522px' }}
                  >
                    {serchlist.map(data =>
                      <Link href={`/product/${data.PageUrl}`} className="ui-menu-item"
                      // <Link  className="ui-menu-item"
                      ><div id="ui-id-38" tabIndex="-1"
                          className="ui-menu-item-wrapper">{data.SkuName}</div></Link>
                    )}</ul>
                  : null}
              </div>
            </div>
            <div className="menu-list-block order-lg-last">
              <div className="mini-cart-option">
                <ul>
                  <li className='settings'>
                    <noscript></noscript>
                    <a className="ha-toggle myaccounthelip" href title="My Account" onClick={handledropdownclass}>
                      <span className="lnr lnr-user cursor-pointer"></span>&nbsp;
                      <div className='menu-txt cursor-pointer' id='accountNameId'>
                        {AccountName}
                      </div></a>
                    {/* <NavDropdown title={AccountName}> */}
                    {/* <NavDropdown title={props.userdata.googlesignindata ? `Hi ${props.userdata.googlesignindata.givenName}` : "My Account"} id="header-nav-dropdown"> */}
                    <ul
                      className={anchorshow ? 'box-dropdown ha-dropdown hide-dropdown' : 'box-dropdown ha-dropdown'}
                      style={anchorshow ? { display: 'block' } : { display: 'none' }}>
                      {!isLogin && (<>
                        <li>
                          <a href="#" onClick={redirectToLogin}>
                            <i className="lnr lnr-enter" aria-hidden="true"></i>&nbsp; Login
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={redirectToRegister}>
                            <i className="lnr lnr-user" aria-hidden="true"></i>&nbsp; Register
                          </a>
                        </li>
                      </>)}
                    </ul>
                    {isLogin && (
                      <ul className={anchorshow ? 'box-dropdown ha-dropdown hide-dropdown' : 'box-dropdown ha-dropdown'}
                        style={anchorshow ? { display: 'block' } : { display: 'none' }}>
                        <li className='cursor-pointer'>
                          <a href="/account/dashboard">
                            <span className="lnr lnr-chart-bars" aria-hidden="true"></span>&nbsp;Dashboard
                          </a>
                        </li>
                        <li>
                          <a href="/account/myorders">
                            <span className="lnr lnr-cart" aria-hidden="true"></span>&nbsp;My Order
                          </a>
                        </li>
                        <li>
                          <a href="/account/reorder">
                            <span className="lnr lnr-history" aria-hidden="true"></span>&nbsp;Reorder
                          </a>
                        </li>
                        <li>
                          <a href="/account/savedcartlist">
                            <span className="lnr lnr-pushpin" aria-hidden="true"></span>&nbsp;Saved Cart
                          </a>
                        </li>
                        <li>
                          <a href="/Wishlist">
                            <span className="lnr lnr-heart" aria-hidden="true"></span>&nbsp;My Wishlist
                          </a>
                        </li>
                        <li>
                          <a href="/account/profile">
                            <span className="lnr lnr-user" aria-hidden="true"></span>&nbsp;Profile
                          </a>
                        </li>
                        <li>
                          <a href="/account/manageaddress">
                            <span className="lnr lnr-map-marker" aria-hidden="true"></span>&nbsp;Manage Addresses
                          </a>
                        </li>
                        <li>
                          <a href="/account/myorders">
                            <span className="lnr lnr-location" aria-hidden="true"></span>&nbsp;Track Order
                          </a>
                        </li>
                        <li>
                          <a href="/account/changepassword">
                            <span className="lnr lnr-lock" aria-hidden="true"></span>&nbsp;Manage Password
                          </a>
                        </li>
                        <li className='cursor-pointer'>
                          <a onClick={logoutPopUp}
                            // renderLogout
                            href>
                            <span className="lnr lnr-exit" aria-hidden="true"></span>&nbsp;Logout
                          </a>
                        </li>
                      </ul>
                    )}
                    {/* </NavDropdown> */}
                  </li>
                  <li className="compare">
                    {/* <Link className="ha-toggle" to="/products/compare">
                       <FontAwesomeIcon icon={faSync} />
                       <span className="count" id="compareCount">
                         0
                       </span>
                       Product Compare
                     </Link>
                      */}
                    <Link className="ha-toggle" href="/compare">
                      <span className="lnr lnr-sync "></span>
                      <span className={loadProducts && (loadProducts.comaprelist).length > 0 ? 'count' : 'nocount'}>
                        {loadProducts && loadProducts.comaprelist && (loadProducts.comaprelist).length !== undefined && (loadProducts.comaprelist).length > 0 ? (loadProducts.comaprelist).length : ''}
                        {/* {countafterdelete.length} */}
                      </span>
                      <div className='menu-txt'>
                        Compare
                      </div>
                    </Link>
                  </li>
                  <li className="wishlist" style={{ cursor: 'pointer' }}>
                    <a className="ha-toggle" href onClick={loadwishlist}>
                      <span className='lnr lnr-heart' ></span>
                      {/* <FontAwesomeIcon icon={faHeart} /> */}
                      <span className={props.wishlistdata > 0 ? 'count' : 'nocount'}>
                        {props && props.wishlistdata !== undefined && props.wishlistdata > 0 ? wishlistdata : ''}
                        {/* {localStorage.getItem('length') !== undefined ? localStorage.getItem('length') : wishcount } */}
                        {console.log("props..", props)}
                      </span>
                      {/* :<span className="count" id="wishlistcount">
                           0
                         </span>
                       } */}
                      <div className='menu-txt'>
                        Wishlist
                      </div>
                    </a>
                  </li>
                  <li className="my-cart cursor-pointer newCardListBox"
                    id="cart_header"
                    onClick={handlepopupflow}
                  // onClick={() => dispatch(isOpenMyCartAction(true))}
                  // open={showSideDrawer} 
                  >
                    <a className="ha-toggle" href onClick={() => dispatch(isOpenMyCartAction(true))} >
                      <span className="lnr lnr-cart"></span>
                      <span className={CartData.count > 0 ? 'count' : 'nocount'}>
                        {CartData && CartData.count !== undefined && CartData.count > 0 ? CartData.count : ''}
                      </span>
                      <div className='menu-txt'>
                        Cart
                      </div>
                    </a>
                    {CartData !== undefined && mavigationBarReducer && mavigationBarReducer.isOpenMyCart && <Cart cartData={CartData.count === 0 ? [] : CartData.cart} Total={CartData.subtotal}></Cart>
                    }
                    {/* {selector.allCartData.count === 0 && <Rendercartlist />} */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* start: showLogOutPopUP  */}
        {showLogOutPopUP &&
          <div className="modal show" id="RemoveCartItemModal" style={{ paddingRight: '17px', display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <button type="button" className="close" data-dismiss="modal" onClick={logoutPopUp}>×</button>
                  <div>
                    <ul>
                      <li><img src={cycling} alt='' style={{ width: '100px' }} /></li>
                      <li><p>Are you sure you want to logout?</p></li>
                      <li>
                        <button className="btn btn-secondary" type="button" onClick={renderLogout}>Yes</button>
                        <button className="btn btn-secondary" type="button" onClick={logoutPopUp}>No</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {/* end: showLogOutPopUP  */}
      </div >
      <div className="header-top-menu theme-bg sticker">
        <div className="container-fluid" style={{ borderTop: '1px #cccccc6e solid', }}>
          <div className="row">
            <div className="col-lg-12" >
              <div className="top-main-menu" id="main-menu">
                <div className="main-menu">
                  <div className="mean-push"></div>
                  {console.log("submenu==", sub)}
                  <nav id="mobile-menu" style={{ display: 'block' }}>
                    <ul >
                      {sub.map(itm => (
                        itm.SubSubMenus !== undefined && itm.SubSubMenus.length !== 0 &&
                        <li className="mega-parent">
                          {/* <button type='button' onClick={() => productlistpage(itm.PageUrl)}> */}
                          <Link href={`/${itm.SubSubMenus[0].PageUrl}`} onClick={() => productlistpage1(itm.SubSubMenus[0].PageUrl, itm.PageUrl,)} className='activeLinkmenu'>
                            {itm.DisplayName}
                          </Link>
                          {/* </button> */}
                          <span className="lnr lnr-chevron-down"></span>
                          <ul className="dropdown">
                            {itm.SubSubMenus.map(subItm => (
                              <li>
                                {/* <button type='button' onClick={() => productlistpage(subItm.PageUrl)}> */}
                                {/* <span type='button' onClick={productlistpage(itm.PageUrl)}> */}
                                {/* {subItm.DisplayName} */}
                                {/* </span> */}
                                {/* </button> */}
                                <Link href={`/${subItm.PageUrl}`} >
                                  {/* {itm.DisplayName} */}
                                  {subItm.DisplayName}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                      {hideMenu && (
                        <li>
                          <Link style={{ color: '#f76d5e', fontWeight: '600' }} href="/category-menu-list">
                            View More...</Link>
                        </li>)}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-12 d-block d-lg-none">
              <div className="mobile-menu mean-container">
                <div className="mean-bar">
                  <Link href="#nav"
                    onClick={disablehandleclass}
                    className={isActive ? 'closeactive mobilefilter' : 'mobilefilter'}
                    style={{ left: 'auto', cursor: 'pointer' }}>
                    <i className={isActive ? 'fa fa-close' : 'fa fa-filter'}></i>
                  </Link>
                  <Link href="#nav"
                    onClick={disablesearchbar}
                    className={searchenable ? 'meanmenu-search' : 'mobile-nav-menu-search'} style={{ Right: '0px', Left: 'auto', textAlign: 'center', textIndent: '0px', fontSize: '18px' }}>
                    <i className={searchenable ? 'fa fa-close' : "fa fa-search"}></i>
                  </Link>
                  <Link href="#nav"
                    onClick={disablediv}
                    className={divenable ? 'meanmenu-reveal' : 'mobile-nav-menu'} style={{ Right: '0px', Left: 'auto', textAlign: 'center', textIndent: '5px', fontSize: '18px' }}>
                    <i className={divenable ? 'fa fa-close' : 'fa fa-bar'}></i>
                  </Link>
                  {divenable ?
                    <nav className="mean-nav">
                      <ul style={{ display: 'block' }}>
                        {sub.map((itm) => (
                          <Menudropdown itm={itm} disablediv={disablediv} />
                        ))}
                        {hideMenu && (
                          <li>
                            <Link style={{ color: '#f76d5e', fontWeight: '600' }} href="/category-menu-list">
                              View More...</Link>
                          </li>)}
                        {/* <li className="mean-last"><Link style={{ color: '#f76d5e', fontWeight: '600' }} href="/category-menu-list"> View More...</Link></li> */}
                      </ul >
                    </nav > : null}
                </div >
              </div >
            </div >
          </div >
        </div >
      </div >
      {
        console.log('searchenable---', searchenable)
      }
      {
        searchenable === true ?
          <div className="search-block order-sm-last searchboxlayout position-relative">
            <div className="header-middle-inner-mob showformmob" id="searchDiv">
              <form action="/Search" id="frmSearchmobile" className='mobsearchbox' onSubmit={serchproductmobile}>
                <input
                  type="text"
                  className="top-cat-field txt-global-product-search ui-autocomplete-input"
                  placeholder="Search entire store here"
                  id="searchmob"
                  // enterKeyPressed={serchproduct}
                  // enterKeyPressed={(e) => serchproduct(e)
                  // }
                  onKeyUp={() => handleSearchKeyUpmob()}
                  onChange={getsuggestedlistmob}
                />
                <i>
                  <button
                    type="submit"
                    className="fa fa-search newSearch"
                    id="searchbutton"
                    // onKeyUp={serchproduct}
                    // onClick={serchproduct}
                    style={{ cursor: 'pointer' }}>
                  </button>
                </i>
                {/* <button className="top-search-btn" id="searchbutton"
                    onKeyUp={serchproduct}
                    onClick={serchproduct} >Search</button> */}
              </form>
              {enblesuggestion && serchlist && serchlist.length > 0 ?
                <ul id="ui-id-1" className="ui-menu ui-widget ui-widget-content ui-autocomplete ui-front" ref={ref}
                  style={{ display: 'block', top: '42px', left: '15px', height: '400px', overflow: 'hidden auto', zindex: '99999', width: '522px' }}
                >
                  {serchlist.map(data =>
                    <Link href={`/product/${data.PageUrl}`} className="ui-menu-item"
                    // <Link  className="ui-menu-item"
                    ><div id="ui-id-38" tabIndex="-1"
                        className="ui-menu-item-wrapper">{data.SkuName}</div></Link>
                  )}</ul>
                : null}
            </div>
          </div>
          :
          null
      }
    </>
  );
}
export default MavigationBar
