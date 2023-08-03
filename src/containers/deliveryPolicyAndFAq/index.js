import React from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import 'react-toastify/dist/ReactToastify.css';
export function DeliveryPolicy() {
  // const [UOtp, setUOtp]=useState('');
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <Header />
      <div className="web_page">
        <div className="breadcrumb-area mb-30">
          <div className="container-fluid">
            <div className="row">
              <div className="breadcrumb-wrap" style={{ paddingLeft: " 15px;" }}>
                <nav aria-label="breadcrumb">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="../">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Delivery Policy</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <p ><strong><u>Delivery Policy</u></strong></p>
              <p>&nbsp;</p>
              <p>We want to deliver your products on time every time as early as possible but operationally it is not viable to deliver each order individually so based on the ordering trend and feasibility we have categorized delivery into:</p>
              <strong>Express delivery:</strong> is when you require your delivery on priority and one of our delivery vans would just deliver your basket.<br /><br /><strong>Slotted delivery:</strong> is when you have scheduled your delivery time as per the slots available <br /><br />
              <table style={{ width: "70%", cellspacing: "0", cellpadding: "5", border: "1" }}>
                <tbody>
                  <tr style={{ backgroundColor: "#f2f2f2" }}>
                    <td style={{ textAlign: "center", width: '9.9904%' }}>
                      <p><strong>City</strong></p>
                    </td>
                    <td style={{ textAlign: "center", width: "24.976%" }}>
                      <p><strong>Order type</strong></p>
                    </td>
                    <td style={{ textAlign: "center", width: "16.7147%" }}>
                      <p><strong>Order value</strong></p>
                    </td>
                    <td style={{ textAlign: "center", width: "18.2517%" }} >
                      <p><strong>Delivery Charge</strong></p>
                    </td>
                    <td style={{ textAlign: "center", width: "30.1633%" }}>
                      <p><strong><span>Express </span>Delivery Charge(If Selected)</strong></p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", width: "9.9904%;", rowspan: "2" }}>
                      <p>&nbsp; Pune</p>
                    </td>
                    <td style={{ textAlign: "center", width: "24.976%", rowspan: "2" }}>
                      <p>All (Express, Slotted Delivery)</p>
                    </td>
                    <td style={{ textAlign: "center", width: " 16.7147%;" }}>
                      <p>&lt; Rs. 501</p>
                    </td>
                    <td style={{ textAlign: "center", width: " 18.2517%;" }}>
                      <p>Rs 40/-</p>
                    </td>
                    <td style={{ textAlign: "center", width: "30.1633%", rowspan: "2" }}>
                      <p>Rs 50/-</p>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", width: "16.7147%" }}>
                      <p>Rs 501 and Above</p>
                    </td>
                    <td style={{ textAlign: "center", width: "18.2517%" }}>
                      <p>Free</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br /><br />
              <table id="slotted" style={{ width: " 300px;", cellspacing: "0", cellpadding: "5", border: "1" }}>
                <tbody>
                  <tr>
                    <td colSpan="2" style={{ width: " 7.89473%", height: "32px", backgroundColor: "#ecf0f1", textAlign: "center" }}><strong>Slotted</strong></td>
                  </tr>
                  <tr>
                    <td><span>&nbsp; Morning</span></td>
                    <td>&nbsp;7 AM - 10 AM</td>
                  </tr>
                  <tr>
                    <td>&nbsp; Afternoon</td>
                    <td>&nbsp;2 PM - 5 PM</td>
                  </tr>
                  <tr>
                    <td>&nbsp; Evening</td>
                    <td>&nbsp;7 PM - 10 PM</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <p><u>You missed your delivery</u>: Delivery van will only attempt to deliver your basket once as per your pre-selected delivery date and time, if in case you for any reason you missed your arrival slot and want to get that delivered again you need to get in touch with our customer care contact number <a href="tel:+917058702045">+91-7058702045</a>&nbsp;and ask for the best available delivery date and time available.</p>
              <p>Note: You will be charged again same price as per your order delivery charges</p>
              <p>&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default DeliveryPolicy
