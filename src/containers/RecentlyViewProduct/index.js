/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/**
 *
 * RecentlyViewProduct
 *
 */
import React, { useEffect, useState } from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
// import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import { ShimmerPostItem } from "react-shimmer-effects";
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
import LoadProducts from '../LoadProducts';
// import ProductDetailAPI from '../MainPage/api/productdetail';
import { nextBtn } from './actions';
import reducer from './reducer';
import saga from './saga';
// import makeSelectRecentlyViewProduct from './selectors';
// import { RecentlyViewProduct } from './index';
// import { makeSelectHomeScreen } from '../HomeScreen/selectors'
// import { getrecent } from '../LoadProducts/actions';
export function RecentlyViewProduct() {
  useInjectReducer({ key: 'recentlyViewProduct', reducer });
  useInjectSaga({ key: 'recentlyViewProduct', saga });
  const loadProducts = useSelector(state => state.loadProducts)
  // const [Recentlyvieweddata, setRecentlyvieweddata] = useState([]);
  // console.log('viewed', loadProducts,);
  // useEffect(() => {
  //   if (loadProducts !== undefined) {
  //     setRecentlyvieweddata(loadProducts.recentlist)
  //     // localStorage.setItem('Recentdata', JSON.stringify(loadProducts.recentlist))
  //   }
  // }, [loadProducts])
  //const datsee = localStorage.getItem('Recentdata')
  // console.log('sSS', JSON.parse(datsee),);
  // useEffect(() => {
  //   if (data !== undefined) {
  //     setRecentlyvieweddata(JSON.parse(data))
  //   } else {
  //     setRecentlyvieweddata(loadProducts.recentlist)
  //   }
  // }, [data, loadProducts])
  const [pageNum, setNPButton] = useState(1);
  const [FirstCall, setFirstCall] = useState(0);
  const [count, setCount] = useState(1);
  const [Dealofday, setgetDealofday] = useState([]);
  const [shoppingDetail, setShoppingDetail] = useState([]);
  const [addToCartOBJ, setAddToCartOBJ] = useState({});
  const [sliceNum, setsliceNum] = useState(0);
  // const [sliceIncDec, setsliceIncDec] = useState(0);
  const [totalPages, settotalPages] = useState(1);
  const [enableshimmer, setenableshimmer] = useState('');
  const [shppingcart, setShppingcart] = useState([]);
  const [next, setnext] = useState(false);
  //const recentdata = localStorage.getItem('Recentdata')
  const Homedata = useSelector(state => state.homeScreen)
  const recentViewData = useSelector(state => state.recentlyViewProduct)
  const addToCart = useSelector(state => state.addToCart)
  // const data = JSON.parse(recentdata)
  const shimmerdata = [{ 'id': 1 }, { 'id': 2 }, { 'id': 3 }, { 'id': 4 }, { 'id': 5 }, { 'id': 6 }, { 'id': 7 },]
  // const nextData = useSelector(state => state.dealdayProduct)
  const dispatch = useDispatch()
  const myDataSelector = (state) => state.dealdayProduct;
  // console.log('nnkkkk', myDataSelector,);
  // console.log('homerecentdata', Homedata);
  // console.log("recentlyviewdata", recentViewData);
  // console.log("recently nextData", nextData);
  // console.log("recently addToCart", addToCart);
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
  //   dispatch(getrecent(localStorage.getItem('skuproductID')))
  // }, [])
  // useEffect(() => {
  //   if (localStorage.getItem('skuproduct1') !== undefined) {
  //     dispatch(getRecentlyviewedproduct(localStorage.getItem('skuproduct1')))
  //   }
  // }, [])
  useEffect(() => {
    if (FirstCall > 0 && Homedata !== undefined && Homedata.recentdataviewd !== undefined) {
      const jsonObject = Homedata.recentdataviewd.map(JSON.stringify);
      const uniqueSet = new Set(jsonObject);
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      if (uniqueArray.length !== 0) {
        setgetDealofday(uniqueArray)
        settotalPages(Homedata.recentdataviewd.TotalNoOfPages)
      }
    }
  }, [Homedata])
  // useEffect(() => {
  //   if (FirstCall > 0 && recentViewData !== undefined && recentViewData.Viewed !== undefined) {
  //     setgetDealofday(recentViewData.Viewed.Data)
  //     settotalPages(recentViewData.Viewed.TotalNoOfPages)
  //   }
  // }, [recentViewData])
  useEffect(() => {
    setFirstCall(FirstCall + 1)
    dispatch(nextBtn(pageNum, 9))
    // dispatch(getRecentlyviewedproduct(localStorage.getItem('skuproduct1')))
  }, [])
  useEffect(() => {
    if (next === true && Homedata !== undefined) {
      // console.log("Homedata.recentdataviewd=", Homedata.recentdataviewd)
      setgetDealofday([...Dealofday, ...Homedata.recentdataviewd])
    }
  }, [Homedata])
  useEffect(() => {
    if (addToCart !== undefined && addToCart.shoppingcartDetails.length !== 0) {
      // console.log("useffect setShppingcart");
      setShppingcart(addToCart.shoppingcartDetails)
    }
  }, [addToCart,]);
  useEffect(() => {
    if (recentViewData !== undefined) {
      // console.log("useffect setShppingcart");
      setShppingcart(recentViewData.shoppingDetailsRecent)
    }
  }, [recentViewData]);
  useEffect(() => {
    // if (Dealofday.length > 9 && sliceNum > Dealofday.length - 9) {
    //   setgetDealofday([...Dealofday, ...Dealofday])
    // }
    if (Dealofday.length > 9 && sliceNum > Dealofday.length - 9 && Dealofday.length - sliceNum < initialWidth() + 1) {
      // setsliceNum(Dealofday.length - 5)
      changeSliceNum()
    }
  }, [sliceNum])
  function changeSliceNum() {
    setsliceNum(Dealofday.length - initialWidth() - 1)
  }
  function changeSliceNumBack() {
    setsliceNum(0)
  }
  // useEffect(() => {
  //   setFirstCall(FirstCall + 1)
  //   dispatch(getrecent(localStorage.getItem('skuproductID')))
  // }, [])
  // useEffect(() => {
  //   if (nextData !== undefined && nextData.dealData !== undefined) {
  //     setgetDealofday(nextData.dealData.Data)
  //     settotalPages(nextData.dealData.TotalNoOfPages)
  //   }
  // }, [nextData])
  // useEffect(() => {
  //   if (next === true && recentViewData.Viewed !== undefined) {
  //     console.log("Homedata.recentdataviewd=", recentViewData.Viewed)
  //     setgetDealofday([...Dealofday, ...recentViewData.Viewed.Data])
  //   }
  // }, [recentViewData])
  useEffect(() => {
    if (shoppingDetail !== undefined) {
      shoppingDetail.forEach(itm => {
        objCreation(itm.SKUFilterPriceId, itm.Quantity)
      })
    }
  }, [shoppingDetail])
  function objCreation(SKUFilterPriceId, Quantity) {
    const obj = {}
    obj[`${SKUFilterPriceId}`] = Quantity
    setAddToCartOBJ({ ...addToCartOBJ, ...obj })
  }
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 2500, min: 2001 }, items: 6,
    },
    desktop: { breakpoint: { max: 2000, min: 1281 }, items: 4, partialVisibilityGutter: 10 },
    // tablet1: { breakpoint: { max: 1536, min: 1281 }, items: 4, },
    tablet: { breakpoint: { max: 1280, min: 996 }, items: 3, },
    miniTablet: { breakpoint: { max: 995, min: 651 }, items: 3, },
    mobile: { breakpoint: { max: 650, min: 475 }, items: 2, },
    smallScreenmobile: { breakpoint: { max: 475, min: 1 }, items: 1, },
  };
  const CustomPrevious = ({ onClick, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return <button type="button" className="arrow right"
      onClick={() => {
        setsliceNum(sliceNum - initialWidth())
        if (Dealofday.length > 5 && sliceNum < 5) {
          // setsliceNum(Dealofday.length - 5)
          changeSliceNumBack()
        }
      }}>
      {sliceNum !== 0 && (
        // <div className="owl-controls">
        //   <div className="owl-nav">
        <div className="previous round" >
          <span className="lnr lnr-chevron-left"></span>
        </div>
        //   </div>
        // </div>
      )}
      {/* previous */}
    </button>
  }
  // eslint-disable-next-line react/prop-types
  const CustomNext = ({ onClick, ...rest }) =>
    // const { carouselState: { currentSlide } } = rest;
    <button type="button" className="arrow right"
      onClick={() => {
        setsliceNum(sliceNum + initialWidth())
        setNPButton(pageNum + 1)
        setnext(true)
      }}>
      {Dealofday && (JSON.stringify(Dealofday[Dealofday.length - 5]) !== JSON.stringify(Dealofday.slice(sliceNum, Dealofday.length)[0])) &&
        (< div className="next round" >
          <span className="lnr lnr-chevron-right"></span>
        </div>)
      }
    </button >
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
  useEffect(() => {
    if (FirstCall > 0 && count < totalPages) {
      dispatch(nextBtn(pageNum, 9))
      setCount(count + 1)
    }
  }, [pageNum])
  useEffect(() => {
    if (Homedata && Homedata.loading === true) {
      setenableshimmer(true)
    }
  }, [Homedata])
  // useEffect(() => {
  //   if (data && data.loading === false) {
  //     setenableshimmer(false)
  //   }
  // }, [data])
  // console.log("recently Dealofday", Dealofday);
  const Shimmergallery = d =>
    <Carousel
      responsive={responsive}
      // centerMode={false}
      infinite
      arrows={false}
      transitionDuration={500}
      // renderButtonGroupOutside={false}
      // renderDotsOutside={false}
      // removeArrowOnDeviceType={['mobile']}
      // swipeable
      // customLeftArrow={<CustomPrevious />}
      // customRightArrow={<CustomNext />}
      slidesToSlide={4}
    >
      {shimmerdata.map(itm => (
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
      ))
      }
    </Carousel>
  const Gallery = d => (
    <Carousel
      responsive={responsive}
      // centerMode={false}
      infinite
      arrows
      transitionDuration={500}
      renderButtonGroupOutside
      // renderButtonGroupOutside={false}
      // renderDotsOutside={false}
      // removeArrowOnDeviceType={['mobile']}
      // swipeable
      customButtonGroup={<CustomButtonGroupAsArrows />}
      customLeftArrow={<CustomPrevious />}
      customRightArrow={<CustomNext />}
      slidesToSlide={4}
    >
      {Dealofday !== undefined && (Dealofday.slice(sliceNum, sliceNum + Dealofday.length) || []).map((mapdata, i) => (
        mapdata.FiltersList.length !== 0 ?
          <div className="tab-content" key={sliceNum}>
            <div className="tab-pane fade show active" id="brand-one" style={{ display: 'block' }} >
              <div className="product-gallary-wrapper">
                <div className="product-gallary-active owl-carousel owl-arrow-style sale-nav owl-theme owl-loaded">
                  <div className="owl-stage-outer">
                    <div className="owl-stage"
                      style={{
                        transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s',
                      }} >
                      <LoadProducts data={mapdata} shppingcart={shppingcart} index={i} skulisting />
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
  );
  // console.log('Recentlyvieweddata', Recentlyvieweddata);
  return (
    <>
      {Homedata && Homedata.loading !== true && Dealofday !== undefined ?
        <div className="container-fluid homescreenrecently">
          <div className="row" id="pdprecentlysection">
            <div className="col-12" >
              <div className="section-title product-spacing hm-11 mb-0" style={{ marginLeft: '15px' }}>
                <h3>
                  {/* {data && data.loading === true ? null : */}
                  {Dealofday && Dealofday.length === 0 ? null :
                    <span>Recently Viewed Product</span>}
                  {/* } */}
                </h3>
                {/* <button type="button" style={{
                 backgroundColor: 'transparent', color: 'red', cursor: 'pointer', float: 'right', marginTop: '10px',
               }} >
                 VIEW ALL
               </button> */}
              </div>
              {Dealofday && Dealofday.length === 0 ? null :
                <Gallery />
              }
              {/* <div style={{ margin: '0 auto' }}> */}
              {/* {Homedata && Homedata.loading === true ?
                <Shimmergallery /> :
                <Gallery />} */}
              {/* <Gallery /> */}
            </div>
          </div>
        </div> : null
      }
    </>
  );
}
// RecentlyViewProduct.propTypes = {
//   recentlyViewProduct: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
//   repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
// };
export default RecentlyViewProduct;
