/* eslint-disable import/order */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/**
 *
 * DealdayProduct
 *
 */
import React, { useEffect, useMemo, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
// import useStateIfMounted from 'use-state-if-mounted';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import '../../../public/assets1/css/default.min.css';
import { copyShopingCartDetails } from '../HomeScreen/actions';
// import '../../../public/assets1/css/bundle.css';
import '../../../public/assets1/css/responsive.min.css';
import '../../../public/assets1/css/style.min.css';
import { LoadProducts } from '../LoadProducts';
// import { initialWidth, responsive } from '../MainPage/commonFunctions/customCaurosalBtn';
import { nextBtn, defaultAction } from './actions';
import './carsoule.css';
import reducer from './reducer';
import saga from './saga';
import { ShimmerPostItem } from 'react-shimmer-effects';
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
import CustomsAPI from '../MainPage/api/homeServices';
import mycartAPI from '../MainPage/api/mycartAPI';
// import defaultAction from './actions';
export function ToppSellingOriginal(props) {
  // eslint-disable-next-line prefer-const
  useInjectReducer({ key: 'ToppSelling', reducer });
  useInjectSaga({ key: 'ToppSelling', saga });
  const [pageNum, setNPButton] = useState(1);
  const [FirstCall, setFirstCall] = useState(0);
  const [count, setCount] = useState(1);
  const shimmerdata = [{ 'id': 1 }, { 'id': 2 }, { 'id': 3 }, { 'id': 4 }, { 'id': 5 }, { 'id': 6 }, { 'id': 7 },]
  const [topSelling, setTopSelling] = useState([]);
  const [sliceNum, setsliceNum] = useState(0);
  // const [sliceIncDec, setsliceIncDec] = useState(0);
  const [totalPages, settotalPages] = useState(1);
  const [nexta, setnext] = useState(false);
  const homeScreen = useSelector(state => state.homeScreen)
  const [shppingcart, setShppingcart] = useState([]);
  // const mainPage = useSelector(state => state.mainPage)
  const nextData = useSelector(state => state.ToppSelling)
  const nextData1 = useSelector(state => state.ToppSelling && state.ToppSelling.dealData)
  const addToCart = useSelector(state => state.addToCart)
  // console.log("topselling nextData=", nextData);
  // console.log("topselling homeScreen=", homeScreen);
  // console.log('z', homeScreen, props, nextData);
  const dispatch = useDispatch()
  const store = useStore();
  useEffect(() => {
    const Topproduct = localStorage.getItem('getTopsellingdb')
    const topsellproduct = JSON.parse(Topproduct)
  }, [])
  // console.log('bbh', Topproduct, JSON.parse(Topproduct));
  const initialWidth = () => {
    // setsliceIncDec(floor(window.innerWidth / 251))
    let countSlice = 0
    if (window.matchMedia('(min-width:2001px) and (max-width: 2500px)').matches) {
      countSlice = 5
    }
    if (window.matchMedia('(min-width:1281px) and (max-width: 2000px)').matches) {
      countSlice = 4
    }
    if (window.matchMedia('(min-width:997px) and (max-width:1280px)').matches) {
      countSlice = 3
    }
    if (window.matchMedia('(min-width:465px) and (max-width: 996px)').matches) {
      countSlice = 2
    }
    if (window.matchMedia('(min-width:0px) and (max-width: 464px)').matches) {
      countSlice = 1
    }
    return countSlice
  }
  // useEffect(() => {
  //   if (homeScreen === undefined) {
  //     dispatch(defaultAction())
  //   }
  // }, [homeScreen])
  // console.log('store', store.getState());
  // useEffect(() => {
  //   if (Topproduct !== undefined) {
  //     setTopSelling(JSON.parse(Topproduct).Data)
  //     settotalPages(JSON.parse(Topproduct).TotalNoOfPages)
  //   }
  // }, [])
  // useEffect(() => {
  //   if (FirstCall > 0 && topSellingDB !== undefined) {
  //     setTopSelling([...topSelling, ...topSellingDB.Topsellingdb])
  //   }
  // }, [topSellingDB])
  /*useEffect(() => {
    if (props && props.searchtopsell) {
      // else {
      setTopSelling(props.searchtopsell.dealData)
      // settotalPages(props && props.deal && props.deal.TotalNoOfPages)
      // }
    }
  }, [props])
  useEffect(() => {
    if (FirstCall > 0 && homeScreen !== undefined && homeScreen.Topsellingdb !== undefined) {
      setTopSelling(homeScreen.Topsellingdb.Data)
      settotalPages(homeScreen.Topsellingdb.TotalNoOfPages)
    }
    // else {
    //   setTopSelling(props && props.deal && props.deal.Data)
    //   settotalPages(props && props.deal && props.TotalNoOfPages)
    // }
  }, [homeScreen,])*/
  // useEffect(() => {
  //   if (homeScreen !== undefined && homeScreen.DealofthdayData !== undefined) {
  //     setTopSelling(homeScreen.DealofthdayData.Data)
  //     settotalPages(homeScreen.DealofthdayData.TotalNoOfPages)
  //   }
  // }, [homeScreen])
  useEffect(() => {
    // if (topSelling.length > 9 && sliceNum > topSelling.length - 9) {
    //   setTopSelling([...topSelling, ...topSelling])
    // }
    if (topSelling.length > 9 && sliceNum > topSelling.length - 9 && topSelling.length - sliceNum < 5) {
      // setsliceNum(topSelling.length - 5)
      changeSliceNum()
    }
  }, [sliceNum])
  function changeSliceNum() {
    setsliceNum(topSelling.length - initialWidth() - 1)
  }
  function changeSliceNumBack() {
    setsliceNum(0)
  }
  useEffect(() => {
    setFirstCall(FirstCall + 1)
    //dispatch(nextBtn(1, 9, props.SkuDetailId))
  }, [])
  useEffect(() => {
    if (nexta === true && nextData !== undefined) {
      setTopSelling([...topSelling, ...nextData.dealData.skuListingModels])
    }
  }, [nextData])
  useEffect(() => {
    //console.log("customdata11", props);
    CustomsAPI.getTopsellingdb(1, 8, props.SkuDetailId)
      .then(response => {
        setTopSelling(response.skuListingModels)
        //console.log("responsetopselling", response);
      })
  }, [])
  useEffect(() => {
    if (nextData !== undefined) {
      // console.log("useffect setShppingcart");
      setShppingcart(nextData.shoppingDetailsHome)
    }
  }, [nextData]);
  useEffect(() => {
    if (addToCart !== undefined) {
      dispatch(copyShopingCartDetails(addToCart.shoppingcartDetails))
      setShppingcart(addToCart.shoppingcartDetails)
    }
  }, [addToCart,]);
  // const responsive = {
  //   superLargeDesktop: {
  //     breakpoint: { max: 2500, min: 2001 },
  //     items: 6,
  //   },
  //   desktop: { breakpoint: { max: 2000, min: 1281 }, items: 5, partialVisibilityGutter: 10 },
  //   tablet: {
  //     breakpoint: { max: 1280, min: 997 },
  //     items: 4,
  //   },
  //   miniTablet: {
  //     breakpoint: { max: 996, min: 465 },
  //     items: 3,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //   },
  // };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 2500, min: 2001 }, items: 6,
    },
    desktop: { breakpoint: { max: 2000, min: 1281 }, items: 4, partialVisibilityGutter: 10 },
    // tablet1: { breakpoint: { max: 1536, min: 1281 }, items: 4, },
    tablet: { breakpoint: { max: 1280, min: 996 }, items: 3, },
    miniTablet: { breakpoint: { max: 995, min: 651 }, items: 3, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 650, min: 475 }, items: 2, slidesToSlide: 1 },
    smallScreenmobile: { breakpoint: { max: 475, min: 1 }, items: 1, slidesToSlide: 1 },
  };
  const CustomPrevious = ({ onClick, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return <button type="button" className="arrow right"
      onClick={() => {
        setsliceNum(sliceNum - initialWidth())
        if (topSelling.length > 5 && sliceNum < 5) {
          // setsliceNum(Dealofday.length - 5)
          changeSliceNumBack()
        }
      }}>
      {sliceNum !== 0 && (
        <div className="previous round" >
          <span className="lnr lnr-chevron-left"></span>
        </div>)}
    </button>
  }
  // // eslint-disable-next-line react/prop-types
  const CustomNext = ({ onClick, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return <button type="button" className="arrow right"
      onClick={() => {
        setsliceNum(sliceNum + initialWidth())
        setNPButton(pageNum + 1)
        // setnext(true)
      }}>
      {/* {Dealofday && JSON.stringify(Dealofday[Dealofday.length - initialWidth()]) !== JSON.stringify(Dealofday.slice(sliceNum, Dealofday.length)[0])        &&  */}
      <div className="next round" >
        <span className="lnr lnr-chevron-right"></span>
      </div>
    </button >
  }
  const CustomButtonGroupAsArrows = ({ next, previous, onClick, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div className="carousel-button-group gap-4 flex justify-end 
    items-center w-full">
        <button type="button" className='previous round1' onClick={() => previous()}>
          <FiChevronLeft />
          {/* )} */}
        </button>
        <button type="button" className='next round1' onClick={() => next()}>
          <BiChevronRight />
        </button>
      </div>
    )
  }
  // const CustomButtonGroupAsArrows = ({ next, previous, onClick, ...rest }) => {
  //   const { carouselState: { currentSlide } } = rest;
  //   return (
  //     <div className="carousel-button-group gap-4 flex justify-end 
  //         items-center w-full">
  //       <button type="button" className='previous round1' onClick={() =>
  //         previous()}>
  //         <FiChevronLeft />
  //       </button>
  //       <button type="button" className='next round1' onClick={() => next()}>
  //         <BiChevronRight />
  //       </button>
  //     </div>
  //   );
  // }
  // useMemo(() => {
  //   setTopSelling(homeScreen.Topsellingdb.Data)
  //   settotalPages(homeScreen.Topsellingdb.TotalNoOfPages)
  // }, [homeScreen]
  // )
  useEffect(() => {
    // console.log('Dealofday', Dealofday);
    if (FirstCall > 0 && count < totalPages && props.SkuDetailId !== undefined) {
      dispatch(nextBtn(pageNum, 9, props.SkuDetailId))
      setCount(count + 1)
    }
  }, [pageNum])
  // console.log("topSelling", topSelling, props);
  const Gallery = d => (
    <Carousel
      responsive={responsive}
      infinite
      arrows
      transitionDuration={500}
      renderButtonGroupOutside
      customButtonGroup={<CustomButtonGroupAsArrows />}
      customLeftArrow={<CustomPrevious />}
      customRightArrow={<CustomNext />}
      slidesToSlide={4}
    >
      {topSelling !== undefined && (topSelling.slice(sliceNum, sliceNum + topSelling.length) || []).map((mapdata, i) => (
        mapdata.FiltersList.length !== 0 ?
          <div className="tab-content" key={sliceNum} style={{ margin: "15px" }}>
            <div className="tab-pane fade show active" id="brand-one" style={{ display: 'block' }} >
              <div className="product-gallary-wrapper">
                <div className="product-gallary-active owl-carousel owl-arrow-style sale-nav owl-theme owl-loaded">
                  <div className="owl-stage-outer">
                    <div className="owl-stage"
                      style={{
                        transform: ' translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s',
                      }} >
                      <div className=" active" >
                        {/* <Product data={mapdata} index={i} /> */}
                        <LoadProducts source="topseller" data={mapdata} shppingcart={shppingcart} index={i} skulisting />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null
      ))}
    </Carousel>
  );
  // //console.log('sssasa', homeScreen);
  // console.log(JSON.stringify(Dealofday[0]) !== JSON.stringify(Dealofday.slice(sliceNum, sliceNum + 8)[0]))
  const Shimmergallery = d =>
    <Carousel
      responsive={responsive}
      infinite
      arrows
      transitionDuration={500}
      renderButtonGroupOutside
      customButtonGroup={<CustomButtonGroupAsArrows />}
      // customLeftArrow={<CustomPrevious />}
      // customRightArrow={<CustomNext />}
      slidesToSlide={1}
    >
      {shimmerdata.map(itm => (
        itm.FiltersList.length !== 0 ?
          <div className="tab-content" key={sliceNum}>
            <div className="tab-pane fade show active" id="brand-one" style={{ display: 'block' }} >
              <div className="product-gallary-wrapper">
                <div className="product-gallary-active owl-carousel owl-arrow-style sale-nav owl-theme owl-loaded">
                  <div className="owl-stage-outer">
                    <div className="owl-stage"
                      style={{
                        transform: ' translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s',
                      }} >
                      <ShimmerPostItem card title cta />
                      {/* {enableshimmer ?
                     <ShimmerPostItem card title cta /> :
                     <div className=" active" >
                       <LoadProducts data={mapdata} index={i} />
                     </div>} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null
      ))
      }
    </Carousel>
  return (
    <>
      {homeScreen && homeScreen.loading !== true && topSelling !== undefined ?
        <div className="container-fluid homescreenselling">
          <div className="row" >
            <div className="col-12" >
              <div className="section-title product-spacing hm-11 mb-0  " style={{ marginLeft: '15px' }}>
                <h3>
                  {/* {homeScreen && homeScreen.Topsellingdb && homeScreen.Topsellingdb.Data ? */}
                  {topSelling && topSelling.length === 0 ? null :
                    <span>Top Sellers</span>}
                </h3>
                {/* <button type="button" style={{
                backgroundColor: 'transparent', color: 'red', cursor: 'pointer', float: 'right', marginTop: '10px',
              }} >
                VIEW ALL
              </button> */}
              </div>
              {topSelling && topSelling.length === 0 ? null :
                <Gallery />
              }
              {/* {homeScreen && homeScreen.loading === true ?
                <Shimmergallery /> :
                <Gallery />} */}
            </div>
          </div>
        </div> : null}
    </>
  );
}
export default ToppSellingOriginal