import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import CustomsAPI from '../containers/MainPage/api/homeServices';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';
function ViewAllBrand() {
  const [brandList, setBrandList] = useState([]);
  const [noOfBrands, setNoOfBrands] = useState();
  useEffect(() => {
    CustomsAPI.getBrandList(1, 1000)
      .then(response => {
        setBrandList(response.Data)
        setNoOfBrands(response.TotalNoOfPages)
      })
  }, [])
  return (
    <>
      <ToastContainer
        position="top-right"
      />
      <Header />
      <div className="main-wrapper view-all-brands">
        <div className="container-fluid">
          {
            noOfBrands && noOfBrands !== "" ?
              <h3 className="brand-item-heading">Shop All Brands ({noOfBrands})</h3>
              : <div className='col-lg-12 text-center'>
                <img src='/images/adibuja-logo-animation.gif' alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
                {/* <i
                  style={{ justifySelf: 'center', marginTop: '10%' }}
                  className="fa fa-spin fa-spinner fa-4x"></i> */}
              </div>
          }
          <div className="row">
            {
              brandList.map((data) => (<div className="col-lg-2 col-sm-6 col-xs-6 col-6 brand-item-detail-container">
                <div className="brand-item-detail">
                  <Link href={`/brands/${data.PageUrl}`}>
                    <img referrerpolicy="no-referrer" src={data.Thumbnail} alt={data.PageUrl} />
                    <span style={{ display: "block" }}>{data.Name}</span>
                  </Link>
                </div>
              </div>))
            }
          </div>
        </div>
      </div>
      <Footer newsletterdisplay="no" />
    </>
  );
}
export default ViewAllBrand;