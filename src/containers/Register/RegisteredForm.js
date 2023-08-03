/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import '../../../assets1/css/bootstrap-select.min.css';
import '../../../assets1/css/default.min.css';
// import '../../../assets1/css/font-awesome.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
import brandlogo from '../../../assets1/img/icon/adibuja-logo.svg';
import history from '../../utils/history';
import Constants from '../App/constants';
import Input from '../HomePage/Input';
import { sendOtp, verifyOtpAction } from './actions';
import reducer from './reducer';
import saga from './saga';
// import './style.css';
export function RegiseredForm(props) {
  console.log({ props });
  const [sendotpbutton, setsendotpbutton] = useState(false);
  const [viewotpdiv, setviewotpdiv] = useState(false);
  // const [otpvalueemail, setotpvalueemail] = useState('');
  const [emailvale, setemailvalue] = useState('');
  const [counter, setCounter] = useState(59);
  // const [Error, setError] = useState('')
  const [Success, setSuccess] = useState('')
  const [isError, setIsError] = useState('');
  const [isSuccess, setisSuccess] = useState('')
  useInjectReducer({ key: 'registerOrignal', reducer });
  useInjectSaga({ key: 'registerOrignal', saga });
  // const [otp, setotp] = useState('');
  // const [CustomerRegistrationOTPGUID, setCustomerRegistrationOTPGUID] = useState();
  // const pattern = new RegExp(/^[0-9\b]+$/);
  // const initialMinute = 59
  // const initialSeconds = 0
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);
  // const [inputdata, setinputdata] = useState([]);
  // useEffect(() => {
  const registerOrignal = useSelector(state => state.registerOrignal);
  console.log({ registerOrignal });
  useEffect(() => {
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(document.getElementById('ReceiveOffers').value);
    const { value } = document.getElementById('ReceiveOffers')
    console.log(document.getElementById('newslettersubscription').value);
    const { subscribevalue } = document.getElementById('newslettersubscription').value
    console.log('checkbos', value, subscribevalue);
    console.log(data);
    const token = localStorage.getItem('generatedtoken');
    return fetch(`${Constants.urls.baseUrl}${Constants.endPoints.register}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ClientId: 1,
        Title: null,
        CustGuid: null,
        Name: data.firstName,
        LastName: data.lastname,
        Email: props.location.state.email,
        Company: null,
        Mobile: props.location.state.phone,
        Phone: props.location.state.phone,
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
        NewsLetterSubscribed: value,
        Consignee: null,
        Telephone: null,
        isPrimary: true,
        isGuest: false,
        ReceiveOffers: value,
        IsEmailVerified: false,
        IsPhoneVerified: true,
        BirthDate: null
      })
    })
      .then(res => res.json())
      .then(registerresponse => {
        console.log('registerresponse', registerresponse)
        // alert(registerresponse)
        setisSuccess(true)
        setSuccess(registerresponse);
        if (registerresponse === 'User Registered Successfully') {
          history.push('/', { customerdata: registerresponse })
        }
        try {
          console.log('registerresponse', registerresponse);
        } catch (e) {
          throw Error(registerresponse);
        }
      });
    // .catch(error => { alert(error, 'some thing went wrong') })
  }
  const Showalert = () => <div className="topmessage alert alert-danger alert-dismissible show" role="alert"><i className="fa fa-warning cross"></i><strong className="msg">{Error}</strong>
    <button type='button' className="close msgclose" aria-label="close" onClick={() => setIsError(false)}>×</button>
  </div>
  const ShowalertSuccess = () => <div className="topmessage alert alert-success alert-dismissible show" role="alert"><i className="fa fa-check chk"></i><strong className="msg">{Success}</strong>
    <button type='button' className="close msgclose" aria-label="close" onClick={() => setisSuccess(false)}>×</button>
  </div>
  const sendOTP = () => {
    console.log('otp');
    dispatch(sendOtp(emailvale))
    setviewotpdiv(true)
  }
  const onchangevalidatemobie = () => {
    setsendotpbutton(true)
    // sendOTP(e.target.value)
  }
  const onchangevalidateemail = (e) => {
    setemailvalue(e.target.value)
    // dispatch(changeUsername(e.target.value))
    setsendotpbutton(true)
    const timer = setInterval(() => {
      // eslint-disable-next-line no-unused-expressions
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter])
    return () => {
      clearInterval(timer);
    };
    // })
    // sendOTP(e.target.value)
  }
  function verifyotp(itm) {
    if (itm === 'email') {
      console.log(document.getElementById('txtEmailOTP').value);
      const { value } = document.getElementById('txtEmailOTP')
      dispatch(verifyOtpAction(registerOrignal.emaildata.CustomerGUID, value))
    }
    if (itm === 'mobile') {
      console.log(document.getElementById('txtEmailOTP').value);
      const { value } = document.getElementById('txtEmailOTP')
      dispatch(verifyOtpAction(registerOrignal.emaildata.CustomerGUID, value))
    }
    // console.log('verify', value,);
    // const { CustomerGUID } = registerOrignal.emaildata
    // dispatch(changeOTP(value))
    // dispatch(verifyotp(CustomerGUID, value,))
  }
  // const onchangeotpemai = (e) => {
  //   setotpvalueemail(e.target.value)
  // }
  // }
  return (
    <div>
      {isError === true ? <Showalert /> : null}
      {isSuccess === true ? <ShowalertSuccess /> : null}
      <div className="login-wrapper pb-35" style={{ marginTop: 20 }}>
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
                                        {/* <div id="frmRegisterCustomer" className="login-form" > */}
                                        <h3 align="center">
                                          Create an Account
                                        </h3>
                                        <p align="center"><small>Already registered with us? <Link style={{ color: 'dodgerblue' }}
                                          to="/login">Please Login</Link></small></p>
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
                                                    style={{ color: 'red' }}>*</span>
                                                </label>
                                                <Input
                                                  type="text"
                                                  id="Name"
                                                  className="form-control plcehldname"
                                                  required=""
                                                  placeholder="Enter First Name"
                                                  {...register('firstName', { required: true })}
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
                                                    style={{ color: 'red' }}>*</span>
                                                </label>
                                                <Input
                                                  type="text"
                                                  id="Name"
                                                  className="form-control plcehldname"
                                                  required=""
                                                  placeholder="Enter Last Name"
                                                  {...register('lastname', { required: true })}
                                                />
                                                {errors.firstName &&
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
                                                {props.location.state.email === null ?
                                                  <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control plcehldname"
                                                    required="" placeholder="Enter Email Address"
                                                    {...register('email', { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                                                    value={emailvale}
                                                    onChange={(e) => onchangevalidateemail(e)}
                                                  />
                                                  :
                                                  <Input
                                                    type="email"
                                                    id="email"
                                                    className="form-control plcehldname"
                                                    value={props.location.state.email}
                                                  />}
                                                {errors.email &&
                                                  <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                                                    Please enter email.
                                                  </span>
                                                }
                                              </div>
                                              {sendotpbutton ?
                                                <div id="divChangeEmail" className="col-md-2" >
                                                  <span id="txtSendEmailOTPId" className="btn btn-link btnSendEmailOTP sendotptxt" onClick={sendOTP}>Send
                                                    OTP</span>
                                                </div> : null}
                                            </div>
                                            <br />
                                            {viewotpdiv ?
                                              <div className="row spac" style={{ alignSelf: 'center' }}>
                                                <div className="form-group row otpmail" id="divEmailOTP">
                                                  <div className="col-sm-8 input-group mspc">
                                                    {props.location.state.phone === 'null' ?
                                                      <Input type="password" id="txtEmailOTP" className="form-control"
                                                        maxLength={4} // value={otpvalueemail}
                                                      // onChange={(e) => onchangeotpemai(e)}
                                                      /> :
                                                      <Input type="password" id="txtEmailOTP" className="form-control"
                                                        maxLength={4} value={props.location.state.email} />}
                                                    <div className="btn-group">
                                                      {/* <span id="resendEmailOtpTimer" className="input-group-text spntmr">00:{counter}</span> */}
                                                      <span id="spnEmailVerified" title="Verified" style={{ display: 'none', color: 'green', paddingTop: '10px' }}
                                                        className="input-group-text fa fa-check"></span>
                                                    </div>
                                                    <div className="input-group-append btns">
                                                      <div className="btn-group otpspn" id="btnvrfy">
                                                        {/* {counter === '00' ? */}
                                                        <button id="btnSendEmailOTP" style={{ mar: '10px' }}
                                                          type="button"
                                                          className="btn btn-secondary input-group-btn" disabled="" onClick={sendOTP}>
                                                          Resend
                                                        </button>
                                                        {/* </button> : null} */}
                                                        <button type='button' id="txtVerifyUnverifiedEmail" className="btn btn-link" onClick={() => verifyotp('email')}> Verify</button>
                                                        <button type='button' id="txtCancelEmailVerification" className="btn" onClick={() => setviewotpdiv(false)} >Cancel</button>
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
                                            <br />
                                            <div className="row spc">
                                              <div className="col-md-10">
                                                <label className="pb-10" htmlFor="Mobile">
                                                  Mobile Number
                                                </label>
                                                {props.location.state.email === null ?
                                                  <Input
                                                    type="text" id="Mobile"
                                                    className="form-control plcehldname"
                                                    tabIndex="-1"
                                                    placeholder="Enter Mobile Number"
                                                    value={props.location.state.phone}
                                                    onChange={(e) => onchangevalidatemobie(e)}
                                                  /> :
                                                  <Input type="text" id="txtEmailOTP" className="form-control" maxLength={4} value={props.location.state.phone} />}
                                                {errors.Mobile &&
                                                  <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                                                    Please enter email.
                                                  </span>
                                                }
                                              </div>
                                              {sendotpbutton ?
                                                <div id="divChangePhone" className="col-md-2">
                                                  <span id="txtSendMobileOTPId" className="btn btn-link btnSendMobileOTP sendotptxt" >Send
                                                    OTP</span>
                                                </div> : null}
                                            </div><br></br>
                                            {viewotpdiv ?
                                              <div className="row spac">
                                                <div className="form-group row otpmail" id="divMobileOTP" style={{ display: 'none' }}>
                                                  <div className="col-sm-8 input-group mspc">
                                                    {/* <input id="txtMobileOTP" className="form-control form-control-sm-25 input-validation-error" name="OTP"
                                                    type="password" maxLength="4"
                                                    onInput="if (!window.__cfRLUnblockHandlers) return false; this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                                                    onKeyPress="if (!window.__cfRLUnblockHandlers) return false; if(this.value.length==4) return false;"
                                                    required="" /> */}
                                                    <div className="btn-group">
                                                      <span id="resendMobileOtpTimer" className="input-group-text spntmr">00:{counter}</span>
                                                      <span id="spnMobileVerified" title="Verified" style={{ color: 'green', paddingTop: '10px' }}
                                                        className="input-group-text fa fa-check"></span>
                                                    </div>
                                                    <div className="input-group-append btns">
                                                      <div className="btn-group otpspn" id="btnvrfy">
                                                        {counter === '00' ?
                                                          <button id="btnSendMobileOTP" style={{ marginLeft: '10px' }} type="button"
                                                            className="btn btn-secondary input-group-btn" disabled="">
                                                            Resend
                                                          </button> : null}
                                                        <span id="txtVerifyUnverifiedMobile" className="btn btn-link" onClick={() => verifyotp('mobile')}>Verify</span>
                                                        <span id="txtCancelMobileVerification" className="btn btn-link" onClick={() => setviewotpdiv(false)}>Cancel</span>
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
                                            <div className="login-box">
                                              <div className="form-check row">
                                                <div className="col-md-12 col-sm-12 row chkbx">
                                                  <div className="col-md-3 col-sm-12 rec_rW">
                                                    <div className='custom-checkbox' >
                                                      <Input
                                                        id="ReceiveOffers"
                                                        type="checkbox" />
                                                      <label className="form-check-label chklbl" htmlFor="ReceiveOffers">Receive offers</label>
                                                      <span className="checkmark"></span>
                                                    </div>
                                                  </div>
                                                  <div className="col-md-9 col-sm-12 rec_rW">
                                                    <div>
                                                      <Input
                                                        id="newslettersubscription"
                                                        type="checkbox" />
                                                      {/* <input data-val="true"
                                                        id="newslettersubscription" type="checkbox" /> */}
                                                      <label className="form-check-label chklbl" htmlFor="newslettersubscription">Sign up For Our Newsletter</label>
                                                      {/* <span className="checkmark"></span> */}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="form-check row">
                                                  <div className="col-md-6" id="btnreg">
                                                    <input type="hidden" name="ReturnURL" />
                                                    {/* <input type="submit" id="loginuserRegister" defaultValue="" className="btn btn-secondary mt-4 cntr" onSubmit={handleSubmit(onSubmit)}
                                                    /> */}
                                                    <button type="submit" id="loginuserRegister" className="btn btn-secondary mt-4 cntr" onSubmit={handleSubmit(onSubmit)}
                                                    >Register Me</button>
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
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
