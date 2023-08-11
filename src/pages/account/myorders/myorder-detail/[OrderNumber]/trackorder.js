/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Trackorder
 *
 */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
// import { Accordion } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLocation } from 'react-router-dom';
import Link from 'next/link';
// import Stepper from 'react-stepper-horizontal';
import { useInjectReducer } from '@/utils/injectReducer';
import { useInjectSaga } from '@/utils/injectSaga';
import { ToastContainer } from 'react-toastify';
import Header from '../../../../../components/Header';
import SubNavigation from '../../../../../components/SubNavigation';
import { ConstantsValues } from '../../../../../containers/MainPage/api/homeServices';
import PaymentAPI from '../../../../../containers/MainPage/api/payment';
import TrackOrderAPI from '../../../../../containers/MainPage/api/trackorder';
import { trackorder } from '../../../../../containers/Trackorder/actions';

import reducer from '../../../../../containers/MyAccount/reducer';
import saga from '../../../../../containers/MyAccount/saga';
import 'react-toastify/dist/ReactToastify.css';
import "../../../../../containers/Trackorder/Trackorder.css"
import Footer from '../../../../../components/Footer';
// import history from '../../utils/history';
import { useRouter } from 'next/router';

// import { slice } from 'lodash';
export function Trackorder() {
  useInjectReducer({ key: 'trackorder', reducer });
  useInjectSaga({ key: 'trackorder', saga });
  const [orderstatus, setorderstatus] = useState()
  // const [statustitle, setstatustitle] = useState('ordered')
  // const [statustitle1, setstatustitle1] = useState('')
  // const [statustitle2, setstatustitle2] = useState('')
  // const [statustitle3, setstatustitle3] = useState('')
  const [orderstatusitemdetails, setorderstatusitemdetails] = useState([])
  const [orderstatusitem, setorderstatusitem] = useState([])
  const [handleClick, sethandleClick] = useState(false)
  const [stepper, setStepper] = useState([])
  const [skuids, setSkuIds] = useState([])
  const [trackOrderStatus, setTrackOrderStatus] = useState([])
  // const [status, setstatus] = useState(0)
  // const [activesteps, setactivestep] = useState(0)
  const dispatch = useDispatch()
  const trackordeReducer = useSelector(state => state.trackorder)
  console.log({ trackordeReducer });
  const [isUserLogin, setIsUserLogin] = useState()
  console.log('isUserLogin--', isUserLogin)
//   const location = useLocation();
  const router = useRouter();

//   console.log('location--', location)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
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
}
  }, [isUserLogin])
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
    // http://localhost:3000/account/myorders/myorder-detail/OC8209/trackorder
    // console.log('location--++', location.pathname)
    const text = router.asPath;

    // let position = text.search("myorder-detail/")
    // let position = text.search("/account/myorders/myorder-detail/")
    // console.log('position--', position)
    // const pos5 = position + 32
    // console.log('pos5--', pos5)
    console.log('text--', text)
    const removeFirst33Char = text.slice(33)
    const orderNo = removeFirst33Char.slice(0, 6)
    console.log('orderNo--', orderNo)
    localStorage.setItem('OrderNumber', window.btoa(orderNo))
    const formbody =
    {
      "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
      "ClientID": ConstantsValues.ClientId
    }
    dispatch(trackorder(formbody))
}
  }, [])
  //   useEffect(()=>{
  // if(window.atob(localStorage.getItem('OrderStatus'))=== )
  // }, [])
  // useEffect(() => {
  //   if (window.atob(localStorage.getItem('OrderStatus')) === 'Completed') {
  //     setstatus('Completed')
  //     setactivestep(4)
  //   }
  // }, [])
  // useEffect(() => {
  //   if (window.atob(localStorage.getItem('OrderStatus')) === 'Completed' || 'Completed') {
  //     setorderstatus(3)
  //   } else if (window.atob(localStorage.getItem('OrderStatus')) === 'Shipped') {
  //     setorderstatus(2)
  //   }
  // }, [])
  useEffect(() => {
    // setStepper([{title: 'Ordered'}, {title: 'Under Process'},{title: 'Shipped'}, {title: 'Delivered'}])
  }, [])
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
    if (window.atob(localStorage.getItem('OrderStatus')) === 'Awaiting Fulfillment') {
      setorderstatus(0)
      // setstatustitle('orderd')
    } else if ((window.atob(localStorage.getItem('OrderStatus')) === 'Awaiting Shipment') || (window.atob(localStorage.getItem('OrderStatus')) === 'Awaiting Payment')) {
      setorderstatus(1)
      if (window.atob(localStorage.getItem('OrderStatus')) === 'Awaiting Payment') {
        // setstatustitle1('Under Process')
      }
      //  setstatustitle1('Under Process')
    } else if ((window.atob(localStorage.getItem('OrderStatus')) === 'Partially Shipped') || (window.atob(localStorage.getItem('OrderStatus'))) === 'Shipped') {
      setorderstatus(2)
      if (window.atob(localStorage.getItem('OrderStatus')) === 'Shipped') {
        // setstatustitle2('Shipped')
      }
      // setstatustitle2('Partially Shipped')
    } else if ((window.atob(localStorage.getItem('OrderStatus')) === 'Partially Refunded') || (window.atob(localStorage.getItem('OrderStatus')) === 'Refunded')) {
      // setorderstatus(4)
      // setstatustitle3('Partially Refunded')
      if (window.atob(localStorage.getItem('OrderStatus')) === 'Refunded') {
        // setstatustitle3('Refunded')
      }
      // setstatustitle3('Partially Refunded')
    } else if (window.atob(localStorage.getItem('OrderStatus')) === '') {
      setorderstatus(3)
      // setstatustitle3('Delivered')
    }
    // } else if (window.atob(localStorage.getItem('OrderStatus')) === 'Completed') {
    //   setorderstatus(3)
    // } else if (window.atob(localStorage.getItem('OrderStatus')) === 'Awaiting Fulfillment') {
    // } else if (window.atob(localStorage.getItem('OrderStatus')) === 'Awaiting Fulfillment') {
    // } else {
    //   setorderstatus(4)
    // }

}
  }, [typeof window !== 'undefined' && window.localStorage ? (window.atob(localStorage.getItem('OrderStatus'))) : undefined])
//   console.log('dd', window.atob(localStorage.getItem('OrderStatus')));
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
    PaymentAPI.paymentdetailsbyorder(window.atob(localStorage.getItem('OrderNumber')))
      .then(response => {
        console.log('uuuuudetails', response)
        // setsuccessdata(response)
      })
      .catch(error => {
        // toast(error)
        console.log('error:::', error);
      });
    const formboday = {
      "OrderNumber": window.atob(localStorage.getItem('OrderNumber')),
      "ClientID": 1
    }
    TrackOrderAPI.GetAllTrackOrderStatusDetail(formboday)
      .then(response => {
        console.log('uuuuudetailsresponse', response)
        setorderstatusitem(response)
        // setsuccessdata(response)
        // TrackOrderAPI.trackorederstatusDetailsItem(itm.OrderStatusId)
        //   .then(resp => {
        //     console.log('uuuuudetails', resp)
        //     // setorderstatusitemdetails1(resp)
        //     setorderstatusitemdetails([...resp])
        //     // setsuccessdata(response)
        //   })
        //   .catch(error => {
        //     // toast(error)
        //     console.log('error:::', error);
        //   });
      })
      .catch(error => {
        // toast(error)
        console.log('error:::', error);
      });
    TrackOrderAPI.trackorederstatus(formboday)
      .then(response => {
        console.log('trackorederstatus response', response)
        setTrackOrderStatus(response)
        // setsuccessdata(response)
        // TrackOrderAPI.trackorederstatusDetailsItem(itm.OrderStatusId)
        //   .then(resp => {
        //     console.log('uuuuudetails', resp)
        //     // setorderstatusitemdetails1(resp)
        //     setorderstatusitemdetails([...resp])
        //     // setsuccessdata(response)
        //   })
        //   .catch(error => {
        //     // toast(error)
        //     console.log('error:::', error);
        //   });
      })
      .catch(error => {
        // toast(error)
        console.log('error:::', error);
      });
    }
  }, [])
  const handlestatusclick = (id) => {
    sethandleClick(!handleClick)
    TrackOrderAPI.trackorederstatusDetailsItem(id)
      .then(resp => {
        console.log('uuuuudetails', resp)
        // setorderstatusitemdetails1(resp)    
        setorderstatusitemdetails(resp)
        // setsuccessdata(response)
      })
      .catch(error => {
        // toast(error)
        console.log('error:::', error);
      });
  }
  useEffect(() => {
    console.log("orderstatusitem");
    setSkuIds(orderstatusitem.map(id => id.OrderStatusId))
  }, [orderstatusitem])
  useEffect(() => {
    console.log("skuids", skuids);
    // 1   Awaiting Fullfillment
    if (skuids.includes(1)) {
      // alert('166')
      setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
      setorderstatus(0)
    }
    // 1   Awaiting Fullfillment
    // 2   Awaiting Shipment
    if (skuids.includes(1) && skuids.includes(2)) {
      // alert('175')
      setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
      setorderstatus(1)
    }
    // 1   Awaiting Fullfillment
    // 2   Awaiting Shipment
    // 3   Awaiting Payment
    // same as [1, 2, 3, 11: cancell order]
    // same as [1, 2, 3, 13: Refund in process]
    if (skuids.includes(1) && skuids.includes(2) && skuids.includes(3)) {
      // alert('188')
      setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
      setorderstatus(1)
    }
    // 1   Awaiting Fullfillment
    // 2   Awaiting Shipment
    // 4   Patially Shipped
    if (skuids.includes(1) && skuids.includes(2) && skuids.includes(4)) {
      // alert('197')
      setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Patially Shipped' }, { title: 'Delivered' }])
      setorderstatus(2)
    }
    // 1   Awaiting Fullfillment
    // 2   Awaiting Shipment
    // 4   Patially Shipped
    // 5   Shipped
    if (skuids.includes(1) && skuids.includes(2) && skuids.includes(4) && skuids.includes(5)) {
      // alert('207')
      setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
      setorderstatus(2)
    }
    // 1   Awaiting Fullfillment
    // 10
    // 11
    // 12 Partially refunded
    if (skuids.includes(1) && skuids.includes(10) && skuids.includes(11) && skuids.includes(12)) {
      // alert('211')
      setStepper([{ title: 'Ordered' }, { title: 'Partially Refunded' }])
      setorderstatus(1)
    }
    // 1   Awaiting Fullfillment
    // 2   Awaiting Shipment
    // 3   Awaiting Payment
    // 10
    // 11
    // 12 Partially refunded
    if (skuids.includes(1) && skuids.includes(2) && skuids.includes(3) && skuids.includes(10) && skuids.includes(11) && skuids.includes(12)) {
      // alert('220')
      setStepper([{ title: 'Ordered' }, { title: 'Partially Refunded' }])
      setorderstatus(1)
    }
    // 1   Awaiting Fullfillment
    // 2   Awaiting Shipment
    // 3   Awaiting Payment
    // 9   refunded
    // 10
    // 11
    // 12
    if (skuids.includes(1) && skuids.includes(2) && skuids.includes(3) && skuids.includes(10) && skuids.includes(11) && skuids.includes(12) && skuids.includes(9)) {
      // alert('233')
      setStepper([{ title: 'Ordered' }, { title: 'Refunded' }])
      setorderstatus(1)
    }
    // 1   Awaiting Fullfillment
    // 8   Payment Failed
    if (skuids.includes(1) && skuids.includes(8)) {
      // alert('242')
      setStepper([{ title: 'Ordered' }, { title: 'Payment Failed' }])
      setorderstatus(2)
    }
    // 1   Awaiting Fullfillment
    // 2   Awaiting Shipment
    // 3   Awaiting Payment
    // 8   Payment Failed
    if (skuids.includes(1) && skuids.includes(2) && skuids.includes(3) && skuids.includes(8)) {
      // alert('252')
      setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Payment Failed' }])
      setorderstatus(2)
    }
    // 1   Awaiting Fullfillment
    // 2   Awaiting Shipment
    // 3   Awaiting Payment
    // 4   Patially Shipped
    if (skuids.includes(1) && skuids.includes(2) && skuids.includes(3) && skuids.includes(4)) {
      // alert('264')
      setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Patially Shipped' }, { title: 'Delivered' }])
      setorderstatus(2)
    }
    // 1   Awaiting Fullfillment
    // 2   Awaiting Shipment
    // 3   Awaiting Payment
    // 4   Patially Shipped
    // 5   Shipped
    if (skuids.includes(1) && skuids.includes(2) && skuids.includes(3) && skuids.includes(4) && skuids.includes(5)) {
      // alert('276')
      setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
      setorderstatus(2)
    }
    // 1   Awaiting Fullfillment
    // 2   Awaiting Shipment
    // 3   Awaiting Payment
    // 4   Patially Shipped
    // 5   Shipped
    // 6   Completed
    if (skuids.includes(1) && skuids.includes(2) && skuids.includes(3) && skuids.includes(4) && skuids.includes(5) && skuids.includes(6)) {
      // alert('289')
      setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
      setorderstatus(3)
    }
    // 1   Awaiting Fullfillment
    // 2   Awaiting Shipment
    // 3   Awaiting Payment
    // 4   Patially Shipped
    // 5   Shipped
    // 6   Completed
    // 8   Payment Failed
    if (skuids.includes(1) && skuids.includes(2) && skuids.includes(3) && skuids.includes(4) && skuids.includes(5) && skuids.includes(6) && skuids.includes(8)) {
      // alert('303')
      setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Payment Failed' }])
      setorderstatus(3)
    }
    // 7 Cancelled
    // This case handle in  case 1 : Awaiting Fullfillment
    // 1   Awaiting Fullfillment
    // 5   Payment Failed
    if (skuids.includes(1) && skuids.includes(5)) {
      // alert('290')
      setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
      setorderstatus(2)
    }
    // 1   Awaiting Fullfillment
    // 5   Payment Failed
    // 6   Completed
    if (skuids.includes(1) && skuids.includes(5) && skuids.includes(6)) {
      // alert('298')
      setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
      setorderstatus(3)
    }
    // if (skuids.includes(2) || skuids.includes(3)) {
    //   if (skuids.includes(2)) {
    //     if (skuids.includes(3) && skuids.includes(6)) {
    //       setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
    //       setorderstatus(3)
    //     }
    //     else {
    //       setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
    //       setorderstatus(2)
    //     }
    //   }
    //   if (skuids.includes(3)) {
    //     if (skuids.includes(6)) {
    //       setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
    //       setorderstatus(3)
    //     }
    //     else {
    //       setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
    //       setorderstatus(1)
    //     }
    //   }
    // }
    // 4   Partially Shipped
    // 5   Shipped
    // if (skuids.includes(4) || skuids.includes(5)) {
    //   if (skuids.includes(4)) {
    //     setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Partially Shipped' }, { title: 'Delivered' }])
    //     setorderstatus(2)
    //   }
    //   if (skuids.includes(5)) {
    //     if (skuids.includes(5)) {
    //       setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
    //       setorderstatus(2)
    //     }
    //     if (skuids.includes(7)) {
    //       setStepper([{ title: 'Ordered' }, { title: 'Shipped' }, { title: 'Cancelled' }])
    //       setorderstatus(2)
    //     }
    //   }
    // }
    // 6  Completed
    // if (skuids.includes(6)) {
    //   alert('hello')
    //   if (skuids.includes(10)) {
    //     setStepper([{ title: 'Ordered' }, { title: 'Delivered' }, { title: 'Request for Refund ' }, { title: 'Partially Refunded' }])
    //     setorderstatus(2)
    //   }
    //   if (skuids.includes(9)) {
    //     setStepper([{ title: 'Ordered' }, { title: 'Delivered' }, { title: 'Request for Refund ' }, { title: 'Refunded' }])
    //     setorderstatus(2)
    //   }
    //   if (skuids.includes(5)) {
    //     setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
    //     setorderstatus(3)
    //   }
    // }
    // 7   Cancelled
    // if (skuids.includes(7)) {
    //   if (skuids.includes(10)) {
    //     setStepper([{ title: 'Ordered' }, { title: 'Cancelled' }, { title: 'Request for Refund ' }, { title: 'Partially Refunded' }])
    //     setorderstatus(2)
    //   }
    //   if (skuids.includes(12)) {
    //     setStepper([{ title: 'Ordered' }, { title: 'Cancelled' }, { title: 'Refund In Process ' }, { title: ' Refunded' }])
    //     setorderstatus(2)
    //   }
    //   if (skuids.includes(11)) {
    //     if (skuids.includes(9)) {
    //       setStepper([{ title: 'Ordered' }, { title: 'Cancelled' }, { title: 'Request for Refund ' }, { title: 'Refunded' }])
    //       setorderstatus(2)
    //     }
    //   }
    //   else {
    //     setStepper([{ title: 'Ordered' }, { title: 'Cancelled' }])
    //     setorderstatus(3)
    //   }
    // }
    // else {
    //   setStepper([{ title: 'Ordered' }, { title: 'Under Process' }, { title: 'Shipped' }, { title: 'Delivered' }])
    //   setorderstatus(1)
    // }
    // 8   Payment Failed
    // if (skuids.includes(8)) {
    //   setStepper([{title: 'Ordered'}, {title: 'Cancelled'}])
    // }
    // 9	    Refunded
    // if (skuids.includes(9)) {
    //   if (skuids.includes(6)) {
    //   }
    //   if(skuids.includes(7)){
    //     // setStepper([{title: 'Ordered'},{title: 'Under Process'}, {title: 'Cancelled'}, {title: 'Refunded'}])
    //     // setorderstatus(4) 
    //   }
    //   else {
    //   }
    // }
    // 10	Partially Refunded
    // if (skuids.includes(10)) {
    //   if (skuids.includes(6)) {
    //   //  setStepper([{}])
    //   }
    //   else {
    //   }
    // }
    // 11	Request for Refund
    //    if (skuids.includes(11)) {
    //     if (skuids.includes(7)) {
    //       setStepper([{title: 'Ordered'},{title: 'Cancelled'}])
    //       setorderstatus(3)  
    //     }
    // }
    // 12	Refund In Process
    // if (skuids.includes(12)) {
    //   if (skuids.includes(6)) {
    //   }
    //   else{
    //     setStepper([{title: 'Ordered'},{title: 'Under Process'}, {title: 'Shipped'}, {title: 'Delivered'}])
    //     setorderstatus(0)
    //   }
    // }
  }, [skuids])
  console.log("setorderstatusitemdetails", orderstatusitemdetails, orderstatus, stepper);
  const getDate = (date) => {
    // const d = new Date(date);
    // let month = d.getMonth()
    // let getdate = d.getDate()
    // return month + " " + getdate
    const displayDate = moment(date).format('MMMM DD, YYYY ')
    console.log('date', displayDate);
    return displayDate
  }
  const checkLastVisitedPage = () => {
    localStorage.setItem('lastVisitedUrl', '/account/myorders/myorder-detail/OC8209/trackorder');
    router.push({ pathname: '/login', })
  }
  return (
    <>
      {
        // (isUserLogin === true || isUserLogin !== null || isUserLogin !== undefined)
        (isUserLogin === false)
          ?
          checkLastVisitedPage()
          :
          <div className='Track-order'>
            <ToastContainer
              position="top-right"
            // draggable={true}
            // autoClose={50000}
            />
            <Header />
            <SubNavigation />
          </div>
      }
      <div className="container-fluid">
        <h4> <b>Order Number :{typeof window !== 'undefined' && window.localStorage ? window.atob(localStorage.getItem('OrderNumber')) : null}</b></h4>
        {/* <div>
          <div className="app-content">
            <div className="wizard number-tab-steps wizard-circle wizard clearfix">
              <div className="steps clearfix" >
                <ul role="tablist">
                </ul>
                <Stepper
                  barStyle="solid"
                  steps={stepper}
                  activeStep={orderstatus}
                // activeStep={0}
                />
              </div>
            </div>
          </div>
        </div> */}
        <br />
        <br />
        {console.log('trackOrderStatus--', trackOrderStatus)}
        {trackOrderStatus.map((item, index) => {
          console.log('574', item, index)
          console.log('617', item, index)
          return <div className='trackorder'>
            <div className='red-dot'></div>
            <div className=''>
              <div>
                <div className={index === 0 ? 'track-order-border-left-transparent pl-3 pt-2' : 'track-order-border-left pl-3 pt-2'}>
                  <div className='badge badge-light'>
                    <h3>
                      {item.OrderStatus}
                    </h3>
                  </div>
                </div>
              </div>
              <div className={trackOrderStatus.length - 1 === index ? 'track-order-border-left-transparent pl-3 pb-3' : 'track-order-border-left pl-3 pb-3'}>
                {
                  getDate(item.CreatedDate)
                }
              </div>
            </div>
          </div>
        })}
        <br />
        {/* <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header className="collapsible Orderstatusclass" style={{ fontSize: 20 }}>Awaiting Fullfillment</Accordion.Header>
            <Accordion.Body> */}
        {/* <div style={{ height: 'auto', display: 'block' }} id="1" className="panel-collapse collapse in "> */}
        {/* <style>
                  .alignleft {
                    text - align: left;
    }
                </style> */}
        {/* <table className="table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th className="alignleft">
                        <label>Product Image</label>
                      </th>
                      <th className="alignleft">
                        <label>Product Name</label>
                      </th>
                      <th className="alignleft">
                        <label>Pack Size</label>
                      </th>
                      <th className="alignleft">
                        <label>Date</label>
                      </th>
                      <th className="alignleft">
                        <label>Item Status</label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="alignleft">
                        <img src="https://devadmin.adibuja.com/Media/Images/150X150//0AKKLIcLEK_potato new.png" style={{ width: '60px', height: '60px' }} />
                      </td>
                      <td className="alignleft">
                        Potato/Batata
                      </td>
                      <td className="alignleft">
                        1 kg
                      </td>
                      <td className="alignleft">
                        07 Jun 2022
                      </td>
                      <td className="alignleft">
                        Awaiting Fullfillment
                      </td>
                    </tr>
                  </tbody>
                </table> */}
        {/* </div> */}
        <Accordion defaultActiveKey="0" flush style={{ width: '100%' }} >
          {orderstatusitem && orderstatusitem.map(itm => <button type='button' style={{ fontSize: '15px', fontStyle: 'bold' }} onClick={() => { handlestatusclick(itm.OrderStatusId, itm.OrderNumber) }}> + {itm.OrderStatusName}</button>)}
          <>
            {handleClick === true &&
              <>
                <Accordion.Item eventKey="0">
                  <Accordion.Body>
                    <table className="table" id='trackordertable' style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          <th className="alignleft" style={{ textAlign: 'left' }}>
                            <label>Product Image</label>
                          </th>
                          <th className="alignleft" style={{ textAlign: 'left' }}>
                            <label>Product Name</label>
                          </th>
                          <th className="alignleft" style={{ textAlign: 'left' }}>
                            <label>Pack Size</label>
                          </th>
                          <th className="alignleft" style={{ textAlign: 'left' }}>
                            <label>Date</label>
                          </th>
                          <th className="alignleft" style={{ textAlign: 'left' }}>
                            <label>Item Status</label>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderstatusitemdetails && orderstatusitemdetails.map(item =>
                          <tr>
                            <td className="alignleft" style={{ textAlign: 'left' }}>
                              <img src={item.ProductImage} style={{ width: '60px', height: '60px' }} />
                            </td>
                            <td className="alignleft">
                              {item.ProductName
                              }
                            </td>
                            <td className="alignleft">
                              {item.PackSize
                              }
                            </td>
                            <td className="alignleft">
                              {item.Date
                              }
                            </td>
                            <td className="alignleft">
                              {item.OrderItemStatus
                              }
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </Accordion.Body>
                </Accordion.Item>
              </>
            }
          </>
        </Accordion>
        <div div className="cart-button-wrapper d-flex justify-content-between mt-4" id='trackorderbackbtn' style={{ paddingBottom: '20px' }
        }> <Link href={`/account/myorders/myorder-detail/${typeof window !== 'undefined' && window.localStorage ? window.atob(localStorage.getItem('OrderNumber')) : '#'}`} className="btn btn-secondary order-btn">← Back to My Order </Link> </div >
      </div >
      <Footer />
    </>
  );
}
export default (Trackorder);