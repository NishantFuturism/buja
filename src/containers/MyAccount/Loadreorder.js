/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Link from 'next/link';
////import history from '../../utils/history';
import AddToCart from '../AddToCart';
// import OrderdetailAPI from '../MainPage/api/orderdetail';
// import ReorderAPI from '../MainPage/api/Reorder';
import mycartAPI from '../MainPage/api/mycartAPI';
import Image from 'next/image'

export default function Loadreorder(props) {
  const [Seleced, setSeleced] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  // const [showReorderFilterList, setShowReorderFilterList] = useState(props.data.FiltersList);
  // IsListItemAddedInCart
  // console.log("showReorder..", showReorder)
  // const [reOrderlist, setReOrderlist] = useState([]);
  const addtocartreducer = useSelector(state => state.addToCart)
  const changeFltr = (newFL) => {
    console.log("newFL", newFL)
    setSeleced(newFL);
    const P = props && props.data.FiltersList.find(i => i.ListItem === newFL);
    console.log('filterd', P);
    setFiltered(P);
  };
  useEffect(() => {
  }, [])
  // useEffect(() => {
  //   if (props.data !== undefined) {
  //     setFiltered(props.data && props.data.FiltersList)
  //   }
  // }, [props])
  useEffect(() => {
    setFiltered(props.data && props.data.FiltersList[0])
  }, [])
  console.log('sssss', filtered, Seleced);
  const productdetail = (PageUrl) => {
    history.push(`/product/${PageUrl}`, { skuUrl: PageUrl })
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
  }, [addtocartreducer])
  function dateConverter(createdon) {
    const date = new Date(createdon);
    const formattedDate = date.toLocaleDateString('en-us', {
      month: 'long', day: 'numeric', year: 'numeric'
    }).replace(/ /g, '  ');
    return formattedDate
  }
  // function fetchorder() {
  //   ReorderAPI.Reorder({})
  //     .then(response => {
  //       setReOrderlist(response)
  //       console.log("reorderresponse..", response)
  //     })
  //     .catch(error => {
  //       console.log('error:::', error);
  //     });
  // }
  // useEffect(() => {
  //   fetchorder()
  // }, [])
  useEffect(() => {
    dateConverter()
  })
  return (
    <>
      {/* {(reOrderlist || []).map(data => */}
      <tr className="pr-block">
        <td>
          <Link href={"#"} onClick={() => productdetail(props.data.PageUrl)} >
            {/* <img src={props.data.ListingImage} height="50" width="50" className="js-lazy-img" /> */}
            {console.log("SDGGGGWERERR",props.data.ListingImage)}
            <Image src={props.data.ListingImage} width="50" height="50"  />


          </Link>
        </td>
        <td className="text-left reordertext" id='reoderproductname'>
          <p><strong><Link href={"#"}  onClick={() => productdetail(props.data.PageUrl)}> {props.data.SkuCode}</Link> </strong></p>
        </td>
        <td style={{ textAlign: 'left' }}>
          {dateConverter(props.data.CreatedOn)}
          {/* {props.data.CreatedOn} */}
        </td>
        <td style={{ textAlign: 'center' }}>
          {/* <input type="hidden" className="PriceId" />
                                        <span style={{ fontSize: '16px !important' }} >
                                          {data.FiltersList[0].ListItem}
                                        </span> */}
          {/* <select onChange={event => changeFltr(event.target.value)} value={Seleced} >
                                          {props.data.FiltersList.map(itm => (
                                            <option value={itm.ListItem}>{itm.ListItem}</option>
                                          ))}
                                        </select> */}
          <select className="nice-select ddl-weight customdropdown"
            onChange={event => changeFltr(event.target.value)} >
            {props.data.FiltersList.map(itm => (
              <option value={itm.ListItem} {...props.Reorder ? 'Reorder' : 'Add to cart'}>
                {itm.ListItem}
              </option>
            ))}
          </select>
        </td>
        <td style={{ textAlign: 'right' }}>
          <div className="price-box">
            <span className="">
              <span className="special-price" id="reorderprice" style={{ textAlign: 'right' }}>₹{parseFloat(filtered.FilterSPPrice).toFixed(2)}</span>
            </span>
          </div>
        </td>
        <td className='text-center'>
          {/* <div className="product-caption action-col my-acc-reorder">
                                          <span className="qtyincdec addtocartqtyDivhidden addtocartqtyDiv14424" style={{ display: 'block' }}>
                                            <input type="text" className="addtocartqtytxt  addtocartqty87996 addtocartqty14424" value="1" min="1" max="100" maxLength="5" onKeyPress="validateNumber(event);" onKeyUp="validateValue(14424)" required="" />
                                          </span>
                                          <div className="product-qty-parenttest product-qty-parent14424" style={{ display: 'none' }}>
                                            <div className="product-qty fixhomepage IncDecQtyDiv IncrementDecrementQtyDiv14424" style={{ display: 'none' }}>
                                              <input type="button" className="IncDecQty AddUpdateqty14424"
                                              />
                                              <span className="dec qtybtn btn btn-primary" >
                                                <i className="fa fa-minus"></i>
                                              </span>
                                              <span className="inc qtybtn btn btn-primary">
                                                <i className="fa fa-plus"></i>
                                              </span>
                                            </div> */}
          {/* </div> */}
          <div className='reorderaddtocartandqty'>
            {/* <span className="skuqty">Qty:&nbsp; <span id='wishlistqty' contentEditable="true">{filtered.Quantity}</span></span>&nbsp;&nbsp; */}
            <AddToCart data={props.data} shoppingCart={shoppingCart} filtered={filtered} Reorder skulisting ></AddToCart>
            {console.log("dataa..", props.data)}
          </div>
          {/* <button className="btn-cart incdecaddtocart AddToCart14424" style={{ display: 'block' }}
                                            type="button" >Reorder</button> */}
          {/* </div> */}
        </td>
      </tr>
      {/* )} */}
    </>
  )
}
