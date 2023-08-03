/* eslint-disable indent */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import '../../../assets1/css/bundle.css';
import '../../../assets1/css/default.min.css';
import '../../../assets1/css/font-awesome.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
// import SubNavigation from '../../components/SubNavigation';
import LoadProducts from '../LoadProducts';
import BrandAPI from '../MainPage/api/shopbybrand';
import { ToppSellingOriginal } from '../ToppSellingOriginal/index';
import Footer from '../../components/Footer/index';
import { copyShopingCartDetails } from '../HomeScreen/actions';
import BreadCrumb from '../MyAccount/myAccountBreadcrumb';
import 'react-toastify/dist/ReactToastify.css';
import logoanimation from '../../images/adibuja-logo-animation.gif'
export default function BrandProducts() {
  const brandlistdata = useSelector(state => state.homeScreen)
  const addToCart = useSelector(state => state.addToCart)
  const [urlpage, seturlpage] = useState('');
  const [loading, setloading] = useState(false);
  const [brandproductdata, setbrandproductdata] = useState([]);
  const [Seleced, setSeleced] = useState('POP');
  const sortByfiltersList = [{ ListItem: ' Name (A - Z)', id: 1, value: 'AZ' }, { ListItem: ' Name (Z - A)', id: 2, value: 'ZA' }, { ListItem: 'Price (Low - High)', id: 3, value: 'PLH' }, { ListItem: 'Price (High - Low)', id: 4, value: 'PHL' }, { ListItem: 'Popularity', id: 5, value: 'POP' }]
  const nextData = useSelector(state => state.ToppSelling)
  const [shppingcart, setShppingcart] = useState([]);
  console.log("nextData==>", nextData);
  console.log({ brandlistdata });
  const Location = useLocation()
  console.log('location', Location);
  const dispatch = useDispatch()
  useEffect(() => {
    window.scroll(0, 0)
  }, []);
  useEffect(() => {
    if (addToCart !== undefined) {
      dispatch(copyShopingCartDetails(addToCart.shoppingcartDetails))
    }
  }, [addToCart]);
  useEffect(() => {
    setloading(true)
    if (Location && Location.pathname !== undefined) {
      const url = Location.pathname.split('/')
      console.log('url', url);
      BrandAPI.brandlistproduct(url[2], Seleced)
        .then(response => {
          console.log('uuuuu', response)
          setbrandproductdata(response.skuListingModels)
          setloading(false)
        })
        .catch(error => {
          console.log('error:::', error);
        });
      seturlpage(url[2])
    }
  }, [nextData])
  const changeFltr = (newFL) => {
    setSeleced(newFL);
    console.log("newFLnewFL", newFL, Seleced);
    if (newFL) {
      if (Location && Location.pathname !== undefined) {
        const url = Location.pathname.split('/')
        console.log('url', url);
        BrandAPI.brandlistproduct(url[2], newFL)
          .then(response => {
            console.log('uuuuu', response)
            setbrandproductdata(response.skuListingModels)
            setloading(false)
          })
          .catch(error => {
            console.log('error:::', error);
          });
      }
    }
    else {
      // SearchAPI.getsearchlist(localStorage.getItem('search'), "", "", "", "", "", newFL)
      //   .then(response => {
      //     console.log("responseresponse", response);
      //     setProductCount(response.skuListingModels && response.skuListingModels.length)
      //     setfilterproduct(response.skuListingModels)
      //     setFilterflag(true)
      //   })
    }
    // const P = sortByfiltersList.find(i => i.ListItem === newFL);
    // setFiltered(P);
  };
  useEffect(() => {
    if (addToCart !== undefined) {
      console.log("useffect setShppingcart");
      setShppingcart(addToCart.shoppingcartDetails)
    }
  }, [addToCart]);
  useEffect(() => {
    if (nextData !== undefined && nextData.shoppingDetailsHome.length !== 0) {
      console.log("useffect setShppingcart");
      setShppingcart(nextData.shoppingDetailsHome)
    }
  }, [nextData,]);
  // console.log(urlpage);
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <Header />
      <BreadCrumb myAccount="Brand" activepage={urlpage} />
      {/* <SubNavigation /> */}
      <div className="main-wrapper" id="mainwraper">
        <div className="container-fluid" id="shop">
          <div className="row">
            <div className="col-lg-12 brandpage">
              <h1>{urlpage}</h1>
              <div className="product-shop-main-wrapper" id="product-listing">
                {/* <div className="shop-baner-img mb-70">
                  <br />
                  <div id="paginginfo" data-itemcount="" data-paginationlimit="40" data-filters="" data-page="1"
                    data-limit="40"></div>
                </div> */}
                {/* <div className="shop-top-bar mb-30">
                  <div className="row" id="pageTopFilters">
                    <div className="col-md-6">
                      <div className="top-bar-left">
                        <div className="product-page">
                          <div className="showingleft">Showing <span id="start-index">1</span> to <span id="end-index">1</span> of
                            <span id="total-product-count">1</span> (<span id="current-page">1</span> page)</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="top-bar-right">
                        <div className="per-page">
                          <p className="showleft">Show : </p>
                          <select className="nice-select" name="limit"
                            onChange="if (!window.__cfRLUnblockHandlers) return false; ChangeBrandLimit(this.value)"
                            id="pagination_limit111" style={{ display: 'none' }}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40" selected="">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                            <option value="70">70</option>
                            <option value="100">100</option>
                          </select>
                          <div className="nice-select" ><span className="current">40</span>
                            <ul className="list">
                              <li data-value="10" className="option">10</li>
                              <li data-value="20" className="option">20</li>
                              <li data-value="30" className="option">30</li>
                              <li data-value="40" className="option selected">40</li>
                              <li data-value="50" className="option">50</li>
                              <li data-value="60" className="option">60</li>
                              <li data-value="70" className="option">70</li>
                              <li data-value="100" className="option">100</li>
                            </ul>
                          </div>
                        </div>
                        <div className="product-short">
                          <p className="sortleft">Sort By : </p>
                          <select className="nice-select" name="sortby"
                            onChange="if (!window.__cfRLUnblockHandlers) return false; ChangeSortOrder(this.value)"
                            id="sortby_limit" style={{ display: 'none' }}>
                            <option value="AZ"> Name(A - Z)</option>
                            <option value="ZA">Name(Z - A)</option>
                            <option value="PLH"> Price(Low - High)</option>
                            <option value="PHL"> Price(High - Low)</option>
                            <option value="POP" selected="">Popularity</option>
                          </select>
                          <div className="nice-select" ><span className="current">Popularity</span>
                            <ul className="list">
                              <li data-value="AZ" className="option"> Name(A - Z)</li>
                              <li data-value="ZA" className="option">Name(Z - A)</li>
                              <li data-value="PLH" className="option"> Price(Low - High)</li>
                              <li data-value="PHL" className="option"> Price(High - Low)</li>
                              <li data-value="POP" className="option selected">Popularity</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-12">
                  <div className='top-bar-right'>
                    <div className='product-view-mode' id="made" >
                      <div className="product-short" id="sortby">
                        <p>Sort By : </p>
                        &nbsp; &nbsp;
                        <select
                          className="nice-select"
                          name="sortby"
                          // onChange=""
                          id="sortby_limit"
                          // style={{ display: "none" }}
                          onChange={event => changeFltr(event.target.value)} value={Seleced}
                        >
                          {sortByfiltersList.map(itm => (
                            <option value={itm.value}>{itm.ListItem}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shop-product-wrap row " id="show">
                  <input type="hidden" id="hdnMaxPriceForReset" value="0" />
                  <input type="hidden" id="hdnMinPriceForReset" value="0" />
                  {loading ?
                    <div className='col-lg-12 text-center mt-25 mb-25' >
                      <img src={logoanimation} alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
                      {/* <i
                        style={{ justifySelf: 'center' }}
                        className="fa fa-spin fa-spinner fa-4x"></i> */}
                    </div> :
                    <div id="products" className="shop-product-wrap row grid" style={{ display: 'contents' }}>
                      {brandproductdata && brandproductdata.length === 0 ?
                        <div className="col-md-12" style={{ padding: '5%' }}>
                          <div className="alert alert-warning">No more products</div>
                        </div> :
                        (brandproductdata || []).map(data =>
                          <div className="col-lg-3 col-md-4 col-sm-6 brand-product">
                            <LoadProducts data={data} shppingcart={shppingcart} skulisting />
                          </div>
                        )}
                    </div>}
                  <div id="quick_views">
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-12 ">
              <div className="pagination-area pt-35 pb-20 mb-30">
                <div className="row">
                  <div className="col-12">
                    <ul style={{ margin: 0 }} className="pagination pagination-box"></ul>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <ToppSellingOriginal deal={nextData && nextData.dealData} />
      <Footer />
    </>
  )
}
