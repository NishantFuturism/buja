/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-expressions */
/**
 *
 * HomeScreen
 *
 */
import React, { useEffect, useState } from 'react';
// import {
//   Carousel
// } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import Constants from '../App/constants';
import '../../../public/assets1/css/responsive.min.css';
import '../../../public/assets1/css/style.min.css';
import { copyShopingCartDetails, defaultAction } from './actions';
import { defaultActiondeal } from '../DealdayProductOriginal/actions'
import reducer from './reducer';
import saga from './saga';
import { useRouter } from 'next/router';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BouncingDotsLoader from '../../components/BouncingDotsLoader';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import Header from '../../components/Header';
// //import history from '../../utils/history'; 

import CategoryContent from '../CategoryContent';
import DealdayProductOriginal from '../DealdayProductOriginal';
// import { RecentlyViewProduct } from '../RecentlyViewProduct';
// import ReorderProduct from '../ReorderProduct';
// import { ShopBrand } from "../ShopBrand/index";
import ToppSellingOriginal from '../ToppSellingOriginal';

////import history from '../../utils/history';

// import { Carousel } from 'react-bootstrap';
import { ReorderProduct } from '../ReorderProduct';
import { RecommendedProduct } from '../RecommendedProduct/index'
import { ShopBrand } from '../ShopBrand';
// import { WishlistPaged } from '../WishlistPaged';
import { RecentlyViewProduct } from '../RecentlyViewProduct';
import { TopTrendingProduct } from '../TopTrending';
import { FeatureProduct } from '../FeatureProduct';
import { NewArrivalProduct } from '../NewArrivalProduct'
import SignIn from '../../components/Footer/signin';
import Cookies from 'js-cookie';
// import Recommended from '../Recommended';
// import { Topselling } from '../Topselling';
// import { ToppSellingOriginal } from './../ToppSellingOriginal/index';
export function HomeScreen() {
  useInjectReducer({ key: 'homeScreen', reducer });
  useInjectSaga({ key: 'homeScreen', saga });
  const router = useRouter();
  const dispatch = useDispatch()
  const homeScreenstate = useSelector(state => state.homeScreen)
  const cart = useSelector(state => state.cart)
  const addToCart = useSelector(state => state.addToCart)
  const [page, setPage] = useState(false);
  const sendOtpApiResponse = useSelector(state => state.login)
  // console.log('dhgh', cart);
  // const [qty, setQty] = useState(0);
  // const [shoppingCart, setShoppingCart] = useState([]);
  // const [enablemodel, setenablemodel] = useState(false);
  // add loader refrence 
  // const loader=useRef(null);
  // const changeFltr = (newFL) => {
  //   setSeleced(newFL);
  //   const P = skuproduct && skuproduct.FilterList.find(i => i.ListItem === newFL);
  //   setFiltered(P);
  // };
  // console.log('prtyy', localStorage.getItem('skuproductID'))
  useEffect(() => {
    localStorage.setItem('ProductName', "")
    setPage(false)
    dispatch(defaultAction(localStorage.getItem('skuproduct')))
  }, []);
  useEffect(() => {
    if (addToCart !== undefined) {
      dispatch(copyShopingCartDetails(addToCart.shoppingcartDetails))
    }
  }, [addToCart]);
  useEffect(() => {
    if (cart !== undefined) {
      dispatch(copyShopingCartDetails(cart.shoppingcartDetails))
    }
  }, [cart]);
  useEffect(() => {
  }, [])
  useEffect(() => {
    if (localStorage.getItem('generatedtoken')) {
      // console.log(localStorage.getItem('generatedtoken'));
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
        .then(
          result => {
            result && localStorage.setItem('generatedtoken', result.access_token);
            Cookies.set('access_token', result.access_token);
            // setheadercall(true)
            // setPage(false)
            // setfootercall(true)
            dispatch(defaultAction(localStorage.getItem('skuproduct')))
            dispatch(defaultActiondeal())
          },
          /* error => {
            // this.setState({ buttonload: false });
            // console.log(error);
            history.pushState('/NotFoundPage')
          }, */
        );
    }
  }, []);
  // useEffect(()=>{
  //    if(loadProducts && loadProducts.popup)
  // },[])
  const displayimageposition1 = homeScreenstate !== undefined && homeScreenstate.Banners.filter(
    position => position.DisplayPosition === 1,
  ).map(image => image.DocPath);
  // console.log("displayimageposition1", displayimageposition1[1]);
  const displayimageposition2 = homeScreenstate !== undefined && homeScreenstate.Banners.filter(
    position => position.DisplayPosition === 2,
  ).map(image => image.DocPath);
  // console.log("displayimageposition2", displayimageposition1[1]);
  const displayimageposition3 = homeScreenstate !== undefined && homeScreenstate.Banners.filter(
    position => position.DisplayPosition === 3,
  );
  const displayimageposition4 = homeScreenstate !== undefined && homeScreenstate.Banners.filter(
    position => position.DisplayPosition === 4,
  );
  const displayimageposition5 = homeScreenstate !== undefined && homeScreenstate.Banners.filter(
    position => position.DisplayPosition === 5,
  );
  // const loadproductdetail = (patrentcaturl) => {
  //   console.log('patrentcaturl', patrentcaturl);
  //   // const url = patrentcaturl.split('/')
  //   // console.log('apatrentcaturl', url);
  //   // localStorage.setItem('PageUrl', window.btoa(url[3]))
  //   // localStorage.setItem('PLPCat', pageurl)
  //   // localStorage.setItem('PLPparenturl', patrentcaturl.split('/'))
  //   // localStorage.setItem('PLPCat', url[2])
  //   // localStorage.setItem('PLPparenturl', url[1])
  //   // history.push(`/Subcategory/${patrentcaturl}`, { isURLChange: patrentcaturl })
  //   // return history.push(`/Subcategory${patrentcaturl}`,)
  // }
  function loadproductdetail(pageurl, patrentcaturl) {
    console.log(`pmyy`, patrentcaturl);
    // localStorage.setItem('PLPCat', pageurl)
    // localStorage.setItem('PLPparenturl', '/ ')
    // return history.push(`${pageurl}`, { isURLChange: pageurl })
    const st = pageurl.toString();
    const v1 = st.split('/')
    const v3 = v1[3]
    localStorage.setItem('PLPCat', `${v1[1]}/${v1[2]}/${v1[3]}`)
    localStorage.setItem('PLPparenturl', `${v1[1]}/${v1[2]}`)
    localStorage.setItem('PageUrl', v3)
    return router.push(`${pageurl}`, { isURLChange: pageurl })
  }
  function loadproductdetail1(pageurl, patrentcaturl) {
    console.log("homescreen banner URL=", pageurl, patrentcaturl);
    const st = pageurl.toString();
    const v1 = st.split('/')
    const v3 = v1[3]
    localStorage.setItem('PLPCat', `${v1[1]}/${v1[2]}/${v1[3]}`)
    localStorage.setItem('PLPparenturl', `${v1[1]}/${v1[2]}`)
    localStorage.setItem('PageUrl', v3)
    return router.push(`${pageurl}`, { isURLChange: pageurl })
  }
  /* console.log('display', displayimageposition1[1], displayimageposition2, displayimageposition4, displayimageposition3, displayimageposition5); */
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  // window.onload = function () {
  //   document.getElementById('app').className = 'homehidefilter';
  // };
  // console.log("homeScreenstate", homeScreenstate);
  // setlogoutpopup(false)
  return (
    <>
      {/* <Header /> */}
      <Carousel
        showDots
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        arrows
        autoPlay
        // infinite
        transitionDuration={500}
        containerClass="carousel-container"
      // prevIcon={
      //   <span className="carousel-control-prev-icon " />
      // }
      // prevLabel={null}
      // nextLabel={null}
      >
        {homeScreenstate !== undefined && homeScreenstate.BillBoardList.map(data => (
          // <Carousel.Item onClick={() => loadproductdetail(data.TargetUrl)}>
          // <div>
          <a href={data.TargetUrl}><img
            referrerPolicy='no-referrer'
            onClick={() => loadproductdetail(data.TargetUrl, null)}
            className="d-block " alt='' src={data.BillboardPath} style={{ cursor: ' pointer' }} />
          </a>
          // </Carousel.Item>
        ))}
      </Carousel>
      {/* <WishlistPaged /> */}
      <DealdayProductOriginal />
      <ToppSellingOriginal />
      <TopTrendingProduct />
      <FeatureProduct />
      <NewArrivalProduct />
      {/* homeScreenstate && homeScreenstate.loading === true ?
        <BouncingDotsLoader /> : */
        <section className="pt-20 pb-20">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 pb-20">
                <a href={homeScreenstate !== undefined && homeScreenstate.Banners.filter(
                  position => position.DisplayPosition === 1,
                ).map(image => image.PageURL)}><img onClick={() => loadproductdetail1(homeScreenstate !== undefined && homeScreenstate.Banners.filter(position => position.DisplayPosition === 1,).map(image => image.PageURL), null)} referrerPolicy='no-referrer' src={displayimageposition1[1] === undefined ? displayimageposition1[0] : displayimageposition1[1]} alt="Homepage small1" style={{ width: '100%', cursor: 'pointer' }} /></a>
              </div>
              <div className="col-lg-6 pb-20">
                <a href={homeScreenstate !== undefined && homeScreenstate.Banners.filter(
                  position => position.DisplayPosition === 2,
                ).map(image => image.PageURL)}><img
                    onClick={() => loadproductdetail1(homeScreenstate !== undefined && homeScreenstate.Banners.filter(
                      position => position.DisplayPosition === 2,
                    ).map(image => image.PageURL), null)}
                    referrerPolicy='no-referrer' src={displayimageposition2[1] === undefined ? displayimageposition2[0] : displayimageposition2[1]} alt="Homepage small2" style={{ width: '100%', cursor: 'pointer' }} /></a></div>
            </div>
            {/* new code */}
          </div>
        </section>}
        {page ?
        <BouncingDotsLoader /> :
        <CategoryContent />}
        <section>
          {homeScreenstate && homeScreenstate.loading === true ?
            <BouncingDotsLoader /> :
            <>{displayimageposition3 && displayimageposition3.length !== 0 && <a href={displayimageposition3[0].PageURL}> <img referrerPolicy='no-referrer'
              onClick={() => loadproductdetail1(displayimageposition3[0].PageURL)}
              className="d-block w-100" alt='' src={displayimageposition3[0].DocPath} /></a>}</>}
        </section>
        <ShopBrand />
        <section className='homescreenbannerimage'>
          {homeScreenstate && homeScreenstate.loading === true ?
            <BouncingDotsLoader /> :
            <>{displayimageposition4 && displayimageposition4.length !== 0 && <a href={displayimageposition4[0].PageURL}> <img
              onClick={() => loadproductdetail1(displayimageposition4[0].PageURL)}
              referrerPolicy='no-referrer' className="d-block w-100" alt='' src={displayimageposition4[0].DocPath} /></a>}</>}
        </section>
        {/*(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? null : <ReorderProduct />*/}
        {/*(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? null :
        <RecommendedProduct />*/}
        <RecentlyViewProduct />
        <section>
          {homeScreenstate && homeScreenstate.loading === true ?
            <BouncingDotsLoader /> :
            <>{displayimageposition5 && displayimageposition5.length !== 0 && <a href={displayimageposition5[0].PageURL}><img
              onClick={() => loadproductdetail1(displayimageposition5[0].PageURL)}
              className="d-block w-100" alt='' src={displayimageposition5[0].DocPath} /></a>}</>}
        </section>
        {
          homeScreenstate && homeScreenstate.loading === false ?
            <>{(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined || localStorage.getItem('CustGUID') === '00000000-0000-0000-0000-000000000000')
              ?
              <SignIn />
              :
              null}</>
            : ""
        }
    </>
  );
}
export default HomeScreen
