/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/**
 *
 * AddToCart
 *
 */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import { useLocation } from 'react-router-dom';
// import { notifyMeAction } from '../LoadProducts/actions';
import { toast } from 'react-toastify';
import { addToCart, removeFromCart } from './actions';
import reducer from './reducer';
import saga from './saga';
import '../../../public/assets/css/custombundle.css';
import '../../../public/assets1/css/default.min.css';
// import '../../../assets/css/font-awesome.min.css';
import '../../../public/assets/css/responsive.min.css';
import '../../../public/assets/css/style.min.css';
import Success from '../../components/ShowAlert/success';
////import history from '../../utils/history';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import mycartAPI from '../MainPage/api/mycartAPI';
import { useLocalStorage } from '@/useLocalStorage';
// import Cookies from 'universal-cookie';
// import addToBasket from '../../images/add-to-basket.png'
export function AddToCart(props) {
  const router = useRouter();
  console.log('props.addtocart', props.filtered);
  useInjectReducer({ key: 'addToCart', reducer });
  useInjectSaga({ key: 'addToCart', saga });
  const [CustGUID, setCustGUID] = useLocalStorage('CustGUID',null);
  const [qty, setQty] = useState(0);
  const [isForCart, setisForCart] = useState(false);
  const [QtyCout, setQtyCout] = useState(1);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [FirstCall, setFirstCall] = useState(0);
  const [filtered, setFiltered] = useState({});
  // const [notifyme,setNotifyme]=useState('')
  const [notifymsg, setnotifyMsg] = useState(false);
  //const location = useLocation();
  // const [skuidvalue,setSkuidvalue]=useState('')
  // const [skuPricevalue, setSkuPriceValue] = useState('');
  const [msg, setMsg] = useState('')
  const [openwarn, setOpenwarn] = useState(false)
  // const [disable,setdisable]=useState(true)
  // const [addtocartclick,setAddtocartclick]=useState(false)
  // const [cartdata, setcartdata] = useState([]);
  // const [notified, setnotified] = useState({});/
  // const addToCartreducer = useSelector(state => state.addToCart)
  // const loadProducts = useSelector(state => state.loadProducts)
  // const addtocartresponse = useSelector(state => state.addToCart)
  // console.log('adtocrt, adtorsp', addToCartreducer, loadProducts, addtocartresponse);
  // console.log("Addcart shoppingCart=", props.shoppingCart);
  //  console.log("filtered=", filtered);
  // const notifyMeResp=useSelector(state=>state.loadProducts.notify)
  // console.log("notifyMeResp",notifyMeResp);
  // const [notify, setnotify] = useState(false);
  // const [QtyCout, setQtyCout] = useState(1);
  // console.log('bvnbmn', props, addToCartreducer, loadProducts);
  // console.log("cookie",cookies.get('notifySkuDetailID'));
  const dispatch = useDispatch()
  // console.log("addtocartresponse", addtocartresponse);
  // useEffect(() => {
  //   console.log("notifymsg", notifymsg);
  //   // if (addtocartresponse && addtocartresponse.notified==='Error') {
  //   //   history.push('/login')
  //   //   setnotifyMsg(false)
  //   //   setOpenwarn(false)
  //   //   setdisable(false)
  //   // }
  // }, [addtocartresponse && addtocartresponse.addToCartMsg, notifymsg])
  useEffect(() => {
    if (notifymsg === true) {
      // setOpenwarn(true)
      toast('Thank you! We will notify you once the product will be available.')
      // setMsg('Thank you! We will notify you once the product will be available.')
      setMsg()
      setTimeout(() => {
        setOpenwarn(false)
      }, 3000);
    }
  }, [notifymsg])
  useEffect(() => {
    if (props !== undefined) {
      setShoppingCart(props.shoppingCart)
      setFiltered(props.filtered)
    }
  }, [props])
  const AddtoCartfunction = (action, SkuId, SKUFilterPriceId) => {
    // console.log('actionaddtoclick', action, SkuId, SKUFilterPriceId);
    const qty1 = 0
    if (SkuId) {
      // if (qty) {
      dispatch(addToCart(qty1 + 1, SkuId, SKUFilterPriceId))
      setQty(qty + 1)
      // setAddtocartclick(true)
    } else {
      if (filtered && filtered[0]) {
        dispatch(addToCart(qty + 1, filtered[0].SkuId, filtered[0].SKUFilterPriceId))
        setQty(qty + 1)
      }
    }
    if (router.pathname === '/cart') {
      mycartAPI.getCartCommon()
        .then(response => {
          console.log('uuuuu', response)
          // setwalletbalance(response.WalletBalance)
          // setamount(response.total)
        })
        .catch(error => {
          console.log('error:::', error);
        });
    }
    // addToCartFunc(qty + 1, props.data.SkuId, filtered.SKUFilterPriceId)
  }
  function IncrementDecrementCart(action, SkuId, SKUFilterPriceId) {
    // console.log('DEC-action', action, SkuId, SKUFilterPriceId);
    if (action === 'inc') {
      if (SkuId) {
        // if (qty) {
        dispatch(addToCart(qty + 1, SkuId, SKUFilterPriceId))
        // console.log("inc add to cart=", props);
        if (props.cart === true) {
          if (filtered.CappingLimit === qty) {
            setQty(filtered.CappingLimit)
          } else {
            setQty(qty + 1)
          }
        } else {
          if (filtered.Capping === qty) {
            // console.log("limit..", filtered.Capping)
            // console.log("checkqty..", qty)
            setOpenwarn(true)
            setMsg(`Order quantity limit for this product is ${props.filtered.Capping}`)
            setQty(filtered.Capping)
          } else {
            setQty(qty + 1)
          }
        }
      } else {
        if (filtered && filtered[0]) {
          dispatch(addToCart(qty + 1, filtered[0].SkuId, filtered[0].SKUFilterPriceId))
          setQty(qty + 1)
        }
      }
      // addToCartFunc(qty + 1, props.data.SkuId, filtered.SKUFilterPriceId)
    }
    if (action === 'dec') {
      if (qty > 0) {
        setQty(qty - 1)
        if (qty === 1) {
          // console.log("removeitemdec=", SkuId, SKUFilterPriceId)
          dispatch(removeFromCart(SkuId, SKUFilterPriceId))
        } else {
          dispatch(addToCart(qty - 1, SkuId, SKUFilterPriceId))
        }
        // addToCartFunc(qty - 1, props.data.SkuId, filtered.SKUFilterPriceId)
      }
    }
  }
  const QtyCoutFun = () => {
    setQtyCout(1)
  }
  function NotifyMe(skuid, skuPriceId, isNotified, InStock) {
    // setSkuidvalue(skuid)
    // setSkuPriceValue(skuPriceId)
    // const guest=localStorage.getItem('User')
    //   const guestflag=JSON.parse(guest)
    console.log("guestflag.isguest", skuid, skuPriceId, notifymsg, isNotified, InStock);
    if (CustGUID === null) {
      router.push('/login')
    }
    else {
      if ((isNotified === false) || (InStock === false)) {
        // dispatch(notifyMeAction(skuid, skuPriceId))
        // notify me homepage
        mycartAPI.NotifyMeAPI(skuid, skuPriceId)
          .then((res) => {
            if (res === 'Notified') {
              setnotifyMsg(true)
            }
          })
      } else {
        // console.log("notified");
        // dispatch(notifyMeAction(skuid, skuPriceId))
        // setnotifyMsg(true )
      }
    }
    // if(userdetail && userdetail.isguest===false){
    //   history.push('/login')
    // }
    // else{
    // dispatch(notifyMeAction(skuid, skuPriceId))
    // }
    // setnotify(true)
  }
  // useEffect(()=>{
  //   const guest=localStorage.getItem('User')
  //   const guestflag=JSON.parse(guest)
  //   if(notifymsg===true){
  //     if( guestflag && guestflag.isguest===false){
  //       // setNotifyme(props&&props.data.IsNotified ? 'Notified' : 'Notify Me' )
  //       // setnotifyMsg(props&&props.data.IsNotified ?true:false )
  //       dispatch(notifyMeAction(skuidvalue, skuPricevalue))
  //     }
  //     else{
  //       history.push('/login')
  //     }
  //   }
  // },[notifymsg,skuidvalue,skuPricevalue])
  useEffect(() => {
    setFirstCall(FirstCall + 1)
  }, [])
  useEffect(() => {
    if (shoppingCart !== undefined && props && props.data) {
      setisForCart(false)
      if (FirstCall === 0) {
        const itmQuntity = shoppingCart.filter(itm => itm.SKUFilterPriceId === props.data.FiltersList[0].SKUFilterPriceId)
        const obj = itmQuntity[0]
        if (obj !== undefined) {
          setQty(obj.Quantity)
        }
      } else {
        if (filtered) {
          const itmQuntity = shoppingCart.filter(itm => itm.SKUFilterPriceId === filtered.SKUFilterPriceId)
          const obj = itmQuntity[0]
          if (obj !== undefined) {
            setQty(obj.Quantity)
          }
        }
      }
    } else {
      if (filtered) {
        if (filtered.Quantity) {
          setQty(filtered.Quantity)
          setisForCart(true)
        }
        if (filtered.SkuQuantity) {
          setQty(filtered.SkuQuantity)
        }
      }
    }
  }, [filtered, shoppingCart]);
  /*useEffect(() => {
    setInterval(() => {
      setOpenwarn(false)
    }, 5000);
  }, [close])
  const close = () => {
  }*/
  // useEffect(() => {
  //  
  //   if (loadProducts !== undefined && shoppingCart !== undefined) {
  //     const loadShop = loadProducts.shoppingCartDetails
  //     // const arr = [...shoppingCart, ...loadShop]
  //     // setShoppingCart(arr)
  //   
  //   }
  // }, [loadProducts])
  // console.log("props.data.IsNotifiedy",props.data.IsNotifiedy,props.data.SkuId);
  // console.log("filtered.SKUFilterPriceId", props.data, "filtered", filtered, filtered.SKUFilterPriceId, "skulisting", props.skulisting);
  console.log("condition IsAddedInCart=", props.filtered)
  // console.log("filterlistdataaa", props.data.FiltersList[0])
  return (
    <>
      {/* <ToastContainer /> */}
      {/* {true && */}
      {openwarn && <Success msg={msg} close={close}></Success>}
      {
        props && props.data && props.data.InStock && filtered && shoppingCart && shoppingCart.find(itm => itm.SKUFilterPriceId === filtered.SKUFilterPriceId) === undefined &&
        // filtered && (!props.data.IsAddedInCart || !filtered.IsAddedInCart || filtered.Quantity === 0) &&
        (
          <div className={props.skulisting ? "correction mt-10" : "correction"}>
            <span style={{ width: '37px', padding: '0px 2px 0px 2px' }}>
              <i className="lnr lnr-cart" id="addtocartimg"></i>
              {/* <img src={addToBasket} alt='add to cart' className='addtocartimg' /> */}
              {console.log('filtered--', filtered)}
            </span>
            <span id='qtyspan' className="qtyincdec addtocartqtyDivhidden addtocartqtyDiv2706 mb-15 d-none">
              <input type="text" onChange={(e) => QtyCoutFun(e)} className="validateQty addtocartqtytxt addtocartqty84562 addtocartqty2706" id="qty2706" defaultValue={QtyCout} maxLength="2" required="" />
            </span>
            <button className="btn-cart incdecaddtocart AddToCart2706" id="compareaddtocart" style={{ width: '10' }} type="button"
              onClick={() => AddtoCartfunction('inc', props.filteredata ? props.data.SkuDetailID : props.data.SkuId, filtered.SKUFilterPriceId, filtered.Capping)}
            // onClick={() => IncrementDecrementCart('inc', props.data.SkuId, filtered.SKUFilterPriceId)}
            >
              {props.Reorder ? 'Reorder' : 'Add to cart'}
            </button>
            {/* {props && props.data && props.data.SkuDetailID && props.filteredata ?
              <button className="btn-cart incdecaddtocart AddToCart2706" type="button"
                onClick={() => IncrementDecrementCart('inc', props.data.SkuDetailID, filtered.SKUFilterPriceId)} >
                Add to cart
              </button> : null} */}
          </div>)
      }
      {/* {
          props && props.filteredata && filtered && filtered.InStock && shoppingCart && shoppingCart.find(itm => itm.SKUFilterPriceId === filtered.SKUFilterPriceId) === undefined &&
          (< div className='correction'>
            <span id='qtyspan' className="qtyincdec addtocartqtyDivhidden addtocartqtyDiv2706 ">
              <input type="text" onChange={(e) => QtyCoutFun(e)} className="validateQty addtocartqtytxt addtocartqty84562 addtocartqty2706" id="qty2706" defaultValue={QtyCout} maxLength="2" required="" />
            </span>
            <button className="btn-cart incdecaddtocart AddToCart2706" type="button"
              onClick={() => IncrementDecrementCart('inc', filtered.SkuId, filtered.SKUFilterPriceId)} >
              Add to cart
            </button>
          </div>)
        } */}
      {/* {props && props.data && props.data.InStock && props.filtered && props.skulisting && shoppingCart &&
         shoppingCart.find(itm => itm.SKUFilterPriceId === filtered.SKUFilterPriceId) !== undefined &&
         // filtered && (props.data.IsAddedInCart || filtered.IsAddedInCart || filtered.Quantity !== 0) && 
         (<>
           <div className="product-qty-parenttest product-qty-parent2720">
             <div className="product-qty fixhomepage IncDecQtyDiv IncrementDecrementQtyDiv2720"
               style={{ display: "block" }}>
               <input type="button" className="IncDecQty AddUpdateqty2342  IncDecQtyforFloatingCart AddUpdateqtyfloatingcart2342" value={`${qty}`} />
               <span className="dec qtybtn btn btn-primary" data-productid="84576" onClick={() => IncrementDecrementCart('dec', props.data.SkuId, filtered.SKUFilterPriceId)}>
                 <i className="fa fa-minus"></i>
               </span>
               <span className="inc qtybtn btn btn-primary" data-productid="84576"
                 onClick={() => IncrementDecrementCart('inc', filtered.SkuId, filtered.SKUFilterPriceId)}>
                 <i className="fa fa-plus"></i>
               </span>
             </div>
           </div>
         </>
         )
       } */}
      {
        props && props.data && props.data.InStock && filtered && shoppingCart &&
        shoppingCart.find(itm => itm.SKUFilterPriceId === filtered.SKUFilterPriceId) !== undefined &&
        // filtered && (props.data.IsAddedInCart || filtered.IsAddedInCart || filtered.Quantity !== 0) &&
        (<>
          <div className={props.skulisting === true ? "product-qty-parenttest product-qty-parent2720 addtocart-productqty" : "product-qty-parenttest product-qty-parent2720 margin-bottom-0px"} >
            <div className="product-qty fixhomepage IncDecQtyDiv IncrementDecrementQtyDiv2720"
              style={{ display: "block", }}>
              <input type="button" className="IncDecQty AddUpdateqty2342  IncDecQtyforFloatingCart AddUpdateqtyfloatingcart2342" value={`${qty}`} />
              <span className="dec qtybtn btn btn-primary" data-productid="84576" onClick={() => IncrementDecrementCart('dec', props.filteredata ? props.data.SkuDetailID : props.data.SkuId, filtered.SKUFilterPriceId)}>
                <i className="fa fa-minus"></i>
              </span>
              <span className="inc qtybtn btn btn-primary" data-productid="84576"
                onClick={() => IncrementDecrementCart('inc', props.filteredata ? props.data.SkuDetailID : props.data.SkuId, filtered.SKUFilterPriceId)}>
                <i className="fa fa-plus"></i>
              </span>
            </div>
          </div>
        </>
        )
      }
      {/* {
         props && props.data && props.data.InStock && filtered && shoppingCart &&
         shoppingCart.find(itm => itm.SKUFilterPriceId === filtered.SKUFilterPriceId) !== undefined && props.skulisting === true &&
         // filtered && (props.data.IsAddedInCart || filtered.IsAddedInCart || filtered.Quantity !== 0) && 
         (<>
           <div className={props.skulisting === true ? "product-qty-parenttest product-qty-parent2720 mb-10 mt-10" : "product-qty-parenttest product-qty-parent2720 margin-bottom-0px"}>
             <div className="product-qty fixhomepage IncDecQtyDiv IncrementDecrementQtyDiv2720"
               style={{ display: "block" }}>
               <input type="button" className="IncDecQty AddUpdateqty2342  IncDecQtyforFloatingCart AddUpdateqtyfloatingcart2342" value={`${qty}  in Cart`} />
               <span className="dec qtybtn btn btn-primary" data-productid="84576" onClick={() => IncrementDecrementCart('dec', props.filteredata ? props.data.SkuDetailID : props.data.SkuId, filtered.SKUFilterPriceId)}>
                 <i className="fa fa-minus"></i>
               </span>
               <span className="inc qtybtn btn btn-primary" data-productid="84576"
                 onClick={() => IncrementDecrementCart('inc', props.filteredata ? props.data.SkuDetailID : props.data.SkuId, filtered.SKUFilterPriceId)}>
                 <i className="fa fa-plus"></i>
               </span>
             </div>
           </div>
         </>
         )
       } */}
      {
        props && props.data && props.data.InStock === false &&
        // ?
        (<div className={props && props.PDPpage ? 'd-flex justify-content-start' : 'd-flex justify-content-center '}>
          {/* <br />
            <span className="qtyincdec" style={{ visibility: 'hidden' }}>
              <input type="text" className="validateQty" />
            </span> */}
          <>
            <button className="btn-notifyme " type="button" id='cartnotify'
              onClick={() => NotifyMe(props.data.SkuId || filtered.SkuDetailID, filtered.SKUFilterPriceId, props.data.IsNotified, props.data.InStock)}
              //  disabled={disable}
               >
              {notifymsg === true || props.data.IsNotified ? 'Notified' : 'Notify me'}
            </button>
          </>
        </div>)
      }
      {/* {
         props && props.data && props.data.InStock === false && props.wishlist === true &&
         (<div className={props && props.wishlist ? 'd-flex justify-content-center' : 'd-flex justify-content-start'}>
           <br />
            <span className="qtyincdec" style={{ visibility: 'hidden' }}>
              <input type="text" className="validateQty" />
            </span>
           <button className="btn-notifyme " type="button" onClick={() => NotifyMe(props.data.SkuId, filtered.SKUFilterPriceId)} href >{props.data.IsNotified === true ? 'Notified' : 'Notify Me'}</button>
         </div>)
       } */}
      {
        isForCart && props.cart && props.filtered.InStock ? (
          <>
            <div className="product-qty-parenttest product-qty-parent2720 mb-15">
              <div className="product-qty fixhomepage IncDecQtyDiv IncrementDecrementQtyDiv2720"
                style={{ display: "block" }}>
                <input type="button" className="IncDecQty AddUpdateqty2342  IncDecQtyforFloatingCart AddUpdateqtyfloatingcart2342" value={`${qty}`} />
                <span className="dec qtybtn btn btn-primary" data-productid="84576"
                  onClick={() => IncrementDecrementCart('dec', filtered.SkuId, filtered.SKUFilterPriceId)}>
                  <i className="fa fa-minus"></i>
                  {/* {qty !== 0 ? <i className="fa fa-minus"></i> : <i className="fa fa-close" onClick={() => dispatch(removeFromCart(filtered.SkuId, filtered.SKUFilterPriceId))}></i>} */}
                </span>
                <span className="inc qtybtn btn btn-primary" data-productid="84576"
                  onClick={() => IncrementDecrementCart('inc', filtered.SkuId, filtered.SKUFilterPriceId)}>
                  <i className="fa fa-plus"></i>
                </span>
              </div>
            </div>
          </>
        )
          :
          isForCart && props.cart && props.filtered.InStock === false && (
            <>
              <button className="btn-notifyme " type="button" id='cartnotify'
                onClick={() => NotifyMe(props.filtered.SkuId || filtered.SkuDetailID, filtered.SKUFilterPriceId, props.filtered.IsNotified, props.filtered.InStock)}
                //  disabled={disable}
                 >
                {notifymsg === true || props.filtered.IsNotified ? 'Notified' : 'Notify me'}
              </button>
            </>
          )
      }
      {/* {
        isForCart && props.filtered && props.filtered.InStock === false &&
        (<div className={filtered && filtered.PDPpage ? 'd-flex justify-content-start' : 'd-flex justify-content-center '}>
          <>
            <button className="btn-notifyme " type="button" id='cartnotify'
              onClick={() => NotifyMe(filtered.data.SkuId, filtered.SKUFilterPriceId, filtered.data.IsNotified, filtered.data.InStock)}
              href >
              {notifymsg === true || filtered.data.IsNotified ? 'Notified' : 'Notify me'}
            </button>
          </>
        </div>)
      } */}
    </>
  );
}
export default AddToCart;
