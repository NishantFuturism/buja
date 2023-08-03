/* eslint-disable no-param-reassign */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/**
 *
 * Subcategory
 *
 */
import '@icon/linearicons/linearicons.css';
import { groupBy, set } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import '../../../assets1/css/bundle.css';
import '../../../assets1/css/default.min.css';
// import '../../../assets1/css/font-awesome.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
// import { ShimmerPostItem } from 'react-shimmer-effects';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import SubNavigation from '../../components/SubNavigation';
import { LoadProducts } from '../LoadProducts';
import Constants from '../App/constants';
import ProductlistingAPI from '../MainPage/api/productlisting';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { defaultAction, getbrandListfilter, getproductlist, RemovingOldData } from './actions';
import reducer from './reducer';
import saga from './saga';
import BreadCrumb from '../MyAccount/productpageBreadCrumb';
// import Slider from './Slider';
import "./slider.css";
import BouncingDotsLoader from '../../components/BouncingDotsLoader';
import Footer from '../../components/Footer';
// import ToppSelling from '../ToppSellingOriginal/saga';
// import RecentlyViewProduct from '../RecentlyViewProduct';
import classnames from "classnames";
import ToppSellingOriginal from '../ToppSellingOriginal';
// import TopsellingProduct from '../TopsellingProduct';
import RelatedProduct from '../RelatedProduct';
import { RecentlyViewProduct } from '../RecentlyViewProduct';
import { copyShopingCartDetails } from '../HomeScreen/actions';
import CustomsAPI from '../MainPage/api/homeServices';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Multiselect from 'multiselect-react-dropdown';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { array, object } from 'prop-types';
import { NumberFormat } from 'intl';
import { reset } from 'yargs';
import { RelatedCategory } from '../RelatedCategory';
import SignIn from '../../components/Footer/signin';
import logoanimation from '../../images/adibuja-logo-animation.gif'
import sortimg from '../../images/dropdownsort.png'
export function Subcategory(props) {
  // console.log("subcategory props=", props);
  useInjectReducer({ key: 'subcategory', reducer });
  useInjectSaga({ key: 'subcategory', saga });
  const footerData = useSelector(state => state.homeScreen)
  const [advancegetskufilterdata, setadvancegetskufilterdata] = useState([]);
  const [FirstCall, setFirstCall] = useState(0);
  const [page, setPage] = useState(1);
  const [scrollvalue, setscrollvalue] = useState(100);
  const [initialCall, setInitialCall] = useState(false);
  const [valueString, setValueString] = useState('');
  const [valuepackString, setvaluepackString] = useState('');
  const [RAMString, setRAMString] = useState('');
  const [RAMFilterId, setRAMFilterId] = useState('');
  const [fieldString, setfieldString] = useState('');
  const [valuediscountstring, setvaluediscountstring] = useState('');
  const [parentcatURL, setParentcatURL] = useState('');
  const [enableshowmore, setenableshowmore] = useState(false);
  const nextData = useSelector(state => state.ToppSelling)
  const [URL, setURL] = useState('');
  const [Reset, setReset] = useState(false);
  const [notify, setnotify] = useState(false);
  const [loading, setloading] = useState(false);
  const range = useRef(null);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const shimmerdata = [{ 'id': 1 }, { 'id': 2 }, { 'id': 3 }, { 'id': 4 }, { 'id': 5 }, { 'id': 6 }, { 'id': 7 }, { 'id': 8 }]
  const loadProducts = useSelector(state => state.loadProducts)
  // const nextData = useSelector(state => state.dealdayProduct)
  const [groupedData, setgroupedData] = useState([]);
  const [shppingcart, setShppingcart] = useState([]);
  const [unsetfilter, setunsetfilter] = useState([]);
  // const [BrandList, setBrandList] = useState([]);
  // const [PackSize, setPackSize] = useState([]);
  // const [FoodPreference, setFoodPreference] = useState([]);
  // const [CountryOfOrigin, setCountryOfOrigin] = useState([]);
  // const [Discount, setDiscount] = useState([]);
  // const [Weight, setWeight] = useState([]);
  // const [GlassType, setGlassType] = useState([]);
  // const [PrimaryCamera, setPrimaryCamera] = useState([]);
  // const [InternalStorage, setInternalStorage] = useState([]);
  // const [RAM, setRAM] = useState([]);
  // const [Color, setColor] = useState([]);
  // const [displaysubcategory, setdisplaysubcategory] = useState([]);
  const [Seleced, setSeleced] = useState('POP');
  const [filterproduct, setfilterproduct] = useState([]);
  const [filterflag, setFilterflag] = useState(false)
  const [checked, setChecked] = useState(true);
  const [min, setmin] = useState('');
  const [max, setMax] = useState('');
  const [isActive, setisActive] = useState(false)
  const [categoryName, setcategoryName] = useState([]);
  const [checkfilterflag, setcheckfilterflag] = useState(false)
  const [productcount, setproductcount] = useState()
  const [breadcrumbProdcount, setbreadcrumbProdcount] = useState()
  const [productcategoryName, setproductcategoryName] = useState('')
  const [selectedBrand, setselectedBrand] = useState([]);
  const [selectedPacksize, setselectedPacksize] = useState([]);
  const [selectedFood, setselectedFood] = useState([]);
  const [selectedPrimaryCamera, setselectedPrimaryCamera] = useState([]);
  const [selectedDiscount, setselectedDiscount] = useState([]);
  const [selectedRAM, setselectedRAM] = useState([]);
  const [selectedIntStorage, setselectedIntStorage] = useState([]);
  const [selectedColor, setselectedColor] = useState([]);
  const [selectedWeight, setselectedWeight] = useState([]);
  const [selectedGlassType, setselectedGlassType] = useState([]);
  const [selectedCountry, setselectedCountry] = useState([]);
  const [selectItemDisp, setSelectItemDisp] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [advfilterData, setAdvfilterData] = useState([]);
  const [preselectItem, setpreselectItem] = useState([]);
  const [filterpopup, setfilterpopup] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [filterdynamicpopup, setfilterdynamicpopup] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  useEffect(() => {
    if (advancegetskufilterdata !== undefined) {
      setAdvfilterData(Object.entries(groupBy(advancegetskufilterdata, v => v.Caption)))
    }
  }, [advancegetskufilterdata])
  console.log("advfilterData===", advfilterData);
  // const [filtered, setFiltered] = useState([]);
  const dispatch = useDispatch()
  const SubcategoryState = useSelector(state => state.subcategory)
  const homestate = useSelector(state => state.homeScreen)
  const addToCart = useSelector(state => state.addToCart)
  const mavigationBarReducer = useSelector(state => state.mavigationBar)
  console.log("mavigationBarReducer...", mavigationBarReducer)
  const sortByfiltersList = [{ ListItem: ' Name (A - Z)', id: 1, value: 'AZ' }, { ListItem: ' Name (Z - A)', id: 2, value: 'ZA' }, { ListItem: 'Price (Low - High)', id: 3, value: 'PLH' }, { ListItem: 'Price (High - Low)', id: 4, value: 'PHL' }, { ListItem: 'Popularity', id: 5, value: 'POP' }]
  // console.log('homestate', homestate);
  const location = useLocation()
  // console.log('location', location, URL);
  console.log("SubcategoryStatepage=", SubcategoryState);
  // console.log("subcat=", URL);
  console.log("groupedData=", groupedData);
  // console.log("subcategory addToCart=", addToCart);
  // console.log("shppingcart=", addToCart);
  let fixIntCount;
  let Finalnopages;
  let TotalproductCount;
  const productNoofData = groupedData[0];
  // const finalproductNoofData = productNoofData;
  // / useEffect(() => {
  if (SubcategoryState !== undefined) {
    TotalproductCount = SubcategoryState.subCategoryProductList.OverAllCount;
    Finalnopages = TotalproductCount / 20;
    fixIntCount = Finalnopages;
  }
  // }, [handleScroll])
  // console.log("groupedData.length < TotalproductCount=", groupedData, finalproductNoofData, TotalproductCount)
  const handleScroll = () => {
    // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    console.log("onscroll pageno=", page);
    // if (window.scrollY > scrollvalue) {
    if (FirstCall > 0 && URL !== undefined) {
      console.log("onscroll pageno=", page);
      if (fixIntCount + 1 > page) {
        setscrollvalue(scrollvalue + 200)
        setTimeout(() => {
          setPage(page + 1)
        }, 1000);
        console.log("onscroll pageno=", page);
      }
    } else {
      setloading(true)
    }
    // }
  }
  useEffect(() => {
    setisActive(true)
    if (localStorage.getItem('generatedtoken')) {
      // working fine
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
            window.location.reload(true);
            // setheadercall(true)
            // setPage(false)
            // setfootercall(true)
            // dispatch(defaultAction(localStorage.getItem('skuproduct')))
            // dispatch(defaultActiondeal())
          },
          /* error => {
            // this.setState({ buttonload: false });
            // console.log(error);
            history.pushState('/NotFoundPage')
          }, */
        );
    }
  }, [])
  useEffect(() => {
    console.log("152 handle scroll fucntion=", filterflag, Reset, groupedData);
    if (filterflag === false && Reset === false) {
      console.log("235 handle scroll fucntion=", URL[2], parentcatURL[1]);
      dispatch(getproductlist(page + 1, URL[2], parentcatURL[1], null, null))
    }
  }, [page]);
  useEffect(() => {
    if (loadProducts !== undefined) {
      setnotify(loadProducts.notify)
    }
  }, [loadProducts])
  useEffect(() => {
    if (SubcategoryState !== undefined) {
      setShppingcart(SubcategoryState.shoppingCartDetails)
    }
  }, [SubcategoryState]);
  useEffect(() => {
    if (addToCart !== undefined) {
      dispatch(copyShopingCartDetails(addToCart.shoppingcartDetails))
      setShppingcart(addToCart.shoppingcartDetails)
    }
  }, [addToCart,]);
  useEffect(() => {
    setFirstCall(FirstCall + 1)
  }, [initialCall])
  useEffect(() => {
    setPage(1)
    dispatch(RemovingOldData())
    ClearAllFilter();
    const plpCatUrl = location.pathname;
    const finalPlpCarUrl = plpCatUrl.replace(/(.*\/)(category\/.*?)(\/.*)/, "$2$3");
    localStorage.setItem('PLPCat', finalPlpCarUrl)
    setURL(finalPlpCarUrl.split('/'))
    const parentUrl = location.pathname;
    const finalParentUrl = parentUrl.replace(/(.*\/)(category\/.*?)(\/.*)/, "$2");
    console.log(`coming here to print--${finalParentUrl}`);
    localStorage.setItem('PLPparenturl', finalParentUrl)
    setParentcatURL(finalParentUrl.split('/'))
    /* if (localStorage.getItem('PLPCat') && localStorage.getItem('PLPCat') !== undefined) {
      setURL(localStorage.getItem('PLPCat').split('/'))
    } else {
      const plpCatUrl = location.pathname;
      const finalPlpCarUrl = plpCatUrl.replace(/(.*\/)(category\/.*?)(\/.*)/, "$2$3");
      localStorage.setItem('PLPCat', finalPlpCarUrl)
      props && props.location && props.location.state && setURL(props.location.state.isURLChange.split('/'))
    }
    if (localStorage.getItem('PLPparenturl')) {
      setParentcatURL(localStorage.getItem('PLPparenturl').split('/'))
    } else {
      const parentUrl = location.pathname;
      const finalParentUrl = parentUrl.replace(/(.*\/)(category\/.*?)(\/.*)/, "$2");
      console.log(`coming here to print--${finalParentUrl}`);
      localStorage.setItem('PLPparenturl', finalParentUrl)
      setParentcatURL(finalParentUrl.split('/'))
    } */
    // setParentcatURL(localStorage.getItem('PLPparenturl').split('/'))
  }, [props,])
  useEffect(() => {
    if (!initialCall && SubcategoryState !== undefined) {
      setloading(true)
      setgroupedData(SubcategoryState.advanceSkusListingByFilterModels)
      setproductcount(SubcategoryState.advanceSkusListingByFilterModels.length)
      // setmin(SubcategoryState.subCategoryProductList.minprice)
      // setMax(SubcategoryState.subCategoryProductList.maxprice)
      // setproductcategoryName(SubcategoryState.advanceSkusListingByFilterModels[0].CategoryName)
      // setloading(false)
    }
    if (FirstCall > 0 && SubcategoryState !== undefined && initialCall) {
      setFilterflag(false)
      // const TempGroupData = SubcategoryState.productlist.filter((fitem) => {
      //   return (
      //     fitem.CategoryUrl === URL[2]
      //   )
      // })
      const uniqueNamesgroup = SubcategoryState.productlist.filter((ele, ind) => ind === SubcategoryState.productlist.findIndex(elem => elem.SkuId === ele.SkuId && elem.CategoryUrl === URL[2]))
      // console.log("uniqueNamesgroup====", uniqueNamesgroup);
      setgroupedData(Object.entries(groupBy(uniqueNamesgroup, v => v.CategoryName)))
      // setgroupedData(Object.entries(groupBy(SubcategoryState.productlist, v => v.CategoryName)))
      // setgroupedData(SubcategoryState.productlist)
      // setmin(SubcategoryState.subCategoryProductList.minprice)
      // setMax(SubcategoryState.subCategoryProductList.maxprice)
      if (SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0) {
        setmin(SubcategoryState.productlist[0].MinPrice)
        setMax(SubcategoryState.productlist[0].MaxPrice)
        setbreadcrumbProdcount(SubcategoryState.productlist[0].OverAllCount)
      }
      setFilterflag(false)
      setloading(false)
    } else {
      setloading(true)
    }
    if (FirstCall > 0 && max !== 0 && SubcategoryState !== undefined) {
      // setmin(SubcategoryState.subCategoryProductList.minprice)
      // setMax(SubcategoryState.subCategoryProductList.maxprice)
    }
  }, [SubcategoryState])
  // useEffect(() => {
  //   if (groupedData !== undefined && groupedData.length !== 0) {
  //     console.log("250groupedData==", groupedData);
  //     const TempGroupData = groupedData.filter((fitem) => {
  //       return (
  //         fitem.CategoryUrl === URL[2]
  //       )
  //     })
  //     const uniqueNamesgroup = TempGroupData.filter((ele, ind) => ind === TempGroupData.findIndex(elem => elem.SkuId === ele.SkuId))
  //     // console.log("uniqueNames===", uniqueNames);
  //     console.log("uniqueNamesgroup====", uniqueNamesgroup);
  //     setgroupedData(Object.entries(groupBy(uniqueNamesgroup, v => v.CategoryName)))
  //   }
  // }, [groupedData])
  useEffect(() => {
    // console.log("valuediscountstring===", SubcategoryState, initialCall, checkfilterflag, filterflag, Reset);
    // console.log('initialCall', initialCall, URL[2] !== undefined, URL);
    // if (URL !== localStorage.getItem('PLPCat').split('/')) {
    if (URL !== undefined && URL[2] !== undefined && initialCall && checkfilterflag === false && filterflag === false && Reset === false) {
      // console.log("getproductlist", URL[2], parentcatURL[1]);
      console.log("get productlist=");
      // setFilterflag(false)
      dispatch(getproductlist(page, URL[2], parentcatURL[1], null, null))
      // console.log("getproductlist subcategory=", SubcategoryState);
      // setReset(true)
      // if (SubcategoryState.subCategoryProductList.minprice === undefined && SubcategoryState.subCategoryProductList.maxprice === undefined) {
      //   SubcategoryState.subCategoryProductList.minprice = 0
      //   SubcategoryState.subCategoryProductList.maxprice = 0
      // }
      // console.log("setmin setmax", min, max,)
      ProductlistingAPI.getadvancegetskufilter(URL[2], min, max)
        .then(response => {
          // console.log("advancegetskufilterdata", response);
          setadvancegetskufilterdata(response)
          setunsetfilter(response)
        })
      // ProductlistingAPI.Getskudispplayinsubcategories(URL[2])
      //   .then(response => {
      //     setdisplaysubcategory(response)
      //   })
    }
    if (FirstCall > 0 && URL !== undefined && !initialCall && Reset === true) {
      console.log("valuediscountstring===", FirstCall, URL, initialCall);
      // console.log('valueString', valueString, "valuepackString", valuepackString, fieldString, "fieldString");
      // dispatch(RemovingOldData())
      const sortby = Seleced || ''
      dispatch(getbrandListfilter(valueString, valuepackString, fieldString, valuediscountstring, URL[2], min, max, sortby))
      setloading(false)
    }
  }, [URL, initialCall, Seleced, parentcatURL])
  useEffect(() => {
    // if (SubcategoryState !== undefined && SubcategoryState.subCategoryProductList.minprice !== undefined) {
    if (SubcategoryState !== undefined) {
      // console.log("264valuediscountstring===", valuediscountstring, valueString, valuepackString, SubcategoryState);
      if (valuediscountstring === '' && valueString === '' && valuepackString === '' && Seleced === 'POP' && (SubcategoryState.productlist === undefined || SubcategoryState.productlist.length === 0 || SubcategoryState.productlist[0].MinPrice == min) && (SubcategoryState.productlist === undefined || SubcategoryState.productlist.length === 0 || SubcategoryState.productlist[0].MaxPrice == max)
      ) {
        // console.log("valuediscountstring.length, initialCall=", initialCall);
        setInitialCall(true)
        setReset(false)
      } else {
        // console.log("valuediscountstring.length, initialCall=", initialCall);
        setInitialCall(false)
        // setReset(true)
      }
    }
    // }
    if (FirstCall > 0 && URL !== undefined && !initialCall && Reset === true) {
      console.log("valuediscountstring===", FirstCall, URL, initialCall);
      const sortby = Seleced || ''
      // dispatch(RemovingOldData())
      dispatch(getbrandListfilter(valueString, valuepackString, fieldString, valuediscountstring, URL[2], min, max, sortby))
      setloading(false)
    }
  }, [valueString, valuediscountstring, valuepackString, fieldString, URL, min, max, Seleced,])
  useEffect(() => {
    console.log("336handlelistner==", initialCall, filterflag, Reset, SubcategoryState)
    if (initialCall && filterflag === false && Reset === false) {
      if (SubcategoryState.productlist.length === 0) {
        window.scrollTo(0, 0);
      }
      if (SubcategoryState.productlist) {
        window.addEventListener('scroll', handleScroll);
        console.log("336handlelistner==", SubcategoryState)
      }
      return () => {
        window.removeEventListener('scroll', handleScroll);
      }
    }
  }, [handleScroll,])
  // Filter onchange multiselect dropdown
  const filteronChange = (selectedList, selectedItem) => {
    console.log("580eventbrandlist", selectedList, selectedItem,);
    const finalseletItem = [...selectItemDisp, ...selectedList];
    const uniqueNames = finalseletItem.filter((val, id, disparray) => disparray.indexOf(val) == id);
    // console.log("uniqueNames===", uniqueNames);
    setSelectItemDisp(uniqueNames);
    // setSelectItemDisp([prevState => new Set(selectItemDisp).add([...selectItemDisp, ...selectedList])]);
    setpreselectItem(selectedList);
    setReset(true);
    // brandlist
    if (selectedItem.FieldId === 0 && selectedItem.StaticFilter === 0) {
      console.log("580eventbrandlist", selectedItem,);
      if (valueString.length !== '') {
        // console.log("346eventbrandlist", selectedItem,);
        valueString.includes(`${selectedItem.valueId}`)
          ?
          setValueString(removeFromString(valueString, `${selectedItem.valueId}`))
          :
          setValueString(removedoubleComma(`${valueString},${selectedItem.valueId}`))
      } else {
        // console.log("346eventbrandlist", selectedItem,);
        setValueString(`${selectedItem.valueId}`)
      }
    }
    // Weight, Glass Type, Primary Camera, Internal Storage, RAM, Colour
    if (selectedItem.FieldId !== 0 && selectedItem.fitlerName !== "Pack Size") {
      console.log("580eventbrandlist", selectedItem,);
      if (valuepackString.length !== 0) {
        valuepackString.includes(`${selectedItem.name}`) ? setvaluepackString(removeFromString(valuepackString, `${selectedItem.name}`)) : setvaluepackString(removedoubleComma(`${valuepackString},${selectedItem.name}`))
        // console.log('packsizejkk', `${fieldString},${FieldId})`)
        setfieldString(`${fieldString},${selectedItem.FieldId}`)
      } else {
        setvaluepackString(`${selectedItem.name}`)
        setfieldString(`${selectedItem.FieldId}`)
      }
    }
    // Pack size
    if (selectedItem.fitlerName === "Pack Size") {
      console.log("580eventbrandlist", selectedItem,);
      if (valuepackString.length !== 0) {
        // console.log("here111");
        valuepackString.includes(`${selectedItem.valueId}`) ? setvaluepackString(removeFromString(valuepackString, `${selectedItem.valueId}`)) : setvaluepackString(removedoubleComma(`${valuepackString},${selectedItem.valueId}`))
        // console.log('packsizejkk', `${fieldString},${FieldId})`)
        setfieldString(`${fieldString},${selectedItem.FieldId}`)
      } else {
        // console.log("here222");
        setvaluepackString(`${selectedItem.valueId}`)
        setfieldString(`${selectedItem.FieldId}`)
      }
    }
    // Food Preference, Discount, Country of Origin
    if (selectedItem.StaticFilter !== 0) {
      console.log("580eventbrandlist", selectedItem,);
      if (valuediscountstring !== '') {
        valuediscountstring.includes(`${selectedItem.valueId}`) ? setvaluediscountstring(removeFromString(valuediscountstring, `${selectedItem.valueId}`)) :
          (setvaluediscountstring(removedoubleComma(`${valuediscountstring},${selectedItem.valueId}`)))
      } else {
        setvaluediscountstring(`${selectedItem.valueId}`)
      }
    }
  }
  const RemoveSelectItem = (selectedList, selectedItem) => {
    console.log("580eventbrandlist", selectedItem, advancegetskufilterdata)
    setSelectItemDisp((current) =>
      current.filter((selectItem) => selectItem.name !== selectedItem.name)
    );
    setpreselectItem((currentpre) =>
      currentpre.filter((curpreselectItem) => curpreselectItem.name !== selectedItem.name)
    );
    // setpreselectItem(selectedList);
    // if(selectedRemoveItem.FieldId === undefined)
    setReset(true);
    if (selectedItem.FieldId === 0 && selectedItem.StaticFilter === 0) {
      console.log("580eventbrandlist", selectedItem,);
      if (valueString.length !== '') {
        // console.log("346eventbrandlist", selectedItem,);
        valueString.includes(`${selectedItem.valueId}`)
          ?
          setValueString(removeFromString(valueString, `${selectedItem.valueId}`))
          :
          setValueString(removedoubleComma(`${valueString},${selectedItem.valueId}`))
      } else {
        // console.log("346eventbrandlist", selectedItem,);
        setValueString(`${selectedItem.valueId}`)
      }
    }
    if (selectedItem.FieldId !== 0 && selectedItem.fitlerName !== "Pack Size") {
      console.log("580eventbrandlist", selectedItem,);
      if (valuepackString.length !== 0) {
        valuepackString.includes(`${selectedItem.name}`) ? setvaluepackString(removeFromString(valuepackString, `${selectedItem.name}`)) : setvaluepackString(removedoubleComma(`${valuepackString},${selectedItem.name}`))
        // console.log('packsizejkk', `${fieldString},${FieldId})`)
        setfieldString(`${fieldString},${selectedItem.FieldId}`)
      } else {
        setvaluepackString(`${selectedItem.name}`)
        setfieldString(`${selectedItem.FieldId}`)
      }
    }
    // Pack size
    if (selectedItem.fitlerName === "Pack Size") {
      console.log("580eventbrandlist", selectedItem,);
      if (valuepackString.length !== 0) {
        // console.log("here111");
        valuepackString.includes(`${selectedItem.valueId}`) ? setvaluepackString(removeFromString(valuepackString, `${selectedItem.valueId}`)) : setvaluepackString(removedoubleComma(`${valuepackString},${selectedItem.valueId}`))
        // console.log('here111', `${fieldString},${FieldId})`)
        setfieldString(`${fieldString},${selectedItem.FieldId}`)
      } else {
        // console.log("here111");
        setvaluepackString(`${selectedItem.valueId}`)
        setfieldString(`${selectedItem.FieldId}`)
      }
    }
    if (selectedItem.StaticFilter !== 0) {
      console.log("580eventbrandlist", selectedItem,);
      if (valuediscountstring !== '') {
        valuediscountstring.includes(`${selectedItem.valueId}`) ? setvaluediscountstring(removeFromString(valuediscountstring, `${selectedItem.valueId}`)) :
          (setvaluediscountstring(removedoubleComma(`${valuediscountstring},${selectedItem.valueId}`)))
      } else {
        setvaluediscountstring(`${selectedItem.valueId}`)
      }
    }
  }
  function removedoubleComma(string) {
    return string.replace(',,', ',')
  }
  function removeFromString(stringValue = '', valueId) {
    let str = stringValue.replace(valueId, '')
    str = removedoubleComma(str)
    if (str.startsWith(',')) {
      str = str.substring(1, str.length)
      return str
    } else {
      return str
    }
  }
  const changeFltr = (newFL) => {
    setReset(true)
    setcheckfilterflag(true)
    setSeleced(newFL);
  };
  // console.log("filterproductfilterproduct", filterproduct);
  function LoadProductPDP(PageUrl) {
    // history.push(`/product/${PageUrl}`, { state: { PageUrl } })
    // console.log("PageUrl", PageUrl);
    localStorage.setItem('PageUrl', window.btoa(PageUrl))
    // dispatch(getskuProductdetail(window.atob(localStorage.getItem('PageUrl'))))
  }
  const toggleChange = () => {
    setChecked(!checked)
  }
  const ClearAllFilter = () => {
    setSelectItemDisp('')
    setpreselectItem('')
    setselectedPacksize('');
    setselectedBrand('');
    setselectedDiscount('');
    setselectedFood('')
    setselectedFood('');
    setselectedPrimaryCamera('')
    setselectedGlassType('');
    setselectedIntStorage('');
    setselectedWeight('');
    setselectedRAM('');
    setselectedColor('');
    window.scrollTo(0, 0);
    document.getElementsByClassName('multiselectdrop')
    setValueString('')
    setvaluepackString('')
    setvaluediscountstring('')
    setSeleced('POP')
    setmin(SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ? SubcategoryState.productlist[0].MinPrice : null)
    setMax(SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ? SubcategoryState.productlist[0].MaxPrice : null)
  }
  const handleMaxValue = (event) => {
    // setMaxVal(event.target.value)
    // const valuedis = valuediscountstring || ''
    // const fieldS = fieldString || ''
    // const valuepack = valuepackString || ''
    // const sortby = Seleced || ''
    setReset(true)
    if (event.target.value > min) {
      setMax(event.target.value)
    }
  }
  const handleMinValue = (event) => {
    // setMinVal(event.target.value)
    // const valuedis = valuediscountstring || ''
    // const fieldS = fieldString || ''
    // const valuepack = valuepackString || ''
    // const sortby = Seleced || ''
    setReset(true)
    if (event.target.value < max) {
      setmin(event.target.value)
    }
  }
  const viewToggle = () => {
    setisActive(!isActive)
  }
  useEffect(() => {
    window.onload = function () {
      document.getElementById('app').className = 'pdp-category-page';
    };
  })
  // document.getElementById('newpositionfilter').scrollTo({
  //   behavior: 'smooth',
  //   top: '0px'
  // });
  function handlefilter() {
    // window.scrollTo(0, 0);
    document.getElementById('newpositionfilter').scroll({ top: 0, behavior: 'smooth' });
  }
  // console.log("filterproduct Name count", filterproduct, selectedBrand)
  useEffect(() => {
    window.onload = function () {
      document.getElementById('app').className = 'filtericon-category-page';
    };
  }, [])
  const handlefilterResult = () => {
    // const buttonid = document.getElementById('btn');
    // buttonid.addEventListener('click', () => {
    //   const box = document.getElementById('hidefilterResult');
    //   // 👇️ removes element from DOM
    //   box.style.display = 'none';
    // })
    document.getElementById('hidefilterResult').className = 'closefilter';
  }
  return (
    < >
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <Header />
      {/* <BreadCrumb activepage={URL} product="Category" /> 
      <SubNavigation URL={URL} /> */}
      <div className={groupedData && groupedData != "" ? 'main-wrapper mt-0' : ""}>
        <div className="container-fluid subcatWrapper">
          <div className="row">
            <div className="col-lg-12">
              {/* {groupedData === [] ?S */}
              {/* // <div style={{ Width: '100%' }} >Products Not Found</div> : */}
              <div className="product-shop-main-wrapper newfilterAlign" id="product-listing">
                {/* <div className="shop-baner-img mb-70">
                 </div> */}
                <div id="paginginfo">
                </div>
                {/* {groupedData === undefined ?
                  <div id="products" className="shop-product-wrap row " >
                    {shimmerdata.map(itm => (
                      <div className='col-lg-3' >
                        <ShimmerPostItem card title cta />
                      </div>
                    ))} </div>
                  : */}
                <div className="row plp-breadcrumb">
                  <div className="col-lg-9 col-md-6 col-sm-9">
                    {groupedData && groupedData != "" ?
                      <SubNavigation URL={URL} Productcount={breadcrumbProdcount} FliterFlag={filterflag} ResetFlag={Reset} />
                      : ""}
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-3">
                    {groupedData && groupedData != "" ?
                      <div className="top-bar-right">
                        <div className="product-view-mode">
                          {/* <a className={isActive ? 'active' : ''} href='#' data-target="grid" onClick={viewToggle}>
                          <i className={isActive ? 'fa fa-th' : 'fa fa-list'}></i>
                        </a> */}
                          <button className={isActive ? 'active' : ''} to='#' data-target="grid" onClick={viewToggle} type="button">
                            <i className='fa fa-th'></i>
                          </button>
                          <button className={isActive ? '' : 'active'} to='#' data-target="list" onClick={viewToggle} type="button" style={{ marginRight: '0px' }}>
                            <i className="fa fa-list"></i>
                          </button>
                        </div>
                      </div>
                      : ""
                    }
                  </div>
                </div>
                {
                  groupedData && groupedData != "" && advfilterData && advfilterData !== undefined ?
                    <div className='top-filter top-filter-category newfilterposition' id='newpositionfilter' onClick={handlefilter} style={{ zIndex: filterdynamicpopup.isPaneOpen ? "0" : "888" }}>
                      {groupedData && groupedData != "" ?
                        <div className='filterSorting'>
                          <select
                            className="nice-select"
                            name="sortby"
                            // onChange=""
                            id="sortby_limit"
                            // style={{ display: "none" }}
                            onChange={event => changeFltr(event.target.value)} >
                            <option selected>Sort By</option>
                            {sortByfiltersList.map(itm => (
                              <option value={itm.value}>{itm.ListItem}</option>
                            ))}
                          </select>
                          <img src={sortimg} alt=''></img>
                        </div>
                        : null}
                      {/* : <div className='custom-space-while-no-content'></div>} */}
                      {advfilterData.map((advfilterbox, index) => (
                        index <= 3 && advfilterbox[0] !== "Price" ?
                          <div>
                            <div className="filter-box">
                              <Multiselect
                                showArrow
                                options={(advfilterbox !== undefined && advfilterbox.length > 0 && advfilterbox[1] || []).map((data, indexd) => ({ name: data.ListItemValue, id: indexd + 1, valueId: data.valueId, FieldId: data.FieldId, StaticFilter: data.StaticFilter, fitlerName: advfilterbox[0] }))}
                                // Options to display in the dropdown
                                selectedValues={preselectItem} // Preselected value to persist in dropdown
                                onSelect={filteronChange} // Function will trigger on select event
                                onRemove={RemoveSelectItem} // Function will trigger on remove event
                                displayValue="name" // Property name to display in the dropdown options
                                placeholder={advfilterbox[0]}
                                showCheckbox
                              />
                            </div>
                          </div>
                          :
                          null
                      ))
                      }
                      {
                        SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ?
                          <div>
                            <div className="single-sidebar mb-45 price-filter">
                              <h5>Filter By Price</h5>
                              <div className="panel panel-default single-sidebar">
                                <div className='position-relative rangeslider' >
                                  <input
                                    type="range"
                                    min={SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ? SubcategoryState.productlist[0].MinPrice : null}
                                    max={SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ? SubcategoryState.productlist[0].MaxPrice : null}
                                    value={min}
                                    // ref={minRef}
                                    onChange={(event) => {
                                      handleMinValue(event)
                                      // const value = Math.min(+event.target.value, maxVal - 1);
                                      // setMinVal(event.target.value);
                                      // event.target.value = value.toString();
                                    }}
                                    className={classnames("thumb thumb--zindex-3", {
                                      "thumb--zindex-5": ''
                                    })}
                                  />
                                  <input
                                    type="range"
                                    // max={max}
                                    // min={min}
                                    min={SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ? SubcategoryState.productlist[0].MinPrice : null}
                                    max={SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ? SubcategoryState.productlist[0].MaxPrice : null}
                                    value={max}
                                    // ref={maxRef}
                                    onChange={
                                      (event) => {
                                        handleMaxValue(event)
                                        // const value = Math.max(+event.target.value, minVal + 1);
                                        // setMaxVal(event.target.value);
                                        // event.target.value = min.toString();
                                      }}
                                    className="thumb thumb--zindex-4"
                                  />
                                  <div className="slider">
                                    <div className="slider__track" />
                                    <div ref={range} className="slider__range" />
                                    <div className="slider__left-value">₹ {min}</div>
                                    <div className="slider__right-value">₹ {max}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          :
                          null
                      }
                      {
                        groupedData && groupedData != "" && advfilterData ?
                          <div className="morefilter d-flex"><br />
                            <span className='morefilterTitle btn btn-success' onClick={() => setfilterdynamicpopup({ isPaneOpen: true })}>
                              More Filters
                            </span>
                            <span className='clearAll1 btn btn-info' style={{ display: Reset === true ? "inline-block" : "none" }} onClick={ClearAllFilter}>Clear All</span>
                            <SlidingPane
                              className="some-custom-class"
                              overlayClassName="some-custom-overlay-class"
                              isOpen={filterdynamicpopup.isPaneOpen}
                              title="More Filters"
                              // subtitle="Optional subtitle."
                              closeIcon="X"
                              onRequestClose={() => {
                                // triggered on "<" on left top click or on outside click
                                setfilterdynamicpopup({ isPaneOpen: false });
                              }}
                            >
                              <div className='row morefilter'>
                                {advfilterData.map((advfilterbox, index) => (
                                  advfilterbox[0] !== "Price" ?
                                    <div className='col-lg-12'>
                                      <div className="more-filter-box">
                                        <Multiselect
                                          options={(advfilterbox !== undefined && advfilterbox.length > 0 && advfilterbox[1] || []).map((data, indexm) => ({ name: data.ListItemValue, id: indexm + 1, valueId: data.valueId, FieldId: data.FieldId, StaticFilter: data.StaticFilter, fitlerName: advfilterbox[0] }))}
                                          // Options to display in the dropdown
                                          selectedValues={preselectItem} // Preselected value to persist in dropdown
                                          onSelect={filteronChange} // Function will trigger on select event
                                          onRemove={RemoveSelectItem} // Function will trigger on remove event
                                          displayValue="name" // Property name to display in the dropdown options
                                          placeholder={advfilterbox[0]}
                                          showCheckbox
                                        />
                                      </div>
                                    </div>
                                    :
                                    null
                                ))}
                                <div className="col-lg-12">
                                  <span className='clearAll2 btn btn-info' onClick={ClearAllFilter} style={{ display: Reset === true ? "inline-block" : "none" }} >Clear All</span>
                                </div>
                              </div>
                            </SlidingPane>
                          </div>
                          :
                          null
                      }
                    </div>
                    : null
                }
                <div className='row'>
                  <div className='col-lg-12 selecteedItemdisp' >
                    {
                      (selectItemDisp || []).map((selectfilterItem) => (
                        <span className='selectItemName'>
                          <span>{selectfilterItem.name}</span>
                          <span className='crossIcon'><span className="fa fa-times" aria-hidden="true" onClick={(e) => { RemoveSelectItem(e, selectfilterItem) }}></span></span>
                        </span>
                      ))
                    }
                  </div>
                </div>
                {loading && Reset === false && filterflag === false ?
                  <div className='row'>
                    <div className='col-lg-12 text-center mt-25 mb-25' style={{ top: '40px' }}>
                      <img src={logoanimation} alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
                      {/* <i
                        style={{ justifySelf: 'center' }}
                        className="fa fa-spin fa-spinner fa-4x"></i> */}
                    </div>
                  </div> :
                  <div>
                    {filterflag === true ?
                      <div id="products" className="shop-product-wrap row" >
                        {filterproduct && filterproduct.length === 0 ?
                          <>
                            <div className="col-md-12" style={{ padding: '5%' }}>{ }
                              <div className="alert alert-warning text-center">Products Not Found</div>
                            </div>
                            <div className='col-lg-6'>
                              {/* <DealdayProductOriginal /> */}
                            </div>
                          </>
                          :
                          <>
                            {/* {productcount}{productcategoryName} */}
                            {/* { <h3 className='catname product-list-header' style={{ fontSize: '24px' }}>{localStorage.getItem('Title')} ({localStorage.getItem('Titlecount')})</h3>} */}
                            {productcount > 0 && <h3 className='catname product-list-header' style={{ fontSize: '24px' }}> {productcategoryName}({productcount})</h3>}
                            {(filterproduct !== []) && filterproduct.map(data =>
                              <>
                                <div className='col-lg-3' >
                                  <LoadProducts data={data} skulisting shppingcart={shppingcart} notify={notify} />
                                </div>
                              </>
                            )}
                          </>
                        }
                      </div>
                      :
                      <>
                        {console.log("loadingprodgroupdata", groupedData, Reset, filterflag)}
                        <div id="products" className="shop-product-wrap row " >
                          {groupedData == "" && Reset === false ?
                            <div className='col-lg-12 text-center mt-25 mb-25' style={{ top: '40px' }}>
                              {console.log("loadingprod")}
                              <img src={logoanimation} alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
                              {/* <i
                                style={{ justifySelf: 'center' }}
                                className="fa fa-spin fa-spinner fa-4x"></i> */}
                            </div>
                            : groupedData && groupedData.length === 0 && Reset === true ?
                              <>
                                <div className="col-md-12" style={{ padding: '5%' }}>
                                  {console.log("loadingprod")}
                                  <div className="alert alert-warning text-center">Products Not Found</div>
                                </div>
                                <div className='col-lg-6' >
                                  {/* <DealdayProductOriginal /> */}
                                </div>
                              </>
                              :
                              <>
                                {/* <h3 className='catname product-list-header' style={{ fontSize: '24px' }}>{productcategoryName}({productcount})
                                    </h3> */}
                                {/* {groupedData.length > 1 && <h3 className='catname product-list-header' style={{ fontSize: '24px' }}>({groupedData.length})</h3>} */}
                                {console.log("htmlgroupData=", groupedData)}
                                {groupedData !== undefined && (groupedData.map((data, i) =>
                                  <>
                                    {/* {data[1] !== undefined ? <h3 className='catname product-list-header' style={{ fontSize: '24px' }}>{data[0]} ({data[1][0].OverAllCount})
                                    </h3>
                                      : null
                                    } */}
                                    {
                                      isActive === true ?
                                        data[1] !== undefined ? data[1].map(itm => (
                                          // itm.CategoryUrl === URL[2] ?
                                          <div className='col-lg-3'>
                                            <LoadProducts data={itm} shppingcart={shppingcart} index={i} skulisting notify={notify} isActive={isActive} />
                                          </div>
                                          // :
                                          // null
                                        ))
                                          :
                                          // itm.CategoryUrl === URL[2] ?
                                          <div className='col-lg-3'>
                                            <LoadProducts data={data} shppingcart={shppingcart} index={i} skulisting notify={notify} isActive={isActive} />
                                          </div>
                                        // :
                                        // null
                                        :
                                        data[1] !== undefined ? data[1].map(itm => (
                                          // itm.CategoryUrl === URL[2] ?
                                          <div className='col-lg-12'>
                                            <LoadProducts data={itm} shppingcart={shppingcart} index={i} skulisting notify={notify} isActive={isActive} />
                                          </div>
                                          // :
                                          // null
                                        )) :
                                          // itm.CategoryUrl === URL[2] ?
                                          <div className='col-lg-12'>
                                            <LoadProducts data={data} shppingcart={shppingcart} index={i} skulisting notify={notify} isActive={isActive} />
                                          </div>
                                      // : null
                                    }
                                  </>
                                ))}
                                {SubcategoryState && SubcategoryState.loading === true && Reset === false && filterflag === false ?
                                  <div className='col-lg-12 text-center mt-25 mb-25' >
                                    <img src={logoanimation} alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
                                    {/* <i
                                      style={{ justifySelf: 'center' }}
                                      className="fa fa-spin fa-spinner fa-4x"> </i> */}
                                  </div>
                                  : null}
                              </>
                          }
                        </div>
                      </>
                    }
                  </div>
                }
                <div>
                </div>
              </div>
              {/* // } */}
            </div>
            {/* <div className=""> */}
            <div className={mavigationBarReducer !== undefined && mavigationBarReducer.filterinfo === true ? 'shop-sidebar-inner mb-30 active' : 'shop-sidebar-inner mb-30 closeactive'} id='hidefilterResult'>
              {
                groupedData && groupedData != "" && advfilterData && advfilterData !== undefined ?
                  <div className='row ' style={{ zIndex: filterdynamicpopup.isPaneOpen ? "0" : "888" }}>
                    {advfilterData.map((advfilterbox, index) => (
                      advfilterbox[0] !== "Price" ?
                        <div className='col-lg-2'>
                          <div className="filter-box">
                            <Multiselect
                              options={(advfilterbox !== undefined && advfilterbox.length > 0 && advfilterbox[1] || []).map((data, indexd) => ({ name: data.ListItemValue, id: indexd + 1, valueId: data.valueId, FieldId: data.FieldId, StaticFilter: data.StaticFilter, fitlerName: advfilterbox[0] }))}
                              // Options to display in the dropdown
                              selectedValues={preselectItem} // Preselected value to persist in dropdown
                              onSelect={filteronChange} // Function will trigger on select event
                              onRemove={RemoveSelectItem} // Function will trigger on remove event
                              displayValue="name" // Property name to display in the dropdown options
                              placeholder={advfilterbox[0]}
                              showCheckbox
                            />
                          </div>
                        </div>
                        :
                        null
                    ))
                    }
                    {
                      SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ?
                        <div className='col-lg-2'>
                          <div className="single-sidebar mb-45 price-filter">
                            <h5>Filter By Price</h5>
                            <div className="panel panel-default single-sidebar">
                              <div className='position-relative rangeslider' >
                                <input
                                  type="range"
                                  min={SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ? SubcategoryState.productlist[0].MinPrice : null}
                                  max={SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ? SubcategoryState.productlist[0].MaxPrice : null}
                                  value={min}
                                  // ref={minRef}
                                  onChange={(event) => {
                                    handleMinValue(event)
                                    // const value = Math.min(+event.target.value, maxVal - 1);
                                    // setMinVal(event.target.value);
                                    // event.target.value = value.toString();
                                  }}
                                  className={classnames("thumb thumb--zindex-3", {
                                    "thumb--zindex-5": ''
                                  })}
                                />
                                <input
                                  type="range"
                                  // max={max}
                                  // min={min}
                                  min={SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ? SubcategoryState.productlist[0].MinPrice : null}
                                  max={SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ? SubcategoryState.productlist[0].MaxPrice : null}
                                  value={max}
                                  // ref={maxRef}
                                  onChange={
                                    (event) => {
                                      handleMaxValue(event)
                                      // const value = Math.max(+event.target.value, minVal + 1);
                                      // setMaxVal(event.target.value);
                                      // event.target.value = min.toString();
                                    }}
                                  className="thumb thumb--zindex-4"
                                />
                                <div className="slider">
                                  <div className="slider__track" />
                                  <div ref={range} className="slider__range" />
                                  <div className="slider__left-value">₹ {min}</div>
                                  <div className="slider__right-value">₹ {max}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        :
                        null
                    }
                    <button className="btn btn-secondary" type="button" onClick={handlefilterResult} id='btn' >Hide filter</button>
                    {/* {
                      advfilterData ?
                        <div className="col-lg-2 morefilter">
                          <span className='morefilterTitle btn btn-success' onClick={() => setfilterdynamicpopup({ isPaneOpen: true })}>
                            More Filters
                          </span>
                          <span className='clearAll1 btn btn-info' style={{ display: Reset === true ? "inline-block" : "none" }} onClick={ClearAllFilter}>Clear All</span>
                          <SlidingPane
                            className="some-custom-class"
                            overlayClassName="some-custom-overlay-class"
                            isOpen={filterdynamicpopup.isPaneOpen}
                            title="More Filters"
                            // subtitle="Optional subtitle."
                            closeIcon="X"
                            onRequestClose={() => {
                              // triggered on "<" on left top click or on outside click
                              setfilterdynamicpopup({ isPaneOpen: false });
                            }}
                          >
                            <div className='row morefilter'>
                              {advfilterData.map((advfilterbox, index) => (
                                advfilterbox[0] !== "Price" ?
                                  <div className='col-lg-12'>
                                    <div className="more-filter-box">
                                      <Multiselect
                                        options={(advfilterbox !== undefined && advfilterbox.length > 0 && advfilterbox[1] || []).map((data, indexm) => ({ name: data.ListItemValue, id: indexm + 1, valueId: data.valueId, FieldId: data.FieldId, StaticFilter: data.StaticFilter, fitlerName: advfilterbox[0] }))}
                                        // Options to display in the dropdown
                                        selectedValues={preselectItem} // Preselected value to persist in dropdown
                                        onSelect={filteronChange} // Function will trigger on select event
                                        onRemove={RemoveSelectItem} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                        placeholder={advfilterbox[0]}
                                        showCheckbox
                                      />
                                    </div>
                                  </div>
                                  :
                                  null
                              ))}
                              <div className="col-lg-12">
                                <span className='clearAll2 btn btn-info' onClick={ClearAllFilter} style={{ display: Reset === true ? "inline-block" : "none" }} >Clear All</span>
                              </div>
                            </div>
                          </SlidingPane>
                        </div>
                        :
                        null
                    } */}
                  </div>
                  : null
              }
              {/* {groupedData && groupedData != "" ?
                <div className='row' style={{ zIndex: filterdynamicpopup.isPaneOpen ? "0" : "888" }}>
                  {advfilterData.map((advfilterbox, index) => (
                    advfilterbox[0] !== "Price" ?
                      <div className='col-lg-12'>
                        {console.log("advfilterData.index==", advfilterbox, index)}
                        <div className="filter-box">
                          <Multiselect
                            options={(advfilterbox !== undefined && advfilterbox.length > 0 && advfilterbox[1] || []).map((data, indexr) => ({ name: data.ListItemValue, id: indexr + 1, valueId: data.valueId, FieldId: data.FieldId, StaticFilter: data.StaticFilter, fitlerName: advfilterbox[0] }))}
                            // Options to display in the dropdown
                            selectedValues={preselectItem} // Preselected value to persist in dropdown
                            onSelect={filteronChange} // Function will trigger on select event
                            onRemove={RemoveSelectItem} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            placeholder={advfilterbox[0]}
                            showCheckbox
                          />
                        </div>
                      </div>
                      :
                      null
                  ))
                  }
                </div>
                : ""} */}
            </div>
            {/* filter-price-content start */}
            {/* <div className="single-sidebar mb-45">
                  <div className="sidebar-inner-title mb-25">
                    <h3 id="filterByPrice" data-parent="#accordion" href="#collapseZero1" aria-expanded="true" >
                      <i className="more-less glyphicon glyphicon-plus"></i>
                      Filter by price
                    </h3>
                  </div> */}
            {/* <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true"> */}
            {/* categories filter start */}
            {/* <div className="panel panel-default single-sidebar"> */}
            {/* <div className="panel-heading sidebar-inner-title mb-25" role="tab" id="headingOne">
                        <h4 className="panel-title"></h4>
                      </div> */}
            {/* <div className='position-relative rangeslider' >
                      <input
                        type="range" */}
            {/* // min={min}
                        // max={max} */}
            {/* min={SubcategoryState && SubcategoryState.subCategoryProductList.minprice}
                        max={SubcategoryState && SubcategoryState.subCategoryProductList.maxprice}
                        value={min}
                        // ref={minRef}
                        onChange={(event) => {
                          handleMinValue(event) */}
            {/* // const value = Math.min(+event.target.value, maxVal - 1);
                          // setMinVal(event.target.value);
                          // event.target.value = value.toString();
                        }}
                        className={classnames("thumb thumb--zindex-3", {
                          "thumb--zindex-5": ''
                        })}
                      />
                      <input
                        type="range" */}
            {/* // max={max}
                        // min={min}
                        min={SubcategoryState && SubcategoryState.subCategoryProductList.minprice}
                        max={SubcategoryState && SubcategoryState.subCategoryProductList.maxprice}
                        value={max}
                        // ref={maxRef}
                        onChange={
                          (event) => {
                            handleMaxValue(event)
                            // const value = Math.max(+event.target.value, minVal + 1);
                            // setMaxVal(event.target.value);
                            // event.target.value = min.toString();
                          }}
                        className="thumb thumb--zindex-4"
                      />
                      <div className="slider">
                        <div className="slider__track" />
                        <div ref={range} className="slider__range" />
                        <div className="slider__left-value">₹ {min}</div>
                        <div className="slider__right-value">₹ {max}</div>
                      </div>
                    </div>
                  </div> */}
            {/* </div> */}
            {/* </div>
                <br /><br />
                <div className="single-sidebar mb-45">
                  <div className="sidebar-inner-title mb-25">
                    {displaysubcategory.length > 0 && <h3 data-parent="#accordion" href="#collapseZero" aria-expanded="true">
                      <i className="more-less glyphicon glyphicon-plus"></i>
                      Categories
                    </h3>}
                  </div>
                  <div className="panel panel-default single-sidebar">
                    <div className="panel-heading sidebar-inner-title mb-25" role="tab" id="headingOne">
                      <h4 className="panel-title"></h4>
                    </div>
                    <div id="collapseZero" className="panel-collapse collapse show" role="tabpanel" >
                      <div className="panel-body">
                        <div className="filter-content">
                          <div className="sidebar-content-box">
                            <div className="sub-categories">
                              {displaysubcategory &&
                                <ul>
                                  {displaysubcategory !== undefined && displaysubcategory.map(subItm => ( */}
            {/* // to={subItm.PageURL} */}
            {/* //  <li> <Link style={{ color: 'black' }} to='/' title="test">{subItm.DisplayName}</Link></li>
                                    <> <li>  <Link to='/' style={{ color: 'black' }} onClick={() => LoadProductPDP(subItm.PageURL)}>{subItm.DisplayName}</Link></li></>
                                  ))}
                                </ul> 
                              } */}
            {/* <ul>
                                 {props !== undefined && props.location !== undefined && props.location.state !== undefined && props.location.state.Submenu !== undefined && props.location.state.Submenu.map(subItm => (
                                   <li> <Link style={{ color: 'black' }} to="/category/vegetables-fruits/testcatejan" title="test">{subItm.DisplayName}</Link></li>
                                 ))}
                               </ul> */}
            {/* </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
            {/* <div className="single-sidebar mb-45">
                  <div className="sidebar-inner-title mb-25">
                    {BrandList.length > 0 && <h3 href="#Filter_1" aria-expanded="false" className="collapsed">
                      <i className="more-less glyphicon glyphicon-plus"></i>
                      Brand List
                    </h3>}
                  </div>
                  <div className="panel panel-default single-sidebar">
                    <div className="panel-heading sidebar-inner-title mb-25" role="tab" id="heading_2">
                      <h4 className="panel-title"></h4>
                    </div>
                    <div id="Filter_2" className="panel-collapse collapse show" role="tabpanel" >
                      <div className="panel-body">
                        <div className="filter-content">
                          <div className="sidebar-content-box">
                            <div className="sub-categories">
                              {(BrandList || []).map((data,) => (
                                <ul id="Pack_size">
                                  <li>
                                    <div className='custom-checkbox' style={{ marginBottom: '2px' }}>
                                      <input style={{ height: '20px' }} id="chk1" type="checkbox" className='messageCheckbox'
                                        onClick={(e) => filterbrandlist(data.valueId, e)} value={data.valueId} />
                                      <label className="capitlize-packsize-none" htmlFor=""> {data.ListItemValue} </label>
                                    </div>
                                  </li>
                                </ul>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-inner-title mb-25">
                    <h3 data-parent="#accordion" href="#Filter_1" aria-expanded="false" className="collapsed">
                      <i className="more-less glyphicon glyphicon-plus"></i>
                      Pack Size
                    </h3>
                  </div>
                  <div className="panel panel-default single-sidebar">
                    <div className="panel-heading sidebar-inner-title mb-25" role="tab" id="heading_1">
                      <h4 className="panel-title"></h4>
                    </div>
                    <div id="Filter_1" className="panel-collapse collapse show" role="tabpanel" >
                      <div className="panel-body">
                        <div className="filter-content">
                          <div className="sidebar-content-box">
                            <div className="sub-categories">
                              {/* <input onChange={(e) => handlechange(e)} type="text" id="searchPackSize" placeholder="Search for pack sizes.." title="Type in a pack size" onClick={handlechange} /> */}
            {/* {(PackSize || []).map((data) => (
                                <ul id="Pack_size">
                                  <li>
                                    <div className='custom-checkbox' style={{ marginBottom: '3px' }}>
                                      <input style={{ height: '20px' }} id="chk1" type="checkbox"
                                        // onChange={()=>toggleChange()}
                                        onClick={() => filterPacksizelist(data.valueId, data.FieldId)} className='messageCheckbox' value={data.valueId} />
                                      <label className="capitlize-packsize-none" htmlFor="">{data.ListItemValue}</label>
                                    </div>
                                  </li>
                                </ul>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="sidebar-inner-title mb-25">
                    <h3 data-parent="#accordion" href="#Filter_2" aria-expanded="false" className="collapsed">
                      <i className="more-less glyphicon glyphicon-plus"></i>
                      Food Preference
                    </h3>
                  </div>
                  <div className="panel panel-default single-sidebar">
                    <div className="panel-heading sidebar-inner-title mb-25" role="tab" id="heading_2">
                      <h4 className="panel-title"></h4>
                    </div>
                    <div id="Filter_2" className="panel-collapse collapse show" role="tabpanel" >
                      <div className="panel-body">
                        <div className="filter-content">
                          <div className="sidebar-content-box">
                            <div className="sub-categories">
                              {(FoodPreference || []).map((data) => (
                                <ul id="Pack_size">
                                  <li>
                                    <div className='custom-checkbox' style={{ marginBottom: '2px' }}>
                                      <input style={{ height: '20px' }} id="chk1" type="checkbox"
                                        onClick={(e) => filterFoodPreferencelist(data.valueId, e, data.StaticFilter)} className='messageCheckbox' value={data.valueId} />
                                      <label className="capitlize-packsize-none" htmlFor=""> {data.ListItemValue} </label>
                                    </div>
                                  </li>
                                </ul>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="sidebar-inner-title mb-25">
                    <h3 data-parent="#accordion" href="#Filter_3" aria-expanded="false" className="collapsed">
                      <i className="more-less glyphicon glyphicon-plus"></i>
                      Discount
                    </h3>
                  </div>
                  <div className="panel panel-default single-sidebar">
                    <div className="panel-heading sidebar-inner-title mb-25" role="tab" id="heading_3">
                      <h4 className="panel-title"></h4>
                    </div>
                    <div id="Filter_3" className="panel-collapse collapse show" role="tabpanel" >
                      <div className="panel-body">
                        <div className="filter-content">
                          <div className="sidebar-content-box">
                            <div className="sub-categories">
                              {(Discount || []).map((data) => (
                                <ul id="Pack_size">
                                  <li>
                                    <div className='custom-checkbox' style={{ marginBottom: '2px' }}>
                                      <input style={{ height: '20px' }} id="chk1" type="checkbox" name="filter" data-static-attr="-9"
                                        onClick={(e) => filterFoodPreferencelist(data.valueId, e, data.StaticFilter)} className='messageCheckbox'
                                        value={data.valueId}
                                      />
                                      <label className="capitlize-packsize-none" htmlFor=""> {data.ListItemValue} </label>
                                    </div>
                                  </li>
                                </ul>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="sidebar-inner-title mb-25">
                    <h3 data-parent="#accordion" href="#Filter_4" aria-expanded="false" className="collapsed">
                      <i className="more-less glyphicon glyphicon-plus"></i>
                      Country Of Origin
                    </h3>
                  </div>
                  <div className="panel panel-default single-sidebar">
                    <div className="panel-heading sidebar-inner-title mb-25" role="tab" id="heading_4">
                      <h4 className="panel-title"></h4>
                    </div>
                    <div id="Filter_4" className="panel-collapse collapse show" role="tabpanel" >
                      <div className="panel-body">
                        <div className="filter-content">
                          <div className="sidebar-content-box">
                            <div className="sub-categories">
                              {(CountryOfOrigin || []).map((data) => (
                                <ul id="Pack_size">
                                  <li>
                                    <div className='custom-checkbox' style={{ marginBottom: '2px' }}>
                                      <input style={{ height: '20px' }} id="chk1" type="checkbox" name="filter" data-static-attr="-9"
                                        onClick={(e) => filterFoodPreferencelist(data.valueId, e, data.StaticFilter)} className='messageCheckbox' value={data.valueId} />
                                      <label className="capitlize-packsize-none" htmlFor=""> {data.ListItemValue} </label>
                                    </div>
                                  </li>
                                </ul>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <button type='button' onClick={() => handleReset()} style={{ cursor: 'pointer' }} className="btn btn-sm btn-secondary pull-right" id="btnReset" title="Reset all filters">
                    Reset
                  </button> */}
            {/* <span onClick={()=>handleReset()} style={{ cursor: 'pointer' }} className="btn btn-sm btn-secondary pull-right" id="btnReset" title="Reset all filters">
                      Reset
                  </span> */}
            {/* </div>
              </div>
              <section>
                <img src="https://cdn.adibuja.com/Images//MicrosoftTeams-image (63).png" alt="Sixth Banner" className="img-responsive" style={{ width: '100%', marginBottom: '30px', cursor: 'pointer' }} />
                <img src="https://cdn.adibuja.com/Images//Site Banner (340px X 450px).jpg" alt="Seventh Banner" className="img-responsive" style={{ width: '100%', marginBottom: '30px', cursor: 'pointer' }} />
              </section>
            </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* <ToppSellingOriginal deal={nextData && nextData.dealData} /> */}
      {/* <RelatedProduct /> */}
      {/* <ToppSellingOriginal /> */}
      {/* <RecentlyViewProduct /> */}
      {groupedData !== undefined && groupedData.length > 0 ? <>
        <hr></hr>
        <RelatedCategory /></> : null}
      {
        groupedData !== undefined && groupedData.length > 0 ?
          <>{(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined || localStorage.getItem('CustGUID') === '00000000-0000-0000-0000-000000000000')
            ?
            <SignIn />
            :
            null}</>
          : ""
      }
      <Footer footerData={footerData && footerData} />
    </ >
  )
}
export default Subcategory;
