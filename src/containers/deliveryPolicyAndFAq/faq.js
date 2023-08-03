import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomsAPI from "../MainPage/api/homeServices";
import Header from '../../components/Header'
// import history from '../../utils/history';
import SubNavigation from '../../components/SubNavigation';
import Footer from '../../components/Footer';
import './faq.css'
// import './advertise.css'
const HelpAndFAQ = () => {
  const [faqdata, setfaqdata] = useState([])
  const [Anwser, setAnwser] = useState('')
  const [ID, setID] = useState('')
  const footerData = useSelector(state => state.homeScreen)
  console.log('ss', footerData);
  useEffect(() => {
    CustomsAPI.getFAQ()
      .then(response => {
        console.log("faq response", response);
        setfaqdata(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [])
  function handleAnswer(id, anwser) {
    //  console.log("FAQId",id,anwser)
    setAnwser(anwser)
    setID(id)
  }
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <Header />
      <SubNavigation />
      <div className="breadcrumb-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-wrap">
                <nav aria-label="breadcrumb">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">FAQ</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-wrapper mt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="faq-main-wrapper">
                <div className="section-title hm-12">
                  {" "}
                  <h3>Answers to Frequently Asked Questions </h3>{" "}
                </div>
                <div className="cart-accordion-wrapper mt-full mt-3">
                  <div id="cart_accordion" className="pt-3" role="tablist">
                    {faqdata && faqdata.map((item) => (
                      <div className="card">
                        <div className="card-header" role="tab">
                          <h4 className="mb-0">
                            {/* <a
       data-toggle="collapse"
       href="#faq2"
       aria-expanded="false"
       aria-controls="faq2"
       className="collapsed"
     >
       {" "}
     Are the products going to be fresh because of the
     perishable nature of the items ?
     </a> */}
                            <a href style={{ color: '#007bff' }} onClick={() => handleAnswer(item.FAQId, item.Answer)}>{item.Question}</a>
                          </h4>
                        </div>
                        {ID === item.FAQId ?
                          <>
                            {Anwser !== '' && <div dangerouslySetInnerHTML={{ __html: Anwser }} />}
                          </>
                          : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default HelpAndFAQ