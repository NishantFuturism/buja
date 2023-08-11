/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-useless-escape */
// 'no-plusplus': 'error',
/**
 *
 * RegisterOrignal
 *
 */
import React, { useEffect, useState } from 'react';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import GoogleLogin from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
//import { Link, useHistory, useLocation } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import '../../public/assets1/css/default.min.css';
import '../../public/assets1/css/responsive.min.css';
import '../../public/assets1/css/style.min.css';
// import { text } from '@fortawesome/fontawesome-svg-core';
import { ToastContainer, toast } from 'react-toastify';
import jwt_Decode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
// import jWt_Decode from "jwt-decode";
//import brandlogo from '../../public/assets1/img/icon/adibuja-logo.svg';
import Success from '../components/ShowAlert/success';
// import history from '../../utils/history';
import Input from '../containers/HomePage/Input';
import mycartAPI from "../containers/MainPage/api/mycartAPI";
import homeServicesAPI from "../containers/MainPage/api/homeServices";
// import { sendOtp, setInternalMsg, verifyOtpAction, registeruserdata } from './actions';
import { sendOtp, verifyOtpAction, registeruserdata, newUserRegistrationWithMobileOrEmail, userRegisterationUsingGmail, getCustIdByEmail } from '../containers/RegisterOrignal/actions';
// import { loginWithPasswordAction } from '../Login/actions';
import reducer from '../containers/RegisterOrignal/reducer';
import saga from '../containers/RegisterOrignal/saga';
import '../containers/RegisterOrignal/RegisterOriginal.css'
// import Child from './RegisteredForm'
// import { initial, isNull } from 'lodash';
// import { render } from 'react-testing-library';
export function RegisterOrignal() {
  useInjectReducer({ key: 'registerOrignal', reducer });
  useInjectSaga({ key: 'registerOrignal', saga });
  // const registerOrignal = useSelector(state=>state.registerOrignal)
  const [msg, setMsg] = useState('')
  const [formView] = useState()
  const [isError, setIsError] = useState('');
  const [FirstCall, setFirstCall] = useState(0);
  const [showMsg, setShowMsg] = useState(false);
  const [ShowOTPView, setShowOTPView] = useState(false);
  // const [SendOTPData, setSendOTPData] = useState(false);
  const [UpdatedTimer, setUpdatedTimer] = useState(60);
  const [clockStarted, setClockStarted] = useState(false);
  const [disableinput, setdisableinput] = useState(false);
  const [enablechangeview, setenablechangeview] = useState(false);
  const [enableDoneButton, setEnableDoneButton] = useState(false);
  const [oTPVerfied, setOTPVerfied] = useState(false);
  const [userMobileNo, setUserMobileNo] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  // const [TimerShow, setTimerShow] = useState(false);
  // const [otp, setOTP] = useState('')
  //const history = useHistory();
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  //const location = useLocation();
  // const [Uname, setUname] = useState('')
  // useEffect(() => {
  //   if (location && location.state) {
  //     setUserName(location.state.userName)
  //     sendOtpFunction()
  //   }
  // }, [location])
  // const sendOtpApiResponse = useSelector(state => state.login)
  const registerOrignal = useSelector(state => state.registerOrignal);
  const [registerOrignalData] = useState(registerOrignal)
  const oTPVerify = useSelector(state => state.registerOrignal);
  const userRegisterMobileOrEmailResponse = useSelector(state => state.registerOrignal)
  const gmailLoginResponse = useSelector(state => state.registerOrignal)
  const getCustomerRegisteredDetailUsingGmail = useSelector(state => state.registerOrignal)
  console.log('oTPVerify----', oTPVerify)
  const sendOtpApiResponse = useSelector(state => state.login)
  const homeReducerData = useSelector(state => state.home)
  const [sendOtpApiResponseData] = useState(sendOtpApiResponse)
  console.log('sendOtpApiResponseData---', sendOtpApiResponseData)
  console.log("registerOrignal--", registerOrignal);
  const [googleSignInEmailId, setGoogleSignInEmailId] = useState('')
  const [googleSignInFirstName, setGoogleSignInFirstName] = useState('')
  const [googleSignInLastName, setGoogleSignInLastName] = useState('')
  // const [registerOriginalData, setRegisterOriginalData] = useState()
  // console.log('registerOriginalData 67', registerOriginalData)
  // const [isCustmerExist, setIsCustmerExist] = useState(false)
  const [googleLoginResponseCount, setGoogleLoginResponseCount] = useState(0)
  useEffect(() => {
    setFirstCall(FirstCall + 1)
    setGoogleLoginResponseCount(0)
    setShowOTPView(false)
    // setUpdatedTimer()
    setShowMsg(false)
    // setOtpVarifyData({})
    setOTPVerfied(false)
    console.log('registerOrignalData', registerOrignalData)
  }, [])
  useEffect(() => {
    // console.log('userName type', userName)
    // console.log('check location--', location)
    // if the user is not comming from another page
    if (registerOrignal !== undefined) {
      if ((router.pathname === "/register")) {
        console.log('registerOrignal.sendOTPData====', registerOrignal)
        // This call is check wether the user is register or not
        // dispatch(sendOtp(document.getElementById('txtRegisterUserNameForOTP').value))
      }
      // setRegisterOriginalData(registerOrignal)
    }
  }, [userName])
  useEffect(() => {
    console.log('registerOrignal useeffect', registerOrignal);
    // setRegisterOriginalData(registerOrignal)
    // check user is exist if exist redirect to login page
    //console.log('location--', location)
    // if (location.rediractFrom !== "/login" && registerOrignal !== undefined && registerOrignal.sendOTPData !== undefined && registerOrignal.sendOTPData.IsCustomerExist === true) {
    // alert('123---' + document.getElementById('registerUserWithOTP'))
    if (userName !== '' && registerOrignal !== undefined && registerOrignal.sendOTPData !== undefined && registerOrignal.sendOTPData.IsCustomerExist === true) {
      // alert('Customer is already exist')
      console.log('HI....', registerOrignal)
      setIsError(true)
      // dispatch(setInternalMsg('This Customer already register, redirecting to login page...'))
      if (registerOrignal.sendOTPData.Message === "Mobile Already Exist") {
        setMsg('This mobile no already register, Please redirecting to login page')
      } else {
        // Email Already Exist
        setMsg('This email already exists. Please redirect to login page')
      }
      setShowMsg(true)
      clearTimeout()
      setShowOTPView(false)
      setTimeout(() => {
        router.push({ pathname: '/login', state: { userName }, rediractFrom: '/register' })
        // document.getElementById('sendloginUserWithOTP').click()
      }, 2000)
    }
    // if the user is not register then first verify the OTP
    // else if (FirstCall > 0 && registerOrignal !== undefined && registerOrignal.sendOTPData !== undefined && registerOrignal.sendOTPData.IsCustomerExist === false) {
    // }
    // if (registerOrignal.userRegistrationUsingGmailLoginResponse !== undefined && registerOrignal.userRegistrationUsingGmailLoginResponse === "Email Already Exist") {
    //   alert('not empty gmail login response')
    //   // dispatch(sendOtp(document.getElementById('txtRegisterUserNameForOTP').value))
    //   let clientid = 1
    //   let emailId = googleSignInEmailId
    //   let customerType = 1
    //   dispatch(getCustIdByEmail(clientid, emailId, customerType))
    // } else if (registerOrignal.userRegistrationUsingGmailLoginResponse !== "Email Already Exist") {
    //   alert('empty gmail login response')
    // }
  }, [registerOrignal])
  useEffect(() => {
    // alert('userRegistrationUsingGmailLoginResponse')
    // console.log('registerOrignal---', typeof registerOrignal.userRegistrationUsingGmailLoginResponse)
    console.log('gmailLoginResponse--', gmailLoginResponse)
    if (gmailLoginResponse && gmailLoginResponse.userRegistrationUsingGmailLoginResponse !== 'undefined' && gmailLoginResponse.userRegistrationUsingGmailLoginResponse !== undefined) {
      if (googleLoginResponseCount < 1 && gmailLoginResponse.userRegistrationUsingGmailLoginResponse
        !== '' && gmailLoginResponse.userRegistrationUsingGmailLoginResponse
        === "Email Already Exist") {
        // alert('Email Already Exist')
        // dispatch(sendOtp(document.getElementById('txtRegisterUserNameForOTP').value))
        const clientid = 1
        const emailId = googleSignInEmailId
        const customerType = 1
        dispatch(getCustIdByEmail(clientid, emailId, customerType))
        setGoogleLoginResponseCount(1)
      }
      if (googleLoginResponseCount < 1 && gmailLoginResponse.userRegistrationUsingGmailLoginResponse
        !== '' && gmailLoginResponse.userRegistrationUsingGmailLoginResponse
        === "Phone number Already Exist") {
        const clientid = 1
        const emailId = googleSignInEmailId
        const customerType = 1
        dispatch(getCustIdByEmail(clientid, emailId, customerType))
        setGoogleLoginResponseCount(1)
      }
      if (googleLoginResponseCount < 1 && gmailLoginResponse.userRegistrationUsingGmailLoginResponse !== '' && gmailLoginResponse.userRegistrationUsingGmailLoginResponse !== undefined && gmailLoginResponse.userRegistrationUsingGmailLoginResponse !== 'Email Already Exist') {
        // alert('Email is not Already Exist')
        const clientid = 1
        const emailId = googleSignInEmailId
        const customerType = 1
        dispatch(getCustIdByEmail(clientid, emailId, customerType))
        setGoogleLoginResponseCount(1)
      }
    }
  }, [gmailLoginResponse])
  useEffect(() => {
    // if()
    if (getCustomerRegisteredDetailUsingGmail && getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin !== 'undefined' && getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin !== undefined) {
      if ((getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin).length > 0) {
        console.log('hii', getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin[0].GUID)
        localStorage.setItem('CustGUID', window.btoa(getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin[0].GUID))
        // localStorage.setItem('ClientId', window.btoa(sendOtpApiResponse.customerlogindata.ClientId))
        localStorage.setItem('UserFirstName', googleSignInFirstName)
        localStorage.setItem('User', JSON.stringify(getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin))
        localStorage.setItem('UserLastName', googleSignInLastName)
        // localStorage.setItem('UserLastPhone', userMobileNo)
        localStorage.setItem('UserLastPhone', null)
        localStorage.setItem('Email', (getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin[0].Email))
        // call cart update 
        if (homeReducerData && homeReducerData.allCartData.cart) {
          mycartAPI.updatecart(null, homeReducerData.allCartData.cart[0].cart[0].Quantity, homeReducerData.allCartData.cart[0].cart[0].SkuId, homeReducerData.allCartData.cart[0].cart[0].SKUFilterPriceId);
        }
        const redirectToPath = localStorage.getItem("lastVisitedUrl");
        // history.push(redirectToPath);
        if (redirectToPath && redirectToPath !== "") {
          setTimeout(() => {
            router.push(redirectToPath)
          }, 100)
        } else {
          setTimeout(() => {
            router.push('/')
          }, 100)
        }
      }
    }
  }, [getCustomerRegisteredDetailUsingGmail])
  useEffect(() => {
    console.log('.OTPVerify useEffect--', oTPVerify)
    if (FirstCall > 0 && oTPVerify !== '' && oTPVerify !== undefined) {
      if (oTPVerify.OTPVerify === 1) {
        // history.push({ pathname: '/register/form', state: { userName } })
        setOTPVerfied(true)
        console.log('oTPVerify.OTPVerify---', oTPVerify.OTPVerify)
      } else if (oTPVerify.OTPVerify === 0) {
        // toast('Enter valid OTP')
        setIsError(true)
        setShowMsg(false)
        setMsg('Please enter valid OTP')
      }
    }
  }, [oTPVerify])
  useEffect(() => {
    // alert(`oTPVerfied ${ oTPVerfied}`)
    if (oTPVerfied === true) {
      const validMobileNoCheck = new RegExp(/^(?:\d{10}|)$/);
      let userMobileNoTemp = ''
      let userEmailTemp = ''
      const generatePsw = generatePassword()
      // alert(`generatePsw---${generatePsw}`)
      setUserPassword(generatePsw);
      if (validMobileNoCheck.test(userName)) {
        // alert(`username is mobile${userName}`)
        userMobileNoTemp = userName
        setUserMobileNo(userMobileNoTemp)
        setUserEmail('')
        dispatch(newUserRegistrationWithMobileOrEmail(userMobileNoTemp, userEmailTemp, generatePsw))
      } else {
        // alert(`username is email id${userName}`)
        userEmailTemp = userName
        setUserMobileNo('')
        setUserEmail(userEmailTemp)
        dispatch(newUserRegistrationWithMobileOrEmail(userMobileNoTemp, userEmailTemp, generatePsw))
      }
    }
  }, [oTPVerfied])
  useEffect(() => {
    // alert('generatePassword is' + userPassword)
  }, [userPassword])
  const generatePassword = () => {
    const passwordLength = 7; // it will generate the 8 character password
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 0; i <= passwordLength; i += 1) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  }
  useEffect(() => {
    // console.log('registerOrignal--', registerOrignal)
    if (registerOrignal !== undefined && registerOrignal.userRegisterMobileOrEmailResponse.CustGUID !== '' && registerOrignal.userRegisterMobileOrEmailResponse.CustGUID !== undefined) {
      console.log('registerOrignal---', registerOrignal)
      console.log('sendOtpApiResponse---', sendOtpApiResponse)
      localStorage.setItem('CustGUID', window.btoa(registerOrignal.userRegisterMobileOrEmailResponse.CustGUID))
      // localStorage.setItem('ClientId', window.btoa(sendOtpApiResponse.customerlogindata.ClientId))
      localStorage.setItem('UserFirstName', null)
      // localStorage.setItem('User', JSON.stringify(sendOtpApiResponse && sendOtpApiResponse.customerlogindata))
      localStorage.setItem('UserLastName', null)
      localStorage.setItem('UserLastPhone', userMobileNo)
      localStorage.setItem('Email', userEmail)
      // localStorage.setItem('CustomerId', window.btoa(sendOtpApiResponse.customerlogindata.CustomerId))
      setIsError(false)
      setShowMsg(true)
      // setMsg('Customer registerd successfully')
      setMsg('Registration successfull!')
      // update cart after registration
      if (homeReducerData && homeReducerData.allCartData.cart) {
        mycartAPI.updatecart(null, homeReducerData.allCartData.cart[0].cart[0].Quantity, homeReducerData.allCartData.cart[0].cart[0].SkuId, homeReducerData.allCartData.cart[0].cart[0].SKUFilterPriceId);
      }
      homeServicesAPI.getcustomerbyguid(registerOrignal.userRegisterMobileOrEmailResponse.CustGUID)
        .then((guidRes) => {
          console.log("guidRes==", guidRes);
          localStorage.setItem('User', JSON.stringify(guidRes));
        })
      const redirectToPath = localStorage.getItem("lastVisitedUrl");
      if (redirectToPath && redirectToPath !== "") {
        setTimeout(() => {
          router.push(redirectToPath)
        }, 2000)
      } else {
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    }
  }, [userRegisterMobileOrEmailResponse])
  useEffect(() => {
    // console.log('location print', location)
    // pathname : "/register"
    // if (location && location.state) {
    //console.log('location.state--', location)
    if (router && router.rediractFrom === '/login' && router.state.Uname !== null) {
      setUserName(router.state.Uname)
      console.log('location.state.Uname updated', typeof router.state.Uname)
      // setEnableDoneButton(true)
      // sendOtpFunction()
      setTimeout(() => {
        // setEnableDoneButton(true)
        setenablechangeview(false)
        setShowOTPView(true)
        // document.getElementById('btnRegisterChangeUserNameDone').click()
        // document.getElementById('registerUserWithOTP').click()
        // document.getElementById('txtRegisterOTP').focus()
        // document.getElementById('registerUserWithOTP').click()
        sendOTPButtonClick()
        // setdisableinput(true)
        // sendOtpFunction()
        // alert('location updated in register page')
      }, 2000)
      console.log('enablechangeview===', enablechangeview)
    }
    if (router && router.rediractFrom === '/login' && router.state.Uname === null) {
      setUserName('')
      //console.log('location.state.Uname updated', router.state.Uname)
      setTimeout(() => {
        setenablechangeview(false)
        setShowOTPView(false)
      }, 2000)
      console.log('enablechangeview===', enablechangeview)
    }
  }, [router])
  useEffect(() => {
    // console.log(`clockStarted useEffect${FirstCall}${UpdatedTimer}`)
    if (FirstCall > 0 && UpdatedTimer === 0) {
      // alert('FirstCall > 0 && UpdatedTimer === 0 ', UpdatedTimer)
      setClockStarted(false);
      // setUpdatedTimer(UpdatedTimer)
    }
    if (FirstCall > 0 && clockStarted === true && UpdatedTimer > 0) {
      // alert('if part firstcall > 0 and clockStarted === true')
      setTimeout(() => {
        const time = UpdatedTimer - 1
        setUpdatedTimer(time);
      }, 1000)
    }
    // else {
    //   console.log(`else condition of useEffect UpdatedTimer FirstCall${FirstCall}`)
    //   console.log(`clockStarted====:\`)${clockStarted}`)
    //   setClockStarted(false);
    // }
  }, [UpdatedTimer])
  const saveUserName = (e) => {
    // if (e.target.value.match("^(?! )[A-Za-z0-9-@.()]*(?<! )$") != null) {
    //   setUserName(e.target.value)
    // }
    if (/\s/g.test(e.target.value) === true) {
      const removeSpaceValue = e.target.value.replace(/\s/g, '');
      setUserName(removeSpaceValue)
    } else {
      setUserName(e.target.value)
    }
  }
  useEffect(() => {
    if (registerOrignal) {
      console.log('registerOrignal.OTPVerify ---', registerOrignal, userName)
    }
    // if (registerOrignal.OTPVerify === 0) {
    //   console.log('Register now btn---', oTPVerify.OTPVerify)
    //   toast('Enter valid OTP')
    //   // dispatch(setInternalMsg('Enter Valid OTP'))
    // }
    if (FirstCall > 0) {
      // console.log('useEffect formView', formView, userName, typeof userName);
      if (formView === 1) {
        if (String(userName).includes('@')) {
          // console.log('formView useEffect if');
          router.push({ pathname: '/register/form', state: { userName } })
        } else {
          // console.log('formView useEffect else');
          router.push({ pathname: '/register/form', state: { userName } })
        }
        // setFormView()
      }
      // if (formView === 0) {
      //   dispatch(setInternalMsg('Enter valid OTP'))
      //   setIsError(true)
      //   setFormView()
      // }
    }
  }, [formView])
  // useEffect(() => {
  //   if (FirstCall > 0 && SendOTPData) {
  //     console.log('SendOTPData if already', FirstCall, SendOTPData, UpdatedTimer);
  //     if (SendOTPData.IsCustomerExist) {
  //       dispatch(setInternalMsg('This Customer already register, redirecting to login page...'))
  //       history.push({ pathname: '/login', state: { userName } })
  //       setIsError(true)
  //       setShowOTPView(false)
  //     }
  //     // if (!SendOTPData.IsCustomerExist && userName) {
  //     //   console.log('SendOTPData else', SendOTPData);
  //     //   dispatch(setInternalMsg(SendOTPData.Message))
  //     //   setIsError(false)
  //     //   // document.getElementById('txtRegisterOTP').focus()
  //     //   setShowOTPView(true)
  //     //   // setTimerShow(true)
  //     //   clearTimeout()
  //     //   setUpdatedTimer(59)
  //     // }
  //   }
  // }) // [SendOTPData, FirstCall] removed
  useEffect(() => {
    // console.log('msg', msg);
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
    // counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    // const timer = setInterval(() => {
    //   // eslint-disable-next-line no-unused-expressions
    //   counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    // }, [counter]);
    // return () => {
    //   clearInterval(timer);
    // };
    // if (userdata) {
    //   const login = true
    //   dispatch(getgooglelogindata(userdata, login))
    //   history.push('/')
    // }
    // responseGoogle(response)
    // const login = true
    // localStorage.setItem('login', login);
    // localStorage.setItem('googlesignindata', userdata);
    // const login = true
    // localStorage.setItem('login', login);
  });
  function Regesternow() {
    // setdisableinput(true)
    // alert('Regester now btn calling')
    // const enteredOTP = document.getElementById('txtRegisterUserNameForOTP').value
    // console.log('enteredOTP--', enteredOTP)
    const enteredOTP = document.getElementById('txtRegisterOTP').value
    if (enteredOTP === '') {
      toast('Enter valid OTP')
    } else {
      dispatch(verifyOtpAction(registerOrignal.sendOTPData.CustomerGUID, enteredOTP)) // SendOTPData.CustomerGUID
      console.log('SendOTPData.CustomerGUID, OTP-----', registerOrignal.sendOTPData.CustomerGUID, enteredOTP)
      dispatch(registeruserdata(enteredOTP))
      console.log(`Register Now registerOrignal.OTPVerify----${registerOrignal.OTPVerify}`)
    }
  }
  function sendOtpFunction() {
    // alert('called sendOtpFunction')
    // const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/);
    // previous regex-- const emailphone = new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$');
    const emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    const phoneRegExp = new RegExp(/^\d{10}$/)
    // const emailphone = new RegExp('[a-z0-9]+@[a-z]+.edu.[a-z]{2,3}');
    // setenablechangeview(true)
    // setdisableinput(true)
    // setEnableDoneButton(false)
    // const event = e.target.id
    // console.log("e.target.id", e.target.id)
    if (document.getElementById('txtRegisterUserNameForOTP').value === '') {
      console.log("otpsection")
      // alert('if value is empty')
      setIsError(true);
      clearTimeout()
      setShowOTPView(false)
      // dispatch(setInternalMsg('Please enter mobile number (10 digit) or Email'));
      setMsg('Please enter mobile number (10 digit) or Email')
      setShowMsg(true)
      document.getElementById('txtRegisterUserNameForOTP').focus()
      // setTimerShow(false)
      closeMsgBar()
      setenablechangeview(false)
      setdisableinput(false)
    } else if ((!emailRegExp.test(document.getElementById('txtRegisterUserNameForOTP').value)) && (!phoneRegExp.test(document.getElementById('txtRegisterUserNameForOTP').value))) {
      // console.log("otpsection")
      // alert('if value is not valid')
      // console.log('mail', document.getElementById('txtRegisterUserNameForOTP').value);
      setIsError(true);
      // dispatch(setInternalMsg('Please enter valid mobile number (10 digit) or Email.'));
      setMsg('Please enter valid mobile number (10 digit) or Email.')
      setShowMsg(true)
      clearTimeout()
      setShowOTPView(false)
      document.getElementById('txtRegisterUserNameForOTP').focus()
      // setTimerShow(false)
      closeMsgBar()
    }
    // else if (registerOrignal.sendOTPData.IsCustomerExist === true) {
    //   // alert('Customer is already exist')
    //   setIsError(true)
    //   // dispatch(setInternalMsg('This Customer already register, redirecting to login page...'))
    //   if (registerOrignal.sendOTPData.Message === "Mobile Already Exist") {
    //     setMsg('This mobile no already register, Please redirecting to login page')
    //   } else {
    //     // Email Already Exist
    //     setMsg('This email already exists. Please redirect to login page')
    //   }
    //   setShowMsg(true)
    //   clearTimeout()
    //   setShowOTPView(false)
    //   setTimeout(() => {
    //     history.push({ pathname: '/login', state: { userName }, rediractFrom: '/register' })
    //     // document.getElementById('sendloginUserWithOTP').click()
    //   }, 2000)
    // } 
    else {
      // alert('isCustmerExist----', isCustmerExist)
      console.log("otpsection")
      dispatch(sendOtp(document.getElementById('txtRegisterUserNameForOTP').value))
    }
  }
  // function functionDone(e) {
  //   setShowOTPView(false)
  //   closeMsgBar()
  //   setShowMsg(true)
  //   console.log('value', enableDoneButton === false);
  //   console.log("firstCall", FirstCall);
  //   dispatch(sendOtp(document.getElementById('txtRegisterUserNameForOTP').value))
  //   const event = e.target.id
  //   if (event === document.getElementById('btnRegisterChangeUserNameDone')) {
  //     console.log("e.target.id", e.target.id)
  //     if (enableDoneButton === true && document.getElementById('txtRegisterUserNameForOTP').value !== '') {
  //       setEnableDoneButton(true)
  //       // setFirstCall(1)
  //       closeMsgBar()
  //     }
  //   }
  // }
  // useEffect((event) => {
  //   console.log('value', enableDoneButton === false);
  //   console.log("firstCall", FirstCall);
  //   console.log("no", document.getElementById('txtRegisterUserNameForOTP').value)
  //   if (event === document.getElementById('btnRegisterChangeUserNameDone')) {
  //     // console.log("e.target.id", e.target.id)
  //     if (enableDoneButton === true && document.getElementById('txtRegisterUserNameForOTP').value !== '') {
  //       setEnableDoneButton(true)
  //       // setFirstCall(1)
  //       closeMsgBar()
  //     }
  //   }
  // }); // removed dependency [sendOtpFunction]
  function closeMsgBar() {
    setTimeout(() => {
      setShowMsg(false)
      // dispatch(setInternalMsg())
    }, 3000);
  }
  const TimerForOTP = () => (
    < div id="resendOtpTimerNewdiv" >
      <p id="resendOtpTimerNew" className="text-center">
        00:{UpdatedTimer < 10 ? 0 : ''}{UpdatedTimer}
      </p>
    </div >
  )
  const sendOTPButtonClick = () => {
    setShowOTPView(true)
    setClockStarted(true)
    setUpdatedTimer(59)
    setenablechangeview(true)
    setEnableDoneButton(false)
    setdisableinput(true)
    sendOtpFunction();
  }
  const changeButtonClick = () => {
    setdisableinput(false)
    setenablechangeview(true)
    setEnableDoneButton(true)
    setShowOTPView(false)
    setUpdatedTimer(60)
    setClockStarted(false)
  }
  const arrowevent = () => {
    setenablechangeview(false)
    setdisableinput(false)
    // setShowSendOTP(true)
  }
  const doneButtonClick = () => {
    setEnableDoneButton(false)
    setShowOTPView(true)
    setClockStarted(true)
    setUpdatedTimer(59)
    sendOtpFunction()
    setdisableinput(true)
    // dispatch(sendOtp(document.getElementById('txtRegisterUserNameForOTP').value))
  }
  const deliverypolicy = () => {
    localStorage.setItem('pagefootert', "delivery-policy-react")
    router.push('/delivery-policy')
  }
  // console.log("setFormView..", setFormView)
  const googleAuthSuccessResponseMessage = (response) => {
    console.log('Google response message', response);
    const userObject = jwt_Decode(response.credential);
    console.log('userObject', userObject)
    setGoogleSignInEmailId(userObject.email)
    setGoogleSignInFirstName(userObject.given_name)
    setGoogleSignInLastName(userObject.family_name)
    if (userObject.email !== '') {
      const userDetails = {
        ClientId: 1,
        Title: null,
        CustGuid: null,
        Name: userObject.given_name,
        LastName: userObject.family_name,
        Email: userObject.email,
        Company: null,
        Mobile: null,
        Phone: null,
        Fax: null,
        Password: null,
        ConfirmPassword: null,
        Comments: null,
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
        NewsLetterSubscribed: false,
        Consignee: null,
        Telephone: null,
        isPrimary: false,
        isGuest: false,
        ReceiveOffers: false,
        IsEmailVerified: userObject.email_verified,
        IsPhoneVerified: false,
        BirthDate: null,
        CustomerType: 1,
        Extra1: null,
        businessCustomerDetail: {
          BusinessCustomerDetailsId: 0,
          CustomerId: 0,
          GUID: null,
          CompanyName: null,
          GSTNumber: null,
          BusinessName: null,
          BusinessAddress: null,
          BusinessPinCode: null,
          BusinessCity: null,
          BusinessState: null,
          Extra1: null,
          Extra2: null
        }
      }
      // dispatch(sendOtp(document.getElementById('txtRegisterUserNameForOTP').value))
      dispatch(userRegisterationUsingGmail(userDetails))
    }
  };
  const googleAuthErrorResponseMessage = (error) => {
    console.log(error);
    setShowMsg(true)
    setIsError(false)
    setMsg('Please enter correct gmail password')
  };
  return (
    <>
      <ToastContainer
        position="top-right"
      />
      {showMsg && < Success isError={isError} msg={msg} />}
   
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
                          <Link href="/">
                            <img referrerPolicy='no-referrer' alt="brand-logo" src='/assets1/img/icon/adibuja-logo.svg' style={{ paddingLeft: '23px' }} width="198px"
                              height="42px" />
                          </Link>
                        </p>
                      </div>
                      <div className="mainbodycontent">
                        <div className="login-wrapper pb-35">
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <main id="primary" className="site-main">
                                  <div className="user-login">
                                    <div className="row">
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 offset-xl-2">
                                      <div className="login-form" id="divRegisterOTPForm" style={{ padding: '25px' }}>
                                        <h3 align="center">
                                          Register Using OTP
                                        </h3>
                                        <p align="center">
                                          <small>
                                            Please check the OTP sent to your Mobile Number / Email
                                          </small>
                                        </p>
                                        <br />
                                        {enablechangeview === false ?
                                          <div className="form-group row align-items-center mb-4 reg_Otp_rw">
                                            <div className="rgt_ipt_box">
                                              <div className="input-group">
                                          
                                                <Input
                                                  className="form-control"
                                                  id="txtRegisterUserNameForOTP"
                                                  disabled={!!disableinput}
                                                  value={userName}
                                                  type='tel'
                                                  placeholder="Mobile No. / Email"
                                                  onChange={(e) => saveUserName(e)}
                                                // disabled={disabled} required=""
                                                />
                                                <div className="input-group-append">
                                                  
                                                </div>
                                              </div>
                                              <span className="text text-danger validation-error field-validation-valid" data-valmsg-for="UserName"
                                                data-valmsg-replace="true"></span>
                                              <p>
                                                <Link id="registerUserWithOTP" href="#" onClick={sendOTPButtonClick}
                                          
                                                  style={{ display: 'inline' }} >
                                                  Send OTP
                                                </Link>
                                              </p>
                                            </div>
                                          </div>
                                          :
                                          <div className="form-group row align-items-center mb-4 reg_Otp_rw">
                                            <label htmlFor="email" className="col-sm-3"></label>
                                            <div className="rgt_ipt_box">
                                              <div className="input-group">
                                                <div className="input-group-prepend">
                                                  <div className="input-group-text" id="registerBackIcon" style={{ cursor: 'pointer' }}><i className="fa fa-arrow-left input-group-addon" onClick={arrowevent} ></i></div>
                                                </div>
                                                <input
                                                  className="form-control"
                                                  name="UserName"
                                                  id="txtRegisterUserNameForOTP"
                                                  placeholder="Mobile No. / Email"
                                                  type="text"
                                                  disabled={!!disableinput}
                                                  defaultValue={userName}
                                                  onChange={(e) => saveUserName(e)} />
                                                {/* <input type="hidden" id="hdnIsUserCameFromLoginAfterUserNotExistsError" value="yes" /> */}
                                                {/* {!enableDoneButton === false ? */}
                                                <div className="input-group-append">
                                                  {enableDoneButton === false ?
                                                    <div className="btn-group">
                                                      <button type="button" id="btnRegisterChangeUserName" className="btn btn-default input-group-btn"
                                                        onClick={changeButtonClick}
                                                        style={{ backgroundColor: 'rgb(233, 236, 239)', border: '1px solid rgb(206, 212, 218) !important', }}>Change</button>
                                                    </div> :
                                                    < div className="btn-group">
                                                      <button type="button" id="btnRegisterChangeUserNameDone" className="btn btn-default input-group-btn"
                                                        onClick={doneButtonClick} //  sendOtpFunction
                                                        style={{ backgroundColor: '#e9ecef', border: '1px solid #ced4da !important', }}>Done</button>
                                                    </div>}
                                                </div>
                                              </div>
                                              <span className="text text-danger validation-error field-validation-valid" data-valmsg-for="UserName" data-valmsg-replace="true"></span>
                                              <p>
                                                <a href id="registerUserWithOTP" style={{ color: 'gray', position: 'absolute', top: '7px', right: '26px', zIndex: 10, display: 'none' }}>Send OTP</a>
                                              </p>
                                            </div>
                                          </div>}
                                        {ShowOTPView && (
                                          <div className="login-box text-center" id="divOTPsection" >
                                            <input value="" type="hidden" id="returnurl" name="returnurl" />
                                            <h3 style={{ color: '#888888' }}>Enter OTP</h3><br />
                                            <div id="divOuter">
                                              <div id="divInner">
                                                <input type='password' maxLength={4} id="txtRegisterOTP" required="" autoComplete="new-password" />
                                              </div>
                                              {clockStarted ? <TimerForOTP /> : null}
                                              {/* <TimerForOTP2 /> */}
                                            </div>
                                            <button type="button" id="btnRegisterWithOTP" className="btn btn-secondary mb-4 mt-4" onClick={Regesternow}>
                                              Register Now
                                            </button>
                                            {UpdatedTimer === 0 ?
                                              <p align="center" id="divResendRegisterOTP" >
                                                Not received your OTP? &nbsp;
                                                <i className="fa fa-refresh" style={{ color: 'dodgerblue' }}>
                                                  <button id="btnResendRegisterOTP" type='button' style={{ color: 'dodgerblue', cursor: 'pointer' }} onClick={doneButtonClick}
                                                  // sendOtpFunction
                                                  > {UpdatedTimer === 0 ? 'Resend OTP' : ''}</button></i>
                                              </p>
                                              : null}
                                            <br />
                                          </div>
                                        )}
                                        <div className="text-center pt-20 pb-20 top-bordered" style={{ paddingTop: '20px', paddingBottom: '20px', border: 'none' }}>
                                          <section>
                                            <p className="login-text text-center">Already registered with us? Please <Link href="/login"
                                              id="login" style={{ color: 'dodgerblue' }}>Login</Link></p>
                                          </section>
                                        </div>
                                        <div className="text-center pt-20 top-bordered" style={{ paddingTop: '20px', border: 'none' }}>
                                          <section>
                                            <h4 style={{ paddingBottom: '8px' }}>Use another service to log in.</h4>
                                            <form method="post" className="form-horizontal">
                                              <div>
                                                <p>
                                                  {/*
                                                  <div className='google-login-div'>
                                                    <GoogleLogin
                                                      style={{ width: '25% !important', margin: 'auto !important' }}
                                                      onSuccess={googleAuthSuccessResponseMessage}
                                                      onError={googleAuthErrorResponseMessage} />
                                                  </div>
                                                    */}
                                                </p>
                                              </div>
                                              <input name="__RequestVerificationToken" type="hidden"
                                              />
                                              <input name="__RequestVerificationToken" type="hidden"
                                              />
                                            </form>
                                     
                                          </section>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </main>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div >
      </div >
      <div className="scroll-top not-visible"> <i className="fa fa-angle-up"></i> </div>
      <div style={{ textAlign: 'center', marginTop: '-30px' }} className="check_foot">
        <form id="mc-form">
        </form>
        <p align="center" style={{ paddingTop: '10px' }}>
          <small>
            <a href onClick={deliverypolicy} style={{ color: 'dodgerblue', cursor: 'pointer' }}>Delivery Policy</a>&nbsp;&nbsp;
            <Link href="/faq" style={{ color: 'dodgerblue' }}>Help</Link>
          </small>
        </p>
        <div>
          <p align="center" style={{ paddingTop: '0px', paddingBottom: '35px' }}><small>2023 &copy; Adibuja Private Limited, All Rights Reserved</small></p>
        </div>
      </div>
    </>
  );
}
export default RegisterOrignal
