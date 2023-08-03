/* eslint-disable react/prop-types */
// import React from "react";
import React from 'react';
// import { Link } from 'react-router-dom';
function BreadCrumb(props) {
  return (
    <div className="breadcrumb-area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb-wrap">
              <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  {/* {props.product && <li className="breadcrumb-item"><Link to='/product'>{props.product}</Link></li>} */}
                  {props.product && <li className="breadcrumb-item">{props.product}</li>}
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
