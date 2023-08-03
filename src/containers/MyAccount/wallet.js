import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
// import SubNavigation from '../../components/SubNavigation';
import PaymentAPI from '../MainPage/api/payment';
import WalletAPI from '../MainPage/api/wallet';
import BreadCrumb from './myAccountBreadcrumb';
import MyAccountSideNav from './MyAccountSideNav';
import 'react-toastify/dist/ReactToastify.css';
import logoanimation from '../../images/adibuja-logo-animation.gif'
//import history from '../../utils/history';
export function Wallet() {
  const [transactlist, settransactlist] = useState([])
  const [loading, setloading] = useState(false)
  const [walletbalance, setwalletbalance] = useState(0);
  const [isUserLogin, setIsUserLogin] = useState()
  console.log('isUserLogin--', isUserLogin)
  // const dispatch = useDispatch()
  useEffect(() => {
    // setufirstname(window.atob(localStorage.getItem('UserFirstName')))
    // setlastnamw(window.atob(localStorage.getItem('UserLastName')))
    // setphone(localStorage.getItem('UserLastPhone'))
    console.log(`47--${window.atob(localStorage.getItem('CustGUID'))}`)
    // console.log(`48--${ localStorage.hasOwnProperty('CustGUID')}`)
    if (Object.prototype.hasOwnProperty.call(localStorage, 'CustGUID')) {
      if (window.atob(localStorage.getItem('CustGUID')) !== null || window.atob(localStorage.getItem('CustGUID')) !== undefined || window.atob(localStorage.getItem('CustGUID')) !== '00000000-0000-0000-0000-000000000000') {
        console.log('51')
        setIsUserLogin(true)
      } else {
        console.log('54')
        setIsUserLogin(false)
      }
    }
    else {
      setIsUserLogin(false)
    }
  }, [isUserLogin])
  useEffect(() => {
    // dispatch(gettransactwallet())
    setloading(true)
    WalletAPI.wallettransact({})
      .then(response => {
        setloading(false)
        settransactlist(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [])
  function dateConverter(createdon) {
    const date = new Date(createdon);
    const formattedDate = date.toLocaleDateString('en-us', {
      month: 'long', day: 'numeric', year: 'numeric'
    }).replace(/ /g, '  ');
    return formattedDate
  }
  useEffect(() => {
    // dispatch(getcustomerwalletbalance())
    PaymentAPI.getcustomerwalletbalance({})
      .then(response => {
        console.log('uuuuu', response)
        setwalletbalance(response.WalletBalance)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [])
  return (
    <>
      {
        // (isUserLogin === true || isUserLogin !== null || isUserLogin !== undefined)
        (isUserLogin === false)
          ?
          history.push({ pathname: '/login', })
          :
          <div>
            <ToastContainer
              position="top-right"
            // draggable={true}
            // autoClose={50000}
            />
            <Header />
            <BreadCrumb myAccount="My Account" activepage="My Wallet Transactions" />
            {/* <SubNavigation /> */}
            <div className="my-account-wrapper pb-20" >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <main id="primary" className="site-main">
                      <div className="user-dashboard">
                        <div className="main-dashboard">
                          <div className="row">
                            <MyAccountSideNav />
                            <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                              <div className="tab-content dashboard-content">
                                <h3>
                                  Wallet Transactions
                                </h3>
                                <h3> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wallet" role="img" xmlns="" viewBox="0 0 512 512" className="svg-inline--fa fa-wallet fa-w-16"
                                  style={{ width: '20px', verticalAlign: 'bottom', marginRight: '5px' }}><path fill="currentColor" d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z" className=""></path></svg> ₹ {walletbalance}</h3>
                                {/* <h3> */}
                                {/* <span className="hidden-md hidden-lg">
                              <svg focusable="false" data-prefix="fas" data-icon="wallet" role="img" xmlns="" viewBox="0 0 512 512" className="svg-inline--fa fa-wallet fa-w-16"><path fill="currentColor" d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z" className=""></path></svg>
                              ₹ 0.00
                            </span> */}
                                {/* </h3> */}
                                {transactlist.length === 0 ?
                                  null
                                  :
                                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 fixmobile">
                                    <div className="table-responsive">
                                      <table className="table">
                                        <thead>
                                          <tr style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                            <th className="hidden" style={{ width: '0px !important', display: 'none' }}></th>
                                            <th className="text-center">Transaction Date</th>
                                            <th className="text-center">Order Number</th>
                                            <th className="text-center">Transaction Amount</th>
                                            <th className="text-center">Wallet Balance</th>
                                            <th className="hidden" style={{ width: '0px !important', display: 'none' }}></th>
                                            <th className="hidden" style={{ width: '0px !important', display: 'none' }}></th>
                                          </tr>
                                        </thead>
                                        {loading === true ?
                                          <tbody>
                                            <tr>
                                              <td colSpan={4}>
                                                <div className='row'>
                                                  <div className='col-lg-12 text-center mt-25 mb-25' >
                                                    <img src={logoanimation} alt='' style={{ justifySelf: 'center', width: '80px', height: '80px' }} />
                                                    {/* <i
                                                style={{ justifySelf: 'center' }}
                                                className="fa fa-spin fa-spinner fa-4x"></i> */}
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          </tbody>
                                          :
                                          <tbody>
                                            {(transactlist || []).map(data =>
                                              <tr style={{ whiteSpace: 'nowrap', overflow: 'hidden' }} className="pr-block item">
                                                <td className="hidden" style={{ width: '0px !important', display: 'none' }}></td>
                                                <td className="text-center"><span className="d-lg-none">Date : </span>{dateConverter(data.CreatedDate)}</td>
                                                <td className="text-center" id="orderwallet"><span className="d-lg-none">Order : </span><a href="/account/myorders/myorder-detail/OC8266" style={{ cursor: 'pointer', color: '#007bff' }}>{data.OrderNumber}</a></td>
                                                <td className="text-center"><span className="d-lg-none">Transaction Amount : </span>₹{data.TransactionAmount.toFixed(2)}<span style={{ color: data.IsDebit ? 'red' : 'green' }}> {data.IsDebit ? '[DR]' : '[CR]'} {data.IsDebit ? <i className="fa fa-arrow-up"></i> :
                                                  <i className="fa fa-arrow-down"></i>} </span></td>
                                                <td className="text-center"><span className="d-lg-none">Wallet Balance : </span>₹{data.WalletBalance.toFixed(2)}</td>
                                                <td className="hidden" style={{ width: '0px !important', display: 'none' }}></td>
                                                <td className="hidden" style={{ width: '0px !important', display: 'none' }}></td>
                                              </tr>
                                            )}
                                          </tbody>}
                                      </table>
                                      <br />
                                    </div>
                                  </div>
                                }
                                {transactlist.length === 0 ?
                                  <div div className="col-12 col-sm-12 col-md-12 col-lg-12 fixmobile">
                                    <div className="table-responsive">
                                      <p>No record found</p>
                                    </div>
                                  </div>
                                  : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            </div >
            <Footer />
          </div>
      }
    </>
  )
}
export default Wallet
