/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Constants from '../../containers/App/constants';
import CustomsAPI from '../../containers/MainPage/api/homeServices';
import Header from '../Header';
import BreadCrumb from "./footerBreadCrumb";
////import history from '../../utils/history';
import { useRouter } from 'next/router';
// import { Newsletter } from '../../containers/Newsletter/index';
import './career.css'
import './advertise.css'
export default function Subfooter(props) {
  const router = useRouter();
  const [Ftr, setFooter] = useState('');
  const [Ftr1, setFooter1] = useState('');
  const [menu, setMenu] = useState([]);
  const [flag, setflag] = useState(false);
  const footerData = useSelector(state => state.homeScreen)
  console.log('ss', footerData);
  const location = useLocation()
  console.log('location', location);
  useEffect(() => {
    localStorage.getItem('pagefootert')
  })
  useEffect(() => {
    const footerUrl = location.pathname;
    const footerUrlNew = footerUrl.replace('/', "");
    console.log(`inthefooter${footerUrlNew}`);
    CustomsAPI.getFooterr(footerUrlNew)
      .then(response => {
        setFooter(response.Description)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  }, [props, Ftr])
  useEffect(() => {
    if (localStorage.getItem('generatedtoken') !== null) {
      // console.log(localStorage.getItem('generatedtoken'));
      CustomsAPI.getFooter().then(response => {
        setFooter(response)
        setFooter1(response)
      })
    } else {
      fetch(`${Constants.urls.baseUrl}${Constants.endPoints.token}`, {
        method: 'POST',
        headers: {
          accept: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:
          'username=FCAPICL0100145&password=JHASGjnknkjhIhAjksnjansasasMKLAHNSJHGASB02012121&grant_type=password',
      })
        .then(res => res.json())
        .then(
          result => {
            if (result) {
              localStorage.setItem('generatedtoken', result.access_token)
              CustomsAPI.getFooter().then(response => {
                setFooter(response)
                setFooter1(response)
              })
            }
            // setheadercall(true)
            // setPage(false)
            // setfootercall(true)
            // dispatch(defaultAction(localStorage.getItem('skuproduct')))
            // dispatch(defaultActiondeal())
          },
          /* error => {
            // this.setState({ buttonload: false });
            // console.log(error);
            router.pushState('/NotFoundPage')
          }, */
        );
    }
  }, [localStorage.getItem('generatedtoken')]);
  // useEffect(() => {
  //   if (localStorage.getItem('pagefootert') === 'sitemap-react') {
  //     router.push('/Sitemap')
  //   }
  //   if (localStorage.getItem('pagefootert') === 'contact-us-react') {
  //     router.push('/contactus')
  //   }
  //   if (localStorage.getItem('pagefootert') === 'help-and-faq-react') {
  //     router.push('/faq')
  //   }
  //   // careers-react
  // }, [Ftr])
  useEffect(() => {
    if (footerData !== undefined) {
      setFooter1(footerData.Ftr)
    }
  }, [footerData])
  useEffect(() => {
    CustomsAPI.getFooter().then(response => {
      setFooter1(response)
    })
  }, [])
  useEffect(() => {
    CustomsAPI.getMegamainmenu().then(response => {
      setMenu(response)
    })
  }, [])
  const menu1 = menu.find(res => res.WebPageId === 99);
  function productlistpage(pageurl, patrentcaturl) {
    localStorage.setItem('PLPCat', pageurl)
    localStorage.setItem('PLPparenturl', patrentcaturl)
    return router.push(`/${pageurl}`, { isURLChange: pageurl })
  }
  useEffect(() => {
    if (flag === true) {
      window.location.reload()
    }
  }, [flag])
  const sendtofooterpage = (e) => {
    console.log('ssww', e.target.className);
    if (e.target.className === "about-us-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "about-us")
      router.push(`/about-us`)
    } else if (e.target.className === "why-adibuja-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "why-adibuja")
      router.push(`/why-adibuja`)
    } else if (e.target.className === "how-it-works-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "how-it-works")
      router.push(`/how-it-works`)
    } else if (e.target.className === "coming-soon-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "coming-soon")
      router.push(`/coming-soon`)
    } else if (e.target.className === "contact-us-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "contact-us")
      router.push(`/contact-us`)
    } else if (e.target.className === "careers-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "careers")
      router.push(`/careers`)
    } else if (e.target.className === "investors-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "investors")
      router.push(`/investors`)
    } else if (e.target.className === "help-and-faq-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "faq")
      router.push(`/faq`)
    } else if (e.target.className === "disclaimer-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "disclaimer")
      router.push(`/disclaimer`)
    } else if (e.target.className === "cancel-refund-and-exchange-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "cancel-refund-and-exchange")
      router.push(`/cancel-refund-and-exchange`)
    } else if (e.target.className === "delivery-policy-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "delivery-policy")
      router.push(`/delivery-policy`)
    } else if (e.target.className === "payment-policy-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "payment-policy")
      router.push(`/payment-policy`)
    } else if (e.target.className === "terms-and-conditions-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "terms-and-conditions")
      router.push(`/terms-and-conditions`)
    } else if (e.target.className === "privacy-policy-react") {
      setflag(true)
      localStorage.setItem('pagefootert', "privacy-policy")
      router.push(`/privacy-policy`)
    } else if (e.target.className === "sitemap-react") {
      localStorage.setItem('pagefootert', "Sitemap")
      router.push(`/Sitemap`)
    } else {
      // setflag(false)
      // localStorage.setItem('pagefootert', e.target.className)
      // router.push(`/${e.target.className}`)
    }
    // if (e.target.href !== '' && e.target.className === '') {
    //   history.pop()
    // } else {
    //   localStorage.setItem('pagefootert', e.target.className)
    // }
  }
  const Gallery = () => (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      {Ftr !== '' && <span dangerouslySetInnerHTML={{ __html: Ftr }} />}
      <footer >
        {/* <Newsletter /> */}
        <br />
        <div className="container-fluid">
          <div className="footercategory col-lg-12 col-md-12 col-sm-12 col-xs-12 footersocial">
            <div className="indus" id="links">
              {menu1 && menu1.SubMenus.map(itm => (
                <div className="flinksholder" key={itm.SubSubMenus.DisplayName}>
                  <span style={{
                    fontSize: '14px', fontWeight: 'bold', marginTop: '15px',
                  }} >
                    {itm.DisplayName} :
                  </span>
                  {itm.SubSubMenus.map(subItm => (
                    <Link onClick={() => productlistpage(subItm.PageUrl, itm.PageUrl)} className="flinks">
                      {subItm.DisplayName}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div onClick={(e) => sendtofooterpage(e)} >
          {Ftr1 !== '' && <span dangerouslySetInnerHTML={{ __html: Ftr1.Description }} />}
        </div>
      </footer>
    </>
  );
  return (
    <>
      {localStorage.getItem('pagefootert') === 'advertise-with-us-react' ?
        <Gallery /> :
        <>
          <Header />
          <div className='subfooterBreadcrumb'>
            {console.log('chkpagefooter..', localStorage.getItem('pagefootert'))}
            <BreadCrumb activepage={localStorage.getItem('pagefootert')} />
          </div>
          <div className='footerContent'>
            {Ftr !== '' && <span dangerouslySetInnerHTML={{ __html: Ftr }} />}
          </div>
          <footer >
            {/* <Newsletter /> */}
            <br />
            <div className="container-fluid">
              <div className=" footercategory col-lg-12 col-md-12 col-sm-12 col-xs-12 footersocial">
                <div className="indus" id="links">
                  {menu1 && menu1.SubMenus.map(itm => (
                    <div className="flinksholder" key={itm.SubSubMenus.DisplayName}>
                      <span style={{
                        fontSize: '14px', fontWeight: 'bold', marginTop: '15px',
                      }} >
                        {itm.DisplayName} :
                      </span>
                      {itm.SubSubMenus.map(subItm => (
                        <Link onClick={() => productlistpage(subItm.PageUrl, itm.PageUrl)} className="flinks">
                          {subItm.DisplayName}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div onClick={(e) => sendtofooterpage(e)} >
              {Ftr1 !== '' && <span dangerouslySetInnerHTML={{ __html: Ftr1.Description }} />}
            </div>
          </footer>
        </>
      }
    </>
  )
}
