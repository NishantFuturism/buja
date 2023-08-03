/**
 *
 * LoginwithPassword
 *
 */
import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets1/css/default.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
import history from '../../utils/history';
import Input from '../HomePage/Input';
function LoginwithOtp() {
  // const [send, setsend] = useState(true);
  // const onchangevalidate = (e) => {
  //   // eslint-disable-next-line no-param-reassign
  //   props.username = e.target.value
  //   if (e.target.value === '') {
  //     // eslint-disable-next-line no-param-reassign
  //     props.isError = true
  //     alert('not empty')
  //   }
  // }
  const handleclick = () => {
    history.push('/login/form')
  }
  return (
    <div>
      <div id="divloginwithotp" >
        <h3 align="center">
          Login Using OTP
        </h3>
        <br />
        <div className="form-group row align-items-center">
          <div style={{ width: '80%', display: 'block', position: 'relative', alignSelf: 'center' }}>
            <div className="input-group" style={{ alignSelf: 'center ' }}>
              {/* <input name="UserName" id="txtUserNameForOTP" 
                defaultValue="" className="form-control form-control-sm-50" 
               placeholder="Mobile No. / Email" autocomplete="off" required="" /> */}
              <Input
                // defaultValue=""
                className="form-control form-control-sm-50"
                placeholder="Mobile No. / Email"
                autoComplete='off'
                // required=""
                // eslint-disable-next-line react/prop-types
                // value={props.username}
                id="txtUserNameForOTP"
                // onChange={(e) => onchangevalidate(e)}
                style={{ alignSelf: 'center ', marginLeft: 150 }}
              />
              <input type="hidden" id="hdnIsUserCameFromRegisterAfterUserAlreadyExistsError" defaultValue="no" />
              <div className="input-group-append">
                <div className="btn-group">
                  <button type="button" id="btnChangeUserName" className="btn btn-default input-group-btn"
                    style={{ backgroundColor: '#e9ecef', border: '1px solid #ced4da', display: 'none' }}>Change</button>
                </div>
                <div className="btn-group">
                  <button type="button" id="btnChangeUserNameDone" className="btn btn-default input-group-btn" style={{ backgroundColor: '#e9ecef', border: '1px solid #ced4da', display: 'none' }}>Done</button>
                </div>
              </div>
            </div>
            <p>
              <Link to="dd;" id="sendloginUserWithOTP" style={{ color: 'gray', position: 'absolute', top: '7px', right: '26px', zIndex: '10px' }} >Send OTP</Link>
            </p>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text" id="backIcon" style={{ display: 'none', cursor: 'pointer' }}><i className="fa fa-arrow-left input-group-addon"></i></div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="login-box text-center">
          <input defaultValue="" type="hidden" id="returnurl" name="returnurl" />
          <h3 style={{ color: '#888888' }}>Enter OTP</h3><br />
        </div>
        <div id="divOuter">
          <div id="divInner">
            <Input
              type='password'
              maxLength={4}
              id="txtLoginOTP"
              // onKeyPress={}
              // onInput={validation}
              required=""
            />
            {/* <input id="txtLoginOTP" type="password" maxlength="4" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" onkeypress="if(this.value.length==4) return false;" /> */}
          </div>
        </div>
        <br />
        <input id="hdnreturnUrl" name="ReturnURL" defaultValue="" type="hidden" />
        <div id="NotYetReceived" style={{ display: 'none' }}>
          <p align="center">
            Not received / expired your OTP? &nbsp; <Link to="dd;" style={{ color: 'dodgerblue', display: 'block', textAlign: 'center' }}><i className="fa fa-refresh"></i><span id="btnResendOTPNew">&nbsp;Resend OTP</span></Link>
          </p>
        </div>
        <div id="resendOtpTimerNewdiv">
          <p id="resendOtpTimerNew" className="text-center"></p>
        </div>
        <div className="login-box text-center">
          <button type="button" id="btnLoginWithOTP" className="btn btn-secondary mb-4 mt-4">Login Now</button>
        </div>
        <div className="login-box text-center">
          - <strong>OR</strong> -
          <br />
          <button type="button" id="btnLoginWithPassword" className="btn btn-secondary mb-4 mt-4 " onClick={handleclick}>Login with Password</button>
        </div>
      </div>
    </div>
  );
}
export default LoginwithOtp
