import React from 'react'
import { Modal, } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { resgesterresponse } from '../../containers/HomeScreen/actions'
export default function Registerpopup() {
  const dispatch = useDispatch()
  const cancelpopup = () => {
    dispatch(resgesterresponse(false))
  }
  return (
    <>
      <Modal show>
        <div className="login-form error-page text-center suces">
          <button type="button" className="close" data-dismiss="modal" onClick={cancelpopup}>×</button>
          <h4 className="thank-you-title pb-20">
            <i className="fa fa-check-circle fa-2x" style={{ color: 'green' }}></i>
            <br /> You are successfully registered.
            <br /><span> Thank you for your registration and Newsletter Subscription.</span>
          </h4>
          <p className="text-center">
            Please feel free to call our Sales Representatives at <br />
            <strong><a href="tel:+91-7058702045"><i className="fa fa-volume-control-phone"></i> +91-7058702045</a></strong>
            <br />
          </p>
          <hr className="spc" />
          <span className="spanthankyouspace ">&nbsp;&nbsp;</span><a href="/account/dashboard">
            <button type='button' className="btn-cart  btn-secondary btn-back-black mb-15" id="btnacnt">
              <i className="fa fa-user"> </i>&nbsp; Go to My Account</button></a>
          <a href="/">
            <button type='button' className="btn-cart  btn-secondary btn-back-green mb-15" id="btnacnt"><i className="fa fa-shopping-cart "> </i> &nbsp; Continue Shopping</button></a>
        </div>
      </Modal>
    </>
  )
}
