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
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { copyShopingCartDetails } from '../HomeScreen/actions';
// import useStateIfMounted from 'use-state-if-mounted';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
// import '../../../assets1/css/default.min.css';
// // import '../../../public/assets1/css/bundle.css';
// import '../../../public/assets1/css/responsive.min.css';
// import '../../../public/assets1/css/style.min.css';
import { LoadProducts } from '../LoadProducts';
import { createSelector } from 'reselect';
// import { initialWidth, responsive } from '../MainPage/commonFunctions/customCaurosalBtn';
import { nextBtn } from './actions';
import './carsoule.css';
import reducer from './reducer';
import saga from './saga';
import mycartAPI from '../MainPage/api/mycartAPI';
import CustomsAPI from '../MainPage/api/homeServices';
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
import { ShimmerSimpleGallery, ShimmerPostItem, ShimmerPostList } from "react-shimmer-effects";
import { useLocalStorage } from '../../useLocalStorage';
// import { Wishlist } from 'containers/Wishlist/Loadable';
export function DealdayProductOriginal(props) {
  // eslint-disable-next-line prefer-const
  // const { isActive } = props;
  // console.log("isActive..", isActive)
  // useInjectReducer({ key: 'dealdayProduct', reducer });
  // useInjectSaga({ key: 'deal', saga });
  // const [isSliding, setIsSliding] = useState(true);
  const [pincodevalue, setpincodevalue] = useLocalStorage('pincodevalue',null);
  const [pageNum, setNPButton] = useState(1);
  const [FirstCall, setFirstCall] = useState(0);
  const [count, setCount] = useState(1);
  const [Dealofday, setgetDealofday] = useState([]);
  const [shoppingDetail, setShoppingDetail] = useState([]);
  const [addToCartOBJ, setAddToCartOBJ] = useState({});
  const [sliceNum, setsliceNum] = useState(0);
  const [notify, setnotify] = useState(false);
  const [shppingcart, setShppingcart] = useState([]);
  // const [sliceIncDec, setsliceIncDec] = useState(0);
  const [totalPages, settotalPages] = useState(1);
  const [nexta, setnext] = useState(false);
  const [enableshimmer, setenableshimmer] = useState('');
  const data = useSelector(state => state.homeScreen)
  const data1 = useSelector(state => state.dealdayProduct)
  const shimmerdata = [{ 'id': 1 }, { 'id': 2 }, { 'id': 3 }, { 'id': 4 }, { 'id': 5 }, { 'id': 6 }, { 'id': 7 },]
  const nextData = useSelector(state => state.dealdayProduct)
  const shoppingData = useSelector(state => state.dealdayProduct);
  const loadProducts = useSelector(state => state.loadProducts)
  const addToCart = useSelector(state => state.addToCart)
  const cartReducer = useSelector(state => state.viewCart);
  const dispatch = useDispatch()
  const myDataSelector = (state) => state.dealdayProduct;
  // console.log("delaypage props=", props);
  console.log("deal shoppingData=", shoppingData, data);
  // console.log("deal addToCart=", addToCart);
  // console.log('nn', loadProducts);
  const initialWidth = () => {
    // setsliceIncDec(floor(window.innerWidth / 251))
    let countSlice = 0
    if (window.matchMedia('(min-width:2001px) and (max-width: 2500px)').matches) {
      countSlice = 1
    }
    if (window.matchMedia('(min-width:1281px) and (max-width: 2000px)').matches) {
      countSlice = 1
    }
    if (window.matchMedia('(min-width:997px) and (max-width:1280px)').matches) {
      countSlice = 1
    }
    if (window.matchMedia('(min-width:465px) and (max-width: 996px)').matches) {
      countSlice = 1
    }
    if (window.matchMedia('(min-width:0px) and (max-width: 464px)').matches) {
      countSlice = 1
    }
    return countSlice;
  }
  useEffect(() => {
    if (data === undefined) {
      // else {
      setgetDealofday(props && props.deal && props.deal.Data)
      // settotalPages(nextData && nextData.dealData.TotalNoOfPages)
      // }
    }
  }, [props, pincodevalue])
  useEffect(() => {
    mycartAPI.getShoppingcartDetails()
      .then((res) => {
        console.log("reorderproductprint11", res);
        setShppingcart(res)
      })
  }, [cartReducer])
  useEffect(() => {
    if (loadProducts !== undefined) {
      setnotify(loadProducts.notify)
    }
  }, [loadProducts])
  useEffect(() => {
    // if (data === undefined) {
    //   if (nextData !== undefined && data.DealofthdayData !== undefined) {
    //   }
    // } else
    if (data !== undefined && data.DealofthdayData !== undefined) {
      setgetDealofday(data.DealofthdayData.Data)
      settotalPages(data.DealofthdayData.TotalNoOfPages)
    }
    else {
      // setgetDealofday(data.DealofthdayData.Data)
      // settotalPages(data.DealofthdayData.TotalNoOfPages)
    }
    // } else {
    //   setgetDealofday(props && props.deal && props.deal.Data)
    //   settotalPages(props && props.deal && props.deal.TotalNoOfPages)
    // }
  }, [data, props, pincodevalue,])
  useEffect(() => {
    // if (Dealofday.length > 9 && sliceNum > Dealofday.length - 9) {
    //   setgetDealofday([...Dealofday, ...Dealofday])
    // }
    if (Dealofday.length > 9 && sliceNum > Dealofday.length - 9 && Dealofday.length - sliceNum < 5) {
      // setsliceNum(Dealofday.length - 5)
      changeSliceNum()
    }
  }, [sliceNum])
  // const handleItemClick = () => {
  //   setIsSliding(false);
  // }
  function changeSliceNum() {
    setsliceNum(Dealofday.length - initialWidth() - 1)
  }
  function changeSliceNumBack() {
    setsliceNum(0)
  }
  /*useEffect(() => {
    console.log("135dispatch===")
    setFirstCall(FirstCall + 1)
    // dispatch(nextBtn(pageNum, 9))
    CustomsAPI.getDealofdayWithPage(pageNum, 9)
      .then((response) => {
        console.log("dealprod res", response);
        setgetDealofday(response.Data)
        settotalPages(response.Data.TotalNoOfPages)
      })
  }, [])*/
  // useEffect(() => {
  //   if (nextData !== undefined && nextData.dealData !== undefined) {
  //     setgetDealofday(nextData.dealData.Data)
  //     settotalPages(nextData.dealData.TotalNoOfPages)
  //   }
  // }, [nextData])
  useEffect(() => {
    if (nexta === true && nextData !== undefined) {
      setgetDealofday([...Dealofday, ...nextData.dealData])
      setShoppingDetail(nextData.shoppingDetails)
    }
  }, [nextData, nexta, pincodevalue])
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
      breakpoint: { max: 2500, min: 2001 }, items: 4,
    },
    desktop: { breakpoint: { max: 2000, min: 1281 }, items: 4, slidesToSlide: 1, partialVisibilityGutter: 10 },
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
  const CustomNext = ({ onClick, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return <button type="button" className="arrow right"
      onClick={() => {
        setsliceNum(sliceNum + initialWidth())
        setNPButton(pageNum + 1)
        // setnext(true)
      }}>
      {Dealofday && (JSON.stringify(Dealofday[Dealofday.length - 5]) !== JSON.stringify(Dealofday.slice(sliceNum, Dealofday.length)[0])) &&
        (< div className="next round" >
          <span className="lnr lnr-chevron-right"></span>
        </div>)
      }
    </button>
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
  useEffect(() => {
    if (FirstCall > 0 && count < totalPages && pincodevalue !== '') {
      dispatch(nextBtn(pageNum, 9))
      setCount(count + 1)
    }
  }, [pageNum, pincodevalue])
  useEffect(() => {
    if (data && data.loading === true) {
      setenableshimmer(true)
    }
  }, [data])
  useEffect(() => {
    // console.log("useffect setShppingcart");
    mycartAPI.getShoppingcartDetails()
      .then((res) => {
        console.log("resdealday=", res);
        setShppingcart(res)
      })
  }, []);
  useEffect(() => {
    if (addToCart !== undefined) {
      dispatch(copyShopingCartDetails(addToCart.shoppingcartDetails))
      setShppingcart(addToCart.shoppingcartDetails)
    }
  }, [addToCart,]);
  /* useEffect(() => {
     if (addToCart !== undefined && addToCart.shoppingcartDetails.length !== 0) {
       // console.log("useffect setShppingcart");
       setShppingcart(addToCart.shoppingcartDetails)
     }
   }, [addToCart,]); */
  // useEffect(() => {
  //   if (data && data.loading === false) {
  //     setenableshimmer(false)
  //   }
  // }, [data])
  const Shimmergallery = d =>
    <Carousel
      responsive={responsive}
      // centerMode={false}
      infinite
      arrows
      transitionDuration={500}
      renderButtonGroupOutside
      renderArrowsWhenDisabled={false}
      customButtonGroup={<CustomButtonGroupAsArrows />}
      // renderButtonGroupOutside={false}
      // renderDotsOutside={false}
      // removeArrowOnDeviceType={['mobile']}
      // swipeable
      customLeftArrow={<CustomPrevious />}
      customRightArrow={<CustomNext />}
    // slidesToSlide={1}
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
      // infinite
      arrows
      // shouldResetAutoplay={false}
      // focusOnSelect={false}
      transitionDuration={500}
      renderButtonGroupOutside
      renderArrowsWhenDisabled={false}
      customButtonGroup={<CustomButtonGroupAsArrows />}
      customLeftArrow={<CustomPrevious />}
      customRightArrow={<CustomNext />}
    // slidesToSlide={4}
    >
      {Dealofday !== undefined && (Dealofday.slice(sliceNum, sliceNum + Dealofday.length) || []).map((mapdata, i) => (
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
                      <div className="active" >
                        <LoadProducts source="dealofday" data={mapdata} shppingcart={shppingcart} index={i} notify={notify} skulisting />
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
          </div>
          : null
      ))
      }
    </Carousel>
  );
  // console.log("data.DealofthdayData.Data", Dealofday);
  return (
    <>
      {data && data.loading !== true && Dealofday !== undefined ?
        <div className="container-fluid homescreenproductsection">
          <div className="row" >
            <div className="col-12" style={{ maxheight: "580px !important" }} >
              <div className="section-title product-spacing hm-11 mb-0" style={{ paddingLeft: '15px' }} >
                <h3>
                  {Dealofday && Dealofday.length === 0 ? null :
                    <span className='dealofday'>Deal Of The Day</span>}
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
              {/* {data && data.loading === true ?
                <Shimmergallery /> :
                <Gallery />} */}
              {/* <ProductGallery dealP roduct={dealProduct} /> */}
              {/* </div> */}
            </div>
          </div>
        </div> : null}
    </>
  );
}
export default DealdayProductOriginal;
