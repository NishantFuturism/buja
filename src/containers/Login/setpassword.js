/* eslint-disable */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useDispatch, useSelector } from 'react-redux';
import '../../../assets1/css/default.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
import { ToastContainer } from 'react-toastify';
import adibujalogo from '../../../assets1/img/icon/adibuja-logo.svg';
import { newPasswordapi } from './actions';
import reducer from './reducer';
import saga from './saga';
import history from '../../utils/history';
// import Api from '../MainPage/api/homeServices'
import Success from "../../components/ShowAlert/success";
import 'react-toastify/dist/ReactToastify.css';
import '../Login/login.css'
import Constants from '../App/constants';
export default function Setpassword() {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });
  // const [FirstLoad, setFirstLoad] = useState(0);
  // const [isVarified, setIsVarified] = useState(false);
  const [oneLetter, setOneLetter] = useState(false);
  const [oneCapital, setOneCapital] = useState(false);
  const [oneNumber, setNumber] = useState(false);
  const [newPasswordAndConfirmPasswordAreSame, setNewPasswordAndConfirmPasswordSame] = useState(false);
  const [oneSpacialChar, setOneSpacialChar] = useState(false);
  const [eightChars, setEightChars] = useState(false);
  const [Shown1password, setShown1password] = useState(false);
  const [showValidation, setValidation] = useState(false);
  // const [ShowOpassword, setShowOpassword] = useState(false);
  const [ShowCnfpassword, setShowCnfpassword] = useState(false);
  const [n1passwordTxt, setn1passwordTxt] = useState('');
  // const [OpasswordTxt, setOpasswordTxt] = useState('');
  const [cnfpasswordTxt, setcnfpasswordTxt] = useState('');
  console.log('cnfpasswordTxt---', cnfpasswordTxt)
  // const [tokenget, setTokenGet] = useState(false);
  // const [isFirstTimePasswordChange,setIsFirstTimePasswordChange]=useState(false)
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [isFirstTimeUpdate, setisFirstTimeUpdate] = useState();
  const [usernameValue, setUsernameValue] = useState();
  const [spttoken, setSptToken] = useState();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState('')
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)
  const footerData = useSelector(state => state)
  console.log("footerData", footerData);
  const dispatch = useDispatch()
  const loginData = useSelector(state => state.login)
  console.log('loginData', loginData)
  const location = useLocation();
  console.log("location", location);
  useEffect(() => {
    // alert('new')
    setNewPasswordAndConfirmPasswordSame(true)
    setSaveButtonDisabled(true)
    const { search } = location;
    //  const search='?token=c5eb6817-01c7-4d83-a7bb-f48aaa784675&Username=ankitad@futurismtechnologies.com&CustomerType=1'
    // let sptstring=search.split('?')
    // let tokenvalue=sptstring[1]
    // || search !== null || search !== undefined
    console.log('search--', search)
    if (search !== '') {
      const sptoken = search.slice(7, 43)
      setSptToken(search.slice(7, 43));
      const mobileAndEmailString = search.slice(53);
      console.log('66---', mobileAndEmailString)
      console.log('69--', mobileAndEmailString.indexOf("&"))
      const removeAndFromString = mobileAndEmailString.indexOf("&")
      console.log('71--', removeAndFromString)
      // const usernamevalue = search.slice(53, removeAndFromString);
      const usernamevalue = search.slice(53, 53 + removeAndFromString);
      console.log('74-', usernamevalue)
      setUsernameValue(usernamevalue)
      console.log("spttoken", sptoken, spttoken, usernamevalue);
      // dispatch(newPasswordapi(sptoken, usernamevalue))
      // dispatch(newPasswordAction(spttoken,usernameValue,n1passwordTxt,cnfpasswordTxt,true))
    }
  }, [])
  // const location = useLocation();
  // console.log("location",location);
  // const search=location.search;
  // // const pathname='/newpassword?token=c84ef596-4010-4cdb-bacf-d38895deaaa2&Username=ankitad@futurismtechnologies.com&CustomerType=1'
  // const sptstring=search.split('?')
  // const tokenvalue=sptstring[1]
  // const spttoken=search.slice(7, 43);
  // // const username=location.pathname.split('&')
  // const usernamevalue=tokenvalue.slice(52, 84);
  // console.log("sptstring",sptstring,tokenvalue,"spttoken",spttoken,usernamevalue);
  // alert(sptstring)
  function setNewPassword(e) {
    // console.log("val", e.target.value)
    // setn1passwordTxt(e)
    setn1passwordTxt(e.target.value)
    setValidation(true)
  }
  function showSameError() {
    if (cnfpasswordTxt && n1passwordTxt === cnfpasswordTxt) {
      setNewPasswordAndConfirmPasswordSame(true)
    }
  }
  useEffect(() => {
    // dispatch(newPasswordAction())
    if (n1passwordTxt !== '' && cnfpasswordTxt !== '' && (n1passwordTxt !== cnfpasswordTxt)) {
      setNewPasswordAndConfirmPasswordSame(false)
      setSaveButtonDisabled(true)
    }
    if (n1passwordTxt !== '' && cnfpasswordTxt !== '' && (n1passwordTxt === cnfpasswordTxt)) {
      setNewPasswordAndConfirmPasswordSame(true)
      setSaveButtonDisabled(false)
      // if (OpasswordTxt && eightChars && oneLetter && oneCapital && oneSpacialChar && oneNumber) {
      //   setIsVarified(true)
      // }
    }
  }, [cnfpasswordTxt])
  useEffect(() => {
    if (n1passwordTxt.length >= 8) {
      setEightChars(true)
    }
    const atleastOneNumber = new RegExp(/.*[0-9]+.*/)
    const atleastOneCap = new RegExp(/.*[A-Z]+.*/)
    const atleastOneSpecialChar = new RegExp(/.*[^A-Za-z0-9].*/)
    if (atleastOneCap.test(n1passwordTxt)) {
      setOneCapital(true)
    }
    if (atleastOneSpecialChar.test(n1passwordTxt)) {
      setOneSpacialChar(true)
    }
    if (n1passwordTxt !== '') {
      setOneLetter(true)
    }
    if (atleastOneNumber.test(n1passwordTxt)) {
      setNumber(true)
    }
    if (eightChars === true) {
      setValidation(false)
    }
  }, [n1passwordTxt])
  useEffect(() => {
    console.log('loginData--', loginData)
    console.log('usernameValue--', usernameValue)
    if (loginData !== undefined && (loginData.getNewPasswordResponse !== '' || loginData.getNewPasswordResponse !== undefined || loginData.getNewPasswordResponse !== null) && loginData.getNewPasswordResponse === usernameValue) {
      setShowSuccessAlert(true)
      setSuccessAlertMessage('Password Set Successfully')
      setTimeout(() => {
        setShowSuccessAlert(false)
        history.push('/login/form')
      }, 3000)
    }
  }, [loginData])
  const submit = () => {
    console.log("newPasswordAndConfirmPasswordAreSame..", newPasswordAndConfirmPasswordAreSame);
    console.log('spttoken--', spttoken);
    console.log('usernameValue--', usernameValue);
    console.log('n1passwordTxt--', n1passwordTxt);
    console.log('cnfpasswordTxt--', cnfpasswordTxt);
    // if (newPasswordAndConfirmPasswordAreSame === true) {
    //   Api.NewPasswordForReact(spttoken, usernameValue, n1passwordTxt, cnfpasswordTxt, true)
    //     .then(response => {
    //       if (response.MessageTypeID === 5) {
    //         console.log("pval..", response.Message)
    //         setShowSuccessAlert(true)
    //         setSuccessAlertMessage(response.Message)
    //         // dispatc(response))
    //       }
    //       history.push('/login/form')
    //     })
    //     .catch(error => {
    //       console.log('error:::', error);
    //     });
    // }
    // {
    //   "Token": "2ab59055-d915-4830-a7f5-f6d603e7c011",
    //   "UserName": "satishs@futurismtechnologies.com",
    //   "NewPassword": "Satish@1",
    //   "ConfirmPassword": "Satish@1",
    //   "ClientId": 1,
    //   "IsPasswordChangedForFirstTimeFlag": true,
    //   "CustomerType": 1
    // }
    // if (localStorage.getItem('generatedtoken') !== null) {
    //   console.log('188--', localStorage.getItem('generatedtoken'))
    //   dispatch(newPasswordapi(spttoken, usernameValue, n1passwordTxt, cnfpasswordTxt, true))
    // } else {
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
      .then((result) => {
        result && localStorage.setItem('generatedtoken', result.access_token);
        // window.location.reload(true);
        // setheadercall(true)
        // setPage(false)
        // setfootercall(true)
        // dispatch(defaultAction(localStorage.getItem('skuproduct')))
        // dispatch(defaultActiondeal())
        dispatch(newPasswordapi(spttoken, usernameValue, n1passwordTxt, cnfpasswordTxt, true))
      }

        /* error => {
          // this.setState({ buttonload: false });
          // console.log(error);
          history.pushState('/NotFoundPage')
        }, */
      );
    // }

    // dispatch(newPasswordAction())
    // const email = window.atob(localStorage.getItem('LoingID'))
    // if (isFirstTimeUpdate) {
    //   dispatch(updatePasswordAction(email, OpasswordTxt, n1passwordTxt))
    // } else {
    //   // managePasswordAPI.setupPasswordAPI(email, n1passwordTxt, cnfpasswordTxt)
    //   dispatch(setpassword(email, n1passwordTxt, cnfpasswordTxt))
    //   // dispatch(updatePasswordAction(email, OpasswordTxt, n1passwordTxt))
    //   // dispatch(setUpPasswordAction(n1passwordTxt, cnfpasswordTxt))
    // }
  }
  // useEffect(() => {
  //   if(!spttoken ===''){
  //     // setTokenGet(true)
  //   }
  //   // let tokenget=searchParams.get("token")
  //   // console.log("tokenget",tokenget);
  // },[spttoken])
  return (
    <>
      {/* {tokenget===true ? */}
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      {showSuccessAlert && < Success msg={successAlertMessage} />}
      <div className="login-wrapper pb-35">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <div className="section-title text-center">
                <p align="center" style={{ padding: '10px,0px' }}>
                  <Link to="/">
                    <img referrerPolicy='no-referrer' alt="brand-logo" src={adibujalogo} style={{ paddingLeft: '23px' }} width="198px" height="42px" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
          {/* <div className="row">
          <div className="col-12 col-sm-12 col-md-12">
            <div className="section-title text-center">
              <h3>Set Password?</h3>
            </div>
          </div>
        </div> */}
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6 offset-lg-2 offset-xl-3">
              <div className="section-title text-center">
                <h3>Set Password?</h3>
              </div>
              <div className="login-form set-password-form">
                {/* <form id="frm_chng_password" noValidate="novalidate"> */}
                {/* <input name="__RequestVerificationToken" type="hidden" value="CfDJ8GU7la7EhPRApgogj-dhHLjILehkfCXWDWsOsTVYD2fv84FvYnKa8IMgsvwZSZ5Z5Er1addlVXU8ElTfHn-Nmitm3Vm3RAxyaMKju9p62Zsj5qPBdpG_c8zkz2VU2IFmQjjSCPOeJH8wKN_F23Rfn_k" />
                  <input id="Email" name="Email" type="hidden" value="8329934314" />
                  <input id="Token" name="Token" type="hidden" value="e0fb3b62-9dd5-42c6-897e-0f5bb3c51f2f" /> */}
                <div className="form-group row mb-4">
                  <label className="col-12 col-sm-12 col-md-4 col-form-label" htmlFor="NewPassword">New Password <span className="text-danger">*</span> </label>
                  <div className="col-12 col-sm-12 col-md-8">
                    {/* <input className="form-control" id="npassword" required="" onCopy="if (!window.__cfRLUnblockHandlers) return false; return false" onPaste="if (!window.__cfRLUnblockHandlers) return false; return false" type="password" data-val="true" data-val-length="Must be between 8 and 12 characters" data-val-length-max="12" data-val-length-min="8" data-val-regex="Password must contain at least 8 characters including at least one uppercase,one lowercase and one numeric character." data-val-regex-pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$" data-val-required="Password is required" name="NewPassword" />
                    <button className="pass-show-btn mt-0" type="button" ><i id="pass-statust" className="fa fa-eye"></i></button> */}
                    <input type={Shown1password ? 'text' : "password"} className="form-control" id="npassword" onClick={setNewPassword} onChange={e => setn1passwordTxt(e.target.value)} placeholder="New Password " required="" />
                    <button className="pass-show-btn mt-0" type="button">
                      {/* {!Shown1password ? */}
                      <i id="pass-statust" onClick={() => setShown1password(!Shown1password)}
                        className={`fa ${Shown1password ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      {/* : <i id="pass-statust" onClick={() => setShown1password(!Shown1password)} className="fa-eye-slash"></i>
                                  } */}
                    </button>
                  </div>
                  {/* <div id="pswd_info">
                    <h4>Password must meet the following requirements</h4>
                    <ul>
                      <li id="letter" className="invalidpswd">At least <strong>one letter</strong></li>
                      <li id="capital" className="invalidpswd">At least <strong>one capital letter</strong></li>
                      <li id="number" className="invalidpswd">At least <strong>one number</strong></li>
                      <li id="schar" className="invalidpswd"> At least <strong>one special character</strong></li>
                      <li id="length" className="invalidpswd">Be at least <strong>8 characters</strong></li>
                    </ul>
                  </div> */}
                  {showValidation && <div id="pswd_info1">
                    <h4>Password must meet the following requirements</h4>
                    <ul>
                      <div style={{ color: `${oneLetter ? 'green' : 'red'}` }}>
                        <i className={`fa ${oneLetter ? 'fa-check' : 'fa-close'}`} ></i>
                        <li style={{ diaplay: 'inline' }} id="letter" className="invalidpswd"> At least <strong>one letter</strong></li>
                      </div>
                      <div style={{ color: `${oneCapital ? 'green' : 'red'}` }}>
                        <i className={`fa ${oneCapital ? 'fa-check' : 'fa-close'}`} > </i>
                        <li id="capital" className="invalidpswd">  At least <strong> one capital letter
                        </strong></li>
                      </div>
                      <div style={{ color: `${oneNumber ? 'green' : 'red'}` }}>
                        <i className={`fa ${oneNumber ? 'fa-check' : 'fa-close'}`} > </i>
                        <li id="number" className="invalidpswd">  At least <strong> one number</strong></li>
                      </div>
                      <div style={{ color: `${oneSpacialChar ? 'green' : 'red'}` }}>
                        <i className={`fa ${oneSpacialChar ? 'fa-check' : 'fa-close'}`} > </i>
                        <li id="schar" className="invalidpswd">  At least <strong> one special character</strong></li>
                      </div>
                      <div style={{ color: `${eightChars ? 'green' : 'red'}` }}>
                        <i className={`fa ${eightChars ? 'fa-check' : 'fa-close'}`} > </i>
                        <li id="length" className="invalidpswd">  Be at least <strong>8 characters</strong></li>
                      </div>
                    </ul>
                  </div>
                  }
                </div>
                <div className="form-group row mb-4">
                  <label className="col-12 col-sm-12 col-md-4 col-form-label" htmlFor="ConfirmPassword">Confirm Password <span className="text-danger">*</span></label>
                  <div className="col-12 col-sm-12 col-md-8">
                    {/* <input className="form-control" id="cnfpassword" required="" onCopy="if (!window.__cfRLUnblockHandlers) return false; return false" onPaste="if (!window.__cfRLUnblockHandlers) return false; return false" type="password" data-val="true" data-val-equalto="New Password and Confirm password must be same" data-val-equalto-other="*.NewPassword" data-val-required="Confirm Password is required" name="ConfirmPassword" />
                    <button className="pass-show-btn mt-0" type="button"><i id="pass-statust" className="fa fa-eye"></i></button>
                    <span className="text text-danger field-validation-valid" data-valmsg-for="ConfirmPassword" data-valmsg-replace="true"></span> */}
                    <input
                      type={ShowCnfpassword ? 'text' : "password"}
                      onClick={showSameError}
                      onChange={e => setcnfpasswordTxt(e.target.value)}
                      className="form-control"
                      id="cnfpassword"
                      placeholder="Confirm Password "
                      required=""
                    />
                    <button
                      className="pass-show-btn mt-0"
                      type="button" >
                      <i id="pass-statust"
                        onClick={() => setShowCnfpassword(!ShowCnfpassword)}
                        className={`fa ${ShowCnfpassword ? 'fa-eye-slash' : 'fa-eye'}`}>
                      </i>
                    </button>
                    {newPasswordAndConfirmPasswordAreSame === false
                      &&
                      <span className="text text-danger field-validation-valid" >
                        New Password and Confirm password must be same
                      </span>}
                  </div>
                </div>
                <div className="login-box mt-5 text-center">
                  <button type="submit"
                    // disabled={!isVarified}
                    onClick={submit}
                    className="btn btn-secondary mb-4 mt-4" id="save"
                    disabled={saveButtonDisabled}
                  >Save</button>
                </div>
                <br />
                <div>
                  <label className="text text-success" id="SuccessMssg"> </label>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* :null} */}
    </>
  )
}
