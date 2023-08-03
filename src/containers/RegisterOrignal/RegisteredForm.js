/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import '../../../assets1/css/bootstrap-select.min.css';
import '../../../assets1/css/default.min.css';
import '../../../assets1/css/bundle.css';
// import '../../../assets1/css/font-awesome.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
import { toast, ToastContainer } from 'react-toastify'
import brandlogo from '../../../assets1/img/icon/adibuja-logo.svg';
import Success from '../../components/ShowAlert/success';
import Constants from '../App/constants';
// import Input from '../HomePage/Input';
import { customernotify, sendOtp, setInternalMsg, registerdata, DirectMessage } from './actions';
import reducer from './reducer';
import saga from './saga';
import history from '../../utils/history';
import { resgesterresponse } from '../HomeScreen/actions';
import CustomsAPI from '../MainPage/api/homeServices';
// import Component2 from 'react';
// import './style.css';
import 'react-toastify/dist/ReactToastify.css';
export function RegiseredForm(props) {
  // const [sendotpbutton, setsendotpbutton] = useState(false);
  const [viewotpdiv, setviewotpdiv] = useState(false);
  // const [otpvalueemail, setotpvalueemail] = useState('');
  const [emailvale, setemailvalue] = useState('');
  // const [defaultValue, setDefaultValue] = useState('');
  // const [defaultValuePhone, setDefaultValuePhone] = useState('');
  const [counter, setCounter] = useState(60);
  const [msg, setMsg] = useState('')
  const [FirstCall, setFirstCall] = useState(0);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  // const [useremail, setEmail] = useState('');
  const [mobno, setMobno] = useState('');
  // const [Error, setError] = useState('')
  // const [Success, setSuccess] = useState('')
  const [isError, setIsError] = useState('');
  // const [isSuccess, setisSuccess] = useState('')
  const [SendOTPData, setSendOTPData] = useState({});
  const [formView, setFormView] = useState()
  const [showMsg, setShowMsg] = useState(false);
  const [showResendBtn, setshowResendBtn] = useState(false);
  // const [otpbutton, setotpbutton] = useState(false)
  // const [disableinput, setdisableinput] = useState(false);
  const [registernow, setregisterNow] = useState(false);
  const [otpverifyflag, setotpverifyflag] = useState(false);
  const [otpphoneverifyflag, setotpphoneverifyflag] = useState(false)
  const [color, setcolor] = useState('');
  const [otpbuttonemail, setotpbuttonemail] = useState(false)
  const [otpbuttonphone, setotpbuttonphone] = useState(true)
  const [viewotpphonediv, setviewotpphonediv] = useState(false)
  // const [EmailField,setEmailField]=useState(false)
  const [Mobnodisable, setMobnodisable] = useState(false)
  const [Emailvaluedisable, setEmailvaluedisable] = useState(false)
  const [UpdatedTimer, setUpdatedTimer] = useState(60);
  const [clockStarted, setClockStarted] = useState(false);
  useInjectReducer({ key: 'registerOrignal', reducer });
  useInjectSaga({ key: 'registerOrignal', saga });
  const location = useLocation()
  const registerOrignal = useSelector(state => state.registerOrignal);
  const oTPVerify = useSelector(state => state.registerOrignal);
  // const otp = useSelector(state =>state.registerOrignal && state.registerOrignal.otp)
  console.log("regist..", registerOrignal);
  console.log("verify..", oTPVerify)
  useEffect(() => {
    if (oTPVerify && oTPVerify.OTPVerify === 0) {
      console.log('Enter valid OTP');
      toast('Enter valid OTP')
    }
  }, [oTPVerify && oTPVerify.OTPVerify])
  useEffect(() => {
    console.log("locationvalue", location)
    if (location && location.state && location.state.phone === null) {
      // setDefaultValue(location.state.email)
      // setDefaultValue("ddvalue..", location.state.userName)
    }
    if (location && location.state && location.state.email === null) {
      // setDefaultValuePhone(location.state.phone)
      // setDefaultValue(location.state.phone)
    }
  }, [location]);
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log("otpverifyflag", otpverifyflag);
    setregisterNow(true)
    console.log("usersval..", (location.state.userName))
    console.log("regi...", window.btoa(location.state.userName))
    localStorage.setItem('RegisterID', (location.state.userName))
    localStorage.setItem('UserFirstName', (data.firstName))
    localStorage.setItem('Email', window.btoa(emailvale))
    localStorage.setItem('CustGUID', window.btoa(registerOrignal.otpverfyuser.CustGuid))
    localStorage.setItem('ClientId', window.btoa(registerOrignal.otpverfyuser.ClientId))
    localStorage.setItem('User', JSON.stringify(registerOrignal.otpverfyuser))
    localStorage.setItem('UserLastName', window.btoa(registerOrignal.otpverfyuser.LastName))
    localStorage.setItem('UserLastPhone', registerOrignal.otpverfyuser.Phone)
    // dispatch(registerUserNow(registerOrignal.sendOTPData.CustomerGUID, otp))
    const { value } = document.getElementById('ReceiveOffers')
    const token = localStorage.getItem('generatedtoken');
    const emailsmsbodynotify = {
      "ClientId": 1,
      "Title": "string",
      "CustGuid": "string",
      "Name": data.firstName,
      "LastName": data.lastname,
      "Email": null,
      "Company": null,
      "Mobile": null,
      "Phone": null,
      "Fax": null,
      "Password": null,
      "ConfirmPassword": null,
      "Comments": null,
      "TaxId": null,
      "Type": null,
      "PreferredLanguageId": 0,
      "designation": null,
      "companyType": null,
      "country": null,
      "state": null,
      "address1": null,
      "address2": null,
      "city": null,
      "statecode": null,
      "selectedCountry": null,
      "selectedState": null,
      "countryCode": null,
      "ZipCode": null,
      "NewsLetterSubscribed": value,
      "Consignee": null,
      "Telephone": null,
      "isPrimary": true,
      "isGuest": true,
      "ReceiveOffers": true,
      "IsEmailVerified": false,
      // "IsEmailVerified": otpverifyflag,
      "IsPhoneVerified": false,
      "BirthDate": null
    }
    return fetch(`${Constants.urls.baseUrl}${Constants.endPoints.register}`, {
      method: 'POST',
      headers: {
        accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ClientId: 1,
        Title: null,
        CustGuid: `${(localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) ? '00000000-0000-0000-0000-000000000000' : localStorage.getItem('CustGUID')}`,
        Name: data.firstName,
        LastName: data.lastname,
        Email: emailvale !== '' ? emailvale : null,
        Company: null,
        // Mobile: mobno,
        // Phone: mobno,
        Mobile: mobno !== '' ? mobno : null,
        Phone: mobno !== '' ? mobno : null,
        Fax: null,
        Password: null,
        ConfirmPassword: null,
        TaxId: null,
        Type: null,
        PreferredLanguageId: 0,
        designation: null,
        companyType: null,
        country: null,
        state: null,
        address1: null,
        address2: null,
        city: null,
        statecode: null,
        selectedCountry: null,
        selectedState: null,
        countryCode: null,
        ZipCode: null,
        NewsLetterSubscribed: document.getElementById('newslettersubscription').checked,
        Consignee: null,
        Telephone: null,
        isPrimary: true,
        isGuest: false,
        ReceiveOffers: document.getElementById('ReceiveOffers').checked,
        // IsEmailVerified: false,
        IsEmailVerified: otpverifyflag,
        // IsPhoneVerified: true,
        IsPhoneVerified: otpphoneverifyflag,
        BirthDate: null
      })
    })
      .then(res => res.json())
      .then(registerresponse => {
        // console.log('registerresponse', registerresponse)
        // alert(registerresponse)
        if (registerresponse === 'User Registered Successfully') {
          if (mobno !== '' && emailvale === '') {
            CustomsAPI.getcustomerbyphone(mobno)
              .then(response => {
                const encodedData = window.btoa(response.GUID); // encode a string              
                console.log("getcustomerbyphone", encodedData);
                localStorage.setItem('CustGUID', encodedData)
                console.log("getcustomerbyphone..", response);
              })
          }
          else if (mobno === '' && emailvale !== '') {
            CustomsAPI.GetCustIdByEmail(emailvale)
              .then(response => {
                // localStorage.setItem('CustGUID', response[0].GUID)
                const encodedData = window.btoa(response[0].GUID); // encode a string              
                console.log("getcustomerbyphone", encodedData);
                localStorage.setItem('CustGUID', encodedData)
                console.log("getcustomerbyphone", response);
              })
          }
          else {
            CustomsAPI.getcustomerbyphone(mobno)
              .then(response => {
                const encodedData = window.btoa(response.GUID); // encode a string              
                console.log("getcustomerbyphone", encodedData);
                localStorage.setItem('CustGUID', encodedData)
                console.log("getcustomerbyphone", response);
              })
            CustomsAPI.GetCustIdByEmail(emailvale)
              .then(response => {
                // localStorage.setItem('CustGUID', response[0].GUID)
                console.log("getcustomerbyphone", response);
              })
          }
          console.log('registerresponse', registerresponse)
          dispatch(customernotify(emailsmsbodynotify))
          localStorage.setItem('register', true)
          localStorage.setItem('registerusername', mobno !== null ? mobno : emailvale)
          dispatch(resgesterresponse(true, registerresponse))
          history.push('/', { customerdata: registerresponse })
        }
        try {
          // showMsg(true)
          // setMsg(registerresponse)
          toast(registerresponse)
          console.log('registerresponse', registerresponse);
        } catch (e) {
          throw Error(registerresponse);
        }
      });
  }
  useEffect(() => {
    if (FirstCall > 0 && mobno && registerOrignal && registerOrignal.otpverfyuser !== undefined && registerOrignal.otpverfyuser.CustGuid === '00000000-0000-0000-0000-000000000000' && registernow === false) {
      setIsError(true)
      dispatch(DirectMessage('redirecting to registration page...'))
      history.push({ pathname: '/register', state: { mobno } })
    }
    if (FirstCall > 0 && registerOrignal && registerOrignal.otpverfyuser !== undefined && registerOrignal.otpverfyuser.CustGuid !== '00000000-0000-0000-0000-000000000000'
      && registerOrignal.otpverfyuser !== '') {
      dispatch(registerdata(registerOrignal.otpverfyuser))
      history.push('/')
      // localStorage.setItem('isLogin', true)
      localStorage.setItem('CustGUID', window.btoa(registerOrignal.otpverfyuser.CustGuid))
      localStorage.setItem('ClientId', window.btoa(registerOrignal.otpverfyuser.ClientId))
      // localStorage.setItem('UserFName', window.btoa(registerOrignal.otpverfyuser.Name))
      localStorage.setItem('User', JSON.stringify(registerOrignal.otpverfyuser))
      localStorage.setItem('UserLastName', window.btoa(registerOrignal.otpverfyuser.LastName))
      localStorage.setItem('UserLastPhone', registerOrignal.otpverfyuser.Phone)
    }
  }, [registerOrignal])
  useEffect(() => {
    setFirstCall(FirstCall + 1)
  }, [])
  useEffect(() => {
    if (FirstCall > 0) {
      console.log("formView", formView);
      // if (formView === 1) {
      //   setIsError(false)
      //   // dispatch(setInternalMsg('Successfully valided'))
      //   setotpverifyflag(true)
      //   setotpbuttonemail(true)
      //   setviewotpdiv(false)
      //   setshowResendBtn(false)
      // }
    }
  }, [formView])
  useEffect(() => {
    console.log('msg', msg);
    if (FirstCall > 0) {
      if (msg !== '' && msg) {
        setShowMsg(true)
        closeMsgBar()
      } else {
        setShowMsg(false)
        closeMsgBar()
      }
    }
  }, [msg])
  useEffect(() => {
    if (performance.navigation.type === 1) {
      console.log("This page is reloaded");
      // here you can navigate 
      history.goBack()
    } else {
      console.log("This page is not reloaded");
    }
  }, [performance.navigation.type === 1]);
  function closeMsgBar() {
    setTimeout(() => {
      setShowMsg(false)
      // dispatch(setInternalMsg())
    }, 3000);
  }
  useEffect(() => {
    if (FirstCall > 0 && registerOrignal && registerOrignal.sendOTPData) {
      console.log('registerOrignal', registerOrignal);
      setFormView(registerOrignal.OTPVerify)
      setMsg(registerOrignal.msg)
      setSendOTPData(registerOrignal.sendOTPData)
    }
  }, [registerOrignal])
  const onchangevalidateemail = (e) => {
    console.log("eevaluee1", e.target.value)
    setemailvalue(e.target.value)
    const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/);
    if (!emailphone.test(e.target.value)) {
      setotpbuttonemail(false)
      // seterror(true)
    }
    else {
      // setupdateemail(true)
      setotpbuttonemail(true)
      // seterror(false)
    }
    const timer = setInterval(() => {
      // eslint-disable-next-line no-unused-expressions
      counter > 0 && setTimeout(() => { setCounter(counter - 1) }, 1000);
    }, [counter])
    return (() => {
      clearInterval(timer);
    });
  }
  // useEffect(()=>{
  //   if(EmailField===true){
  //   if (oTPVerify === 0) {
  //   console.log('Enter valid OTP');
  //     toast('Enter valid OTP')
  //     // dispatch(setInternalMsg('Enter valid OTP'))
  //   }
  //   else if (oTPVerify === 1) {
  //     setIsError(false)
  //     setotpverifyflag(true)
  //     dispatch(setInternalMsg('Successfully valided'))
  //     setotpbuttonemail(true)
  //     // setviewotpdiv(false)
  //     setshowResendBtn(false)
  //   }
  // }
  // },[oTPVerify,EmailField])
  function verifyotp(itm) {
    console.log("emailvalue", itm);
    if (itm === 'email') {
      console.log("emailvalue", itm);
      // setEmailField(true)
      console.log(document.getElementById('txtEmailOTP').value.length);
      const { value } = document.getElementById('txtEmailOTP')
      // dispatch(verifyOtpAction(SendOTPData.CustomerGUID, value))
      CustomsAPI.verifyRegistrationOTP(SendOTPData.CustomerGUID, value)
        .then(response => {
          console.log("responseresponse", response);
          if (response === 1) {
            setIsError(false)
            setotpverifyflag(true)
            dispatch(setInternalMsg('Successfully valided'))
            setotpbuttonemail(false)
            setviewotpdiv(false)
            setshowResendBtn(false)
          }
          else {
            setIsError(true)
            setShowMsg(true)
            dispatch(setInternalMsg('Enter valid OTP'))
            closeMsgBar()
          }
        })
      // dispatch(changeUsername(fname))
    }
    if (itm === 'mobile') {
      console.log(document.getElementById('txtMobileOTP').value);
      const { value } = document.getElementById('txtMobileOTP')
      // dispatch(verifyOtpAction(SendOTPData.CustomerGUID, value))
      CustomsAPI.verifyRegistrationOTP(SendOTPData.CustomerGUID, value)
        .then(response => {
          console.log("responseresponse", response);
          if (response === 1) {
            setIsError(false)
            setotpphoneverifyflag(true)
            dispatch(setInternalMsg('Successfully valided'))
            setotpbuttonphone(true)
            setviewotpphonediv(false)
            // setviewotpdiv(true)
            // setshowResendBtn(false)
          }
          else {
            dispatch(setInternalMsg('Enter valid OTP'))
          }
        })
    }
  }
  useEffect(() => {
    console.log('SendOTPData', SendOTPData);
    if (FirstCall > 0 && SendOTPData) {
      // const emailCheck = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/);
      const mobileCheck = new RegExp(/^(?:\d{10}|)$/);
      if (SendOTPData.IsCustomerExist) {
        console.log('SendOTPDataif', SendOTPData);
        // alert('SendOTPData IsCustomerExist')
        setIsError(true);
        setShowMsg(true)
        dispatch(setInternalMsg(SendOTPData.Message))
        // history.push('/login')
        // document.getElementById('email').focus()
        setviewotpdiv(false)
        setviewotpphonediv(false)
        closeMsgBar()
      } else if (mobileCheck.test(props.location.state.userName)) {
        // alert('check mobile no' + mobileCheck.test(props.location.state.userName))
        // SendOTPData.Message === 'OTP sent successfully'
        // This is the case when mobile no is by default filled and
        // we have to enter email address 
        // console.log('--filled props', props.location.state)
        setIsError(false);
        setShowMsg(true)
        dispatch(setInternalMsg(SendOTPData.Message))
        setviewotpphonediv(false)
        setviewotpdiv(true)
        setClockStarted(true);
        setUpdatedTimer(59)
        setshowResendBtn(true)
        closeMsgBar()
      } else {
        // If the customer is not register
        // email registration case
        // This is the case when email no is by default filled and
        // we have to enter mobile no.
        console.log('--filled location', props)
        // alert('check not mobile no' + mobileCheck.test(props.location.state.userName))
        setIsError(false)
        setShowMsg(true)
        dispatch(setInternalMsg(SendOTPData.Message))
        // setviewotpdiv(true)
        // setTimerShow(true)
        setviewotpdiv(false)
        setviewotpphonediv(true)
        // dispatch(sendOtp(emailvale))
        setClockStarted(true);
        setUpdatedTimer(59)
        setotpbuttonemail(false)
        setshowResendBtn(true)
        closeMsgBar()
      }
      // else {
      //   console.log('Last else', JSON.stringify(props))
      //   console.log('check email valid', mobileCheck.test(props.location.state.userName))
      // }
    }
  }, [SendOTPData])
  useEffect(() => {
    if (FirstCall > 0 && UpdatedTimer === 0) {
      setClockStarted(false);
    }
    if (FirstCall > 0 && clockStarted === true && UpdatedTimer > 0) {
      setTimeout(() => {
        const time = UpdatedTimer - 1
        setUpdatedTimer(time);
      }, 1000)
    }
  }, [UpdatedTimer])
  // Email OTP Function
  function sendOtpFunction(ifNotError, ifError) {
    // alert('send Email OTP Function')
    console.log(ifNotError, ifError);
    console.log('registerOrignal---', registerOrignal)
    const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/);
    if (emailvale === '') {
      console.log('sendOtpFunction if');
      setIsError(true);
      dispatch(setInternalMsg('Please enter mobile number (10 digit) or Email'));
      setShowMsg(true)
    }
    else if (!emailphone.test(emailvale)) {
      console.log('sendOtpFunction elseif');
      setIsError(true);
      dispatch(setInternalMsg('Please enter valid mobile number (10 digit) or Email.'));
      setShowMsg(true)
    }
    // if (registerOrignal.IsCustomerExist == true) {
    //   setIsError(true);
    //   dispatch(setInternalMsg(registerOrignal.Message));
    //   setShowMsg(true)
    // }
    else {
      console.log('sendOtpFunction else');
      // setviewotpdiv(true)
      dispatch(sendOtp(emailvale))
      // setshowResendBtn(false)
      // setClockStarted(true);
      // setUpdatedTimer(59)
      // setotpbuttonemail(false)
      // setshowResendBtn(true)
    }
  }
  function sendOtpEmailCancelBtn() {
    setviewotpdiv(false)
    setClockStarted(false);
    setUpdatedTimer(59)
  }
  // mobile send OTP function
  function sendOtpphoneFunction(ifNotError, ifError) {
    // alert('send otp phone function')
    console.log(ifNotError, ifError);
    const emailphone = new RegExp(/^(?:\d{10}|)$/);
    if (mobno === '') {
      console.log('sendOtpFunction if');
      setIsError(true);
      dispatch(setInternalMsg('Please enter mobile number (10 digit) or Email'));
      setShowMsg(true)
      // document.getElementById(ifError).focus()
      // setTimerShow(false)
      // closeMsgBar()
    }
    else if (!emailphone.test(mobno)) {
      console.log('sendOtpFunction elseif');
      // setIsError(true);
      dispatch(setInternalMsg('Please enter valid mobile number (10 digit) or Email.'));
      // setShowMsg(true)
      // document.getElementById(ifError).focus()
      // setTimerShow(false)
      // closeMsgBar()
    }
    else {
      // setviewotpdiv(false)
      // setviewotpphonediv(true)
      console.log('sendOtpFunction else');
      dispatch(sendOtp(mobno))
    }
  }
  function onchangefirstname(e) {
    // setFname(e.target.value.replace("/[^a-zA-Z\d]/ig,"))
    if (e.target.value.match("^[a-zA-Z ]*$") != null) {
      setFname(e.target.value);
    }
  }
  function onchangelastname(e) {
    if (e.target.value.match("^[a-zA-Z ]*$") != null) {
      setLname(e.target.value);
    }
  }
  function onchangemobileno(e) {
    console.log("mmvaluee", location.state.userName)
    console.log("mvalue", mobno)
    if (e.target.value.match("[1-9]{0}[0-9]{0}") != null) {
      setMobno(e.target.value.slice(0, 10));
      // setdisableinput(true)
      setotpbuttonphone(false)
    }
  }
  useEffect(() => {
    if (location && location.state && location.state.userName !== undefined && location.state.userName !== '' && location.state.userName.length === 10) {
      setMobno(location.state.userName)
      setMobnodisable(true)
      setcolor('#e9ecef')
      setotpphoneverifyflag(true)
    }
    else {
      setemailvalue(location.state.userName)
      setEmailvaluedisable(true)
      setcolor('#e9ecef')
      setotpverifyflag(true)
    }
  }, [location && location.state && location.state.userName])
  const deliverypolicy = () => {
    localStorage.setItem('pagefootert', "delivery-policy-react")
    history.push('/subfooter')
  }
  const TimerForOTP = () => (
    < div id="resendOtpTimerNewdiv" >
      <p id="resendOtpTimerNew" className="text-center">
        00:{UpdatedTimer < 10 ? 0 : ''}{UpdatedTimer}
      </p>
    </div >
  )
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      {showMsg && < Success isError={isError} msg={msg} />}
      {/* <ToastContainer /> */}
      {/* {isError === true ? <Showalert /> : null}
      {isSuccess === true ? <ShowalertSuccess /> : null} */}
      <div className="login-wrapper pb-35" style={{ paddingTop: 20 }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <main className="site-main" id="primary">
                <div className="user-login">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                      <div className="section-title text-center">
                        <p align="center" style={{ padding: '10px,0px' }}>
                          <Link to="/">
                            <img referrerPolicy='no-referrer' alt="brand-logo" src={brandlogo} style={{ paddingLeft: '23px' }} width="198px"
                              height="42px" />
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mainbodycontent" >
                  <div className="login-wrapper pb-35">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          <main id="primary" className="site-main">
                            <div className="user-login">
                              <div className="row">
                              </div>
                              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 offset-xl-2">
                                <div className="login-form" id="divRegisterOTPForm" style={{ width: '780px', margin: 'auto' }} >
                                  {/* <div id="frmRegisterCustomer" className="login-form" > */}
                                  < h3 align="center">
                                    Create an Account
                                  </h3>
                                  <p align="center">
                                    <small>Already registered with us?
                                      <Link style={{ color: 'dodgerblue' }}
                                        to="/login"> Please Login</Link>
                                    </small>
                                  </p>
                                  <br />
                                  <form className="form-horizontal" id="frmLoginWithPassword"
                                    onSubmit={handleSubmit(onSubmit)}>
                                    <input name="__RequestVerificationToken" type="hidden"
                                      defaultValue=""></input>
                                    <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response"
                                      defaultValue=""></input>
                                    <input type="hidden" name="action" defaultValue="validatecaptcha" />
                                    <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" />
                                    <input type="hidden" id="tempCustomerRegistraionOtpGuid" defaultValue="" />
                                    <input id="hdnCustomerRegistrationOTPGUID" type="hidden" name="CustomerRegistrationOTPGUID"
                                      defaultValue="" />
                                    <input id="hdnUserNameType" type="hidden" name="UserNameType" defaultValue="" />
                                    <input id="hdnUserName" type="hidden" name="UserName" defaultValue="" />
                                    <input id="hdnIsEmailVerified" type="hidden" data-val="true"
                                      data-val-required="The IsEmailVerified field is required." name="IsEmailVerified" defaultValue="" />
                                    <input id="hdnIsPhoneVerified" type="hidden" data-val="true"
                                      data-val-required="The IsPhoneVerified field is required." name="IsPhoneVerified" defaultValue=""></input>
                                    <div className="form-group align-items-center mb-4 pl-20 pr-20 regi_frm" id="frmlogin">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <label className="pb-10" htmlFor="Name">First Name
                                            <span
                                              style={{ color: 'red', padding: '5px' }}>*</span>
                                          </label>
                                          <input
                                            type="text" className="form-control plcehldname" required=""
                                            placeholder="Enter First Name"
                                            value={fname}
                                            pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                                            {...register('firstName', { required: true })}
                                            onChange={(e) => onchangefirstname(e)}
                                          />
                                          {errors.firstName &&
                                            <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                                              Please enter first name.
                                            </span>
                                          }
                                        </div>
                                        <div className="col-md-6">
                                          <label className="pb-10" htmlFor="Name">Last Name
                                            <span
                                              style={{ color: 'red', padding: '5px' }}>*</span>
                                          </label>
                                          <input type="text" className="form-control plcehldname"
                                            required="" placeholder="Enter Last Name"
                                            pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                                            {...register('lastName', { required: true })}
                                            value={lname}
                                            onChange={(e) => onchangelastname(e)}
                                          />
                                          {errors.lastName &&
                                            <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                                              Please enter last name.
                                            </span>
                                          }
                                        </div>
                                      </div>
                                      <br />
                                      <div className="row">
                                        <div className="col-md-10">
                                          <label className="pb-10" htmlFor="Email">
                                            Email Address
                                          </label>
                                          {props && props.location && props.location.state && props.location.state.email === null ?
                                            <input type="email" id="email" className="form-control plcehldname1"
                                              required="" placeholder="Enter Email Address"
                                              {...register('email', { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                                              defaultValue={emailvale}
                                            // style={{ backgroundColor: color && emailvale !==''?  color:null}}
                                            // disabled={color && emailvale !==''? true:false}
                                            />
                                            :
                                            <input type="email" id="email1" className="form-control plcehldname1"
                                              placeholder="Enter Email Address"
                                              value={emailvale}
                                              onChange={(e) => onchangevalidateemail(e)}
                                              style={{ backgroundColor: color && emailvale !== '' && Emailvaluedisable === true ? color : null }}
                                              disabled={!!(color && emailvale !== '' && Emailvaluedisable === true)}
                                            // disabled={disableinput}
                                            />}
                                          {errors && errors.email &&
                                            <span className="text text-danger field-validation-valid"
                                              style={{ textalign: 'left' }} >
                                              Please enter email.
                                            </span>
                                          }
                                        </div>
                                        {/* {
                                                props && props.location && props.location.state && !props.location.state.email ?
                                                  <div id="divChangeEmail" className="col-md-2" >
                                                    <span id="txtSendEmailOTPId" className="btn btn-link btnSendEmailOTP sendotptxt" style={{ marginTop: '23px' }} onClick={() => sendOtpFunction('txtEmailOTP', 'email')}>Send OTP</span>
                                                  </div>
                                                  : null
                                              } */}
                                        {otpbuttonemail === true
                                          ?
                                          <div id="divChangeEmail" className="col-md-2" >
                                            <span id="txtSendEmailOTPId" className="btn btn-link btnSendEmailOTP sendotptxt" onClick={() => sendOtpFunction('txtEmailOTP', 'email')}>Send OTP</span>
                                          </div>
                                          :
                                          null
                                        }
                                      </div>
                                      <br />
                                      {viewotpdiv ?
                                        <div className="row spac" style={{ alignSelf: 'center' }}>
                                          <div className="form-group row otpmail" id="divEmailOTP">
                                            <div className="col-sm-8 input-group mspc">
                                              <input type="password" id="txtEmailOTP" className="form-control"
                                                maxLength={4} // value={otpvalueemail}
                                              // onChange={(e) => onchangeotpemai(e)}
                                              />
                                              {/* <div className="btn-group">
                                                      <span id="resendEmailOtpTimer" className="input-group-text spntmr">00:{counter}</span>
                                                      <span id="spnEmailVerified" title="Verified" style={{ display: 'none', color: 'green', paddingTop: '10px' }}
                                                        className="input-group-text fa fa-check"></span>
                                                    </div> */}
                                              <div className="input-group-append btns">
                                                <div className="btn-group otpspn" id="btnvrfy">
                                                  {clockStarted ? <TimerForOTP /> : null}
                                                  {/* {counter === '00' ? */}
                                                  {showResendBtn
                                                    &&
                                                    clockStarted ?
                                                    <button id="btnSendEmailOTP"
                                                      type="button" className={clockStarted ? 'btn btn-secondary input-group-btn disabled' : 'btn btn-secondary input-group-btn'} disabled onClick={sendOtpFunction}>
                                                      Resend
                                                    </button>
                                                    :
                                                    <button id="btnSendEmailOTP"
                                                      type="button" className={clockStarted ? 'btn btn-secondary input-group-btn' : 'btn btn-secondary input-group-btn'} onClick={sendOtpFunction}>
                                                      Resend
                                                    </button>
                                                  }
                                                  {/* </button> : null} */}
                                                  <button type='button' id="txtVerifyUnverifiedEmail" className="btn btn-link" onClick={() => verifyotp('email')}> Verify</button>
                                                  <button type='button' id="txtCancelEmailVerification" className="btn" onClick={sendOtpEmailCancelBtn} >Cancel</button>
                                                  {/* <span id="txtVerifyUnverifiedEmail" className="btn btn-link" >Verify</span>
                                                        <span id="txtCancelEmailVerification" className="btn btn-link">Cancel</span> */}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-6">
                                              <span id="spnEmailOTPMessage" className="text text-danger"></span>
                                            </div>
                                          </div>
                                        </div>
                                        : null}
                                      <br /><br />
                                      <div className="row spc">
                                        <div className="col-md-10" style={{ marginTop: '-20px' }}>
                                          <label className="pb-10" htmlFor="Mobile">
                                            Mobile Number
                                          </label>
                                          {props && props.location && props.location.state && props.location.state.phone === null ?
                                            <input type="number" id="Mobile"
                                              maxLength={10}
                                              className="form-control plcehldname"
                                              placeholder="Enter Mobile Number"
                                              Value={mobno}
                                            // {...register('mobile', { pattern: "[1-9]{0}[0-9]{0}" })}
                                            // value={defaultValuePhone}
                                            /> :
                                            <input type="number" id="Mobile1" className="form-control" placeholder='Enter Mobile Number' maxLength={10}
                                              pattern="[1-9]{0}[0-9]{0} " autoComplete='off'
                                              value={mobno}
                                              style={{ backgroundColor: color && mobno !== '' && Mobnodisable === true ? color : null }}
                                              // value={location.state.userName !==''?location.state.userName:mobno}
                                              // defaultValue={mobno}
                                              disabled={!!(color && mobno !== '' && Mobnodisable === true)}
                                              // onKeyPress="return onchangemobileno(e)"
                                              // onChange={(e) => onchangevalidatemobie(e)}
                                              onChange={(e) => onchangemobileno(e)}
                                            />}
                                          {errors.Mobile &&
                                            <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                                              Please enter mobile.
                                            </span>
                                          }
                                        </div>
                                        {/* {props && props.location && props.location.state && !props.location.state.phone ?
                                                <div id="divChangePhone" className="col-md-2">
                                                  <span id="txtSendMobileOTPId" autoComplete="on" className="btn btn-link btnSendMobileOTP sendotptxt" onClick={() => sendOtpFunction('txtMobileOTP', 'Mobile')} >
                                                    Send OTP</span>
                                                </div> : null} */}
                                        {otpbuttonphone === true ? null :
                                          <div id="divChangeEmail" className="col-md-2" >
                                            <span id="txtSendEmailOTPId" className="btn btn-link btnSendEmailOTP sendotptxt" onClick={() => sendOtpphoneFunction('txtMobileOTP', 'Mobile')}>Send OTP</span>
                                          </div>
                                        }
                                      </div>
                                      <br /><br />
                                      {viewotpphonediv ?
                                        <div className="row spac">
                                          <div className="form-group row otpmail" id="divMobileOTP">
                                            <div className="col-sm-8 input-group mspc">
                                              <input id="txtMobileOTP" className="form-control form-control-sm-25 input-validation-error" name="OTP"
                                                type="password" maxLength="4" />
                                              {/* <div className="btn-group">
                                                      <span id="resendMobileOtpTimer" className="input-group-text spntmr">00:{counter}</span>
                                                      <span id="spnMobileVerified" title="Verified" style={{ color: 'green', paddingTop: '10px' }}
                                                        className="input-group-text fa fa-check"></span>
                                                    </div> */}
                                              <div className="input-group-append btns">
                                                <div className="btn-group otpspn" id="btnvrfy">
                                                  {/* {counter === '00' ?
                                                    <button id="btnSendMobileOTP" style={{ marginLeft: '10px' }} type="button"
                                                      className="btn btn-secondary input-group-btn" disabled="">
                                                      Resend
                                                    </button> : null} */}
                                                  {clockStarted ? <TimerForOTP /> : null}
                                                  {showResendBtn
                                                    &&
                                                    clockStarted ?
                                                    <button id="btnSendEmailOTP"
                                                      type="button" className={clockStarted ? 'btn btn-secondary input-group-btn disabled' : 'btn btn-secondary input-group-btn'} disabled onClick={sendOtpphoneFunction}>
                                                      Resend
                                                    </button>
                                                    :
                                                    <button id="btnSendEmailOTP"
                                                      type="button" className={clockStarted ? 'btn btn-secondary input-group-btn' : 'btn btn-secondary input-group-btn'} onClick={sendOtpphoneFunction}>
                                                      Resend
                                                    </button>
                                                  }
                                                  <span id="txtVerifyUnverifiedMobile" className="btn btn-link" onClick={() => verifyotp('mobile')}>Verify</span>
                                                  <span id="txtCancelMobileVerification" className="btn btn-link" onClick={() => setviewotpphonediv(false)}>Cancel</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-6">
                                              <span id="spnEmailOTPMessage" className="text text-danger"></span>
                                            </div>
                                          </div>
                                        </div>
                                        : null}
                                      <div className="login-box" style={{ marginTop: '-20px' }}>
                                        <div className="form-check row">
                                          <div className="col-md-12 col-sm-12 row chkbx" style={{ width: '100%' }}>
                                            <div className="col-md-6 col-sm-12 rec_rW" style={{ position: 'relative', display: 'flex', width: '25%', marginRight: '-160px' }}>
                                              <div className='custom-checkbox' style={{ display: 'inline', textAlign: 'left' }}>
                                                <label className="myprof" style={{ fontFamily: 'Work Sans', fontSize: '14px' }}>Receive offers
                                                  <input id="ReceiveOffers" type="checkbox" />
                                                  <span id="recieveoffer" className="checkmarkmyprof" style={{ width: '26px', height: '26px' }}></span>
                                                </label>
                                                {/* <input id="ReceiveOffers" type="checkbox"
                                                        value />
                                                      <label className="form-check-label chklbl" htmlFor="ReceiveOffers">Receive offers</label>
                                                      <span className="checkmark"></span> */}
                                              </div>
                                            </div>
                                            <div className="col-md-6 col-sm-12 rec_rW" >
                                              <div className='custom-checkbox' style={{ display: 'inline' }}>
                                                {/* <Input id="newslettersubscription" */}
                                                {/* type="checkbox" /> */}
                                                {/* <input data-val="true"
                                                        id="newslettersubscription" type="checkbox" /> */}
                                                <label className="myprof" htmlFor="newslettersubscription" label style={{ fontFamily: 'Work Sans', fontSize: '14px' }}>Sign up For Our Newsletter
                                                  <input style={{ marginLeft: "-19px" }}
                                                    id="newslettersubscription" type="checkbox" />
                                                  <span id="signup" className="checkmarkmyprof" style={{ width: '26px', height: '26px' }}></span>
                                                </label>
                                                {/* <label className="form-check-label chklbl" htmlFor="newslettersubscription">Sign up For Our Newsletter</label>
                                                      <span className="checkmark"></span> */}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="form-check row">
                                            <div className="col-md-6" id="btnreg">
                                              <input type="hidden" name="ReturnURL" />
                                              {/* <input type="submit" id="loginuserRegister" defaultValue="" className="btn btn-secondary mt-4 cntr" onSubmit={handleSubmit(onSubmit)}
                                                    /> */}
                                              <div id="registerme">
                                                <button type="submit" id="loginuserRegister" className="btn btn-secondary mt-4 cntr" onSubmit={handleSubmit(onSubmit)} >
                                                  Register Me
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                          <br />
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div >
                              </div >
                            </div>
                            {/* </div> */}
                          </main>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div>
                  </div>
                </div> */}
              </main>
            </div>
          </div >
        </div >
      </div >
      <div className="scroll-top not-visible"> <i className="fa fa-angle-up"></i> </div>
      <div style={{ textAlign: 'center', marginTop: '-30px' }} className="check_foot">
        <form id="mc-form">
        </form>
        <p align="center" style={{ paddingTop: '10px' }}>
          <small>
            {/* <Link to="/delivery-policy" style={{ color: 'dodgerblue' }}>Delivery Policy</Link>&nbsp; &nbsp; */}
            <a href onClick={deliverypolicy} to="/subfooter" style={{ color: 'dodgerblue', cursor: 'pointer' }}>Delivery Policy</a>&nbsp;&nbsp;
            <Link to="/faq" style={{ color: 'dodgerblue' }}>Help</Link>
          </small>
        </p>
        <div>
          <p align="center" style={{ paddingTop: '0px', paddingBottom: '35px' }}><small>2023 &copy; Adibuja Private Limited, All Rights Reserved</small></p>
        </div>
      </div>
    </>
  )
}