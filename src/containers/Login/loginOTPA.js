import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
function LoginOTPA() {
  return (
    <div>
      <div id="divloginwithotp" >
        <h3 align="center">Login Using OTP</h3>
        {/* <h3 align="center">Register Using OTP</h3>
          <p align="center">
            <small>
              Please check the OTP sent to your Mobile Number / Email
            </small>
          </p> */}
        <br />
        <div className="form-group row align-items-center">
          <div className="input-group col-lg-10 ml-5" >
            <input name="UserName" id="txtUserNameForOTP" defaultValue=""
              className="form-control form-control-sm-50"
              placeholder="Mobile No. / Email" autoComplete='off' required="" />
            <input type="hidden"
              id="hdnIsUserCameFromRegisterAfterUserAlreadyExistsError"
              defaultValue="" />
            {/* <div className="input-group-append">
                <div className="btn-group">
                  <button type="button" id="btnChangeUserName"
                    className="btn btn-default input-group-btn"
                  >Change</button>
                </div>
                <div className="btn-group">
                  <button type="button" id="btnChangeUserNameDone"
                    className="btn btn-default input-group-btn">
                    Done</button>
                </div>
              </div> */}
            <span style={{ position: 'absolute', right: '26px' }}>
              <Link to id="sendloginUserWithOTP">
                Send OTP
              </Link>
            </span>
          </div>
          {/* <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text" id="backIcon">
                  <i  className="fa fa-arrow-left input-group-addon"></i>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
              </div>
            </div> */}
        </div>
        <br />
        <div className="login-box text-center">
          <input defaultValue="" type="hidden" id="returnurl" name="returnurl" />
          <h3>Enter OTP</h3><br />
        </div>
        <div id="divOuter">
          <div id="divInner">
            <input id="txtLoginOTP" type="password" maxLength={4} required="" />
          </div>
          <div id="resendOtpTimerNewdiv">
            <p id="resendRegisterOtpTimer" className="text-center" style={{ display: "none" }}>0:00</p>
          </div>
        </div>
        <br />
        <input id="hdnreturnUrl" name="ReturnURL"
          defaultValue="" type="hidden" />
        {/* <div id={"NotYetReceived"}> */}
        {/* <div className='text-center'>
            <button type="submit" id="btnRegisterWithOTP" className="btn btn-secondary my-4 ">Register Now</button>
          </div>
          <p align={"center"}>
            Not received / expired your OTP? &nbsp;
            <Link to={"dd;"}>
              <FontAwesomeIcon icon={faSyncAlt} />
              <span id="btnResendOTPNew">&nbsp;Resend OTP</span>
            </Link>
          </p> */}
        {/* </div> */}
        <div id="resendOtpTimerNewdiv">
          <p id="resendOtpTimerNew" className="text-center"></p>
        </div>
        <div className="login-box text-center">
          <button type="button" id="btnLoginWithOTP"
            className="btn btn-secondary mb-4 mt-4 ">Login Now</button>
        </div>
        <div className="login-box text-center">
          - <strong>OR</strong> -
          <br />
          <button type="button" id="btnLoginWithPassword"
            className="btn btn-secondary mb-4 mt-4 " >Login with Password</button>
        </div>
      </div>
    </div>
  );
}
export default LoginOTPA;