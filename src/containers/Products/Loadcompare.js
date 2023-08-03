/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// import { Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
//import history from '../../utils/history';
import { useRouter } from 'next/router';
import AddToCart from '../AddToCart';
import mycartAPI from '../MainPage/api/mycartAPI';
// import Select from './select';
import './loadcompare.css'
export default function Loadcompare(props) {
  const router = useRouter();
  console.log("props..", props)
  // const [Seleced, setSeleced] = useState('');
  // const [filtered, setFiltered] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [data, setdata] = useState([]);
  // const [noItemInCompareList, setNoItemInCompareList] = useState(true)
  const addToCartRdcr = useSelector(state => state.addToCart)
  // const products = useSelector(state => state.products)
  const loadProducts = useSelector(state => state.loadProducts)
  // const noitemcompare = loadProducts.comaprelist
  console.log("Loaddd..", loadProducts)
  // console.log('propsloadcompare', props);
  // const changeFltr = (newFL) => {
  //   setSeleced(newFL);
  //   const P = props.data.FilterList ? props.data.FilterList.find(i => i.ListItem === newFL) : props.data.FilterList.find(i => i.ListItem === newFL)
  //   console.log('filterd', P);
  //   setFiltered(P);
  // };
  // useEffect(() => {
  //   if (props.data !== undefined) {
  //     setFiltered(props.data && props.data.FiltersList)
  //   }
  // }, [props])
  // useEffect(() => {
  //   setFiltered(props.data.FilterList[0] ? props.data.FilterList[0] : props.data.FiltersList[0])
  // }, [])
  // const pricdata = localStorage.getItem('filtered')
  // console.log('sssss', Seleced, pricdata);
  const productdetail = (PageUrl) => {
    router.push(`/product/${PageUrl}`, { skuUrl: PageUrl })
    localStorage.setItem('PageUrl', window.btoa(PageUrl))
  }
  useEffect(() => {
    mycartAPI.getShoppingcartDetails()
      .then(response => {
        setShoppingCart(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [addToCartRdcr])
  function deleteProduct(SkuId) {
    // removeCookie('name', { path: '/' })
    // console.log(productdata.length, SkuId);
    // let index = items.findIndex(element => element.id === 3)
    // props.data.splice(SkuId, 1)
    // const data = localStorage.getItem('Comapredata')
    // const items = JSON.parse(data)
    // items.pop(SkuId)
    // console.log('n', items);
    // localStorage.key('Comapredata')
    // localStorage.getItem('Comapredata').spl(SkuId)
    // const questions = props.data.splice(SkuId, 1);
    setdata(loadProducts.comaprelist.splice(SkuId, 1))
    toast("Product removed from compare list successfully")
    console.log((loadProducts.comaprelist).length)
    // setdeleteitem(true)
    console.log('n======================', data, loadProducts.comaprelist);
    localStorage.setItem('Comapredata', JSON.stringify(loadProducts.comaprelist))
    localStorage.setItem('countafterdelete', loadProducts.comaprelist)
    console.log("Comapredata..", Comapredata)
    // localStorage.removeItem('skuproduct1')
    // if (!localStorage.removeItem("skuproduct1")) alert("Empty");
  }
  // useEffect(() => {
  //   localStorage.setItem('Comapredata', JSON.stringify(data))
  // }, [localStorage.getItem('Comapredata')])
  // console.log("props.data", props.data);
  // useEffect(() => {
  //   checkcomparedata()
  // })
  // const checkcomparedata = () => {
  //   // const Nodataincompare = loadProducts.comaprelist;
  //   console.log("Nodataincompare..", Nodataincompare)
  //   if ((loadProducts.comaprelist).length === 0) {
  //     console.log("no data")
  //     // setNoItemInCompareList(true)
  //   }
  //   else if ((loadProducts.comaprelist).length <= 2) {
  //     console.log("data")
  //     // setNoItemInCompareList(false)
  //   }
  // }
  // console.log("noItemInCompareList..", noItemInCompareList)
  console.log("loadProducts.lenghth..", loadProducts)
  return (
    <>
      {/* { props.data === null ? <div className="col-md-12" style={{ padding: '5%' }}>
        <div className="alert alert-warning">No more products</div>
      </div> : */}
      {
        loadProducts && (loadProducts.comaprelist).length > 0 ?
          <div className="table-responsive  text-center pr-block ProductComparison">
            <table id="comparefix" className="table table-bordered compare-style" style={{
              display: 'flex'
            }}>
              <thead className='comparethead' style={{ border: '1px solid #dee2e6' }}>
                <tr>
                  <td className="product-title width-2-per textbold compareproimg" style={{ whiteSpace: 'nowrap' }}>Product Image </td>
                </tr>
                <tr>
                  <td className="product-title textbold comparenameall">Product Name</td>
                  {/* {(loadProducts && loadProducts.comaprelist || []).map((item) =>
                      <td className="width-30-per" style={{ minWidth: '300px' }} > <span> {item.SkuCode}</span>
                      </td>
                    )} */}
                </tr>
                <tr>
                  <td className="product-title width-10-per textbold comparenameall">
                    Pack Size </td>
                  {/* {(loadProducts && loadProducts.comaprelist || []).map((item) =>
                      <td className="pk-size width-30-per">
                        <span>{item.FilterList[0].ListItem} </span>
                      </td>
                    )} */}
                </tr>
                <tr>
                  <td className="product-title width-10-per textbold price">
                    Price </td>
                  {/* {(loadProducts && loadProducts.comaprelist || []).map((item) =>
                      <td className="pk-size width-30-per">
                        <span>₹ {item.FilterList[0].FilterSPPrice} </span>
                      </td>
                      // <SelectDrop data={item} />
                    )} */}
                </tr>
                {/* <tr>
              <td className="product-title width-10-per textbold">Price</td>
              {(props && props.data || []).map((item) =>
                <td className="width-30-per" style={{ minWidth: '300px' }}>
                  <span id="spprice83839">
                    {products && products.skucode && item.SkuId === products.skucode.SkuDetailId && products.skucode.FilterSPPrice}
                    ₹  {item.SkuId === filtered.SkuDetailId ? filtered.FilterSPPrice : null}
                  </span>
                </td>
              )}
            </tr> */}
                <tr>
                  <td className="product-title width-10-per textbold compaction">Actions</td>
                  {/* {(loadProducts && loadProducts.comaprelist || []).map((item, index) =>
                      <td className="pr-block  text-center width-30-per SkuId_83839 available ">
                        {console.log('index', item)}
                        <AddToCart data={item} shoppingCart={shoppingCart} filtered={item.FilterList} skulisting={item.skulisting}
                          notify={loadProducts.comaprelist.IsNotified} wishlist={false} />
                      </td>
                    )} */}
                </tr>
              </thead>
              <tbody>
                {(loadProducts !== undefined && loadProducts.comaprelist || []).map((item, index) =>
                  <td>
                    <tr>
                      <td className="width-30-per position-relative" align="center">
                        <i className="lnr lnr-trash close-btnx btncompare"
                          style={{ cursor: 'pointer' }}
                          onClick={() => deleteProduct(index)}
                        ></i>
                        <div
                          style={{ positionL: 'relative', cursor: 'pointer' }}>
                          <a href onClick={() => productdetail(item.PageUrl)}>
                            <img src={item.ListingImage}
                              referrerPolicy='no-referrer'
                              className="js-lazy-img" width="150" height="150" alt='' />
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="width-30-per" > <span className='compareproname'> {item.SkuCode}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pk-size width-30-per">
                        <span>{item.FilterList[0].ListItem} </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pk-size width-30-per">
                        <span>₹ {item.FilterList[0].FilterSPPrice} </span>
                      </td>
                    </tr>
                    {console.log('index=======', item)}
                    <tr>
                      {
                        item.IsDeliveryAvailableToPinCode ?
                          <td className="pr-block  text-center width-30-per SkuId_83839 available ">
                            <AddToCart data={item} shoppingCart={shoppingCart} filtered={item.FilterList[0]} skulisting={item.skulisting}
                              notify={loadProducts.comaprelist.IsNotified} wishlist={false} />
                          </td>
                          : <td className="mycart_3" >
                            <span className="lbl-cant-deliver"> Can not deliver to pin code <b>{item.DeliveryLocalityPincode} </b></span>
                          </td>
                      }
                    </tr>
                  </td>
                )}
              </tbody>
            </table >
          </div > :
          <div className="col-md-12" style={{ padding: '5%' }}>
            <div className='alert alert-warning'>
              Products Not Found
            </div>
          </div>
      }
      {/* }  */}
    </>
  )
}
