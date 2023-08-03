/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@icon/linearicons/linearicons.css';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
//import history from '../../utils/history';
import { addTowishlist } from '../LoadProducts/actions';
import { addToCart, closeMsgBar } from './actions';
import { useRouter } from 'next/router';
export function Product(props) {
  const router = useRouter();
  const { addToCartFunc, closeMsgBarFunc } = props
  const [Seleced, setSeleced] = useState('');
  const [qty, setQty] = useState(0);
  const [QtyCout, setQtyCout] = useState(1);
  const [filtered, setFiltered] = useState(props.data.FiltersList[0]);
  const [Divsize, setDivsize] = useState(0);
  const [BrowserWidth, setBrowserWidth] = useState(0);
  const dispatch = useDispatch()
  const changeFltr = (newFL, SkuId) => {
    setSeleced(newFL);
    const P = props.data.FiltersList.find(i => i.ListItem === newFL);
    setFiltered(P);
  };
  function AddToWishlist(SkuId, SKUFilterPriceId) {
    dispatch(addTowishlist(SkuId, SKUFilterPriceId))
  }
  function AddToCompare() { }
  function LoadProduct() { }
  function IncrementDecrementCart(action) {
    if (action === 'inc') {
      setQty(qty + QtyCout)
      addToCartFunc(qty + 1, props.data.SkuId, filtered.SKUFilterPriceId)
      setTimeout(() => {
        closeMsgBarFunc()
      }, 5000)
    }
    if (action === 'dec') {
      setQty(qty - QtyCout)
      addToCartFunc(qty - 1, props.data.SkuId, filtered.SKUFilterPriceId)
      setTimeout(() => {
        closeMsgBarFunc()
      }, 5000)
    }
  }
  const listRef = useRef();
  function sizeWidth() {
    if (listRef.current !== null) {
      setDivsize(listRef.current.clientWidth)
      setBrowserWidth(window.innerWidth)
    }
    // console.log('listRef.current.clientWidth', listRef.current.clientWidth);
  }
  // const productdetail = (PageUrl) => {
  //   console.log('PageUrl', PageUrl);
  //   history.push('/product/', { skuUrl: PageUrl })
  // }
  useEffect(() => {
    window.addEventListener("resize", sizeWidth);
  }, []);
  useEffect(() => {
    sizeWidth()
  }, [listRef])
  useEffect(() => {
  }, [Divsize, BrowserWidth])
  const { IsDiscountedSFP } = filtered;
  const QtyCoutFun = (e) => {
    setQtyCout(1)
  }
  const productdetail = (PageUrl) => {
    router.push('/product/', { skuUrl: PageUrl })
  }
  return (
    <div key={props.index} className="product-item pr-block" ref={listRef}>
      <div className="product-thumb">
        <Link to="/product/" className="ajaxload">
          <img referrerPolicy='no-referrer' className="pri-img" src={props.data.ListingImage} onClick={() => productdetail(props.data.PageUrl)} alt="Exautic beans" />
        </Link>
        <div className="box-label">
          <div className="label-product label_sale">
            <span id="discountpercent84562" style={{ display: IsDiscountedSFP ? 'block' : 'none' }} >
              {filtered.FilterDiscount} % off
            </span>
          </div>
          <div className="action-links">
            <Link onClick={() => AddToWishlist()} href title="Add to Wishlist" ><i className="lnr lnr-heart" /></Link>
            <Link to onClick={AddToCompare()} title="Compare"><i className="lnr lnr-sync" /> </Link>
            <Link to title="Quick view" className="LoadProduct'coffee-bean') quickmodalview" data-url="coffee-bean" data-toggle="modal" >
              <i className="lnr lnr-magnifier" />
            </Link>
          </div>
          <div className="action-links">
            <Link onClick={() => AddToWishlist(props.data.SkuId, filtered.SKUFilterPriceId)} href title="Add to Wishlist" ><i className="lnr lnr-heart" /></Link>
            <Link to onClick={AddToCompare()} title="Compare"><i className="lnr lnr-sync" /> </Link>
            <Link to title="Quick view" className="quickmodalview" onClick={LoadProduct('coffee-bean')} ata-url="coffee-bean" data-toggle="modal" ><i className="lnr lnr-magnifier" /></Link>
          </div>
        </div>
      </div>
      <div className="product-caption  product-caption-viewall">
        <div className="product-thumb">
          <div className="greenveg">
            <i>{props.data.IsVeg}</i>
          </div>
        </div>
        <div className="product-name">
          <h4>
            <Link to="/product/">{props.data.Name}</Link>
          </h4>
        </div>
        <div className="price-box">
          <span className="regular-price">
            <span className="special-price" id="spprice84562">
              ₹{filtered.FilterSPPrice}
            </span>
          </span>
          <span
            className="old-price"
            id="oldprice84562"
            style={{ display: IsDiscountedSFP ? 'inline-block' : 'none' }}
          >
            <del>₹{filtered.FilterMRPPrice}</del>
          </span>
        </div>
        <div className="uom-box">
          {props.data.FiltersList.length === 1 && (
            <span>{props.data.FiltersList[0].ListItem}</span>
          )}
          {props.data.FiltersList.length > 1 && (
            <select
              onChange={event =>
                changeFltr(event.target.value, props.data.SkuId)
              }
              value={Seleced}
            >
              {props.data.FiltersList.map(itm => (
                <option value={itm.ListItem}>{itm.ListItem}</option>
              ))}
            </select>
          )}
        </div>
        <div className="" style={{ visibility: IsDiscountedSFP ? 'visible' : 'hidden', marginBottom: '3%' }} >
          <span id="savedrstextid84562" className="saved-rs-text">
            You Save:
          </span>
          <span className="saved-rs-text" id="savedrsid84562">
            {' '}
            {filtered.FilterSavedRs}
          </span>
        </div>
        {qty === 0 && (<div>
          <span className="qtyincdec addtocartqtyDivhidden addtocartqtyDiv2706">
            <input type="text" onChange={(e) => QtyCoutFun(e)} className="validateQty addtocartqtytxt addtocartqty84562 addtocartqty2706" id="qty2706" defaultValue={QtyCout} maxLength="2" required="" />
          </span>
          <button className="btn-cart incdecaddtocart AddToCart2706" type="button"
            onClick={() => IncrementDecrementCart('inc')} >
            Add to cart
          </button>
        </div>)}
        {qty > 0 && (<div className="product-qty-parenttest product-qty-parent2720">
          <div className="product-qty fixhomepage IncDecQtyDiv IncrementDecrementQtyDiv2720"
            style={{ display: "block" }}>
            <input type="button" className="IncDecQty AddUpdateqty2342  IncDecQtyforFloatingCart AddUpdateqtyfloatingcart2342" value={`${qty}`} />
            <span className="dec qtybtn btn btn-primary" data-productid="84576" onClick={() => IncrementDecrementCart('dec')}>
              {/* <i className="fa fa-minus"></i> */}
              <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
            </span>
            <span className="inc qtybtn btn btn-primary" data-productid="84576"
              onClick={() => IncrementDecrementCart('inc')}>
              {/* <i className="fa fa-plus"></i> */}
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </span>
          </div>
        </div>)}
      </div>
    </div>
  );
}
Product.propTypes = {
  addToCartFunc: PropTypes.func,
  closeMsgBarFunc: PropTypes.func,
};
const mapStateToProps = state => { }
//   ({ qty: state.dealdayProduct.qty })
//   ;
function mapDispatchToProps(dispatch) {
  return {
    addToCartFunc: (qty, SkuId, SKUFilterPriceId) => dispatch(addToCart(qty, SkuId, SKUFilterPriceId)),
    closeMsgBarFunc: () => dispatch(closeMsgBar())
  };
}
const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(Product);