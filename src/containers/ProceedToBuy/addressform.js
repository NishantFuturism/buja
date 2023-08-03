/* eslint-disable no-const-assign */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import { string } from 'prop-types';
import Constants from '../App/constants';
import Input from '../HomePage/Input';
import { ConstantsValues } from '../MainPage/api/homeServices';
import CheckoutAPI from '../MainPage/api/checkout';
import { } from './actions';
// import { updateprofile } from '../MyAccount/actions'
import ProfileAPI from '../MainPage/api/profile';
export function AddressForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log('props---', props);
  const [atosuggestdadta, setatosuggestdadta] = useState([])
  console.log('atosuggestdadta---', atosuggestdadta)
  const [refreshlist, setrefreshlist] = useState(false)
  // const [ciustomerid, setciustomerid] = useState('')
  // const [phonuser, setphonuser] = useState('')
  // const [customeraddressid, setcustomeraddressid] = useState(0)
  const [Seleced, setSeleced] = useState('');
  const [Firstname, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [LastName, setLastName] = useState();
  const [lastNameError, setLastNameError] = useState(false);
  console.log('Firstname--', Firstname)
  const [mobNo, setMobno] = useState();
  const [mobileNoError, setMobileNoError] = useState(false);
  const [address1, setAddress1] = useState();
  const [address1Error, setAddress1Error] = useState(false);
  const [userCity, setUserCity] = useState();
  const [userCityError, setUserCityError] = useState(false);
  const [customerAddressList, setCustomerAddressList] = useState([])
  const [showInfoPopUP, setShowInfoPopUP] = useState(false)
  console.log('customerAddressList---', customerAddressList.length)
  const sortByfiltersList = [{ ListItem: 'Other', id: 3, value: 'Other' }, { ListItem: ' Home Address', id: 1, value: 'Home Address' }, { ListItem: ' Work/Office Address', id: 2, value: 'Work/Office Address' }]
  // const [lastname, setlastname]=useState([])
  const addressform = useSelector(state => state.proceedToBuy)
  console.log({ addressform });
  // const dispatch = useDispatch();
  // const encodedData = window.btoa(response.GUID); // encode a string                             
  // console.log("getcustomerbyphone", encodedData);
  // localStorage.setItem('CustGUID', encodedData)
  // console.log("getcustomerbyphone", response);
  // const encodedFirstName = localStorage.getItem('UserFirstName');
  // const Firstname = encodedFirstName;
  // const lastname = window.atob(localStorage.getItem('UserLastName'))
  const phone = localStorage.getItem('UserLastPhone')
  const addresstype = props.AddressTypeName.map(id => id.AddressTypeName)
  console.log("addresstype", addresstype);
  const addresstypelist = [...new Set(addresstype)];
  console.log("addresstypelist", addresstypelist);
  const profileReducer = useSelector(state => state.myAccount)
  console.log('profileReducer--', profileReducer)
  // useEffect(() => {
  //   if (props.userdetail !== undefined) {
  //     setlastname(props.userdetail.customerlogindata)
  //   }
  // }, [props.userdetail])
  // useEffect(() => {
  //   onSubmit()
  // }, [])
  // useEffect(() => {
  //   if (props.editdata !== undefined) {
  //     setcustomeraddressid(props.editdata.CustomerAddressId)
  //   }
  // })
  // useEffect(() => {
  //   if (props.userdetail !== undefined) {
  //     setciustomerid(props.userdetail.CustomerId)
  //   }
  // }, [])
  useEffect(() => {
    if (phone === null) {
      // setphonuser('')
    }
  }, [phone])
  useEffect(() => {
    if (props !== undefined) {
      setatosuggestdadta(props.atosuggestdadta)
      // setlastname(props.userdetail.customerlogindata.LastName)
    }
  }, [props])
  useEffect(() => {
    fetchaddress()
  }, [])
  function fetchaddress() {
    // alert('fetchaddresslist from index')
    CheckoutAPI.getcustomeraddress({})
      .then(response => {
        setCustomerAddressList(response)
      }).catch(err => {
        throw err;
      });
  }
  // const onSubmit = (data) => {
  //   console.log('data', data, props.userdetail);
  //   // dispatch(updateaAddress(data))
  //   // console.log(document.getElementById('btnSaveCustAddress'))
  //   const token = localStorage.getItem('generatedtoken');
  //   const formdata = JSON.stringify({
  //     "CustomerAddressId": customeraddressid,
  //     "AddressTypeId": data.AddressTypeId,
  //     "Title": "string",
  //     "FirstName": data.FirstName,
  //     "LastName": data.LastName,
  //     "Mobile": data.Mobile,
  //     "CustomerId": '37936',
  //     "Address1": data.Address1,
  //     "Address2": data.Address2,
  //     "City": data.City,
  //     "StateCode": null,
  //     "State": "string",
  //     "CountryCode": data.CountryCode,
  //     "Country": data.CountryCode,
  //     "ZipCode": data.ZipCode,
  //     "isPrimary": false,
  //     "AddressName": null,
  //     "IsLogicallyDeleted": true,
  //     "Consignee": null,
  //     "isBillingAddress": 0,
  //     "Additional_info": null,
  //     "Company": null,
  //     "Email": null,
  //     "Fax": null,
  //     "IsprimaryBilling": false,
  //     "AddressTypeName": "string",
  //     "DeliveryLocalityLatitude": atosuggestdadta.DefaultDeliveryLocality_Lat,
  //     "DeliveryLocalityLongitude": atosuggestdadta.DefaultDeliveryLocality_Long,
  //     "DeliveryLocalityPlaceId": atosuggestdadta.DefaultDeliveryLocality_PlaceId,
  //     "DeliveryLocalityAddress": atosuggestdadta.DefaultDeliveryLocality_Address,
  //     "DeliveryLocalityArea": atosuggestdadta.DefaultDeliveryLocality_Area,
  //     "DeliveryLocalityCity": atosuggestdadta.DefaultDeliveryLocality_City,
  //     "DeliveryLocalityState": atosuggestdadta.DefaultDeliveryLocality_State,
  //     "DeliveryLocalityCountry": "",
  //     "DeliveryLocalityPinCode": atosuggestdadta.DefaultDeliveryLocality_Pincode,
  //     "billingButton": false,
  //     "showDefaultButton": false
  //   })
  //   const formdata =
  //     JSON.stringify({
  //       CustomerAddressId: customeraddressid,
  //       AddressTypeId: data.AddressTypeId,
  //       Title: "string",
  //       FirstName: data.FirstName,
  //       LastName: data.LastName,
  //       Mobile: data.Mobile,
  //       CustomerId: ciustomerid,
  //       Address1: data.Address1,
  //       Address2: data.Address2,
  //       City: data.City,
  //       StateCode: "string",
  //       State: "Mharashtra",
  //       CountryCode: data.CountryCode,
  //       Country: "India",
  //       ZipCode: data.ZipCode,
  //       isPrimary: false,
  //       AddressName: data.City,
  //       IsLogicallyDeleted: true,
  //       Consignee: "string",
  //       isBillingAddress: 0,
  //       Additional_info: "string",
  //       Company: "string",
  //       Email: "string",
  //       Fax: "string",
  //       IsprimaryBilling: false,
  //       AddressTypeName: "string",
  //       DeliveryLocalityLatitude: atosuggestdadta.DefaultDeliveryLocality_Lat,
  //       DeliveryLocalityLongitude: atosuggestdadta.DefaultDeliveryLocality_Long,
  //       DeliveryLocalityPlaceId: atosuggestdadta.DefaultDeliveryLocality_PlaceId,
  //       DeliveryLocalityAddress: atosuggestdadta.DefaultDeliveryLocality_Address,
  //       DeliveryLocalityArea: atosuggestdadta.DefaultDeliveryLocality_Area,
  //       DeliveryLocalityCity: atosuggestdadta.DefaultDeliveryLocality_City,
  //       DeliveryLocalityState: atosuggestdadta.DefaultDeliveryLocality_State,
  //       DeliveryLocalityCountry: '',
  //       DeliveryLocalityPinCode: atosuggestdadta.DefaultDeliveryLocality_Pincode,
  //       billingButton: false,
  //       showDefaultButton: false
  //     })
  //   console.log({ formdata });
  //   return fetch(`${Constants.urls.baseUrl}${Constants.endPoints.updateaddress}clientid=${ConstantsValues.ClientId}&customerGuid=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`, {
  //     method: 'POST',
  //     headers: {
  //       accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: formdata
  //   })
  //     .then(res => res.json()
  //       .then(response => {
  //         console.log({ response });
  //         alert(response)
  //         props.fetchaddress()
  //         props.cancelform()
  //       }))
  // }
  useEffect(() => {
    // props.setlist(true)
    // props.fetchaddress()
  }, [refreshlist])
  function onSubmitForm(data) {
    console.log('aa', data);
    const token = localStorage.getItem('generatedtoken');
    console.log('token', token);
    console.log(`Firstname--${Firstname}`)
    console.log(`LastName--${LastName}`)
    if (Firstname === undefined || Firstname === '') {
      // firstNameError
      setFirstNameError(true)
    }
    if (LastName === undefined || LastName === '') {
      setLastNameError(true)
    }
    if (mobNo === undefined || mobNo === '') {
      setMobileNoError(true)
    }
    if (address1 === undefined || address1 === '') {
      // alert('address1--', address1)
      setAddress1Error(true)
    } if (userCity === undefined || userCity === '') {
      setUserCityError(true)
    }
    if (Firstname !== undefined && Firstname !== '' && LastName !== undefined && LastName !== '' && mobNo !== undefined && mobNo !== '' && address1 !== undefined && address1 !== '' && userCity !== undefined && userCity !== '') {
      // alert(`Firstname--${ Firstname}`)
      // alert(`LastName--${ LastName}`)
      // alert(`address1--${address1}`)
      const form = {
        // 'token': token,
        "DeliveryLocalityPlaceId": atosuggestdadta.DefaultDeliveryLocality_PlaceId,
        // "CustomerId": props.edit === true ? props.editdata.CustomerId : props.userdetail.CustomerId,
        "CustomerId": 0,
        "DeliveryLocalityCity": atosuggestdadta.DefaultDeliveryLocality_City,
        "billingButton": false,
        "DeliveryLocalityAddress": atosuggestdadta.DefaultDeliveryLocality_Address,
        "DeliveryLocalityLatitude": atosuggestdadta.DefaultDeliveryLocality_Lat,
        "Additional_info": null,
        "AddressTypeId": Seleced !== '' ? Seleced : props.editdata1.AddressTypeId,
        "DeliveryLocalityArea": atosuggestdadta.DefaultDeliveryLocality_Area,
        "DeliveryLocalityState": atosuggestdadta.DefaultDeliveryLocality_State,
        "Address2": document.getElementById('Address2').value,
        "AddressTypeName": null,
        "StateCode": "MH",
        "DeliveryLocalityPinCode": atosuggestdadta.DefaultDeliveryLocality_Pincode,
        // "FirstName": data.FirstName,
        "FirstName": document.getElementById('FirstName').value,
        "AddressName": null,
        // "City": data.City,
        "City": document.getElementById('City').value,
        "CustomerAddressId": props.edit ? props.editdata1.CustomerAddressId : null,
        "DeliveryLocalityCountry": "India",
        "Email": null,
        "Fax": null,
        "CountryCode": "IN",
        // "Address1": data.Address1,
        "Address1": address1,
        "ZipCode": document.getElementById('ZipCode').value,
        "IsLogicallyDeleted": null,
        "State": document.getElementById('StateCode').value,
        "DeliveryLocalityLongitude": atosuggestdadta.DefaultDeliveryLocality_Long,
        "showDefaultButton": false,
        "Consignee": null,
        // "isPrimary": !!props.edit,
        "isPrimary": props.editdata1.isPrimary,
        "Country": "India",
        // "Mobile": data.Mobile,
        "Mobile": document.getElementById('Mobile').value,
        "IsprimaryBilling": false,
        // "LastName": data.LastName,
        "LastName": document.getElementById('LastName').value,
        "Company": null,
        "isBillingAddress": 2,
        "Title": null,
      }
      console.log('hggh', form,);
      return fetch(`${Constants.urls.baseUrl}${Constants.endPoints.updateaddress}clientid=${'1'}&customerGuid=${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? ConstantsValues.defaultCustGUID : window.atob(localStorage.getItem('CustGUID'))}`, {
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
          // alert(addressresponse)
          console.log('customerAddressList-----', customerAddressList)
          if (customerAddressList.length === 0 && (localStorage.getItem('UserFirstName') === '' || localStorage.getItem('UserFirstName') === null || localStorage.getItem('UserFirstName') === 'null' || localStorage.getItem('UserFirstName') === undefined || localStorage.getItem('UserFirstName') === 'undefined') && (localStorage.getItem('UserLastName') === '' || localStorage.getItem('UserLastName') === null || localStorage.getItem('UserLastName') === 'null' || localStorage.getItem('UserLastName') === undefined || localStorage.getItem('UserLastName') === 'undefined')) {
            // alert(`customerAddressList-----${ customerAddressList}`)
            // setTimeout(() => {
            //   saveProfileData()
            // }, 2000)
            setShowInfoPopUP(true)
          } else {
            console.log('address form data--', form)
            toast(addressresponse)
            setrefreshlist(true)
            props.fetchaddress()
            props.cancelform()
            props.fetchAddressOfIndexPage() // this call is to check address list is empty or not before proceeding to buy
          }
        });
    }
  }
  const localStorageDataUpdated = (title, fName, lName, emailVal, mobileVal, companyValue, receiveOfferValue) => {
    localStorage.setItem('UserTitle', title)
    localStorage.setItem('UserFirstName', fName)
    localStorage.setItem('UserLastName', lName)
    localStorage.setItem('Email', emailVal)
    localStorage.setItem('UserLastPhone', mobileVal)
    localStorage.setItem('UserCompanyName', companyValue)
    localStorage.setItem('UserReceiveOffer', receiveOfferValue)
  }
  const saveProfileData = () => {
    setShowInfoPopUP(false)
    // alert('saveProfileData--')
    const userTitileValue = null
    const firstNameTrim = Firstname.trim()
    const lastNameTrim = LastName.trim()
    let emailWithSpace
    let mobilevalue
    const companyNameTrim = ''
    const receivedOfferCheckboxValue = false
    // If localStorage of email is not null 
    if (localStorage.getItem('Email') !== '' || localStorage.getItem('Email') !== null || localStorage.getItem('Email') !== "null" || localStorage.getItem('Email') !== undefined || localStorage.getItem('Email') !== 'undefined') {
      emailWithSpace = localStorage.getItem('Email').trim()
    }
    // If localStorage of email is null
    if (localStorage.getItem('Email') === '' || localStorage.getItem('Email') === null || localStorage.getItem('Email') === "null" || localStorage.getItem('Email') === undefined || localStorage.getItem('Email') === "undefined") {
      emailWithSpace = ''
    }
    // If localStorage of mobile no is not null 
    if (localStorage.getItem('UserLastPhone') !== '' || localStorage.getItem('UserLastPhone') !== null || localStorage.getItem('UserLastPhone') !== "null" || localStorage.getItem('UserLastPhone') !== undefined || localStorage.getItem('UserLastPhone') !== "undefined") {
      mobilevalue = localStorage.getItem('UserLastPhone')
    }
    // If localStorage of mobile no is null 
    if (localStorage.getItem('UserLastPhone') === '' || localStorage.getItem('UserLastPhone') === null || localStorage.getItem('UserLastPhone') === "null" || localStorage.getItem('UserLastPhone') === undefined || localStorage.getItem('UserLastPhone') === "undefined") {
      mobilevalue = null
    }
    // when user login with email id then UpdateProfile Api call
    if (emailWithSpace !== '') {
      // alert('364')
      // set mobile value which user is entered in the form
      // mobilevalue = mobNo
      mobilevalue = '' // we not to use null because we get the error "User with this phone number already exists" 
      ProfileAPI.updatationprofile(userTitileValue, firstNameTrim, lastNameTrim, emailWithSpace, mobilevalue, companyNameTrim, receivedOfferCheckboxValue)
      localStorageDataUpdated(userTitileValue, firstNameTrim, lastNameTrim, emailWithSpace, mobilevalue, companyNameTrim, receivedOfferCheckboxValue)
    }
    // when user login with mobile no. then UpdateProfile Api call 
    if (mobilevalue !== '') {
      // dispatch(updateprofile(userTitileValue, firstNameTrim, lastNameTrim, mobilevalue, companyNameTrim, receivedOfferCheckboxValue))
      // alert('364')
      emailWithSpace = ''
      ProfileAPI.updatationprofile(userTitileValue, firstNameTrim, lastNameTrim, emailWithSpace, mobilevalue, companyNameTrim, receivedOfferCheckboxValue)
      localStorageDataUpdated(userTitileValue, firstNameTrim, lastNameTrim, emailWithSpace, mobilevalue, companyNameTrim, receivedOfferCheckboxValue)
    }
    toast("Address Saved")
    setrefreshlist(true)
    props.fetchaddress()
    props.cancelform()
    props.fetchAddressOfIndexPage() // this call is to check address list is empty or not before proceeding to buy
  }
  // useEffect(() => {
  //   props.fetchaddress()
  // }, [])
  const changeFltr = (newFL) => {
    setSeleced(newFL);
    console.log("newFLnewFL", newFL);
    // const P = sortByfiltersList.find(i => i.ListItem === newFL);
    // setFiltered(P);
  };
  const handlechangeFirstname = (e) => {
    // alert('handlechangeFirstname' + e.target.value)
    console.log(`280${e.target.value}`)
    if (e.target.value === undefined || e.target.value === '' || e.target.value === null) {
      setFirstName('');
      setFirstNameError(true)
    }
    if (e.target.value.match("^[a-zA-Z][\sa-zA-Z ]*$") !== null) {
      setFirstName(e.target.value);
      setFirstNameError(false)
    }
    if (e.target.value.length === 0) {
      setFirstName('');
      setFirstNameError(true)
    }
  }
  const handlechangeLastname = (e) => {
    if (e.target.value === undefined || e.target.value === '' || e.target.value === null) {
      setLastName('');
      setLastNameError(true)
    }
    if (e.target.value.match("^[a-zA-Z][\sa-zA-Z ]*$") !== null) {
      setLastName(e.target.value);
      setLastNameError(false)
    }
    if (e.target.value.length === 0) {
      setLastName('');
      setLastNameError(true)
    }
  }
  const onchangemobileno = (e) => {
    // if (e.target.value.match("[1-9]{0}[0-9]{0}") != null) {
    console.log('e.target.value---', e.target.value)
    const enteredMobValue = e.target.value
    // console.log('enteredMobValue length', enteredMobValue.length)
    if (enteredMobValue === undefined || enteredMobValue === '' || enteredMobValue === null) {
      console.log('mobile no is empty')
      // alert('326')
      setMobno('')
      setMobileNoError(true)
    }
    // if (enteredMobValue.match("^[1-9]*$") !== null) {
    //   setMobileNoError(false)
    //   setMobno(e.target.value.slice(0, 10));
    // }
    if (enteredMobValue.match(/^\d{10}$/)) {
      setMobno(enteredMobValue)
      setMobileNoError(false)
    } else {
      setMobno('')
      setMobileNoError(true)
    }
  }
  const onchangeAddress = (e) => {
    console.log(`onchangeAddress--${e.target.value}`)
    if (e.target.value === undefined || e.target.value === '' || e.target.value === null) {
      setAddress1Error(true)
      setAddress1('')
    }
    // console.log('address---', e.target.value.length)
    if (e.target.value.match("^[a-zA-Z0-9][\sa-zA-Z0-9 ]*$") !== null) {
      setAddress1Error(false)
      setAddress1(e.target.value)
    }
    if (e.target.value.length === 0) {
      setAddress1Error(true)
      setAddress1('')
    }
  }
  const onchangeCity = (e) => {
    if (e.target.value === undefined || e.target.value === '' || e.target.value === null) {
      setUserCityError(true)
    }
    else if (e.target.value !== null) {
      setUserCityError(false)
    }
  }
  useEffect(() => {
    if (props && props.edit === false) {
      setSeleced(3)
    }
  }, [props && props.edit])
  // useEffect(() => {
  //   if (props && props.editdata1) {
  //     console.log('props.editdata1.FirstName--', props.editdata1)
  //     // let firstName = props.editdata1.FirstName
  //     setFirstName(props.editdata1.FirstName)
  //     setLastName(props.editdata1.LastName)
  //     setMobno(props.editdata1.Mobile)
  //     setAddress1(props.editdata1.Address1)
  //   }
  // }, [props && props.editdata1])
  useEffect(() => {
    console.log('props useEffect', props)
    if (props && props.edit === false) {
      // console.log('props.editdata.FirstName--', props.editdata)
      // setFirstName(props.editdata.FirstName)
      // setLastName(props.editdata.LastName)
      // setMobno(props.editdata.Mobile)
      // setAddress1('')
      // // setFirstName('')
      // // setLastName('')
      // // setMobno('')
      // alert(localStorage.getItem('UserLastPhone'))
      console.log('phone no', localStorage.getItem('UserLastPhone'))
      if (localStorage.getItem('UserFirstName') === 'null') {
        setFirstName('')
      }
      if (localStorage.getItem('UserFirstName') !== 'null') {
        setFirstName(localStorage.getItem('UserFirstName'))
      }
      if (localStorage.getItem('UserLastName') === 'null') {
        setLastName('')
      }
      if (localStorage.getItem('UserLastName') !== 'null') {
        setLastName(localStorage.getItem('UserLastName'))
      }
      if (localStorage.getItem('UserLastPhone') === 'null' || localStorage.getItem('UserLastPhone') === '') {
        // alert('phone no is blank')
        setMobno('')
      } else {
        console.log('phone no is not blank')
        setMobno(localStorage.getItem('UserLastPhone'))
      }
      // setMobno(localStorage.getItem('UserLastPhone'))
      // localStorage.setItem('Email', emailvalue)
      setAddress1('')
    }
    if (props && props.edit === true) {
      setFirstName(props.editdata1.FirstName)
      setLastName(props.editdata1.LastName)
      setMobno(props.editdata1.Mobile)
      setAddress1(props.editdata1.Address1)
    }
  }, [props])
  useEffect(() => {
    setUserCity(atosuggestdadta.DefaultDeliveryLocality_City)
  }, [atosuggestdadta])
  // useEffect(() => {
  //   if (props && props.editdata) {
  //     let firstName = props.editdata1.FirstName
  //     setFirstName(firstName)
  //     setLastName(props.editdata1.LastName)
  //     setMobno(props.editdata1.Mobile)
  //   }
  // })
  console.log("props.pin", props.Pin, props.editdata, "props.Address", atosuggestdadta);
  console.log("propssssssssssssssss", props);
  return (
    <div>
      {/* <ToastContainer /> */}
      {/* start: show info popup  */}
      {showInfoPopUP &&
        <div className="modal show" id="RemoveCartItemModal" style={{ paddingRight: '17px', display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body text-center">
                <button type="button" className="close" data-dismiss="modal" ></button>
                <div>
                  <ul>
                    {/* <li><img src={cycling} alt='' style={{ width: '100px' }} /></li> */}
                    <li><p>Your details have been saved to your profile. Feel free to update them anytime by visiting your profile page.</p></li>
                    <li className='mt-2'>
                      {/* <button className="btn btn-secondary" type="button" onClick={renderLogout}>Yes</button> */}
                      {/* <button className="btn btn-secondary" type="button" onClick={logoutPopUp}>No</button> */}
                      <button className="btn btn-secondary" type="button" onClick={saveProfileData}>Ok</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/* end: show info popup  */}
      <form id="frm_address" style={{ marginTop: '30px' }}
        onSubmit={handleSubmit(onSubmitForm)}>
        <div className="form-group row align-items-center">
          {/* <label className="col-12 col-sm-12 col-md-4 col-form-label hidden-sm"></label> */}
          <div className="col-12 col-sm-12 text-center text-capitalize">
            <h4>
              <b>{props && props.edit ? 'Update Address' : 'Enter new address details'}</b> </h4>
          </div>
        </div>
        {/* <input name="__RequestVerificationToken" type="hidden" value="CfDJ8NP3Qh_rM3NOsi7zSHjY4OoLDZhhsGR85_wosbsaxXoh02Ul0fPdY7PtS9svp_I4oJilDzwIHAfGRLqjIDzZN6P3k7CKX1ogCbeYvnGFbhuKMjWBeLAcuCQJaqgAY8bhxQHbBvT8KU6QHiCTjw_OMhN1btVtTiuSHxl5OcjvEZOM29qTtkyTt2OOFmYWqIFT_A" />
                                  <input type="hidden" id="CustomerAddressId" name="CustomerAddressId" value="0" />
                                  <input type="hidden" id="AddressName" name="AddressName" value="null" />
                                  <input type="hidden" id="IsFromCheckoutPage" name="IsFromCheckoutPage" value="true" />
                                  <input id="hdnDeliveryLocality_Lat" type="hidden" name="DeliveryLocalityLatitude" />
                                  <input id="hdnDeliveryLocality_Lng" type="hidden" data-val="true" data-val-number="The field DeliveryLocalityLongitude must be a number." data-val-required="The DeliveryLocalityLongitude field is required." name="DeliveryLocalityLongitude" value="73.7768511" />
                                  <input id="hdnDeliveryLocality_PlaceId" type="hidden" name="DeliveryLocalityPlaceId" value="ChIJy9Nd8M--wjsRfat_-5cSkaE" />
                                  <input id="hdnDeliveryLocality_Area" type="hidden" name="DeliveryLocalityArea" value="Baner" />
                                  <input id="hdnDeliveryLocality_Address" type="hidden" name="DeliveryLocalityAddress" value="Baner, Pune, Maharashtra, India" />
                                  <input id="hdnDeliveryLocality_City" type="hidden" name="DeliveryLocalityCity" value="Pune" />
                                  <input id="hdnDeliveryLocality_State" type="hidden" name="DeliveryLocalityState" value="Maharashtra" />
                                  <input id="hdnDeliveryLocality_Country" type="hidden" name="DeliveryLocalityCountry" value="" />
                                  <input id="hdnDeliveryLocality_Pincode" type="hidden" name="DeliveryLocalityPinCode" value="411045" /> */}
        <div className="form-row mb-3">
          <div className="form-group col-12 col-sm-12 col-md-6">
            <label htmlFor="FirstName">First Name <span className="text-danger">*</span></label>
            <Input
              type="text"
              id="FirstName"
              className="form-control "
              required=""
              placeholder="Enter First Name"
              onChange={(e) => handlechangeFirstname(e)}
              // value={props.edit ? props.editdata1.FirstName : Firstname}
              // defaultValue={props.edit ? props.editdata1.FirstName : Firstname}
              value={Firstname}
            // pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
            // {...register('FirstName', { required: true })}
            />
            {firstNameError === true ?
              // errors.FirstName &&
              <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                Please enter first name.
              </span> : null
            }
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6">
            <label htmlFor="LastName">Last Name <span className="text-danger">*</span></label>
            {/* <input
              type='text'
              value='pooname'
            // onChange={(e) => changehandele(e)}
            /> */}
            <Input
              type="text"
              id="LastName"
              className="form-control"
              required=""
              placeholder="Enter Last Name"
              onChange={(e) => handlechangeLastname(e)}
              // value={props.edit ? props.editdata1.LastName : LastName}
              value={LastName}
            // pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
            // {...register('LastName', { required: true, })}
            />
            {lastNameError === true ?
              /* errors.LastName && */
              <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                Please enter last name.
              </span> : null
            }
          </div>
        </div>
        <div className="form-row mb-3">
          <div className="form-group col-12 col-sm-12 col-md-6">
            <label htmlFor="Mobile">Phone no. <span className="text-danger">*</span></label>
            <Input
              type="number"
              id="Mobile"
              placeholder="Please Enter Phone no"
              className="form-control "
              maxLength={10}
              // pattern='^(\+)?(1\s*[-\/\.]?)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT])\.?\s*(\d+))*$'
              // required=""
              // value={mobno}
              defaultValue={mobNo}
              // value={props.edit ? props.editdata1.LastName : LastName}
              onChange={onchangemobileno}
            // {...register('Mobile', { required: true })}
            />
            {mobileNoError === true ?
              // errors.Mobile &&
              <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                Please enter a valid Phone no.
              </span> : null
            }
          </div>
          {props && props.edit ?
            <div className="form-group col-12 col-sm-12 col-md-6">
              <label htmlFor="ZipCode">Pin Code <span className="text-danger">*</span></label>
              <br />
              <Input
                type='text'
                id="ZipCode"
                className="form-control "
                required=""
                // disabled={!props.edit}
                // style={{ backgroundColor: '#e9ecef' }}
                value={localStorage.getItem('pincodevalue') && localStorage.getItem('pincodevalue') !== "" ? localStorage.getItem('pincodevalue') : "411045"}
              // value=""
              // defaultValue={props && props.Pin ? props.Pin[0].long_name : props.editdata1.ZipCode}
              // defaultValue={props.edit ? props.editdata.ZipCode : atosuggestdadta.DefaultDeliveryLocality_Pincode}
              // {...props.edit ? { ...register('ZipCode', { required: true }) } : null}
              />
              {errors.ZipCode &&
                <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                  Please enter Pin Code.
                </span>
              }
            </div>
            : <div className="form-group col-12 col-sm-12 col-md-6">
              <label htmlFor="ZipCode">Pin Code <span className="text-danger">*</span></label>
              <br />
              <Input
                type='text'
                id="ZipCode"
                className="form-control "
                required=""
                disabled={!props.edit}
                // value={props && props.Pin ? props.Pin[0].long_name : '411045'}
                value={localStorage.getItem('pincodevalue') && localStorage.getItem('pincodevalue') !== "" ? localStorage.getItem('pincodevalue') : '411045'}
              // value=""
              // style={{ backgroundColor: '#e9ecef' }}
              // defaultValue={props.edit ? props.editdata.ZipCode : atosuggestdadta.DefaultDeliveryLocality_Pincode}
              // {...props.edit ? { ...register('ZipCode', { required: true }) } : null}
              />
              {errors.ZipCode &&
                <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                  Please enter Pin Code.
                </span>
              }
            </div>
          }
        </div>
        <div className="form-row mb-3">
          <div className="form-group col-12 col-sm-12 col-md-6">
            <label htmlFor="Address1">Address 1 <span className="text-danger">*</span></label>
            <Input
              type="text"
              id="Address1"
              className="form-control "
              title="Flat, Floor, Building Name"
              required=""
              // defaultValue={props.edit ? props.editdata.Address1 : ''}
              // value={props && props.editdata1 && props.editdata1.Address1}
              value={address1}
              // value={props && props.edit ? props.editdata1.Address1 : address1}
              // defaultValue={props.edit ? props.editdata1.Address1 : Address1}
              placeholder="Flat, Floor, Building Name"
              onChange={(e) => onchangeAddress(e)}
            // {...register('Address1', { required: true })}
            />
            {address1Error === true ?
              // errors.Address1 &&
              <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                Please enter Address 1.
              </span> : null
            }
          </div>
          {props && props.edit ?
            <div className="form-group col-12 col-sm-12 col-md-6">
              <label htmlFor="Address2">Address 2 </label>
              <br />
              {/* <b> */}
              <Input
                type="text"
                id="Address2"
                className="form-control "
                required=""
                // disabled={!props.edit}
                contentEditable
                value={props && props.Address ? props.Address : props.editdata1.Address2}
              // value={props && props.Address ? props.Address : props.editdata1.Address2}
              // defaultValue={ props.edit  && props.editdata.Address2 }
              // defaultValue={props.edit ? props.editdata.Address2 : atosuggestdadta.DefaultDeliveryLocality_Address}
              // style={{ backgroundColor: '#e9ecef' }}
              // value={atosuggestdadta.DefaultDeliveryLocality_Address}
              // disabled
              // {...props.edit ? { ...register('Address2', { required: true }) } : null}
              />
              {/* {errors.Address2 &&
              <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                Please enter Address2 .
              </span>
            } */}
            </div>
            :
            <div className="form-group col-12 col-sm-12 col-md-6">
              <label htmlFor="Address2" data-pro={JSON.stringify(props)}>Address 2 </label>
              <br />
              {/* <b> */}
              {localStorage.getItem('sublocalityvalue') && localStorage.getItem('sublocalityvalue') !== "" ?
                <Input
                  type="text"
                  id="Address2"
                  className="form-control "
                  required=""
                  disabled={!props.edit}
                  contentEditable
                  // value={props && props.Address ? props.Address : props.edit && props.editdata.Address2 }
                  // value={props && props.Address ? props.Address : atosuggestdadta.DefaultDeliveryLocality_Address}
                  // defaultValue={ props.edit  && props.editdata.Address2 }
                  // defaultValue={props.edit ? props.editdata.Address2 : atosuggestdadta.DefaultDeliveryLocality_Address}
                  // style={{ backgroundColor: '#e9ecef' }}
                  // value={atosuggestdadta.DefaultDeliveryLocality_Address}
                  // value={props && props.Address ? props.Address : `${localStorage.getItem('sublocalityvalue')}, ${localStorage.getItem('pincodevalue')}`}
                  value={props && props.Address ? props.Address : `${localStorage.getItem('sublocalityvalue')}, ${localStorage.getItem('pincodevalue')}`}
                // disabled
                // {...props.edit ? { ...register('Address2', { required: true }) } : null}
                />
                :
                <Input
                  type="text"
                  id="Address2"
                  className="form-control "
                  required=""
                  disabled={!props.edit}
                  contentEditable
                  // value={props && props.Address ? props.Address : props.edit && props.editdata.Address2 }
                  // value={props && props.Address ? props.Address : atosuggestdadta.DefaultDeliveryLocality_Address}
                  // defaultValue={ props.edit  && props.editdata.Address2 }
                  // defaultValue={props.edit ? props.editdata.Address2 : atosuggestdadta.DefaultDeliveryLocality_Address}
                  // style={{ backgroundColor: '#e9ecef' }}
                  // value={atosuggestdadta.DefaultDeliveryLocality_Address}
                  // value={props && props.Address ? props.Address : `${localStorage.getItem('sublocalityvalue')}, ${localStorage.getItem('pincodevalue')}`}
                  value={props && props.Address ? props.Address : atosuggestdadta.DefaultDeliveryLocality_Address}
                // disabled
                // {...props.edit ? { ...register('Address2', { required: true }) } : null}
                />
              }
              {/* {errors.Address2 &&
            <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
              Please enter Address2 .
            </span>
          } */}
            </div>
          }
        </div>
        <div className="form-row mb-3">
          <div className="form-group col-12 col-sm-12 col-md-6">
            <label htmlFor="City">City <span className="text-danger">*</span></label>
            <Input
              type="text"
              id="City"
              className="form-control "
              // required=""
              // defaultValue={props.edit ? props.editdata.City : atosuggestdadta.DefaultDeliveryLocality_City}
              // defaultValue={props && props.edit ? props.editdata1.City : atosuggestdadta.DefaultDeliveryLocality_City}
              defaultValue={props && props.edit ? props.editdata1.City : userCity}
              // {...register('City', { required: true })}
              onChange={(e) => onchangeCity(e)}
              disabled
            />
            {userCityError === true ?
              // errors.City &&
              <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                Please enter City.
              </span> : null
            }
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6">
            <label htmlFor="StateCode">State <span className="text-danger">*</span></label>
            <select className="form-control" style={{ backgroundColor: '#e9ecef' }} id="StateCode" name="StateCode"
              // {...register('StateCode',{ required: true } )}
              value={atosuggestdadta.DefaultDeliveryLocality_State}>
              <option value={atosuggestdadta.DefaultDeliveryLocality_State} >{atosuggestdadta.DefaultDeliveryLocality_State}</option></select>
            {/* {errors.StateCode &&
              <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                Please enter State .
              </span>
            } */}
          </div>
        </div>
        <div className="form-row mb-3" >
          <div className="form-group col-12 col-sm-12 col-md-6">
            <label htmlFor="CountryCode">Country <span className="text-danger">*</span></label>
            <select className="form-control"
              value={props.edit ? props.editdata1.AddressTypeName : null}
              style={{ backgroundColor: '#e9ecef' }} id="CountryCode" name="CountryCode"
            // {...register('CountryCode', { required: true })}
            >
              <option value="India" >India</option></select>
            {/* {errors.CountryCode &&
              <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                Please enter country .
              </span>
            } */}
          </div>
          <div className="form-group col-12 col-sm-12 col-md-6">
            <label htmlFor="AddressTypeName">Address Type <span className="text-danger">*</span></label>
            <select className="form-control" id="AddressTypeId" {...register('AddressTypeId', { required: true })} name="AddressTypeId" onChange={event => changeFltr(event.target.value)}
              value={Seleced || props && props.editdata1 && props.editdata1.AddressTypeId}>
              {/* <option value="" selected=""
              >Select Address Type</option><option value={1} >Home Address</option><option value={2} >Work/Office Address</option><option value={3} >Other</option> */}
              {sortByfiltersList.map(itm => (
                <option value={itm.id}>{itm.ListItem}</option>
              ))}
            </select>
            {errors.AddressTypeId &&
              <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                Please enter Address Type.
              </span>
            }
          </div>
        </div>
        <div className="form-row mb-3">
          <input type="hidden" value="2" data-val="true" data-val-required="Please select any one Billing/Shipping/Both." id="IsBillingAddress" name="IsBillingAddress" />
        </div>
        <div className="form-row mb-3">
          <div className="form-group col-12 col-sm-12 col-md-6">
            <div className="register-box d-flex mt-half">
              <input type="hidden"
                data-val="true" data-val-required="The IsPrimary field is required." id="IsPrimary" name="IsPrimary" value="False" />
              <input type="hidden" data-val="true" data-val-required="The IsprimaryBilling field is required." id="IsprimaryBilling" name="IsprimaryBilling" value="False" />
              <button type="submit" id="btnSaveCustAddress" className="view-profile btn btn-secondary update-add " onSubmit={handleSubmit(onSubmitForm)}
              >{props.edit ? 'Update' : 'Save'}</button>
              &nbsp;
              <button type="button" className="btn btn-secondary"
                onClick={() => {
                  props.cancelform()
                }}
              >Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}