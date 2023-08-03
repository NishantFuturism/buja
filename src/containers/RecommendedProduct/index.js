/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/**
 *
 * RecommendedProduct
 *
 */
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
// import useStateIfMounted from 'use-state-if-mounted';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
import { copyShopingCartDetails } from '../HomeScreen/actions';
// import '../../../assets1/css/default.min.css';
// // import '../../../public/assets1/css/bundle.css';
// import '../../../public/assets1/css/responsive.min.css';
// import '../../../public/assets1/css/style.min.css';
import { LoadProducts } from '../LoadProducts';
import mycartAPI from '../MainPage/api/mycartAPI';
// import { initialWidth, responsive } from '../MainPage/commonFunctions/customCaurosalBtn';
import { nextBtn } from './actions';
// import './carsoule.css';
import reducer from './reducer';
import saga from './saga';
import ProductDetailAPI from '../MainPage/api/productdetail';
export function RecommendedProduct() {
  useInjectReducer({ key: 'recommendedProduct', reducer });
  useInjectSaga({ key: 'recommendedProduct', saga });
  const [pageNum, setNPButton] = useState(1);
  const [FirstCall, setFirstCall] = useState(0);
  const [count, setCount] = useState(1);
  const [Dealofday, setgetDealofday] = useState([]);
  const [shppingcart, setShppingcart] = useState([]);
  const [shoppingDetail, setShoppingDetail] = useState([]);
  const [addToCartOBJ, setAddToCartOBJ] = useState({});
  const [sliceNum, setsliceNum] = useState(0);
  // const [sliceIncDec, setsliceIncDec] = useState(0);
  const [totalPages, settotalPages] = useState(1);
  const homeScreen = useSelector(state => state.homeScreen)
  // console.log('hj', homeScreen);
  const nextData = useSelector(state => state.recommendedProduct)
  const addToCart = useSelector(state => state.addToCart)
  const dispatch = useDispatch()
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
  useEffect(() => {
    if (FirstCall > 0 && homeScreen !== undefined && homeScreen.recommendeddata !== undefined) {
      // setgetDealofday(homeScreen.recommendeddata.Data)
      settotalPages(homeScreen.recommendeddata.TotalNoOfPages)
    }
  }, [homeScreen])
  useEffect(() => {
    // if (Dealofday.length > 9 && sliceNum > Dealofday.length - 9) {
    //   setgetDealofday([...Dealofday, ...Dealofday])
    // }
    if (Dealofday.length > 9 && sliceNum > Dealofday.length - 9 && Dealofday.length - sliceNum < 5) {
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
  useEffect(() => {
    setFirstCall(FirstCall + 1)
  }, [])
  useEffect(() => {
    if (nextData !== undefined) {
      // setgetDealofday([...Dealofday, ...nextData.dealData])
      setShoppingDetail(nextData.shoppingDetails)
    }
  }, [nextData])
  useEffect(() => {
    if (shoppingDetail !== undefined) {
      // console.log('shoppingDetailmm', addToCartOBJ)
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
        <div className="previous round">
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
      }}>
      {Dealofday && (JSON.stringify(Dealofday[Dealofday.length - 5]) !== JSON.stringify(Dealofday.slice(sliceNum, Dealofday.length)[0])) &&
        (< div className="next round" >
          <span className="lnr lnr-chevron-right"></span>
        </div>)
      }
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
  useEffect(() => {
    ProductDetailAPI.getrecomended()
      .then(response => {
        // console.log("response===========",response);
        setgetDealofday(response.Data)
        // setunsetfilter(response)
      })
  }, [])
  useEffect(() => {
    if (FirstCall > 0 && count < totalPages) {
      dispatch(nextBtn(pageNum, 9))
      setCount(count + 1)
    }
  }, [pageNum])
  useEffect(() => {
    if (nextData !== undefined) {
      // console.log("useffect setShppingcart");
      mycartAPI.getShoppingcartDetails()
        .then((res) => {
          console.log("resdealday=", res);
          setShppingcart(res)
        })
    }
  }, [nextData]);
  useEffect(() => {
    if (addToCart !== undefined) {
      dispatch(copyShopingCartDetails(addToCart.shoppingcartDetails))
      setShppingcart(addToCart.shoppingcartDetails)
    }
  }, [addToCart,]);
  const Gallery = d => (
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
    // slidesToSlide={4}
    >
      {Dealofday.length > 0 && (Dealofday.slice(sliceNum, sliceNum + Dealofday.length) || []).map((mapdata, i) => (
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
                        {/* <Product addToCartOBJ={addToCartOBJ} data={mapdata} index={i} /> */}
                        <LoadProducts data={mapdata} shppingcart={shppingcart} index={i} skulisting />
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
  // console.log("Dealofday====",Dealofday);
  return (
    <>
      {Dealofday !== undefined ?
        <div className="container-fluid homescreenrecommended">
          <div className="row" >
            <div className="col-12" >
              <div className="section-title product-spacing hm-11 mb-0">
                <h3>
                  {Dealofday && Dealofday.length === 0 ? null :
                    <span className='dealofday'>Recommended</span>}
                  {/* {homeScreen && homeScreen.recommendeddata && homeScreen.recommendeddata.Data !== undefined ?
                    <span>Recommended Products</span> : null} */}
                </h3>
                {/* <button type="button" style={{
                backgroundColor: 'transparent', color: 'red', cursor: 'pointer', float: 'right', marginTop: '10px',
              }} >
                VIEW ALL
              </button> */}
              </div>
              {/* <div style={{ margin: '0 auto' }}> */}
              {Dealofday && Dealofday.length === 0 ? null :
                <Gallery />
              }
              {/* <ProductGallery dealProduct={dealProduct} /> */}
              {/* </div> */}
            </div>
          </div>
        </div> : null}
    </>
  );
}
export default RecommendedProduct;
