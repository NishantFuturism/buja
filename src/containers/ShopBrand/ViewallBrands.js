import React from 'react'
import '../../../assets1/css/bundle.css';
import '../../../assets1/css/default.min.css';
import '../../../assets1/css/font-awesome.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
export default function ViewallBrands() {
  return (
    <>
      <div className="main-wrapper" data-url="">
        <div className="container-fluid">
          <div className="row">
            <h1>Brands</h1>
            <div className="col-lg-12">
              <div className="product-shop-main-wrapper" id="product-listing">
                {/* <div className="shop-baner-img mb-70">
                  <br />
                  <div id="paginginfo" data-itemcount="" data-paginationlimit="40" data-filters="" data-page="1" data-limit="40"></div>
                </div> */}
                {/* <div className="shop-top-bar mb-30">
                  <div className="row" id="pageTopFilters">
                    <div className="col-md-6">
                      <div className="top-bar-left" data-overallcount="266">
                        <div className="product-page">
                          <div className="showingleft">Showing <span id="start-index">1</span> to <span id="end-index">40</span> of <span id="total-product-count">266</span> (<span id="current-page">1</span> page)</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="top-bar-right">
                        <div className="per-page">
                          <p className="showleft">Show : </p>
                          <select className="nice-select" name="limit" onChange="if (!window.__cfRLUnblockHandlers) return false; ChangeBrandListingLimit(this.value)" id="pagination_limit111" style={{ display: 'none' }}>
                            <option value="10">10</option><option value="20">20</option><option value="30">30</option><option value="40" selected="">40</option><option value="50">50</option><option value="60">60</option><option value="70">70</option><option value="100">100</option>
                          </select><div className="nice-select" ><span className="current">40</span><ul className="list"><li data-value="10" className="option">10</li><li data-value="20" className="option">20</li><li data-value="30" className="option">30</li><li data-value="40" className="option selected">40</li><li data-value="50" className="option">50</li><li data-value="60" className="option">60</li><li data-value="70" className="option">70</li><li data-value="100" className="option">100</li></ul></div>
                        </div>
                        <div className="product-short">
                          <p className="sortleft">Sort By : </p>
                          <select className="nice-select" name="sortby" onChange="if (!window.__cfRLUnblockHandlers) return false; ChangeSortOrder(this.value)" id="sortby_limit" style={{ display: 'none' }}>
                            <option value="AZ"> Name(A - Z)</option><option value="ZA">Name(Z - A)</option>
                          </select><div className="nice-select" ><span className="current"> Name(A - Z)</span><ul className="list"><li data-value="AZ" className="option selected"> Name(A - Z)</li><li data-value="ZA" className="option">Name(Z - A)</li></ul></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="shop-product-wrap row grid">
                  <div id="products" className="shop-product-wrap row grid" style={{ display: 'none' }}>
                    {/* <style>
                      #divBrands {
                        width: 158.5px;
                      margin-right: 10px;
                      margin-bottom: 10px;
                      margin-top:10px;
                      margin-left:10px;
    }
                    </style> */}
                    <input type="hidden" id="hdnLimit" value="40" />
                    <div className="div-lg-2 div-sm-4 div-xs-2" id="divBrands" >
                      <a href="/brands/carall">
                        <img src="https://cdn.adibuja.com/Images///carall (1).png" style={{ width: 'inherit !important' }} alt="Carall" />
                      </a>
                    </div>
                    <div className="div-lg-2 div-sm-4 div-xs-2" id="divBrands" >
                      <a href="/brands/farmina-pet-foods">
                        <img src="https://cdn.adibuja.com/Images///Farmina (1).png" style={{ width: 'inherit !important' }} alt="Farmina Pet Foods" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 ">
              <div className="pagination-area pt-35 pb-20 mb-30">
                {/* <div className="row">
                  <div className="col-12">
                    <ul style={{ margin: 0 }} className="pagination pagination-box"><li className="last-active">←<span className="a-letter-space"></span><span className="a-letter-space"></span>Prev</li><li className="active"><a style={{ cursor: 'pointer' }}>1</a></li><li><a style={{ cursor: 'pointer' }}>2</a></li><li><a style={{ cursor: 'pointer' }}>3</a></li><li><a style={{ cursor: 'pointer' }}>Next<span className="a-letter-space"></span><span className="a-letter-space"></span>→</a></li></ul>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
