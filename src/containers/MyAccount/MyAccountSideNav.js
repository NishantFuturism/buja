// import React, { useState } from 'react';
import React from 'react';
import Link from 'next/link';
//import history from '../../utils/history';
// const [change, setChange] = useState('false')
// const [active, setActive] = useState('false')
import { useRouter } from 'next/router';

function MyAccountSideNav() {
  const router = useRouter();

  function renderLogout() {
    // localStorage.removeItem('CustGUID')
    // localStorage.removeItem('UserFirstName')
    // localStorage.removeItem('CartGUID')
    // localStorage.removeItem('CartGUID')
    localStorage.clear()
    router.push('/')
  }
  // const handlechange = () => {
  //   setChange(!active)
  // }
  return (
    <>
      <div className="col-12 col-sm-12 col-md-12 col-lg-2">
        < ul className="nav flex-column dashboard-list myaccountIcons" role="tablist">
          <li> <Link class='nav-link active' href="/account/dashboard">&nbsp;<span className="lnr lnr-chart-bars" aria-hidden="true"></span>&nbsp;Dashboard</Link></li>
          <li> <Link class='nav-link' href="/account/myorders">&nbsp;<span className="lnr lnr-cart" aria-hidden="true"></span>&nbsp;My Order
          </Link></li>
          <li> <Link class='nav-link' href="/account/reorder">&nbsp;<span className="lnr lnr-history" aria-hidden="true"></span>&nbsp;Reorder</Link></li>
          <li> <Link class='nav-link' href="/wishlist">&nbsp;<span className="lnr lnr-heart" aria-hidden="true"></span>&nbsp;My Wishlist</Link>
          </li>
          <li> <Link class='nav-link' href="/account/transactions">&nbsp;<span className="lnr lnr-pushpin" aria-hidden="true"></span>&nbsp;Wallet Transactions</Link></li>
          <li> <Link class='nav-link' href="/account/savedcartlist">&nbsp;<span className="lnr lnr-pushpin" aria-hidden="true"></span>&nbsp;Saved Cart</Link></li>
          <li><Link class='nav-link' href="/account/manageaddress">&nbsp;<span className="lnr lnr-map-marker" aria-hidden="true"></span>&nbsp;Manage Addresses</Link></li>
          <li><Link class='nav-link' href="/account/profile">&nbsp;<span className="lnr lnr-user" aria-hidden="true"></span>&nbsp;Profile</Link>
          </li>
          <li><Link class='nav-link' href="/account/changepassword">&nbsp;<span className="lnr lnr-lock" aria-hidden="true"></span>&nbsp;Manage Password
          </Link></li>
          <li><Link class='nav-link' id="logout" href="#" onClick={renderLogout}>&nbsp;<span className="lnr lnr-exit" aria-hidden="true"></span>&nbsp;logout</Link></li>
        </ul>
        {/* <ul className="nav flex-column dashboard-list" role="tablist">
      <li><Link to="/account/dashboard" onChange={handlechange} className={change ? 'm-active nav-link' : 'nav-link'}><i className="fa fa-tachometer"></i>&nbsp;  Dashboard</Link></li>
      <li> <Link to="/account/myorders" onChange={handlechange} className={change ? 'm-active nav-link' : 'nav-link'}><i className="fa fa-shopping-basket"></i>&nbsp;  My Order
      </Link></li>
      <li> <Link to="/account/reorder" onChange={handlechange} className={change ? 'm-active nav-link' : 'nav-link'}><i className="fa fa-repeat"></i>&nbsp;  Reorder</Link></li>
      <li> <Link to="/Wishlist" onChange={handlechange()} className={change ? 'm-active nav-link' : 'nav-link'}><i className="fa fa-heart"></i>&nbsp;  My Wishlist</Link>
      </li>
      <li> <Link to="/account/transactions" onChange={handlechange} className={change ? 'm-active nav-link' : 'nav-link'}><i className="fa fa-credit-card-alt"></i>&nbsp;  Wallet Transactions</Link></li>
      <li> <Link to="/account/savedcartlist" onChange={handlechange} className={change ? 'm-active nav-link' : 'nav-link'}><i className="fa fa-shopping-bag"></i>&nbsp;  Saved Cart</Link></li>
      <li><Link to="/account/manageaddress" onChange={handlechange} className={change ? 'm-active nav-link' : 'nav-link'}><i className="fa fa-address-card"></i>&nbsp;  Manage Addresses</Link></li>
      <li><Link to="/account/profile" onChange={handlechange} className={change ? 'm-active nav-link' : 'nav-link'}><i className="fa fa-user-circle-o"></i>&nbsp; Profile</Link>
      </li>
      <li><Link to="/account/changepassword" onChange={handlechange} className={change ? 'm-active nav-link' : 'nav-link'}><i className="fa fa-key"></i>&nbsp;  Manage Password
      </Link></li>
      <li><Link id="logout" href onClick={renderLogout}><i className="fa fa-power-off "></i>&nbsp;  logout</Link></li>
    </ul> */}
      </div >
    </>
  )
};
export default MyAccountSideNav;