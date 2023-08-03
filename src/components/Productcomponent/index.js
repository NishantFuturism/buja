/**
 *
 * Productcomponent
 *
 */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
function Productcomponent() {
  return (
    <div>
      {/* <FormattedMessage {...messages.header} /> */}
      <div className="shop-product-wrap row grid">
        <input type="hidden" id="hdnMaxPriceForReset" value="1280" />
        <input type="hidden" id="hdnMinPriceForReset" value="5" />
        <div id="products" className="shop-product-wrap row grid" style={{ display: 'contents' }}>
          <input type="hidden" id="hdnLimit" value="40" />
          <div className="col-lg-3 col-md-4 col-sm-6 abc" onLoad="defaultval()" data-overallcount="147" data-maxprice="1280.0000" data-minprice="5.0000">
            <div className="product-item mb-30 pr-block" data-skuid="83773" data-skucode="Onion/Kanda/Pyaj" data-skuurl="onionkandapyaj">
              <div className="product-thumb">
                <Link to="/product/onionkandapyaj" className="ajaxload">
                  <img className="pri-img" src="https://productionadmin.adibuja.com/Media/Images/250x250//veg1.jpg" width="250" height="250" alt="Onion/Kanda/Pyaj" />
                </Link>
                <div className="box-label">
                  <div className="label-product label_sale">
                    <span id="discountpercent83773">10.0% off</span>
                  </div>
                  <div className="action-links"><Link onClick="AddToWishlist(this,83773,1)" style={{ zIndex: '999999' }} href title="Add to Wishlist"><i className="lnr lnr-heart"></i></Link><Link to onClick="AddToCompare(this,'Onion/Kanda/Pyaj')" title="Compare"><i className="lnr lnr-sync"></i></Link><Link to title="Quick view" className="quickmodalview" onClick="LoadProduct('onionkandapyaj')" data-url="onionkandapyaj" data-toggle="modal"> <i className="lnr lnr-magnifier"></i></Link></div><div className="action-links"><Link onClick="AddToWishlist(this,83773,1)" style={{ zIndex: '999999' }} href title="Add to Wishlist"><i className="lnr lnr-heart"></i></Link><Link to onClick="AddToCompare(this,'Onion/Kanda/Pyaj')" title="Compare"><i className="lnr lnr-sync"></i></Link><Link to title="Quick view" className="quickmodalview" onClick="LoadProduct('onionkandapyaj')" data-url="onionkandapyaj" data-toggle="modal"> <i className="lnr lnr-magnifier"></i></Link></div></div>
              </div>
              <div className="product-caption">
                <div className="product-thumb">
                  <div className="greenveg">
                    <i>Veg</i>
                  </div>
                </div>
                <div className="product-name">
                  <h4><Link to="/product/onionkandapyaj"> Onion/Kanda/Pyaj</Link></h4>
                </div>
                <div className="price-box">
                  <span className="regular-price"><span className="special-price" id="spprice83773">₹45.00</span></span>
                  <span className="old-price" id="oldprice83773"><del>₹50.00</del></span>
                </div>
                <input type="hidden" className="PriceId" value="20" />
                <div className="uom-box badge badge-light">
                  <span data-skudetailid="83773" data-discount="10.0" data-mrp="50.00" data-currencysymbol=" ₹" data-skufilterpriceid="20" data-isdiscountedsfp="True" value="45.00" data-capping="5" selected="">
                    1 kg
                  </span>
                </div>
                <div className="ratings">
                  <span id="savedrstextid83773" className="saved-rs-text">You Save:</span> <span className="saved-rs-text" id="savedrsid83773"> ₹ 5.00</span>
                </div>
                <br />
                <span className="qtyincdec addtocartqtyDivhidden addtocartqtyDiv20" style={{ display: 'none' }}>
                  <input type="text" className="addtocartqtytxt  addtocartqty83773 addtocartqty20" value="1" id="qty1" min="1" maxLength="5" onKeyPress="validateNumber(event);" onKeyUp="validateValue(20)" required="" />
                </span>
                <div className="product-qty fixlisting IncDecQtyDiv IncrementDecrementQtyDiv20" style={{ display: 'block' }}>
                  <input type="button" className="IncDecQty AddUpdateqty20" value="1" />
                  <span className="dec qtybtn btn btn-primary" data-productid="83773" >
                    <i className="fa fa-minus"></i>
                  </span>
                  <span className="inc qtybtn btn btn-primary" data-productid="83773" >
                    <i className="fa fa-plus"></i>
                  </span>
                </div>
                <button className="btn-cart incdecaddtocart AddToCart20" style={{ display: 'none' }} data-productid="83773" type="button" onClick="IncrementDecrementQuantityCart('Add',this)" href >Add to cart</button>
                <Link to title="Quick view" onClick="LoadProduct('onionkandapyaj')" data-url="onionkandapyaj" data-toggle="modal"><i className="lnr lnr-magnifier"></i></Link>
                <button className="btn-rfq" type="button" style={{ visibility: 'hidden' }}>RFQ</button>
              </div>
            </div>
          </div>
        </div>
        <div id="quick_views">
        </div>
      </div>
    </div>
  );
}
Productcomponent.propTypes = {};
export default memo(Productcomponent);
