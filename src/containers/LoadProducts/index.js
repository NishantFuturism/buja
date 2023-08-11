/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-lonely-if */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/**
 *
 * LoadProducts
 *
 */
// import { Skeleton } from 'antd';
// import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@icon/linearicons/linearicons.css';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { useCookies } from "react-cookie";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-tooltip/dist/react-tooltip.css'
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector, } from 'react-redux';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../public/assets1/css/bundle.css';
import '../../../public/assets1/css/default.min.css';
// import '../../../assets/css/font-awesome.min.css';
import '../../../public/assets/css/responsive.min.css';
import '../../../public/assets/css/style.min.css';
import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';
import { toast } from 'react-toastify';
// import { defaultAction } from '../HomeScreen/actions';
import { Tooltip } from 'react-tooltip'
import { Carousel } from "react-bootstrap";
////import history from '../../utils/history';
import { useRouter } from 'next/router';
import AddToCart from '../AddToCart';
// import { getskuProductdetail } from '../ProductDetail/actions';
import { addToComapre, addTowishlist, enablequickreviw } from './actions';
import reducer from './reducer';
import saga from './saga';
import './Loadproduct.css';
// import topSeller from '../../images/top-selling.png'
// import topTrand from '../../images/top-tranding.png'
// import newArrival from '../../images/new-arrival.png'
// import featured from '../../images/featured.png'
// import dealofday from '../../images/deal-of-the-day.png'
// import Success from '../../components/ShowAlert/success';
// import { RecentlyViewProduct } from '../RecentlyViewProduct';
// import ReorderProduct from '../ReorderProduct';
// import mycartAPI from '../MainPage/api/mycartAPI';
// import { getRecentlyviewedproduct } from '../RecentlyViewProduct/actions';
export function LoadProducts(props) {
  // const [, setCookie,] = useCookies(['name']);
  // const { isListView, setisListView } = props;
  const router = useRouter();
  //console.log(`rohitaaaa${JSON.stringify(props)}`);
  const { isActive } = props;
  // console.log("isActive..", isActive)
  // const { addToCartFunc, closeMsgBarFunc } = props
  const [FirstCall, setFirstCall] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [ProdImg, setProdImg] = useState('');
  // const [selectItemDisp, setSelectItemDisp] = useState([]);
  // const [selectedproduct, setselectedproduct] = useState([]);
  //console.log(ProdImg);
  // const [showthumbnailimg, setShowThumbnailImg] = useState('false')
  // const [min, setmin] = useState('');
  // const [max, setMax] = useState('');
  // const [qty, setQty] = useState(0);
  // const [QtyCout, setQtyCout] = useState(1);
  // const [productcount, setproductcount] = useState()
  useInjectReducer({ key: 'loadProducts', reducer });
  useInjectSaga({ key: 'loadProducts', saga });
  // console.log('Loadproduct props=', props);
  // console.log('props.shppingcart=', props.shppingcart);
  // const homeScreen = useSelector(state => state.homeScreen);
  // console.log('loadproduct homeScreen=', homeScreen);
  const loadProducts = useSelector(state => state.loadProducts)
  // const SubcategoryState = useSelector(state => state.subcategory)
  //console.log("Loaddd..", loadProducts)
  // console.log("filterproduct..", filterproduct)
  // console.log("SubcategoryState..", SubcategoryState)
  // console.log('loadproducts homeScreen=', homeScreen);
  // console.log("skulisting", props.skulisting);
  const [Seleced, setSeleced] = useState('');
  // const [SelecedPackSize, setSelecedPackSize] = useState([]);
  // const [initialCall, setInitialCall] = useState(false);
  // const [skuname, setskuname] = useState('');
  // const [name, setname] = useState('');
  // const [initialCall, setInitialCall] = useState(false);
  // const addToCartRdcr = useSelector(state => state.addToCart)
  // const loadreducer = useSelector(state => state.loadProducts)
  // const [firstcall, setFirstCall] = useState(0);
  // const [filterprop, setfilterprop] = useState([]);
  // const [setCookie] = useCookies(["Product"]);
  // const [qty, setQty] = useState(0);
  // const [capping, setcapping] = useState(0);
  // const [QtyCout, setQtyCout] = useState(1);
  // const [data, setdata] = useState([]);
  const dispatch = useDispatch()
  // const filterlist = props !==
  const [filtered, setFiltered] = useState(props.data.FiltersList[0]);
  // const [skuID, setskuID] = useState('');
  // const [recent, setrecent] = useState(false);
  const [filtererror, setfiltererror] = useState(false);
  // const [notify, setnotify] = useState(false);
  // const loadProducts = useSelector(state => state.loadProducts)
  // const addToCartreducer = useSelector(state => state.addToCart)
  // const [show, setShow] = useState(false);
  // const [showmsg, setShowmsg] = useState('');
  // const [fill, setfill] = useState(false);
  // const [ setfiltererror] = useState(false);
  // const [skucode1, setskucode1] = useState([]);
  // console.log('homescreen', homeScreen, addToCartRdcr);
  // const [compareitem, setcompareitem] = useState('');
  // console.log('bbnn', loadProducts);
  // console.log('locader SubcategoryState=', SubcategoryState, addToCartreducer);
  // console.log("setFiltered loadproduct", filtered)
  // console.log("setFiltered Seleced", Seleced)
  const changeFltr = (newFL) => {
    setSeleced(newFL);
    const P = props.data.FiltersList.find(i => i.ListItem === newFL);
    //console.log("P97=", P);
    setFiltered(P);
    // setSelecedPackSize([...SelecedPackSize, ...newFL.toString()]);
    // localStorage.setItem('selectedPacksize', newFL)
  };
  // console.log("setSelecedPackSize==", SelecedPackSize);
  // useEffect(() => {
  //   if (loadProducts !== undefined) {
  //     setnotify(loadProducts.notify)
  //   }
  // }, [loadProducts])
  useEffect(() => {
    // setSeleced(localStorage.getItem('selectedPacksize'));
    let productFiltersPosition = 0;
    let lastSelectedVariant = "";
    if (props.shppingcart && props.shppingcart !== "" && props.data.FiltersList[1]) {
      const sortShoppingCartArray = props.shppingcart.sort((a, b) => a.ShoppingCartItemId - b.ShoppingCartItemId);
      for (var i = 0; i < sortShoppingCartArray.length; i += 1) {
        const shoppingCartItemId = sortShoppingCartArray[i].SKUFilterPriceId;
        for (var j = 0; j < props.data.FiltersList.length; j += 1) {
          const filterListItemId = props.data.FiltersList[j].SKUFilterPriceId;
          if (filterListItemId === shoppingCartItemId) {
            productFiltersPosition = j;
            lastSelectedVariant = props.data.FiltersList[j].ListItem;
            break;
          }
        }
      }
      setSeleced(lastSelectedVariant)
      //console.log('coming here1')
      setFiltered(props.data && props.data.FiltersList[productFiltersPosition])
    } else {
      //console.log('coming here2')
      setFiltered(props.data && props.data.FiltersList[0])
    }
    // setFiltered(props.data && props.data.FiltersList[0])
  }, [])
  useEffect(() => {
    if (props.data.FiltersList[0] === undefined) {
      setfiltererror(true)
    }
  }, [])
  // useEffect(() => {
  //   mycartAPI.getShoppingcartDetails()
  //     .then(response => {
  //       console.log('uuuuusss', response)
  //       setShoppingCart(response)
  //     })
  //     .catch(error => {
  //       console.log('error:::', error);
  //     });
  // }, [SubcategoryState])
  // useEffect(() => {
  //   mycartAPI.getShoppingcartDetails()
  //     .then(response => {
  //       console.log('uuuuusss', response)
  //       setShoppingCart(response)
  //     })
  //     .catch(error => {
  //       console.log('error:::', error);
  //     });
  // }, [SubcategoryState])
  //   if (loadreducer && loadreducer.IsMsgBar === true) {
  //     setfill(true)
  //   }
  // }, [loadreducer])
  // useEffect(() => {
  //   if (skucode.length === 0) {
  //     setInitialCall(true)
  //     console.log('w',);
  //     setname(skuname)
  //   } else {
  //     setInitialCall(false)
  //   }
  // }, [])
  // function NotifyMe() {
  //   dispatch(notifyMeAction(filtered.SKUFilterPriceId))
  // }
  // useEffect(() => {
  //   // console.log('homeScreen', homeScreen);
  //   if (loadProducts !== undefined && shoppingCart !== undefined) {
  //     // const loadShop = loadProducts.shoppingCartDetails
  //     // const arr = [...shoppingCart, ...loadShop]
  //     setShoppingCart(loadProducts.shoppingCartDetails)
  //     // console.log('loadProducts loadProducts', shoppingCart, loadShop);
  //   }
  // }, [])
  // useEffect(() => {
  //   if (homeScreen !== undefined) {
  //     setShoppingCart(homeScreen.shoppingCartDetails)
  //   }
  // }, [homeScreen,])
  // function IncrementDecrementCart(action) {
  //   if (action === 'inc') {
  //     setQty(qty + QtyCout)
  //     addToCartFunc(qty + 1, props.data.SkuId, filtered.SKUFilterPriceId)
  //     setTimeout(() => {
  //       closeMsgBarFunc()
  //     }, 5000)
  //   }
  //   if (action === 'dec') {
  //     setQty(qty - QtyCout)
  //     addToCartFunc(qty - 1, props.data.SkuId, filtered.SKUFilterPriceId)
  //     setTimeout(() => {
  //       closeMsgBarFunc()
  //     }, 5000)
  //   }
  // }
  // const QtyCoutFun = (e) => {
  //   setQtyCout(1)
  // }
  useEffect(() => {
    if (props.shppingcart !== undefined) {
      setShoppingCart(props.shppingcart)
    }
  }, [props.shppingcart])
  // useEffect(() => {
  //   // console.log('homeScreen', homeScreen);
  //   if (props.skulisting === true && addToCartRdcr !== undefined) {
  //     setShoppingCart(addToCartRdcr.shoppingcartDetails)
  //   }
  // }, [addToCartRdcr, homeScreen])
  useEffect(() => {
    setFirstCall(FirstCall + 1)
  }, [])
  /* useEffect(() => {
    if (props !== undefined && props.data !== undefined) {
      setFiltered(props.data.FiltersList && props.data.FiltersList[0])
      // setSeleced(props.data.FiltersList && props.data.FiltersList[0].ListItem)
    }
  }, [props,]) */
  function AddToWishlist(filter) {
    // console.log('bbnn', loadProducts);
    if (localStorage.getItem('CustGUID') === null) {
      router.push('/login')
    } else {
      dispatch(addTowishlist(filter.SkuDetailId, filter.SKUFilterPriceId))
      // setShowmsg()
      // console.log("msgchk..", loadProducts.receivemsg)
      // setShowmsg(loadProducts.receivemsg)
      // setShow(true)
      // console.log("chkwishlist..", loadProducts)
      // setShowmsg(loadProducts.receivemsg)
      // setShow(true)
    }
  }
  // useEffect(() => {
  //   console.log('bbnn', loadProducts);
  //   if (loadProducts !== undefined && loadProducts.receivemsg) {
  //     console.log("responsemsg..", loadProducts.receivemsg)
  //     setShowmsg(loadProducts.receivemsg)
  //     setShow(true)
  //   }
  // }, [loadProducts])
  // useEffect(() => {
  //   // const arr = []
  //   // console.log('skucode', skucode, skucode.indexOf(skuname));
  //   // const array = skucode
  //   // if (!initialCall && !array.includes(name)) {
  //   //   array.push(skuname);
  //   // }
  //   // console.log('skuname', localStorage.getItem('skuproduct'));
  //   // console.log('skuid', localStorage.getItem('skuproductID'));
  //   // if ( )
  //   // if (!skucode.includes(skucode)) {
  //   //   console.log('✅ array contains apple');
  //   //   skucode.push(props.index)
  //   // }
  //   // const uniqueNames = Array.from(new Set(skucode));
  //   // console.log('hhjj', uniqueNames);
  //   // if ()
  // }, [])
  // function removedoubleComma(string) {
  //   return string.replace(',', ',')
  // }
  // function removedoubleComma(string) {
  //   return string.replace(',,', ',')
  // }
  // useEffect(() => {
  //   // localStorage.setItem('skuproductID', skuID)
  //   if (compared === true) {
  //     localStorage.setItem('skuproduct', skucode)
  //   }
  // }, [compared])
  // function removeFromString(stringValue = '', SkuCode) {
  //   let str = stringValue.replace(SkuCode, '')
  //   str = removedoubleComma(str)
  //   if (str.startsWith(',')) {
  //     str = str.substring(1, str.length)
  //     return str
  //   }
  //   return str
  // }
  // toast.configure();
  function AddToCompare(SkuCode, PageUrl) {
    // setrecent(true)
    let compare = []
    compare = localStorage.getItem('skuproduct')
    // console.log("skupro..", skuproduct)
    // console.log('compare', compare, !compare.includes(SkuCode));
    if (compare && !compare.includes(SkuCode)) {
      if (compare === '') {
        compare += `${SkuCode}`
        // setShowmsg(loadProducts.addToCartMsg)
        // console.log('Product added to compare list successfully')
      }
      else {
        compare += `,${SkuCode}`
        // console.log('Product added to compare list successfully')
      }
      // console.log('comparxxe', compare);
      localStorage.setItem('skuproduct', compare)
      // dispatch(getrecent(compare))
      // dispatch(defaultAction(compare))
      // const mySubString = ",";
      // const count = localStorage.getItem('skuproduct').split(mySubString).length - 1;
      router.push(`/product/${PageUrl}`, { skuUrl: PageUrl })
      localStorage.setItem('PageUrl', window.btoa(PageUrl))
      // if (count === 3) {
      //   // alert('You have reached your maximum limit')
      // } else {
      // dispatch(addToComapre(localStorage.getItem('skuproduct')))
    }
    // } else {
    //   alert('Already added')
    // }
  }
  const AddToCompare1 = (SkuCode) => {
    //console.log("load..", loadProducts)
    // console.log("skuid..", (loadProducts.comaprelist).SkuId)
    // const finalseletItem = [selectItemDisp, ...SkuCode];
    // const uniqueNames = finalseletItem.filter((val, id, disparray) => disparray.indexOf(val) == id);
    // setSelectItemDisp(uniqueNames);
    const compare = localStorage.setItem('skuproduct1', SkuCode)
    //console.log('compare..', compare)
    if ((loadProducts.comaprelist).length <= 2) {
      dispatch(addToComapre(localStorage.getItem('skuproduct1')))
      toast("Product added to compare list successfully")
      // setShow(true);
      // setShowmsg("Product added to compare list successfully")
    }
    else {
      toast('You have reached your maximum limit to compare items')
    }
  }
  function LoadProduct(event, PageUrl) {
    //console.log("eventttt", event);
    // console.log("PageUrl", PageUrl);
    dispatch(enablequickreviw(true, PageUrl))
    localStorage.setItem('PageUrl', window.btoa(PageUrl))
    event.stopPropagation();
    // dispatch(getskuProductdetail(window.atob(localStorage.getItem('PageUrl'))))
  }
  // const productdetail = (PageUrl, SkuId) => {
  // useEffect(() => {
  // if (skucode.length === 0
  // ) {
  //   setInitialCall(true)
  // } else {
  //   setInitialCall(false)
  // }
  // if (FirstCall > 0 && !initialCall) {
  // const mySubString = ",";
  // const count = (localStorage.getItem('skuproduct')).split(mySubString).length - 1;
  // console.log('count', count);
  // if (count === 3) {
  //   alert('max limit')
  // } else {
  // }
  // }, [])
  // console.log('as', localStorage.getItem('skuproduct'));
  // console.log('aSs', localStorage.getItem('skuproductID'));
  // console.log("props.data", props.data, props.data.PageUrl, props);
  function LoadProductPDP(PageUrl) {
    // history.push(`/product/${PageUrl}`, { state: { PageUrl } })
    //   console.log("PageUrl", PageUrl);
    // console.log("window.btoa(PageUrl)=", window.btoa(`/product/${PageUrl}`), window.btoa(PageUrl));
    localStorage.setItem('PageUrl', window.btoa(PageUrl))
    // dispatch(getskuProductdetail(window.atob(localStorage.getItem('PageUrl'))))
  }
  // useEffect(() => {
  //   setInterval(() => {
  //     setShow(false)
  //   }, 3000);
  // }, [closemsg])
  // const closemsg = () => {
  // }
  // console.log("product URL=", props.data);
  useEffect(() => {
    if (props !== undefined) {
      setProdImg(props.data && props.data.ListingImage)
    }
  }, [props])
  const changeImg = (Img) => {
    // console.log("ProdImg..", ProdImg)
    setProdImg(Img);
  }
  //console.log(changeImg);
  // const handleviewmore = () => {
  //   toast("imgview")
  // }
  return (
    <>
      <SkeletonTheme >
        {/* <div className={{ position: 'relaive', top: '0', width: '100%' }}>
        </div> */}
        {/* {showmsg && <Success msg={showmsg} close={closemsg} />} */}
        {isActive || isActive === undefined ?
          < div >
            {filtererror ? <h1> no data</h1> :
              <div key={props.index} className={props.skulisting ? "product-item subproduct_item mb-30 pr-block" : "product-item  mb-30 pr-block"} >
                <div className="product-thumb">
                  <Link href={`/product/${props.data.PageUrl}`} className="ajaxload" onClick={() => LoadProductPDP(props.data.PageUrl || props.data.SkuLink)}>
                    {/* <Link href='/product/$' className="ajaxload" onClick={() => LoadProductPDP(props.data.PageUrl|| props.data.SkuLink)}> */}
                    {/* <Link   className="ajaxload" onClick={() => LoadProductPDP(props.data.PageUrl|| props.data.SkuLink)}> */}
                    {props && props.data && props.data.imagegallery && props.data.imagegallery.length > 1 ? (
                      <Carousel interval={null} indicators>
                        {props.data.imagegallery.map((imgData) => (
                          <Carousel.Item interval={0}>
                            <img alt={props.data.Name} referrerPolicy='no-referrer' className="pri-img" id={`productlistingimages-${props.data.SkuId}`} src={imgData.PDPImage} width="250" height="250" onClick={() => AddToCompare(props.data.SkuId, props.data.SkuLink ? props.data.SkuLink : props.data.PageUrl
                            )} />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    )
                      : <img alt={props.data.Name} referrerPolicy='no-referrer' className="pri-img" id={`productlistingimages-${props.data.SkuId}`} src={props.data.ListingImage} width="250" height="250" onClick={() => AddToCompare(props.data.SkuId, props.data.SkuLink ? props.data.SkuLink : props.data.PageUrl
                      )} />}
                  </Link>
                  <div className="box-label">
                    <div id='showicons'>
                      <span style={{ display: props.data.IsDealOfTheDay && props.source !== 'dealofday' ? 'block' : 'none' }}>
                        {filtered &&
                          <div id="discountpercent84562" className=' label-product label_sale dealofdaytext'>
                            {/* <img src={dealofday} alt='' style={{ padding: '5px' }} data-tooltip-id="my-tooltip" data-tooltip-content="Deal Of The Day"></img> */}
                            <button type='button'>Deals</button>
                          </div>
                        }
                      </span>
                      <span style={{ display: props.data.IsTopSelling && props.source !== 'topseller' ? 'block' : 'none' }}>
                        {filtered &&
                          <div id="discountpercent84562" className=' label-product label_sale topsellingtext' >
                            {/* <img src={topSeller} alt='' style={{ padding: '5px' }} data-tooltip-id="my-tooltip" data-tooltip-content="Top Selling"></img> */}
                            <button type='button'>Best Seller</button>
                          </div>
                        }
                      </span>
                      <span style={{ display: props.data.IsTopTrending && props.source !== 'toptrend' ? 'block' : 'none' }}>
                        {filtered &&
                          <div id="discountpercent84562" className=' label-product label_sale toptrendingtext' >
                            {/* <img src={topTrand} alt='' style={{ padding: '5px' }} data-tooltip-id="my-tooltip" data-tooltip-content="Top Trending"></img> */}
                            <button type='button'>Trending</button>
                          </div>
                        }
                      </span>
                      <span style={{ display: props.data.IsFeatured && props.source !== 'featured' ? 'block' : 'none' }}>
                        {filtered &&
                          <div id="discountpercent84562" className=' label-product label_sale featuredtext' >
                            {/* <img src={featured} alt='' style={{ padding: '5px' }} data-tooltip-id="my-tooltip" data-tooltip-content="Featured"></img> */}
                            <button type='button'>Featured</button>
                          </div>
                        }
                      </span>
                      <span style={{ display: props.data.IsNewArrival && props.source !== 'newarrival' ? 'block' : 'none' }}>
                        {filtered &&
                          <div id="discountpercent84562" className=' label-product label_sale newArrivaltext' >
                            {/* <img src={newArrival} alt='' style={{ padding: '5px' }} data-tooltip-id="my-tooltip" data-tooltip-content="New Arrival"></img> */}
                            <button type='button'>New</button>
                          </div>
                        }
                      </span>
                    </div>
                    {/* {filtered &&
                      <span id="discountpercent84562" className='deal' style={{ display: props.data.IsDealOfTheDay ? 'block' : 'none' }}>
                        {console.log("chktopselling..", `${props.data.IsTopSelling}`)}
                        <img src={dealofday} style={{ padding: '5px' }}></img>
                        Top Selling
                      </span>} */}
                    {/* 
                    <div className="box-label">
                      <div className="label-product label_sale ">
                        {filtered &&
                          <span id="discountpercent84562" className='dealofdaytext' style={{ display: props.data.Dealofday ? 'block' : 'none' }}>
                            {console.log("chkDealofday..", `${props.data.Dealofday}`)}
                            <img src='top-seller.png' style={{ padding: '5px' }}></img>
                            Deal Of The Day
                          </span>}
                      </div>
                    </div> */}
                    <div className="action-links">
                      <Link href="#" onClick={() => AddToWishlist(filtered)} title="Add to Wishlist" ><i className="lnr lnr-heart" /></Link>
                      <Link href="#" onClick={() => AddToCompare1(props.data.SkuCode
                      )} title="Compare"><i className="lnr lnr-sync" /> </Link>
                      <a to title="Quick view" className="LoadProduct'coffee-bean') quickmodalview" onClick={(event) => LoadProduct(event, props.data.PageUrl)} >
                        <i className="lnr lnr-magnifier" />
                      </a>
                    </div>
                  </div>
                  <div className="greenveg " style={{ display: props.data.IsVeg ? 'block' : 'none' }}>
                    {filtered &&
                      <span><i>{props.data.IsVeg}</i></span>
                    }
                  </div>
                  <div className="rednonveg" style={{ display: props.data.IsNonVeg ? 'block' : 'none' }}>
                    {filtered &&
                      <span><i>{props.data.IsNonVeg}</i></span>
                    }
                  </div>
                  <div className="Eggiterian" style={{ display: props.data.IsEggiterian ? 'block' : 'none' }}>
                    {filtered &&
                      <span><i>{props.data.IsEggiterian}</i></span>
                    }
                  </div>
                </div>
                <div className="product-caption">
                  {/* <div className="product-thumb">
            <div className="greenveg">
              <i>{props.data.IsVeg}</i>
            </div>
          </div> */}
                  <div className="product-name">
                    <h4>
                      {
                        (props.data.DisplayName && props.data.DisplayName !== "") || (props.data.Name && props.data.Name !== "") ?
                          <Link href={`/product/${props.data.PageUrl}`} onClick={() => LoadProductPDP(props.data.PageUrl || props.data.SkuLink)}>{props.data.DisplayName ? props.data.DisplayName : props.data.Name}</Link>
                          :
                          <Link href={`/product/${props.data.PageUrl}`} onClick={() => LoadProductPDP(props.data.PageUrl || props.data.SkuLink)}>{props.data.name ? props.data.name : props.data.SkuCode}</Link>
                      }
                      {/* <Link href={`/product/${props.data.PageUrl}`} onClick={() => LoadProductPDP(props.data.PageUrl || props.data.SkuLink)}>{props.data.DisplayName ? props.data.DisplayName : props.data.Name}</Link> */}
                      {/* getting skucode for bag search display */}
                      {/* <Link href="/product">{ props.data.DisplayName}</Link> */}
                    </h4>
                  </div>
                  { filtered && filtered.FilterSPPrice ?
                  <div className="price-box">
                    <div>
                      <span className="regular-price">
                        {filtered && <span className="special-price" id="spprice84562">
                          ₹{parseFloat(filtered.FilterSPPrice).toFixed(2)}
                        </span>}
                      </span>
                      {filtered &&
                        <span className="old-price" id="oldprice84562" style={{ display: filtered.IsDiscountedSFP ? 'inline-block' : 'none' }} >
                          <del>M.R.P: ₹{parseFloat(filtered.FilterMRPPrice).toFixed(2)}</del>
                        </span>}
                    </div>
                    <div style={{ fontSize: "12px", color: "#3CC191", fontWeight: "500", display: "inline-block", textAlign: "right" }}>
                      {filtered &&
                        <div id="discountpercent84562" style={{ display: filtered.IsDiscountedSFP ? 'block' : 'none' }} >
                          <span style={{ color: '#989595', fontWeight: 500 }} >
                            You Save
                          </span>&nbsp;₹{parseFloat(filtered.FilterSavedRs).toFixed(2)} ({filtered.FilterDiscount}% Off)
                        </div>}
                    </div>
                  </div>
                  : ""}
                  <div className='starReating'>
                    {[...Array(5)].map((star, index) => {
                      const ifeedb = index + 1;
                      // console.log("chkindex..", index)
                      return (
                        <FontAwesomeIcon
                          type='button'
                          key={ifeedb}
                          icon={faStar}
                          color={props.data.Rating >= ifeedb ? "#222222" : "lightgrey"}
                          style={{ fontSize: '0.8em', borderColor: 'orange' }}
                          className={index ? 'on' : 'off'}
                        />
                      );
                    })}
                  </div>
                  {props && props.data && !props.data.InStock && <label className="lbl-notavailable">Not Available</label>}
                  <div className='twobox'>
                    <div className="uom-box">
                      {props.data.FiltersList.length === 1 && (
                        <span>{props.data.FiltersList[0].ListItem}</span>
                      )}
                      {props.data.FiltersList.length > 1 && (
                        <select onChange={event => {
                          changeFltr(event.target.value)
                          // localStorage.setItem('selectedPacksize', event.target.value)
                        }} value={Seleced} >
                          {props.data.FiltersList.map(itm => (
                            <option value={itm.ListItem}>{itm.ListItem} - ₹{parseFloat(itm.FilterSPPrice).toFixed(2)}  {filtered.IsDiscountedSFP ? `${filtered.FilterDiscount} % off` : null}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className='addtocartlistingbox' style={{ display: 'flex', alignItems: 'center' }}>
                      <AddToCart data={props.data} shoppingCart={shoppingCart} filtered={filtered} skulisting={props.skulisting}
                        notify={props.data.IsNotified} wishlist={false}
                      />
                    </div>
                  </div>
                  {/* {filtered && <div className=" d-none" style={{ visibility: filtered.IsDiscountedSFP ? 'visible' : 'hidden' }} >
                    <div className="saved-rs-tex " id="savedrsid84562">
                      {`You Save: ${parseFloat(filtered.FilterSavedRs).toFixed(2)}`}
                    </div>
                  </div>} */}
                  {/*
                    (props.data.imagegallery && props.data.imagegallery !== undefined) && props.data.imagegallery.length <= 5 ? (
                      <div className="multipleImage">
                        <div className='row imgrow'>
                          {
                            (props.data.imagegallery || []).map((imgData, index) => (
                              index === 4 ?
                                < div className="imgcol">
                                  {console.log("indeximg=", `your index is -> ${index} AND value is ${imgData}`)}
                                  <div className='smallImg'>
                                    <img src={imgData.SmallImage} alt='' onClick={((e) => changeImg(imgData.SmallImage, e))} />
                                    <div className='txtcentered'>
                                      <Link href={`/product/${props.data.PageUrl}`} onClick={() => LoadProductPDP(props.data.PageUrl || props.data.SkuLink)}>+ More</Link>
                                    </div>
                                  </div>
                                </div>
                                :
                                // null
                                <div className="imgcol">
                                  <div className='smallImg'>
                                    <img src={imgData.SmallImage} alt='' onClick={((e) => changeImg(imgData.SmallImage, e))} />
                                  </div>
                                </div>
                            ))
                          }
                        </div>
                      </div>
                    )
                      :
                      null
                        */}
                </div>
              </div>}
          </div >
          :
          <div role="tabpanel" aria-labelledby="headingTax" data-parent="#cart_accordion" id="listviewproducts">
            <div className="table">
              <div>
                <div className="thfix">
                  {/* <th><b>Product Name</b></th> */}
                </div>
              </div>
              <div className="listviewinfo">
                <div className='productlistimg'>
                  <div className="product-thumb">
                    <Link href={`/product/${props.data.PageUrl}`} className="ajaxload" onClick={() => LoadProductPDP(props.data.PageUrl || props.data.SkuLink)}>
                      {/* <Link href='/product/$' className="ajaxload" onClick={() => LoadProductPDP(props.data.PageUrl|| props.data.SkuLink)}> */}
                      {/* <Link   className="ajaxload" onClick={() => LoadProductPDP(props.data.PageUrl|| props.data.SkuLink)}> */}
                      {props && props.data && props.data.ListingImage ? (
                        <img referrerPolicy='no-referrer'
                          // onClick={() => productdetail(props.data.SkuLink ? props.data.SkuLink : props.data.PageUrl, props.data.SkuId)}
                          onClick={() => AddToCompare(props.data.SkuId, props.data.SkuLink ? props.data.SkuLink : props.data.PageUrl
                          )}
                          // onClick={()=>productdetail(props.data.SkuLink ,props.data.SkuId)}
                          className="pri-img" src={props.data.ListingImage}
                          onError={(e) => {
                            e.target.src = 'https://productionadmin.adibuja.com/Media/Images/250x250/image_not_found.jpg' // some replacement image
                            // e.target.style = 'padding: 8px; margin: 16px' // inline styles in html format
                          }}
                          alt="Exautic beans" />) : <Skeleton width="250%" height="250%" />}
                    </Link>
                    <div className="box-label">
                      {/* <div className="label-product label_sale">
                          {filtered && <span id="discountpercent84562" style={{ display: filtered.IsDiscountedSFP ? 'block' : 'none' }} >
                            {filtered.FilterDiscount} % off
                          </span>}
                        </div> */}
                      <div className="action-links">
                        <Link href="#" onClick={() => AddToWishlist(filtered)} title="Add to Wishlist" ><i className="lnr lnr-heart" /></Link>
                        <Link href="#" onClick={() => AddToCompare1(props.data.SkuCode
                        )} title="Compare"><i className="lnr lnr-sync" /> </Link>
                        {/* <Link href title="Quick view" className="LoadProduct'coffee-bean') quickmodalview" onClick={() => LoadProduct(props.data.PageUrl)} >
                            <i className="lnr lnr-magnifier" />
                          </Link> */}
                      </div>
                    </div>
                    <div className="greenveg greenIcon" style={{ display: props.data.IsVeg ? 'block' : 'none' }}>
                      {filtered &&
                        <span><i>{props.data.IsVeg}</i></span>
                      }
                    </div>
                    <div className="rednonveg redIcon" style={{ display: props.data.IsNonVeg ? 'block' : 'none' }}>
                      {filtered &&
                        <span><i>{props.data.IsNonVeg}</i></span>
                      }
                    </div>
                    <div className="Eggiterian yelloIcon" style={{ display: props.data.IsEggiterian ? 'block' : 'none' }}>
                      {filtered &&
                        <span><i>{props.data.IsEggiterian}</i></span>
                      }
                    </div>
                  </div>
                </div>
                <div className='productlistdata'>
                  <div >
                    <div className="product-name listname">
                      <h4>
                        <Link href={`/product/${props.data.PageUrl}`} onClick={() => LoadProductPDP(props.data.PageUrl || props.data.SkuLink)}>{props.data.SkuCode ? props.data.SkuCode : props.data.DisplayName}</Link>
                        {/* getting skucode for bag search display */}
                        {/* <Link href="/product">{ props.data.DisplayName}</Link> */}
                      </h4>
                    </div>
                  </div>
                  <div >
                    <div className="price-box list">
                      <div>
                        <span className="regular-price">
                          {filtered && <span className="special-price" id="spprice84562">
                            ₹{parseFloat(filtered.FilterSPPrice).toFixed(2)}
                          </span>}
                        </span>
                        {filtered && <span className="old-price" id="oldprice84562" style={{ display: filtered.IsDiscountedSFP ? 'inline-block' : 'none' }} >
                          <del>₹{parseFloat(filtered.FilterMRPPrice).toFixed(2)}</del>
                        </span>}
                      </div>
                    </div>
                    <div style={{ fontSize: "12px", color: "#3CC191", fontWeight: "500", display: "inline-block", textAlign: "right" }}>
                      {filtered &&
                        <div id="discountpercent84562" style={{ display: filtered.IsDiscountedSFP ? 'block' : 'none' }} >
                          <span style={{ color: '#989595', fontWeight: 500 }} >
                            You Save
                          </span>&nbsp;₹{parseFloat(filtered.FilterSavedRs).toFixed(2)} ({filtered.FilterDiscount}% Off)
                        </div>}
                    </div>
                  </div>
                  <div className='starReating'>
                    {[...Array(5)].map((star, index) => {
                      const ifeedb = index + 1;
                      // console.log("chkindex..", index)
                      return (
                        <FontAwesomeIcon
                          type='button'
                          key={ifeedb}
                          icon={faStar}
                          color={props.data.Rating >= ifeedb ? "#222222" : "lightgrey"}
                          style={{ fontSize: '0.8em', borderColor: 'orange' }}
                          className={index ? 'on' : 'off'}
                        />
                      );
                    })}
                  </div>
                  <div className="productdropdwon" data-filter={JSON.stringify(filtered)}>
                    {props && props.data && !props.data.InStock && <label className="lbl-notavailable">Not Available</label>}
                    <div className="uom-box">
                      {props.data.FiltersList.length === 1 && (
                        <span>{props.data.FiltersList[0].ListItem}</span>
                      )}
                      {props.data.FiltersList.length > 1 && (
                        <select onChange={event => {
                          changeFltr(event.target.value)
                          // localStorage.setItem('selectedPacksize', event.target.value)
                        }} value={Seleced} >
                          {props.data.FiltersList.map(itm => (
                            <option value={itm.ListItem}>{itm.ListItem} - ₹{parseFloat(itm.FilterSPPrice).toFixed(2)}  {filtered.IsDiscountedSFP ? `${filtered.FilterDiscount} % off` : null}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  <div >
                    <div className='addtocartlistingbox' style={{ display: 'flex', alignItems: 'center' }}>
                      <AddToCart data={props.data} shoppingCart={shoppingCart} filtered={filtered} skulisting={props.skulisting}
                        notify={props.data.IsNotified} wishlist={false}
                      />
                    </div>
                  </div>
                </div>
                {/* {console.log("tabledata..", data)} */}
              </div>
            </div>
          </div>
        }
        {/* <RecentlyViewProduct />
      <ReorderProduct /> */}
      </SkeletonTheme >
      <Tooltip id="my-tooltip" />
    </>
  );
}
// LoadProducts.propTypes = {
//   addToCartFunc: PropTypes.func,
//   closeMsgBarFunc: PropTypes.func,
// };
// function mapDispatchToProps(dispatch) {
//   return {
//     addToCartFunc: (qty, SkuId, SKUFilterPriceId) => dispatch(addToCart(qty, SkuId, SKUFilterPriceId)),
//     closeMsgBarFunc: () => dispatch(closeMsgBar())
//   };
// }
// const withConnect = connect(
//   null,
//   mapDispatchToProps,
// );
export default LoadProducts;