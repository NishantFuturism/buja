/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/**
 *
 * ReorderProduct
 *
 */
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
// import { ShimmerPostItem } from 'react-shimmer-effects';
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
import LoadProducts from '../LoadProducts';
// import { nextBtn } from './actions';
import reducer from './reducer';
import saga from './saga';
import CustomsAPI from '../MainPage/api/homeServices';
import mycartAPI from '../MainPage/api/mycartAPI';
import { copyShopingCartDetails } from '../HomeScreen/actions';
export function NewArrivalProduct(props) {
  useInjectReducer({ key: 'newArrivalProduct', reducer });
  useInjectSaga({ key: 'newArrivalProduct', saga });
  // const [reorderedlist, setreorderedlist] = useState([])
  // const reordecrreducer = useSelector(state => state.reorderProduct)
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
  const nextData = useSelector(state => state.featureProduct)
  const addToCart = useSelector(state => state.addToCart)
  // console.log('dd', nextData);
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
    // dispatch(listreorder())
    setTimeout(() => {
      CustomsAPI.newArrivalProduct({})
        .then(response => {
          console.log("newArrivalProductList", response);
          // setloading(false)
          if (response !== null) {
            setgetDealofday(response.Data)
          }
        })
        .catch(error => {
          console.log('error:::', error);
        });
    }, 1500);
  }, [props])
  // useEffect(() => {
  //   if (nextData !== undefined && nextData.dealData !== undefined) {
  //     if (nextData && nextData.dealData.length > 0) {
  //       setgetDealofday(nextData.dealData)
  //     }
  //     settotalPages(nextData.dealData.TotalNoOfPages)
  //   }
  // }, [nextData])
  // useEffect(() => {
  //   if (FirstCall > 1 && nextData !== undefined && Dealofday !== undefined && nextData.dealData !== undefined && nextData.dealData.GetSkuRelated !== undefined) {
  //     console.log('Dealofday', Dealofday, nextData);
  //     if (Dealofday.length > 0) {
  //       setgetDealofday([...Dealofday, ...nextData.dealData])
  //     }
  //     setShoppingDetail(nextData.shoppingDetails)
  //   }
  // }, [nextData])
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
    miniTablet: { breakpoint: { max: 995, min: 651 }, items: 3, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 650, min: 475 }, items: 2, slidesToSlide: 1 },
    smallScreenmobile: { breakpoint: { max: 475, min: 1 }, items: 1, slidesToSlide: 1 },
  };
  // useEffect(() => {
  //   if (nextData !== undefined) {
  //     console.log("useffect setShppingcart");
  //     setShppingcart(nextData.shoppingDetailsReorder)
  //   }
  // }, [nextData]);
  // useEffect(() => {
  //   if (addToCart !== undefined && addToCart.shoppingcartDetails.length !== 0) {
  //     console.log("useffect setShppingcart");
  //     setShppingcart(addToCart.shoppingcartDetails)
  //   }
  // }, [addToCart,]);
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
    if (nextData !== undefined) {
      // console.log("useffect setShppingcart");
      mycartAPI.getShoppingcartDetails()
        .then((res) => {
          console.log("resdealday", res);
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
  useEffect(() => {
    if (FirstCall < 1) {
      // dispatch(nextBtn(pageNum, 9))
    }
    console.log('nextBtn index', pageNum);
    if (count < totalPages) {
      // dispatch(nextBtn(pageNum, 9))
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
      {Dealofday !== undefined && Dealofday.length > 0 && (Dealofday.slice(sliceNum, sliceNum + Dealofday.length) || []).map((mapdata, i) => (
        mapdata.FiltersList.length !== 0 ?
          <div className="tab-content" key={sliceNum}>
            {console.log("mapdata", mapdata)}
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
                        <LoadProducts source="newarrival" data={mapdata} shppingcart={shppingcart} index={i} skulisting />
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
  console.log(" Dealofday", Dealofday);
  return (
    <>
      {Dealofday !== undefined ?
        <div className="container-fluid viewcartreorder">
          <div className="row" >
            <div className="col-12" >
              <div className="section-title product-spacing hm-11 mb-0" style={{ paddingLeft: "15px" }}>
                <h3>
                  {Dealofday && Dealofday.length === 0 ? null :
                    <span className='dealofday'>New Arrivals</span>}
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
              {/* <Gallery /> */}
              {/* <ProductGallery dealProduct={dealProduct} /> */}
              {/* </div> */}
            </div>
          </div>
        </div> : null}
    </>
  );
}
export default (NewArrivalProduct);
