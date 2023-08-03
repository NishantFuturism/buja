/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-param-reassign */
/* eslint-disable no-new */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
// import Cookies from 'universal-cookie';
// import { Shimmer } from 'react-shimmer';
// import Drift from 'drift-zoom';
import '../../../public/assets1/css/bundle.css';
import '../../../public/assets1/css/font-awesome.min.css';
import '../../../public/assets1/css/responsive.min.css';
import '../../../public/assets1/css/style.min.css';
import { toast } from 'react-toastify';
// import ReactImageZoom from 'react-image-zoom';
//import history from '../../utils/history';
import AddToCart from '../AddToCart';
import mycartAPI from '../MainPage/api/mycartAPI';
import { addToComapre, addTowishlist } from '../LoadProducts/actions';
import './productpgae.css';
import BreadCrumb from '../../containers/MyAccount/productpageBreadCrumb';
import { useLocalStorage } from '@/useLocalStorage';
// import mycartAPI from '../MainPage/api/mycartAPI';
// import { MagnifierContainer, MagnifierPreview, MagnifierZoom } from 'react-image-magnifiers';
// import ZoomImage from './ZoomImage';
function Productpage(props) {

  const [ProductName, setProductName] = useLocalStorage('ProductName',null);
  const [CustGUID, setCustGUID] = useLocalStorage('CustGUID',null);
  const [skuproduct1, setskuproduct1] = useLocalStorage('skuproduct1',null);
  const [ValueId, setValueId] = useLocalStorage('ValueId',null);
  const [skudetailid, setskudetailid] = useLocalStorage('skudetailid',null);

  console.log('nbvbnvbn', { props });
  const [filtered, setFiltered] = useState(props.data.FilterList[0]);
  const dispatch = useDispatch()
  const [Seleced, setSeleced] = useState('');
  // const [qty, setQty] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [SkuImageModel, setSkuImageModel] = useState([]);
  const [buynowclick, setBuynowclick] = useState(false);
  // const [LocalStorageRecent, setLocalStorageRecent] = useState([]);
  // const [skucode, setskucode] = useState('');
  const [image, setimage] = useState('');
  const [zoomimage, setzoomimage] = useState('');
  const locationPopupState = useSelector(state => state.locationPopup)
  const skuproduct = useSelector(state => state.product)
  console.log("skuproduct=", skuproduct);
  const loadProducts = useSelector(state => state.loadProducts)
  console.log("Loaddd..", loadProducts)
  // const [QtyCout, setQtyCout] = useState(1);
  // const [reviewdata, setSeleced] = useState('');
  /* useEffect(() => {
    new Drift(document.querySelector("img"), {
      paneContainer: document.querySelector("p")
    });
  }, []) */
  useEffect(() => {
    // localStorage.setItem('skuproduct1', skuproduct.skudetaildata.SkuId);
    if (skuproduct !== undefined) {
      //   const SkuIdData = skuproduct.skudetaildata.SkuId;
      //   Cookies.get('SkuIdData', SkuIdData)
      if (skuproduct1 && skuproduct1 !== "") {
        const existingSku = skuproduct1;
        const newSku = skuproduct.skudetaildata.SkuId;
        const recentlyViewedPds = `${existingSku},${newSku}`;
        setskuproduct1(recentlyViewedPds);
      } else if (skuproduct.skudetaildata.SkuId !== undefined) {
        setskuproduct1(skuproduct.skudetaildata.SkuId);
      }
    }
  }, [skuproduct])
  const addToCartRdcr = useSelector(state => state.addToCart)
  console.log("pdpaddtocartreducer==", addToCartRdcr, shoppingCart);
  const changeFltr = (newFL,) => {
    setSeleced(newFL);
    const P = props.data.FilterList ? props.data.FilterList.find(i => i.ListItem === newFL) : props.data.FiltersList.find(i => i.ListItem === newFL);
    setFiltered(P);
  };
  // const { IsDiscountedSFP } = filtered;
  // useEffect(() => {
  //   setFiltered(props.data.FilterList ? props.data.FilterList : props.data.FiltersList[0])
  // }, [props])
  useEffect(() => {
    if (props.data.FilterList !== undefined) {
      console.log("useEffect add to cart")
      setFiltered(props.data.FilterList[0])
    }
  }, [props,])
  console.log("setFiltered===", filtered)
  // function AddToWishlist(SkuId, SKUFilterPriceId) {
  //   if (CustGUID === null) {
  //     history.push('/login')
  //   } else {
  //     dispatch(addTowishlist(SkuId, SKUFilterPriceId))
  //   }
  // }
  function AddToWishlist(filter) {
    // console.log('bbnn', loadProducts);
    if (CustGUID === null) {
      history.push('/login')
    } else {
      dispatch(addTowishlist(filter.SkuDetailId, filter.SKUFilterPriceId))
    }
  }
  useEffect(() => {
    console.log("props.data.SkuImageModel", props.data);
    if (props.data.SkuImageModel !== undefined) {
      setSkuImageModel(props.data.SkuImageModel)
    }
    else {
      setSkuImageModel(props.data)
    }
  }, [props])
  // function IncrementDecrementCart(action, SkuId, SKUFilterPriceId) {
  //   if (action === 'inc') {
  //     setQty(qty + 1)
  //     dispatch(addToCart(qty + 1, SkuId, SKUFilterPriceId))
  //     // addToCartFunc(qty + 1, props.data.SkuId, filtered.SKUFilterPriceId)
  //   }
  //   if (action === 'dec') {
  //     // console.log('qty', qty);
  //     setQty(qty - 1)
  //     if (qty === 1) {
  //       dispatch(removeFromCart(SkuId, SKUFilterPriceId))
  //     } else {
  //       dispatch(addToCart(qty - 1, SkuId, SKUFilterPriceId))
  //     }
  //     // console.log('dec', shoppingCart.find(itm => itm.SKUFilterPriceId === filtered.SKUFilterPriceId));
  //     // addToCartFunc(qty - 1, props.data.SkuId, filtered.SKUFilterPriceId)
  //   }
  // }
  useEffect(() => {
    if (skuproduct !== undefined) {
      setShoppingCart(skuproduct.shoppingDetailsHome)
    }
  }, [skuproduct])
  useEffect(() => {
    // console.log('homeScreen', homeScreen);
    if (addToCartRdcr !== undefined) {
      setShoppingCart(addToCartRdcr.shoppingcartDetails)
    }
  }, [addToCartRdcr])
  console.log("pdp shopping cart==", shoppingCart)
  // const QtyCoutFun = () => {
  //   setQtyCout(1)
  // }
  function PDAPpage(skuid, ValueId, SkuCode) {
    console.log('sss', skuid, ValueId, SkuCode);
    setskudetailid(skuid)
    setValueId(ValueId)
    history.push(`/productsale/Sellerlist/`, { skudetailid: skuid })
    // history.push({ pathname: `/product/${SkuCode}/Sellerlist`, state: { skudetailid: 'dhdhdh' } })
  }
  // const imagedata = {
  //   // width: 400,
  //   //  zoomStyle: 'opacity: 0.1;background-color: white;', 
  //   zoomLensStyle: 'opacity: 0.4;background-color: gray; height : 20;width:20',
  //   scale: 'default', zoomPosition: 'default',
  //   // height: 500,
  //   zoomWidth: 10, img: "https://productionadmin.adibuja.com/Media/Images/250x250//Plum Imported.png"
  // };

  const addcompare = (SkuCode) => {
    console.log("load..", loadProducts)
    // console.log("skuid..", (loadProducts.comaprelist).SkuId)
    const compare = setskuproduct1(SkuCode)
    console.log('compare..', compare)
    if ((loadProducts.comaprelist).length <= 2) {
      dispatch(addToComapre(skuproduct1))
      toast("Product added to compare list successfully")
      // setShow(true);
      // setShowmsg("Product added to compare list successfully")
    }
    else {
      toast('You have reached your maximum limit to compare items')
    }
  }
  // useEffect(() => {
  //   if (shoppingCart !== undefined && shoppingCart !== "") {
  //     shoppingCart.forEach(element => {
  //       console.log("filterelement==", element, element.SkuDetailId, props.data.SkuId)
  //       if (element.SkuDetailId === props.data.SkuId) {
  //         setprodQuantity(element.Quantity)
  //       }
  //     })
  //   }
  // }, [shoppingCart])
  const handleBuynow = () => {
    //     skuId: 
    // 86573
    // skufilterpriceid: 
    // 12650
    // console.log("SkuId, SKUFilterPriceId)", SkuId, SKUFilterPriceId);
    // const qty = 0
    // dispatch(addToCart(qty + 1, SkuId, SKUFilterPriceId))
    // setViewCart(true)
    // console.log("packdropdown", Seleced);
    // const prodQuantity = "";
    // console.log("packdropdown222", props.data, filtered.ListItem, filtered.Quantity, filtered.SkuDetailId, filtered.SKUFilterPriceId);
    let prductItem = false;
    if (shoppingCart !== undefined && shoppingCart !== "") {
      shoppingCart.forEach(element => {
        console.log("filterelement==", element.SKUFilterPriceId, filtered.SKUFilterPriceId)
        // if (element.SkuDetailId === filtered.SkuDetailId) {
        if (element.SKUFilterPriceId === filtered.SKUFilterPriceId) {
          console.log("filterelement==", element.SKUFilterPriceId, filtered.SKUFilterPriceId)
          prductItem = true;
        }
        // }
      })
    }
    console.log("PDP prodList", prductItem)
    if (prductItem === false) {
      mycartAPI.updatecart(null, 1, filtered.SkuDetailId, filtered.SKUFilterPriceId)
        .then((updateres) => {
          console.log("updateres===>", updateres);
        })
    }
    // if (addToCartRdcr === ) {
    //   mycartAPI.updatecart(null, 1, filtered.SkuDetailId, filtered.SKUFilterPriceId)
    //     .then((updateres) => {
    //       console.log("updateres===>", updateres);
    //     })
    // }
    // history.push('/cart')
    // mycartAPI.updatecart(null, 1, props.data.SkuId, filtered.SKUFilterPriceId)
    //   .then((updateres) => {
    //     console.log("updateres===>", updateres);
    //   })
    // setBuynowclick(true)
    // mycartAPI.updatecart(null, 1, props.data.SkuId, filtered.SKUFilterPriceId)
    //   .then((updateres) => {
    //     console.log("updateres===>", updateres);
    //   })
    setBuynowclick(true)
    // console.log("packdropdown", prodQuantity, filtered);
    // history.push('/cart')
  }
  useEffect(() => {
    if (buynowclick) {
      history.push('/cart')
    }
  }, [buynowclick])
  // },[buynowclick])
  // const firstimage = 
  // const zoomimage = SkuImageModel.map(d => d.ZoomImage)
  // useEffect(() => {
  //   setzoomimage(SkuImageModel && SkuImageModel.map(d => d.ZoomImage))
  // }, [image])
  useEffect(() => {
    console.log("SkuImageModel", SkuImageModel);
    if (SkuImageModel && SkuImageModel.length > 0) {
      setimage(SkuImageModel && SkuImageModel[0].PDPImage !== "undefined" && SkuImageModel[0].PDPImage)
      setzoomimage(SkuImageModel && SkuImageModel[0].ZoomImage)
    }
    else {
      setimage(SkuImageModel && SkuImageModel.map(d => d.PDPImage[0]))
      setzoomimage(SkuImageModel && SkuImageModel.map(d => d.ZoomImage))
    }
  }, [props])
  function changeimage(imaged, changezoom) {
    console.log("change", imaged, changezoom);
    setimage(imaged)
    setzoomimage(changezoom)
  }
  function addDefaultSrc(ev) {
    console.log("SkuImageModel", SkuImageModel);
    // ev.target.src = SkuImageModel.map(d => d.PDPImage)
    console.log('ss', ev.target.src);
    if (ev.target.src === 'https://devuireact.adibuja.com/') {
      ev.target.src = 'https://devadmin.adibuja.com/Media/Images/250x250/image_not_found.jpg'
    }
    // setimage(SkuImageModel.map(d => d.PDPImage[0]))
  }
  function handleReview() {
    window.scrollTo(0, 3250);
    // window.location.href = '#reviewnotavailable';
  }
  /*window.onload = function () {
    document.getElementById('app').className = 'plp-page';
  };*/
  // useEffect(() => {
  //   addDefaultSrc()
  // }, [])
  // console.log('product-details-main-wrappe', SkuImageModel.map(d => d.PDPImage), image[0], zoomimage[0]);
  console.log("props.data", props.data, "filtered====================", filtered);
  return (
    <>
      <BreadCrumb product="product" activepage={props.data.ProductName} className="productpageBreadcrumb" />
     
      <div className="product-details-main-wrapper pb-0 pt-35" data-product-link="montrese-workstation-in-white-colour"
        data-category-link="">
        <div className="container-fluid">
        <div className="row" id="product_detail">
        
            <SkeletonTheme>
              
            </SkeletonTheme>
         
            <div className="col-lg-5 col-md-10 col-sm-10 col-12 zoomer">
              
              {props && props.data && props.data.ListingImage &&
                (< ReactImageMagnify
                  referrerPolicy='no-referrer'
                  {...{
                    smallImage: {
                      alt: "",
                      isFluidWidth: true,
                      src: image,
                    
                      onError: (e) => addDefaultSrc(e)
               
                    },
                    largeImage: {
                      alt: "",
                      src: zoomimage,
                      width: 2000, // incoming image width should come
                      height: 1800, // incoming height  should come
                    },
                    enlargedImageContainerStyle: {
                      zIndex: "100",
                      backgroundColor: "#fff"
                    },
                    enlargedImageContainerDimensions: {
                      width: '150%',
                      height: 580
                    },
         
                  }}
                />)
              }
              <div className="pro-nav slick-initialized slick-slider slick-vertical" id="gallery_01" ust>
                <div className="slick-list draggable justify-content-center">
                  <div className="slick-track" style={{ opacity: 1, height: '306px', }}>
                    {(SkuImageModel || []).map(data =>
                      <div className="pro-nav-thumb slick-slide slick-current slick-active" id="thumbnailimage" data-slick-index="0"
                        aria-hidden="false" style={{ width: '102px' }} >
                        <Link href="#" onClick={() => changeimage(data.PDPImage, data.ZoomImage)}
                          className="active">
                          <img src={data.SmallImage}
                            alt="Montrese Workstation in White Colour" width="150" height="150" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {props && props.data &&
              <div className="col-lg-7 col-md-12">
                <div className="product-details-inner pr-block" id="productdetails">
                  <div className="product-details-contentt">
                    <div className="pro-details-name">
                      <h1>{props.data.ProductName || <Skeleton width={80} />}</h1>
                    </div>
                    <div className="pro-details-review mb-10">
                      <ul>
                        <li>
                          {<div dangerouslySetInnerHTML={{ __html: props.data.ratings }} /> || <Skeleton width={80} />}
                         
                        </li>
                        <li><Link href="#" onClick={handleReview} id="ReviewsButton">{props.data.ReviewCount} Review(s)</Link></li>
                      </ul>
                    </div>
                    <div className="price-box" style={{ marginBottom: '7px' }}>
                      <div className="price-box">
                        <span id="mrpprice84284" className="mrp-price">M.R.P:</span> <span className="mrp-price mrp-price-marginleft"
                          id="oldprice84284"><del>₹{filtered.FilterMRPPrice || <Skeleton width={80} />}</del> &nbsp;&nbsp;</span>
                        <span className="selling-price">Price:</span> <span className="selling-price"><span className="" id="spprice84284">
                          ₹{filtered.FilterSPPrice}</span></span>
                        {filtered.FilterDiscount !== 0 ?
                          <span span className="you-save label_discount btn-cart ml-1" id="discountpercent84284"> {filtered.FilterDiscount}% off</span> : null}
                        <br />
                        {filtered.FilterSavedRs !== 0 ?
                          <div className='productSaveprice'>
                            <span id="savedrstextid84284" className="saved-rs-text">You Save
                            </span> &nbsp;
                            <span>:</span>
                          </div> : null}
                        {filtered.FilterSavedRs !== 0 ?
                          <span className="saved-rs-text"
                            id="savedrsid84284"> ₹{filtered.FilterSavedRs}  </span> : null}
                        <span id="taxvalueid84284" className="Tax-type">
                          &nbsp; </span>
                    
                      </div>
                    </div>
                   
                    <div className="product-size d-flex align-items-center">
                      <label>Pack Size</label>
                      <input type="hidden" className="PriceId" value="190" />
                      :&nbsp;{props.data.FilterList !== undefined && props.data.FilterList.length === 1 && (
                        <span>{props.data.FilterList[0].ListItem}</span>
                      )}
                      {props.data.FilterList !== undefined && props.data.FilterList.length > 1 && (
                        <select className="nice-select ddl-weight" style={{ display: 'none' }}
                          onChange={event =>
                            changeFltr(event.target.value, props.data.SkuId)
                          }
                          value={Seleced}>
                    
                          {props.data.FilterList !== undefined && (props.data.FilterList.map(itm => (
                            <option value={itm.ListItem}>{itm.ListItem}</option>
                          )))}
                        </select>
                      )}
                     
                    </div>
                    <div className="product-size d-flex align-items-center mt-10">
                      <label>Sold by</label>
                      <label className="sellername" id="sellerNameLabel"> :&nbsp;{props.data.SellerName}</label>
                    </div>
                    <div className="pro-quantity-box mb-20 mt-10">
                      <div className="qty-boxx">
                        
                        <div className="clearfix"> </div>
                       
                        {props.data.IsDeliveryAvailableToPinCode && props.data.IsDeliveryAvailableToPinCode ?
                          <AddToCart data={props.data} shoppingCart={shoppingCart} filtered={filtered} PDPpage /> :
                          <div className="delivery-not-available-pdp">
                            Can't deliver to pin code <b>{locationPopupState && locationPopupState.pincode}</b>
                          </div>}
                        
                        {props.data.InStock === false ? null :
                         
                          <button type='button' onClick={() => handleBuynow()} className="btn-cart btn_atc md-btn buy-now" >
                            Buy Now
                          </button>}
                        <div className="clearfix"></div>
                      </div>
                    </div>
                    <div className="useful-links pdpLinks mb-20">
                      <ul>
                        <li> <Link href="#" onClick={() => AddToWishlist(filtered)} title="Add to Wishlist"><i
                          className="fa fa-heart-o"></i>add to wish list</Link> </li>
                        <li> <Link href="#" onClick={() => addcompare(props.data.SkuCode)} title="Compare Product"><i className="fa fa-refresh"></i>compare
                          this product</Link> </li>
                
                        <li> <Link href="#" onClick={() => PDAPpage(props.data.SkuId, filtered.ValueId, props.data.ProductName)} > <i
                          className="fa fa-balance-scale"></i> Other Sellers</Link> </li>
                        <li> <a target="_blank" href="https://seller.adibuja.com/seller-register" > <i
                          className="fa fa-balance-scale"></i> Sell on Adibuja</a> </li>
                
                      </ul>
                    </div>
                    
                  </div>
                </div>
                        </div>}
            
          </div>
          <div className='productdesc'>
            {props.data.LongDescription !== null ?
              <span dangerouslySetInnerHTML={{ __html: props.data.LongDescription }} />
              :
              null}
          </div>
        </div>
      </div>
    </>
  )
}
export default Productpage
