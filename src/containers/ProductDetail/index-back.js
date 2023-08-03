/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Product
 *
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet-async';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import '../../../public/assets1/css/bundle.css';
import '../../../public/assets1/css/default.min.css';
import '../../../public/assets1/css/font-awesome.min.css';
import '../../../public/assets1/css/responsive.min.css';
import '../../../public/assets1/css/style.min.css';
// import { filter } from 'rxjs/operators';
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer';
// import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SubNavigation from '../../components/SubNavigation';
import OrderdetailAPI from '../MainPage/api/orderdetail';
import { RecentlyViewProduct } from '../RecentlyViewProduct';
import { RelatedProduct } from "../RelatedProduct/index";
import { TopTrendingProduct } from '../TopTrending';
import { ReorderProduct } from '../ReorderProduct';
import { NewArrivalProduct } from '../NewArrivalProduct'
import Constants from '../App/constants';
// import ToppSellingOriginal from '../ToppSellingOriginal';
import { getreviw, getskuProductdetail } from './actions';
import Productpage from './productpage';
import reducer from './reducer';
import saga from './saga';
import 'react-toastify/dist/ReactToastify.css';
import { FeatureProduct } from '../FeatureProduct';
import RecommendedProduct from '../RecommendedProduct';
import SignIn from '../../components/Footer/signin';
export function Product(props) {
  useInjectReducer({ key: 'product', reducer });
  useInjectSaga({ key: 'product', saga });
  const [prductdetaildata, setprductdetaildata] = useState([]);
  //const location = useLocation();
  const router = useRouter();
  // const [reviewdata, setreviewdata] = useState([]);
  // const [OrderItemId, setOrderItemId] = useState('')
  const [reviewres, setReviewres] = useState([])
  const [limit, setLimit] = useState(5)
  const max = 50;
  // const [pageurl, setpageurl] = useState('');
  // const [skuurl, setskuurl] = useState('');
  const skuproduct = useSelector(state => state.product)
  // console.log("skuproduct", skuproduct.skudetaildata.SkuId)
  // const navigatorReducer = useSelector(state => state.mavigationBar)
  // const nextData = useSelector(state => state.ToppSelling)
  useEffect(() => {
    if (skuproduct !== undefined) {
      setprductdetaildata(skuproduct.skudetaildata)
      // setOrderItemId(skuproduct.skudetaildata.SkuId)
      // setreviewdata(skuproduct.reviewdata)
      if (props && props.location && props.location.state && props.location.state.skuUrl !== undefined) {
        // setskuurl(props.location.state.skuUrl)
      }
    }
  }, [skuproduct, props])
  // console.log('smnbmnbx', filtered);
  useEffect(() => {
    OrderdetailAPI.GetAllReviewFromCustomerForProduct(prductdetaildata.SkuId)
      .then(response => {
        setReviewres(response)
      })
    // setpageurl(window.atob(localStorage.getItem('PageUrl')));
  }, [prductdetaildata])
  const dispatch = useDispatch()
  function fetchproductdetail() {
    const pdpPath = router.pathname;
    const updatedPdpPath = pdpPath.replace(/(.*product\/)(.*)/, "$2");
    localStorage.setItem('PageUrl', window.btoa(updatedPdpPath))
    // pdpPath.replace(/(.*product\/)(.*)/,"$2");	
    dispatch(getskuProductdetail(window.atob(localStorage.getItem('PageUrl'))))
    dispatch(getreviw(window.atob(localStorage.getItem('PageUrl'))))
    /* dispatch(getskuProductdetail(window.atob(localStorage.getItem('PageUrl'))))
    dispatch(getreviw(window.atob(localStorage.getItem('PageUrl')))) */
  }
  useEffect(() => {
    // if (props && props.location && props.location.state) {
    fetchproductdetail()
    window.scrollTo(0, 0);
    // }
  }, [props])
  useEffect(() => {
    localStorage.setItem('ProductName', "")
    if (localStorage.getItem('generatedtoken')) {
      // working fine	
    } else {
      fetch(`${Constants.urls.baseUrl}${Constants.endPoints.token}`, {
        method: 'POST',
        headers: {
          accept: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          'username=FCAPICL0100145&password=JHASGjnknkjhIhAjksnjansasasMKLAHNSJHGASB02012121&grant_type=password',
      })
        .then(res => res.json())
        .then(result => {
          if (result && result !== "") {
            localStorage.setItem('generatedtoken', result.access_token)
          }
          window.location.reload(true);
          // setheadercall(true)	
          // setPage(false)	
          // setfootercall(true)	
          // dispatch(defaultAction(localStorage.getItem('skuproduct')))	
          // dispatch(defaultActiondeal())	
        },
          /* error => {	
            // this.setState({ buttonload: false });	
            // console.log(error);	
            history.pushState('/NotFoundPage')	
          }, */
        ).catch(() => {
          console.log("error")
          // alert(result)
        })
    }
  }, [])
  function dateConverter(createdon) {
    const date = new Date(createdon);
    const formattedDate = date.toLocaleDateString('en-us', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).replace(/ /g, '  ');
    return formattedDate
    // console.log(formattedDate);
  }
  const loadMoreReviews = () => {
    //  alert("reviews")
    // setisShowMore(true)
    if (limit <= max) {
      // alert("reviews")
      const limitarr = limit + 5;
      setLimit(limitarr)
    }
  }
  // useEffect(() => {
  //   if (navigatorReducer && navigatorReducer.searchsku && navigatorReducer.searchsku.skuListingModels) {
  //     const product = navigatorReducer.searchsku.skuListingModels.filter(sku => sku.SkuCode === window.atob(localStorage.getItem('PageUrl')))
  //     setprductdetaildata(product)
  //   }
  // }, [navigatorReducer])
  return (
    <>
      <Helmet>
        <title>{prductdetaildata.PageTitle}</title>
        <meta name='description' content={prductdetaildata.MetaDescription} data-react-helmet="true" />
        <meta property="og:image" content={prductdetaildata.ListingImage} />
        <meta name="keywords" content={prductdetaildata.MetaKeyword}></meta>
        <meta property="og:site_name" content="adibuja.com" />
        <meta property="og:type" content={prductdetaildata.SkyType} />
        <meta property="og:url" content={prductdetaildata.ListingImage} />
        <meta property="og:title" content={prductdetaildata.PageTitle} data-react-helmet="true" />
        <meta property="og:description" content={prductdetaildata.MetaDescription} data-react-helmet="true" />
      </Helmet>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <Header />
      <SubNavigation breadcrumb={props} />
      <Productpage data={prductdetaildata} fetchproductdetail={fetchproductdetail} />
      {/* <div id="tab_description" style={{ marginLeft: 30 }} className='mb-40 container-fluid' dangerouslySetInnerHTML={{ __html: prductdetaildata.LongDescription }} /> */}
      {/* <img src={prductdetaildata.ListingImage} /> */}
      <div id="tab_review" className="mb-40">
        {
          skuproduct !== undefined && skuproduct.skudetaildata.length !== 0 ?
            <>
              <RelatedProduct SkuDetailId={skuproduct.skudetaildata.SkuId} />
              {localStorage.setItem('SkuDetailId', skuproduct.skudetaildata.SkuId)}
              {/* <RelatedProduct ProductName={skuproduct.skudetaildata.PageUrl} /> */}
              {localStorage.setItem('ProductName', skuproduct.skudetaildata.PageUrl)}
            </>
            :
            null
        }
        {localStorage.getItem('ProductName') !== '' && <TopTrendingProduct />}
        {localStorage.getItem('ProductName') !== '' && <FeatureProduct />}
        {localStorage.getItem('ProductName') !== '' && <NewArrivalProduct />}
        {(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? null : <ReorderProduct />}
        {(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? null :
          <RecommendedProduct />}
        <RecentlyViewProduct />
        {/* <ToppSellingOriginal deal={nextData && nextData.dealData} /> */}
        {/* <DealdayProductOriginal deal={nextData && nextData.DealofthdayData} /> */}
        {/* <ToppSellingOriginal /> */}
        {/* <RecommendedProduct /> */}
        <div id="ReviewForm" className='container-fluid' ><link href="/assets1/css/font-awesome4.7.0.min.css" rel="stylesheet" />
          {reviewres && reviewres.length !== 0 ?
            <>
              <h3>Customer Review</h3>
              <div>
                {reviewres.slice(0, limit).map((data) =>
                  < div id="customerreview" ><link href="/assets1/css/font-awesome4.7.0.min.css" rel="stylesheet" />
                    <table className="table table-striped table-bordered" >
                      <tbody><tr>
                        <td>
                          <strong>{data.FirstName} </strong>
                        </td>
                        <td className="pdpdate" style={{ textAlign: 'right' }}>
                          {dateConverter(data.CommentDate)}
                        </td>
                      </tr>
                        <tr>
                          <td colSpan="2">
                            {data.Comment}
                            <div className="product-ratings">
                              <ul className="ratting d-flex mt-2">
                                <li>
                                  {data.Rating === 5 ?
                                    <>
                                      <i style={{ color: '#ff7060' }} className="checked fa fa-star">
                                      </i>
                                      <i style={{ color: '#ff7060' }} className="checked fa fa-star">
                                      </i>
                                      <i style={{ color: '#ff7060' }} className="checked fa fa-star">
                                      </i>
                                      <i style={{ color: '#ff7060' }} className="checked fa fa-star">
                                      </i>
                                      <i style={{ color: '#ff7060' }} className="checked fa fa-star">
                                      </i></>
                                    :
                                    <>
                                      {data.Rating === 4 ?
                                        <>
                                          <i style={{ color: '#ff7060' }} className="checked fa fa-star"></i>
                                          <i style={{ color: '#ff7060' }} className="checked fa fa-star"> </i>
                                          <i style={{ color: '#ff7060' }} className="checked fa fa-star"></i>
                                          <i style={{ color: '#ff7060' }} className="checked fa fa-star"></i>
                                        </>
                                        :
                                        <>
                                          {data.Rating === 3 ?
                                            <>
                                              <i style={{ color: '#ff7060' }} className="checked fa fa-star"></i>
                                              <i style={{ color: '#ff7060' }} className="checked fa fa-star"> </i>
                                              <i style={{ color: '#ff7060' }} className="checked fa fa-star"></i></>
                                            :
                                            <>
                                              {data.Rating === 2 ?
                                                <>
                                                  <i style={{ color: '#ff7060' }} className="checked fa fa-star"></i>
                                                  <i style={{ color: '#ff7060' }} className="checked fa fa-star"> </i></>
                                                :
                                                <>
                                                  {data.Rating === 1 ?
                                                    <>
                                                      <i style={{ color: '#ff7060' }} className="checked fa fa-star"></i>
                                                    </>
                                                    : null}
                                                </>
                                              }
                                            </>
                                          }
                                        </>
                                      }
                                    </>
                                  }
                                  {/* <i className="checked fa fa-star"></i>
                                <i className="checked fa fa-star"></i> */}
                                </li>
                                {/* {<div dangerouslySetInnerHTML={{ __html:data.Rating}} /> } */}
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </tbody></table>
                  </div>
                )}
              </div>
              {
                limit && limit < reviewres.length ? <button data-limit={reviewres.length} id="customerreviews" type="button" onClick={loadMoreReviews}>Show More</button>
                  : ""
              }
            </>
            :
            // <div id="reviewnotavailable" >
            //   <h3>No reviews</h3>
            // </div>
            null
          }
        </div>
        {/* {
          skuproduct !== undefined && skuproduct.skudetaildata.length !== 0 ?
          <>
            <RelatedProduct ProductName={skuproduct.skudetaildata.PageUrl} />
            {localStorage.setItem('ProductName',skuproduct.skudetaildata.PageUrl)}
            </>
            :
            null
        }
        <TopTrendingProduct/>
          <FeatureProduct/>
          <NewArrivalProduct />
        {(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? null : <ReorderProduct />}
        <RecentlyViewProduct /> */}
        {/* <ToppSellingOriginal deal={nextData && nextData.dealData} /> */}
        {/* <DealdayProductOriginal deal={nextData && nextData.DealofthdayData} /> */}
        {/* <ToppSellingOriginal /> */}
        {/* <RecommendedProduct /> */}
      </div >
      {
        reviewres && reviewres !== "" && prductdetaildata && prductdetaildata !== undefined && prductdetaildata !== "" ?
          <> {(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined || localStorage.getItem('CustGUID') === '00000000-0000-0000-0000-000000000000')
            ?
            <SignIn />
            :
            null}</>
          : ""
      }
      <Footer />
    </>
  );
}
export default Product
