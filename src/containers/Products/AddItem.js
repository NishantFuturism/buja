/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-lonely-if */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../AddToCart/actions';
export default function AddItem(props) {
  console.log('addprops', props);
  const [qty, setQty] = useState(0);
  const [isForCart, setisForCart] = useState(false);
  const [QtyCout, setQtyCout] = useState(1);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [FirstCall, setFirstCall] = useState(0);
  const [filtered, setFiltered] = useState({});
  // const [QtyCout, setQtyCout] = useState(1);
  const dispatch = useDispatch()
  useEffect(() => {
    if (props) {
      // if(props.filteredata) {
      //   setFiltered(props.filtered)
      // } else
      setShoppingCart(props.shoppingCart)
      setFiltered(props.filtered)
    }
  }, [props])
  useEffect(() => {
  }, [props])
  function IncrementDecrementCart(action, SkuId, SKUFilterPriceId) {
    if (action === 'inc') {
      if (SkuId) {
        setQty(qty + 1)
        dispatch(addToCart(qty + 1, SkuId, SKUFilterPriceId))
      } else {
        setQty(qty + 1)
        if (filtered && filtered[0]) {
          dispatch(addToCart(qty + 1, filtered[0].SkuId, filtered[0].SKUFilterPriceId))
        }
      }
      // addToCartFunc(qty + 1, props.data.SkuId, filtered.SKUFilterPriceId)
    }
    if (action === 'dec') {
      setQty(qty - 1)
      if (qty === 1) {
        dispatch(removeFromCart(SkuId, SKUFilterPriceId))
      } else {
        dispatch(addToCart(qty - 1, SkuId, SKUFilterPriceId))
      }
      // addToCartFunc(qty - 1, props.data.SkuId, filtered.SKUFilterPriceId)
    }
  }
  const QtyCoutFun = () => {
    setQtyCout(1)
  }
  // function NotifyMe() {
  //   dispatch(notifyMeAction(filtered.SKUFilterPriceId))
  // }
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
  return (
    <>
      <div className="product-caption" style={{ width: '300px !important', margin: 0, float: 'inherit' }} >
        <span className="input-group-btn">
          <input type="hidden" className="PriceId" id="skuFilterPriceId83839" value="330" />
          <span className="qtyincdec addtocartqtyDivhidden addtocartqtyDiv330" style={{ display: 'block' }}>
            <input type="text"
              onChange={(e) => QtyCoutFun(e)}
              className="addtocartqtytxt  addtocartqty83839 addtocartqty330" id="qty330" value="1" min="1" max="10" defaultValue={QtyCout} maxLength="2" />
          </span>
          {props && props.data && props.data.InStock && filtered && shoppingCart &&
            shoppingCart.find(itm => itm.SKUFilterPriceId === filtered.SKUFilterPriceId) !== undefined &&
            <div className="product-qty IncDecQtyDiv IncrementDecrementQtyDiv330" style={{ width: '100%!important', margin: '0px !important', top: '-10px !important' }}>
              <input type="button"
                className="IncDecQty AddUpdateqty330" value={`${qty}`} />
              <span className="dec qtybtn btn btn-primary"
                onClick={() => IncrementDecrementCart('dec', filtered.SkuId, filtered.SKUFilterPriceId)}>
                <i className="fa fa-minus"></i>
              </span>
              <span className="inc qtybtn btn btn-primary" onClick={() => IncrementDecrementCart('dec', filtered.SkuId, filtered.SKUFilterPriceId)}>
                <i className="fa fa-plus"></i>
              </span>
            </div>}
          {
            isForCart && (
              <>
                <div className="product-qty-parenttest product-qty-parent2720 mb-15 product-qty mr-3">
                  <div className="product-qty fixhomepage IncDecQtyDiv IncrementDecrementQtyDiv2720"
                    style={{ display: "block" }}>
                    <input type="button" className="IncDecQty AddUpdateqty2342  IncDecQtyforFloatingCart AddUpdateqtyfloatingcart2342" value={`${qty}`} />
                    <span className="dec qtybtn btn btn-primary" data-productid="84576"
                      onClick={() => IncrementDecrementCart('dec', filtered.SkuId, filtered.SKUFilterPriceId)}>
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
          }
          <button className="btn-cart incdecaddtocart AddToCart330"
            onClick={() => IncrementDecrementCart('inc', props.data.SkuId, filtered.SKUFilterPriceId)}
            style={{ display: 'block', right: 'inherit', float: 'right', top: '-45px', position: 'relative', alignSelf: 'center' }} type="button" href >Add to cart</button>
        </span>
      </div>
    </>
  )
}
