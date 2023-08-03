import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './style.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import Header from '../Header';
import SubNavigation from '../SubNavigation';
import Footer from '.';
import { savecontactform } from '../../containers/FooterContact/action';
import reducer from '../../containers/FooterContact/reducer';
import saga from '../../containers/FooterContact/saga';
// import Success from "../ShowAlert/success";
// import Thankyou from '../../containers/FooterContact/thankyou';
function ContactForm() {
  useInjectReducer({ key: 'contactUs', reducer });
  useInjectSaga({ key: 'contactUs', saga });
  const dispatch = useDispatch();
  const history = useHistory()
  const [fname, setFname] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [emailvale, setemailvalue] = useState('');
  const [subjecttext, setSubjecttext] = useState('');
  const [message, setMessage] = useState('');
  const footerData = useSelector(state => state.homeScreen)
  const CData = useSelector(state => state.contactUs)
  console.log("CData..", CData)
  console.log('ss', footerData);
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const savecontactus = () => {
    const savecdata = {
      "Title": null,
      "FullName": fname,
      "CompanyName": null,
      "Email": emailvale,
      "ConfirmEmail": null,
      "Phone": phoneno,
      "Fax": null,
      "Website": null,
      "Address1": null,
      "Address2": null,
      "City": null,
      "State": null,
      "ZipCode": null,
      "Country": null,
      "Industry": null,
      "Department": null,
      "JobFunction": null,
      "ReferringSite": null,
      "Comments": message,
      "Subject": subjecttext
    }
    console.log("scontact..", savecdata)
    dispatch(savecontactform(savecdata))
    history.push({ pathname: '/thankyou' })
  }
  function onchangefirstname(e) {
    // setFname(e.target.value.replace("/[^a-zA-Z\d]/ig,"))
    if (e.target.value.match("^[a-zA-Z ]*$") != null) {
      setFname(e.target.value);
    }
  }
  function onchangemobileno(e) {
    if (e.target.value.match("[1-9]{0}[0-9]{0}") != null) {
      setPhoneno(e.target.value.slice(0, 10));
    }
  }
  const onchangevalidateemail = (e) => {
    console.log("eevaluee1", e.target.value)
    setemailvalue(e.target.value)
  }
  function onchangevalidatesubmittext(e) {
    // setFname(e.target.value.replace("/[^a-zA-Z\d]/ig,"))
    if (e.target.value.match("^[a-zA-Z ]*$") != null) {
      setSubjecttext(e.target.value);
    }
  }
  function onchangevalidatemessage(e) {
    // setFname(e.target.value.replace("/[^a-zA-Z\d]/ig,"))
    if (e.target.value.match("^[a-zA-Z ]*$") != null) {
      setMessage(e.target.value);
    }
  }
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <Header />
      {/* {CData && CData.savecpopup && <Thankyou />} */}
      {/* <Thankyou /> */}
      <SubNavigation />
      <div className="breadcrumb-area mb-30">
        <div className="container-fluid">
          <div className="row">
            <div className="breadcrumb-wrap" style={{ paddingLeft: '15px' }}>
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="../">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <section className="contact-style-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="contact2-title text-center">
                <h2>contact us</h2>
                <p>Need answers to your queries? We would love to answer your questions.<br />Our support team is available for you 24x7. Fill in the below form and our team will contact you at the earliest.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <p>&nbsp;</p><p>&nbsp;</p>
      <div className="contact-two-area pt-60">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="contact-message">
                <form
                  id="contact_form"
                // action="/home/submit-contact-us"
                // method="post"
                // className="contact-form"
                // encType="multipart/form-data"
                // autoComplete="off"
                // onSubmit="if (!window.__cfRLUnblockHandlers) return false; validateform()"
                // noValidate="novalidate"
                >
                  {/* <input
                    name="__RequestVerificationToken"
                    type="hidden"
                    defaultValue="CfDJ8C9yVyDbKTZKlOTH9TTPqP3JMPFDAaLSzCp8OQzsFdfmOawXLOvY5aqFjB3Xdkvh7OLfnh2Qlpjys-uxctlvcC-lS36QY2WYzOrqRuUIVKhAmTtM3pGJkh1JCZ-6rkCtV2ZcyOvS5l8rvKEw9SQgrHQ"
                  />
                  <input
                    type="hidden"
                    id="g-recaptcha-response"
                    name="g-recaptcha-response"
                    defaultValue="03AEkXODClVl9DHYWhGQJnplw18kDS75C1BRkt1t2LakLsu39zzai_d72i3zM5BZqF8m91XNrl9XXqeYSu-uJD_Uwj6ctEivLYkq2qquttYa1Ld33VRiFkKkCgdApXac7RwLNXpq0gWZFwNAKH5vCQ-7nnsoqLnE49bHjIK_z4LVo1QKzFb6FGrjyleAqOM8e5GcC46K-wOPY2zSbey2TFsC3eYcIKk4DwfugGrSX-khgYyyPVZl1lI7T4fz6bf5_FFn3GO4mLdHgVO9Aw18aisoEQCdxnGIyrWbmbC7pAHBM-ipAnJQykwxgX89xxqLdHNoZA1TNkjDZSYqkt21F-QoG5Anuszu2YUNyC5tuOX01s62IXb7Jw9MSEY1jnyatqqpCkTukBVXlAOIqpTiVDBXtJWEQCkSpLvsqtDU-GIiHna9Qltk-XNdxCAmeBlE-iUtvg07zBDGl6uXLuSftg_MUIWcJaiFgmcbHilyZwXxaszaF1Z9CruYeP_8qHFK1NMJD4Wd4r6iC4VT04ksevRGVhnkGcd0erPA"
                  /> */}
                  <input type="hidden" defaultValue="" />
                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-3">
                      <input
                        className="form-control"
                        placeholder="Name *"
                        type="text"
                        style={{ marginBottom: 5, marginTop: 10 }}
                        id="FullName"
                        name="FullName"
                        value={fname}
                        {...register('firstName', { required: true })}
                        onChange={(e) => onchangefirstname(e)}
                      />
                      {errors.firstName &&
                        <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                          Please enter name.
                        </span>
                      }
                      {/* <span
                        className="field-validation-valid text text-danger validation-error"
                        data-valmsg-for="FullName"
                        data-valmsg-replace="true"
                      /> */}
                    </div>
                    <div className="col-sm-3">
                      <input
                        className="form-control"
                        placeholder="Phone *"
                        type="text"
                        style={{ marginBottom: 5, marginTop: 10 }}
                        id="Phone"
                        name="Phone"
                        maxLength={10}
                        Value={phoneno}
                        {...register('phoneno', { required: true })}
                        onChange={(e) => onchangemobileno(e)}
                      />
                      {errors.phoneno &&
                        <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                          Please enter phone number.
                        </span>
                      }
                      {/* <span
                        className="field-validation-valid text text-danger validation-error"
                        data-valmsg-for="Phone"
                        data-valmsg-replace="true"
                      /> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-3">
                      <input
                        className="form-control"
                        placeholder="Email *"
                        type="text"
                        style={{ marginBottom: 5, marginTop: 10 }}
                        id="Email"
                        name="Email"
                        value={emailvale}
                        {...register('email', { required: true })}
                        onChange={(e) => onchangevalidateemail(e)}
                      />
                      {errors && errors.email &&
                        <span className="text text-danger field-validation-valid"
                          style={{ textalign: 'left' }} >
                          Please enter email.
                        </span>
                      }
                    </div>
                    <div className="col-sm-3">
                      <input
                        className="form-control"
                        placeholder="Subject *"
                        type="text"
                        style={{ marginBottom: 5, marginTop: 10 }}
                        id="Subject"
                        name="Subject"
                        value={subjecttext}
                        {...register('subject', { required: true })}
                        onChange={(e) => onchangevalidatesubmittext(e)}
                      />
                      {errors.subject &&
                        <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                          Please enter subject.
                        </span>
                      }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                      <div className="contact2-textarea text-center">
                        <textarea
                          placeholder="Message *"
                          className="form-control2"
                          required=""
                          style={{ marginBottom: 5, marginTop: 15 }}
                          id="Comments"
                          name="Comments"
                          value={message}
                          {...register('comment', { required: true })}
                          onChange={(e) => onchangevalidatemessage(e)}
                        />
                        {errors.comment &&
                          <span className="text text-danger field-validation-valid" style={{ textalign: 'left' }} >
                            Please enter message.
                          </span>
                        }
                      </div>
                      <div className="col-md-12 col-sm-12 captcha-wrap"></div>
                      <div className="contact-btn text-center">
                        <button
                          className="btn btn-secondary"
                          type="submit"
                          id="save"
                          style={{ marginBottom: 5, marginTop: 15 }}
                          onClick={handleSubmit(savecontactus)}
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-center"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default ContactForm;