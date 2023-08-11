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
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { serialize } from 'next-mdx-remote/serialize';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet-async';
import Link from 'next/link';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import '../../../public/assets1/css/bundle.css';
import '../../../public/assets1/css/default.min.css';
import '../../../public/assets1/css/font-awesome.min.css';
import '../../../public/assets1/css/responsive.min.css';
import '../../../public/assets1/css/style.min.css';
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SubNavigation from '../../components/SubNavigation';
import OrderdetailAPI from '../../containers/MainPage/api/orderdetail';
import { RecentlyViewProduct } from '../../containers/RecentlyViewProduct';
import { RelatedProduct } from "../../containers/RelatedProduct/index";
import { TopTrendingProduct } from '../../containers/TopTrending';
import { ReorderProduct } from '../../containers/ReorderProduct';
import { NewArrivalProduct } from '../../containers/NewArrivalProduct'
import Constants from '../../containers/App/constants';
import { getreviw, getskuProductdetail } from '../../containers/ProductDetail/actions';
import Productpage from '../../containers/ProductDetail/productpage';
import reducer from '../../containers/ProductDetail/reducer';
import saga from '../../containers/ProductDetail/saga';
import 'react-toastify/dist/ReactToastify.css';
import { FeatureProduct } from '../../containers/FeatureProduct';
import RecommendedProduct from '../../containers/RecommendedProduct';
import SignIn from '../../components/Footer/signin';
import { useLocalStorage } from '@/useLocalStorage';
import { httpRequest } from '../../containers/MainPage/api/apiServices';
import { ConstantsValues } from '../../containers/MainPage/api/homeServices';
//export function Product(props) {
const Product = ({ productData }) => {
  useInjectReducer({ key: 'product', reducer });
  useInjectSaga({ key: 'product', saga });
  const [PageUrl, setPageUrl] = useLocalStorage('PageUrl',null);
  const [ProductName, setProductName] = useLocalStorage('ProductName',null);
  const [SkuDetailId, setSkuDetailId] = useLocalStorage('SkuDetailId',null);
  const [CustGUID, setCustGUID] = useState('');
  const [generatedtoken, setgeneratedtoken] = useLocalStorage('generatedtoken',null);
  const [prductdetaildata, setprductdetaildata] = useState(productData || {});
  const router = useRouter();
  const [reviewres, setReviewres] = useState([])
  const [limit, setLimit] = useState(5)
  const max = 50;
  const skuproduct = useSelector(state => state.product)
  console.log('--------------------------productdata',prductdetaildata)
  /*useEffect(() => {
    console.log("HeyRohit",productData)
    if (productData !== undefined) {
      setprductdetaildata(productData)
    }
  }, [productData])*/
  
  /*useEffect(() => {
    OrderdetailAPI.GetAllReviewFromCustomerForProduct(prductdetaildata.SkuId)
      .then(response => {
        setReviewres(response)
      })
  }, [prductdetaildata])*/
  const dispatch = useDispatch()
  function fetchproductdetail() {
    //const pdpPath = router.pathname;
    //const updatedPdpPath = pdpPath.replace(/(.*product\/)(.*)/, "$2");
    //console.log('logginginproduct1')
    setPageUrl(window.btoa(productName))
    //console.log('logginginproduct2',productName)
    dispatch(getskuProductdetail(productName))
    dispatch(getreviw(window.atob(PageUrl)))
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setCustGUID(localStorage.getItem('CustGUID'))
    }
  },[])

  useEffect(() => {
    //console.log('executing this',prductdetaildata.SkuId)
    OrderdetailAPI.GetAllReviewFromCustomerForProduct(prductdetaildata.SkuId)
      .then(response => {
        setReviewres(response)
      })
  },[prductdetaildata])
  
  /*useEffect(() => {
    
    fetchproductdetail()
    window.scrollTo(0, 0);
    
  }, [])*/
  /*useEffect(() => {
    setProductName("")
    if (generatedtoken) {
    
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
            setgeneratedtoken(result.access_token)
          }
          window.location.reload(true);
          
        },
         
        ).catch(() => {
          console.log("error")
          
        })
    }
  }, [])*/
  function dateConverter(createdon) {
    const date = new Date(createdon);
    const formattedDate = date.toLocaleDateString('en-us', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).replace(/ /g, '  ');
    return formattedDate
    
  }
  const loadMoreReviews = () => {
    
    if (limit <= max) {
     
      const limitarr = limit + 5;
      setLimit(limitarr)
    }
  }
  
  return (
    <>
        <Head>
        <title>{prductdetaildata.PageTitle}</title>
        <meta name="description" content={prductdetaildata.MetaDescription} />
        <meta property="og:image" content={prductdetaildata.ListingImage} />
        <meta name="keywords" content={prductdetaildata.MetaKeyword}></meta>
        <meta property="og:site_name" content="adibuja.com" />
        <meta property="og:type" content={prductdetaildata.SkyType} />
        <meta property="og:url" content={`${prductdetaildata.DomainName}product/${prductdetaildata.PageUrl}`} />
        <meta property="og:title" content={prductdetaildata.PageTitle} />
        <meta property="og:description" content={prductdetaildata.MetaDescription}/>
      </Head>
      <ToastContainer
        position="top-right"
    
      />
      <Header />
      {/*<SubNavigation />*/}
      <Productpage data={prductdetaildata} /*fetchproductdetail={fetchproductdetail}*/ />
     
      <div id="tab_review" className="mb-40">
        {
          prductdetaildata !== undefined && prductdetaildata.length !== 0 ?
            <>
              <RelatedProduct SkuDetailId={prductdetaildata.SkuId} />
            </>
            :
            null
        }
        {<TopTrendingProduct productName={prductdetaildata} />}
        {<FeatureProduct productName={prductdetaildata}/>}
        {<NewArrivalProduct productName={prductdetaildata}/>}
        {/*{(CustGUID === null || CustGUID === undefined) ? null : <ReorderProduct />}
        {(CustGUID === null || CustGUID === undefined) ? null :
        <RecommendedProduct />}*/}
        {/*<RecentlyViewProduct />*/}
        
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
                                 
                                </li>
                              
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
         
            null
          }
        </div>
      </div >
      {
        reviewres && reviewres !== "" && prductdetaildata && prductdetaildata !== undefined && prductdetaildata !== "" ?
          <> {(CustGUID === null || CustGUID === undefined || CustGUID === '00000000-0000-0000-0000-000000000000')
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
//export default Product


export async function getServerSideProps(context) {
    const { req, query } = context;
    //console.log("loggginginproductname",req);
    const { productName } = context.query;

    /*const url = `${Constants.urls.baseUrl}${Constants.endPoints.SkuV}clientId=${ConstantsValues.ClientId}&custGUID=${ConstantsValues.defaultCustGUID}&cartGuid=${ConstantsValues.defaultCartGUID}&fixedShippingDurationId=0&skuUrl=${skuurl}&languageid=${ConstantsValues.languageId}&CurrencyCode=${ConstantsValues.currencyCode}&pincode=${ConstantsValues.pincode}`;*/
    const productData = await fetchProductData(productName);
    // Serialize the productData
    //const serializedProductData = await serialize(productData);
    //console.log("==============================returnedproductdata",serializedProductData)
    return {
      props: {
        productData: productData, // Pass the product name to the page component
      },
    };
  }

  function fetchProductData(skuurl) {
    const url = `${Constants.urls.baseUrl}${Constants.endPoints.SkuV}clientId=${ConstantsValues.ClientId}&custGUID=${ConstantsValues.defaultCustGUID}&cartGuid=${ConstantsValues.defaultCartGUID}&fixedShippingDurationId=0&skuUrl=${skuurl}&languageid=${ConstantsValues.languageId}&CurrencyCode=${ConstantsValues.currencyCode}&pincode=${ConstantsValues.pincode}`;
    //console.log("==============================returnedproductdata1",url)
    
    return httpRequest(url, 'GET');
  }
  
  export default Product;