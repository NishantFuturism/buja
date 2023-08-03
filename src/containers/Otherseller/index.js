/* eslint-disable no-unused-vars */
/**
 *
 * Otherseller
 *
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SubNavigation from '../../components/SubNavigation';
import AddToCart from '../AddToCart/AddtocartSeller';
import history from '../../utils/history';
import mycartAPI from '../MainPage/api/mycartAPI';
// import mycartAPI from '../MainPage/api/mycartAPI';
import { getlistseller } from './actions';
import reducer from './reducer';
import saga from './saga';
import BreadCrumb from '../MyAccount/myAccountBreadcrumb';
import 'react-toastify/dist/ReactToastify.css';
export function Otherseller(props) {
  useInjectReducer({ key: 'otherseller', reducer });
  useInjectSaga({ key: 'otherseller', saga });
  const [listdata, setlistdata] = useState([]);
  const othersellerReducer = useSelector(state => state.otherseller)
  const sellerShoppingData = useSelector(state => state.otherseller)
  console.log('mnbnmb', othersellerReducer);
  const productReducer = useSelector(state => state.product)
  const [shoppingCart, setShoppingCart] = useState([]);
  const [buynowclick, setBuynowclick] = useState(false);
  const homeScreenstate = useSelector(state => state.homeScreen)
  const addToCartRdcr = useSelector(state => state.addToCart)
  console.log('saller addToCartRdcr', addToCartRdcr);
  // useEffect(() => {
  //   if (addToCartRdcr !== undefined) {
  //     setShoppingCart(addToCartRdcr.shoppingCartDetails)
  //   }
  // }, [addToCartRdcr])
  // const [skuid, setskuid] = useState('');
  const dispatch = useDispatch()
  const location = useLocation()
  const params = useHistory()
  console.log('location', location, params);
  useEffect(() => {
    // if (location && location.state && location.state.skudetailid) {
    //   // setskuid(location.state.skudetailid)
    // }
  }, [location])
  useEffect(() => {
    const skudetailid = localStorage.getItem('skudetailid')
    const formfielid = localStorage.getItem('ValueId')
    console.log('skudetailid', skudetailid, formfielid);
    dispatch(getlistseller(localStorage.getItem('skudetailid'), formfielid))
    // if (location && location.state && location.state.skudetailid !== undefined) {
    //   // setskuid(location.state.skudetailid)
    //   dispatch(getlistseller('83818'))
    // }
  }, [location])
  useEffect(() => {
    if (othersellerReducer !== undefined) {
      setlistdata(othersellerReducer && othersellerReducer.sellerlist)
    }
  }, [othersellerReducer])
  // useEffect(() => {
  //   if (sellerShoppingData !== undefined) {
  //     console.log('useeffect shoppingcart', shoppingCart);
  //     setShoppingCart(sellerShoppingData.shoppingDetailsHome)
  //   }
  // }, [sellerShoppingData])
  useEffect(() => {
    mycartAPI.getShoppingcartDetails({})
      .then(response => {
        console.log('useeffect addtocart', addToCartRdcr);
        setShoppingCart(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [addToCartRdcr])
  useEffect(() => {
    if (addToCartRdcr !== undefined) {
      console.log('useeffect addtocart', addToCartRdcr);
      setShoppingCart(addToCartRdcr.shoppingCartDetails)
    }
  }, [addToCartRdcr,])
  // const handleBuynow = () => {
  //   history.push('/cart')
  // }
  const handleBuynow = () => {
    //     skuId: 
    // 86573
    // skufilterpriceid: 
    // 12650
    // console.log("SkuId, SKUFilterPriceId)", SkuId, SKUFilterPriceId);
    // const qty = 0
    // dispatch(addToCart(qty + 1, SkuId, SKUFilterPriceId))
    // setViewCart(true)
    setBuynowclick(true)
    // history.push('/cart')
  }
  useEffect(() => {
    if (buynowclick) {
      history.push('/cart')
    }
  }, [buynowclick])
  const productName = localStorage.getItem('productname')
  console.log("listdata, shoppingdetails, addtocart", listdata, shoppingCart, addToCartRdcr);
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <Header />
      <BreadCrumb myAccount="Products" productname={productName} activepage="Sellers List" />
      <SubNavigation />
      <div style={{ padding: '0px 0px 0px 27px !important' }}>
        <h1>
          {/* Seller List -    {(listdata || []).map(data => data.DisplayName)} */}
        </h1>
      </div>
      <div className="shopping-cart-wrapper card-details pb-70">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <main id="primary" className="site-main">
                <div className="shopping-cart">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 fixmobile">
                      <div className="table-responsive sellerpdpListing" id="last_purchaseddiv">
                        {listdata && listdata === 0 && <p>no seller found</p>}
                        <table className="table table-bordered" id="last_Purchased">
                          <thead>
                            <tr>
                              <th>
                                Seller
                              </th>
                              <th style={{ display: 'none' }}>
                              </th>
                              <th style={{ width: '150px' }}>
                                Price
                              </th>
                              <th>
                                Delivery
                              </th>
                              <th>
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(listdata || []).map(data =>
                              <tr className="pr-block">
                                <td className="text-capitalize">{data.name}</td>
                                <td style={{ display: 'none' }}>
                                  <input type="hidden" className="PriceId" value="19051" />
                                </td>
                                <td>
                                  ₹{data.SPPrice.toFixed(2)}
                                </td>
                                <td>
                                  {data.DeliveryTime}
                                </td>
                                <td>
                                  {/* <span className="qtyincdec   addtocartqtyDivhidden addtocartqtyDiv19051">
                                    <input type="text" data-qty="" name="qty" className="mb-10 validateQty addtocartqtytxt addtocartqty90690 addtocartqty19051" id="qty19051" value="1" min="1" max="100" maxLength="5" onKeyPress="if (!window.__cfRLUnblockHandlers) return false; validateNumber(event);" onKeyUp="if (!window.__cfRLUnblockHandlers) return false; validateValue(19051)" required="" />
                                  </span>
                                  <div className="product-qty  IncDecQtyDiv IncrementDecrementQtyDiv19051" style={{ display: 'none' }}>
                                    <input type="button" className="IncDecQty  AddUpdateqty19051" />
                                    <span className="dec qtybtn btn btn-primary">
                                      <i className="fa fa-minus"></i>
                                    </span>
                                    <span className="inc qtybtn btn btn-primary" >
                                      <i className="fa fa-plus"></i>
                                    </span>
                                  </div>
                                  <button className="btn-cart btn_atc lg-btn add_cart incdecaddtocart AddToCart19051" data-productid="90690" type="button" onClick="if (!window.__cfRLUnblockHandlers) return false; IncrementDecrementQuantityCartS  ellerPDP('Add',this)" href="#.">Add To Cart</button>
                                  <button type='button' className="btn-cart btn_atc lg-btn buy-now" >Buy Now</button> */}
                                  <div className='sellerbtnBox' >
                                    {/* <AddToCart data={data} shoppingCart={shoppingCart} filtered={data.Filterlist} filte ></AddToCart> */}
                                    <AddToCart data={data} shoppingCart={shoppingCart} filtered={data} notify={data.IsNotified} PDPpage />
                                    {/* <AddToCart data={data} shoppingCart={shoppingCart} filtered={data.Filterlist} /> */}
                                    {/* {data[0].FilterList.map((item)=>{ */}
                                    <>{data.InStock ?
                                      <div className='sellerbtnbuy'>
                                        <button type='button'
                                          onClick={() => handleBuynow()}
                                          className="btn-cart btn_atc lg-btn buy-now mt-0" id="sellerbuynow">Buy Now</button>
                                      </div> : null}</>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
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
    </>
  );
}
export default (Otherseller);
