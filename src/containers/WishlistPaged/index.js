/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/**
 *
 * WishlistPaged
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@/utils/injectSaga';
import { useInjectReducer } from '@/utils/injectReducer';
import Carousel from 'react-multi-carousel';
import makeSelectWishlistPaged from './selectors';
import reducer from './reducer';
import saga from './saga';
//import messages from './messages';
import LoadProducts from '../LoadProducts';
import mycartAPI from '../MainPage/api/mycartAPI';
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
import 'react-multi-carousel/lib/styles.css';
import { nextBtn } from './actions';
import { ShimmerPostItem } from "react-shimmer-effects";
export function WishlistPaged(props) {
  useInjectReducer({ key: 'wishlistPaged', reducer });
  useInjectSaga({ key: 'wishlistPaged', saga });
  const [pageNum, setNPButton] = useState(1);
  const [FirstCall, setFirstCall] = useState(0);
  const [count, setCount] = useState(1);
  const [Dealofday, setgetDealofday] = useState([]);
  const [shoppingDetail, setShoppingDetail] = useState([]);
  const [addToCartOBJ, setAddToCartOBJ] = useState({});
  const [sliceNum, setsliceNum] = useState(0);
  const [shppingcart, setShppingcart] = useState([]);
  // const [sliceIncDec, setsliceIncDec] = useState(0);
  const [totalPages, settotalPages] = useState(1);
  // const homeScreen = useSelector(state => state.homeScreen)
  const nextData = useSelector(state => state.wishlistPaged)
  const addToCart = useSelector(state => state.addToCart)
  const cartReducer = useSelector(state => state.viewCart);
  // console.log('vv', addToCart);
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
    if (nextData !== undefined && nextData.dealData !== undefined) {
      setgetDealofday(nextData.dealData.Data)
      settotalPages(nextData.dealData.TotalNoOfPages)
    }
  }, [nextData])
  useEffect(() => {
    mycartAPI.getShoppingcartDetails()
      .then((res) => {
        console.log("reorderproductprint11", res);
        setShppingcart(res)
      })
  }, [cartReducer])
  useEffect(() => {
    if (FirstCall > 1 && nextData !== undefined && Dealofday !== undefined && nextData.dealData !== undefined && nextData.dealData.GetSkuRelated !== undefined) {
      console.log('Dealofday', Dealofday, nextData);
      setgetDealofday([...Dealofday, ...nextData.dealData.data])
      setShoppingDetail(nextData.shoppingDetails)
    }
  }, [nextData])
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
    // if (FirstCall < 1) {
    //   console.log('index in First call');
    //   dispatch(nextBtn(1, 9))
    // }
  }, [])
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
      breakpoint: { max: 2500, min: 2001 }, items: 6,
    },
    desktop: { breakpoint: { max: 2000, min: 1281 }, items: 4, partialVisibilityGutter: 10 },
    // tablet1: { breakpoint: { max: 1536, min: 1281 }, items: 4, },
    tablet: { breakpoint: { max: 1280, min: 996 }, items: 3, },
    miniTablet: { breakpoint: { max: 995, min: 651 }, items: 3, },
    mobile: { breakpoint: { max: 650, min: 475 }, items: 2, },
    smallScreenmobile: { breakpoint: { max: 475, min: 1 }, items: 1, },
  };
  // useEffect(() => {
  //   if (nextData !== undefined) {
  //     console.log("useffect setShppingcart");
  //     setShppingcart(nextData.shoppingDetailsReorder)
  //   }
  // }, [nextData]);
  useEffect(() => {
    if (addToCart !== undefined && addToCart.shoppingcartDetails.length !== 0) {
      console.log("useffect setShppingcart");
      setShppingcart(addToCart.shoppingcartDetails)
    }
  }, [addToCart]);
  // const responsive = {
  //   superLargeDesktop: {
  //     breakpoint: { max: 2500, min: 2001 },
  //     items: 6,
  //   },
  //   desktop: { breakpoint: { max: 2000, min: 1281 }, items: 5, partialVisibilityGutter: 10 },
  //   tablet: {
  //     breakpoint: { max: 1280, min: 996 },
  //     items: 4,
  //   },
  //   miniTablet: {
  //     breakpoint: { max: 996, min: 464 },
  //     items: 2,
  //   },
  //   mobile: {
  //     breakpoint: { max: 463 },
  //     items: 1,
  //   },
  // };
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
        <button type="button" className='previous round1' onClick={() =>
          previous()}>
          <FiChevronLeft />
        </button>
        <button type="button" className='next round1' onClick={() => next()}>
          <BiChevronRight />
        </button>
      </div>
    );
  }
  useEffect(() => {
    dispatch(nextBtn(1, 9))
  }, [])
  useEffect(() => {
    if (FirstCall < 1) {
      dispatch(nextBtn(pageNum, 9))
    }
    console.log('nextBtn index', pageNum);
    if (count < totalPages) {
      dispatch(nextBtn(pageNum, 9))
      setCount(count + 1)
    }
  }, [pageNum])
  const Gallery = () => (
    <Carousel
      responsive={responsive}
      // centerMode={false}
      infinite
      arrows
      transitionDuration={500}
      // renderButtonGroupOutside={false}
      // renderDotsOutside={false}
      // removeArrowOnDeviceType={['mobile']}
      // swipeable
      renderButtonGroupOutside
      customButtonGroup={<CustomButtonGroupAsArrows />}
      customLeftArrow={<CustomPrevious />}
      customRightArrow={<CustomNext />}
      slidesToSlide={4}
    >
      {Dealofday !== undefined && Dealofday !== null && (Dealofday.slice(sliceNum, sliceNum + Dealofday.length) || []).map((mapdata, i) => (
        mapdata.FiltersList.length !== 0 ?
          <div className="tab-content" key={sliceNum}>
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
  // console.log('deal of the day', sliceNum, Dealofday, pageNum);
  return (
    <>
      {Dealofday !== undefined && Dealofday !== null ?
        <div className="container-fluid checkoutwishlist">
          <div className="row" >
            <div className="col-12" >
              <div className="mt-0 section-title product-spacing hm-11 mb-0" style={{ paddingLeft: "15px" }}>
                <h3>
                  {Dealofday && Dealofday.length === 0 ? null :
                    <span className='dealofday'>Wishlist</span>}
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
const mapStateToProps = createStructuredSelector({
  wishlistPaged: makeSelectWishlistPaged(),
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
export default compose(withConnect)(WishlistPaged);
