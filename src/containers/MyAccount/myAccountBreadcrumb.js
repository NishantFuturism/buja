/* eslint-disable react/prop-types */
// import React from "react";
import React from 'react';
import Link from 'next/link';
function BreadCrumb(props) {
  return (
    <div className="breadcrumb-area mb-20" id="breadcrumb">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-wrap">
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  {
                    props.myAccount === 'Brand' ?
                      <li className="breadcrumb-item"><Link href='/allbrands'>Brands</Link></li>
                      :
                      props.myAccount && <li className="breadcrumb-item"><Link href='/account/dashboard'>{props.myAccount}</Link></li>}
                  {props.productname && <li className="breadcrumb-item"><Link href='/product'>{props.productname}</Link></li>}
                  <li className="breadcrumb-item active" aria-current="page">{props.activepage}</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// BreadCrumb.propTypes = {};
export default (BreadCrumb)
