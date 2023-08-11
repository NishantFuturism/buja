/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/**
 *
 * RelatedCategory
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
// import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
// import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';
// import { ShimmerThumbnail } from "react-shimmer-effects";
import { FiChevronLeft } from 'react-icons/fi';
import { BiChevronRight } from 'react-icons/bi';
// import reducer from './reducer';
// import saga from './saga';
//import history from '../../utils/history';
// import { nextBtn } from './actions';
// import './carsoule.css';
import CustomsAPI from '../MainPage/api/homeServices';
import './relatedcategory.css'
// import Slider from 'react-slick'
export function RelatedCategory() {
  //   useInjectReducer({ key: 'shopBrand', reducer });
  //   useInjectSaga({ key: 'shopBrand', saga });
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
    // localStorage.setItem('PLPCat', PageUrl)
    const st = PageUrl.toString();
    const v1 = st.split('/')
    const v3 = v1[2]
    console.log("PLPCat", v1, v3);
    // const st1 = v1.toString();
    // console.log('pmyy', st, v1, v3, st1, pageurl, patrentcaturl);
    // localStorage.setItem('PLPCat', pageurl)
    // localStorage.setItem('PLPparenturl', '/')
    localStorage.setItem('PLPCat', `${v1[0]}/${v1[1]}/${v1[2]}`)
    localStorage.setItem('PLPparenturl', `${v1[0]}/${v1[1]}`)
    // localStorage.setItem('PageUrl', v3)
    // localStorage.setItem('PLPparenturl', patrentcaturl)
    // history.push(`/brands/${PageUrl}`, { state: { PageUrl } })
    let catURL
    if (localStorage.getItem('PLPCat') !== undefined) {
      catURL = (localStorage.getItem('PLPCat').split('/'))
    }
    console.log("catURL===========", catURL);
    CustomsAPI.getRelatedCategoryList(catURL[2])
      .then(response => {
        console.log("response===========", response);
        setgetDealofday(response)
        // { splitarray=Dealofday.length > 0 ?  Dealofday.splice(0,2):null}
        // setunsetfilter(response)
      })
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
    // dispatch(nextBtn(pageNum, 9))
  }, [pageNum])
  useEffect(() => {
    if (nexta === true && nextData !== undefined) {
      setgetDealofday([...Dealofday, ...nextData.dealData])
      // setShoppingDetail(nextData.shoppingDetails)
    }
  }, [nextData, nexta])
  useEffect(() => {
    let catURL
    if (localStorage.getItem('PLPCat') !== undefined) {
      catURL = (localStorage.getItem('PLPCat').split('/'))
    }
    console.log("catURL===========", catURL);
    CustomsAPI.getRelatedCategoryList(catURL[2])
      .then(response => {
        console.log("response===========", response);
        setgetDealofday(response)
        // setunsetfilter(response)
      })
  })
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
      breakpoint: { max: 475 },
      items: 1,
    },
  };
  const CustomButtonGroupAsArrows = ({ next, previous, onClick, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div>
        <button type="button" className='previous round1' onClick={() => {
          setsliceNum(sliceNum - initialWidth())
          if (Dealofday.length > 5 && sliceNum < 5) {
            // setsliceNum(Dealofday.length - 5)
            changeSliceNumBack()
            // previous()
          }
        }}>
          <FiChevronLeft />
          {/* )} */}
        </button>
        <button type="button" className='next round1' onClick={() => {
          setnext(true)
          setsliceNum(sliceNum + initialWidth())
          setNPButton(pageNum + 1)
        }}
        >
          {Dealofday && (JSON.stringify(Dealofday[Dealofday.length - 5]) !== JSON.stringify(Dealofday.slice(sliceNum, Dealofday.length)[0])) &&
            (
              <BiChevronRight />
            )
          }
        </button>
      </div>
    );
  }
  const Gallery = d => (
    <div className="container-fluid ">
      <div className="related-content">
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
            <>{console.log("mapdata", mapdata)}</>
            {
              mapdata.CategoryImage ? <div className="related-content-item">
                <div ><Link href={`/category/${mapdata.PageUrl.replace("category/", "")}`}>
                  <span ><img src={mapdata.CategoryImage} referrerPolicy='no-referrer' alt="britannia" onClick={() => brandProduct(mapdata.PageUrl)} /></span>
                </Link>
                </div>
                <Link href={`/category/${mapdata.PageUrl.replace("category/", "")}`} onClick={() => brandProduct(mapdata.PageUrl)}><h5 >{mapdata.DisplayName}</h5> </Link>
              </div>
                : <></>
            }
          </>
        ))}
        {/* </Carousel> */}
      </div>
    </div >
  );
  function DisplayAllBrands() { }
  return (
    <div className="container-fluid subcatWrapper">
      <div className="row pr-0 ml-0">
        <div className="col-lg-12">
          <div>
            {Dealofday !== undefined && Dealofday.length > 0 ?
              <div style={{ marginTop: '1px ', fontSize: '20px' }}><h3 >Related Categories</h3></div>
              : null}
            <div className="related-content">
              {Dealofday !== undefined && (Dealofday.slice(sliceNum, sliceNum + Dealofday.length) || []).map((mapdata, i) => (
                mapdata.CategoryImage ? <div className="related-content-item">
                  <div ><Link href={`/category/${mapdata.PageUrl.replace("category/", "")}`}>
                    <span ><img src={mapdata.CategoryImage} referrerPolicy='no-referrer' alt="britannia" onClick={() => brandProduct(mapdata.PageUrl)} /></span>
                  </Link>
                  </div>
                  <Link href={`/category/${mapdata.PageUrl.replace("category/", "")}`} onClick={() => brandProduct(mapdata.PageUrl)}><div style={{ color: 'black' }}><h5 >{mapdata.DisplayName}</h5> </div></Link>
                </div>
                  : <></>
              ))}
            </div>
          </div >
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
)(RelatedCategory);
