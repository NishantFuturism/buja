/**
 *
 * Newsletter
 *
 */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import Constants from '../App/constants';
import { ConstantsValues } from '../MainPage/api/homeServices';
import { validationmpopup } from './actions';
import reducer from './reducer';
import saga from './saga';
export function Newsletter() {
  useInjectReducer({ key: 'newsletter', reducer });
  useInjectSaga({ key: 'newsletter', saga });
  // const [enablepopup, setenablepopup] = useState(false);
  // const [msg, setmsg] = useState('');
  const [Email, setEmail] = useState('');
  const dispatch = useDispatch()
  const newsletterReducer = useSelector(state => state.newsletter)
  console.log("newsletterReducer", newsletterReducer)
  const emailsubscribe = () => {
    const email = document.getElementById('mc-email').value
    setEmail(email)
    const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/);
    const token = localStorage.getItem('generatedtoken');
    // dispatch(subscribeemail())
    if (!emailphone.test(email)) {
      // dispatch(validationmpopup(true))
      alert('Please enter valid email')
    } else {
      fetch(`${Constants.urls.baseUrl}${Constants.endPoints.newslettersubscription}clientId=${ConstantsValues.ClientId}&emailid=${email}`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(response => {
          // setmsg(response)
          if (response === 1) {
            alert('Subscribe Successfully')
            setEmail('')
          } else {
            setEmail('')
            alert('Email already subscribed')
          }
          // setenablepopup(true)
        });
    }
  }
  const Popup = () =>
    <div id="messagebox" className="modal fade show" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body" style={{ textAlign: 'center' }}>
            <p id="displaymsg" style={{ color: 'rgb(240, 173, 78)' }}>Please enter valid email</p><br />
            <button id="okbtn"
              onClick={() => dispatch(validationmpopup(false))}
              type="button" className="btn btn-default" data-dismiss="modal">OK</button>
          </div>
        </div>
      </div>
    </div>
  // const Successfulalert = () =>
  //   <div id="messagebox" className="modal fade show" role="dialog" style={{ display: 'block' }}>
  //     <div className="modal-dialog">
  //       <div className="modal-content">
  //         <div className="modal-body" style={{ textAlign: 'center' }}>
  //           <p id="displaymsg"><i className="fa fa-spinner fa-spin"></i>{msg}</p><br />
  //           <button id="okbtn" type="button" className="btn btn-default" data-dismiss="modal" style={{ display: 'block' }}>OK</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  const onchangeEmail = () => {
    const email = document.getElementById('mc-email').value
    setEmail(email)
    // const emailphone = new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/);
    // const { value } = document.getElementById('mc-email').value
  }
  return (
    <div>
      {newsletterReducer && newsletterReducer.emalipopup && <Popup />}
      {/* {enablepopup && <Successfulalert />} */}
      {/* <ToastContainer /> */}
      <div className="newsletter-group">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="newsletter-box">
                <div className="newsletter-inner">
                  <div className="newsletter-title">
                    <h3>Sign Up For Newsletters</h3>
                    <p>Be the First to Know. Sign up for newsletter today</p>
                  </div>
                  <div className="newsletter-box">
                    <form id="mc-form">
                      <input
                        type="hidden"
                        id="g-recaptcha-response"
                        name="g-recaptcha-response"
                        defaultValue=""
                      />
                      <input
                        type="hidden"
                        name="action"
                        defaultValue=""
                      />
                      <input type="email"
                        id="mc-email"
                        autoComplete="off"
                        className="email-box"
                        placeholder="Enter your email"
                        name="EMAIL"
                        value={Email}
                        onChange={onchangeEmail}
                      />
                      {/* <input
                        type="email"
                        id="mc-email"
                        autoComplete="off"
                        className="email-box"
                        placeholder="Enter your email"
                        name="EMAIL"
                       value={Email}
                      /> */}
                      <button
                        onClick={emailsubscribe}
                        className="newsletter-btn"
                        type="button"
                        id="mc-submit"
                      >
                        subscribe!
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mailchimp-alerts">
                <div className="mailchimp-submitting" />
                <div className="mailchimp-success" />
                <div className="mailchimp-error" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default (Newsletter);
