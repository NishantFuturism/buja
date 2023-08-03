/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/**
 *
 * ShopBrand
 *
 */
import React, { memo, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../../public/assets1/css/default.min.css';
// import '../../../assets1/css/bundle.css';
import '../../../public/assets1/css/responsive.min.css';
import '../../../public/assets1/css/style.min.css';
import { connect, useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import { ShimmerThumbnail } from "react-shimmer-effects";
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
import reducer from './reducer';
import saga from './saga';
import makeSelectShopBrand from './selectors';
////import history from '../../utils/history';
import { useRouter } from 'next/router';
import { nextBtn } from './actions';
import './carsoule.css';
// import Slider from 'react-slick'
export function ShopBrand() {
  useInjectReducer({ key: 'shopBrand', reducer });
  useInjectSaga({ key: 'shopBrand', saga });
  const router = useRouter();
  const [nexta, setnext] = useState(false);
  const [BrandList, setgetBrandList] = useState([]);
  const [pageNum, setNPButton] = useState(1);
  const [FirstCall, setFirstCall] = useState(0);
  const [count, setCount] = useState(1);
  const [Dealofday, setgetDealofday] = useState([]);
  const [sliceNum, setsliceNum] = useState(0);
  const [totalPages, settotalPages] = useState(1);
  const [showpre, setShowpre] = useState(false)
  const shimmerdata = [{ 'id': 1 }, { 'id': 2 }, { 'id': 3 }, { 'id': 4 }, { 'id': 5 }, { 'id': 6 },]
  const homeScreen = useSelector(state => state.homeScreen)
  // console.log("shop by brand", homeScreen);
  // useEffect(() => {
  //   if (brandlistdata && brandlistdata.shopbybrand !== undefined) {
  //     setgetBrandList(brandlistdata.shopbybrand)
  //   }
  //   // CustomsAPI.getBrandList({})
  //   //   .then(response => {
  //   //     console.log('getBrandList', response);
  //   //     setgetBrandList(response);
  //   //   })
  //   //   .catch(error => {
  //   //     console.log('error:::', error);
  //   //   });
  // }, [brandlistdata]);
  function brandProduct(PageUrl) {
    //router.push(`/brands/${PageUrl}`, { state: { PageUrl } })
  }
  const nextData = useSelector(state => state.shopBrand)
  // console.log("nextData", nextData);
  const dispatch = useDispatch()
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
    return countSlice
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  useEffect(() => {
    if (FirstCall > 0 && homeScreen !== undefined && homeScreen.shopbybrand !== undefined) {
      // setgetDealofday(homeScreen.recommendeddata.Data)
      setgetDealofday(homeScreen.shopbybrand.Data)
      settotalPages(homeScreen.shopbybrand.TotalNoOfPages)
    }
  }, [homeScreen])
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
  useEffect(() => {
    setFirstCall(FirstCall + 1)
    dispatch(nextBtn(pageNum, 9))
  }, [pageNum])
  useEffect(() => {
    if (nexta === true && nextData !== undefined) {
      setgetDealofday([...Dealofday, ...nextData.dealData])
      // setShoppingDetail(nextData.shoppingDetails)
    }
  }, [nextData, nexta])
  // useEffect(() => {
  //   if (nextData !== undefined) {
  //     setgetDealofday([...Dealofday, ...nextData.dealData])
  //     // setShoppingDetail(nextData.shoppingDetails)
  //   }
  // }, [nextData])
  // useEffect(() => {
  //   if (shoppingDetail !== undefined) {
  //     // console.log('shoppingDetailmm', addToCartOBJ)
  //     shoppingDetail.forEach(itm => {
  //       objCreation(itm.SKUFilterPriceId, itm.Quantity)
  //     })
  //   }
  // }, [shoppingDetail])
  function objCreation(SKUFilterPriceId, Quantity) {
    const obj = {}
    obj[`${SKUFilterPriceId}`] = Quantity
    // setAddToCartOBJ({ ...addToCartOBJ, ...obj })
  }
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 2500, min: 2001 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1281 },
      items: 8, partialVisibilityGutter: 10
    },
    tablet: {
      breakpoint: { max: 1280, min: 996 },
      items: 4,
    },
    miniTablet: {
      breakpoint: { max: 995, min: 651 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 650, min: 475 },
      items: 2,
    },
    smallScreenmobile: {
      breakpoint: { max: 475, min: 0 },
      items: 1,
    },
  };
  // eslint-disable-next-line react/prop-types
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
  // const CustomButtonGroupAsArrows = ({ next, previous, onClick, ...rest }) => {
  //   const { carouselState: { currentSlide } } = rest;
  //   return (
  //     <div>
  //       <button type="button" className='previous round1' onClick={() => {
  //         setsliceNum(sliceNum - initialWidth())
  //         if (Dealofday.length > 5 && sliceNum < 5) {
  //           // setsliceNum(Dealofday.length - 5)
  //           changeSliceNumBack()
  //           // previous()
  //         }
  //       }}>
  //         <FiChevronLeft />
  //         {/* )} */}
  //       </button>
  //       <button type="button" className='next round1' onClick={() => {
  //         setnext(true)
  //         setsliceNum(sliceNum + initialWidth())
  //         setNPButton(pageNum + 1)
  //       }}
  //       >
  //         {Dealofday && (JSON.stringify(Dealofday[Dealofday.length - 5]) !== JSON.stringify(Dealofday.slice(sliceNum, Dealofday.length)[0])) &&
  //           (
  //             <BiChevronRight />
  //           )
  //         }
  //       </button>
  //     </div>
  //   );
  // }
  // useEffect(() => {
  //   if (FirstCall > 0 && count < totalPages) {
  //     dispatch(nextBtn(pageNum, 9))
  //     setCount(count + 1)
  //   }
  // }, [pageNum])
  const Gallery = d => (
    <div id='brandsSlider1'>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={2000}
        transitionDuration={500}
        renderButtonGroupOutside
        customButtonGroup={<CustomButtonGroupAsArrows />}
        customLeftArrow={<CustomPrevious />}
        customRightArrow={<CustomNext />}
        slidesToSlide={1}
      >
        {/* <button type="button" className="arrow right"
          onClick={() => {
            setsliceNum(sliceNum - initialWidth())
            if (Dealofday.length > 5 && sliceNum < 5) {
              // setsliceNum(Dealofday.length - 5)
              changeSliceNumBack()
            }
          }}
        >
          {sliceNum !== 0 && (
            < div className="previous round1" >
              <span className="lnr lnr-chevron-left"></span>
            </div>
          )}
        </button> */}
        {Dealofday !== undefined && (Dealofday.slice(sliceNum, sliceNum + Dealofday.length) || []).map((mapdata, i) => (
          // <>
          //   {/* <div className="owl-stage" style={{ transform: 'translate3d(-3915.62px, 0px, 0px)', transition: 'all 0.25s ease 0s', width: '5638.5px' }}>
          //     <div className="owl-item cloned" style={{ width: '151.625px', marginRight: '5px' }}> */}
          //   {/* <img referrerPolicy='no-referrer' src={mapdata.Thumbnail} style={{ width: 'inherit !important' }} alt="Kaveri Camphor" /> */}
          //   <img src="https://productionadmin.adibuja.com/Media/Images/250x250/image_not_found.jpg" referrerPolicy='no-referrer' alt="britannia" onClick={() => brandProduct(mapdata.PageUrl)} />
          //   {/* </div>
          //   </div> */}
          // </>
          < >
            {
              mapdata.Thumbnail ? <>
                <div style={{ marginRight: "5px", height: "80px" }}><Link href={`/brands/${mapdata.PageUrl}`}>
                  <span style={{ margin: '0px 10px 0px 10px' }}><img className="" src={mapdata.Thumbnail} referrerPolicy='no-referrer' alt="britannia" onClick={() => brandProduct(mapdata.PageUrl)} /></span>
                </Link>
                </div>
              </>
                : <></>
            }
          </>
        ))}
      </Carousel>
    </div >
  );
  function DisplayAllBrands() { }
  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-12">
          <div className="container-fluid pt-60 pb-20 homescreenshopbybrand">
            <div>
              {homeScreen && homeScreen.loading !== true && Dealofday !== undefined ?
                <><div style={{ float: "left" }}><h3>Shop by Brands</h3></div><div style={{ paddingTop: "10px", float: "right" }}><h6 style={{ color: "black", fontWeight: "600" }}><a href='/allbrands'>Shop All</a></h6></div>
                  {Dealofday && Dealofday.length === 0 ? null :
                    <Gallery />
                  }</>
                : null}
              {/* <button
                  type="button"
                  onClick={DisplayAllBrands()}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'red',
                    cursor: 'pointer',
                    float: 'right',
                    marginTop: '-31px',
                  }}
                >
                  VIEW ALL
                </button> */}
            </div>
            {/* {brandlistdata && brandlistdata.loading ?
                <div className="row catbox" style={{ marginLeft: 30 }}>
                  {shimmerdata.map(itm => (
                    <ShimmerThumbnail height={70} width={100} />))}</div> : */}
            {/* <Carousel
                swipeable={false}
                draggable={false}
                // showDots={true}
                arrows
                className='shopby_brand'
                responsive={responsive}
                // ssr={true} // means to render carousel on server-side.
                infinite
                // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={2000}
                autoPlay
                keyBoardControl
                // customTransition="all .5"
                // transitionDuration={500}
                // containerClass="carousel-container"
                removeArrowOnDeviceType={['tablet', 'mobile']}
              // devidceType={this.props.deviceType}
              > */}
            {/* {BrandList && BrandList.map(data => (
                  // <Link to={`/brands/${data.PageUrl}`} >
                  <img src={data.Thumbnail} referrerPolicy='no-referrer' alt="britannia" onClick={() => brandProduct(data.PageUrl)} />
                  // </Link>
                ))}
              </Carousel> */}
            {/* } */}
          </div>
        </div>
      </div>
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(
  // mapStateToProps,
  memo,
)(ShopBrand);
