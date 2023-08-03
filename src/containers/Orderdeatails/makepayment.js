/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SubNavigation from '../../components/SubNavigation';
import CheckoutAPI from '../MainPage/api/checkout';
import OrderdetailAPI from '../MainPage/api/orderdetail';
import 'react-toastify/dist/ReactToastify.css';
export function Makepayment(props) {
  const [addressdata, setaddressdata] = useState('')
  const [OrderItemDetails, setOrderItemDetails] = useState([])
  useEffect(() => {
    if (props !== undefined) {
      // setordernumber(props.location.state.OrderNumber)
      OrderdetailAPI.getmyorder(props.location.state.OrderNumber)
        .then(response => {
          setOrderItemDetails(response)
          CheckoutAPI.getcustomeraddress({})
            .then(res => {
              const data = res.filter(id => id.CustomerAddressId === response[0].BillingAddressId)
              setaddressdata(data)
            })
        })
        .catch(error => {
          console.log('error:::', error);
        });
    }
  }, [props])
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <Header />
      <SubNavigation />
      {/* <Orderdeatails /> */}
      <div>
        <div className="shopping-cart-wrapper order-details pb-70">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <main id="primary" className="site-main">
                  <div className="shopping-cart">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="cart-accordion-wrapper mt-full mt-40">
                          <div id="cart_accordion" className="mt-4" role="tablist">
                            <div className="card" style={{ marginBottom: '0px', borderBottom: '0px' }}>
                              <div className="card-header" role="tab" id="headingTax">
                                <h4 className="mb-0">
                                  <Link data-toggle="collapse" to="#OrderDetails" aria-expanded="true" aria-controls="OrderDetails" className="OrderDetails active">Order Details<i className="ion ion-ios-arrow-down"></i></Link>
                                </h4>
                              </div>
                              <div className="card-header" role="tab" id="headingTax">
                                <h4 className="mb-0">
                                  <Link data-toggle="collapse" to="#OrderDetails" aria-expanded="true" aria-controls="OrderDetails" className="OrderDetails active">Order Details<i className="ion ion-ios-arrow-down"></i></Link>
                                </h4>
                              </div>
                              <div id="OrderDetails" className="collapse show" role="tabpanel" aria-labelledby="headingTax" data-parent="#cart_accordion">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-lg-3">
                                      <div className="product-item">
                                        <div className="product-item">
                                          {(OrderItemDetails || []).map(data =>
                                            <div className="product-caption">
                                              <ul>
                                                <li><strong>Order Number:</strong>{data.OrderNumber}</li>
                                                <li>
                                                  <strong>Status:</strong>
                                                  <span>{data.Status} </span>                                                                        </li>
                                                <li><strong>Order Date:</strong> {data.CreatedOn}</li>
                                                <li><strong>Sub Total:</strong>  ₹ {data.OrderNumber}  </li>
                                                <li>
                                                  <strong>Delivery Charge:</strong> ₹ {data.DeliveryChargeAmount}
                                                </li>
                                                <li>
                                                  <strong>Delivery Date and Slot:</strong>
                                                </li>
                                                <li>
                                                  <span className="thank-you-title pb-20"><span>{data.DeliveryDate}</span> </span>
                                                </li>
                                                <li>
                                                  <span className="thank-you-title pb-20"><span>{data.DeliveryDate}</span> </span>
                                                </li>
                                                <li><strong>Total:</strong>  ₹{data.OrderAmount.toFixed(2)}(Inc. of all taxes)</li>
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    {(addressdata || []).map(data =>
                                      <div className="col-lg-3">
                                        <div className="product-item">
                                          <div className="product-caption">
                                            <div className="product-name customer_address" data-id="32830" data-type="Shipping">
                                              <h3> Billing &amp; Delivery Address</h3>
                                              {data.FirstName} {data.LastName}
                                              <br />
                                              {data.Address1} {data.Address2} {data.AddressName} {data.State} {data.Country}
                                              {data.AddressName}
                                              {data.State},
                                              {data.Country},
                                              {data.ZipCode}
                                              <br />
                                              <span>Mobile: {data.Mobile}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    {(OrderItemDetails || []).map(data =>
                                      <div className="col-lg-3">
                                        <div className="product-item">
                                          <div className="product-caption">
                                            <div className="product-name">
                                              <input type="hidden" id="hdnPaymentMethodName" value="COD" />
                                              <input type="hidden" id="hdnWalletAmtUsed" value="0.00" />
                                              <input type="hidden" id="hdnPaymentTypes" value="COD" />
                                              <input type="hidden" id="hdnPaymentAmount" value="52.50" />
                                              <ul>
                                                <li>
                                                  <h3>Payment Information</h3>
                                                </li>
                                                <li> <strong>Payment Method:</strong>{data.PaymentMethodName}</li>
                                                <li>
                                                  <strong>Payment Amount: </strong>₹{data.PaymentAmount}
                                                  <div className="d-lg-none"></div>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    <div className="col-lg-3">
                                      <ul>
                                        <li> <button type="button" id="trackerorder" data-target="#Mymodal" data-toggle="modal" className="btn btn-info widthbutton">Track Package</button></li>&nbsp;
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card" style={{ marginBottom: '0px', borderTop: '0px' }}>
                              <div className="OrderItemListHeader" style={{ marginLeft: '0px' }}>
                                <div className="table-responsive">
                                  <table className="table" style={{ marginBottom: '0px' }}>
                                    <tbody>
                                      <tr></tr>
                                      <tr>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div id="collapseProduct" role="tabpanel" aria-labelledby="headingTax" data-parent="#cart_accordion">
                                <div className="table-responsive">
                                  <table id="tblOrderDetail" className="table">
                                    <thead>
                                      <tr style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                        <td>Product Image</td>
                                        <td className="textalignleft">Product Name</td>
                                        <td>Pack Size</td>
                                        <td>Status</td>
                                        <td className="textalignright">Unit Price (₹)</td>
                                        <td>Quantity</td>
                                        <td>Qty Cancelled</td>
                                        <td>Qty Returned</td>
                                        <td className="textalignright">Total (₹)</td>
                                        <td></td>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {(OrderItemDetails || []).map(data =>
                                        data.OrderItemDetails.map(dataitem =>
                                          <tr>
                                            <td>
                                              <input type="hidden" id="PaymentReferenceNumber" />
                                              <Link to="/product/cucumber-greenkheera-harakakdi-hari/" target="_blank">
                                                <img src={dataitem.ListingImage} data-src="https://productionadmin.adibuja.com/Media/Images/150X150//2LgjciNiDq_Mango - Badami1.png" data-width="150" data-height="150" width="150" height="150" className="img-responsive js-lazy-img" alt="Cucumber Green/Kheera Hara/Kakdi Hari" title="" />
                                              </Link>
                                            </td>
                                            <td className="textalignleft">
                                              {dataitem.DisplayName}
                                            </td>
                                            <td><span style={{ display: 'none' }} className="moblbldsp">Pack Size : </span>{dataitem.ListItem}</td>
                                            <td>
                                              <span style={{ display: 'none' }} className="moblbldsp">Order Status : </span>{dataitem.OrderItemStatus}
                                            </td>
                                            <td className="textalignright">
                                              <span style={{ display: 'none' }} className="moblbldsp">Unit Price : </span>₹{dataitem.UnitPrice}
                                            </td>
                                            <td>
                                              <span style={{ display: 'none' }} className="moblbldsp">Qty : </span>{dataitem.Quantity}
                                            </td>
                                            <td>
                                              <span style={{ display: 'none' }} className="moblbldsp">Qty Cancelled : </span>{dataitem.qtyCancelled}
                                            </td>
                                            <td>
                                              <span style={{ display: 'none' }} className="moblbldsp">Qty Returned : </span>{dataitem.qtyReturned}
                                            </td>
                                            <td>
                                              <span style={{ display: 'none' }} className="moblbldsp">Total Price : </span>₹{dataitem.UnitPrice}
                                            </td>
                                            <td></td>
                                          </tr>
                                        )
                                      )}
                                      <tr style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                        <td className="tdhide" colSpan="8"></td>
                                        <td colSpan="1" style={{ fontWeight: '600', color: '#111', }} className="textalignleft">
                                          Sub Total
                                        </td>
                                        <td colSpan="1" className="textalignright">
                                          ₹{OrderItemDetails.map(data => data.PaymentAmount)}
                                        </td>
                                        <td className="tdhide" colSpan="1"></td>
                                      </tr>
                                      <tr style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                        <td className="tdhide" colSpan="8"></td>
                                        <td colSpan="1" style={{ fontWeight: '600', color: '#111', }} className="textalignleft">
                                          Delivery Charge
                                        </td>
                                        <td colSpan="1" className="textalignright">
                                          ₹{OrderItemDetails.map(data => data.DeliveryChargeAmount)}
                                        </td>
                                        <td className="tdhide" colSpan="1"></td>
                                      </tr>
                                      <tr style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                        <td className="tdhide" colSpan="8"></td>
                                        <td colSpan="1" style={{ fontWeight: '600', color: '#111', }} className="textalignleft">
                                          Coupon Amount
                                        </td>
                                        <td colSpan="1" className="textalignright">
                                          (-) ₹{OrderItemDetails.map(data => data.CouponValue)}
                                        </td>
                                        <td className="tdhide" colSpan="1"></td>
                                      </tr>
                                      <tr style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                        <td className="tdhide" colSpan="8"></td>
                                        <td colSpan="1" style={{ fontWeight: '600', color: '#111', }} className="textalignleft">
                                          Total
                                        </td>
                                        <td colSpan="1" className="textalignright">
                                          ₹{OrderItemDetails.map(data => data.TotalOrderAmount)}
                                        </td>
                                        <td className="tdhide" colSpan="1"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div>
                                <div className="col-sm-12">
                                  <form id="frm-payment" autoComplete="off1" method="post" action="/   make-order-payment" noValidate="novalidate">
                                    <input data-val="true" data-val-required="The CustGUID field is required." id="CustGUID" name="CustGUID" type="hidden" value="6b46c391-10cd-4f7c-8a8f-a195aba85a9a" />
                                    <input id="orderNumber" name="OrderNumber" type="hidden" value="OC7975" />
                                    <input name="__RequestVerificationToken" type="hidden" value="CfDJ8BKZbGJ-melNpo-23e5hjK1pVc2ZQ9iD-l5qKaTzClDLpIB50SqEWqg6GVYDwDN5bTf-8UF-1-t_x94iryw8r4LroMLQRCHJ4cm4nA6TTHlOVGnmi8xqIVR04Sk7DB1ZBH2rMvhVqe0SfNazh91_osjk4iSKAGvPjz7bxtX3Kj54UIN3blioFpdwunfRVQjzDA" />
                                    <div className="row">
                                      <div className="col-sm-6">
                                        <input type="hidden" name="paymentmode" id="paymentmode" value="1" />
                                        <div className="theme_panel" style={{ margin: '30px 0 0' }}>
                                          <h3 className="sub_heading theme_color">Payment Method</h3>
                                          <div className="card_payment_type">
                                            <input type="hidden" name="BillingAddressId" id="BillingAddressId" />
                                            <input type="hidden" name="ShippingAddressId" id="ShippingAddressId" />
                                            <p className="credit-cart-type">
                                              <label className="custom_checkbox_design">
                                                <input type="radio" name="cardtype" onClick="cardnumberverify()" value="mastercard" checked="" />
                                                <img src="/images/mastercard.png" alt="master card" />
                                                <span className="checkmark"></span>
                                              </label>
                                              <label className="custom_checkbox_design">
                                                <input type="radio" name="cardtype" onClick="cardnumberverify()" value="visa" />
                                                <img src="/images/visa.png" alt="visa" />
                                                <span className="checkmark"></span>
                                              </label>
                                              <label className="custom_checkbox_design">
                                                <input type="radio" name="cardtype" onClick="cardnumberverify()" value="discover" />
                                                <img src="/images/discover.png" alt="discover" />
                                                <span className="checkmark"></span>
                                              </label>
                                              <label className="custom_checkbox_design">
                                                <input type="radio" name="cardtype" onClick="cardnumberverify()" value="amex" />
                                                <img src="/images/amex.png" alt="amex" />
                                                <span className="checkmark"></span>
                                              </label>
                                            </p>
                                            <div className="card_information">
                                              <div className="form-group">
                                                <label className="text-black">Card No</label>
                                                <input type="text" id="cdnum" tabIndex="1" maxLength="19" name="number" className="form-control" placeholder="xxxx xxxx xxxx xxxx" />
                                                <label id="cdnumber" className="text-danger"></label>
                                              </div>
                                              <div className="half_divide">
                                                <div className="form-group">
                                                  <label className="text-black">Security Code</label>
                                                  <input type="password" className="form-control" placeholder="xxx" maxLength="4" autoComplete="new-password" name="code" />
                                                </div>
                                                <div className="form-group">
                                                  <label className="text-black">Expiry Date</label>
                                                  <input type="text" className="form-control" placeholder="mm/yy" name="expiry" id="expiry" pattern="[0-9]{2}/[0-9]{2}" maxLength="5" />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="form-actions col-sm-12">
                                                <button type="button" id="btnReset" onClick="window.location.reload();" className="btn btn-warning"><i className="fa fa-undo"></i> Reset</button>
                                                <button type="submit" id="btnSubmit" className="btn btn-success"><i className="fa fa-save"></i> Make Payment</button>
                                              </div>
                                            </div>
                                            <br />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                  <div id="thankYouForOrder">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cart-button-wrapper d-flex justify-content-between mt-4" style={{ paddingBottom: '20px' }}> <Link to="/account/myorders" className="btn btn-secondary order-btn">← Back to My Order </Link> <Link to="/" className="btn btn-secondary order-btn"> Go to Shop </Link> </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Makepayment