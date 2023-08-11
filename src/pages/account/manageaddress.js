/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
// import SubNavigation from '../../components/SubNavigation';
import CheckoutAPI from '../../containers/MainPage/api/checkout';
import LocationApi from '../../containers/MainPage/api/Locationapi';
import { AddressForm } from '../../containers/ProceedToBuy/addressform';
import MyAccountSideNav from '../../containers/MyAccount/MyAccountSideNav';
import Footer from '../../components/Footer'
import { selectdefaultaddress } from '../../containers/ProceedToBuy/actions';
// import { DeleteSkuidflag } from './actions';
import Constants from '../../containers/App/constants';
import { getlocationtitle } from '../../containers/LocationPopup/actions';
import PaymentAPI from '../../containers/MainPage/api/payment';
import BreadCrumb from '../../containers/MyAccount/myAccountBreadcrumb';
import Success from '../../components/ShowAlert/success';
import Warn from '../../components/ShowAlert/warn';
import AddressFormDeletePopUp from '../../components/ShowAlert/addressformdeletepopup';
import 'react-toastify/dist/ReactToastify.css';
////import history from '../../utils/history';
export function ManageAddress(props) {
  const [enableaddressformn, setenableaddressformn] = useState(false);
  const [atosuggestdadta, setatosuggestdadta] = useState([])
  const [customeraddress, setcustomeraddress] = useState([])
  const [userdetail, setuserdetail] = useState([])
  const [editdata, seteditdata] = useState([])
  const [edit, setedit] = useState(false)
  const [detectlocview, setdetectlocview] = useState(false)
  const [locationname, setlocationname] = useState('')
  const [enblesuggestion, setenblesuggestion] = useState(false)
  const [Autolist, setAutolist] = useState([])
  const [pin, setPin] = useState('')
  const [searchaddress, setSearchAddress] = useState('')
  const [locationstatus, setLocationstatus] = useState(false)
  const [locationmsg, setLocationmsg] = useState('')
  const [warnstatus, setWarnstatus] = useState(false)
  const [locationBlock, setlocationBlock] = useState(false)
  const myaccountReducer = useSelector(state => state.myAccount);
  console.log("editdata", editdata);
  const [isUserLogin, setIsUserLogin] = useState()
  console.log('isUserLogin--', isUserLogin)
  // const user = localStorage.getItem('User')
  const dispatch = useDispatch()
  const addform = () => {
    setenableaddressformn(true)
  }
  const closemsg = () => {
}
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
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
}
  }, [isUserLogin])
  useEffect(() => {
    // setuserdetail(JSON.parse(user))
    LocationApi.GoogleApi({})
      .then(response => {
        const data = response
        setatosuggestdadta(data)
      })
  }, [])
  useEffect(() => {
    fetchaddress()
  }, [edit]);
  function fetchaddress() {
    CheckoutAPI.getcustomeraddress({})
      .then(response => {
        setcustomeraddress(response)
        // setcustomeraddressID(response.CustomerAddressId)
        // data = response
      })
  }
  const cancelform = () => {
    setenableaddressformn(false)
    setedit(false)
  }
  const Loadaddressform = (todo, id) => {
    console.log("iddddddddddd", id);
    setenableaddressformn(true)
    setedit(true)
    seteditdata(todo)
  }
  const addressdelete = (CustomerAddressId) => {
    console.log('zbbx', CustomerAddressId);
    // dispatch(DeleteSkuidflag(true))
    // dispatch(getDeleteaddressid(CustomerAddressId))
    CheckoutAPI.deleteaddress(CustomerAddressId)
      .then(response => {
        console.log('uuuuu', response)
        // toast(response)
        setLocationstatus(true)
        setLocationmsg('Address Deleted Successfully')
        setTimeout(() => {
          fetchaddress()
        }, 3000)
      })
    //   .catch(error => {
    //     console.log('error:::', error);
    //     // toast(error)
    //     setLocationstatus(true)
    //     setLocationmsg('Can not delete address')
    //     fetchaddress()
    //   });
  }
  const deleteItem = (CustomerAddressId) => {
    console.log("id", CustomerAddressId);
    if (props !== undefined) {
      CheckoutAPI.deleteaddress(CustomerAddressId)
        .then(response => {
          console.log("response", response);
          toast("Item deleted successfully")
          // alert('deleted')
          fetchlist()
          // setsavecartlistitem(response)
        })
        .catch(error => {
          console.log('error:::', error);
        });
    }
  }
  // useEffect(() => {
  //   fetchlist()
  // }, [])
  function fetchlist(CustomerAddressId) {
    if (props !== undefined) {
      CheckoutAPI.deleteaddress(CustomerAddressId)
        .then(response => {
          console.log("response", response);
          setLocationmsg(response)
        })
        .catch(error => {
          console.log('error:::', error);
        });
    }
  }
  useEffect(() => {
  }, [locationmsg])
  function slectaddress(CustomerAddressId, ZipCode) {
    if (ZipCode !== '411045') {
      // alert('Opps ! It seems currently we are not serving in your pincode, try selecting some other pincode. not available here')
    } else
      dispatch(selectdefaultaddress(CustomerAddressId))
    fetchaddress()
    // if (datalist && datalist.Defaultaddress) {
    //   // Alert('d', datalist.Defaultaddress)
    //   console.log('sss', datalist.Defaultaddress);
    // }
    // setisprimaybutton(true)
    // setdisable(true)
  }
  const editLocation = () => {
    setdetectlocview(true)
    // setlocationname('')
    setSearchAddress(locationname)
  }
  function checkservice(description, selectedatavalue, placeid) {
    console.log("description", description);
    setlocationBlock(false)
    setlocationname(description)
    // setenteredvalue(selectedatavalue)
    const token = localStorage.getItem('generatedtoken');
    // setenblesuggestion(false)
    // dispatch(checkserviceavailability(description, placeid, atosuggestdadta))
    return fetch(`${Constants.urls.baseUrl}${Constants.endPoints.placedetails}key=${atosuggestdadta.GooglePlacesApiKey}&placeId=${placeid}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify(form)
    })
      .then(res => res.text())
      .then(addressresponse => {
        const responsew = JSON.parse(addressresponse)
        console.log('nvnujss', JSON.parse(addressresponse))
        return fetch(`${Constants.endPoints.geocode}key=${atosuggestdadta.GooglePlacesApiKey}&latlng=${responsew.result.geometry.location.lat},${responsew.result.geometry.location.lng}&sensor=${true}`, {
          method: 'GET',
          headers: {
            accept: 'text/plain',
          },
          // body: JSON.stringify(form)
        })
          .then(res => res.text())
          .then(resaa => {
            const check = JSON.parse(resaa)
            // below code added to check if response address has zipcode or not
            const responseAddressList = check.results;
            let addressToConsider = "";
            for (let i = 0; i < responseAddressList.length; i += 1) {
              const formatAddressText = responseAddressList[i].formatted_address;
              if (/(\d{6})/.test(formatAddressText)) {
                addressToConsider = responseAddressList[i];
                break;
              }
            }
            const address = addressToConsider.address_components.filter(x => x.types[1] === 'sublocality')
            const pincode = addressToConsider.address_components.filter(x => x.types[0] === 'postal_code')
            let city = addressToConsider.address_components.filter(x => x.types[0] === 'locality')
            if (city && city !== "Pune") {
              city = addressToConsider.address_components.filter(x => x.types[0] === 'administrative_area_level_3')
            }
            const state = addressToConsider.address_components.filter(x => x.types[0] === 'administrative_area_level_1')
            const area = addressToConsider.address_components.filter(x => x.types[1] === 'sublocality')
            if (address.length > 0 && pincode.length > 0 && area.length > 0 && state.length > 0 && city[0].long_name === 'Pune') {
              localStorage.setItem('sublocalityvalue', address[0].long_name)
              localStorage.setItem('pincodevalue', pincode[0].long_name)
            }
            if (address.length > 0 && pincode.length > 0 && area.length > 0 && state.length > 0) {
              // do nothing 
              dispatch(getlocationtitle(address[0].long_name, pincode[0].long_name, true))
            } else {
              console.log("you are here")
              setWarnstatus(true)
              setLocationmsg(`Address not found! Please search again`)
              setTimeout(() => {
                setlocationname('')
              }, 500);
            }
            if (city[0] && city[0].long_name && city[0].long_name !== "" && city[0].long_name === 'Pune') {
              return fetch(`${Constants.endPoints.checkserviceavailability}setsession=true&address=${address[0].long_name}&area=${area[0].long_name}&city=${city[0].long_name}&lat=${responsew.result.geometry.location.lat}&lng=${responsew.result.geometry.location.lng}&pincode=${pincode[0].long_name}&placeid=${JSON.parse(resaa).results[0].place_id}&state=${state[0].long_name}`, {
                method: 'GET',
                // mode: 'cors',
                headers: {
                  accept: 'application/json',
                  // 'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              })
                .then(res => res.json())
                .then(response => {
                  // toast(response)
                  const msg = response
                  console.log('JJJJ', msg, msg === "Available")
                  if (msg === "Available") {
                    setPin(pincode)
                    // setSearchAddress(address[0].long_name)
                    setSearchAddress(address[1].long_name)
                    // toast('Delivery location is updated ')
                    setLocationstatus(true)
                    setLocationmsg('Delivery location is updated ')
                    setTimeout(() => {
                      setLocationstatus(false)
                      // props.fetchToggle()
                    }, 500);
                    // setHomerefresh(true)
                    dispatch(getlocationtitle(address[0].long_name, pincode[0].long_name, true))
                  } else {
                    // toast(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
                    setWarnstatus(true)
                    setLocationmsg(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
                    setTimeout(() => {
                      setlocationname('')
                      setWarnstatus(false)
                      // props.fetchToggle()
                    }, 500);
                  }
                  // if (response === "Available") {
                  //   toast('Delivery location is updated and Avialable')
                  // }
                  // else {
                  //   toast('Delivery location is updated and not Avialable')
                  // }
                });
            }
            setWarnstatus(true)
            setLocationmsg(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
            setTimeout(() => {
              setlocationname('')
              setWarnstatus(false)
              // props.fetchToggle()
            }, 500);
            return null;
            // });
            // const responsew = JSON.parse(addressresponse)
            // setAutolist(responsew.predictions)
            // setenblesuggestion(true)
          });
        // const responsew = JSON.parse(addressresponse)
        // setAutolist(responsew.predictions)
        // setenblesuggestion(true)
      });
  }
  const autosuggestloaction = (e) => {
    console.log('sss');
    // setauto(true)
    setlocationname(document.getElementById('txtDeliveryLocalityForCheckout').value)
    // dispatch(changed(e.target.value, atosuggestdadta));
    const token = localStorage.getItem('generatedtoken');
    setTimeout(() => fetch(`${Constants.urls.baseUrl}${Constants.endPoints.autocomplete}key=${atosuggestdadta.GooglePlacesApiKey}&keyword=${e.target.value}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        accept: 'application/json',
        // accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        // mode: 'cors',
        // "Access-Control-Allow-Headers": "*",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "*"
      },
      // body: JSON.stringify(form)
    })
      .then(res => res.text())
      .then(addressresponse => {
        console.log('registerresponse', addressresponse)
        const responsew = JSON.parse(addressresponse)
        // setenblesuggestion(true)
        setAutolist(responsew.predictions)
        setenblesuggestion(true)
      }), 2000)
  }
  const detectmylocation = () => {
    console.log('ss');
    const error = () => {
      setlocationBlock(true)
    }
    const success = (position) => {
      fetch(`${Constants.endPoints.geocode}key=${atosuggestdadta.GooglePlacesApiKey}&latlng=${position.coords.latitude},${position.coords.longitude}&sensor=${true}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          // 'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(form)
      })
        .then(res => res.text())
        .then(addressresponse => {
          const token = localStorage.getItem('generatedtoken');
          console.log('registerresponse', addressresponse)
          const address = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[1] === 'sublocality')
          const pincode = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[0] === 'postal_code')
          const city = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[0] === 'locality' || x.types[0] === 'administrative_area_level_3')
          const state = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[0] === 'administrative_area_level_1')
          const area = JSON.parse(addressresponse).results[0].address_components.filter(x => x.types[1] === 'sublocality')
          console.log(`manageaddressCity${JSON.stringify(city)}`);
          if (address.length > 0 && pincode.length > 0 && area.length > 0 && state.length > 0 && city[0] && city[0].long_name === 'Pune') {
            localStorage.setItem('sublocalityvalue', address[0].long_name)
            localStorage.setItem('pincodevalue', pincode[0].long_name)
          } else {
            //
          }
          console.log({ address, pincode, city });
          setPin(pincode)
          console.log("address", address);
          setSearchAddress(address[0].long_name)
          return fetch(`${Constants.endPoints.checkserviceavailability}setsession=true&address=${address[0].long_name}&area=${area[0].long_name}&city=${city[0].long_name}&lat=${position.coords.latitude}&lng=${position.coords.longitude}&pincode=${pincode[0].long_name}&placeid=${JSON.parse(addressresponse).results[0].place_id}&state=${state[0].long_name}`, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
            .then(res => res.text())
            .then(response => {
              // toast(response)
              // console.log('DD', response)
              if (response !== "NotAvailable") {
                // toast('Delivery location is updated ')
                setSearchAddress(address[0].long_name)
                setLocationstatus(true)
                setLocationmsg('Delivery location is updated ')
                setTimeout(() => {
                  setLocationstatus(false)
                  // props.fetchToggle()
                }, 3000);
                // setlocationname('')
                setlocationname(address[0].long_name)
                dispatch(getlocationtitle(address[0].long_name, pincode[0].long_name))
              } else {
                // toast(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
                setWarnstatus(true)
                setlocationname('')
                setLocationmsg(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
                setTimeout(() => {
                  setWarnstatus(false)
                }, 3000);
              }
            });
        })
    }
    navigator.geolocation.getCurrentPosition(success, error)
  }
  function fetchcustomerdata() {
    PaymentAPI.getcustomerwalletbalance({})
      .then(response => {
        console.log('uuuuu', response)
        setuserdetail(response)
      })
      .catch(rror => {
        console.log('error:::', rror);
      });
  }
  useEffect(() => {
    fetchcustomerdata()
  }, [])
  useEffect(() => {
    setInterval(() => {
      setLocationstatus(false)
    }, 5000);
  }, [closemsg])
 
  useEffect(() => {
    if (locationstatus === true && pin !== '' && searchaddress !== '') {
      setdetectlocview(false)
    }
  }, [pin, searchaddress, locationstatus])
  const handleDetectClose = () => {
    setdetectlocview(false)
    // setlocationname('')
  }
  // const addresslist = customeraddress
  console.log("customerrrrr", customeraddress, "searchaddress", searchaddress, "locationname", locationname);
  return (
    <>
      {
        // (isUserLogin === true || isUserLogin !== null || isUserLogin !== undefined)
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
            {locationstatus && <Success msg={locationmsg} close={closemsg} />}
            {warnstatus && <Warn msg={locationmsg} close={closemsg} />}
            {myaccountReducer && myaccountReducer.flag && <AddressFormDeletePopUp delete={deleteItem} Fetchlist={fetchlist} />}
            <Header />
            <BreadCrumb myAccount="My Account" activepage="Billing & Delivery Address" />
            {/* <SubNavigation /> */}
            {/* <ToastContainer /> */}
          </div>
      }
      <div className="my-account-wrapper pb-20">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <main id="primary" className="site-main">
                <div className="user-dashboard">
                  <div className="main-dashboard">
                    <div className="row">
                      <MyAccountSideNav />
                      <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                        <div className="tab-content dashboard-content" data-addressgroup="shipping" id="profile">
                          <h3>Billing &amp; Delivery Address</h3>
                          <div className="">
                            <div id="address_list" className="row address-view">
                              {(customeraddress || []).map(data => (
                                <div className="col-lg-4 all-address-div pnlAddress" style={{ paddingLeft: '5px' }}>
                                  <div className="product-item product-item-active ">
                                    <div className="product-thumb" style={{ zIndex: '1' }}>
                                      {data.isPrimary === false ? <button type='button' data-address="2873" data-delete="true" className="checkout_btn btn btn-default "
                                        onClick={() => addressdelete(data.CustomerAddressId)}
                                        style={{ borderRadius: '10px' }}>
                                        <i className="lnr lnr-cross-circle"></i>
                                      </button> : null}
                                    </div>
                                    <div className="product-caption">
                                      <div className="product-name">
                                        <div className="defaul_add">
                                          <h4> <strong>{data.AddressTypeName}</strong></h4>
                                          <div>
                                            <span>{data.FirstName} {data.LastName}</span>
                                          </div>
                                          <br />
                                          <span>  {data.Address1}, {data.Address2},</span>
                                          <span> {data.City},</span>
                                          <span> {data.DeliveryLocalityState},</span>
                                          <span> {data.Country},&nbsp;</span>
                                          <span>{data.ZipCode}</span>
                                          {/* <span> {data.DeliveryLocalityPinCode}</span> */}
                                          <br />
                                          <div>
                                            <span> Mobile: {data.Mobile}</span>
                                          </div>
                                        </div>
                                        <div className="address-buttons-wrap">
                                          {data.isPrimary ?
                                            <button type="button" className="default-billing-address btn btn-secondary set-shipping-address billing-address ba btn-fix"
                                              disabled={data.isPrimary}
                                              onClick={() => slectaddress(data.CustomerAddressId, data.ZipCode)}
                                            > <i className="fa fa-check-square-o"></i> Primary</button> : null}
                                          &nbsp;
                                          <button className="default-billing-address btn btn-secondary set-shipping-address billing-address ba btn-fix"
                                            onClick={() => Loadaddressform(data, data.CustomerAddressId)}
                                            type="button" >
                                            Edit
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                </div>
                              ))}
                              <div className="col-lg-12 add-new-address" style={{ marginBottom: "20px" }}>
                                <div className="defaul_add">
                                  <button className="btn-cart btn-secondary button-font"
                                    onClick={addform}
                                    href type='button' id="showAddress" style={{ width: '18%' }}> + Add New Address</button>
                                </div>
                              </div>
                              {enableaddressformn ?
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addr_form" style={{ display: 'block' }}>
                                  {locationBlock && <span style={{ color: 'red' }}>Sorry! Geo Location is not supported on your current browser! Please check your browser settings.</span>}
                                  <div className="row delivery-area-box-container" >
                                    <div className='pl-3 pr-3'>
                                      <b>Delivery area</b>
                                    </div>
                                    {detectlocview ?
                                      <div id="divSearchDeliveryLocalityForCheckout" className="input-group" style={{ display: 'table' }}>
                                        <div className="localityCheckout">
                                          <div>
                                            <input type="text" id="txtDeliveryLocalityForCheckout"
                                              className="form-control" placeholder="Search Delivery Locality"
                                              onChange={(e) => autosuggestloaction(e)} value={detectlocview === true ? null : locationname} />
                                          </div>
                                          <div>
                                            <button type="button" id="btnUseMyLocationForCheckout" className="btn btn-secondary" onClick={() => detectmylocation()}>
                                              <i className="fa fa-map-marker"></i> Detect My Location <i ></i>
                                            </button>
                                          </div>
                                        </div>
                                        {
                                          enblesuggestion ?
                                            <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: '999', width: '280px' }}>
                                              <ul className="list-group" id="Suggestionlist" >
                                                {(Autolist || []).map((data,) => (
                                                  <li className="list-group-item checkout-delivery-autocomplete-div"
                                                    onClick={() => checkservice(data.description, data, data.place_id)}
                                                    data-placeid="ChIJYxUdQVlO4DsRQrA4CSlYRf4"> {data.description}</li>
                                                ))}
                                              </ul>
                                            </div>
                                            : null}
                                      </div>
                                      :
                                      <div className="col-sm-6">
                                        <label id="lblDeliveryLocalityForCheckout" >
                                          {localStorage.getItem('sublocalityvalue') && localStorage.getItem('sublocalityvalue') !== "" ? localStorage.getItem('sublocalityvalue') : atosuggestdadta.DefaultDeliveryLocality_Area} {localStorage.getItem('pincodevalue') && localStorage.getItem('pincodevalue') !== "" ? localStorage.getItem('pincodevalue') : atosuggestdadta.DefaultDeliveryLocality_Pincode}
                                          {/* {atosuggestdadta.DefaultDeliveryLocality_Address} */}
                                        </label>
                                        <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: 999, width: '280px' }}>
                                          <ul className="list-group" id="Suggestionlist"></ul>
                                        </div>
                                      </div>}
                                    {detectlocview ?
                                      <span className="deliveraddresscross">
                                        <a id="btnEditDeliveryLocalityForCheckout" href onClick={() => handleDetectClose()} >
                                          <i className="fa fa-window-close" style={{ cursor: 'pointer', fontSize: '16px' }}></i>
                                          {/* <button type="button" class="btn btn-secondary" style={{ cursor: 'pointer', fontSize: '16px' }}>Edit</button> */}
                                        </a>
                                      </span>
                                      :
                                      <div className="col-sm-3" >
                                        <a href
                                          onClick={editLocation}
                                          id="btnEditDeliveryLocalityForCheckout" >
                                          {/* <i className="fa fa-pencil" style={{ cursor: 'pointer', fontSize: '16px' }}></i> */}
                                          <button type="button" className="btn btn-secondary" style={{ cursor: 'pointer', fontSize: '16px' }}>Edit</button>
                                        </a>
                                      </div>
                                    }
                                  </div>
                                  <AddressForm
                                    editdata1={editdata} cancelform={cancelform} atosuggestdadta={atosuggestdadta} userdetail={userdetail} fetchaddress={fetchaddress} edit={edit} Pin={pin} editdata={userdetail} Address={locationname || searchaddress} AddressTypeName={customeraddress} fetchAddressOfIndexPage={fetchaddress} />
                                </div>
                                : null
                              }
                            </div>
                            {/* {edit ?
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addr_form" style={{ display: 'block' }}>
                                <div className="row delivery-area-box-container">
                                  <div className="col-sm-3" style={{ paddingTop: '10px' }}>
                                    <b>Delivery area</b>
                                  </div>
                                  <div className="col-sm-6" style={{ paddingTop: '10px' }}>
                                    <label id="lblDeliveryLocalityForCheckout">
                                      Baner, Pune, Maharashtra, India
                                    </label>
                                    <div id="divSearchDeliveryLocalityForCheckout" className="input-group" style={{ display: 'none' }}>
                                      <div className="row">
                                        <div className="col-sm-8">
                                          <input type="text" id="txtDeliveryLocalityForCheckout" className="form-control" placeholder="Search Delivery Locality" autoComplete="off" />
                                        </div>
                                        <div className="col-sm-4">
                                          <button type="button" id="btnUseMyLocationForCheckout" className="btn btn-secondary">
                                            <i className="fa fa-map-marker"></i> Detect My Location <i id="icnMyLocationSpinnerForCheckout" className="fa fa-spinner fa-spin" style={{ display: 'none' }}></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: '999', width: '280px' }}>
                                      <ul className="list-group" id="Suggestionlist" onClick="hidealert()"></ul>
                                    </div>
                                    <label id="lblTxtDeliveryLocalityValidation" style={{ color: 'red' }}></label>
                                  </div>
                                  <div className="col-sm-3" style={{ paddingTop: '16px' }}>
                                    <a href id="btnEditDeliveryLocalityForCheckout" data-title="Edit"><i className="fa fa-pencil" style={{ cursor: 'pointer', fontSize: '16px' }}></i></a>
                                  </div>
                                </div>
                                <AddressForm
                                  cancelform={cancelform} atosuggestdadta={atosuggestdadta} userdetail={userdetail} fetchaddress={fetchaddress} edit={edit} editdata={editdata} Pin={pin} />
                              </div>
                              : null
                            } */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div >
      <Footer />
    </>
  )
}
export default ManageAddress;