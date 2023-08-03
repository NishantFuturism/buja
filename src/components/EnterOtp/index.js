/**
 *
 * EnterOtp
 *
 */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets1/css/default.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
import Input from '../../containers/HomePage/Input';
function EnterOtp() {
  return (
    <div>
      <div className="login-box text-center" id="divOTPsection" >
        <input defaultValue="" type="hidden" id="returnurl" name="returnurl" />
        <h3 style={{ color: '#888888' }}>Enter OTP</h3><br />
        <div id="divOuter">
          <div id="divInner">
            {/* <input id="txtRegisterOTP" name="OTP" type="password" maxLength="4"
              onInput="if (!window.__cfRLUnblockHandlers) return false; this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              onKeyPress="if (!window.__cfRLUnblockHandlers) return false; if(this.value.length==4) return false;"
              required="" /> */}
            <Input type='password' maxLength={4} id="txtRegisterOTP" required="" />
          </div>
          <div id="resendOtpTimerNewdiv">
            <p id="resendRegisterOtpTimer" className="text-center"></p>
          </div>
        </div>
        {/* <button type="submit" id="btnRegisterWithOTP" className="btn btn-secondary mb-4 mt-4">Register
          Now</button> */}
        <p align="center" id="divResendRegisterOTP" >
          Not received your OTP? &nbsp; <Link to id="btnResendRegisterOTP"
            style={{ color: 'dodgerblue' }} disabled="disabled"><i
              className="fa fa-refresh"></i> Resend OTP</Link>
        </p>
        <br />
      </div>
    </div>
  );
}
EnterOtp.propTypes = {};
export default memo(EnterOtp);
