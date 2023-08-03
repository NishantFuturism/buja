/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */
import React from 'react';
import '../../../assets1/css/bundle.css';
import '../../../assets1/css/default.min.css';
import '../../../assets1/css/font-awesome.min.css';
import '../../../assets1/css/responsive.min.css';
import '../../../assets1/css/style.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function NotFound() {
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      <div className="login-wrapper pb-35">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-70"><main className="site-main" id="primary">
              <div className="user-login">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6 offset-lg-2 offset-xl-3">
                    <div className="login-form error-page text-center">
                      <h3>404</h3>
                      <h4>Oops! Page not found</h4>
                      <p>Sorry, but the page you are looking for is not found, make sure you have typed the correct URL.</p>
                      <a href="../"><button type='button' className="btn-cart "><i className="fa fa-home"> </i> Go to Hompage</button></a></div>
                  </div>
                </div>
              </div>
            </main></div>
          </div>
        </div>
      </div>
    </>
  );
}
