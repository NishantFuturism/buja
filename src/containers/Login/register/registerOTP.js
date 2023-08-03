/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../../../../assets1/css/bundle.css';
// import './register.css';
import '../../../../assets1/css/responsive.min.css';
import '../../../../assets1/css/style.min.css';
import brandlogo from '../../../../assets1/img/icon/adibuja-logo.svg';
import Input from '../../HomePage/Input';
class RegisterOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: '',
    }
  }
  onChangeUsername() {
  }
  render() {
    return (
      <div>
        <div className="login-wrapper pb-35">
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
                              <img referrerPolicy='no-referrer' alt="brand-logo" src={brandlogo}
                                style={{ paddingLeft: '23px' }} width="198px" height="42px" />
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
                                            {/* <label htmlFor="email" className="col-sm-3"></label> */}
                                            <div className="rgt_ipt_box">
                                              <div className="input-group">
                                                <div className="input-group-prepend">
                                                  <div className="input-group-text" id="registerBackIcon"
                                                    style={{ display: 'none', cursor: 'pointer' }}><i
                                                      className="fa fa-arrow-left input-group-addon"></i></div>
                                                </div>
                                                <Input
                                                  className="form-control"
                                                  // id="txtRegisterUserNameForOTP"
                                                  type="text"
                                                  placeholder="Mobile No. / Email"
                                                  // value={this.state.username}
                                                  // required=""
                                                  onChange={this.onChangeUsername}
                                                />
                                                {/* <input defaultValue="" className="form-control" name="UserName" id="txtRegisterUserNameForOTP"
                                                  placeholder="Mobile No. / Email" autoComplete="off" tabIndex="-1" required=""
                                                  type="text" data-val="true" data-val-required="Please enter mobile number or email" />
                                                <input type="hidden" id="hdnIsUserCameFromLoginAfterUserNotExistsError" defaultValue="no" /> */}
                                                <div className="input-group-append">
                                                  <div className="btn-group">
                                                    <button type="button" id="btnRegisterChangeUserName"
                                                      className="btn btn-default input-group-btn"
                                                      style={{ backgroundColor: ':#e9ecef', border: '1px solid #ced4da', display: 'none' }} >Change</button>
                                                  </div>
                                                  {/* <div className="btn-group">
                                                    <button type="button" id="btnRegisterChangeUserNameDone"
                                                      className="btn btn-default input-group-btn"
                                                      style={{ backgroundColor: ':#e9ecef', border: '1px solid #ced4da' }}>Done</button>
                                                  </div> */}
                                                </div>
                                              </div>
                                              <span className="text text-danger validation-error field-validation-valid"
                                                data-valmsg-for="UserName" data-valmsg-replace="true"></span>
                                              {/* <p>
                                                <Link to="dd;" id="registerUserWithOTP" style={{ color: 'gray', position: 'absolute', top: '7px', right: '26px', zIndex: '10px' }}>Send OTP</Link>
                                              </p> */}
                                            </div>
                                          </div>
                                          <div className="login-box text-center" id="divOTPsection" style={{ display: 'none' }}>
                                            <input defaultValue="" type="hidden" id="returnurl" name="returnurl" />
                                            <h3 style={{ color: '#888888' }}>Enter OTP</h3><br />
                                            <div id="divOuter">
                                              <div id="divInner">
                                                <input id="txtRegisterOTP" name="OTP" type="password" maxLength="4" required="" />
                                              </div>
                                              <div id="resendOtpTimerNewdiv">
                                                <p id="resendRegisterOtpTimer" className="text-center"></p>
                                              </div>
                                            </div>
                                            <button type="submit" id="btnRegisterWithOTP" className="btn btn-secondary mb-4 mt-4">Register
                                              Now</button>
                                            <p align="center" id="divResendRegisterOTP" style={{ display: 'none' }}>
                                              Not received your OTP? &nbsp; <Link to id="btnResendRegisterOTP"
                                                style={{ display: 'none', color: 'dodgerblue' }} disabled="disabled"><i
                                                  className="fa fa-refresh"></i> Resend OTP</Link>
                                            </p>
                                            <br />
                                          </div>
                                          <div className="text-center pt-20 pb-20 top-bordered">
                                            <section>
                                              <p className="login-text text-center">Already registered with us? Please <Link to="/login"
                                                id="login">Login</Link></p>
                                            </section>
                                          </div>
                                          <div className="text-center pt-20 top-bordered">
                                            <section>
                                              <h4 style={{ paddingBottom: '8px' }}>Use another service to log in.</h4>
                                              <form method="post" className="form-horizontal" action="/Account/ExternalLogin">
                                                <div>
                                                  <p>
                                                    <button type="submit" className="btntest fa fa-google"
                                                      style={{ backgroundColor: '#ec4f1e', marginRight: '20px' }}
                                                      name="provider"
                                                      defaultValue="Google" title="Log in using your Google account"></button>
                                                    <button type="submit" className="btntest fa fa-facebook"
                                                      style={{ backgroundColor: '#3a5793', width: '45px' }} formTarget="_blank" name="provider"
                                                      defaultValue="Facebook" title="Log in using your Facebook account"></button>
                                                  </p>
                                                </div>
                                                <input name="__RequestVerificationToken" type="hidden"
                                                  defaultValue="" />
                                                <input name="__RequestVerificationToken" type="hidden"
                                                  defaultValue="" />
                                              </form>
                                            </section>
                                          </div>
                                        </div>
                                        <div id="frmRegisterCustomer" className="login-form" style={{ display: 'none' }}>
                                          <h3 align="center">
                                            Create an Account
                                          </h3>
                                          <p align="center">
                                            <small>Already registered with us?
                                              <Link style={{ color: 'dodgerblue' }}
                                                to="/login">Please Login</Link></small></p>
                                          <br />
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
          </div>
        </div>
      </div>
    )
  }
}
export default RegisterOTP;
