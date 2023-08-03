/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import '../../../assets1/css/default.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
// import { Alert } from 'react-bootstrap';
// import { toast, ToastContainer } from 'react-toastify';
import CheckoutAPI from '../MainPage/api/checkout';
import { selectdefaultaddress } from './actions';
import LocationApi from "../MainPage/api/Locationapi";
import { AddressForm } from './addressform';
import Constants from '../App/constants';
import { getlocationtitle } from '../LocationPopup/actions';
import Success from '../../components/ShowAlert/success';
import Warn from '../../components/ShowAlert/warn';
import { ConstantsValues } from '../MainPage/api/homeServices';
import logoanimation from '../../images/adibuja-logo-animation.gif'
export function AddressList(props) {
  // console.log('props', props);
  const [addnew, setaddnew] = useState(false)
  const [customeraddress, setcustomeraddress] = useState([])
  const [atosuggestdadta, setatosuggestdadta] = useState([])
  const [userdetail, setuserdetail] = useState([])
  const [editdata, seteditdata] = useState([])
  const [loading, setloading] = useState(false)
  const [saveaddress, setsaveaddress] = useState(false)
  const [list, setlist] = useState(false)
  const [detectlocview, setdetectlocview] = useState(false)
  const [locationname, setlocationname] = useState('')
  const [enblesuggestion, setenblesuggestion] = useState(false)
  const [Autolist, setAutolist] = useState([])
  const [pin, setPin] = useState('')
  const [updateaddress, setUpdateAddress] = useState('')
  // const [edit, setedit] = useState(false)
  const [cancelbutton, setcancelbutton] = useState(false)
  const [locationstatus, setLocationstatus] = useState(false)
  const [locationmsg, setLocationmsg] = useState('')
  const [warnstatus, setWarnstatus] = useState(false)
  // const [addressData,setaddressData]=useState([])
  const [addresslist, setaddresslist] = useState([])
  const [locationAPIData, setLocationAPIData] = useState('')
  const [locationBlock, setlocationBlock] = useState(false)
  // const [select, setselect] = useState(false)
  // const [isprimaybutton, setisprimaybutton] = useState(false)
  // const [disable, setdisable] = useState(false)
  const datalist = useSelector(state => state.proceedToBuy)
  console.log('daat', datalist);
  // const user = localStorage.getItem('User')
  // console.log({ user }, JSON.parse(user));
  // const [customeraddressID, setcustomeraddressID] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
    // if(user !== undefined){
    //   setuserdetail(JSON.parse(user))
    // }
    setuserdetail(
      {
        FirstName: localStorage.getItem('UserFirstName'),
        LastName: localStorage.getItem('UserLastName'),
        Phone: localStorage.getItem('UserLastPhone')
      }
    )
    if (props !== undefined) {
      setatosuggestdadta(props.atosuggestdadta)
    }
  }, [props])
  useEffect(() => {
    fetchaddress()
    // dispatch(selectdefaultaddress(CustomerAddressId))
  }, [datalist, addnew, list]);
  function fetchAddressOfIndexPage() {
    // alert('fetchaddress---72')
    props.fetchaddresslist()
  }
  function fetchaddress() {
    setloading(true)
    CheckoutAPI.getcustomeraddress({})
      .then(response => {
        setloading(false)
        setcustomeraddress(response)
        console.log('customeraddress--', customeraddress)
        const res = JSON.stringify(response)
        const resParse = JSON.parse(res)
        console.log('resParse--', resParse)
        if (resParse.length === 0) {
          props.hideChooseDeliveryTimeSlot(true)
        }
        // if (customeraddress.length > 0) {
        //   props.hideChooseDeliveryTimeSlot(false)
        // }
        // props.hideChooseDeliveryTimeSlot(true)
        // setlist(true)
        // setisprimaybutton(response)
        // setcustomeraddressID(response.CustomerAddressId)
        // data = response
      })
  }
  // useEffect(() => {
  //   setisprimaybutton(customeraddress.filter(
  //     button => button.isPrimary === true))
  // }, [customeraddress])
  const addNewaddress = () => {
    setsaveaddress(true)
    setlist(true)
    props.hideChooseDeliveryTimeSlot(true)
  }
  // function addressdelete(Id) {
  //   console.log('zbbx', Id);
  //   CheckoutAPI.deleteaddress(Id)
  //     .then(response => {
  //       console.log('uuuuu', response)
  //       toast(response)
  //       fetchaddress()
  //     })
  //     .catch(error => {
  //       toast(error)
  //       console.log('error:::', error);
  //     });
  // }
  useEffect(() => {
    if (customeraddress && customeraddress.length > 0) {
      setaddresslist(customeraddress)
    }
  }, [customeraddress])
  useEffect(() => {
    // setuserdetail(JSON.parse(user))
    LocationApi.GoogleApi({})
      .then(response => {
        const data = response
        setLocationAPIData(data)
      })
  }, [])
  const slectaddress = (CustomerAddressId, data) => {
    console.log("data==================", data, CustomerAddressId);
    // if (ZipCode !== '411045') {
    //   alert('Opps ! It seems currently we are not serving in your pincode, try selecting some other pincode. not available here')
    // } else
    dispatch(selectdefaultaddress(CustomerAddressId))
    // setisprimaybutton(true)
    // setdisable(true)
    //  setaddressData(data)
    if (data.CustomerAddressId === CustomerAddressId) {
      const form = {
        // 'token': token,
        "DeliveryLocalityPlaceId": data.DeliveryLocalityPlaceId,
        // "CustomerId": props.edit === true ? props.editdata.CustomerId : props.userdetail.CustomerId,
        "CustomerId": 0,
        "DeliveryLocalityCity": data.DeliveryLocalityCity,
        "billingButton": false,
        "DeliveryLocalityAddress": data.DeliveryLocalityAddress,
        "DeliveryLocalityLatitude": data.DeliveryLocalityLatitude,
        "Additional_info": null,
        "AddressTypeId": data.AddressTypeId,
        "DeliveryLocalityArea": data.DeliveryLocalityArea,
        "DeliveryLocalityState": data.DeliveryLocalityState,
        "Address2": data.Address2,
        "AddressTypeName": data.AddressTypeName,
        "StateCode": "MH",
        "DeliveryLocalityPinCode": data.ZipCode,
        // "FirstName": data.FirstName,
        "FirstName": data.FirstName,
        "AddressName": data.AddressName,
        // "City": data.City,
        "City": data.City,
        "CustomerAddressId": data.CustomerAddressId,
        "DeliveryLocalityCountry": "India",
        "Email": null,
        "Fax": null,
        "CountryCode": "IN",
        // "Address1": data.Address1,
        "Address1": data.Address1,
        "ZipCode": data.ZipCode,
        "IsLogicallyDeleted": false,
        "State": data.State,
        "DeliveryLocalityLongitude": data.DeliveryLocalityLongitude,
        "showDefaultButton": data.showDefaultButton,
        "Consignee": null,
        // "isPrimary": !!props.edit,
        "isPrimary": true,
        "Country": "India",
        // "Mobile": data.Mobile,
        "Mobile": data.Mobile,
        "IsprimaryBilling": data.IsprimaryBilling,
        // "LastName": data.LastName,
        "LastName": data.LastName,
        "Company": null,
        "isBillingAddress": data.isBillingAddress,
        "Title": null,
      }
      localStorage.setItem('pincodevalue', data.ZipCode)
      const token = localStorage.getItem('generatedtoken');
      console.log('hggh', form,);
      fetch(`${Constants.urls.baseUrl}${Constants.endPoints.updateaddress}clientid=${'1'}&customerGuid=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form)
      })
        .then(res => res.text())
        .then(addressresponse => {
          console.log('registerresponse', addressresponse)
          fetchaddress()
          // alert(addressresponse)
          // toast(addressresponse)
        });
    }
  }
  console.log("atosuggestdadta", props.atosuggestdadta);
  // useEffect(()=>{
  //   if (datalist && datalist.Defaultaddress) {
  //     // Alert('d', datalist.Defaultaddress)
  //     console.log('sss', datalist.Defaultaddress);
  //     const form = {
  //       // 'token': token,
  //       "DeliveryLocalityPlaceId": addressData.DeliveryLocalityPlaceId,
  //       // "CustomerId": props.edit === true ? props.editaddressData.CustomerId : props.userdetail.CustomerId,
  //       "CustomerId": 0,
  //       "DeliveryLocalityCity": addressData.DeliveryLocalityCity,
  //       "billingButton": false,
  //       "DeliveryLocalityAddress": addressData.DeliveryLocalityAddress,
  //       "DeliveryLocalityLatitude": addressData.DeliveryLocalityLatitude,
  //       "Additional_info": null,
  //       "AddressTypeId": addressData.AddressTypeId,
  //       "DeliveryLocalityArea": addressData.DeliveryLocalityArea,
  //       "DeliveryLocalityState": addressData.DeliveryLocalityState,
  //       "Address2": addressData.Address2,
  //       "AddressTypeName": addressData.AddressTypeName,
  //       "StateCode": "MH",
  //       "DeliveryLocalityPinCode": addressData.ZipCode,
  //       // "FirstName": addressData.FirstName,
  //       "FirstName": addressData.FirstName,
  //       "AddressName": addressData.AddressName,
  //       // "City": addressData.City,
  //       "City": addressData.City,
  //       "CustomerAddressId": addressData.CustomerAddressId,
  //       "DeliveryLocalityCountry": "India",
  //       "Email": null,
  //       "Fax": null,
  //       "CountryCode": "IN",
  //       // "Address1": addressData.Address1,
  //       "Address1": addressData.Address1,
  //       "ZipCode": addressData.ZipCode,
  //       "IsLogicallyDeleted": false,
  //       "State": addressData.State,
  //       "DeliveryLocalityLongitude": addressData.DeliveryLocalityLongitude,
  //       "showDefaultButton": addressData.showDefaultButton,
  //       "Consignee": null,
  //       // "isPrimary": !!props.edit,
  //       "isPrimary": addressData.isPrimary,
  //       "Country": "India",
  //       // "Mobile": addressData.Mobile,
  //       "Mobile": addressData.Mobile,
  //       "IsprimaryBilling": addressData.IsprimaryBilling,
  //       // "LastName": addressData.LastName,
  //       "LastName": addressData.LastName,
  //       "Company": null,
  //       "isBillingAddress": addressData.isBillingAddress,
  //       "Title": null,
  //     }
  //     const token = localStorage.getItem('generatedtoken');
  //     console.log('hggh', form,);
  //     return fetch(`${Constants.urls.baseUrl}${Constants.endPoints.updateaddress}clientid=${'1'}&customerGuid=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`, {
  //       method: 'POST',
  //       headers: {
  //         accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(form)
  //     })
  //       .then(res => res.text())
  //       .then(addressresponse => {
  //         console.log('registerresponse', addressresponse)
  //         fetchaddress()
  //         // alert(addressresponse)
  //         // toast(addressresponse)
  //       });
  //   }
  // },[datalist && datalist.Defaultaddress,addressData])
  const cancelform = () => {
    setaddnew(false)
    props.hideChooseDeliveryTimeSlot(false)
  }
  const cancelform1 = () => {
    setcancelbutton(true)
    setaddnew(false)
    props.hideChooseDeliveryTimeSlot(false)
  }
  // setedit()
  const Loadaddressform = (todo) => {
    setaddnew(true)
    seteditdata(todo)
    props.hideChooseDeliveryTimeSlot(true)
  }
  const cancelformsave = () => {
    setsaveaddress(false)
    setlist(false)
    props.hideChooseDeliveryTimeSlot(false)
  }
  // useEffect(() => {
  //   if (
  //     addresslist && addresslist.map(data => data.isPrimary) === true) {
  //     setselect(true)
  //   }
  // })
  const editLocation = () => {
    setdetectlocview(true)
    setUpdateAddress(locationname)
    // setlocationname('')
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
            console.log("checkkk", check);
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
            } else {
              console.log("you are here")
              setWarnstatus(true)
              setLocationmsg(`Address not found! Please search again`)
              setTimeout(() => {
                setlocationname('')
                props.fetchToggle()
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
                    setLocationstatus(true)
                    setLocationmsg('Delivery location is updated ')
                    setTimeout(() => {
                      setLocationstatus(false)
                    }, 500);
                    setPin(pincode)
                    console.log("address[0].long_name", address.long_name, address[0].long_name, address[1].long_name, address[2].long_name);
                    setUpdateAddress(address[1].long_name)
                    dispatch(getlocationtitle(address[0].long_name, pincode[0].long_name, true))
                  } else {
                    setWarnstatus(true)
                    setLocationmsg(`We are currently operational in Pune (selected locations). We're working on it and hang tight, we will serve you very soon!`)
                    setTimeout(() => {
                      setlocationname('')
                      setWarnstatus(false)
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
      let keyForGoogleAPI = "";
      if (atosuggestdadta && atosuggestdadta.GooglePlacesApiKey) {
        keyForGoogleAPI = atosuggestdadta.GooglePlacesApiKey;
      } else {
        LocationApi.GoogleApi({})
          .then(response => {
            console.log(`detectlocationKey${JSON.stringify(response)}`)
            keyForGoogleAPI = response.GooglePlacesApiKey;
          });
      }
      fetch(`${Constants.endPoints.geocode}key=${keyForGoogleAPI}&latlng=${position.coords.latitude},${position.coords.longitude}&sensor=${true}`, {
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
                // setSearchAddress(address[0].long_name)
                setLocationstatus(true)
                setLocationmsg('Delivery location is updated ')
                setTimeout(() => {
                  setLocationstatus(false)
                  props.fetchToggle()
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
  useEffect(() => {
    if (locationstatus === true && pin !== '') {
      setdetectlocview(false)
    }
  }, [pin, updateaddress, locationstatus])
  useEffect(() => {
    setInterval(() => {
      setLocationstatus(false)
    }, 5000);
  }, [closemsg])
  const closemsg = () => {
  }
  const handleDetectClose = () => {
    setdetectlocview(false)
    // setlocationname('')
  }
  useEffect(() => {
    setUpdateAddress(locationname)
  }, [locationname])
  /* useEffect(() => {
    if (addresslist && addresslist.length > 0) {
      addresslist.forEach((data) => {
        if (data.isPrimary) {
          localStorage.setItem('sublocalityvalue', data.Address1)
          localStorage.setItem('pincodevalue', data.ZipCode)
        }
      })
    }
  }, [addresslist]) */
  // useEffect(() => {
  //   props.fetchaddresslist
  // }, [])
  console.log({ userdetail }, "!customeraddress.length", !customeraddress.length, userdetail, props.atosuggestdadta);
  console.log("addresslist", addresslist, "updateaddress", updateaddress, "locationname", locationname, editdata);
  return (
    loading === true ?
      // change css
      <div className='row'>
        <div className='col-lg-12 text-center mt-25 mb-25' >
          <img src={logoanimation} alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
          {/* <i
            style={{ justifySelf: 'center' }}
            className="fa fa-spin fa-spinner fa-4x"></i> */}
        </div>
      </div>
      :
      !customeraddress.length ?
        <div>
          {/* <ToastContainer /> */}
          {locationstatus && <Success msg={locationmsg} close={closemsg} />}
          {warnstatus && <Warn msg={locationmsg} close={closemsg} />}
          {cancelbutton ?
            <p id="shippingnewaddressbtn">
              <button className="btn btn-default" type='button' id="shippingnewaddress"
                onClick={addNewaddress}
              > <i className="fa fa-plus"></i>&nbsp; Add New Address</button>
            </p> :
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addr_form" style={{ display: 'block' }}>
              {locationBlock && <span style={{ color: 'red' }}>Sorry! Geo Location is not supported on your current browser! Please check your browser settings.</span>}
              <div className="row delivery-area-box-container">
                <div className="col-sm-3" style={{ paddingTop: '10px' }}>
                  <b>Delivery area</b>
                </div>
                {detectlocview ?
                  <div>
                    <div id="divSearchDeliveryLocalityForCheckout" className="input-group" style={{ display: 'table' }}>
                      <div className="row">
                        <div className="col-sm-8">
                          <input type="text" id="txtDeliveryLocalityForCheckout"
                            className="form-control" placeholder="Search Delivery Locality"
                            onChange={(e) => autosuggestloaction(e)} value={detectlocview === true ? null : locationname} />
                        </div>
                        <div className="col-sm-4">
                          <button type="button" id="btnUseMyLocationForCheckout" className="btn btn-secondary" onClick={() => detectmylocation()}>
                            <i className="fa fa-map-marker"></i> Detect My Location <i ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    {
                      enblesuggestion ?
                        <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: '999', width: '280px' }}>
                          <ul className="list-group" id="Suggestionlist" >
                            {(Autolist || []).map((data,) => (
                              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                              <li className="list-group-item checkout-delivery-autocomplete-div"
                                onClick={() => checkservice(data.description, data, data.place_id)}
                                data-placeid="ChIJYxUdQVlO4DsRQrA4CSlYRf4"> {data.description}</li>
                            ))}
                          </ul>
                        </div>
                        : null}
                  </div>
                  :
                  <div className="col-sm-6" style={{ paddingTop: '10px' }}>
                    <label id="lblDeliveryLocalityForCheckout" >
                      {(locationname || editdata.Address2) ? (locationname || editdata.Address2) : 'Baner, Pune, Maharashtra, India, 411045'}&nbsp;{pin ? pin[0].long_name : editdata.ZipCode}
                    </label>
                    <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: 999, width: '280px' }}>
                      <ul className="list-group" id="Suggestionlist"></ul>
                    </div>
                  </div>}
                {detectlocview ?
                  <div className="col-sm-3" style={{ paddingTop: '16px' }}>
                    <a id="btnEditDeliveryLocalityForCheckout" href onClick={() => handleDetectClose()} ><i className="fa fa-window-close" style={{ cursor: 'pointer', fontSize: '16px', marginLeft: '150px' }}></i></a>
                  </div>
                  :
                  <div className="col-sm-3" style={{ paddingTop: '16px' }}>
                    <a href
                      onClick={editLocation}
                      id="btnEditDeliveryLocalityForCheckout" >
                      {/* <i className="fa fa-pencil" style={{ cursor: 'pointer', fontSize: '16px' }}></i> */}
                      <button type="button" className="btn btn-secondary" style={{ cursor: 'pointer', fontSize: '16px' }}>Edit</button>
                    </a>
                  </div>
                }
              </div>
              {/* {alert('658')} */}
              {/* <AddressForm  editdata1={editdata}  cancelform={cancelform1} atosuggestdadta={atosuggestdadta} userdetail={userdetail} fetchaddress={fetchaddress} edit={false} /> */}
              <AddressForm
                editdata1={editdata} cancelform={cancelform1} atosuggestdadta={atosuggestdadta} userdetail={userdetail} fetchaddress={fetchaddress} edit={false} Pin={pin} editdata={userdetail} AddressTypeName={customeraddress} Address={locationname || updateaddress} fetchAddressOfIndexPage={fetchAddressOfIndexPage} />
            </div>
          }
          {
            addnew ?
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addr_form" style={{ display: 'block' }}>
                {locationBlock && <span style={{ color: 'red' }}>Sorry! Geo Location is not supported on your current browser! Please check your browser settings.</span>}
                <div className="row delivery-area-box-container">
                  <div className="col-sm-3" style={{ paddingTop: '10px' }}>
                    <b>Delivery area</b>
                  </div>
                  {detectlocview ?
                    <div>
                      <div id="divSearchDeliveryLocalityForCheckout" className="input-group" style={{ display: 'table' }}>
                        <div className="row">
                          <div className="col-sm-8">
                            <input type="text" id="txtDeliveryLocalityForCheckout"
                              className="form-control" placeholder="Search Delivery Locality"
                              onChange={(e) => autosuggestloaction(e)} value={detectlocview === true ? null : locationname} />
                          </div>
                          <div className="col-sm-4">
                            <button type="button" id="btnUseMyLocationForCheckout" className="btn btn-secondary" onClick={() => detectmylocation()}>
                              <i className="fa fa-map-marker"></i> Detect My Location <i ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      {
                        enblesuggestion ?
                          <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: '999', width: '280px' }}>
                            <ul className="list-group" id="Suggestionlist" >
                              {(Autolist || []).map((data,) => (
                                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                                <li className="list-group-item checkout-delivery-autocomplete-div"
                                  onClick={() => checkservice(data.description, data, data.place_id)}
                                  data-placeid="ChIJYxUdQVlO4DsRQrA4CSlYRf4"> {data.description}</li>
                              ))}
                            </ul>
                          </div>
                          : null}
                    </div>
                    :
                    <div className="col-sm-6" style={{ paddingTop: '10px' }}>
                      <label id="lblDeliveryLocalityForCheckout" >
                        {(locationname || updateaddress) ? (locationname || updateaddress) : editdata.Address2},&nbsp;{pin ? pin[0].long_name : editdata.ZipCode}
                      </label>
                      <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: 999, width: '280px' }}>
                        <ul className="list-group" id="Suggestionlist"></ul>
                      </div>
                    </div>}
                  {detectlocview ?
                    <div className="col-sm-3" style={{ paddingTop: '16px' }}>
                      <a id="btnEditDeliveryLocalityForCheckout" href onClick={() => handleDetectClose()} ><i className="fa fa-window-close" style={{ cursor: 'pointer', fontSize: '16px' }}></i></a>
                    </div>
                    :
                    <div className="col-sm-3" style={{ paddingTop: '16px' }}>
                      <a href
                        onClick={editLocation}
                        id="btnEditDeliveryLocalityForCheckout" ><i className="fa fa-pencil" style={{ cursor: 'pointer', fontSize: '16px' }}></i></a>
                    </div>
                  }
                </div>
                {/* {alert('723')} */}
                {/* <AddressForm
                  cancelform={cancelform} atosuggestdadta={atosuggestdadta} userdetail={userdetail} fetchaddress={fetchaddress} Pin={pin} Address={updateaddress} /> */}
                <AddressForm
                  editdata1={editdata} cancelform={cancelform} atosuggestdadta={atosuggestdadta} userdetail={userdetail} fetchaddress={fetchaddress} edit={false} Pin={pin} editdata={userdetail} AddressTypeName={customeraddress} Address={locationname || updateaddress} fetchAddressOfIndexPage={fetchAddressOfIndexPage} />
              </div>
              : null}
          {list === false ?
            <div className='row' id="checkoutaddress" style={{ display: "flex" }}>
              {(addresslist || []).map(data => (
                <div className="col-lg-6 col-xl-4" >
                  {/* <div className="col-lg-12 col-xl-4" > */}
                  <div className="product-item mt-2">
                    <div className="product-caption">
                      {/* {data.isPrimary ? null :
                        <a href
                          style={{ float: 'right' }}
                          onClick={() => addressdelete(data.CustomerAddressId)}>
                          <i className="fa fa-window-close"
                            style={{ cursor: 'pointer', fontSize: '16px', }}></i>
                        </a>
                      } */}
                      <div className="mb-2">
                        <div className="mb-15 address-detail">
                          <h3>{data.AddressTypeName}</h3>
                          {data.FirstName} {data.LastName}
                          <br />
                          {data.Address1} {data.Address2} {data.ZipCode}
                          <br />
                          <span>Mobile: {data.Mobile}</span>
                        </div>
                        <button type="button"
                          // disabled
                          // aria-disabled={!!data.isPrimary}
                          className="btn btn-success set-shipping-address btn-rfq checkout_btn default-address btn-fix" disabled={data.isPrimary} id="SelectedShipping" onClick={() => slectaddress(data.CustomerAddressId, data)} style={{ margin: '1px' }}>
                          <i className="fa fa-check-square-o"></i> {data.isPrimary ? 'Selected' : 'Select'}
                        </button>
                        <button style={{ margin: '1px' }}
                          className="btn btn-success set-shipping-address btn-rfq checkout_btn default-address btn-fix fa fa-edit" type="button" onClick={() => Loadaddressform(data)}>
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              ))}
            </div> : null}
        </div>
        :
        <>
          {/* <ToastContainer /> */}
          {locationstatus && <Success msg={locationmsg} close={closemsg} />}
          {warnstatus && <Warn msg={locationmsg} close={closemsg} />}
          <div className="address-view" >
            {list === false ?
              <div className='row' id="checkoutaddress" style={{ display: "flex" }}>
                {(addresslist || []).map(data => (
                  <div className="col-lg-6 col-xl-4" >
                    {/* <div className="col-lg-12 col-xl-4" > */}
                    <div className="product-item mt-2">
                      <div className="product-caption">
                        {/* {data.isPrimary ? null :
                        <a href
                          style={{ float: 'right' }}
                          onClick={() => addressdelete(data.CustomerAddressId)}>
                          <i className="fa fa-window-close"
                            style={{ cursor: 'pointer', fontSize: '16px', }}></i>
                        </a>
                      } */}
                        <div className="mb-2">
                          <div className="mb-15 address-detail">
                            <h3>{data.AddressTypeName}</h3>
                            <div>
                              {data.FirstName}&nbsp;{data.LastName}&nbsp;
                            </div>
                            <br />
                            <div>
                              <span>{data.Address1}, {data.Address2},&nbsp;</span>
                              <span>{data.City},</span>
                              <span> {data.DeliveryLocalityState},</span>
                              <span> {data.Country},</span>
                              <span> {data.ZipCode}&nbsp;</span>
                            </div>
                            <br />
                            <span>Mobile: {data.Mobile}</span>
                          </div>
                          <button type="button" data-print={JSON.stringify(data)}
                            // disabled
                            // aria-disabled={!!data.isPrimary}
                            className="btn btn-secondary set-shipping-address btn-rfq checkout_btn default-address btn-fix" disabled={data.isPrimary} id="SelectedShipping" onClick={() => slectaddress(data.CustomerAddressId, data)} style={{ marginLeft: '1px' }}>
                            <i className="fa fa-check-square-o"></i> {data.isPrimary ? 'Selected' : 'Select'}
                          </button>
                          <button style={{ margin: '1px' }}
                            className="btn btn-secondary set-shipping-address btn-rfq checkout_btn default-address btn-fix fa fa-edit" type="button" onClick={() => Loadaddressform(data)}>
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                ))}
              </div> : null}
            {/* <div className="col-md-8 addr_form" id="frm_address_container"></div>
            <div className="ship-box-info mt-4" style={{ display: 'none' }}>
              <div id="frm_address_container" className="">
              </div>
            </div> */}
          </div>
          {
            saveaddress ?
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addr_form" style={{ display: 'block' }}>
                {locationBlock && <span style={{ color: 'red' }}>Sorry! Geo Location is not supported on your current browser! Please check your browser settings.</span>}
                <div className="row delivery-area-box-container mr-0">
                  {/* <div> */}
                  <p className='text-nowrap'><b>Delivery area</b></p>
                  {/* </div> */}
                  {detectlocview ?
                    <div className='locationInput'>
                      <div id="divSearchDeliveryLocalityForCheckout">
                        <div className='searchLocality'>
                          <div className="mr-3">
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
                      </div>
                      {
                        enblesuggestion ?
                          <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: '999', width: '280px' }}>
                            <ul className="list-group" id="Suggestionlist" >
                              {(Autolist || []).map((data,) => (
                                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                                <li className="list-group-item checkout-delivery-autocomplete-div"
                                  onClick={() => checkservice(data.description, data, data.place_id)}
                                  data-placeid="ChIJYxUdQVlO4DsRQrA4CSlYRf4"> {data.description}</li>
                              ))}
                            </ul>
                          </div>
                          : null}
                    </div>
                    :
                    <div>
                      <label id="lblDeliveryLocalityForCheckout" >
                        {/* (updateaddress || locationname) ? (updateaddress || locationname) : atosuggestdadta.DefaultDeliveryLocality_Address},&nbsp;{pin ? pin[0].long_name : editdata.ZipCode */}
                        {localStorage.getItem('sublocalityvalue') && localStorage.getItem('sublocalityvalue').trim() !== "" ? localStorage.getItem('sublocalityvalue') : locationAPIData.DefaultDeliveryLocality_Area} {localStorage.getItem('pincodevalue') && localStorage.getItem('pincodevalue') !== "" ? localStorage.getItem('pincodevalue') : locationAPIData.DefaultDeliveryLocality_Pincode}
                      </label>
                      <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: 999, width: '280px' }}>
                        <ul className="list-group" id="Suggestionlist"></ul>
                      </div>
                    </div>}
                  {detectlocview ?
                    <div id="checkoutcrossbar">
                      <a id="btnEditDeliveryLocalityForCheckout" href onClick={() => handleDetectClose()} ><i className="fa fa-window-close" style={{ cursor: 'pointer', fontSize: '16px' }}></i></a>
                    </div>
                    :
                    <div>
                      <a href
                        onClick={editLocation}
                        id="btnEditDeliveryLocalityForCheckout" ><i className="fa fa-pencil" style={{ cursor: 'pointer', fontSize: '16px' }}></i></a>
                    </div>
                  }
                </div>
                {/* {alert('885')} */}
                {/* <AddressForm cancelform={cancelformsave} atosuggestdadta={atosuggestdadta} userdetail={userdetail} edit={false} setlist={setlist} Pin={pin} Address={updateaddress} /> */}
                <AddressForm
                  editdata1={editdata} cancelform={cancelformsave} atosuggestdadta={atosuggestdadta} userdetail={userdetail} fetchaddress={fetchaddress} edit={false} setlist={setlist} Pin={pin} editdata={userdetail} AddressTypeName={customeraddress} Address={locationname || updateaddress} fetchAddressOfIndexPage={fetchAddressOfIndexPage} />
              </div>
              : null
          }
          <br />
          {addnew || list ? null :
            <p id="shippingnewaddressbtn">
              {/* <Link hrefclassName="btn btn-default" id="shippingnewaddress" > <i className="fa fa-plus"></i>&nbsp; Add New Address</Link> */}
              <button className="btn btn-default" type='button' id="shippingnewaddress"
                onClick={addNewaddress}
              > <i className="fa fa-plus"></i>&nbsp; Add New Address</button>
            </p>
          }
          {
            addnew ?
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 addr_form" style={{ display: 'block' }}>
                {locationBlock && <span style={{ color: 'red' }}>Sorry! Geo Location is not supported on your current browser! Please check your browser settings.</span>}
                <div className="row delivery-area-box-container">
                  <div className="col-sm-2">
                    <b>Delivery area1</b>
                  </div>
                  {detectlocview ?
                    <div className='col-sm-8'>
                      <div id="divSearchDeliveryLocalityForCheckout" className="input-group" style={{ display: 'table' }}>
                        <div className="row">
                          <div className="col-sm-8">
                            <input type="text" id="txtDeliveryLocalityForCheckout"
                              className="form-control" placeholder="Search Delivery Locality"
                              onChange={(e) => autosuggestloaction(e)} value={detectlocview === true ? null : locationname} />
                          </div>
                          <div className="col-sm-4">
                            <button type="button" id="btnUseMyLocationForCheckout" className="btn btn-secondary" onClick={() => detectmylocation()}>
                              <i className="fa fa-map-marker"></i> Detect My Location <i ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      {
                        enblesuggestion ?
                          <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: '999', width: '280px' }}>
                            <ul className="list-group" id="Suggestionlist" >
                              {(Autolist || []).map((data,) => (
                                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                                <li className="list-group-item checkout-delivery-autocomplete-div"
                                  onClick={() => checkservice(data.description, data, data.place_id)}
                                  data-placeid="ChIJYxUdQVlO4DsRQrA4CSlYRf4"> {data.description}</li>
                              ))}
                            </ul>
                          </div>
                          : null}
                    </div>
                    :
                    <div className="col-sm-8">
                      <label id="lblDeliveryLocalityForCheckout" >
                        {/* locationname || editdata.Address2},&nbsp; {pin ? pin[0].long_name : editdata.ZipCode */}
                        {localStorage.getItem('sublocalityvalue') && localStorage.getItem('sublocalityvalue') !== "" ? localStorage.getItem('sublocalityvalue') : locationAPIData.DefaultDeliveryLocality_Area} {localStorage.getItem('pincodevalue') && localStorage.getItem('pincodevalue') !== "" ? localStorage.getItem('pincodevalue') : locationAPIData.DefaultDeliveryLocality_Pincode}
                      </label>
                      <div id="divDeliveryLocalitySuggestionsForCheckout" style={{ position: 'absolute', zIndex: 999, width: '280px' }}>
                        <ul className="list-group" id="Suggestionlist"></ul>
                      </div>
                    </div>}
                  {detectlocview ?
                    <div className="col-sm-2">
                      <a id="btnEditDeliveryLocalityForCheckout" href onClick={() => handleDetectClose()} ><i className="fa fa-window-close" style={{ cursor: 'pointer', fontSize: '16px' }}></i></a>
                    </div>
                    :
                    <div className="col-sm-2">
                      <a href
                        onClick={editLocation}
                        id="btnEditDeliveryLocalityForCheckout" ><i className="fa fa-pencil" style={{ cursor: 'pointer', fontSize: '16px' }}></i></a>
                    </div>
                  }
                </div>
                {/* {alert('961')} */}
                {/* <AddressForm cancelform={cancelform} atosuggestdadta={atosuggestdadta} editdata={editdata} edit
                  fetchaddress={fetchaddress} Pin={pin} Address={updateaddress} /> */}
                <AddressForm
                  editdata1={editdata} cancelform={cancelform} atosuggestdadta={atosuggestdadta} userdetail={userdetail} fetchaddress={fetchaddress} edit Pin={pin} editdata={userdetail} AddressTypeName={customeraddress} Address={locationname || updateaddress} fetchAddressOfIndexPage={fetchAddressOfIndexPage} />
              </div>
              : null
          }
        </>
  )
}
export default compose(
)(AddressList);