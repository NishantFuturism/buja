import React from 'react';
import { Link } from 'react-router-dom';
function LoginPwdA() {
  return (
    <>
      <div id="divloginwithusername" >
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12">
            <div className=" text-center">
              <h3>&nbsp;Login To Your Account</h3>
            </div>
          </div>
        </div>
        <br />
        <form method="post" className="form-horizontal" id="frmLoginWithPassword"
          action="/login">
          <div className="form-group row align-items-center mb-4">
            {/* <label htmlFor="email" className="col-sm-3"></label> */}
            <div className="col-sm-6">
              <input className="form-control" placeholder="Mobile No. / Email"
                required="" type="text" id="UserName" name="UserName" defaultValue="" />
              {/* <span className="text text-danger validation-error field-validation-valid"
                data-valmsg-for="UserName" data-valmsg-replace="true"></span> */}
            </div>
          </div>
          <div className="form-group row align-items-center mb-3">
            {/* <label htmlFor="c-password" className="col-sm-3"></label> */}
            <div className="col-sm-6">
              <input type="password" className="form-control" placeholder="Password "
                onCopy="return false" onPaste="return false" id="Password"
                name="Password" />
              <span
                className="text text-danger validation-error field-validation-valid"
                data-valmsg-for="Password" data-valmsg-replace="true"></span>
              <input type="hidden" data-temp="" id="hdnErrorMsg" />
              <p>
                <Link to="/forgotpassword"
                >Forgot?</Link>
              </p>
            </div>
          </div>
          <div className="login-box text-center">
            <button type="submit" id="loginuser"
              className="btn btn-secondary mb-4 mt-4">Login Now</button><br />
            - <strong>OR</strong> -
            <input defaultValue="https://productionui.adibuja.com/" type="hidden"
              id="returnurl" name="returnurl" /><br />
            <button type="button" id="loginUserWithOTPNew"
              className="btn btn-secondary mb-4 mt-4" >Login with OTP</button>
          </div>
          <input name="__RequestVerificationToken" type="hidden"
            defaultValue="" />
        </form>
      </div>
    </>
  )
}
export default LoginPwdA;