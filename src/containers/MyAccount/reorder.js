/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
// import SubNavigation from '../../components/SubNavigation';
// import AddToCart from '../AddToCart';
// import mycartAPI from '../MainPage/api/mycartAPI';
import ReorderAPI from '../MainPage/api/Reorder';
import MyAccountSideNav from './MyAccountSideNav';
import Footer from '../../components/Footer'
//import history from '../../utils/history';
import Loadreorder from './Loadreorder';
import BreadCrumb from './myAccountBreadcrumb';
import 'react-toastify/dist/ReactToastify.css';
import logoanimation from '../../images/adibuja-logo-animation.gif'
export function ReOrder() {
  const [loading, setloading] = useState(false);
  const [reorderlist, setreorderlist] = useState('');
  // const [sort, setsort] = useState(false);
  const [sortname, setsortName] = useState(false)
  const [Sortdata, setSortdata] = useState([])
  const [isUserLogin, setIsUserLogin] = useState()
  console.log('isUserLogin--', isUserLogin)
  // const addtocartreducer = useSelector(state => state.addToCart)
  // const [shoppingCart, setShoppingCart] = useState([]);
  // const [Seleced, setSeleced] = useState('');
  // const [filtered, setFiltered] = useState([]);
  // const dispatch = useDispatch()
  useEffect(() => {
    // setufirstname(window.atob(localStorage.getItem('UserFirstName')))
    // setlastnamw(window.atob(localStorage.getItem('UserLastName')))
    // setphone(localStorage.getItem('UserLastPhone'))
    console.log(`47--${window.atob(localStorage.getItem('CustGUID'))}`)
    // console.log(`48--${ localStorage.hasOwnProperty('CustGUID')}`)
    if (Object.prototype.hasOwnProperty.call(localStorage, 'CustGUID')) {
      if (window.atob(localStorage.getItem('CustGUID')) !== null || window.atob(localStorage.getItem('CustGUID')) !== undefined || window.atob(localStorage.getItem('CustGUID')) !== '00000000-0000-0000-0000-000000000000') {
        console.log('51')
        setIsUserLogin(true)
      } else {
        console.log('54')
        setIsUserLogin(false)
      }
    }
    else {
      setIsUserLogin(false)
    }
  }, [isUserLogin])
  useEffect(() => {
    // dispatch(listreorder())
    setloading(true)
    ReorderAPI.Reorder({})
      .then(response => {
        setloading(false)
        setreorderlist(response)
        setSortdata(response.GetSku)
        console.log("reorder..", response)
        console.log("chkflag", response[0].FiltersList[0].IsListItemAddedInCart)
        // if (response.FiltersList.IsListItemAddedInCart === false) {
        //   alert("reorder")
        //   { props.Reorder ? 'Reorder' : 'Add to cart' }
        // }
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [])
  // useEffect(() => {
  //   changereorderbutton
  // })
  // const changereorderbutton = () => {
  //   if (response[0].FiltersList[0].IsListItemAddedInCart === false) {
  //     alert("reorder")
  //   }
  //   else {
  //     alert("addtocart")
  //   }
  // }
  // const sortdata = () => {
  //   setsort(true)
  //   if (cartdata !== undefined && cartdata[0].cart !== undefined) {
  //     // cartAllData.cart[0].sort()
  //     // const data = cartdata.cart[0].sort((a, b) => (a.CartItemId > b.CartItemId) ? 1 : -1)
  //     const data = cartdata[0].cart.sort((a, b) => (a.CartItemId < b.CartItemId) ? 1 : -1)
  //     data = cartdata[0].cart.sort((a, b) => (a.SkuCode < b.SkuCode) ? 1 : -1)
  //     // setcartdata(data)
  //     // cartdata[0].cart.sort((a, b) => (a.CartItemId > b.CartItemId) ? 1 : -1)
  //     console.log('mbmnbmnb', cartdata[0].cart.sort((a, b) => (a.CartItemId < b.CartItemId) ? 1 : -1));
  //     // console.log('sort', cartAllData.cart.sort((a, b) => a.UnitPrice - b.UnitPrice), cartAllData.cart.sort().reverse());
  //   }
  // }
  // useEffect(() => {
  //   mycartAPI.getShoppingcartDetails()
  //     .then(response => {
  //       setShoppingCart(response)
  //     })
  //     .catch(error => {
  //       console.log('error:::', error);
  //     });
  // }, [])
  // const changeFltr = (newFL) => {
  //   setSeleced(newFL);
  //   const P = reorderlist && reorderlist.FiltersList.find(i => i.ListItem === newFL);
  //   console.log('filterd', P);
  //   setFiltered(P);
  // };
  // useEffect(() => {
  //   if (reorderlist !== undefined) {
  //     setFiltered(reorderlist && reorderlist.FiltersList)
  //   }
  // }, [reorderlist])
  // function dateConverter(createdon) {
  //   const date = new Date(createdon);
  //   const formattedDate = date.toLocaleDateString('en-us', {
  //     month: 'short', day: 'numeric', year: 'numeric'
  //   }).replace(/ /g, '  ');
  //   return formattedDate
  // }
  // console.log('sssss', filtered, Seleced);
  // const productdetail = (PageUrl) => {
  //   history.push('/product/', { skuUrl: PageUrl })
  //   localStorage.setItem('PageUrl', window.btoa(PageUrl))
  // }
  const sortproductname = () => {
    setsortName(!sortname)
    console.log("name..", reorderlist)
    if (sortname === true) {
      const data1 = reorderlist.filter(a => a.Name)
      data1.sort(function (a, b) {
        if (a.Name < b.Name) {
          return -1;
        }
        if (a.Name > b.Name) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    } else {
      // if(cartdata && cartdata.length > 0){
      //   setSortdata(cartdata[0].cart)
      // }
      const data1 = reorderlist.filter(a => a.Name)
      data1.sort(function (a, b) {
        if (a.Name > b.Name) {
          return -1;
        }
        if (a.Name < b.Name) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    }
    // if (cartdata !== undefined && cartdata[0].cart !== undefined) {
    //   const data = cartdata[0].cart.sort((a, b) => (a.DisplayName - b.DisplayName))
    // }
    // else {
    //   const datareverse = cartdata[0].cart.sort((a, b) => (b.DisplayName - a.DisplayName));
    // }
    // console.log('mbmnbmnb', cartdata[0].cart.sort((a, b) => (a.SPPrice - b.SPPrice).reverse));
  }
  // const sortUnitPrice = () => {
  //   setsortName(!sortname)
  //   if(sortname===true){
  //     const data1 = reorderlist.filter(a=> a.UnitPrice )
  //     data1.sort(function (a, b) {
  //       if (a.UnitPrice < b.UnitPrice) {
  //         return -1;
  //       }
  //       if (a.UnitPrice > b.UnitPrice) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //     setSortdata(data1)
  //   }else{
  //     const data1 = reorderlist.filter(a=> a.UnitPrice )
  //     data1.sort(function (a, b) {
  //       if (a.UnitPrice > b.UnitPrice) {
  //         return -1;
  //       }
  //       if (a.UnitPrice < b.UnitPrice) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //     setSortdata(data1)
  //   }
  // }
  const sortdate = () => {
    setsortName(!sortname)
    console.log("name..", reorderlist)
    if (sortname === true) {
      const data1 = reorderlist.filter(a => a.CreatedOn)
      data1.sort(function (a, b) {
        if (a.CreatedOn < b.CreatedOn) {
          return -1;
        }
        if (a.CreatedOn > b.CreatedOn) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    } else {
      // if(cartdata && cartdata.length > 0){
      //   setSortdata(reorderlist)
      // }
      const data1 = reorderlist.filter(a => a.CreatedOn)
      data1.sort(function (a, b) {
        if (a.CreatedOn > b.CreatedOn) {
          return -1;
        }
        if (a.CreatedOn < b.CreatedOn) {
          return 1;
        }
        return 0;
      });
      setSortdata(data1)
    }
  }
  // { console.log("chkorder..", reorderlist.GetSku.length) }
  return (
    <>
      {
        (isUserLogin === false)
          ?
          history.push({ pathname: '/login', })
          :
          <div>
            <ToastContainer
              position="top-right"
            // draggable={true}
            // autoClose={50000}
            />
            <Header />
            <BreadCrumb myAccount="My Account" activepage="Reorder" />
            {/* <SubNavigation /> */}
            <div className="my-account-wrapper pb-20" >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <main id="primary" className="site-main">
                      <div className="user-dashboard">
                        <div className="main-dashboard">
                          <div className="row">
                            <MyAccountSideNav />
                            <div className="col-12 col-sm-12 col-md-12 col-lg-10" id="my-account-reorder">
                              <div className="section-title" id="shoppicartheading">
                                {/* <h3>Reorder <span>({`${reorderlist && reorderlist.length && reorderlist.length === 0 ? (0) : (reorderlist && reorderlist.length)}`})</span></h3> */}
                                <h3>Reorder <span>({`${reorderlist && reorderlist.GetSku.length > 0 ? (reorderlist.GetSku.length) : 0}`})</span></h3>
                              </div>
                              <div id="last_purchaseddiv">
                                <input type="hidden" id="countcart" data-countval="2" />
                                <input type="hidden" className="PriceId" value="14424" />
                                <div className='shopping-cart-wrapper '>
                                  <table className="table table-bordered reorderonmob" id="last_Purchased">
                                    {reorderlist && reorderlist.GetSku.length > 0 ? <thead>
                                      <tr>
                                        <th>Product Image</th>
                                        <th
                                          style={{ textAlign: 'left' }}>Product Name
                                          &nbsp;<button type='button' onClick={sortproductname} className="fa fa-sort" aria-hidden="true"></button>
                                        </th>
                                        <th style={{ textAlign: 'left' }} id="datecolumn">Purchased Date
                                          <button type='button' onClick={sortdate} className="fa fa-sort" aria-hidden="true"></button>
                                        </th>
                                        <th style={{ textAlign: 'center' }}>Pack Size</th>
                                        <th id="reorder_Amount" style={{ textAlign: 'right' }}>Unit Price (₹)
                                          {/* &nbsp;<i onClick={sortUnitPrice} className="fa fa-sort" aria-hidden="true"></i> */}
                                        </th>
                                        <th style={{ textAlign: 'center', width: '10%' }}>Action</th>
                                      </tr>
                                    </thead> :
                                      <div id="last_purchaseddiv">
                                        <div className="col-md-12" >
                                          <div className="alert alert-warning"><strong>Empty Reorder </strong> <br />No Order Placed Yet.</div>
                                        </div>
                                      </div>}
                                    {loading === true ?
                                      <tbody>
                                        <tr>
                                          <td colSpan={6}>
                                            <div className='row'>
                                              <div className='col-lg-12 text-center mt-25 mb-25' >
                                                <img src={logoanimation} alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
                                                {/* <i
                                              style={{ justifySelf: 'center' }}
                                              className="fa fa-spin fa-spinner fa-4x"></i> */}
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                      :
                                      <tbody>
                                        {(Sortdata && Sortdata || []).map(data =>
                                          <Loadreorder data={data} />
                                        )}
                                      </tbody>}
                                  </table>
                                </div>
                              </div>
                              {
                                reorderlist && reorderlist === null ?
                                  <div className="table-responsive" id="last_purchaseddiv">
                                    <div className="col-md-12" >
                                      <div className="alert alert-warning"><strong>Empty Reorder </strong> <br />No Order Placed YetZ.</div>
                                    </div>
                                  </div>
                                  : null}
                              <div id="last_purchaseddiv">
                                <div className="col-md-12 p-0">
                                  <div className="cart-button-wrapper d-flex justify-content-between mt-4 mobilereorderbutton">
                                    <Link to="/" className="btn btn-secondary" style={{ backgroundColor: '#000', color: '#ffffff' }}>Continue Shopping</Link>
                                    <Link id="checkouthide" to="/cart" className="btn btn-secondary dark align-self-end" style={{ backgroundColor: '#000', color: '#ffffff' }}>Go to Cart</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-10 fixmobile" >
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
      }
    </>
  )
}
export default ReOrder
