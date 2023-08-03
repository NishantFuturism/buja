/**
 *
 * Register
 *
 */
import React, { useEffect, useState } from 'react';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import '../../../assets1/css/default.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
import brandlogo from '../../../assets1/img/icon/adibuja-logo.svg';
import Success from '../../components/ShowAlert/success';
import history from '../../utils/history';
import Input from '../HomePage/Input';
import { sendOtp, verifyOtpAction } from './actions';
import reducer from './reducer';
import saga from './saga';
export function Register(props) {
  useInjectReducer({ key: 'register', reducer });
  useInjectSaga({ key: 'register', saga });
  const [Error, setError] = useState('')
  const [username, setusername] = useState('')
  const [isError, setIsError] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [otpview, setotpview] = useState(false);
  const [otpdata, setotpdta] = useState([]);
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const dispatch = useDispatch()
  const registerOrignal = useSelector(state => state.register);
  console.log('', registerOrignal, props);
  useEffect(() => {
    if (registerOrignal !== undefined) {
      if (registerOrignal.sendotpdata.IsCustomerExist || registerOrignal.sendotpdata.IsRunTimeError || registerOrignal.sendotpdata.IsServerDown) {
        setIsError(true);
        setError(registerOrignal.sendotpdata.Message);
        setShowMsg(true)
        closeMsgBar()
      }
    }
  }, [registerOrignal])
  useEffect(() => {
    if (registerOrignal !== undefined) {
      if (registerOrignal.enableview) {
        setotpview(registerOrignal.enableview)
      }
    }
  }, [registerOrignal])
  useEffect(() => {
    if (registerOrignal !== undefined) {
      setotpdta(registerOrignal)
    }
  }, [registerOrignal])
  const handleonchange = (e) => {
    setusername(e.target.value)
  }
  useEffect(() => {
    const pattern = new RegExp(/^[0-9\b]+$/);
    if (!pattern.test(username)) {
      setemail(username)
    } else {
      setphone(username)
    }
  })
  function submit() {
    const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/);
    console.log('user', username);
    if (username === '') {
      setIsError(true);
      setError('Please enter mobile number (10 digit) or Email');
      setShowMsg(true)
      closeMsgBar()
    }
    else if (!emailphone.test(username)) {
      setIsError(true);
      setError('Please enter valid mobile number (10 digit) or Email.');
      setShowMsg(true)
      closeMsgBar()
    }
    else {
      console.log('ss');
      dispatch(sendOtp(username))
    }
  }
  function closeMsgBar() {
    setTimeout(() => {
      setShowMsg(false)
    }, 3000);
  }
  // const onResponse = resp => {
  //   console.log({ resp });
  // };
  // const responseGoogle = (response) => {
  //   // const googlesignindata = response.profileObj
  //   // setuserdata(JSON.stringify({ googlesignindata }))
  //   console.log({ response });
  //   // console.log('sss', googlesignindata.familyName);
  //   // const firstname = googlesignindata.familyName
  //   // const { name } = googlesignindata
  //   // const login = true
  //   // dispatch(getgooglelogindata(googlesignindata, login))
  //   // history.push('/')
  // }
  const Regesternow = () => {
    const { value } = document.getElementById('txtRegisterOTP')
    if (value === '') {
      setIsError(true);
      setError('Please enter OTP');
      setShowMsg(true)
      closeMsgBar()
    } else {
      dispatch(verifyOtpAction(otpdata.sendotpdata.CustomerGUID, value))
      history.push('/register/form', { email, phone, data: registerOrignal })
    }
  }
  const Otpview = () => <div className="login-box text-center" id="divOTPsection" >
    <input value="" type="hidden" id="returnurl" name="returnurl" />
    <h3 style={{ color: '#888888' }}>Enter OTP</h3><br />
    <div id="divOuter">
      <div id="divInner">
        <input id="txtRegisterOTP" name="OTP" type="password" maxLength="4"
        />
      </div>
      {/* {counter === 0 ? "Time over" : counter} */}
      {/* {clear ? */}
      {/* <div id="resendOtpTimerNewdiv">
        <p id="resendRegisterOtpTimer" className="text-center">CountDown: {counter === 0 ? "Time over" : counter}</p>
      </div> */}
      {/* : null} */}
    </div>
    <button type="submit" id="btnRegisterWithOTP" className="btn btn-secondary mb-4 mt-4" onClick={Regesternow}>Register
      Now</button>
    <p align="center" id="divResendRegisterOTP" >
      Not received your OTP? &nbsp;
      <button id="btnResendRegisterOTP" type='button' style={{ color: 'dodgerblue' }} disabled="disabled" >Resend OTP</button>
    </p>
    <br />
  </div>
  return (
    <>
      {showMsg && < Success isError={isError} msg={Error} />}
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
                                        <h3 align="center">
                                          Register Using OTP
                                        </h3>
                                        <p align="center">
                                          <small>
                                            Please check the OTP sent to your Mobile Number / Email
                                          </small>
                                        </p>
                                        <br />
                                        <div className="form-group row align-items-center mb-4 reg_Otp_rw">
                                          <div className="rgt_ipt_box">
                                            <div className="input-group">
                                              <Input
                                                className="form-control"
                                                id="txtRegisterUserNameForOTP"
                                                type='tel'
                                                placeholder="Mobile No. / Email"
                                                value={username}
                                                onChange={(e) => handleonchange(e)}
                                                required=""
                                              />
                                            </div>
                                            <span className="text text-danger validation-error field-validation-valid" data-valmsg-for="UserName"
                                              data-valmsg-replace="true"></span>
                                            <p>
                                              <a href
                                                id="registerUserWithOTP" type='button'
                                                onClick={submit}
                                              // style={{ display: changebutton === false ? 'inline' : 'none' }}
                                              >
                                                SendOTP
                                              </a>
                                            </p>
                                          </div>
                                        </div>
                                        {otpview ? <Otpview /> : null}
                                        <div className="text-center pt-20 pb-20 top-bordered" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                          <section>
                                            <p className="login-text text-center">Already registered with us? Please <Link to="/login"
                                              id="login">Login</Link></p>
                                          </section>
                                        </div>
                                        <div className="text-center pt-20 top-bordered" style={{ paddingTop: '20px' }}>
                                          <section>
                                            <h4 style={{ paddingBottom: '8px' }}>Use another service to log in.</h4>
                                            <form method="post" className="form-horizontal">
                                              <div>
                                                <p>
                                                  <button type="submit" className="btntest fa fa-google"
                                                    style={{ backgroundColor: '#ec4f1e', marginRight: '20px', borderRadius: '6px' }}
                                                    name="provider" defaultValue="" title="Log in using your Google account" disabled></button>
                                                  {/* <GoogleLogin
                                      clientId="1028275409428-d2a7sbt66295nmec2jsmmr9t0isloqdp.apps.googleusercontent.com"
                                      render={renderProps => (
                                        <button type="submit"
                                          onClick={renderProps.onClick}
                                          className="btntest fa fa-google"
                                          style={{ backgroundColor: '#ec4f1e', marginRight: '20px' }}
                                          name="provider" defaultValue="" title="Log in using your Google account"></button>
                                      )}
                                      buttonText="Login"
                                      onSuccess={responseGoogle}
                                      onFailure={responseGoogle}
                                      redirectUri='http://localhost:44338/login'
                                    /> */}
                                                  <button type="submit" className="btntest fa fa-facebook"
                                                    style={{ backgroundColor: '#3a5793', marginRight: 0, borderRadius: '6px', width: '45px' }}
                                                    formTarget="_blank" name="provider" defaultValue="" title="Log in using your Facebook account" disabled></button>
                                                  {/* <FacebookLogin
                                      appId="233261671133083"
                                      autoLoad
                                      callback={onResponse}
                                      render={renderProps => (
                                        <button type="submit" className="btntest fa fa-facebook"
                                          onClick={renderProps.onClick}
                                          style={{ backgroundColor: '#3a5793', marginRight: 0 }}
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
    </>
  );
}
export default (Register);
