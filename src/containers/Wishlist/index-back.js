/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable indent */
/**
 *
 * Wishlist
 *
 */
import React, { memo, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SubNavigation from '../../components/SubNavigation';
import history from '../../utils/history';
import AddToCart from '../AddToCart';
import CustomsAPI from '../MainPage/api/homeServices';
import mycartAPI from '../MainPage/api/mycartAPI';
import BreadCrumb from '../MyAccount/myAccountBreadcrumb';
import MyAccountSideNav from '../MyAccount/MyAccountSideNav';
import { getWishlist, removewishlist } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectWishlist from './selectors';
import Success from '../../components/ShowAlert/success';
import 'react-toastify/dist/ReactToastify.css';
import logoanimation from '../../images/adibuja-logo-animation.gif'
export function Wishlist() {
  useInjectReducer({ key: 'wishlist', reducer });
  useInjectSaga({ key: 'wishlist', saga });
  // const dispatch = useDispatch()
  // const wishlistState = useSelector(state => state);
  // const loadProducts = useSelector(state => state.loadProducts)
  // console.log('loadProducts1', loadProducts);
  const [wishlistdata, setwishlistdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [enablepopup, setenablepopup] = useState(false);
  const [show, setShow] = useState(false);
  const [showmsg, setShowmsg] = useState('');
  const homeScreen = useSelector(state => state.homeScreen)
  const addtocartreducer = useSelector(state => state.addToCart)
  const wishlistReducerData = useSelector(state => state.wishlist)
  console.log("wishlistReducerData=", wishlistReducerData);
  console.log({ homeScreen });
  const dispatch = useDispatch()
  const [isUserLogin, setIsUserLogin] = useState()
  console.log('isUserLogin--', isUserLogin)
  useEffect(() => {
    // setufirstname(window.atob(localStorage.getItem('UserFirstName')))
    // setlastnamw(window.atob(localStorage.getItem('UserLastName')))
    // setphone(localStorage.getItem('UserLastPhone'))
    console.log(`47--${window.atob(localStorage.getItem('CustGUID'))}`)
    // console.log(`48--${ localStorage.hasOwnProperty('CustGUID')}`)
    if (Object.prototype.hasOwnProperty.call(localStorage, 'CustGUID')) {
      if (window.atob(localStorage.getItem('CustGUID')) !== null || window.atob(localStorage.getItem('CustGUID')) !== undefined || window.atob(localStorage.getItem('CustGUID')) !== '00000000-0000-0000-0000-000000000000') {
        console.log('51')
        setIsUserLogin(true)
      } else {
        console.log('54')
        setIsUserLogin(false)
      }
    } else {
      setIsUserLogin(false)
    }
    // if (localStorage.hasOwnProperty('CustGUID') === false) {
    // }
  }, [isUserLogin])
  useEffect(() => {
    // if (localStorage.getItem('CustGUID') === null) {
    //   history.push('/login')
    // } else {
    setloading(true)
    CustomsAPI.getwishlist({})
      .then(response => {
        setloading(false)
        setwishlistdata(response);
        console.log("responsewishlist..", response);
        localStorage.setItem('length', response.length)
      })
    // }
  }, [])
  function removeItemwishlist(SkuId, WishlistGUID, SKUFilterPriceId) {
    CustomsAPI.removewishlist(SkuId, WishlistGUID, SKUFilterPriceId)
      .then(res => {
        setShow(true)
        setShowmsg("Item deleted successfully")
        CustomsAPI.getwishlist({}).then(response => {
          setwishlistdata(response);
          localStorage.setItem('length', response.length)
        })
      })
  }
  // useEffect(() => {
  //   CustomsAPI.getwishlist({})
  //     .then(response => {
  //       setwishlistdata(response);
  //       // alert(response)
  //       // toast(response)
  //     })
  // })
  useEffect(() => {
    mycartAPI.getShoppingcartDetails()
      .then(response => {
        console.log('uuuuusss', response)
        setShoppingCart(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [addtocartreducer])
  // useEffect(() => {
  //   if (homeScreen !== undefined) {
  //     setShoppingCart(homeScreen.shoppingCartDetails)
  //   }
  // }, [homeScreen])
  // const showmodel = () =>{
  //   setenablepopup(true)
  // }
  const yesnopopup = d => (
    <div className="modal show" id="confirmmodal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body text-center">
            <button type="button" className="close" data-dismiss="modal">×</button>
            <h4 className="modal-title">Are you sure you want to remove? </h4><br />
            <button type='button' id="modal-btn-si" className="btn btn-default btn-secondary">Yes</button>
            <button type='button' className="btn btn-default btn-secondary" id="modal-btn-no">No</button>
          </div>
        </div>
      </div>
    </div>
  )
  const productdetail = (PageUrl) => {
    history.push(`/product/${PageUrl}`, { skuUrl: PageUrl })
    // history.push(`/product/${PageUrl}`, { state: { PageUrl } })
    localStorage.setItem('PageUrl', window.btoa(PageUrl))
  }
  // const openInNewTab = (url) => {
  //   window.open(url, '_blank')
  // }
  useEffect(() => {
    setInterval(() => {
      setShow(false)
    }, 5000);
  }, [closemsg])
  const closemsg = () => {
  }
  return (
    <>
      {
        // (isUserLogin === true || isUserLogin !== null || isUserLogin !== undefined)
        (isUserLogin === false)
          ?
          history.push({ pathname: '/login', })
          :
          <div>
            <ToastContainer
              position="top-right"
            // draggable={true}
            // autoClose={50000}
            />
            {show && <Success msg={showmsg} close={closemsg} />}
            <Header />
            <BreadCrumb myAccount="My Account" activepage="My Wishlist" />
            {/* <SubNavigation /> */}
            <div className="my-account-wrapper pb-20" >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <main id="primary" className="site-main">
                      <div className="user-dashboard">
                        <div className="main-dashboard">
                          <div className="row">
                            <MyAccountSideNav />
                            <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                              <div className="tab-content dashboard-content" id="profile">
                                <h3>My Wishlist </h3>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12" id="wishlist-Myaccount">
                                  <div className="table-responsive">
                                    <table className="table ">
                                      <thead>
                                        <tr style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                          <th style={{ fontWeight: 700, fontSize: '16px' }}>Product Image</th>
                                          <th className="text-left whishlist-lg" style={{ fontWeight: 700, fontSize: '16px' }}>Product Name</th>
                                          <th className="text-center whishlist-lg" style={{ fontWeight: 700, fontSize: '16px' }}>Pack Size</th>
                                          <th className="text-right whishlist-lg" style={{ fontWeight: 700, fontSize: '16px' }}>Unit Price (₹)</th>
                                          <th style={{ textAlign: 'center', width: '260px', fontWeight: 700, fontSize: '16px' }}>Action</th>
                                          <th className="text-center whishlist-lg" style={{ fontWeight: 700, fontSize: '16px' }}>Remove</th>
                                        </tr>
                                      </thead>
                                      {loading === true ?
                                        <tbody>
                                          <tr>
                                            <td colSpan={6}>
                                              <div className='row'>
                                                <div className='col-lg-12 text-center mt-25 mb-25' >
                                                  <img src={logoanimation} alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
                                                  {/* <i
                                              style={{ justifySelf: 'center' }}
                                              className="fa fa-spin fa-spinner fa-4x"></i> */}
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                        :
                                        <tbody id="wish_list">
                                          {wishlistdata.length === 0 ?
                                            // <td colSpan="5">
                                            //   <div className="col-md-12" style={{ padding: '5%' }}>
                                            //     <div className="alert alert-warning"><strong>Empty Wishlist </strong> <br />You have no items in your wishlist. Start adding!</div>
                                            //   </div>
                                            // </td>
                                            <tr>
                                              <td colSpan="12" className="mycart_17">
                                                <div className="col-md-12" style={{ padding: '5%' }}>
                                                  <div className="alert alert-warning"><strong>Empty Cart </strong> <br />
                                                    <span className='wishlistemptymsg'>
                                                      Your cart is empty. Start adding!
                                                    </span></div>
                                                  <Link to="/" className="btn btn-secondary" style={{ color: 'white', backgroundColor: '#000' }}>Continue Shopping</Link>
                                                </div>
                                              </td>
                                            </tr>
                                            : null}
                                          {(wishlistdata || []).map((data,) => (
                                            <tr className={data.IsDeliveryAvailableToPinCode ? "pr-block " : "pr-block delivery-not-available"} style={{ borderBottom: '1px #EEE solid' }}>
                                              {data.IsDeliveryAvailableToPinCode ?
                                                <td width="200" className="wish_list_td_1">
                                                  <input type="hidden" className="PriceId" value="330" />
                                                  <Link onClick={() => productdetail(data.SkuLink)} target="_self" className="ajaxload">
                                                    <img referrerPolicy='no-referrer' style={{ width: '150px', height: '150px' }}
                                                      src={data.ListingImage} alt={data.SkuCode} />
                                                  </Link>
                                                </td> :
                                                <td width="200" className="wish_list_td_1">
                                                  <input type="hidden" className="PriceId" value="330" />
                                                  <img referrerPolicy='no-referrer' style={{ width: '150px', height: '150px' }}
                                                    src={data.ListingImage} alt={data.SkuCode} />
                                                </td>}
                                              <td className="text-left whishlist-lg wish_list_td_2">
                                                {data.IsDeliveryAvailableToPinCode ?
                                                  <p>
                                                    <strong>
                                                      {/* <Link to={'/wishlist'} onClick={() => productdetail(data.SkuLink)}>{data.SkuCode}</Link> */}
                                                      <Link onClick={() => productdetail(data.SkuLink)}>{data.SkuCode}</Link>
                                                      {/* <a href={`/product/${data.SkuLink}`} target="_blank" onClick={() => productdetail(data.SkuLink)}>{data.SkuCode}</a> */}
                                                    </strong>
                                                  </p> : <p>
                                                    <strong>
                                                      {data.SkuCode}
                                                    </strong>
                                                  </p>}
                                              </td>
                                              <td className="text-center wish_list_td_3"><span style={{ display: 'none' }} className="moblbldsp">Pack Size : </span>{data.ListItem}</td>
                                              <td className="text-right whishlist-lg wish_list_td_4">
                                                <div className="price">
                                                  <span style={{ display: 'none' }} className="moblbldsp">Unit Price : </span>
                                                  <span style={{ color: '#212529 !important' }}>
                                                    ₹
                                                    {parseFloat(data.FilterSPPrice).toFixed(2)}
                                                    {console.log("price..", `${data.FilterSPPrice}`)}
                                                  </span>
                                                </div>
                                              </td>
                                              <td className="wish_list_td_5 position-relative text-center">
                                                {/* <div className="product-caption">
                                          <span className="qtyincdec addtocartqtyDivhidden addtocartqtyDiv330" style={{ display: 'block' }}>
                                            <input type="text" className="validateQty addtocartqtytxt addtocartqty@wishlist.SkuId addtocartqty330" id="qty330" value="1" min="1" max="100" maxLength="2" required="" />
                                          </span>
                                          <button className="btn-cart btn-sm incdecaddtocart AddToCart330" type="button" style={{ display: 'block' }} data-wishlistid="0f37dbd6-29d6-4c80-9209-91782dbfb75b" data-productid="83839" onClick="AddCart(this,'.addtocartqty330')" title="Add to Cart">Add to Cart</button>
                                          <div className="product-qty-parenttest product-qty-parent330" style={{ display: 'none' }}>
                                            <div className="product-qty  IncDecQtyDiv IncrementDecrementQtyDiv330" style={{ display: 'none' }}>
                                              <input type="button" className="IncDecQty  AddUpdateqty330" value="1" />
                                              <span className="dec qtybtn btn btn-primary" >
                                                <i className="fa fa-minus"></i>
                                              </span>
                                              <span className="inc qtybtn btn btn-primary" >
                                                <i className="fa fa-plus"></i>
                                              </span>
                                            </div>
                                          </div>
                                        </div> */}
                                                {data.IsDeliveryAvailableToPinCode ?
                                                  <div className='wishlistaddtocartandqty'>
                                                    {/* <span className="skuqty">Qty:&nbsp; <span id='wishlistqty' contentEditable="true">{data.SkuQuantity}</span></span>&nbsp;&nbsp; */}
                                                    <AddToCart data={data} shoppingCart={shoppingCart} filtered={data} skulisting wishlist></AddToCart>
                                                  </div>
                                                  :
                                                  <div style={{ textAlign: 'center' }}>
                                                    Can't deliver to pin code <b> 411045</b>
                                                  </div>
                                                }
                                              </td>
                                              <td align="center" className="wish_list_td_6" onClick={() => removeItemwishlist(data.SkuId, data.WishlistGUID, data.SKUFilterPriceId)}>
                                                <i type='button' className="lnr lnr-trash btn-remove text-danger" style={{ fontSize: '20px', marginTop: '20px' }} title="Remove" ></i>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>}
                                    </table>
                                  </div>
                                </div>
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
          </div>
      }
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  wishlist: makeSelectWishlist(),
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(Wishlist);
