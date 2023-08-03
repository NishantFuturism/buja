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
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import '../../../../public/assets1/css/bundle.css';
import '../../../../public/assets1/css/default.min.css';

import '../../../../public/assets1/css/responsive.min.css';
import '../../../../public/assets1/css/style.min.css';

import { useRouter } from 'next/router';
import Header from '../../../components/Header';
import SubNavigation from '../../../components/SubNavigation';
import { LoadProducts } from '../../../containers/LoadProducts';
import Constants from '../../../containers/App/constants';
import ProductlistingAPI from '../../../containers/MainPage/api/productlisting';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { defaultAction, getbrandListfilter, getproductlist, RemovingOldData } from '../../../containers/Subcategory/actions';
import reducer from '../../../containers/Subcategory/reducer';
import saga from '../../../containers/Subcategory/saga';
import BreadCrumb from '../../../containers/MyAccount/productpageBreadCrumb';

import "../../../containers/Subcategory/slider.css";
import BouncingDotsLoader from '../../../components/BouncingDotsLoader';
import Footer from '../../../components/Footer';

import classnames from "classnames";
import ToppSellingOriginal from '../../../containers/ToppSellingOriginal';

import RelatedProduct from '../../../containers/RelatedProduct';
import { RecentlyViewProduct } from '../../../containers/RecentlyViewProduct';
import { copyShopingCartDetails } from '../../../containers/HomeScreen/actions';
import CustomsAPI from '../../../containers/MainPage/api/homeServices';

import Multiselect from 'multiselect-react-dropdown';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { array, object } from 'prop-types';
import { NumberFormat } from 'intl';

import { RelatedCategory } from '../../../containers/RelatedCategory';
import SignIn from '../../../components/Footer/signin';
import logoanimation from '../../../../public/images/adibuja-logo-animation.gif';
import sortimg from '../../../../public/images/dropdownsort.png';
export function Subcategory(props) {
    
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
 
  const [groupedData, setgroupedData] = useState([]);
  const [shppingcart, setShppingcart] = useState([]);
  const [unsetfilter, setunsetfilter] = useState([]);
 
  const router = useRouter();
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

  const dispatch = useDispatch()
  const SubcategoryState = useSelector(state => state.subcategory)
  const homestate = useSelector(state => state.homeScreen)
  const addToCart = useSelector(state => state.addToCart)
  const mavigationBarReducer = useSelector(state => state.mavigationBar)
  console.log("mavigationBarReducer...", mavigationBarReducer)
  const sortByfiltersList = [{ ListItem: ' Name (A - Z)', id: 1, value: 'AZ' }, { ListItem: ' Name (Z - A)', id: 2, value: 'ZA' }, { ListItem: 'Price (Low - High)', id: 3, value: 'PLH' }, { ListItem: 'Price (High - Low)', id: 4, value: 'PHL' }, { ListItem: 'Popularity', id: 5, value: 'POP' }]

  

  console.log("SubcategoryStatepage=", SubcategoryState);

  console.log("groupedData=", groupedData);

  let fixIntCount;
  let Finalnopages;
  let TotalproductCount;
  const productNoofData = groupedData[0];

  if (SubcategoryState !== undefined) {
    TotalproductCount = SubcategoryState.subCategoryProductList.OverAllCount;
    Finalnopages = TotalproductCount / 20;
    fixIntCount = Finalnopages;
  }

  const handleScroll = () => {
    
    console.log("onscroll pageno=", page);
    
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
   
  }
  useEffect(() => {console.log('HelloHere1')
    setisActive(true)
    if (localStorage.getItem('generatedtoken')) {
      
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
           
          },
      
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

  }, [props,])
  useEffect(() => {
    if (!initialCall && SubcategoryState !== undefined) {
      setloading(true)
      setgroupedData(SubcategoryState.advanceSkusListingByFilterModels)
      setproductcount(SubcategoryState.advanceSkusListingByFilterModels.length)
   
    }
    if (FirstCall > 0 && SubcategoryState !== undefined && initialCall) {
      setFilterflag(false)
    
      const uniqueNamesgroup = SubcategoryState.productlist.filter((ele, ind) => ind === SubcategoryState.productlist.findIndex(elem => elem.SkuId === ele.SkuId && elem.CategoryUrl === URL[2]))
 
      setgroupedData(Object.entries(groupBy(uniqueNamesgroup, v => v.CategoryName)))
  
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
 
  }, [SubcategoryState])
  
  useEffect(() => {
    console.log('thisisimportant');
    console.log('thisisimportant1',page);
    console.log('thisisimportant2',URL[2]);
    console.log('thisisimportant3',parentcatURL[1]);

    if (URL !== undefined && URL[2] !== undefined && initialCall && checkfilterflag === false && filterflag === false && Reset === false) {
      
      console.log("get productlist=");
      
      dispatch(getproductlist(page, URL[2], parentcatURL[1], null, null))
      
      ProductlistingAPI.getadvancegetskufilter(URL[2], min, max)
        .then(response => {
          
          setadvancegetskufilterdata(response)
          setunsetfilter(response)
        })
      
    }
    if (FirstCall > 0 && URL !== undefined && !initialCall && Reset === true) {
      console.log("valuediscountstring===", FirstCall, URL, initialCall);
      
      const sortby = Seleced || ''
      dispatch(getbrandListfilter(valueString, valuepackString, fieldString, valuediscountstring, URL[2], min, max, sortby))
      setloading(false)
    }
  }, [URL, initialCall, Seleced, parentcatURL])
  useEffect(() => {
    
    if (SubcategoryState !== undefined) {
      
      if (valuediscountstring === '' && valueString === '' && valuepackString === '' && Seleced === 'POP' && (SubcategoryState.productlist === undefined || SubcategoryState.productlist.length === 0 || SubcategoryState.productlist[0].MinPrice == min) && (SubcategoryState.productlist === undefined || SubcategoryState.productlist.length === 0 || SubcategoryState.productlist[0].MaxPrice == max)
      ) {
        
        setInitialCall(true)
        setReset(false)
      } else {
        
        setInitialCall(false)
        
      }
    }
    
    if (FirstCall > 0 && URL !== undefined && !initialCall && Reset === true) {
      console.log("valuediscountstring===", FirstCall, URL, initialCall);
      const sortby = Seleced || ''
      
      dispatch(getbrandListfilter(valueString, valuepackString, fieldString, valuediscountstring, URL[2], min, max, sortby))
      setloading(false)
    }
  }, [valueString, valuediscountstring, valuepackString, fieldString, URL, min, max, Seleced,])
  useEffect(() => {
    console.log("336handlelistner==", initialCall, filterflag, Reset, SubcategoryState)
    if (initialCall && filterflag === false && Reset === false) {
      if (SubcategoryState && SubcategoryState.productlist.length === 0) {
        window.scrollTo(0, 0);
      }
      if (SubcategoryState && SubcategoryState.productlist) {
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
    
    setSelectItemDisp(uniqueNames);
    
    setpreselectItem(selectedList);
    setReset(true);
    // brandlist
    if (selectedItem.FieldId === 0 && selectedItem.StaticFilter === 0) {
      console.log("580eventbrandlist", selectedItem,);
      if (valueString.length !== '') {
        
        valueString.includes(`${selectedItem.valueId}`)
          ?
          setValueString(removeFromString(valueString, `${selectedItem.valueId}`))
          :
          setValueString(removedoubleComma(`${valueString},${selectedItem.valueId}`))
      } else {
        
        setValueString(`${selectedItem.valueId}`)
      }
    }
    // Weight, Glass Type, Primary Camera, Internal Storage, RAM, Colour
    if (selectedItem.FieldId !== 0 && selectedItem.fitlerName !== "Pack Size") {
      console.log("580eventbrandlist", selectedItem,);
      if (valuepackString.length !== 0) {
        valuepackString.includes(`${selectedItem.name}`) ? setvaluepackString(removeFromString(valuepackString, `${selectedItem.name}`)) : setvaluepackString(removedoubleComma(`${valuepackString},${selectedItem.name}`))
        
        setfieldString(`${fieldString},${selectedItem.FieldId}`)
      } else {
        setvaluepackString(`${selectedItem.name}`)
        setfieldString(`${selectedItem.FieldId}`)
      }
    }
    
    if (selectedItem.fitlerName === "Pack Size") {
      console.log("580eventbrandlist", selectedItem,);
      if (valuepackString.length !== 0) {
        
        valuepackString.includes(`${selectedItem.valueId}`) ? setvaluepackString(removeFromString(valuepackString, `${selectedItem.valueId}`)) : setvaluepackString(removedoubleComma(`${valuepackString},${selectedItem.valueId}`))
        
        setfieldString(`${fieldString},${selectedItem.FieldId}`)
      } else {
        
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
  const RemoveSelectItem = (selectedList, selectedItem) => {
    console.log("580eventbrandlist", selectedItem, advancegetskufilterdata)
    setSelectItemDisp((current) =>
      current.filter((selectItem) => selectItem.name !== selectedItem.name)
    );
    setpreselectItem((currentpre) =>
      currentpre.filter((curpreselectItem) => curpreselectItem.name !== selectedItem.name)
    );
    
    setReset(true);
    if (selectedItem.FieldId === 0 && selectedItem.StaticFilter === 0) {
      console.log("580eventbrandlist", selectedItem,);
      if (valueString.length !== '') {
        
        valueString.includes(`${selectedItem.valueId}`)
          ?
          setValueString(removeFromString(valueString, `${selectedItem.valueId}`))
          :
          setValueString(removedoubleComma(`${valueString},${selectedItem.valueId}`))
      } else {
        
        setValueString(`${selectedItem.valueId}`)
      }
    }
    if (selectedItem.FieldId !== 0 && selectedItem.fitlerName !== "Pack Size") {
      console.log("580eventbrandlist", selectedItem,);
      if (valuepackString.length !== 0) {
        valuepackString.includes(`${selectedItem.name}`) ? setvaluepackString(removeFromString(valuepackString, `${selectedItem.name}`)) : setvaluepackString(removedoubleComma(`${valuepackString},${selectedItem.name}`))
        
        setfieldString(`${fieldString},${selectedItem.FieldId}`)
      } else {
        setvaluepackString(`${selectedItem.name}`)
        setfieldString(`${selectedItem.FieldId}`)
      }
    }
    
    if (selectedItem.fitlerName === "Pack Size") {
      console.log("580eventbrandlist", selectedItem,);
      if (valuepackString.length !== 0) {
        
        valuepackString.includes(`${selectedItem.valueId}`) ? setvaluepackString(removeFromString(valuepackString, `${selectedItem.valueId}`)) : setvaluepackString(removedoubleComma(`${valuepackString},${selectedItem.valueId}`))
        
        setfieldString(`${fieldString},${selectedItem.FieldId}`)
      } else {
        
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
  
  function LoadProductPDP(PageUrl) {
    
    localStorage.setItem('PageUrl', window.btoa(PageUrl))
    
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
    setReset(true)
    if (event.target.value > min) {
      setMax(event.target.value)
    }
  }
  const handleMinValue = (event) => {
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

  function handlefilter() {

    document.getElementById('newpositionfilter').scroll({ top: 0, behavior: 'smooth' });
  }

  /*useEffect(() => {
    window.onload = function () {
      document.getElementById('app').className = 'filtericon-category-page';
    };
  }, [])*/
  const handlefilterResult = () => {

    document.getElementById('hidefilterResult').className = 'closefilter';
  }
  return (
    <>
        <Header />
        <div className={groupedData && groupedData != "" ? 'main-wrapper mt-0' : ""}>
          <div className="container-fluid subcatWrapper">
            <div className="row">
              <div className="col-lg-12">
                <div className="product-shop-main-wrapper newfilterAlign" id="product-listing">
                  <div id="paginginfo">
                  </div>
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
                        <img src='/images/adibuja-logo-animation.gif' alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
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
                                <img src='/images/adibuja-logo-animation.gif' alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
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
                                      <img src='/images/adibuja-logo-animation.gif' alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
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
                </div>
                {/* // } */}
              </div>
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
                              
                                    }}
                                    className={classnames("thumb thumb--zindex-3", {
                                      "thumb--zindex-5": ''
                                    })}
                                  />
                                  <input
                                    type="range"
                               
                                    min={SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ? SubcategoryState.productlist[0].MinPrice : null}
                                    max={SubcategoryState && SubcategoryState.productlist !== undefined && SubcategoryState.productlist.length !== 0 ? SubcategoryState.productlist[0].MaxPrice : null}
                                    value={max}
                                    // ref={maxRef}
                                    onChange={
                                      (event) => {
                                        handleMaxValue(event)
                                 
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
                      
                    </div>
                    : null
                }
              </div>

            </div>
          </div>
        </div>
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
    </>
  )
}
export default Subcategory;