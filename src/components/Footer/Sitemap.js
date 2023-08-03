/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CustomsAPI from '../../containers/MainPage/api/homeServices';
import Header from '../Header'
import './style.css'
////import history from '../../utils/history';
import { useRouter } from 'next/router';
import SubNavigation from '../SubNavigation';
export default function Sitemap() {
  const router = useRouter();
  const [Ftr, setFooter] = useState('');
  const [viemoredata, setviemoredata] = useState();
  // const [flag, setflag] = useState(false);
  // const [Ftr1, setFooter1] = useState('');
  // const history = useHistory()
  // const nextData = useSelector(state => state.ToppSelling)
  useEffect(() => {
    CustomsAPI.categoreyServices()
      .then(response => {
        setviemoredata(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [])
  // const [Megamainmenu, setMegamainmenu] = useState([]);
  // const [menu, setMenu] = useState([]);
  const footerData = useSelector(state => state.homeScreen)
  console.log('ss', footerData);
  useEffect(() => {
    CustomsAPI.getFooter({})
      .then(response => {
        // setloading(false)
        setFooter(response.Description)
      })
      .catch(error => {
        console.log('error:::', error);
      });
    // if (footerData !== undefined) {
    //   setFooter(footerData.Ftr)
    //   // setMegamainmenu(footerData.megaMenuResp)
    // }
  }, [])
  function productlist(PageUrl, patrentcaturl) {
    console.log("productlist==", PageUrl, patrentcaturl);
    localStorage.setItem('PLPCat', `category/${patrentcaturl}/${PageUrl}`)
    localStorage.setItem('PLPparenturl', `category/${patrentcaturl}`)
    // return router.push(`category/${patrentcaturl}/${PageUrl}`, { isURLChange: `category/${patrentcaturl}/${PageUrl}` })
  }
  function productlistpage(pageurl, patrentcaturl) {
    console.log("productlistpage==", pageurl, patrentcaturl);
    localStorage.setItem('PLPCat', `category/${patrentcaturl}/${pageurl}`)
    localStorage.setItem('PLPparenturl', `category/${patrentcaturl}`)
    // return router.push(`category/${patrentcaturl}/${pageurl}`, { isURLChange: `category/${patrentcaturl}/${pageurl}` })
  }
  // useEffect(() => {
  //   if (flag === true) {
  //     // router.push('/subfooter')
  //   }
  // }, [flag])
  const sendtofooterpage = (e) => {
    console.log('ssww', e, e.target.className);
    if (e.target.className === "about-us-react") {
      localStorage.setItem('pagefootert', "about-us")
      router.push(`/about-us`)
    } else if (e.target.className === "why-adibuja-react") {
      localStorage.setItem('pagefootert', "why-adibuja")
      router.push(`/why-adibuja`)
    } else if (e.target.className === "how-it-works-react") {
      localStorage.setItem('pagefootert', "how-it-works")
      router.push(`/how-it-works`)
    } else if (e.target.className === "coming-soon-react") {
      localStorage.setItem('pagefootert', "coming-soon")
      router.push(`/coming-soon`)
    } else if (e.target.className === "contact-us-react") {
      localStorage.setItem('pagefootert', "contact-us")
      router.push(`/contact-us`)
    } else if (e.target.className === "careers-react") {
      localStorage.setItem('pagefootert', "careers")
      router.push(`/careers`)
    } else if (e.target.className === "investors-react") {
      localStorage.setItem('pagefootert', "investors")
      router.push(`/investors`)
    } else if (e.target.className === "help-and-faq-react") {
      localStorage.setItem('pagefootert', "faq")
      router.push(`/faq`)
    } else if (e.target.className === "disclaimer-react") {
      localStorage.setItem('pagefootert', "disclaimer")
      router.push(`/disclaimer`)
    } else if (e.target.className === "cancel-refund-and-exchange-react") {
      localStorage.setItem('pagefootert', "cancel-refund-and-exchange")
      router.push(`/cancel-refund-and-exchange`)
    } else if (e.target.className === "delivery-policy-react") {
      localStorage.setItem('pagefootert', "delivery-policy")
      router.push(`/delivery-policy`)
    } else if (e.target.className === "payment-policy-react") {
      localStorage.setItem('pagefootert', "payment-policy")
      router.push(`/payment-policy`)
    } else if (e.target.className === "terms-and-conditions-react") {
      localStorage.setItem('pagefootert', "terms-and-conditions")
      router.push(`/terms-and-conditions`)
    } else if (e.target.className === "privacy-policy-react") {
      localStorage.setItem('pagefootert', "privacy-policy")
      router.push(`/privacy-policy`)
    } else if (e.target.className === "sitemap-react") {
      localStorage.setItem('pagefootert', "Sitemap")
      router.push(`/Sitemap`)
    } else {
      // localStorage.setItem('pagefootert', e.target.className)
      // router.push(`/${e.target.className}`)
    }
    // localStorage.setItem('pagefootert', e.target.className)
    // if (e.target.href !== '' && e.target.className === '') {
    //   history.pop()
    // } else {
    //   localStorage.setItem('pagefootert', e.target.className)
    //   setflag(true)
    //   // router.push('/subfooter')
    //   // setpage(true)
    // }
    // const data = document.getElementsByClassName()
  }
  return (
    <>
      <Header />
      <SubNavigation />
      <section className="clearfix sitemap">
        <div className="container-fluid"><br />
          <h1 style={{ textAlign: 'center', color: 'black', textTransform: 'none' }}>Sitemap</h1>
          <div id="divCategoryMenuList">
            <div className="row">
              <div className="col-12">
                <div className="main-menu-categories">
                  <nav id="mobile-menu-sitemapfix">
                    <ul>
                      <li className="static">
                        <ul className="mega-menu mega-full">
                          <li> <a href="/">Home </a></li>
                          <li>
                            <a href >Customer</a>
                            <ul>
                              <li><a href="/cart/">My Cart</a></li>
                              <li><a href="/login/">Login</a></li>
                              <li><a href="/register/">Register</a></li>
                            </ul>
                          </li>
                          <li>
                            <a href>Let Us Help You</a>
                            <ul>
                              <li><a href="/payment-policy">Payment Policy</a></li>
                              <li><a href="/delivery-policy">Delivery Policy</a></li>
                              <li><a href="/cancel-refund-and-exchange">Return &amp; Exchange</a></li>
                              <li><a href="/privacy-policy">Privacy Policy</a></li>
                              <li><a href="/terms-and-conditions">Terms &amp; Conditions</a></li>
                              <li><a href="/disclaimer">Disclaimer</a></li>
                              <li><a href="/faq">Help &amp; FAQ</a></li>
                            </ul>
                          </li>
                          <li>
                            <a href>Seller</a>
                            <ul>
                              {/* <li><a href="https://demoliveadmin.adibuja.com/authenticate?ReturnURL=https://demoliveadmin.adibuja.com/">Login</a></li>
                              <li><a href="https://seller.adibuja.com/">Become A Seller</a></li> */}
                              <li><a href="https://store.adibuja.com/">Login</a></li>
                              <li><a href="https://seller.adibuja.com/seller-register">Become A Seller</a></li>
                            </ul>
                          </li>
                          <li>
                            <a href="/advertise-with-us">Advertise With Us</a>
                          </li>
                          <li>
                            <a href>Get To Know Us</a>
                            <ul>
                              <li><a href="/about-us">About Adibuja</a></li>
                              <li><a href="/why-adibuja">Why Adibuja</a></li>
                              <li><a href="/how-it-works">How It Works</a></li>
                              <li><a href="/contact-us">Contact Us</a></li>
                              <li><a href="/careers">Careers</a></li>
                              <li><a href="/investors">Investors</a></li>
                            </ul>
                          </li>
                          {(viemoredata || []).map(data =>
                            data.SubCatgories !== undefined && data.SubCatgories.length !== 0 &&
                            <li className="mega-title">
                              <a href={`category/${data.PageUrl}/${data.SubCatgories[0].PageUrl}`}
                                onClick={() => productlist(data.SubCatgories[0].PageUrl, data.PageUrl)}
                              >{data.DisplayName}</a>
                              {data.SubCatgories.map(d =>
                                <ul>
                                  <li><a href={`category/${data.PageUrl}/${d.PageUrl}`}
                                    onClick={() => productlistpage(d.PageUrl, data.PageUrl)}
                                  >{d.DisplayName}</a></li>
                                </ul>
                              )}
                            </li>
                          )}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {Ftr !== '' && <span dangerouslySetInnerHTML={{ __html: Ftr }} onClick={(e) => sendtofooterpage(e)} />}
    </>
  )
}
