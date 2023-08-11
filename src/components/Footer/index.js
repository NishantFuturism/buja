/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@/useLocalStorage';
import { useSelector } from 'react-redux';
//import { Link, useLocation } from 'react-router-dom';
import Link from 'next/link';
import Constants from '../../containers/App/constants';
import '../../../public/assets1/css/default.min.css';
import '../../../public/assets1/css/responsive.min.css';
import '../../../public/assets1/css/style.min.css';
// import './career.css'
// import './advertise.css'
// import { Image } from '../Footer/selleradvertise/images';
import CustomsAPI from '../../containers/MainPage/api/homeServices';
import { Newsletter } from '../../containers/Newsletter';
import '@icon/linearicons/linearicons.css';
////import history from '../../utils/history';
import { useRouter } from 'next/router';
// import BreadCrumb from '../../components/Footer/footerBreadCrumb';
function Footer() {

  const [PLPCat, setPLPCat] = useLocalStorage('PLPCat',null);
  const [PLPparenturl, setPLPparenturl] = useLocalStorage('PLPparenturl',null);
  const [generatedtoken, setgeneratedtoken] = useLocalStorage('generatedtoken',null);
  const [pagefootert, setpagefootert] = useLocalStorage('pagefootert',null);

  const router = useRouter();
  const [Ftr, setFooter] = useState('');
  // const [Megamainmenu, setMegamainmenu] = useState([]);
  const [menu, setMenu] = useState([]);
  const [flag, setflag] = useState(false);
  const [visible, setVisible] = useState(false)
  // const [FirstCall, setFirstCall] = useState(0);
  // const [page, setpage] = useState(false);
  const footerData = useSelector(state => state.homeScreen)
  //const location = useLocation();
  const checkValues = ["/category/", "/product/", "allbrands", "/"];
 
  useEffect(() => {
    if (footerData !== undefined) {
      setFooter(footerData.Ftr)
      setflag(false)
      // setMegamainmenu(footerData.megaMenuResp)
    }
  }, [footerData])
  useEffect(() => {
    if (generatedtoken !== null) {
      // console.log(generatedtoken);
      CustomsAPI.getFooter().then(response => {
        setFooter(response)
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
              setgeneratedtoken(result.access_token)
              CustomsAPI.getFooter().then(response => {
                setFooter(response)
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
            history.pushState('/NotFoundPage')
          }, */
        );
    }
  }, [generatedtoken]);
  // useEffect(() => {
  //   setFooter(props && props.footerData && props.footerData.Ftr)
  // }, [props])
  useEffect(() => {
    // if(FirstCall > 0){
    CustomsAPI.getFooter().then(response => {
      setFooter(response)
    })
    // }
  }, [])
  // useEffect(() => {
  //   if (props.onclick === true) {
  //     history.push('/subfooter')
  //   }
  // }, [])
  useEffect(() => {
    CustomsAPI.getMegamainmenu().then(response => {
      setMenu(response)
    })
  }, [])
  const menu1 = menu.find(res => res.WebPageId === 99);

  function productlistpage(pageurl, patrentcaturl,e) {
    e.preventDefault();
    setPLPCat(pageurl)
    setPLPparenturl(patrentcaturl)
    // return router.push(`/${pageurl}`, { isURLChange: pageurl })
    return router.push(
      {
        pathname: `/${pageurl}`, // not router.asPath
        isURLChange: pageurl,
      })
  }
  useEffect(() => {
    if (flag === true) {
      // return history.push('/subfooter')
    }
  }, [flag])
  /* const sendtofooterpage = (e) => {
    // console.log('ssww', e, e.target.className);
    localStorage.setItem('pagefootert', e.target.className)
    if (e.target.href !== '' && e.target.className === '') {
      history.pop()
    } else {
      localStorage.setItem('pagefootert', e.target.className)
      setflag(true)
      // history.push('/subfooter')
      // setpage(true)
    }
    // const data = document.getElementsByClassName()
  } */
  // useEffect(() => {
  //   setFirstCall(FirstCall + 1)
  // }, [])
  // useEffect(() => {
  //   if (page === true) {
  //     // window.location.reload()
  //   }
  // }, [page])
  const sendtofooterpage = (e) => {
    // about-us-react
    // why-adibuja-react
    // how-it-works-react
    // coming-soon-react
    // contact-us-react
    // careers-react
    // investors-react
    //
   
    if (e.target.className === "about-us-react") {
      setpagefootert("about-us")
      
      router.push(`/about-us`)
    } else if (e.target.className === "why-adibuja-react") {
      setpagefootert("why-adibuja")
      router.push(`/why-adibuja`)
    } else if (e.target.className === "how-it-works-react") {
      setpagefootert("how-it-works")
      router.push(`/how-it-works`)
    } else if (e.target.className === "coming-soon-react") {
      setpagefootert("coming-soon")
      router.push(`/coming-soon`)
    } else if (e.target.className === "contact-us-react") {
      setpagefootert("contact-us")
      router.push(`/contact-us`)
    } else if (e.target.className === "careers-react") {
      setpagefootert("careers")
      router.push(`/careers`)
    } else if (e.target.className === "investors-react") {
      setpagefootert("investors")
      router.push(`/investors`)
    } else if (e.target.className === "help-and-faq-react") {
      setpagefootert("faq")
      router.push(`/faq`)
    } else if (e.target.className === "disclaimer-react") {
      setpagefootert("disclaimer")
      router.push(`/disclaimer`)
    } else if (e.target.className === "cancel-refund-and-exchange-react") {
      setpagefootert("cancel-refund-and-exchange")
      router.push(`/cancel-refund-and-exchange`)
    } else if (e.target.className === "delivery-policy-react") {
      setpagefootert("delivery-policy")
      router.push(`/delivery-policy`)
    } else if (e.target.className === "payment-policy-react") {
      setpagefootert("payment-policy")
      router.push(`/payment-policy`)
    } else if (e.target.className === "terms-and-conditions-react") {
      setpagefootert("terms-and-conditions")
      router.push(`/terms-and-conditions`)
    } else if (e.target.className === "privacy-policy-react") {
      setpagefootert("privacy-policy")
      router.push(`/privacy-policy`)
    } else if (e.target.className === "sitemap-react") {
      setpagefootert("Sitemap")
      router.push(`/Sitemap`)
    } else {
      // localStorage.setItem('pagefootert', e.target.className)
      // history.push(`/${e.target.className}`)
    }
    // localStorage.setItem('pagefootert', e.target.className)
    // history.push(`/${e.target.className}`)
    // if (e.target.href !== '' && e.target.className === '') {
    //   return history.push(`/${e.target.className}`)
    // }
    // localStorage.setItem('pagefootert', e.target.className)
    setflag(true)
  }
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true)
    }
    else if (scrolled <= 300) {
      setVisible(false)
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  //window.addEventListener('scroll', toggleVisible);
  return (
    <footer >
      {
        checkValues.some(el => router.pathname.includes(el)) ? "" : <Newsletter />
      }
      {/* newsletterend */}
      <div className="container-fluid">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 footersocial">
          <div className="indus" id="links">
            {menu1 && menu1.SubMenus.map(itm => (
              <div className="flinksholder" key={itm.SubSubMenus.DisplayName}>
                <span style={{
                  fontSize: '14px', fontWeight: 'bold', marginTop: '15px',
                }} >
                  
                  {itm.DisplayName} :
                </span>
                {itm.SubSubMenus.map(subItm => (
                  <Link href="#" onClick={(e) => productlistpage(subItm.PageUrl, itm.PageUrl,e)} className="flinks">
                    {subItm.DisplayName}
                   
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div onClick={(e) => sendtofooterpage(e)} >
        {Ftr !== '' && <span dangerouslySetInnerHTML={{ __html: Ftr.Description }} />}
      </div>
      <div className='scroll-top' onClick={scrollToTop} style={{ display: visible ? 'inline' : 'none' }}>
        <i className="fa fa-angle-up" />
      </div>
    </footer>
  );
}
export default Footer;
