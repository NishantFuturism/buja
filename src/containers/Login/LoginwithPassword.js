/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
/* eslint-disable no-useless-escape */
/**
 *
 * LoginwithPassword
 *
 */
import React, { useEffect, useState } from 'react';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import GoogleLogin from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import '../../../assets1/css/default.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
// import { result , find } from 'lodash';
// const location = useLocation();
import { ToastContainer } from 'react-toastify';
import jwt_Decode from "jwt-decode";
import adibujalogo from '../../../assets1/img/icon/adibuja-logo.svg';
import Success from '../../components/ShowAlert/success';
import history from '../../utils/history';
import mycartAPI from "../MainPage/api/mycartAPI";
// import { closeMsgBar, DirectMessage, logindata, loginWithPasswordAction, sendOtpPswd } from './actions';
import { loginWithPasswordAction, sendOtpPswd, userRegisterationUsingGmail, getCustIdByEmail } from './actions';
import reducer from './reducer';
import saga from './saga';
import Constants from '../App/constants';
// import ManagePassword from '../MyAccount/managePassword';
import 'react-toastify/dist/ReactToastify.css';
// import { sendOtp, setInternalMsg, verifyOtpAction, registeruserdata } from '../RegisterOrignal/actions';
export function LoginwithPassword() {
  // const { n1passwordTxt, setn1passwordTxt } = props;
  // // const { cnfpasswordTxt, setcnfpasswordTxt } = props;
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  const dispatch = useDispatch()
  // const [Uname, setUname] = useState();
  const [firstLoadCheck, setFirstLoadCheck] = useState(0);
  const [isError, setisError] = useState(false);
  const [isExist] = useState(false);
  const [msg, setMsg] = useState('');
  const [Shown1password, setShown1password] = useState(false);
  const [textvalue, setTextValue] = useState('');
  const sendOtpApiResponse = useSelector(state => state.login)
  const homeReducerData = useSelector(state => state.home)
  // console.log("sendOtpApiResponse..", sendOtpApiResponse)
  const [sendOtpApiResponseData, setSendOtpApiResponseData] = useState(sendOtpApiResponse)
  // const registerOrignal = useSelector(state => state.registerOrignal);
  const [customerID] = useState('')
  const [showMsgTopBar, setShowMsgTopBar] = useState(false);
  const [googleSignInEmailId, setGoogleSignInEmailId] = useState('')
  const [googleSignInFirstName, setGoogleSignInFirstName] = useState('')
  const [googleSignInLastName, setGoogleSignInLastName] = useState('')
  const gmailLoginResponse = useSelector(state => state.login)
  const getCustomerRegisteredDetailUsingGmail = useSelector(state => state.login)
  const [googleLoginResponseCount, setGoogleLoginResponseCount] = useState(0)
  console.log()
  // const [passwordtext, setPasswordtext] = useState('');
  // useEffect(() => {
  //   if (location && location.state) {
  //     // setTextValue()
  //     console
  //   }
  // }, location)
  useEffect(() => {
    setFirstLoadCheck(firstLoadCheck + 1)
  }, [])
  useEffect(() => {
    // if (firstLoadCheck > 0 && textvalue && isExist !== undefined && !isExist) {
    //   // setisError(true)
    //   dispatch(DirectMessage('This phone number does not exist, redirecting to registration page...'))
    //   setTimeout(() => {
    //     // setisError(true)
    //     setisExist()
    //     history.push({ pathname: '/register', state: { textvalue } })
    //     // document.getElementById('registerUserWithOTP').click()
    //   }, 2000);
    // }
    // if (firstLoadCheck > 0 && isExist) {
    //   // setLoginNowEnable(true)
    //   // setTimerShow(true)
    //   // setisError(true)
    // }
    // alert('isExist 71' + isExist)
    // alert('customerID 71' + customerID)
    // console.log('isExist useEffect--', isExist)
    if (isExist !== undefined && isExist === true && customerID !== 0 && customerID !== undefined) {
      // setShowMsgTopBar(true)
      // setisError(false)
      // dispatch(DirectMessage('Redirect to Login Page..'))
      setMsg('Redirect to Login Page..')
      // history.push('/')
      // closeMsgBarFunc()
    }
    if (isExist && customerID === '' && customerID !== undefined && customerID === 0) {
      // setShowMsgTopBar(true)
      // setisError(true)
      // dispatch(DirectMessage('Please Enter Correct Paswword'))
      setMsg('Please Enter Correct Paswword')
      setTimeout(() => {
        setShowMsgTopBar(false)
      }, 3000)
      // closeMsgBarFunc()
    }
  }, [isExist])
  // useEffect(() => {
  //   const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/)
  //   if (firstLoadCheck > 0) {
  //     if (Uname === '' || Uname === undefined || !emailphone.test(Uname)) {
  //       setUname()
  //       setisError(true)
  //       dispatch(DirectMessage('Please enter mobile number (10 digit) or Email'))
  //       // setShowMsg(true)
  //     }
  //     else {
  //       changeUsername(Uname)
  //     }
  //   }
  // }, [Uname])
  useEffect(() => {
    // alert('useEffect Calling')
    setSendOtpApiResponseData(sendOtpApiResponse);
  }, [sendOtpApiResponse])
  useEffect(() => {
    // sendOtpApiResponseData && sendOtpApiResponseData.sendOtpResponse && sendOtpApiResponseData.sendOtpResponse.IsCustomerExist && setisExist(sendOtpApiResponseData.sendOtpResponse.IsCustomerExist)
    console.log(`sendOtpApiResponseData---${JSON.stringify(sendOtpApiResponseData)}`)
    if (firstLoadCheck > 0 && sendOtpApiResponseData && sendOtpApiResponseData.sendOTPDataPswd !== undefined) {
      // setisExist(sendOtpApiResponseData.sendOTPDataPswd.IsCustomerExist)
      // setCustomerID(sendOtpApiResponseData.customerlogindata.CustomerId)
      console.log('sendOtpApiResponseData.customerlogindata.CustomerId', sendOtpApiResponseData.customerlogindata.CustomerId)
      if (firstLoadCheck > 0 && sendOtpApiResponseData.sendOTPDataPswd.IsCustomerExist && sendOtpApiResponseData.customerlogindata.CustomerId === 0 && sendOtpApiResponseData.customerlogindata.GUID === '00000000-0000-0000-0000-000000000000') {
        // alert('password is wrong, customer is Exit:' + isExist + 'CustomerID:' + customerID)
        setShowMsgTopBar(true)
        setisError(true)
        setMsg('Please enter correct password')
        // dispatch(DirectMessage('Please Enter Correct Paswword'))
        setTimeout(() => {
          setShowMsgTopBar(false)
        }, 3000)
      }
      if (firstLoadCheck > 0 && sendOtpApiResponseData.sendOTPDataPswd.IsCustomerExist && sendOtpApiResponseData.customerlogindata.CustomerId > 0) {
        setShowMsgTopBar(false)
        setisError(false)
        // setMsg('Redirect to Login Page..')
        // dispatch(DirectMessage('Redirect to Login Page..'))
        // closeMsgBarFunc()
        const redirectToPath = localStorage.getItem("lastVisitedUrl");
        // history.push(redirectToPath);
        if (redirectToPath && redirectToPath !== "") {
          setTimeout(() => {
            history.push(redirectToPath)
          }, 3000)
        } else {
          setTimeout(() => {
            history.push('/')
          }, 3000)
        }
        // localStorage.setItem('isLogin', true)
        localStorage.setItem('CustGUID', window.btoa(sendOtpApiResponseData.customerlogindata.GUID))
        localStorage.setItem('ClientId', window.btoa(sendOtpApiResponseData.customerlogindata.ClientId))
        localStorage.setItem('UserFirstName', (sendOtpApiResponseData.customerlogindata.FirstName))
        localStorage.setItem('User', JSON.stringify(sendOtpApiResponseData.customerlogindata))
        localStorage.setItem('UserLastName', (sendOtpApiResponseData.customerlogindata.LastName))
        localStorage.setItem('UserLastPhone', sendOtpApiResponseData.customerlogindata.Phone)
        localStorage.setItem('Email', (sendOtpApiResponseData.customerlogindata.Email))
        // call cart update
        if (homeReducerData && homeReducerData.allCartData.cart) {
          mycartAPI.updatecart(null, homeReducerData.allCartData.cart[0].cart[0].Quantity, homeReducerData.allCartData.cart[0].cart[0].SkuId, homeReducerData.allCartData.cart[0].cart[0].SKUFilterPriceId);
        }
      }
      if (firstLoadCheck > 0 && sendOtpApiResponseData.sendOTPDataPswd.IsCustomerExist === false && sendOtpApiResponseData.customerlogindata.CustomerId === 0) {
        setShowMsgTopBar(true)
        setisError(true)
        // setMsg('Redirect to Registration Page..')
        setMsg('Please enter correct mobile number (10 digit) or Email Id')
        // setTimeout(() => {
        //   history.push({ pathname: '/register', state: { textvalue, redrectFrom: '/login-form' } })
        //   setShowMsgTopBar(false)
        // }, 3000)
        setTimeout(() => {
          setShowMsgTopBar(false)
        }, 3000)
      }
    }
    // if (passwordInputField == sendOtpApiResponseData.customerlogindata.Password) {
    //   setisError(true)
    //   dispatch(DirectMessage(sendOtpApiResponseData.sendOTPDataPswd.Message))
    //   setTimeout(() => {
    //     // history.push('/')
    //   }, 3000)
    // }
  }, [sendOtpApiResponseData])
  useEffect(() => {
    // const usercheck = sendOtpApiResponseData.customerlogindata.find(user => (user.UserName === document.getElementById('UserName').value && user.Password === document.getElementById('Password').value));
    // if (!usercheck)
    // if (firstLoadCheck > 0 && sendOtpApiResponseData && sendOtpApiResponseData.customerlogindata.GUID !== '00000000-0000-0000-0000-000000000000') {
    //   console.log("chkres..", usercheck)
    //   // dispatch(DirectMessage("Incorrect Username or password"))
    //   setisError(true)
    //   // setTimeout(() => {
    //   //   dispatch(DirectMessage("Incorrect Username or password"))
    //   // }, 3000);
    // }
    // alert('sendOtpApiResponseData---', sendOtpApiResponseData)
    // if (firstLoadCheck > 0 && sendOtpApiResponseData && sendOtpApiResponseData.CustomerId) {
    //   alert('User not found', sendOtpApiResponseData.CustomerId)
    // }
    // if (firstLoadCheck > 0 && sendOtpApiResponseData.sendOTPDataPswd.IsCustomerExist == true) {
    //   setisError(true)
    //   dispatch(DirectMessage(sendOtpApiResponseData.sendOTPDataPswd.Message))
    //   setTimeout(() => {
    //     history.push('/')
    //   }, 3000)
    // }
    // if (firstLoadCheck > 0 && sendOtpApiResponseData && sendOtpApiResponseData.customerlogindata !== undefined && sendOtpApiResponseData.customerlogindata.GUID === '00000000-0000-0000-0000-000000000000') {
    //   // history.push('/register')
    //   // console.log(' ' + JSON.stringify(sendOtpApiResponseData))
    //   // console.log('***sendOtpApiResponseData ' + JSON.stringify(sendOtpApiResponseData))
    //   setisError(true)
    //   dispatch(DirectMessage('This phone number does not exist, redirecting to registration page...'))
    //   setTimeout(() => {
    //     setisError(true)
    //     setisExist()
    //     // history.push({ pathname: '/register', state: { textvalue } })
    //   }, 3000);
    //   // setShowMsg(true)
    // }
    // else if (firstLoadCheck > 0 && sendOtpApiResponseData && sendOtpApiResponseData.customerlogindata !== undefined && sendOtpApiResponseData.customerlogindata.GUID !== '00000000-0000-0000-0000-000000000000'
    //   && sendOtpApiResponseData.customerlogindata !== '') {
    //   // console.log("checktheresponse.. else if condition", sendOtpApiResponseData.customerlogindata)
    //   dispatch(logindata(sendOtpApiResponseData.customerlogindata))
    //   // history.push('/')
    //   // localStorage.setItem('isLogin', true)
    //   localStorage.setItem('CustGUID', window.btoa(sendOtpApiResponseData.customerlogindata.GUID))
    //   localStorage.setItem('ClientId', window.btoa(sendOtpApiResponseData.customerlogindata.ClientId))
    //   localStorage.setItem('UserFirstName', (sendOtpApiResponseData.customerlogindata.FirstName))
    //   localStorage.setItem('User', JSON.stringify(sendOtpApiResponseData.customerlogindata))
    //   localStorage.setItem('UserLastName', window.btoa(sendOtpApiResponseData.customerlogindata.LastName))
    //   localStorage.setItem('UserLastPhone', sendOtpApiResponseData.customerlogindata.Phone)
    //   localStorage.setItem('Email', window.btoa(sendOtpApiResponseData.customerlogindata.Email))
    // }
    // else {
    //   console.log("")
    // }
  }, [sendOtpApiResponseData])
  // useEffect(() => {
  //   const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/)
  // }, [Uname])
  const handleclick = () => {
    history.push('/login')
  }
  // const onResponse = () => {
  // };
  // const responseGoogle = () => {
  // }
  // function closeMsgBarFunc() {
  //   setTimeout(() => {
  //     dispatch(closeMsgBar())
  //     setisError(false)
  //   }, 2000);
  // }
  function submit() {
    console.log("uname..", document.getElementById('UserName').value)
    const mobEmailNoInputField = document.getElementById('UserName').value
    const passwordInputField = document.getElementById('Password').value
    console.log('mobEmailNoInputField---', mobEmailNoInputField)
    console.log('passwordInputField---', passwordInputField)
    // const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/)
    // previous regex-- const emailphone = new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$');
    const emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    const phoneRegExp = new RegExp(/^\d{10}$/)
    if (mobEmailNoInputField === '' && passwordInputField === '') {
      setShowMsgTopBar(true)
      setisError(true)
      // dispatch(DirectMessage('Please Enter Valid Mobile No. or Email Id and Password'))
      setMsg('Please enter valid mobile no. or email id and password')
      setTimeout(() => {
        setShowMsgTopBar(false)
      }, 3000)
    } else if (mobEmailNoInputField === '' && passwordInputField !== '') {
      setShowMsgTopBar(true)
      setisError(true)
      // dispatch(DirectMessage('Please Enter Valid Mobile or Email Id'))
      setMsg('Please enter valid mobile or email Id')
      setTimeout(() => {
        setShowMsgTopBar(false)
      }, 3000)
    } else if ((!emailRegExp.test(mobEmailNoInputField)) && (!phoneRegExp.test(mobEmailNoInputField))) {
      setShowMsgTopBar(true)
      setisError(true)
      // dispatch(DirectMessage('Please Enter Valid Password'))
      setMsg('Please enter mobile number (10 digit) or email')
      setTimeout(() => {
        setShowMsgTopBar(false)
      }, 3000)
    } else if (mobEmailNoInputField !== '' && passwordInputField === '') {
      setShowMsgTopBar(true)
      setisError(true)
      // dispatch(DirectMessage('Please Enter Valid Password'))
      setMsg('Please enter valid password')
      setTimeout(() => {
        setShowMsgTopBar(false)
      }, 3000)
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
            localStorage.setItem('generatedtoken', result.access_token);
            dispatch(loginWithPasswordAction(document.getElementById('UserName').value,
              document.getElementById('Password').value))
          },
        )
        .catch(() => {
          console.log("error")
          // alert(result)
        })
      dispatch(sendOtpPswd(document.getElementById('UserName').value))
      // dispatch(sendOtp(document.getElementById('txtRegisterUserNameForOTP').value))
    }
  }
  const terms = () => {
    localStorage.setItem('pagefootert', "terms-and-conditions-react")
    history.push('/subfooter')
  }
  const policy = () => {
    localStorage.setItem('pagefootert', "privacy-policy-react")
    history.push('/subfooter')
  }
  const deliverypolicy = () => {
    localStorage.setItem('pagefootert', "delivery-policy-react")
    history.push('/subfooter')
  }
  function onchangeFunc(e) {
    console.log("autovalue", e.target.value)
    // if (e.target.value.match("[^ ]") != null) ^(?! )[A-Za-z0-9-()]*(?<! )$
    // if (e.target.value.match("^(?! )[A-Za-z0-9-@.()]*(?<! )$") != null) {
    //   setTextValue(e.target.value)
    // }
    if (/\s/g.test(e.target.value) === true) {
      const removeSpaceValue = e.target.value.replace(/\s/g, '');
      setTextValue(removeSpaceValue)
    } else {
      setTextValue(e.target.value)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setShowMsgTopBar(false)
    }, 3000)
  }, [closeMsgTopBar])
  const closeMsgTopBar = () => {
    setShowMsgTopBar(false)
  }
  useEffect(() => {
    // if()
    if (getCustomerRegisteredDetailUsingGmail && getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin !== 'undefined' && getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin !== undefined) {
      if ((getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin).length > 0) {
        console.log('hii', getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin[0].GUID)
        localStorage.setItem('CustGUID', window.btoa(getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin[0].GUID))
        // localStorage.setItem('ClientId', window.btoa(sendOtpApiResponse.customerlogindata.ClientId))
        localStorage.setItem('UserFirstName', googleSignInFirstName)
        // localStorage.setItem('User', JSON.stringify(sendOtpApiResponse.customerlogindata))
        localStorage.setItem('UserLastName', googleSignInLastName)
        // localStorage.setItem('UserLastPhone', userMobileNo)
        localStorage.setItem('Email', (getCustomerRegisteredDetailUsingGmail.getCustIdByGmailLogin[0].Email))
        setTimeout(() => {
          history.push('/')
        }, 100)
      }
    }
  }, [getCustomerRegisteredDetailUsingGmail])
  useEffect(() => {
    // alert('userRegistrationUsingGmailLoginResponse')
    // console.log('registerOrignal---', typeof registerOrignal.userRegistrationUsingGmailLoginResponse)
    console.log('gmailLoginResponse--', gmailLoginResponse)
    if (gmailLoginResponse && gmailLoginResponse.userRegistrationUsingGmailLoginResponse !== 'undefined' && gmailLoginResponse.userRegistrationUsingGmailLoginResponse !== undefined) {
      if (googleLoginResponseCount < 1 && gmailLoginResponse.userRegistrationUsingGmailLoginResponse
        !== '' && gmailLoginResponse.userRegistrationUsingGmailLoginResponse
        === "Email Already Exist") {
        console.log('Email Already Exist')
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
        console.log('Phone number Already Exist')
        const clientid = 1
        const emailId = googleSignInEmailId
        const customerType = 1
        dispatch(getCustIdByEmail(clientid, emailId, customerType))
        setGoogleLoginResponseCount(1)
      }
      if (googleLoginResponseCount < 1 && gmailLoginResponse.userRegistrationUsingGmailLoginResponse !== '' && gmailLoginResponse.userRegistrationUsingGmailLoginResponse !== undefined && gmailLoginResponse.userRegistrationUsingGmailLoginResponse !== 'Email Already Exist') {
        // alert('Email is not Already Exist')
        console.log('Email is not Already Exist')
        const clientid = 1
        const emailId = googleSignInEmailId
        const customerType = 1
        dispatch(getCustIdByEmail(clientid, emailId, customerType))
        setGoogleLoginResponseCount(1)
      }
    }
  }, [gmailLoginResponse])
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
    // setShowMsg(true)
    // setIsError(false)
    setMsg('Please enter correct gmail password')
  };
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      {showMsgTopBar && < Success isError={isError} msg={msg} close={closeMsgTopBar} />}
      <div className='mainbodycontent'>
        <div className='login-wrapper pb-35'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                <div className="section-title text-center">
                  <p align="center" style={{ padding: '10px,0px' }}>
                    <Link to="/">
                      <img referrerPolicy='no-referrer' alt="brand-logo" src={adibujalogo} style={{ paddingLeft: '23px' }} width="198px" height="42px" />
                    </Link>
                  </p>
                </div>
                <main id='primary' className='site-main'>
                  <div className='user-login'>
                    <div className='row'>
                      <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 offset-xl-2'>
                        <div className='login-form'>
                          <div id="divloginwithusername" >
                            <div className="row">
                              <div className="col-12 col-sm-12 col-md-12">
                                <div className=" text-center">
                                  <h3>&nbsp;Login To Your Account</h3>&nbsp;&nbsp;
                                </div>
                              </div>
                            </div>
                            <form className="form-horizontal" id="frmLoginWithPassword" >
                              <div className="form-group row align-items-center mb-4">
                                <label htmlFor="email" className='col-sm-3'></label>
                                <div className="col-sm-6">
                                  <input className="form-control" placeholder="Mobile No. / Email" required="" type="text" id="UserName" name="UserName" defaultValue="" value={textvalue} onChange={e => onchangeFunc(e)} />
                                  <span className="text text-danger validation-error field-validation-valid" data-valmsg-for="UserName" data-valmsg-replace="true"></span>
                                </div>
                              </div>
                              <div className="form-group row align-items-center mb-3">
                                <label htmlFor="email" className='col-sm-3'></label>
                                <div className="col-sm-6">
                                  <input type={Shown1password ? 'text' : "password"} placeholder='Password' className="form-control" id="Password" name="Password" autoComplete="new-password" />
                                  <span className="text text-danger validation-error field-validation-valid" ></span>
                                  <input type="hidden" data-temp="" id="hdnErrorMsg" />
                                  <button className="logwithpass" type="button" style={{ color: 'gray', position: 'absolute', top: '9px', right: '25px' }}>
                                    {/* <i id="pass-statust" style={{ color: 'gray', position: 'absolute', top: '13px', right: '25px' }} onClick={() => setShown1password(!Shown1password)}
                                      className={`fa ${Shown1password ? 'fa-eye-slash' : 'fa-eye'}`}></i> */}
                                    <i id="pass" aria-hidden role="button" onClick={() => setShown1password(!Shown1password)} onKeyDown={!Shown1password} className={`fa ${Shown1password ? 'fa-eye-slash' : 'fa-eye'}`}>
                                    </i>
                                  </button>
                                  <p>
                                    <Link to="/forgotpassword" style={{ position: 'absolute', top: '45px', right: '15px', color: '#CA251A' }}><u>Forgot?</u></Link>
                                  </p>
                                </div>
                              </div>
                              <div className="login-box text-center">
                                <button type="button" id="loginuser" onClick={submit} className="btn btn-secondary mb-4 mt-4" >Login Now</button><br />
                                <strong>OR</strong>
                                <input defaultValue="" type="hidden" id="returnurl" name="returnurl" /><br />
                                <button type="button" id="loginUserWithOTPNew" onClick={handleclick} className="btn btn-secondary mb-4 mt-4" >Login with OTP</button>
                              </div>
                            </form>
                            {/* <p align="center">
                              By continuing, you agree to our <Link to="/terms-and-conditions" style={{ color: 'dodgerblue' }} target="_blank">Terms &amp; Conditions</Link> and <Link to="/subfooter" style={{ color: 'dodgerblue' }} target="_blank">Privacy Policy</Link>
                            </p> */}
                            <p align="center">
                              By continuing, you agree to our <Link onClick={terms} href style={{ color: 'dodgerblue', cursor: 'pointer', target: "_blank" }}>Terms &amp; Conditions</Link> and <a href onClick={policy} to="/subfooter" style={{ color: 'dodgerblue', cursor: 'pointer', target: "_blank" }} >Privacy Policy</a>
                            </p>
                            <br />
                            <div className="text-center pt-20 pb-20 top-bordered">
                              <p><b>New To Adibuja? <Link to="/register" style={{ color: 'gray' }}><u>Create an account</u></Link></b></p>
                            </div>
                            <div className="text-center pt-20 top-bordered">
                              <section>
                                <h4 style={{ paddingBottom: '8px' }}>Use another service to log in.</h4>
                                <form method="post" className="form-horizontal" action="/Account/ExternalLogin">
                                  <div>
                                    <p>
                                      {/* <button type="submit" className="btntest fa fa-google"
                                        style={{ backgroundColor: '#ec4f1e', marginRight: '20px', borderRadius: '6px' }}
                                        name="provider" defaultValue="" title="Log in using your Google account" disabled></button> */}
                                      {/* <GoogleLogin
                                        clientId="1028275409428-d2a7sbt66295nmec2jsmmr9t0isloqdp.apps.googleusercontent.com"
                                        render={renderProps => (
                                          <button type="submit"
                                            onClick={renderProps.onClick}
                                            className="btntest fa fa-google"
                                            style={{ backgroundColor: '#ec4f1e', marginRight: '20px', borderRadius: '6px' }}
                                            name="provider" defaultValue="" title="Log in using your Google account"></button>
                                        )}
                                        buttonText="Login"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        redirectUri='http://localhost:44338/login'
                                      /> */}
                                      <div className='google-login-div'>
                                        <GoogleLogin
                                          style={{ width: '25% !important', margin: 'auto !important' }}
                                          onSuccess={googleAuthSuccessResponseMessage}
                                          onError={googleAuthErrorResponseMessage} />
                                      </div>
                                      {/* <button type="submit" className="btntest fa fa-facebook"
                                          style={{ backgroundColor: '#3a5793', marginRight: 0, borderRadius: '6px', width: '45px' }}
                                          formTarget="_blank" name="provider" defaultValue="" title="Log in using your Facebook account" disabled></button> */}
                                      {/* <FacebookLogin
                                        appId="233261671133083"
                                        autoLoad={false}
                                        callback={onResponse}
                                        render={renderProps => (
                                          <button type="submit" className="btntest fa fa-facebook"
                                            onClick={renderProps.onClick}
                                            style={{ backgroundColor: '#3a5793', marginRight: '45px', borderRadius: '6px' }}
                                            formTarget="_blank" name="provider" defaultValue="" title="Log in using your Facebook account"></button>
                                        )}
                                      /> */}
                                    </p>
                                  </div>
                                  <input name="__RequestVerificationToken" type="hidden" defaultValue="" />
                                  <input name="__RequestVerificationToken" type="hidden" defaultValue="" /></form>
                              </section>
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
        </div>
      </div>
      <div className="scroll-top not-visible"> <i className="fa fa-angle-up"></i> </div>
      <div style={{ textAlign: 'center' }} className="check_foot">
        <form id="mc-form">
        </form>
        <p align="center" style={{ paddingTop: '10px' }}>
          <small>
            <a href onClick={deliverypolicy} to="/subfooter" style={{ color: 'dodgerblue', cursor: 'pointer' }}>Delivery Policy</a>&nbsp;&nbsp;
            <Link to="/faq" style={{ color: 'dodgerblue' }}>Help</Link>
          </small>
        </p>
        <div>
          <p align="center" style={{ paddingTop: '0px', paddingBottom: '35px' }}><small>2023 &copy; Adibuja Private Limited, All Rights Reserved</small></p>
        </div>
      </div>
    </>
  );
}
export default LoginwithPassword
