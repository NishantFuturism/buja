/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * ProceedToBuy
 *
 */
import moment from 'moment';
import React, { memo, useEffect, useState, } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, } from 'react-router-dom';
import Stepper from 'react-stepper-horizontal';
import { compose } from 'redux';
import '../../../assets1/css/style.min.css';
import '../../../assets1/css/bundle.css';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { ToastContainer, toast } from 'react-toastify';
import brandlogo from '../../../assets1/img/icon/adibuja-logo.svg';
import CheckoutAPI from '../MainPage/api/checkout';
import LocationApi from '../MainPage/api/Locationapi';
// import { detectCurrentlocation, slotdtae } from './actions';
import { AddressList } from './addressList';
import reducer from './reducer';
import saga from './saga';
import { getcartamount } from '../Cart/actions';
import mycartAPI from '../MainPage/api/mycartAPI';
import Warn from '../../components/ShowAlert/warn';
// import Timeslotdateselect from './Timeslotdateselect ';
// import Constants from '../App/constants';
import 'react-toastify/dist/ReactToastify.css';
export function ProceedToBuy(props) {
  console.log('pbuy', { props });
  useInjectReducer({ key: 'proceedToBuy', reducer });
  useInjectSaga({ key: 'proceedToBuy', saga });
  // const [placeorder, setplaceorder] = useState(false)
  const [firsttimeslot, setfirsttimeslot] = useState([])
  const [secondtimeslot, setsecondtimeslot] = useState([])
  const [slectedinex, setslectedinex] = useState(0)
  const [slectedinex2, setslectedinex2] = useState(0)
  const [warnstatus, setwarnstatus] = useState(false)
  const [warningmsg, setwarningmsg] = useState('')
  // const [secondtime,setsecondtime]=useState(false)
  // const [firsttime,setfirsttime]=useState(false)
  // const [current, setcurrent] = useState(false)
  // const [auto, setauto] = useState(false)
  // const [lat, setlat] = useState(false)
  // const [long, setlong] = useState(false)
  // const [secondslotview, setsecondslotview] = useState(false)
  // const [CustomerAddressId, setCustomerAddressId] = useState('')
  // const [total, settotal] = useState('')
  // const [slotid, setslotid] = useState('')
  // const [InstructionForDeliverySlot, setInstructionForDeliverySlot] = useState('')
  // const [DeliverySlotDate, setDeliverySlotDate] = useState('')
  // const [DeliverySlotID, setDeliverySlotID] = useState('')
  const [atosuggestdadta, setatosuggestdadta] = useState([])
  const [currentdate, setcurrentdate] = useState('')
  const [tommrowdate, settommrowdate] = useState('')
  const [checked, setchecked] = useState(false)
  const [amount, setamount] = useState()
  const [FirstCall, setFirstCall] = useState(0);
  // const addressdata = useSelector(state => state.proceedToBuy)
  const addressdata = useSelector(state => state.proceedToBuy)
  const cartReducer = useSelector(state => state.cart)
  const [activestep, setactivestep] = useState(0)
  const [key, setKey] = useState('first');
  const location = useLocation()
  const [customerAddressList, setCustomerAddressList] = useState([])
  const [showChooseDeliveryTime, setShowChooseDeliveryTime] = useState(true)
  // const MemoizedMovie2 = React.memo(cartReducer);
  console.log('locationproccess74', location, cartReducer);
  console.log({ addressdata });
  const history = useHistory();
  const addressform = useSelector(state => state.proceedToBuy)
  console.log('addressform---', cartReducer, amount, addressform)
  useEffect(() => {
    setFirstCall(FirstCall + 1)
    dispatch(getcartamount(cartReducer && cartReducer.cartamount))
    // setUpdatedTimer()
    // setShowMsg(false)
  }, [])
  // useEffect(() => {
  // }, [auto])
  // useEffect(() => {
  //   if (current) {
  //     // dispatch(detectCurrentlocation(lat, long, atosuggestdadta))
  //   }
  // }, [current, lat, long])
  useEffect(() => {
    const date = moment()
    setcurrentdate(moment().add(1, 'days').format('DD MMMM YYYY').toString())
    const tomorrow = moment().add(2, 'days').format('DD MMMM YYYY').toString()
    settommrowdate(tomorrow)
    console.log('date', date.format('DD MMMM ', date));
  }, [])
  console.log('currentdate, tommarow', currentdate, tommrowdate);
  // useEffect(() => {
  //   // if (location && location.state && location.state.total) {
  //   setamount(location && location.state && location.state.total)
  //   // }
  // }, [location.state.total])
  useEffect(() => {
    if (customerAddressList !== undefined) {
      // setCustomerAddressId(addressdata.CustomerAddressId)
      customerAddressList.forEach(cutAddresdetails => {
        if (cutAddresdetails.isPrimary === true) {
          localStorage.setItem('CustomerAddressId', window.btoa(cutAddresdetails.CustomerAddressId))
        }
      })
    }
    // setamount(location && location.state && location.state.total)
  }, [customerAddressList, location])
  useEffect(() => {
    LocationApi.GoogleApi({})
      .then(response => {
        console.log('uproceeduu', response)
        setatosuggestdadta(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
    CheckoutAPI.getfirstDeliveryslot({})
      .then(response => {
        setfirsttimeslot(response)
        // data = response
      })
      .catch(error => {
        console.log('error:::', error);
      });
    CheckoutAPI.getsecondDeliveryslot({})
      .then(response => {
        setsecondtimeslot(response)
      })
      .catch(error => {
        console.log('error:::', error);
      });
    // function formatDate(d) {
    //   const myDate = new Date(d);
    //   let hrs = ((myDate.getHours() > 12) ? myDate.getHours() - 12 : myDate.getHours());
    //   const amPM = ((myDate.getHours() >= 12) ? "PM" : "AM");
    //   if (hrs === 0) hrs = 12;
    //   const formattedDate = `${hrs}:${myDate.getMinutes()} ${amPM}`;
    //   return formattedDate;
    // }
    // const myFormattedDate = formatDate("2017-02-17T22:32:25.000Z");
    // alert(myFormattedDate);
  }, [props]);
  useEffect(() => {
    mycartAPI.getCartCommon()
      .then(response => {
        console.log('uuuuu', response)
        // setwalletbalance(response.WalletBalance)
        setamount(response.total)
      })
      .catch(error => {
        console.log('error:::', error);
      });
  })
  useEffect(() => {
    fetchaddress()
  }, [])
  //   useEffect(() => {
  //     if (placeorder && FirstCall > 0) {
  //       if(amount===0){
  //         setwarnstatus(true)
  //  setwarningmsg('Sorry! There are no items in the cart which are available in the selected delivery locality.')
  //  setTimeout(() => {
  //  setwarnstatus(false)
  // }, 3000);
  //       }
  //       else{
  //         history.push({ pathname: '/product/checkout/order', state: { total: amount } })
  //       }
  //     }
  //   }, [placeorder])
  const Proccedtobuy = () => {
    if (customerAddressList.length > 0) {
      mycartAPI.removeInactiveFromCart()
        .then(resp => {
          console.log("resp", resp);
          if (resp === 'Success') {
            mycartAPI.getCartnew()
              // mycartAPI.getCartCommon()
              .then(response => {
                console.log('uuuuu', response)
                // setwalletbalance(response.WalletBalance)
                if (response[0].Total === 30) {
                  setwarnstatus(true)
                  setwarningmsg('Sorry! There are no items in the cart which are available in the selected delivery locality.')
                  setTimeout(() => {
                    setwarnstatus(false)
                  }, 3000);
                } else if (response[0].Total > 0) {
                  console.log("cartReducer==response==", amount, response[0].Total, response[0].Total - response[0].CouponValue);
                  if (amount === response[0].Total - response[0].CouponValue) {
                    // setamount(response[0].Total)
                    history.push({ pathname: '/product/checkout/order', state: { total: response[0].Total } })
                  } else {
                    // setwarnstatus(true)
                    // setwarningmsg('Your cart has been updated!!!,')
                    // setamount(response[0].Total)
                    setTimeout(() => {
                      setwarnstatus(false)
                      history.push({ pathname: '/product/checkout/order', state: { total: response[0].Total } })
                    }, 4000);
                  }
                } else {
                  setwarnstatus(true)
                  setwarningmsg('Sorry! There are no items in the cart,')
                  setTimeout(() => {
                    setwarnstatus(false)
                    history.push({ pathname: '/' })
                  }, 4000);
                }
              })
              .catch(error => {
                console.log('error:::', error);
              });
          }
        })
    } else {
      toast('Please fill address details before proceed to buy')
    }
    // router.go(-2)
    // setplaceorder(true)
    // history.push('/product/checkout/order',)
    // if (FirstCall > 0) {
    //   history.push({ pathname: `/product/checkout/order/`, state: { total: amount } })
    //   // history.push({ pathname: '/product/checkout/order', state: { email: '', phone: '', data: '' } })
    // }
  }
  const dispatch = useDispatch();
  // const rendertimeslotview = () => {
  //   const date = new Date('2016-11-09T18:00:01');
  //   alert(date.getTime())
  //   setsecondslotview(false)
  // }
  const Timeslot = firsttimeslot
  const Timeslotsecond = secondtimeslot
  console.log()
  function formatDate(d) {
    const myDate = new Date(d);
    // let hrs = ((myDate.getHours() > 12) ? myDate.getHours() - 12 : myDate.getHours());
    // const amPM = ((myDate.getHours() >= 12) ? "PM" : "AM");
    // // setampm(amPM)
    // if (hrs === 0) hrs = 12;
    const twoDigitMinutes = myDate.toLocaleString("en-us", { hour: '2-digit', minute: '2-digit', });
    // const formattedDate = `${hrs}:${myDate.getMinutes('mm')} ${amPM}`;
    return twoDigitMinutes;
  }
  function dateConverter(createdon) {
    console.log("255createdon==", createdon)
    // const date = new Date(createdon);
    // const formattedDate = date.toLocaleDateString('en-us', {
    //   month: 'short', day: 'numeric', year: 'numeric'
    // }).replace(/ /g, '  ');
    // return formattedDate
    const date = moment(createdon).format('MM/DD/YYYY')
    console.log("264Date==", date);
    return date;
    // moment(date2).format('MM/dd/yyyy');
    // const date2 = createdon.moment().add(1, 'days').format('DD MMMM YYYY').toString()
  }
  function dateConverterdisp(createdon) {
    console.log("255createdon==", createdon)
    const date = new Date(createdon);
    const formattedDate = date.toLocaleDateString('en-us', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).replace(/ /g, '  ');
    return formattedDate
    // moment(date2).format('MM/dd/yyyy');
    // const date2 = createdon.moment().add(1, 'days').format('DD MMMM YYYY').toString()
  }
  // us
  useEffect(() => {
    if (key === 'first' && Timeslot.length > 0) {
      if (key === 'first' && slectedinex === 0) {
        //  selectedtimeslot(Timeslot[0].SlotID,Timeslot[0].FromTime,Timeslot[0].ToTime, 0 ,currentdate)
        const deliverydate = dateConverter(currentdate)
        const deliverydatedisplay = dateConverterdisp(currentdate)
        const delveryfrom = formatDate(Timeslot[0].FromTime)
        const delveryrto = formatDate(Timeslot[0].ToTime)
        console.log('time', delveryfrom, delveryrto);
        localStorage.setItem('SlotID', window.btoa((Timeslot[0].SlotID)))
        localStorage.setItem('FromTime', deliverydate)
        localStorage.setItem('delveryfrom', delveryfrom)
        localStorage.setItem('delveryrto', delveryrto)
        localStorage.setItem('deliverydate', deliverydatedisplay)
      }
      else if (key === 'first' && slectedinex === 1) {
        //  selectedtimeslot(Timeslot[0].SlotID,Timeslot[0].FromTime,Timeslot[0].ToTime, 0 ,currentdate)
        const deliverydate = dateConverter(currentdate)
        const deliverydatedisplay = dateConverterdisp(currentdate)
        const delveryfrom = formatDate(Timeslot[1].FromTime)
        const delveryrto = formatDate(Timeslot[1].ToTime)
        console.log('time', delveryfrom, delveryrto);
        localStorage.setItem('SlotID', window.btoa((Timeslot[1].SlotID)))
        localStorage.setItem('FromTime', deliverydate)
        localStorage.setItem('delveryfrom', delveryfrom)
        localStorage.setItem('delveryrto', delveryrto)
        localStorage.setItem('deliverydate', deliverydatedisplay)
      }
      else if (key === 'first' && slectedinex === 2) {
        //  selectedtimeslot(Timeslot[0].SlotID,Timeslot[0].FromTime,Timeslot[0].ToTime, 0 ,currentdate)
        const deliverydate = dateConverter(currentdate)
        const deliverydatedisplay = dateConverterdisp(currentdate)
        const delveryfrom = formatDate(Timeslot[2].FromTime)
        const delveryrto = formatDate(Timeslot[2].ToTime)
        console.log('time', delveryfrom, delveryrto);
        localStorage.setItem('SlotID', window.btoa((Timeslot[2].SlotID)))
        localStorage.setItem('FromTime', deliverydate)
        localStorage.setItem('delveryfrom', delveryfrom)
        localStorage.setItem('delveryrto', delveryrto)
        localStorage.setItem('deliverydate', deliverydatedisplay)
      }
    }
    console.log("slectedinex2", slectedinex2);
    if (key === 'second' && slectedinex2 === 0) {
      console.log("keykey", key);
      const deliverydate = dateConverter(tommrowdate)
      const deliverydatedisplay = dateConverterdisp(tommrowdate)
      const delveryfrom = formatDate(Timeslotsecond[0].FromTime)
      const delveryrto = formatDate(Timeslotsecond[0].ToTime)
      console.log('time', delveryfrom, delveryrto);
      localStorage.setItem('SlotID', window.btoa((Timeslotsecond[0].SlotID)))
      localStorage.setItem('FromTime', deliverydate)
      localStorage.setItem('delveryfrom', delveryfrom)
      localStorage.setItem('delveryrto', delveryrto)
      localStorage.setItem('deliverydate', deliverydatedisplay)
      //  selectedtimeslot2(Timeslotsecond[0].SlotID,Timeslotsecond[0].FromTime,Timeslotsecond[0].ToTime, 0 ,tommrowdate) 
    }
    else if (key === 'second' && slectedinex2 === 1) {
      console.log("keykey", key);
      const deliverydate = dateConverter(tommrowdate)
      const deliverydatedisplay = dateConverterdisp(tommrowdate)
      const delveryfrom = formatDate(Timeslotsecond[1].FromTime)
      const delveryrto = formatDate(Timeslotsecond[1].ToTime)
      console.log('time', delveryfrom, delveryrto);
      localStorage.setItem('SlotID', window.btoa((Timeslotsecond[1].SlotID)))
      localStorage.setItem('FromTime', deliverydate)
      localStorage.setItem('delveryfrom', delveryfrom)
      localStorage.setItem('delveryrto', delveryrto)
      localStorage.setItem('deliverydate', deliverydatedisplay)
      //  selectedtimeslot2(Timeslotsecond[0].SlotID,Timeslotsecond[0].FromTime,Timeslotsecond[0].ToTime, 0 ,tommrowdate) 
    }
    else if (key === 'second' && slectedinex2 === 2) {
      console.log("keykey", key);
      const deliverydate = dateConverter(tommrowdate)
      const deliverydatedisplay = dateConverterdisp(tommrowdate)
      const delveryfrom = formatDate(Timeslotsecond[2].FromTime)
      const delveryrto = formatDate(Timeslotsecond[2].ToTime)
      console.log('time', delveryfrom, delveryrto);
      localStorage.setItem('SlotID', window.btoa((Timeslotsecond[2].SlotID)))
      localStorage.setItem('FromTime', deliverydate)
      localStorage.setItem('delveryfrom', delveryfrom)
      localStorage.setItem('delveryrto', delveryrto)
      localStorage.setItem('deliverydate', deliverydatedisplay)
      //  selectedtimeslot2(Timeslotsecond[0].SlotID,Timeslotsecond[0].FromTime,Timeslotsecond[0].ToTime, 0 ,tommrowdate) 
    }
  }, [key, Timeslot, Timeslotsecond])
  // useEffect(()=>{
  //   if(secondtime===true){
  //     console.log("select index",);
  //     setslectedinex2(0)
  //     // selectedtimeslot2(Timeslotsecond[0].SlotID,Timeslotsecond[0].FromTime,Timeslotsecond[0].ToTime, 0 ,tommrowdate) 
  //     const delveryfrom = formatDate(Timeslotsecond[0].FromTime)
  //     const delveryrto = formatDate(Timeslotsecond[0].ToTime)
  //     console.log('time', delveryfrom, delveryrto);
  //     localStorage.setItem('SlotID', window.btoa((Timeslotsecond[0].SlotID)))
  //     localStorage.setItem('FromTime', window.btoa(Timeslotsecond[0].FromTime))
  //     localStorage.setItem('delveryfrom', delveryfrom)
  //     localStorage.setItem('delveryrto', delveryrto)
  //     localStorage.setItem('deliverydate', tommrowdate)
  //   }
  // },[secondtime])
  // useEffect(()=>{
  //   if(firsttime===true){
  //     console.log("select index",);
  //     setslectedinex(0)
  //     // selectedtimeslot(Timeslot[0].SlotID,Timeslot[0].FromTime,Timeslot[0].ToTime, 0 ,currentdate)
  //     const delveryfrom = formatDate(Timeslot[0].FromTime)
  //     const delveryrto = formatDate(Timeslot[0].ToTime)
  //     console.log('time', delveryfrom, delveryrto);
  //     localStorage.setItem('SlotID', window.btoa((Timeslot[0].SlotID)))
  //     localStorage.setItem('FromTime', window.btoa(Timeslot[0].FromTime))
  //     localStorage.setItem('delveryfrom', delveryfrom)
  //     localStorage.setItem('delveryrto', delveryrto)
  //     localStorage.setItem('deliverydate', currentdate)
  //   }
  // },[firsttime])
  const selectedtimeslot = (SlotID, FromTime, totime, index, cdate) => {
    setslectedinex(index)
    let input;
    console.log('SlotID', SlotID, FromTime, totime, "currentdate", currentdate, "cdat", cdate, "tommrowdate", tommrowdate);
    if (currentdate === cdate) {
      input = document.getElementById('firstselectedslotid@item.SlotID');
    }
    // if (tommrowdate === cdate) {
    //   input = document.getElementById('secondselectedslotid@item.SlotID');
    // }
    // const { value } = document.getElementById('selectedslotid@item.SlotID')
    if (SlotID) {
      setchecked(input.value)
    }
    if (input.value === checked) {
      input.style.backgroundColor = 'green';
    }
    // setDeliverySlotID(SlotID)
    // setDeliverySlotDate(FromTime)
    // dispatch(slotdtae(FromTime, totime,))
    let deliverydate;
    if (currentdate === cdate) {
      deliverydate = dateConverter(currentdate)
    }
    const deliverydatedisplay = dateConverterdisp(currentdate)
    // if (tommrowdate === cdate) {
    //   deliverydate = dateConverter(tommrowdate)
    // }
    const delveryfrom = formatDate(FromTime)
    const delveryrto = formatDate(totime)
    console.log('time', delveryfrom, delveryrto);
    localStorage.setItem('SlotID', window.btoa(SlotID))
    localStorage.setItem('FromTime', deliverydate)
    localStorage.setItem('delveryfrom', delveryfrom)
    localStorage.setItem('delveryrto', delveryrto)
    localStorage.setItem('deliverydate', deliverydatedisplay)
  }
  const selectedtimeslot2 = (SlotID, FromTime, totime, index, cdate) => {
    setslectedinex2(index)
    let input;
    console.log('SlotID', SlotID, FromTime, totime, "currentdate", currentdate, "cdat", cdate, "tommrowdate", tommrowdate);
    // if (currentdate === cdate) {
    //   input = document.getElementById('firstselectedslotid@item.SlotID');
    // }
    if (tommrowdate === cdate) {
      input = document.getElementById('secondselectedslotid@item.SlotID');
    }
    // const { value } = document.getElementById('selectedslotid@item.SlotID')
    if (SlotID) {
      setchecked(input.value)
    }
    if (input.value === checked) {
      input.style.backgroundColor = 'green';
    }
    // setDeliverySlotID(SlotID)
    // setDeliverySlotDate(FromTime)
    // dispatch(slotdtae(FromTime, totime,))
    let deliverydate;
    // if (currentdate === cdate) {
    //   deliverydate = dateConverter(currentdate)
    // }
    if (tommrowdate === cdate) {
      deliverydate = dateConverter(tommrowdate)
    }
    const deliverydatedisplay = dateConverterdisp(tommrowdate)
    const delveryfrom = formatDate(FromTime)
    const delveryrto = formatDate(totime)
    console.log('time', delveryfrom, delveryrto);
    localStorage.setItem('SlotID', window.btoa(SlotID))
    localStorage.setItem('FromTime', deliverydate)
    localStorage.setItem('delveryfrom', delveryfrom)
    localStorage.setItem('delveryrto', delveryrto)
    localStorage.setItem('deliverydate', deliverydatedisplay)
  }
  const getinstructiontext = (e) => {
    localStorage.setItem('Instruction', window.btoa(e.target.value))
  }
  // useEffect(() => {
  //   if (addressdata !== undefined) {
  //     setAutolist(addressdata.predictlist)
  //   }
  // })
  // function checkservice(description, selectedatavalue, placeid) {
  //   console.log('a', description, selectedatavalue, atosuggestdadta);
  //   setlocationname(description)
  //   // setenteredvalue(selectedatavalue)
  //   setenblesuggestion(false)
  //   // dispatch(checkserviceavailability(description, placeid, atosuggestdadta))
  // }
  useEffect(() => {
    if (!localStorage.getItem('CustGUID') === null || localStorage.getItem('CustGUID') === undefined) {
      console.log('login');
    } else {
      setactivestep(2)
    }
  })
  const deliverypolicy = () => {
    localStorage.setItem('pagefootert', "delivery-policy-react")
    history.push('/subfooter')
  }
  const closemsg = () => {
    setwarnstatus(false)
  }
  console.log('checked', checked);
  console.log('locationlocalStorage', localStorage.getItem('totalamount'));
  console.log("Timeslot=", Timeslot, "Timeslotsecond=", Timeslotsecond, currentdate, tommrowdate);
  console.log("vvvvv", key);
  function fetchaddress() {
    // alert('fetchaddresslist from index')
    CheckoutAPI.getcustomeraddress({})
      .then(response => {
        console.log("responseproccessadress==", response)
        setCustomerAddressList(response)
      })
  }
  console.log(amount);
  // console.log('customerAddressList--', customerAddressList, customerAddressList.length)
  const hideChooseDeliveryTimeSlot = (e) => {
    // alert('490' + e)
    if (e === true) {
      setShowChooseDeliveryTime(false)
    }
    if (e === false) {
      setShowChooseDeliveryTime(true)
    }
  }
  return (
    <>
      <ToastContainer
        position="top-right"
      // draggable={true}
      // autoClose={50000}
      />
      {warnstatus && <Warn msg={warningmsg} close={closemsg} />}
      <div className="login-wrapper pb-35">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <main className="site-main" id="primary">
                <div className="user-login">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                      <div className="section-title text-center">
                        <p align="center" style={{ padding: '10px 0px' }}>
                          <Link to="/">
                            <img referrerPolicy='no-referrer' alt="brand-logo" src={brandlogo} style={{ paddingLeft: '23px' }} width="198px"
                              height="42px" />
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mainbodycontent'>
                  <div className='checkout-wrapper pt-10 pb-70 checkout-wrapper-container"'>
                    <div className='container-fluid paymentLayout'>
                      <div className='row d-block w-100 mb-5'>
                        <div className='paymentStatusbar'>
                          <Stepper
                            barStyle="solid"
                            defa
                            steps={[{
                              title: 'Sign in',
                              onClick() {
                                // alert("sfsdjkfhksfdhhksdf");
                              },
                              href: '/login/',
                            }, {
                              title: 'Shopping Cart',
                              href: '/cart/',
                            }, {
                              title: 'Address Delivery Slot',
                              href: '/productprocced/checkout',
                            }, {
                              title: 'Payment & Order Placed',
                              onClick() {
                                // alert("sfsdjkfhksfdhhksdf");
                              }
                            }]} activeStep={activestep} activeColor="#f07100" completeColor="#f07100"
                            defaultBorderWidth={3} />
                        </div>
                      </div>
                      <div className='row w-100'>
                        <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                          <main id="primary" className='site-main'>
                            <div className="user-actions-area">
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                  <div className='checkout-area'>
                                    <div className='row'>
                                      <div className="col-12 col-sm-12 col-md-12 col-lg-12" id="hidebillingsection">
                                        <div className='col-12 col-sm-12 col-md-12 col-lg-12 btnbuy' style={{ position: 'relative', zIndex: 100 }}>
                                          {/* <button id="btnContinuToPayment" type='button' className="btn btn-success dark align-self-end btnproceedtobuy"
                                            onClick={Proccedtobuy}
                                            style={{ textTransform: 'none', float: 'right', marginRight: '0px' }}>Proceed To Buy</button> */}
                                        </div>
                                        <div className='checkout-form'>
                                          <div className="section-title left-aligned addrspc" ><h3 style={{ textTransform: 'none' }}>Choose Delivery Address</h3></div>
                                          <AddressList atosuggestdadta={atosuggestdadta} fetchaddresslist={fetchaddress} hideChooseDeliveryTimeSlot={(e) => hideChooseDeliveryTimeSlot(e)} />
                                          {
                                            showChooseDeliveryTime === true ?
                                              <div className="section-title left-aligned" style={{ display: 'block' }}>
                                                <h3 style={{ textTransform: 'none' }} className="fntsz">Choose Delivery Time Slot</h3>
                                              </div>
                                              : null
                                          }
                                          {
                                            showChooseDeliveryTime === true ?
                                              <div className="stepstab dlvry-slot">
                                                {/* <ul className="nav nav-tabs borderlist" id="delivertabs">
                                                <li className="deliveryslotclass active" >
                                                  <button type='button' className="active show"
                                                  >25 February </button>
                                                </li>
                                                <li className="deliveryslotclass" >
                                                  <button type='button' className="active show"
                                                    onClick={rendertimeslotview}
                                                  >25 February
                                                  </button>
                                                </li>
                                              </ul> */}
                                                <Tabs defaultActiveKey="first" className="mb-3 borderlist " id="deliverytabs" activeKey={key}
                                                  onSelect={(k) => setKey(k)}>
                                                  <Tab id='deliveryslotclass ' eventKey="first" title={`  ${currentdate} `} >
                                                    <div className="tab-content">
                                                      <input type="hidden" id="tomorrowSelectedId" />
                                                      <div id="tomorrow" className="tab-pane fade active in show">
                                                        <input type="hidden" name="hdnselectedslotid" id="hdnselectedslotid" />
                                                        {(Timeslot || []).map((data, index) => (
                                                          <div
                                                            className={index === slectedinex ? "tabselection  col-lg-3 tabselectionact    mt-0 " : "tabselection col-lg-3 mt-0"}
                                                            // id={checked === 'on' ? "selectedslotid@item.SlotID" :null }
                                                            // className="tabselection col-lg-3"
                                                            style={{ width: '200px', marginBottom: '5px' }}>
                                                            <label
                                                              onClick={() => selectedtimeslot(data.SlotID, data.FromTime, data.ToTime, index, currentdate)}
                                                            >
                                                              <input type="radio"
                                                                defaultChecked={data.SlotID === 1}
                                                                id="firstselectedslotid@item.SlotID" name="firstSelectedslotid" className={checked === 'on' ? "chooseslot item_0 mr-2 mt-0 " : "chooseslot item_0 mr-2 mt-0"}
                                                              // onChange={(e) => selectedtimeslot(e, data.SlotID, data.FromTime, data.ToTime)} 
                                                              />
                                                              {formatDate(data.FromTime)}-{formatDate(data.ToTime)}
                                                            </label>
                                                          </div>
                                                        ))}
                                                      </div>
                                                      <input type="hidden" id="dayaftertomorrowSelectedId" />
                                                      <div id="dayaftertomorrow" className="tab-pane fade"></div>
                                                    </div>
                                                  </Tab>
                                                  <Tab eventKey="second" id='deliveryslotclass1' title={`${tommrowdate}`} style={{ marginLeft: 20 }} >
                                                    <div className="tab-content">
                                                      <input type="hidden" id="tomorrowSelectedId" />
                                                      <div id="tomorrow" className="tab-pane fade active in show">
                                                        <input type="hidden" name="hdnselectedslotid" id="hdnselectedslotid" />
                                                        {(Timeslotsecond || []).map((data, index) => (
                                                          <div
                                                            className={index === slectedinex2 ? "tabselection  col-lg-3 tabselectionact    mt-0 " : "tabselection col-lg-3 mt-0"}
                                                            style={{ width: '200px', marginBottom: '5px' }}>
                                                            <label
                                                              className='d-flex align-items-center'
                                                              // className="chooseslot item_0 mr-2 mt-0"}
                                                              onClick={() => selectedtimeslot2(data.SlotID, data.FromTime, data.ToTime, index, tommrowdate)}>
                                                              <input type="radio"
                                                                defaultChecked={data.SlotID === 1}
                                                                className={checked === 'on' ? "chooseslot item_0 mr-2 mt-0 " : "chooseslot item_0 mr-2 mt-0"}
                                                                id="secondselectedslotid@item.SlotID" name="secondSelectedslotid"
                                                              // onChange={() => selectedtimeslot(data.SlotID, data.FromTime, data.ToTime)} 
                                                              />
                                                              {/* {moment(data.FromTime).format("HH:mm")} */}
                                                              {formatDate(data.FromTime)}-{formatDate(data.ToTime)}
                                                              {/* {data.FromTime}{data.ToTime} */}
                                                            </label>
                                                          </div>
                                                        ))}
                                                      </div>
                                                      {/* <input type="hidden" id="dayaftertomorrowSelectedId" />
                                                    <div id="dayaftertomorrow" className="tab-pane fade"></div> */}
                                                    </div>
                                                  </Tab>
                                                </Tabs>
                                                <br />
                                                {/* {secondslotview ?
                                                <div className="tab-content">
                                                  <input type="hidden" id="tomorrowSelectedId" />
                                                  <div id="tomorrow" className="tab-pane fade active in show">
                                                    <input type="hidden" name="hdnselectedslotid" id="hdnselectedslotid" />
                                                    {(Timeslotsecond || []).map(data => (
                                                      <div className="tabselection col-lg-3" style={{ width: '200px', marginBottom: '5px' }}>
                                                        <label>
                                                          <input type="radio" id="selectedslotid@item.SlotID" name="selectedslotid" className="chooseslot item_0" onChange={(e) => selectedtimeslot(e)} />
                                                          {formatDate(data.FromTime)}-{formatDate(data.ToTime)}
                                                        </label>
                                                      </div>
                                                    ))}
                                                  </div>
                                                  <input type="hidden" id="dayaftertomorrowSelectedId" />
                                                  <div id="dayaftertomorrow" className="tab-pane fade"></div>
                                                </div>
                                                :
                                                <div className="tab-content">
                                                  <input type="hidden" id="tomorrowSelectedId" />
                                                  <div id="tomorrow" className="tab-pane fade active in show">
                                                    <input type="hidden" name="hdnselectedslotid" id="hdnselectedslotid" />
                                                    {(Timeslot || []).map(data => (
                                                      <div className="tabselection col-lg-3" style={{ width: '200px', marginBottom: '5px' }}>
                                                        <label>
                                                          <input type="radio" id="selectedslotid@item.SlotID" name="selectedslotid" className="chooseslot item_0" onChange={(e) => selectedtimeslot(e, data.SlotID)} />
                                                          {formatDate(data.FromTime)}-{formatDate(data.ToTime)}
                                                        </label>
                                                      </div>
                                                    ))}
                                                  </div>
                                                  <input type="hidden" id="dayaftertomorrowSelectedId" />
                                                  <div id="dayaftertomorrow" className="tab-pane fade"></div>
                                                </div>
                                              } */}
                                              </div>
                                              : null
                                          }
                                        </div>
                                        <br />
                                        {
                                          showChooseDeliveryTime === true ?
                                            <div>
                                              < label style={{ fontSize: '15px' }}>
                                                <strong>Instruction for Delivery Partner</strong>
                                              </label>
                                              <textarea className="form-control" name="w3review" id="w3review" rows="4" cols="3" style={{ marginTop: '12px' }}
                                                onChange={(e) => getinstructiontext(e)}
                                              ></textarea>
                                              <div className="col-12 col-sm-12 col-md-12 col-lg-12" style={{ marginTop: '10px' }}>
                                                <button id="btnContinuToPayment1" type='button'
                                                  onClick={Proccedtobuy}
                                                  className="btn btn-success dark align-self-end btnproceedtobuy" style={{ textTransform: 'none', float: 'right', marginTop: '5px' }}>Proceed To Buy</button>
                                              </div>
                                            </div>
                                            : null
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  {/* </main> */}
                                </div>
                              </div>
                            </div>
                          </main>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'center' }} className="check_foot">
                  <form id="mc-form" noValidate="true">
                  </form>
                  <p align="center" style={{ paddingTop: '10px' }}>
                    <small>
                      {/* <Link to="/delivery-policy" style={{ color: 'dodgerblue' }}>Delivery Policy</Link>&nbsp; &nbsp; */}
                      <a href onClick={deliverypolicy} to="/subfooter" style={{ color: 'dodgerblue', cursor: 'pointer' }}>Delivery Policy</a>&nbsp;&nbsp;
                      <Link to="/faq" style={{ color: 'dodgerblue' }}>Help</Link>
                    </small>
                  </p>
                  <div>
                    <p align="center" style={{ paddingTop: '0px' }}><small>2023 © Adibuja Private Limited, All Rights Reserved</small></p>
                  </div>
                </div>
                {/* </div> */}
              </main>
            </div>
          </div >
        </div >
      </div >
      <div className="scroll-top not-visible"> <i className="fa fa-angle-up"></i> </div>
      {/* address */}
    </>
  );
}
export default compose(
  memo,
)(ProceedToBuy);
