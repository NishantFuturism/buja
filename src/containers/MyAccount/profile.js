/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
// import { Input } from 'antd';
import { useForm } from 'react-hook-form';
import Input from '../HomePage/Input';
import Header from '../../components/Header';
// import SubNavigation from '../../components/SubNavigation';
import MyAccountSideNav from './MyAccountSideNav';
// import { otpsend, updateprofile, verifyotp } from './actions';
import { otpsend, updateprofile, sendUpdateProfileEmail } from './actions';
import reducer from './reducer';
import saga from './saga';
import './checkbox.css'
import PaymentAPI from '../MainPage/api/payment';
//import history from '../../utils/history';
import Footer from '../../components/Footer';
import BreadCrumb from './myAccountBreadcrumb';
import Warn from '../../components/ShowAlert/warn';
import ProfileAPI from '../MainPage/api/profile';
import Success from '../../components/ShowAlert/success';
export function Profile() {
  const dispatch = useDispatch()
  useInjectReducer({ key: 'myAccount', reducer });
  useInjectSaga({ key: 'myAccount', saga });
  const [showCancelButtonForEmail, setShowCancelButtonForEmail] = useState(false)
  const [showCancelButtonForMobile, setShowCancelButtonForMobile] = useState(false)
  const [seterror] = useState(false)
  console.log(seterror)
  // const [errormobile, seterrormobile] = useState(false)
  // const [enablesendotp, setenablesendotp] = useState(false)
  // const [enablesendotpmobile, setenablesendotpmobile] = useState(false)
  const [enablesendotpmobileview, setenablesendotpmobileview] = useState(false)
  const [enablesendotpview, setenablesendotpview] = useState(false)
  const [disable, setdisable] = useState(true)
  console.log('disable', disable)
  const [disablemobile, setdisablemobile] = useState(false)
  const [showAddChangeMobileButton, setShowAddChangeMobileButton] = useState(false)
  const [disableEmail, setDisableEmail] = useState(false)
  const [showAddChangeEmailButton, setShowAddChangeEmailButton] = useState(false)
  const [OTPGUID, setOTPGUID] = useState('')
  const [verified, setverfied] = useState(false)
  const [emailvalue, setemailvalue] = useState('')
  const [previousEmailValue, setPreviousEmailValue] = useState('')
  const [mobilevalue, setmobilevalue] = useState('')
  const [mobileValueError, setMobileValueError] = useState(false)
  const [previousMobileValue, setPreviousMobileValue] = useState('')
  const [otp, setotp] = useState('')
  const [UpdatedTimer, setUpdatedTimer] = useState(60);
  const [firstLoadCheck, setFirstLoadCheck] = useState(0);
  const [TimerShow, setTimerShow] = useState(false);
  const [userdetail, setuserdetail] = useState([]);
  const [enableChange, setenableChange] = useState(false);
  const [otpbuttonemail, setotpbuttonemail] = useState(true)
  const [otpbutton, setotpbutton] = useState(true);
  const [updateemail, setupdateemail] = useState(false)
  const [updatePhone, setupdatePhone] = useState(false)
  const [warnstatus, setWarnstatus] = useState(false)
  const [warnmsg, setWarnmsg] = useState('')
  const [successStatus, setSuccessStatus] = useState(false)
  const [firstName, setFirstName] = useState('');
  console.log('FirstName---', firstName)
  const [firstNameValueError, setFirstNameValueError] = useState(false)
  const [checkFirstNameIsUpdated, setCheckFirstNameIsUpdated] = useState(false)
  const [LastName, setLastName] = useState('');
  const [lastNameValueError, setLastNameValueError] = useState(false)
  const [checkLastNameIsUpdated, setCheckLastNameIsUpdated] = useState(false)
  const [CompanyName, setCompanyName] = useState('')
  const [checkCompanyIsUpdated, setCheckCompanyIsUpdated] = useState(false)
  const [receivedOfferCheckboxValue, setReceivedOfferCheckboxValue] = useState(false)
  const [checkReceiveOfferIsUpdated, setCheckReceiveOfferIsUpdated] = useState(false)
  const [userTitileValue, setUserTitileValue] = useState(null)
  // const FirstName = window.atob(localStorage.getItem('UserFirstName'))
  // const lastname = window.atob(localStorage.getItem('UserLastName'))
  // const phone = localStorage.getItem('UserLastPhone')
  // const user = localStorage.getItem('User')
  const invalidotp = localStorage.getItem('invalidOTP')
  console.log("invalidotp", invalidotp);
  // const userdetail = JSON.parse(user)
  const profileReducer = useSelector(state => state.myAccount)
  const profileReducer1 = useSelector(state => state.myAccount && state.myAccount.sendotpdata)
  console.log("profileReducer1", profileReducer1, profileReducer);
  const [checkUpdatedValueIsMobile, setCheckUpdatedValueIsMobile] = useState(false)
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(false)
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false)
  const [isUserLogin, setIsUserLogin] = useState()
  console.log('isUserLogin--', isUserLogin)
  const {
    // register,
    handleSubmit,
    // formState: {
    //   errors 
    // }
  } = useForm();
  const onSubmit = (data) => {
    console.log('submit data', firstName, LastName, emailvalue, mobilevalue, CompanyName);
    console.log('firstName-', typeof firstName)
    console.log('company name',)
    console.log('mobilevalue', typeof mobilevalue)
    console.log('data--', data)
    setenablesendotpview(false)
    setenablesendotpmobileview(false)
    setUpdateButtonClicked(true)
    // if (data.FirstName === null && data.LastName === null) {
    // dispatch(updateprofile(document.getElementById('FirstName').value, document.getElementById('LastName').value, document.getElementById('Company').value, emailvalue, document.getElementById('txtPhone').value, true))
    // dispatch(updateprofile(firstName, LastName, CompanyName, emailvalue, mobilevalue, true))
    // localStorageDataUpdated()
    // }
    // if (firstName === null || firstName === '') {
    //   alert('98')
    //   let firstNameEmpty = ''
    //   dispatch(updateprofile(firstName, LastName, CompanyName, emailvalue, mobilevalue, true))
    //   localStorageDataUpdated(firstNameEmpty, LastName, mobilevalue, emailvalue)
    // }
    // else if (LastName === null || LastName === '') {
    //   alert('104')
    //   let lastNameEmpty = ''
    //   dispatch(updateprofile(firstName, LastName, CompanyName, emailvalue, mobilevalue, true))
    //   localStorageDataUpdated(firstName, lastNameEmpty, mobilevalue, emailvalue)
    // }
    // else
    let firstNameTrim
    let lastNameTrim
    let emailWithSpace
    let companyNameTrim
    if (firstName === '' || firstName === null) {
      setFirstNameValueError(true);
    }
    else if (LastName === '' || LastName === null) {
      setLastNameValueError(true)
    }
    else if ((emailvalue === '' || emailvalue === undefined || emailvalue === null) && (mobilevalue !== '' || mobilevalue !== undefined || mobilevalue !== null)) {
      // alert('110')
      firstNameTrim = firstName.trim()
      lastNameTrim = LastName.trim()
      emailWithSpace = ' '
      companyNameTrim = CompanyName.trim()
      dispatch(updateprofile(userTitileValue, firstNameTrim, lastNameTrim, emailWithSpace, mobilevalue, companyNameTrim, receivedOfferCheckboxValue))
      // send SMS to mobile no. Your profile has been updated successfully. 
      ProfileAPI.getSmsTemplate(38).then((response) => {
        console.log('resSMSTemplate', response)
        // setResSMSTemplate(resSMSTemplate)
        const smsContent = response.SMSContent
        const replaceContent = smsContent.replace("{#UserName#}", `${firstName}`)
        console.log('smsContent--', replaceContent)
        ProfileAPI.sendSMS(mobilevalue, replaceContent)
      })
      localStorageDataUpdated(userTitileValue, firstNameTrim, lastNameTrim, emailWithSpace, mobilevalue, companyNameTrim, receivedOfferCheckboxValue)
    }
    // if (document.getElementById('FirstName').value && document.getElementById('LastName').value) {
    else if (firstLoadCheck > 0 && (mobilevalue === null || mobilevalue === '') && disablemobile === false) {
      // alert('117')
      setMobileValueError(true)
      // dispatch(updateprofile(firstName, LastName, CompanyName, emailvalue, mobilevalue, true))
      // localStorageDataUpdated(firstName, LastName, mobilevalue, emailvalue)
    }
    else {
      // alert('123')
      firstNameTrim = firstName.trim()
      lastNameTrim = LastName.trim()
      companyNameTrim = CompanyName.trim()
      dispatch(updateprofile(userTitileValue, firstNameTrim, lastNameTrim, emailvalue, mobilevalue, companyNameTrim, receivedOfferCheckboxValue))
      if (emailvalue !== null) {
        // send email to email id. Your profile has been updated successfully.
        dispatch(sendUpdateProfileEmail(emailvalue, firstNameTrim))
      }
      if (mobilevalue !== null) {
        // send SMS to mobile no. Your profile has been updated successfully. 
        ProfileAPI.getSmsTemplate(38).then((response) => {
          console.log('resSMSTemplate', response)
          // setResSMSTemplate(resSMSTemplate)
          const smsContent = response.SMSContent
          const replaceContent = smsContent.replace("{#UserName#}", `${firstName}`)
          console.log('smsContent--', replaceContent)
          ProfileAPI.sendSMS(mobilevalue, replaceContent)
        })
      }
      localStorageDataUpdated(userTitileValue, firstNameTrim, lastNameTrim, emailvalue, mobilevalue, companyNameTrim, receivedOfferCheckboxValue)
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
  /* eslint no-prototype-builtins: "error" */
  useEffect(() => {
    // setufirstname(window.atob(localStorage.getItem('UserFirstName')))
    // setlastnamw(window.atob(localStorage.getItem('UserLastName')))
    // setphone(localStorage.getItem('UserLastPhone'))
    console.log(`47--${window.atob(localStorage.getItem('CustGUID'))}`)
    // console.log(`48--${localStorage.hasOwnProperty('CustGUID')}`)
    if (Object.prototype.hasOwnProperty.call(localStorage, 'CustGUID')) {
      // alert(true)
      // if (localStorage.hasOwnProperty('CustGUID') === true) {
      if (window.atob(localStorage.getItem('CustGUID')) !== null || window.atob(localStorage.getItem('CustGUID')) !== undefined || window.atob(localStorage.getItem('CustGUID')) !== '00000000-0000-0000-0000-000000000000') {
        console.log('51')
        setIsUserLogin(true)
      } else {
        console.log('54')
        setIsUserLogin(false)
      }
      // }
    }
    else {
      // alert(false)
      setIsUserLogin(false)
    }
    // if (localStorage.hasOwnProperty('CustGUID') === false) {
    //   setIsUserLogin(false)
    // }
  }, [isUserLogin])
  useEffect(() => {
    if (updateemail === true || updatePhone === true) {
      fetchcustomerdata()
    }
  }, [updateemail, updatePhone])
  useEffect(() => {
    // dispatch(getcustomerwalletbalance())
    fetchcustomerdata()
  }, [])
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
    setFirstLoadCheck(firstLoadCheck + 1)
    // setResendShow(false)
    // setShowSendOTP(true)
  }, [])
  // useEffect(() => {
  //   if (userdetail && userdetail.Mobile) {
  //     // alert('First time')
  //     // setdisablemobile(true)
  //   }
  // })
  // const Updateprofile = () => {
  //   const pattern = "^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
  //   // if (document.getElementById('firstName').value !== pattern) {
  //   //   seterror(true)
  //   //   // toast('please fill valid input')
  //   // } else 
  //   if (document.getElementById('firstName').value && document.getElementById('LastName').value && document.getElementById('Company').value) {
  //     dispatch(updateprofile(document.getElementById('firstName').value, document.getElementById('LastName').value, document.getElementById('Company').value, document.getElementById('txtPhone').value, document.getElementById('IsReceiveOffers').value))
  //   } else {
  //     toast('please fill all deatails')
  //   }
  // }
  const TimerForOTP = () => (
    <div id="resendOtpTimerNewdiv">
      <p id="resendOtpTimerNew" className="text-center">
        00:{UpdatedTimer < 10 ? 0 : ''}{UpdatedTimer}
      </p>
    </div>
  )
  useEffect(() => {
    if (firstLoadCheck > 0 && UpdatedTimer === 0) {
      // setResendShow(true)
    }
    if (firstLoadCheck > 0 && UpdatedTimer > 0) {
      setTimeout(() => {
        const time = UpdatedTimer - 1
        setUpdatedTimer(time)
      }, 1000);
    } else {
      setTimerShow(false)
      // setResendShow(true)
      // setUpdatedTimer(60)
    }
  }, [UpdatedTimer])
  const addemail = () => {
    setemailvalue('')
    setShowCancelButtonForEmail(true)
    setdisable(false)
    setDisableEmail(false)
    setUpdateButtonDisabled(true)
  }
  const handlechange = (event) => {
    console.log("event", event);
    // alert("empty")
    // const { value } = document.getElementById('txtEmail')
    // console.log("value email",value);
    setemailvalue(event.target.value)
    const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/);
    if (!emailphone.test(document.getElementById('txtEmail').value)) {
      setotpbuttonemail(true)
      // seterror(true)
    }
    else {
      setupdateemail(true)
      setotpbuttonemail(false)
      // seterror(false)
    }
  }
  const sendOTPForEmail = () => {
    // alert('sendOTPForEmail')
    setotpbuttonemail(true)
    setenableChange(true)
    setdisable(true)
    const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/);
    if (!emailphone.test(document.getElementById('txtEmail').value)) {
      // seterror(true)
    }
    else {
      // alert('Email is valid')
      // seterror(false)
      setShowCancelButtonForEmail(false)
      setenablesendotpview(false)
      // setTimerShow(true)
      // setUpdatedTimer(59)
      dispatch(otpsend(document.getElementById('txtEmail').value))
      // setenablesendotp(true)
    }
  }
  const reSendOTPForEmail = () => {
    // alert('sendOTPForEmail')
    setotpbuttonemail(true)
    setenableChange(true)
    setdisable(true)
    const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/);
    if (!emailphone.test(document.getElementById('txtEmail').value)) {
      // seterror(true)
    }
    else {
      // alert('Email is valid')
      // seterror(false)
      setShowCancelButtonForEmail(false)
      setenablesendotpview(true)
      // setTimerShow(true)
      // setUpdatedTimer(59)
      dispatch(otpsend(document.getElementById('txtEmail').value))
      // setenablesendotp(true)
    }
  }
  const sendOTPForMobile = () => {
    setotpbutton(true)
    setenableChange(true)
    setdisablemobile(true)
    setenablesendotpview(false)
    setenablesendotpmobileview(false)
    // enablesendotpview
    setTimerShow(false)
    // setUpdatedTimer(59)
    const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/);
    if (!emailphone.test(document.getElementById('txtPhone').value)) {
      // seterrormobile(true)
      // alert('no is not mobile')
    } else {
      // seterrormobile(false)
      // alert('no is mobile')
      setCheckUpdatedValueIsMobile(true)
      setShowCancelButtonForMobile(false)
      dispatch(otpsend(document.getElementById('txtPhone').value))
      // setenablesendotpmobile(true)
    }
  }
  const resendOTPForMobile = () => {
    setotpbutton(true)
    setenableChange(true)
    setdisablemobile(true)
    const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/);
    if (!emailphone.test(document.getElementById('txtPhone').value)) {
      // seterrormobile(true)
      // alert('no is not mobile')
    } else {
      // seterrormobile(false)
      // alert('no is mobile')
      setCheckUpdatedValueIsMobile(true)
      dispatch(otpsend(document.getElementById('txtPhone').value))
      // setenablesendotpmobile(true)
      setShowCancelButtonForMobile(false)
      setTimerShow(true)
      setUpdatedTimer(59)
      setenablesendotpview(false)
      setenablesendotpmobileview(true)
      // enablesendotpview
    }
  }
  const cancelButtonForEmail = () => {
    console.log("userdetail.Email", userdetail.Email);
    setemailvalue(userdetail.Email)
    setdisable(true)
    setShowCancelButtonForEmail(false)
    // seterror(false)
    setDisableEmail(true)
    setUpdateButtonDisabled(false)
    // setenablesendotp(false)
    setTimerShow(false)
    // setUpdatedTimer(59)
  }
  const cancelinputmobile = () => {
    console.log("userdetail && userdetail.Mobile", userdetail.Mobile);
    if (userdetail.Mobile === null || userdetail.Mobile === 'null') {
      setmobilevalue('')
    } else {
      setmobilevalue(userdetail.Mobile)
    }
    setdisablemobile(true)
    setShowCancelButtonForMobile(false)
    setUpdateButtonDisabled(false)
    setTimerShow(false)
    // seterrormobile(false)
    // setenablesendotpmobile(false)
  }
  useEffect(() => {
    console.log('profileReducer useEffect--', profileReducer)
    if (profileReducer && profileReducer.sendotpdata !== undefined) {
      setOTPGUID(profileReducer.sendotpdata.CustomerPhoneEmailChangeOTPGUID)
      setotp(profileReducer.sendotpdata.OTP)
      // setSuccessStatus(true)
      setenablesendotpview(false) // email view
      console.log('verified--', verified)
      console.log('profileReducer--', profileReducer)
      // when name or last name or company is update and click on update button
      console.log('checkFirstNameIsUpdated---', checkFirstNameIsUpdated)
      console.log('updateButtonClicked-------', updateButtonClicked)
      // when firstName or LastName or CompanyName Or ReceivedOffer is updated and Update Button Pressed
      if ((checkFirstNameIsUpdated === true || checkLastNameIsUpdated === true || checkCompanyIsUpdated === true || checkReceiveOfferIsUpdated === true || userTitileValue !== null) && updateButtonClicked === true) {
        // alert('329' + 'Profile is updated')
        setSuccessStatus(true)
        setWarnmsg('Profile is updated')
        setTimeout(() => {
          setSuccessStatus(false)
          setenablesendotpmobileview(false)
          setenablesendotpview(false) // email view
          setShowAddChangeEmailButton(true)
          setShowAddChangeMobileButton(true)
          // setShowCancelButtonForEmail(true)
          setenableChange(true)
          history.push('/account/dashboard')
        }, 3000);
      }
      // when mobile is update but not varified and click on update button showing error msg
      if (profileReducer.sendotpdata.Message === 'OTP sent successfully' && checkUpdatedValueIsMobile === true && verified === false && updateButtonClicked === false) {
        // alert(`325${ profileReducer.sendotpdata.Message}`)
        setSuccessStatus(true)
        setWarnmsg(profileReducer.sendotpdata.Message)
        setShowAddChangeEmailButton(true)
        setShowAddChangeMobileButton(true)
        setenablesendotpview(false) // email view
        setenablesendotpmobileview(true)
        setTimerShow(true)
        setUpdatedTimer(59)
        setTimeout(() => {
          setSuccessStatus(false)
          setShowCancelButtonForEmail(false)
          setenableChange(false)
          setShowAddChangeMobileButton(false)
        }, 3000);
      }
      // when mobile is update and varified and click on update button
      if (profileReducer.sendotpdata.Message === 'OTP sent successfully' && checkUpdatedValueIsMobile === true && updateButtonClicked === true) {
        // alert(`335${ profileReducer.sendotpdata.Message}`)
        setSuccessStatus(true)
        setWarnmsg('Profile is updated')
        setTimeout(() => {
          setSuccessStatus(false)
          setenablesendotpmobileview(false)
          setenablesendotpview(false) // email view
          setShowAddChangeEmailButton(true)
          setShowAddChangeMobileButton(true)
          // setShowCancelButtonForEmail(true)
          setenableChange(true)
          history.push('/account/dashboard')
        }, 3000);
      }
      // when mobile is change and also otp varified but not click on update button
      if (profileReducer.sendotpdata.Message === 'OTP sent successfully' && checkUpdatedValueIsMobile === true && verified === true && updateButtonClicked === false) {
        // alert(`345${ profileReducer.sendotpdata.Message}`)
        setSuccessStatus(true)
        setWarnmsg(profileReducer.sendotpdata.Message)
        setTimeout(() => {
          setSuccessStatus(false)
          setenablesendotpmobileview(false)
          setenablesendotpview(false) // email view
        }, 3000);
      }
      // when email is change and also otp varified but not click on update button
      console.log('checkUpdatedValueIsMobile--', checkUpdatedValueIsMobile)
      if (firstLoadCheck > 0 && profileReducer.sendotpdata.Message === 'OTP sent successfully' && checkUpdatedValueIsMobile === false && verified === true) {
        // alert(`355${ profileReducer.sendotpdata.Message}`)
        setSuccessStatus(true)
        setWarnmsg('Profile is updated')
        setTimeout(() => {
          setSuccessStatus(false)
          setenablesendotpmobileview(false)
          setenablesendotpview(false) // email view
          setUpdateButtonDisabled(false)
          history.push('/account/dashboard')
        }, 3000);
      }
      if (firstLoadCheck > 0 && enablesendotpview === false && checkUpdatedValueIsMobile === false && profileReducer.sendotpdata.Message === 'OTP sent successfully' && updateButtonClicked === false) {
        // alert(`366${ profileReducer.sendotpdata.Message}`)
        setSuccessStatus(true)
        setWarnmsg(profileReducer.sendotpdata.Message)
        setTimeout(() => {
          setSuccessStatus(false)
          setenablesendotpview(true) // email otp view
          setTimerShow(true)
          setUpdatedTimer(59)
          setShowCancelButtonForMobile(true)
          setenablesendotpmobileview(false)
        }, 3000);
      }
      if (firstLoadCheck > 0 && profileReducer.sendotpdata.Message === 'Mobile Already Exist') {
        // alert('376' + profileReducer.sendotpdata.Message)
        setSuccessStatus(true)
        setWarnmsg(profileReducer.sendotpdata.Message)
        setTimeout(() => {
          setSuccessStatus(false)
          setenablesendotpmobileview(false)
          setmobilevalue(previousMobileValue)
          setShowAddChangeEmailButton(true)
          setShowAddChangeMobileButton(true)
          // setUpdateButtonDisabled(false)
          // toast('This mobile number already exists')
          setTimerShow(false)
          // setUpdatedTimer(59)
          setShowCancelButtonForMobile(true)
          setenableChange(false)
          setdisablemobile(false)
          setUpdateButtonDisabled(true)
        }, 3000);
        // setmobilevalue('')
      }
      if (firstLoadCheck > 0 && profileReducer.sendotpdata.Message === 'Email Already Exist') {
        // alert(`366${ profileReducer.sendotpdata.Message}`)
        setemailvalue(previousEmailValue)
        setShowAddChangeEmailButton(true)
        // showCancelButtonForEmail
        setShowCancelButtonForEmail(true)
        setenableChange(false)
        setUpdateButtonDisabled(true)
        setTimerShow(false)
        setUpdatedTimer(59)
        setSuccessStatus(true)
        setWarnmsg(profileReducer.sendotpdata.Message)
        setTimeout(() => {
          setSuccessStatus(false)
          setenablesendotpmobileview(false)
          setenablesendotpview(false) // email view
        }, 3000);
      }
      // if (profileReducer.sendotpdata.Message === 'Email Already Exist') {
      //   setemailvalue('')
      //   setShowAddChangeEmailButton(true)
      //   setenablesendotpview(false)
      // }
    }
  }, [profileReducer])
  useEffect(() => {
    console.log("profileReducer===========", profileReducer);
    if (profileReducer && profileReducer.verfied !== undefined) {
      console.log("profileReducer.verfied", profileReducer.verfied);
      setverfied(profileReducer.verfied)
      if (profileReducer.verfied) {
        setTimerShow(false)
      }
      // setenablesendotpview(false)
    }
  }, [profileReducer])
  useEffect(() => {
    console.log('profileReducer1--', profileReducer1)
    // if (profileReducer1 && profileReducer1.Message === 'Mobile Already Exist') {
    //   console.log("already");
    //   // alert('388')
    //   setShowAddChangeEmailButton(true)
    //   setenablesendotpmobileview(false)
    //   setmobilevalue('')
    //   setShowAddChangeMobileButton(true)
    //   setShowCancelButtonForMobile(true)
    //   setenableChange(false)
    //   setdisablemobile(false)
    //   setUpdateButtonDisabled(true)
    // }
    // else
    // if (profileReducer1 && profileReducer1.Message === 'Email Already Exist') {
    //   // alert('395')
    //   setemailvalue(previousEmailValue)
    //   setShowAddChangeEmailButton(true)
    //   // showCancelButtonForEmail
    //   setShowCancelButtonForEmail(false)
    //   setenableChange(false)
    //   setenablesendotpview(false)
    // }
  }, [profileReducer1])
  const veriemail = () => {
    // dispatch(verifyotp(OTPGUID, document.getElementById('txtEmailOTP').value))
    ProfileAPI.verifyemailphoneotp(OTPGUID, document.getElementById('txtEmailOTP').value)
      .then(response => {
        if (response === 0) {
          setWarnstatus(true)
          setWarnmsg('Please Enter Valid OTP')
          setTimeout(() => {
            setWarnstatus(false)
          }, 3000);
        }
        if (response === 1) {
          setverfied(true)
          setTimerShow(false)
          setUpdateButtonDisabled(false)
        }
      })
      .catch(E => {
        console.log('error:::', E);
      });
  }
  // const cancelotpview = () => {
  //   setenablesendotpview(false)
  // }
  useEffect(() => {
    if (profileReducer && profileReducer.ismsg === true) {
      console.log(`profiile reducer 374${JSON.stringify(profileReducer)}`)
      // toast(profileReducer.profilemsg)
      console.log('profile Reducer emailvalue', emailvalue)
      console.log('profile Reducer mobilevalue', mobilevalue)
      console.log('profile Reducer profile msg', profileReducer.profilemsg)
      // if (firstLoadCheck > 0) {
      //   // alert('485')
      //   setSuccessStatus(true)
      //   setWarnmsg(profileReducer.profilemsg)
      //   // localStorageDataUpdated(firstName, LastName, mobilevalue, emailvalue)
      //   // setenablesendotpview(false) // email view
      //   // setenablesendotpmobileview(false)
      //   setTimeout(() => {
      //     setSuccessStatus(false)
      //     history.push('/account/dashboard')
      //   }, 3000)
      // }
      console.log('mobilevalue--', mobilevalue)
      console.log('typeof mobilevalue--', typeof mobilevalue)
      if ((firstLoadCheck > 0 && (previousMobileValue !== mobilevalue && (emailvalue === null || emailvalue === '') && profileReducer.profilemsg === "Profile is updated" && profileReducer1.Message !== 'Mobile Already Exist')) || (firstLoadCheck > 0 && previousEmailValue !== emailvalue && (mobilevalue === null || mobilevalue === '') && profileReducer.profilemsg === "Profile is updated" && profileReducer1.Message !== 'Email Already Exist')) {
        // alert('499')
        setSuccessStatus(true)
        setWarnmsg(profileReducer.profilemsg)
        setTimeout(() => {
          setSuccessStatus(false)
          localStorage.clear()
          history.push('/')
          history.go(0)
          // if (updateemail === true || updatePhone === true) {
          //   localStorage.clear()
          //   history.push('/')
          //   history.go(0)
          // }
        }, 3000);
      }
      fetchcustomerdata()
      // setenablesendotpmobileview(false)
    }
  }, [profileReducer])
  useEffect(() => {
    console.log(`userdetail 374${JSON.stringify(userdetail)}`)
    if (userdetail.Mobile === null || userdetail.Mobile === 'null') {
      // setmobilevalue(userdetail.Mobile)
      setmobilevalue('')
    } else {
      setmobilevalue(userdetail.Mobile)
      setPreviousMobileValue(userdetail.Mobile)
    }
    setdisablemobile(true)
    setDisableEmail(false)
    setShowAddChangeEmailButton(true)
    setShowAddChangeMobileButton(true)
  }, [userdetail && userdetail.Mobile])
  useEffect(() => {
    console.log('userdetail--', userdetail)
    setemailvalue(userdetail.Email)
    setPreviousEmailValue(userdetail.Email)
    setDisableEmail(true)
    setdisablemobile(true)
    setShowAddChangeMobileButton(true)
    setShowAddChangeEmailButton(true)
  }, [userdetail && userdetail.Email])
  console.log(otp);
  const veriemailmobile = () => {
    // dispatch(verifyotp(OTPGUID, document.getElementById('txtPhoneOTP').value))
    ProfileAPI.verifyemailphoneotp(OTPGUID, document.getElementById('txtPhoneOTP').value)
      .then(response => {
        if (response === 0) {
          setWarnstatus(true)
          setWarnmsg('Please Enter Valid OTP')
          setTimeout(() => {
            setWarnstatus(false)
          }, 3000);
        }
        if (response === 1) {
          setverfied(true)
          setTimerShow(false)
          setUpdateButtonDisabled(false)
        }
      })
      .catch(E => {
        console.log('error:::', E);
      });
    // let (localStorage.getItem('invalidOTP'))
  }
  // const cancelotpviewmobile = () => {
  //   setenablesendotpmobileview(false)
  // }
  const titleValueOnClick = (e) => {
    console.log('titleChange', e.target.value);
    setUserTitileValue(e.target.value)
  }
  // console.log("TimerShow", TimerShow, userdetail.FirstName);
  function handlechangeFirstname(e) {
    if (e.target.value.match("^[a-zA-Z][\sa-zA-Z ]*$") !== null) {
      console.log('First name value not null', e.target.value)
      if (firstName !== e.target.value) {
        setCheckFirstNameIsUpdated(true)
      }
      setFirstName(e.target.value);
      setFirstNameValueError(false);
    }
    if (e.target.value.length === 0) {
      console.log('First name value null', e.target.value)
      setFirstName('');
      setFirstNameValueError(true);
    }
    if (e.target.value.trim() === "") {
      setFirstName('');
      setFirstNameValueError(true);
    }
  }
  function handlechangeLastname(e) {
    // e.target.value.match("^[a-zA-Z ]*$") !== null
    if (e.target.value.match("^[a-zA-Z][\sa-zA-Z ]*$") !== null) {
      if (LastName !== e.target.value) {
        setCheckLastNameIsUpdated(true)
      }
      setLastName(e.target.value);
      setLastNameValueError(false);
    }
    if (e.target.value.length === 0) {
      console.log('Last name value null', e.target.value)
      setLastName('');
      setLastNameValueError(true);
    }
    if (e.target.value.trim() === "") {
      setLastName('');
      setLastNameValueError(true);
    }
  }
  const onChangeMobileValue = () => {
    const { value } = document.getElementById('txtPhone')
    console.log("value", value);
    if (value.length < 10) {
      setotpbutton(true)
      // setenablesendotpmobileview(true)
      setmobilevalue(value)
    }
    else if (value.length === 10) {
      setotpbutton(false)
      setenablesendotpmobileview(false)
      setmobilevalue(value)
      setupdatePhone(true)
      setMobileValueError(false)
    }
    // if (value) {
    //   setenablesendotpmobile(true)
    //   setmobilevalue(value)
    // }
    // showCancelButtonForEmail(true)
  }
  const addmobile = () => {
    // console.log("mobilev..", userdetail.Mobile);
    setShowCancelButtonForMobile(true)
    setdisablemobile(false)
    setmobilevalue('')
    setUpdateButtonDisabled(true)
  }
  function handlechangeCompanyname(e) {
    if (e.target.value.match("^[a-zA-Z0-9][\sa-zA-Z0-9 ]*$") !== null) {
      if (CompanyName !== e.target.value) {
        setCheckCompanyIsUpdated(true)
      }
      setCompanyName(e.target.value);
    }
    if (e.target.value.length === 0) {
      setCompanyName('');
    }
    if (e.target.value.trim() === "") {
      setCompanyName('');
    }
  }
  const receivedOfferOnChange = (e) => {
    console.log('receivedOfferOnChange', e.target.checked);
    if (receivedOfferCheckboxValue !== e.target.checked) {
      setCheckReceiveOfferIsUpdated(true)
    }
    setReceivedOfferCheckboxValue(!receivedOfferCheckboxValue)
  }
  useEffect(() => {
    console.log('get all user detail', JSON.stringify(userdetail))
    console.log(`677${typeof userdetail.FirstName}`)
    if (userdetail !== '') {
      if (userdetail && userdetail.Title !== null || userdetail.Title !== undefined || userdetail.Title !== 'undefined') {
        setUserTitileValue(userdetail.Title)
      }
      if (userdetail && userdetail.Title === null || userdetail.Title === undefined || userdetail.Title === 'undefined') {
        setUserTitileValue(null)
      }
      if (userdetail && (userdetail.FirstName !== null || userdetail.FirstName !== undefined || userdetail.FirstName !== 'undefined')) {
        setFirstName(userdetail.FirstName)
      }
      if (userdetail && (userdetail.FirstName === null || userdetail.FirstName === undefined || userdetail.FirstName === 'undefined')) {
        // alert('First name is null')
        setFirstName('')
      }
      if (userdetail && (userdetail.LastName !== null || userdetail.LastName !== undefined || userdetail.LastName !== 'undefined')) {
        setLastName(userdetail.LastName)
      }
      if (userdetail && (userdetail.LastName === null || userdetail.LastName === undefined || userdetail.LastName === 'undefined')) {
        // alert('Last name is null')
        setLastName('')
      }
      if (userdetail && (userdetail.Company !== null || userdetail.Company !== undefined || userdetail.Company !== 'undefined')) {
        setCompanyName(userdetail.Company)
      }
      if (userdetail && (userdetail.Company === null || userdetail.Company === undefined || userdetail.Company === 'undefined')) {
        // alert('company name is null')
        setCompanyName('')
      }
      if (userdetail && (userdetail.ReceiveOffers !== null || userdetail.ReceiveOffers !== undefined || userdetail.ReceiveOffers !== 'undefined')) {
        setReceivedOfferCheckboxValue(userdetail.ReceiveOffers)
      }
      if (userdetail && (userdetail.ReceiveOffers === null || userdetail.ReceiveOffers === undefined || userdetail.ReceiveOffers === 'undefined')) {
        setReceivedOfferCheckboxValue(false)
      }
    }
  }, [userdetail])
  console.log("verifiedddddd", verified);
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
            <BreadCrumb myAccount="My Account" activepage="Profile" />
            {/* <SubNavigation /> */}
            {successStatus && <Success msg={warnmsg} />}
            {warnstatus && <Warn msg={warnmsg} />}
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
                              <div className="tab-content dashboard-content" id="profile">
                                <h3>Profile </h3>
                                <div className="login-form">
                                  <form id="frm_update_profile"
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate="novalidate">
                                    <input name="__RequestVerificationToken" type="hidden" />
                                    <div className="form-group row align-items-center">
                                      <label className="col-12 col-sm-12 col-md-4 col-lg-3 col-form-label">Title</label>
                                      <div className="col-12 col-sm-12 col-md-8 col-lg-6">
                                        <div className="form-row">
                                          <div className="col-6 col-sm-3">
                                            {/* <div className="custom-radio">
                                        <input className="form-check-input" type="radio" name="Title" id="Title" value="Mr." onChange={(e) => titleValueOnClick(e)} /> <span className="checkmark" ></span>
                                        <label className="form-check-label" htmlFor="male">Mr.</label>
                                      </div> */}
                                            <label
                                              className="myprof1">Mr.
                                              <input
                                                type="radio"
                                                name="userTitle"
                                                id='Mr'
                                                value="Mr"
                                                checked={userTitileValue === 'Mr' ? userTitileValue : null}
                                                onChange={(e) => titleValueOnClick(e)}
                                              />
                                              <span className="checkmarkmyprof1"></span>
                                            </label>
                                          </div>
                                          <div className="col-6 col-sm-3">
                                            <label
                                              className="myprof1">Mrs.
                                              <input
                                                type="radio"
                                                name="userTitle"
                                                id='Mrs'
                                                value="Mrs"
                                                checked={userTitileValue === 'Mrs' ? userTitileValue : null}
                                                onChange={(e) => titleValueOnClick(e)}
                                              />
                                              <span className="checkmarkmyprof1"></span>
                                            </label>
                                            {/* <div className="custom-radio">
                                        <input className="form-check-input" type="radio" name="Title" id="Title" value="Mrs." onChange={(e) => titleValueOnClick(e)} />
                                        <span className="checkmark" >
                                        </span>
                                        <label className="form-check-label" htmlFor="female">Mrs.</label>
                                      </div> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group row" required>
                                      <label htmlFor="f-name" className="col-12 col-sm-12 col-md-4 col-lg-3 col-form-label">First Name<span className="text-danger" >*</span></label>
                                      <div className="col-sm-4">
                                        <Input
                                          type="text"
                                          id="firstName"
                                          className="form-control"
                                          required=""
                                          placeholder="Enter First Name"
                                          pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                                          // {...register('firstName', { required: true })}
                                          // value={firstName}
                                          value={firstName}
                                          onChange={(e) => handlechangeFirstname(e)}
                                        />
                                        {/* {errors.firstName && */}
                                        {firstNameValueError === true &&
                                          <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                                            Please enter first name.
                                          </span>
                                        }
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label htmlFor="l-name" className="col-12 col-sm-12 col-md-4 col-lg-3 col-form-label">Last Name<span className="text-danger">*</span></label>
                                      <div className="col-sm-4">
                                        <Input
                                          type="text"
                                          className="form-control"
                                          required=""
                                          placeholder="Enter Last Name"
                                          id="LastName"
                                          pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                                          // {...register('LastName', { required: true })}
                                          value={LastName}
                                          onChange={(e) => handlechangeLastname(e)}
                                        />
                                        {/* {errors.LastName && */}
                                        {lastNameValueError === true &&
                                          <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                                            Please enter last name.
                                          </span>
                                        }
                                        {/* <input className="form-control"
                                    defaultValue={userdetail && userdetail.LastName !== '' && userdetail.LastName}
                                    // value={userdetail && userdetail.LastName !=='' ? userdetail.LastName: LastName}
                                    required="" placeholder="Last Name" type="text" id="LastName" name="LastName"
                                    // pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                                    pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                                    onChange={(e) => handlechangeLastname(e)}
                                    {...register('LastName', { required: true })} /> */}
                                        {/* {errors.LastName &&
                                    <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                                      Please enter valid lastname
                                    </span>
                                  } */}
                                      </div>
                                    </div>
                                    {/* <Emailview /> */}
                                    <div className="form-group row lblmrgn">
                                      <label htmlFor="email" className="col-12 col-sm-12 col-md-4 col-lg-3 col-form-label">Email
                                        <span className="text-danger hidden" id="emailReq">*</span>
                                      </label>
                                      <div className="col-sm-4">
                                        {/* <input type="hidden" id="hdnEmailOTPGUID" verified="" name="EmailOTPGUID" value="" /> */}
                                        {/* <input id="hdnExistingEmail" type="hidden" /> */}
                                        <input id="txtEmail"
                                          onChange={handlechange}
                                          // value={document.getElementById('txtEmail').value}
                                          // defaultValue={emailvalue !== '' ? emailvalue : userdetail && userdetail.Email}
                                          // value={userdetail && userdetail.Email || emailvalue}
                                          value={emailvalue}
                                          className="form-control" placeholder="Email" type="email" name="email" disabled={disableEmail} />
                                        {/* {error ?
                                    <span className="text text-danger field-validation-valid"> Please enter valid email</span> : null
                                  } */}
                                      </div>
                                      {
                                        showAddChangeEmailButton === true ?
                                          <div id="divChangeEmail" className="col-sm-4">
                                            {showCancelButtonForEmail || enableChange ? null :
                                              <span
                                                id="btnAddEmail"
                                                className="btn btn-link"
                                                onClick={addemail}>
                                                {userdetail && userdetail.Email ? 'Change' : 'Add'}
                                              </span>}
                                            <span id="btnChangeEmail" style={{
                                              display: "none"
                                            }} className="btn btn-link">Change</span>
                                            {/* {showCancelButtonForEmail && enablesendotpview === false ?
                                    <span id="btnSendEmailOTPId"
                                      onClick={sendOTPForEmail}
                                      className="btn btn-link btnSendEmailOTP"
                                    > Send OTP</span>
                                    : null} */}
                                            {otpbuttonemail === true ? null :
                                              <span id="btnSendEmailOTPId"
                                                onClick={sendOTPForEmail}
                                                className="btn btn-link btnSendEmailOTP"
                                              > Send OTP</span>
                                            }
                                            {showCancelButtonForEmail ?
                                              < span id="btnCancelEmail" className="btn btn-link"
                                                onClick={cancelButtonForEmail}
                                              >Cancel</span> : null}
                                          </div> : null
                                      }
                                      <div>
                                      </div>
                                    </div>
                                    {
                                      enablesendotpview
                                        ?
                                        <div className="form-group row resndotpmail" id="divEmailOTP">
                                          <label htmlFor="EmailOTP" className="col-12 col-sm-12 col-md-4 col-lg-3 col-form-label otplblspc"></label>
                                          <div className="col-sm-4 input-group mspc">
                                            <input id="txtEmailOTP" type="password" className="form-control form-control-sm-25 input-validation-error" required="" placeholder="OTP" />
                                            <div className="btn-group">
                                              {/* <span id="resendEmailOtpTimer" className="input-group-text spntmr"></span> */}
                                              {verified ?
                                                <span id="spnEmailVerified" title="Verified" style={{ color: 'green', paddingTop: '10px' }} className="input-group-text fa fa-check"></span> : null}
                                            </div>
                                            {TimerShow && <TimerForOTP />}
                                            <div className="input-group-append resndbtns">
                                              <div className="btn-group otpspn" id="btnvrfy">
                                                {verified ? null :
                                                  <button
                                                    id="btnSendEmailOTP"
                                                    type="button"
                                                    className="btn btn-secondary input-group-btn"
                                                    disabled={TimerShow}
                                                    onClick={reSendOTPForEmail} >
                                                    Resend
                                                  </button>}
                                                {verified ? null :
                                                  <span id="txtVerifyEmail" className="btn btn-link" onClick={veriemail} >Verify</span>}
                                                {/* {verified ? null :
                                          <span id="btnCancelEmail" className="btn btn-link" onClick={cancelotpview} >Cancel</span>} */}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-sm-4"></div>
                                          <div className="col-sm-3"></div>
                                          <div className="col-sm-6 btmrgn">
                                            <span id="spnEmailOTPMessage" className="text text-danger"></span>
                                          </div>
                                        </div>
                                        :
                                        null}
                                    {/* <input onChange={onChangeMobileValue} /> */}
                                    <div className="form-group row lblmrgn">
                                      <label htmlFor="Phone" className="col-12 col-sm-12 col-md-4 col-lg-3 col-form-label">Mobile No.<span className="text-danger hidden" id="phoneReq">*</span></label>
                                      <div className="col-sm-4">
                                        {/* <input type="hidden" id="hdnPhoneOTPGUID"
                                    defaultValue={userdetail && userdetail.Mobile}
                                    verified="" name="PhoneOTPGUID" /> */}
                                        {/* <input id="hdnExistingPhone" type="hidden" /> */}
                                        <input id="txtPhone" className="form-control" disabled={disablemobile}
                                          // value={mobilevalue}
                                          // defaultValue={mobilevalue !== '' ? mobilevalue : userdetail && userdetail.Mobile}
                                          value={mobilevalue}
                                          onChange={onChangeMobileValue}
                                          maxLength="10"
                                          placeholder="Mobile Number (10 digit)" type="tel" pattern="^(\+)?(1\s*[-\/\.]?)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT])\.?\s*(\d+))*$" name="Phone" />
                                        {/* <input type="hidden"
                                    defaultValue={phone}
                                    id="Phone" name="Phone" /> */}
                                        {mobileValueError === true ?
                                          // errormobile ?
                                          <span className="text text-danger field-validation-valid" id="txtPhoneValMsg" >Please enter valid phone number</span> : null}
                                      </div>
                                      {showAddChangeMobileButton === true ?
                                        <div id="divChangePhone" className="col-sm-4">
                                          {showCancelButtonForMobile || enableChange ?
                                            null
                                            :
                                            <span
                                              id="btnAddPhone"
                                              className="btn btn-link"
                                              onClick={addmobile} >
                                              {/* {userdetail && userdetail.Mobile ? 'Change' : 'Add'} */}
                                              {userdetail && mobilevalue ? 'Change' : 'Add'}
                                            </span>}
                                          {/* {userdetail && userdetail.Mobile ?
                                   <span id="btnChangePhone" className="btn btn-link" onClick={onChangeMobileValue}>Change</span> : null} */}
                                          {/* {showCancelButtonForMobile && enablesendotpmobileview === false  ?
                                    <span id="btnSendPhoneOTPId" onClick={sendOTPForMobile} className="btn btn-link btnSendPhoneOTP" >Send OTP</span> : null} */}
                                          {otpbutton === true ? null :
                                            <span id="btnSendPhoneOTPId" onClick={sendOTPForMobile} className="btn btn-link btnSendPhoneOTP" >Send OTP</span>
                                          }
                                          {showCancelButtonForMobile ?
                                            <span id="btnCancelPhone " onClick={cancelinputmobile} className="btn btn-link">Cancel</span>
                                            : null}
                                        </div> : null
                                      }
                                    </div>
                                    {/* <Mobileview /> */}
                                    {enablesendotpmobileview ?
                                      <div className="form-group row resndotpmail" id="divPhoneOTP" >
                                        <label htmlFor="PhoneOTP" className="col-12 col-sm-12 col-md-4 col-lg-3 col-form-label otplblspc"></label>
                                        <div className="col-sm-4 input-group mspc">
                                          <input id="txtPhoneOTP" type="password" className="form-control form-control-sm-25 input-validation-error" required="" maxLength={4} placeholder="OTP" />
                                          <div className="btn-group">
                                            {/* <span id="resendPhoneOtpTimer" className="input-group-text spntmr" ></span> */}
                                            {verified ?
                                              <span id="spnPhoneVerified" title="Verified" style={{ color: 'green', paddingTop: '10px' }} className="input-group-text fa fa-check"></span> : null}
                                          </div>
                                          {TimerShow && <TimerForOTP />}
                                          <div className="input-group-append resndbtns">
                                            <div className="btn-group otpspn" id="btnvrfy">
                                              {verified ? null :
                                                <button
                                                  id="btnSendPhoneOTP"
                                                  type="button"
                                                  className="btn btn-secondary input-group-btn"
                                                  onClick={resendOTPForMobile}
                                                  disabled={TimerShow}
                                                // resendOTPForMobileButtonIsDisabled
                                                >
                                                  Resend
                                                </button>}
                                              {verified ? null :
                                                <span id="txtVerifyMobile" className="btn btn-link" onClick={veriemailmobile} >Verify</span>
                                              }
                                              {/* <span id="btnCancelPhone" className="btn btn-link" onClick={cancelotpviewmobile} >Cancel</span> */}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-sm-4"></div>
                                        <div className="col-sm-3"></div>
                                        <div className="col-sm-6 btmrgn">
                                          <span id="spnPhoneOTPMessage" className="text text-danger"></span>
                                        </div>
                                      </div>
                                      : null}
                                    <div className="form-group row">
                                      <label htmlFor="Company" className="col-12 col-sm-12 col-md-4 col-lg-3 col-form-label">Company</label>
                                      <div className="col-sm-4">
                                        <input type="text" className="form-control"
                                          placeholder="Company" id="Company"
                                          pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
                                          // {...register('Company', { required: true })}
                                          value={CompanyName}
                                          onChange={(e) => handlechangeCompanyname(e)}
                                        />
                                        {/* <input className="form-control" placeholder="Company" type="text" id="Company"
                                    defaultValue={userdetail.Company}
                                  // onChange={()=>setcompanyvalue(e.target.value)}
                                  /> */}
                                        <span className="text text-danger field-validation-valid" ></span>
                                      </div>
                                    </div>
                                    <div className="form-check row p-0 mt-0">
                                      <div className="col-12 col-sm-12 col-md-8 offset-md-4 col-lg-6 offset-lg-3">
                                        <label className="myprof">Receive offers
                                          <input
                                            type="checkbox"
                                            checked={receivedOfferCheckboxValue}
                                            onChange={(e) => receivedOfferOnChange(e)} />
                                          <span className="checkmarkmyprof"></span>
                                        </label>
                                        {/* <div className="custom-checkbox">
                                    <input id="IsReceiveOffers" name="IsReceiveOffers" type="checkbox" onChange={(e) => receivedOfferOnChange(e)} />
                                    <label className="form-check-label" htmlFor="IsReceiveOffers">Receive offers</label>
                                    <span className="checkmark"></span>
                                  </div> */}
                                      </div>
                                    </div>
                                    {/* <div className="custom-checkbox">
                                <input data-val="true" data-val-required="The IsReceiveOffers field is required." id="IsReceiveOffers" name="IsReceiveOffers" type="checkbox" value="true"/>
                                <label className="form-check-label" htmlFor="IsReceiveOffers">Receive offers</label>
                                <span className="checkmark"></span>
                              </div> */}
                                    <div className="form-check row p-0">
                                      <div className="col-12 col-sm-12 col-md-8 offset-md-4 col-lg-6 offset-lg-3">
                                        <br />
                                        <button
                                          // onClick={Updateprofile}
                                          disabled={updateButtonDisabled}
                                          onSubmit={handleSubmit(onSubmit)}
                                          type="submit"
                                          id="update"
                                          className="btn btn-secondary mt-0 mr-2"
                                          style={{ marginLeft: '0' }}>
                                          <i className="fa fa-save"></i> Update
                                        </button>
                                        <Link to="/account/dashboard" className="btn btn-secondary"><i className="fa fa-times"></i> Cancel</Link>
                                      </div>
                                    </div>
                                    <input name="IsReceiveOffers" type="hidden" value="false" />
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div >
                    </main >
                  </div >
                </div >
              </div >
            </div >
            <Footer />
          </div>
      }
    </>
  )
}
export default Profile
