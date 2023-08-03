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
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
// import { notifyMeAction } from '../LoadProducts/actions';
import { addToCart, notifyMeAction, removeFromCart } from './actions';
import reducer from './reducer';
import saga from './saga';
import '../../../public/assets/css/custombundle.css';
import '../../../public/assets1/css/default.min.css';
// import '../../../assets/css/font-awesome.min.css';
import '../../../public/assets/css/responsive.min.css';
import '../../../public/assets/css/style.min.css';
////import history from '../../utils/history';
import { useRouter } from 'next/router';
import mycartAPI from '../MainPage/api/mycartAPI';
// import Cookies from 'universal-cookie';
export function AddToCart(props) {
  const router = useRouter();
  console.log('saller prp', props);
  useInjectReducer({ key: 'addToCart', reducer });
  useInjectSaga({ key: 'addToCart', saga });
  const [qty, setQty] = useState(0);
  const [isForCart, setisForCart] = useState(false);
  const [QtyCout, setQtyCout] = useState(1);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [FirstCall, setFirstCall] = useState(0);
  const [filtered, setFiltered] = useState({});
  // const [notifyme,setNotifyme]=useState('')
  const [notifymsg, setnotifyMsg] = useState(false);
  const [skuidvalue, setSkuidvalue] = useState('')
  const [skuPricevalue, setSkuPriceValue] = useState('');
  const [disable, setdisable] = useState(true)
  // const [cartdata, setcartdata] = useState([]);
  // const [notified, setnotified] = useState({});/
  const addToCartreducer = useSelector(state => state.addToCart)
  const loadProducts = useSelector(state => state.loadProducts)
  const addtocartresponse = useSelector(state => state.addToCart)
  // const notifyMeResp=useSelector(state=>state.loadProducts.notify)
  // console.log("notifyMeResp",notifyMeResp);
  // const [notify, setnotify] = useState(false);
  // const [QtyCout, setQtyCout] = useState(1);
  console.log('bvnbmn', props, addToCartreducer, loadProducts);
  // console.log("cookie",cookies.get('notifySkuDetailID'));
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("notifymsg", notifymsg);
    if (addtocartresponse && addtocartresponse.notified === 'Error') {
      setnotifyMsg(false)
      // setOpenwarn(false)
      setdisable(false)
    }
  }, [addtocartresponse && addtocartresponse.addToCartMsg, notifymsg, disable])
  useEffect(() => {
    if (props) {
      // if(props.filteredata) {
      //   setFiltered(props.filtered)
      // } else
      setShoppingCart(props.shoppingCart)
      setFiltered(props.filtered)
    }
  }, [props])
  const AddtoCartfunction = (action, SkuId, SKUFilterPriceId) => {
    console.log('add saller action', action, SkuId, SKUFilterPriceId);
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
    // addToCartFunc(qty + 1, props.data.SkuId, filtered.SKUFilterPriceId)
  }
  useEffect(() => {
  }, [props,])
  function IncrementDecrementCart(action, SkuId, SKUFilterPriceId) {
    console.log("click increament", action, SkuId, SKUFilterPriceId, props.PDPpage);
    if (action === 'inc') {
      if (SkuId) {
        // if (qty) {
        dispatch(addToCart(qty + 1, SkuId, SKUFilterPriceId))
        if (props.cart === true) {
          if (filtered.CappingLimit === qty) {
            setQty(filtered.CappingLimit)
          } else {
            setQty(qty + 1)
          }
        } else {
          if (filtered.Capping === qty) {
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
    console.log("ootherseller notify");
    setSkuidvalue(skuid)
    setSkuPriceValue(skuPriceId)
    // const guest=localStorage.getItem('User')
    //   const guestflag=JSON.parse(guest)
    console.log("guestflag.isguest", notifymsg, isNotified, InStock);
    if (localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) {
      router.push('/login')
    }
    else {
      if ((isNotified === false) || (InStock === false)) {
        // dispatch(notifyMeAction(skuid, skuPriceId))
        // notify me homepage
        mycartAPI.NotifyMeAPI(skuid, skuPriceId)
          .then((res) => {
            if(res==='Notified'){
              setnotifyMsg(true)
            }
          })
      } else {
        console.log("notified");
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
    if (notifymsg === true) {
      // setNotifyme(props&&props.data.IsNotified ? 'Notified' : 'Notify Me' )
      // setnotifyMsg(props&&props.data.IsNotified ?true:false )
      dispatch(notifyMeAction(skuidvalue, skuPricevalue))
    }
  }, [notifymsg, skuidvalue, skuPricevalue])
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
  console.log("otherseller props", props.data, props.filtered);
  //    console.log("filtered.SKUFilterPriceId",props.data,"filtered",filtered, filtered.SKUFilterPriceId,"skulisting",props.skulisting);
  return (
    <>
      {/* {true && */}
      {
        props && props.data && props.data.InStock && filtered && shoppingCart && shoppingCart.find(itm => itm.SKUFilterPriceId === filtered.SKUFilterPriceId) === undefined &&
        // filtered && (!props.data.IsAddedInCart || !filtered.IsAddedInCart || filtered.Quantity === 0) &&
        (< div id="maindiv" className={props.skulisting ? "correction mt-10" : "correction"}
        >
          {/* <img src='add-to-basket.png' alt='' /> */}
          <span style={{ width: '37px', padding: '0px 2px 0px 2px' }}>
            <i style={{ marginRight: "55px", marginTop: "10px" }} className="lnr lnr-cart" id="addtocartimg"></i>
            {/* <img src={addToBasket} alt='add to cart' className='addtocartimg' /> */}
          </span>
          <span id='qtyspan' className="qtyincdec addtocartqtyDivhidden addtocartqtyDiv2706 mb-15 d-none">
            <input type="text" onChange={(e) => QtyCoutFun(e)} className="validateQty addtocartqtytxt addtocartqty84562 addtocartqty2706" id="qty2706" defaultValue={QtyCout} maxLength="2" required="" />
          </span>
          <div id="btndiv">
            <button id="btncart" className="btn-cart incdecaddtocart AddToCart2706 " type="button"
              onClick={() => AddtoCartfunction('inc', props.filteredata ? props.data.SkuDetailID : props.data.SkuDetailID, filtered.SKUFilterPriceId, filtered.Capping)}
            // onClick={() => IncrementDecrementCart('inc', props.data.SkuId, filtered.SKUFilterPriceId)}
            >
              {props.Reorder ? 'Reorder' : 'Add to cart'}
            </button>
          </div>
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
      {/* {
         props && props.filteredata && filtered && filtered.InStock && shoppingCart &&
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
          <div className={props.skulisting === true ? "product-qty-parenttest product-qty-parent2720 mb-10 mt-10" : "product-qty-parenttest product-qty-parent2720"}>
            <div className="product-qty fixhomepage IncDecQtyDiv IncrementDecrementQtyDiv2720"
              style={{ display: "block" }}>
              <input type="button" className="IncDecQty AddUpdateqty2342  IncDecQtyforFloatingCart AddUpdateqtyfloatingcart2342" value={`${qty}  in Cart`} />
              <span className="dec qtybtn btn btn-primary" data-productid="84576" onClick={() => IncrementDecrementCart('dec', props.filteredata ? props.data.SkuDetailID : props.data.SkuDetailID, filtered.SKUFilterPriceId)}>
                <i className="fa fa-minus"></i>
              </span>
              <span className="inc qtybtn btn btn-primary" data-productid="84576"
                onClick={() => IncrementDecrementCart('inc', props.filtered ? props.data.SkuDetailID : props.data.SkuDetailID, filtered.SKUFilterPriceId)}>
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
           <div className={props.skulisting === true ? "product-qty-parenttest product-qty-parent2720 mb-10 mt-10" : "product-qty-parenttest product-qty-parent2720 mb-15 "}>
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
            <button className="btn-notifyme " type="button" style={{width: '100px'}}
              onClick={() => NotifyMe(props.data.SkuId, filtered.SKUFilterPriceId, props.data.IsNotified, props.data.InStock)}
              disabled={disable}
              href >
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
        isForCart && props.PDPpage && (
          <>
            <div className="product-qty-parenttest product-qty-parent2720 mb-15">
              <div className="product-qty fixhomepage IncDecQtyDiv IncrementDecrementQtyDiv2720"
                style={{ display: "block" }}>
                <input type="button" className="IncDecQty AddUpdateqty2342  IncDecQtyforFloatingCart AddUpdateqtyfloatingcart2342" value={`${qty} in Cart`} />
                <span className="dec qtybtn btn btn-primary" data-productid="84576"
                  onClick={() => IncrementDecrementCart('dec', props.data.SkuDetailID, filtered.SKUFilterPriceId)}>
                  <i className="fa fa-minus"></i>
                  {/* {qty !== 0 ? <i className="fa fa-minus"></i> : <i className="fa fa-close" onClick={() => dispatch(removeFromCart(props..SkuDetailID
, filtered.SKUFilterPriceId))}></i>} */}
                </span>
                <span className="inc qtybtn btn btn-primary" data-productid="84576"
                  onClick={() => IncrementDecrementCart('inc', props.data.SkuDetailID, filtered.SKUFilterPriceId)}>
                  <i className="fa fa-plus"></i>
                </span>
              </div>
            </div>
          </>
        )
      }
    </>
  );
}
export default AddToCart;
