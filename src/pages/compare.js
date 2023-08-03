/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 *
 * Products
 *
 */
import React, { memo } from 'react';
// import { useCookies } from "react-cookie";
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import '../../public/assets1/css/bundle.css';
import '../../public/assets1/css/default.min.css';
import '../../public/assets1/css/font-awesome.min.css';
import '../../public/assets1/css/responsive.min.css';
import '../../public/assets1/css/style.min.css';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SubNavigation from '../components/SubNavigation';
// import AddToCart from '../AddToCart';
// import mycartAPI from '../MainPage/api/mycartAPI';
// import history from '../../utils/history';
// import AddItem from './AddItem';
import reducer from '../containers/Products/reducer';
import saga from '../containers/Products/saga';
// import Select from './select';
import makeSelectProducts from '../containers/Products/selectors';
// import { ToppSellingOriginal } from '../ToppSellingOriginal/index';
// import RelatedProduct from '../RelatedProduct';
// import TopsellingProduct from '../TopsellingProduct';
import Loadcompare from '../containers/Products/Loadcompare';
import BreadCrumb from '../containers/MyAccount/compareBreadCrumb';
// import RecentlyViewProduct from '../RecentlyViewProduct';
// import ReorderProduct from '../ReorderProduct';
import 'react-toastify/dist/ReactToastify.css';
export function Products() {
  useInjectReducer({ key: 'products', reducer });
  useInjectSaga({ key: 'products', saga });
  // const [cookies, removeCookie] = useCookies(['name']);
  // const [Seleced, setSeleced] = useState('');
  // const [shoppingCart, setShoppingCart] = useState([]);
  // const [filtered, setFiltered] = useState([]);
  // const [productdata, setproductdata] = useState([]);
  // const [Seleced, setSeleced] = useState('');
  // const [pdata, setpdata] = useState([]);
  // const addToCartRdcr = useSelector(state => state.addToCart)
  const homeScreen = useSelector(state => state.homeScreen)
  // const [productdata, setproductdata] = useState([]);
  // const Product = cookies.name
  const productcompareReducer = useSelector(state => state.products)
  const reducerproducts = useSelector(state => state.loadProducts);
  console.log('products++', reducerproducts);
  console.log('productcompareReducer', productcompareReducer, homeScreen);
  // const changeFltr = (newFL, item) => {
  //   setSeleced(newFL);
  //   const P = item.FilterList ? item.FilterList.find(i => i.ListItem === newFL) : item.FiltersList.find(i => i.ListItem === newFL)
  //   console.log('filterd', item);
  //   setFiltered(P);
  // };
  // useEffect(() => {
  //   if (props.data !== undefined) {
  //     setFiltered(props.data && props.data.FiltersList)
  //   }
  // }, [props])
  // useEffect(() => {
  //   setFiltered(props.data.FilterList[0] ? props.data.FilterList[0] : props.data.FiltersList[0])
  // }, [])
  // useEffect(() => {
  //   if (productcompareReducer !== undefined) {
  //     setFiltered(productcompareReducer.skucode)
  //   }
  // }, [productcompareReducer])
  // useEffect(() => {
  //   if (addToCartRdcr !== undefined) {
  //     setShoppingCart(addToCartRdcr.shoppingCartDetails)
  //   }
  // }, [addToCartRdcr])
  // useEffect(() => {
  //   if (homeScreen !== undefined) {
  //     setShoppingCart(homeScreen.shoppingCartDetails)
  //   }
  // }, [homeScreen])
  // useEffect(() => {
  //   mycartAPI.getShoppingcartDetails()
  //     .then(response => {
  //       console.log('uuuuusss', response)
  //       setShoppingCart(response)
  //     })
  //     .catch(error => {
  //       console.log('error:::', error);
  //     });
  // }, [])
  // useEffect(() => {
  //   setpdata(productdata.join(JSON.parse(data)))
  // }, [data])
  // const productdata = JSON.parse(data)
  // console.log({ Product }, JSON.parse(data));
  // function deleteProduct(SkuId) {
  //   // removeCookie('name', { path: '/' })
  //   // console.log(productdata.length, SkuId);
  //   localStorage.key('Comapredata')
  //   productdata.pop(SkuId)
  // }
  // const productdetail = (PageUrl) => {
  //   history.push('/product/', { skuUrl: PageUrl })
  //   localStorage.setItem('PageUrl', window.btoa(PageUrl))
  // }
  // console.log('propduct', filtered,);
  // const SelectDrop = props => (
  //   <td className="pk-size width-30-per">
  //     <select onChange={event => changeFltr(event.target.value, props)} value={Seleced} >
  //       {props && props.data.FilterList.map(itm => (
  //         <option value={itm.ListItem}>{itm.ListItem}</option>
  //       ))}
  //     </select>
  //   </td>
  // )
  // console.log(' 83746', productdata);
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <Header />
      <BreadCrumb activepage="Compare" />
      
      <div className="comparison-wrapper pb-50">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <main id="primary" className="site-main">
                <div className="comparison">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="section-title">
                        <h3>Product Comparison</h3>
                      </div>
                      <div className="table-responsive" id="last_purchaseddiv">
                        <input type="hidden" id="countcart" data-countval="2" />
                        <input type="hidden" className="PriceId" value="14424" />
                        {/* {(productdata || []).map(item => */}
                        {/* {productdata.length === [] ? <div className="col-md-12" style={{ padding: '5%' }}>
                          <div className="alert alert-warning">No more products</div>
                        </div> : */}
                        {/* <Loadcompare data={productdata} msg="No more products" /> */}
                        <Loadcompare msg="No more products" />
                        {/* } */}
                        {/* } */}
                        {/* )} */}
                        {/* <table className="table table-bordered" id="last_Purchased">
                          <thead>
                            <tr>
                              <th>Product Image</th>
                              <th id="reorder_pName" style={{ textAlign: 'left' }}>Product Name  <i className="fa fa-sort" aria-hidden="true"></i></th>
                              <th style={{ textAlign: 'left' }}>Pack Size</th>
                              <th id="reorder_Amount" style={{ textAlign: 'left' }}>Unit Price (₹)  <i className="fa fa-sort" aria-hidden="true"></i></th>
                              <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                          </thead> */}
                        {/* {loading === true ?
                                <tbody>
                                  <tr>
                                    <td colSpan={6}>
                                      <div className='row'>
                                        <div className='col-lg-12 text-center mt-25 mb-25' >
                                          <i
                                            style={{ justifySelf: 'center' }}
                                            className="fa fa-spin fa-spinner fa-4x"></i>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                                : */}
                        {/* <tbody>
                            {(productdata || []).map(item =>
                              <Loadcompare data={item} />
                            )}
                          </tbody>
                          {/* } */}
                        {/* </table>  */}
                      </div>
                      {/* <div className="table-responsive  text-center pr-block">
                        <table id="comparefix" className="table table-bordered compare-style">
                          <thead>
                            <tr>
                              <td className="product-title width-2-per textbold" style={{ whiteSpace: 'nowrap' }}>Product Image </td>
                              {(productdata || []).map((item, index) =>
                                <td className="width-30-per position-relative" align="center">
                                  <i className="fa fa-trash close-btnx btncompare"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => deleteProduct(index)}
                                  ></i>
                                  <div
                                    style={{ positionL: 'relative', width: '200px', cursor: 'pointer' }}>
                                    <a href onClick={() => productdetail(item.PageUrl)}>
                                      <img src={item.ListingImage}
                                        referrerPolicy='no-referrer'
                                        className="js-lazy-img" width="150" height="150" alt='' />
                                    </a>
                                  </div>
                                </td>
                              )}
                            </tr>
                            <tr>
                              <td className="product-title width-10-per textbold">Product Name</td>
                              {(productdata || []).map((item) =>
                                <td className="width-30-per" style={{ minWidth: '300px' }} > <span> {item.SkuCode}</span>
                                </td>
                              )}
                            </tr>
                            <tr>
                              <td className="product-title width-10-per textbold">
                                Pack Size </td>
                              {(productdata || []).map((item,) =>
                                // <td className="pk-size width-30-per">
                                //   <Select data={item} />
                                // </td>
                                <SelectDrop data={item} />
                              )}
                            </tr>
                            <tr>
                              <td className="product-title width-10-per textbold">Price</td>
                              {(productdata || []).map((item) =>
                                <td className="width-30-per" style={{ minWidth: '300px' }}>
                                  <span id="spprice83839">
                                    ₹  {item.SkuId === filtered.SkuDetailId ? filtered.FilterSPPrice : null}
                                  </span>
                                </td>
                              )}
                            </tr>
                            <tr>
                              <td className="product-title width-10-per textbold">Actions</td>
                              {(productdata || []).map((item) =>
                                <td className="pr-block  text-center width-30-per SkuId_83839 available ">
                                  <AddToCart data={item} shoppingCart={shoppingCart} filtered={filtered} />
                                </td>
                              )}
                            </tr>
                          </thead>
                        </table>
                      </div> */}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      {/* <RecentlyViewProduct />
      <ReorderProduct /> */}
      {/* <ToppSellingOriginal /> */}
      {/* <TopsellingProduct /> */}
      {/* <RelatedProduct /> */}
      <Footer />
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
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
)(Products);
