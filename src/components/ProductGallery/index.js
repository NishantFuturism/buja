/**
 *
 * ProductGallery
 *
 */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
function ProductGallery() {
  function AddToWishlist() { }
  function AddToCompare() { }
  function IncrementDecrementQuantityCart() { }
  function LoadProduct() { }
  return (
    <>
      <div key='as' className="tab-content">
        <div className="tab-pane fade show active" id="brand-one" style={{ display: 'block' }} >
          <div className="product-gallary-wrapper">
            <div className="product-gallary-active owl-carousel owl-arrow-style sale-nav owl-theme owl-loaded">
              <div className="owl-stage-outer">
                <div className="owl-stage" style={{ transform: ' translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '2780px' }} >
                  <div className="owl-item active" style={{ width: '248px', marginRight: '30px' }} >
                    <div className="product-item pr-block" style={{ display: 'block' }} >
                      <div className="product-thumb">
                        <Link to="/product/coffee-bean" className="ajaxload">
                          <img referrerPolicy='no-referrer' className="pri-img" src="" width="250" height="250" alt="Exautic beans" />
                        </Link>
                        <div className="box-label">
                          <div className="label-product label_sale">
                            <span id="discountpercent84562" style={{ display: 'none' }}>0.0% off</span>
                          </div>
                          <div className="action-links">
                            <Link onClick={AddToWishlist(this, 84562, 1)} href title="Add to Wishlist">
                              <i className="lnr lnr-heart"></i>
                            </Link>
                            <Link to onClick={AddToCompare(this, 'TST0CB1')} title="Compare">
                              <i className="lnr lnr-sync"></i>
                            </Link>
                            <Link to title="Quick view" className="LoadProduct('coffee-bean') quickmodalview" data-url="coffee-bean" data-toggle="modal">
                              <i className="lnr lnr-magnifier"></i>
                            </Link>
                          </div>
                          <div className="action-links">
                            <Link onClick={AddToWishlist(this, 84562, 1)} href title="Add to Wishlist">
                              <i className="lnr lnr-heart">
                              </i></Link><Link to onClick={AddToCompare(this, 'TST0CB1')} title="Compare">
                              <i className="lnr lnr-sync"></i></Link>
                            <Link to title="Quick view" className="quickmodalview" onClick={LoadProduct('coffee-bean')} data-url="coffee-bean" data-toggle="modal">
                              <i className="lnr lnr-magnifier"></i></Link>
                          </div>
                        </div>
                      </div>
                      <div className="product-caption  product-caption-viewall">
                        <div className="product-thumb">
                          <div className="greenveg">
                            <i>Veg</i>
                          </div>
                        </div>
                        <div className="product-name">
                          <h4 ><Link to="/product/coffee-bean" style={{ display: 'block' }}>hsjhjh</Link></h4>
                        </div>
                        <div className="price-box">
                          <span className="regular-price"><span className="special-price" id="spprice84562">₹67.00</span></span>
                          <span className="old-price" id="oldprice84562" style={{ display: 'none' }} ><del>₹67.00</del></span>
                        </div>
                        {/* ) )} */}
                        <input type="hidden" className="PriceId" defaultValue="" style={{ display: 'none' }} />
                        <div className="uom-box">
                          {/*                              
                                <select onChange={(event) => changeFltr(event.target.value, data.SkuId )} value={Seleced}>
                                {data.FiltersList.map(itm => 
                                  <option value={itm.ListItem}>{itm.ListItem}</option>
                                  )}
                                </select> */}
                        </div>
                        <div className="ratings">
                          <span id="savedrstextid84562" className="saved-rs-text">You Save:</span> <span className="saved-rs-text" id="savedrsid84562" > ₹ 0.00</span>
                        </div>
                        <br />
                        <span className="qtyincdec addtocartqtyDivhidden addtocartqtyDiv2706" >
                          <input type="text" className="validateQty addtocartqtytxt addtocartqty84562 addtocartqty2706" id="qty2706" defaultValue="" min="1" max="10" maxLength="1" required="" />
                        </span>
                        <button className="btn-cart incdecaddtocart AddToCart2706" data-productid="84562" type="button" onClick={IncrementDecrementQuantityCart('Add', this)} href >Add to cart</button>
                        <div className="product-qty-parenttest product-qty-parent2706" >
                          {/* <div className="product-qty fixhomepage IncDecQtyDiv IncrementDecrementQtyDiv2706" >
                                <input type="button" className="IncDecQty  AddUpdateqty2706" />
                                <span className="dec qtybtn btn btn-primary" data-productid="84562" onclick="IncrementDecrementQuantityCart('dec',this)">
                                  <i className="fa fa-minus"></i>
                                </span>
                                <span clasclassNames="inc qtybtn btn btn-primary" data-productid="84562" onclick="IncrementDecrementQuantityCart('inc',this)">
                                  <i className="fa fa-plus"></i>
                                </span>
                              </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
ProductGallery.propTypes = {
};
export default memo(ProductGallery);
